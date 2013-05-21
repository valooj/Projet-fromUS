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

bindEvent(document,'click', function(event) 
{ var target = event.target || event.srcElement;
	
	
	
	var fromus_txt    = target.innerHTML;
	var fromus_selectedText  = target.textContent;
	
	fromus_txt        = fromus_txt.replace(/\n/g,'');
	//alert(target.textContent);
	
	if(/id=\"/.test(fromus_txt))
	{
		var fromus_idmatch    = fromus_txt.match(/id=(\"[^\"]{1,}\")/mgi);
		//alert(fromus_idmatch);
	}
	if(/class=\"/.test(fromus_txt))
	{
		var fromus_classmatch = fromus_txt.match(/class=(\"[^\"]{1,}\")/mgi);  
		// alert(fromus_classmatch);
	}
	
	//alert("Ce qui est ajouté à la base de données est...");
	
	if(fromus_idmatch !=undefined)
	{
		if(fromus_classmatch !=undefined)
		{
			// id et class     
			//alert("<getprodpricetype>\"id\"<\/getprodpricetype>\n<getprodprice>"+fromus_idmatch[0].substring(3,fromus_idmatch[0].length)+"<\/getprodprice>");
			//alert("<getprodpricetype>\"class\"<\/getprodpricetype>\n<getprodprice>"+fromus_classmatch[0].substring(6,fromus_classmatch[0].length)+"<\/getprodprice>");
			
		}
		else
		{
			//id sans class
			//alert("<getprodpricetype>\"id\"<\/getprodpricetype>\n<getprodprice>"+fromus_idmatch[0].substring(3,fromus_idmatch[0].length)+"<\/getprodprice>");
			
		}
		
		fromus_selectedText = fromus_idmatch[0].substring(4,fromus_idmatch[0].length-1);
		fromus_selectedText = /(\$[0-9\,]{0,}[\.0-9]{0,3})/g.exec(document.getElementById(fromus_selectedText).textContent)[0];
		
	}
	else
	{
		if(fromus_classmatch !=undefined)
		{ //Class sans id
			
			//alert("<getprodpricetype>\"class\"<\/getprodpricetype>\n<getprodprice>"+fromus_classmatch[0].substring(6,fromus_classmatch[0].length)+"<\/getprodprice>");
			
			fromus_selectedText = fromus_classmatch[0].substring(6,fromus_classmatch[0].length-1);
			fromus_selectedText = /(\$[0-9\,]{0,}[\.0-9]{0,3})/g.exec(document.getElementsByClassName(fromus_selectedText)[0].textContent)[0];
		}
		else
		{
			//ni class ni id
		}  
	}
	//alert("Et ce qui est affiché dans la case est...");
	//alert(fromus_selectedText);
	
	
	
	
	
	
	this.removeEventListener('click',arguments.callee,false);
});