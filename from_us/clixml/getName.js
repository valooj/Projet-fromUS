function getName()
{
	var fus_border = '1px dashed red';
	var fus_cursor = 'crosshair';
	var fus_actname = 1; // V ariable indiquant que l'on est à la recherche du nom
	var fus_colorname;	// variable contenant la couleur précédente
	var fus_bordername;	// variable contenant la bordure précédente	
	var fus_cursorname;	// variable contenant le curseur précédent	
	var bindEvent = function(elem ,evt,cb) {
		//vérifie si addEventListenerexiste dans l'élément
		if ( elem.addEventListener ) {
			elem.addEventListener(evt,cb,false);
			//si addEventListener n'est pas présent, vérifie si le navigateur est une version  d'IE
			} else if ( elem.attachEvent ) {
			//ajoute le préfixe "on" à l'event
			elem.attachEvent('on' + evt, function(){
				// Simule addEventListener ; s'assure que le callback obtient l'élément pour "this" et s'assure que le premier élément de la fonction est un event
				cb.call(event.srcElement,event);
			});
		}
	}
	
	var inversHTMLname	=	function(htmlcode){
		
		
		if (htmlcode.substr(0, 1) === '#') 
		{
			htmlcode = htmlcode.substr(1,7);
			htmlcode = parseInt(htmlcode,16);
			htmlcode = htmlcode ^16777215;
			return htmlcode;
		}
		else
		{	
			var digits = /(rgb[a]{0,1}\()(\d+), (\d+), (\d+)(.*)/.exec(htmlcode);
			
			if(/, \d+/.test(digits[5]))
			{
				var alpha = parseInt(/\d+/.exec(digits[5]));
			}
			
			var red = parseInt(digits[2]);
			var green = parseInt(digits[3]);
			var blue = parseInt(digits[4]);

			red 		=	red		^	255;
			green	=	green	^	255;
			blue	=	blue	^	255;
			
			if(alpha!=undefined)
			{
				alpha	=	alpha	^	255;
			}

			red 	=	red.toString(10);
			green	=	green.toString(10);
			blue	=	blue.toString(10);
			
			if(alpha!=undefined)
			{
				alpha	=	alpha.toString(10);
			}
			
			htmlcode = red+','+green+','+blue;
			if(alpha!=undefined)
			{
				htmlcode = htmlcode + ',' + alpha;
			}
			
			
			htmlcode = digits[1]+htmlcode+'\)';
			
			return htmlcode;
		}
	}

	var mouser = bindEvent(document,'mouseover', function(event) 
	{ var target = event.target || event.srcElement;
		if(fus_actname == 1)	// Si on cherceh le prix...
		{	
			fus_colorname = getComputedStyle(target).backgroundColor;
			fus_bordername = getComputedStyle(target).border;
			fus_cursorname = getComputedStyle(target).cursor;			
		//	target.style.backgroundColor = inversHTMLname(getComputedStyle(target).backgroundColor);
			target.style.border = fus_border;
			target.style.cursor = fus_cursor;			
			// !!WARNING!! getComputedStyle n'est pas compatible avec IE, utiliser currentStyle à la place !!WARNING!! //
		}
		else
		{
			this.removeEventListener('mouseover',arguments.callee,false);			
		}
	});
	
	var mouset = bindEvent(document,'mouseout', function(event) 
	{ var target = event.target || event.srcElement;
		if(fus_actname == 1)	// Si on cherceh le prix...
		{
			target.style.backgroundColor = fus_colorname;			
			target.style.cursor = fus_cursorname;
			target.style.border = fus_bordername;
			
			// !!WARNING!! getComputedStyle n'est pas compatible avec IE, utiliser currentStyle à la place !!WARNING!! //
		}
		else
		{
			this.removeEventListener('mouseout',arguments.callee,false);			
		}
	});

	bindEvent(document,'click', function(event) 
	{ var target = event.target || event.srcElement;
		
		var 	fromus_txt    = target.innerHTML;
		var 	fromus_selectedText  = target.textContent;
		var 	fromus_selectedTexttmp;
		var 	fromus_site 	=	document.location.href;		//récupération de l'adresse fromus_
		fromus_site 	=	/http[s]{0,1}\:\/\/(.*\.com)/gi.exec(fromus_site)[1];
		fromus_site	=	/\.[a-z0-9\-A-Z]{1,}\.com$/.exec(fromus_site)[0];
		fromus_site	=	'www'+fromus_site;
		
		fromus_txt        = fromus_txt.replace(/\n/g,'');
		
		if(/id=\"/.test(fromus_txt))
		{
			var fromus_idmatch    = fromus_txt.match(/id=(\"[^\"]{1,}\")/mgi);
		}
		if(/class=\"/.test(fromus_txt))
		{
			var fromus_classmatch = fromus_txt.match(/class=(\"[^\"]{1,}\")/mgi);  	
		}
		
		if(fromus_idmatch !=undefined)
		{
			if(fromus_classmatch !=undefined)
			{
				// id et class 
				
				fromus_selectedTexttmp	=	fromus_classmatch[0].substring(7,fromus_classmatch[0].length-1);			
				var fus_nameclass =fromus_selectedTexttmp;
				
				fromus_selectedTexttmp	= fromus_idmatch[0].substring(4,fromus_idmatch[0].length-1);			
				var fus_nameid = fromus_selectedTexttmp;
			}
			else
			{
				//id sans class
				fromus_selectedTexttmp	=	fromus_idmatch[0].substring(4,fromus_idmatch[0].length-1);			
				var fus_nameid = fromus_selectedTexttmp;
			}
			fromus_selectedText = fromus_idmatch[0].substring(4,fromus_idmatch[0].length-1);
		}
		else
		{
			if(fromus_classmatch !=undefined)
			{ //Class sans id
				fromus_selectedTexttmp	=	fromus_classmatch[0].substring(7,fromus_classmatch[0].length-1);
				var fus_nameclass =fromus_selectedTexttmp;
				
				fromus_selectedText = fromus_classmatch[0].substring(7,fromus_classmatch[0].length-1);
				
				fromus_selectedText	=	document.getElementsByClassName(fromus_selectedText)[0].textContent;
			}
			else
			{
				//ni class ni id
			}  
		}
		var fus_nameresult = '';
		if(fus_nameid)
		{
			fus_nameresult += '%name_id<-->'+fus_nameid+'*~*';
		}
		if(fus_nameclass)
		{
			fus_nameresult += '%name_class<-->'+fus_nameclass+'*~*';
		}	
		
		localStorage['regGetName'] = fus_nameresult;
		localStorage['regName'] = fromus_selectedText;

		fus_actname = 0;	// On ne cherche plus le nom
		target.style.backgroundColor = fus_colorname;	
		target.style.border = fus_bordername;
		target.style.cursor = fus_cursorname;	
		this.removeEventListener('click',arguments.callee,false);
	});
}
