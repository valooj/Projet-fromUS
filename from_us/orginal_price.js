
// regex pour recuperer le nom du marchand 
var href = document.location.href;
var regexStore = /[^htps:\/)]{4,}(.*)[\.]+[com|net]{3}/gi;
var regeStore = regexStore.exec(href);
var regStore1 = regeStore[0];
var regStore = regStore1.replace(/www./,'');

// stockage du marchand dans local storage
localStorage["regStore"] = regStore;

/*
// envoit du nom du marchand au background (methode popup)
chrome.runtime.sendMessage({
    type: "popup_store", 
	regStore: regStore1.replace(/www./,'')
    
});*/






// ==NYXCosmetics.com==
if (/nyxcosmetics/.test(href)) {

  // pour trouver le nom du produit
  var oName0 = document.location.pathname;
  var oName1 = oName0.slice(0,-5);
  var oName2 = oName1.replace(/\/p\-[0-9]{1,}\-/,'');
  var oName = oName2.replace(/\-/g,' ');
  
  // pour trouver le prix
  var oPrice = document.getElementById('price').innerText;

} 


// ==Bestbuy.com==
else if (/bestbuy/.test(href)) {
	
	/*
	*	pour trouver le prix et le nom en fonction de la page
	*/	
	
	// variable de test pour comparer 2 pages
	//var test = document.getElementById('saleprice');
	
	
	// si test existe dans la page alors c'est la page où il y a 'saleprice' donc il cherche le prix
	//if (test) {
	//var oPrice = document.getElementsByClassName('price')[0].innerText;
	
	/*
	*	cette solution si il n'y a pas run at : document_end
	*/
	/*var oName0 = document.getElementById('productsummary').innerHTML;
	var oName1 = oName0.substring(oName0.indexOf('>'), oName0.indexOf('</h1>'));
	var oName = oName1.replace(/\>/,'');*/
	//var oName = document.getElementById('productsummary').getElementsByTagName('h1')[0].innerHTML;
	
	//}
	
	// si test vaut null alors il n'y a pas 'saleprix' donc autre page et cherche le prix
	//else if (test == null) {
	//var oPrice = document.getElementsByClassName('item-price')[0].innerText;
	//var oName = document.getElementById('sku-title').innerText;
	//}
	
	/*
	/	version de guillaume
	*/
	if(document.getElementById("sku-title")!=undefined)
					{
						oName		=	document.getElementById("sku-title").innerText;
					}
				else
					{
						var fromus_objectnametmp	=	document.getElementById("productsummary").innerText;
						oName		=	/(.*)\n/.exec(fromus_objectnametmp)[0];
					}
					alert(oName);

				if(document.getElementById("saleprice")!=undefined)
					{
						oPrice		=	document.getElementById("saleprice").innerText;
					}
				else
					{
						oPrice		=	document.getElementsByClassName("item-price")[0].innerText;
					}			
				//fromus_pricemin					=	fromus_reg.exec(fromus_pricemintmp)[0];	
				alert(oPrice);

					
}


// ==Amazon.com==
else if (/amazon.com/.test(href)) {

	// pour trouver le nom
	var oName = document.getElementById('btAsinTitle').innerText;
	
	
	// pour trouver le prix
	var oPrice = document.getElementsByClassName('priceLarge')[0].innerHTML;
	//var oPrice = $('#aloha-price-wrapper').html();
	//alert(oPrice);
	
}


// ==Bebe.com==
else if (/bebe.com/.test(href)) {

	// pour trouver le nom
	var oName0 = document.getElementById('description-container').innerHTML;
	//var oName1 = oName0.substring(oName0.indexOf('<h1>'), oName0.indexOf('</h1>'));
	//var oName = oName0.replace(/\<h1\>/,'');
	
	
	
	/*
	*	pour trouver le prix
	*/
	
	// variable de test car il y a des soldes sur des pages
	var testsale = document.getElementsByClassName('priceDisplay')[0].innerHTML;
	
	// si il y a strike dans les pages soldées alors calcule selon une methode sinon autre methode
	if (/strike/.test(testsale)) {
	var oPrice = document.getElementsByClassName('salePrice')[0].innerHTML;
	}
	else {
	var oPrice = document.getElementsByClassName('basePrice')[0].innerHTML;
	}
	
}


// ==Collectiblestampsgallery.com==
else if (/collectiblestampsgallery.com/.test(href)) {

	// pour trouver le nom
	var oName0 = document.getElementsByClassName('detailname')[0].innerHTML;
	var oName = oName0.replace(/\<br\>/g,'');
	
	
	// pour trouver le prix
	var oPrice = document.getElementById('pricediv0').innerText;
	
}

// ==Grainger.com==
else if (/grainger.com/.test(href)) {

	// pour trouver le nom
	var oName = document.getElementById('itemDetailsSEO').innerText;
	
	
	// pour trouver le prix
	var oPrice0 = document.getElementsByClassName('trgray')[0].innerHTML;
	var oPrice1 = oPrice0.substring(oPrice0.indexOf('<strong>'), oPrice0.indexOf('</strong>'));
	var oPrice = oPrice1.replace(/\<strong\>/,'');
	
}


