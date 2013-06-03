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




var inversHTML	=	function(htmlcode){
	console.log('start, htmlcode = ' + htmlcode);
	
	
    if (color.substr(0, 1) === '#') 
	{
        return color.substr(1,7);
	}
	else
	{
		
		
		var digits = /(.*?)rgb[a]{0,1}\((\d+), (\d+), (\d+).*/.exec(color);
		
		var red = parseInt(digits[2]);
		var green = parseInt(digits[3]);
		var blue = parseInt(digits[4]);
		
		var rgb = blue | (green << 8) | (red << 16);
		return digits[1] +''+ rgb.toString(16);
		
		
		
		
		var fus_r	=	htmlcode.substring(0,2);
		var fus_g	=	htmlcode.substring(2,4);
		var fus_b	=	htmlcode.substring(4,6);	
		
		
		console.log('ColorConvert,');
		console.log('fus_r = ' + fus_r);
		console.log('fus_g = ' + fus_g);
		console.log('fus_b = ' + fus_b);
		
		fus_r	=	parseInt(fus_r, 16);
		fus_g	=	parseInt(fus_g, 16);
		fus_b	=	parseInt(fus_b, 16);
		console.log('parseInt' );
		
		console.log('fus_r = ' + fus_r);
		console.log('fus_g = ' + fus_g);
		console.log('fus_b = ' + fus_b);							
		
		fus_r 	=	fus_r	^	255;
		fus_g	=	fus_g	^	255;
		fus_b	=	fus_b	^	255;
		console.log('XOR' );
		
		console.log('fus_r = ' + fus_r);
		console.log('fus_g = ' + fus_g);
		console.log('fus_b = ' + fus_b);							
		
		fus_r 	=	fus_r.toString(16);
		if(fus_r =='0')
		{
			fus_r = '00';
		}
		
		fus_g	=	fus_g.toString(16);
		if(fus_g =='0')
		{
			fus_g = '00';
		}
		
		fus_b	=	fus_b.toString(16);
		if(fus_b =='0')
		{
			fus_b = '00';
		}
		
		htmlcode = fus_r+fus_g+fus_b;
		console.log('end après toString, htmlcode = ' + htmlcode);
		
		
		return htmlcode;
	}
}

var mouser = bindEvent(document,'mouseover', function(event) 
{ var target = event.target || event.srcElement;
	console.log('mouseover');
	target.style.backgroundColor = inversHTML(getComputedStyle(target).backgroundColor);
});

var mouset = bindEvent(document,'mouseout', function(event) 
{ var target = event.target || event.srcElement;
	console.log('mouseout');
	target.style.backgroundColor = '#'+inversHTML(getComputedStyle(target).backgroundColor);
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
			console.log('fromus_sitelist[\''+fromus_site+'\'].price_id.push(\''+fromus_selectedTexttmp+'\');');
			
			fromus_selectedTexttmp	=	fromus_classmatch[0].substring(7,fromus_classmatch[0].length-1);			
			console.log('fromus_sitelist[\''+fromus_site+'\'].price_class.push(\''+fromus_selectedTexttmp+'\');');
			
		}
		else
		{
			//id sans class
			fromus_selectedTexttmp	=	fromus_idmatch[0].substring(4,fromus_idmatch[0].length-1);			
			console.log('fromus_sitelist[\''+fromus_site+'\'].price_id.push(\''+fromus_selectedTexttmp+'\');');
			
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
			console.log('fromus_sitelist[\''+fromus_site+'\'].price_class.push(\''+fromus_selectedTexttmp+'\');');
			
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
	console.log("Et ce qui est affiché dans la case est...");
	console.log(fromus_selectedText);
	localStorage["regPrice"] = fromus_selectedText;
	mouser.removeEventListener('mouseover',arguments.calle,false);
	mouset.removeEventListener('mouseout',arguments.calle,false);
	this.removeEventListener('click',arguments.callee,false);
});		