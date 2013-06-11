function getImg()
{
	var fus_actimg = 1; // V ariable indiquant que l'on est à la recherche du nom
	var fus_colorimg;	// variable contenant la couleur précédente
	var fus_borderimg;	// variable contenant la bordure précédente	
	var fus_cursorimg;	// variable contenant le curseur précédent		
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
	
	var inversHTMLimg	=	function(htmlcode){
		
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
		if(fus_actimg == 1)	// Si on cherceh le prix...
		{
			
			fus_colorimg = getComputedStyle(target).backgroundColor;
			fus_borderimg = getComputedStyle(target).border;
			fus_cursorimg = getComputedStyle(target).cursor;			
		//	target.style.backgroundColor = inversHTMLname(getComputedStyle(target).backgroundColor);
			target.style.border = '3px dotted black';
			target.style.cursor = 'crosshair';	
			// !!WARNING!! getComputedStyle n'est pas compatible avec IE, utiliser currentStyle à la place !!WARNING!! //
		}
		else
		{
			this.removeEventListener('mouseover',arguments.callee,false);			
		}
	});
	
	var mouset = bindEvent(document,'mouseout', function(event) 
	{ var target = event.target || event.srcElement;
		if(fus_actimg == 1)	// Si on cherceh le prix...
		{
			target.style.backgroundColor = fus_colorimg;
			target.style.cursor = fus_cursorimg;
			target.style.border = fus_borderimg;
			
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
				
				fromus_selectedTexttmp	= fromus_idmatch[0].substring(4,fromus_idmatch[0].length-1);			
				var fus_imgid = fromus_selectedTexttmp;
				
				fromus_selectedTexttmp	=	fromus_classmatch[0].substring(7,fromus_classmatch[0].length-1);			
				var fus_imgclass =fromus_selectedTexttmp;
			}
			else
			{
				//id sans class
				
				if
				fromus_selectedTexttmp	=	fromus_idmatch[0].substring(4,fromus_idmatch[0].length-1);			
				
				var fus_imgid = fromus_selectedTexttmp;
			}
			
			fromus_selectedText = fromus_idmatch[0].substring(4,fromus_idmatch[0].length-1);
			if(fromus_selectedText.href)
			{
				fromus_selectedText = fromus_selectedText.href;
			}
			else if(fromus_selectedText.src)
			{
				fromus_selectedText.src;
			}
		}
		else
		{
			if(fromus_classmatch !=undefined)
			{ //Class sans id
				fromus_selectedTexttmp	=	fromus_classmatch[0].substring(7,fromus_classmatch[0].length-1);
				var fus_imgclass =fromus_selectedTexttmp;
				
				fromus_selectedText = fromus_classmatch[0].substring(7,fromus_classmatch[0].length-1);
				
				if(fromus_selectedText.href)
				{
					fromus_selectedText = fromus_selectedText.href;
				}
				else if(fromus_selectedText.src)
				{
					fromus_selectedText.src;
				}	
			}
			else
			{
				//ni class ni id
			}  
		}
		
		var fus_imgresult = '';
		if(fus_imgid)
		{
			fus_imgresult += 'img_id<-->'+fus_imgid+'/';
		}
		if(fus_imgclass)
		{
			fus_imgresult += 'img_class<-->'+fus_imgclass+'/';
		}	
		
		localStorage['regGetImg'] = fus_imgresult;
		localStorage['regImg'] = fromus_selectedText;
		fus_actimg = 0;	// On ne cherche plus l'image
		target.style.backgroundColor = fus_colorimg;
		target.style.cursor = fus_cursorimg;
		target.style.border = fus_borderimg;	
		
		this.removeEventListener('click',arguments.callee,false);
	});
}