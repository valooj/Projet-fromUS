function getPrice()
{
	var fus_actprice = 1; // V ariable indiquant que l'on est à la recherche du prix
	var fus_colorprice;	// variable contenant la couleur précédente
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
	
	var inversHTMLprice	=	function(htmlcode){
		console.log('start, htmlcode = ' + htmlcode);
		
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
			
			console.log('ColorConvert,');
			console.log('red = ' + red);
			console.log('green = ' + green);
			console.log('blue = ' + blue);
			console.log('alpha = ' + alpha);
			
			red 		=	red		^	255;
			green	=	green	^	255;
			blue	=	blue	^	255;
			
			if(alpha!=undefined)
			{
				alpha	=	alpha	^	255;
			}
			
			console.log('XOR' );
			
			console.log('red = ' + red);
			console.log('green = ' + green);
			console.log('blue = ' + blue);							
			console.log('alpha = ' + alpha);
			
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
			console.log('end après toString, htmlcode = ' + htmlcode);
			
			htmlcode = digits[1]+htmlcode+'\)';
			console.log('au return, htmlcode = ' + htmlcode);	
			return htmlcode;
		}
	}
	
	var mouser = bindEvent(document,'mouseover', function(event) 
	{ var target = event.target || event.srcElement;
		if(fus_actprice == 1)	// Si on cherceh le prix...
		{
			console.log('mouseover');
			fus_colorprice = getComputedStyle(target).backgroundColor;
			target.style.backgroundColor = inversHTMLprice(getComputedStyle(target).backgroundColor);	
			// !!WARNING!! getComputedStyle n'est pas compatible avec IE, utiliser currentStyle à la place !!WARNING!! //
		}
		else
		{
			this.removeEventListener('mouseover',arguments.callee,false);			
		}
	});
	
	var mouset = bindEvent(document,'mouseout', function(event) 
	{ var target = event.target || event.srcElement;
		if(fus_actprice == 1)	// Si on cherceh le prix...
		{
			console.log('mouseout');
			target.style.backgroundColor = fus_colorprice;
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
		var fromus_offre = document.location.href;		//récupération de l'adresse du l'offre
		var fromus_site = /.*(\..*\.[a-z]{2,3})\//gi.exec(fromus_offre)[1];	//stockage du site web où se trouve l'offre
		fromus_site	=	'www'+fromus_site;
		
		fromus_txt        = fromus_txt.replace(/\n/g,'');
		console.log(target.textContent);
		
		if(/id=\"/.test(fromus_txt))
		{
			var fromus_idmatch    = fromus_txt.match(/id=(\"[^\"]{1,}\")/mgi);
			console.log(fromus_idmatch);
		}
		if(/class=\"/.test(fromus_txt))
		{
			var fromus_classmatch = fromus_txt.match(/class=(\"[^\"]{1,}\")/mgi);  
			console.log(fromus_classmatch);
		}
		
		console.log("Ce qui est ajouté à la base de données est...");
		
		if(fromus_idmatch !=undefined)
		{
			if(fromus_classmatch !=undefined)
			{
				// id et class 
				
				fromus_selectedTexttmp	= fromus_idmatch[0].substring(4,fromus_idmatch[0].length-1);			
				var fus_priceid =fromus_selectedTexttmp;
				
				fromus_selectedTexttmp	=	fromus_classmatch[0].substring(7,fromus_classmatch[0].length-1);			
				var fus_priceclass = fromus_selectedTexttmp;
				
			}
			else
			{
				//id sans class
				fromus_selectedTexttmp	=	fromus_idmatch[0].substring(4,fromus_idmatch[0].length-1);			
				var fus_priceid =fromus_selectedTexttmp;
				
			}
			
			fromus_selectedText	=	fromus_idmatch[0].substring(4,fromus_idmatch[0].length-1);
			fromus_selectedText	=	document.getElementById(fromus_selectedText).textContent;
			if(/(\$[0-9\,]{0,}[\.0-9]{0,3})/g.test(fromus_selectedText))
			{
				fromus_selectedText	=	/(\$[0-9\,]{0,}[\.0-9]{0,3})/g.exec(fromus_selectedText)[0];
			}
			
		}
		else
		{
			if(fromus_classmatch !=undefined)
			{ //Class sans id
				fromus_selectedTexttmp	=	fromus_classmatch[0].substring(7,fromus_classmatch[0].length-1);
				var fus_priceclass = fromus_selectedTexttmp;
				
				fromus_selectedText = fromus_classmatch[0].substring(7,fromus_classmatch[0].length-1);
				
				fromus_selectedText	=	document.getElementsByClassName(fromus_selectedText)[0].textContent;
				console.log(fromus_selectedText);
				if(/(\$[0-9\,]{0,}[\.0-9]{0,3})/g.test(fromus_selectedText))
				{
					fromus_selectedText	=	/(\$[0-9\,]{0,}[\.0-9]{0,3})/g.exec(fromus_selectedText)[0];
				}
				else
				{
					fromus_selectedText	=	'';
				}
			}
			else
			{
				//ni class ni id
				console.log('Rien.')
				if(/(\$[0-9\,]{0,}[\.0-9]{0,3})/g.test(fromus_selectedText))
				{
					fromus_selectedText	=	/(\$[0-9\,]{0,}[\.0-9]{0,3})/g.exec(fromus_selectedText)[0];
				}
			}  
		}
		
		var fus_priceresult = '';
		if(fus_priceid)
		{
			fus_priceresult += 'price_id<-->'+fus_priceid+'/';
		}
		if(fus_priceclass)
		{
			fus_priceresult += 'price_class<-->'+fus_priceclass+'/';
		}
		
		console.log("Et ce qui est affiché dans la case est...");
		console.log(fromus_selectedText);
		localStorage["regGetPrice"] = fus_priceresult;
		localStorage["regPrice"] = fromus_selectedText;
		fus_actprice = 0;	// On ne cherche plus le prix
		target.style.backgroundColor = fus_colorprice;	
		this.removeEventListener('click',arguments.callee,false);
	});		
}