// ==Target.com==
else if (/target.com/.test(href)) {

	// pour trouver le nom
	var oName = document.getElementsByClassName('fn')[0].innerHTML;
		
	// pour trouver le prix
	var oPrice = document.getElementsByClassName('offerPrice')[0].innerHTML;
	
}


// ==Dogfunk.com==
else if (/dogfunk.com/.test(href)) {

	// pour trouver le nom
	
	/*
	*	cette solution si il n'y a pas run at : document_end dans le manifest
	*/
	
	/*var oName0 = document.getElementById('buy_box_title').innerHTML;
	var oName1 = oName0.substring(oName0.indexOf('<h1>'), oName0.indexOf('</h1>'));
	var oName = oName1.replace(/\<h1\>/,'');*/
	var oName = document.getElementById('buy_box_title').getElementsByTagName('h1')[0].innerHTML;
	
	
	
	// pour trouver le prix
	var oPrice = document.getElementById('sales_price').innerText;
	
}

// ==6pm.com==
else if (/6pm.com/.test(href)) {

	// pour trouver le nom
	
	/*
	*	cette solution si il n'y a pas run at : document_end dans le manifest
	*/	
	
	/*var oName0 = document.getElementsByClassName('title')[0].innerHTML;
	var oName1 = oName0.substring(oName0.indexOf('brand">'),oName0.indexOf('</a>'));
	var oName2 = oName1.replace(/brand\"\>/,'');
	var oName3 = oName0.substring(oName0.indexOf('fn">'));
	var oName4 = oName3.replace(/fn\"\>/,'').replace(/\<\/a\>/,'');
	var oName = oName2 + ' ' + oName4;*/
	
	var oName = document.getElementById('productStage').getElementsByTagName('h1')[0].innerText;
	
	
	// pour trouver le prix
	var oPrice = document.getElementsByClassName('price')[0].innerHTML;
	
}


// ==Beallsflorida.com==
else if (/beallsflorida.com/.test(href)) {

	// pour trouver le nom
	var oName = document.getElementsByClassName('product')[0].innerHTML;
	
		
	// pour trouver le prix
	var oPrice = document.getElementsByClassName('offer-price')[0].innerHTML;
	
}


// ==Rakuten.com==
else if (/rakuten.com/.test(href)) {


	/*
	*	2 regex car il y a des featured stores donc 2 modèles de pages différents, 
	*	dans le premier www.rakuten.com
	*	dans le deuxieme shoedistrict.store.rakuten.com
	*/

	if (/www.rakuten.com/.test(href)) {
	// pour trouver le nom
	var oName = document.getElementsByClassName('ProductTitle')[0].innerHTML;
	
		
	// pour trouver le prix
	var oPrice = document.getElementById('spanMainTotalPrice').innerText;
	
	}
	
	if (/[a-z]*\.*\-*rakuten.com/.test(href)) {
	
	// variable de test pour comparer 2 pages
	var test = document.getElementById('centerTopRow');
	
		if (test) {
	
		/* pour trouver le nom
		*  replace(/([a-z])([A-Z])/g, '$1 $2') permet de mettre d'espace entre des mots en majuscule
		*/
		var oName0 = document.getElementsByClassName('pdwTitleHolder')[0].innerHTML;
		var oName = oName0.replace(/\<h1\>/,'').replace(/\<\/h1\>/,'').replace(/\s/g,'').replace(/([a-z])([A-Z])/g, '$1 $2');	
		
	
		// pour trouver le prix
		var oPrice = document.getElementsByClassName('pdwTotalPrice')[0].innerHTML;
		
		}
	
		else if (test == null) {
		// pour trouver le nom
		var oName = document.getElementsByClassName('bwcProductTitle')[0].innerHTML;
		
	
		// pour trouver le prix
		var oPrice = document.getElementsByClassName('mpsTotalPriceMoney')[0].innerHTML;
		
		}
	}
}

// stockage du nom dans local storage
localStorage["regName"] = oName;


/*
// envoit le nom au background (methode popup)
chrome.runtime.sendMessage({
    type: "popup_name", 
	regName: oName 
    
});*/


// regex pour le prix 
var regexPrice = /[0-9]{0,}\,*[0-9]{1,}\.[0-9]{0,3}/;


// normalisation du prix en string
var regPrice = regexPrice.exec(oPrice);

// stockage du prix dans local storage
localStorage["regPrice"] = regPrice;


/*
*  test si le nombre contient une , et le supprimer
*  mais ça ne marche pas
*
//alert(regPrice);
if (/\,/g.test(regPrice)) {
	regPrice = regPrice.replace(/\,/,'');
	alert('true');}*/
	
/*
// envoit du prix au background (methode popup)
chrome.runtime.sendMessage({
    type: "popup_price", 
	regPrice: regPrice // pour l'instant je laisse regPrice : regPrice car j'ai en haut regPrice = regexPrice.exec(oPrice);
    
});
*/
