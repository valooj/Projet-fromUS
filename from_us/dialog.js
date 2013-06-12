var token;
var Nick_Name;
var points;

var UrlBase= 'http://www.from-us.com/extension/cible3.php?';
var _urlProduct;
var _urlCalcul;
var _urlPanier;
var _urlLogout;
var _urlLogin;
var _urlCategorie;
var _urlSSCategorie;
var _urlPts;
var _urlAccessIn;
var _urlAccessOut;

var qteVal;
var categVal;
var regStore;
var regName;
var regPrice;
var regOffer;
var regDesc;
var regVisu;

//Generation des url avec la bonne langue
function reloadUrl(){
	 _urlProduct = UrlBase +'action=MAJ-product&lng='+defLng+'&token=';
	 _urlCalcul = UrlBase + 'action=MAJ-calcul&lng='+defLng+'&token=';
	 _urlPanier = UrlBase + 'action=MAJ-panier&lng='+defLng+'&token=';
	 _urlLogout = UrlBase + 'action=MAJ-logout&lng='+defLng+'&token=';
	 _urlLogin = UrlBase + 'action=MAJ-login&lng='+defLng;
	 _urlCategorie = UrlBase + 'action=MAJ-categorie&lng=';
	 _urlSSCategorie = UrlBase + 'action=MAJ-sscategorie&lng=';
	 _urlPts = UrlBase + 'action=MAJ-pts&lng='+defLng+'&token=';
	 _urlAccessIn = UrlBase + 'action=MAJ-accessIn';
	 _urlAccessOut = UrlBase + 'action=MAJ-accessOut&token=';
}


//Fonction d'envoie de données au serveur
//et de récupération selon le cas
function sendToServer(urlSelected, jsonSelected) {
	$.post(urlSelected, jsonSelected)
	.done(function(datas) { 
		document.getElementById('msgServer').value = '';
		switch(datas['Status']){
			case 'l':
				logShow();
			break;

			case 'L':
				token = datas['Token'];
				chrome.storage.local.set({'tokenFU': token});
				Nick_Name = datas['Message'];
				chrome.storage.local.set({'nameFU': Nick_Name});
				document.getElementById("nick_name").value = i18n('MsgWelcome')+Nick_Name ;
				hideLog();
				sendToServer(_urlPts+token,{});
				
			break;

			case 'p':
				points = datas['Message'];
				document.getElementById('ptsFU').value = points+' pts' ;
			break;

			case 'c':
				parseCat(datas['Message'],'');
			break;

			case 's':
				parseCat(datas['Message'], 'ss');
			break;

			case 'A':
				document.getElementById('msgServer').value = datas['Message'];
			break;

			case 'o':
				document.getElementById('msgServer').value = datas['Message'];
			break;

			case 'a':
				var elem = datas['Message']['sa_chemin'].split('/');
				parseInfo(elem);
				
			break;
/*
			case 'C':
				document.getElementById('msgServer').value = '' ;
				var totalPrice = datas['Prix'];
				var livPrice = datas['Prix_liv'];
				var taxPrice = datas['Prix_tax'];
				qteVal = document.getElementById('QteSpinner').value;
				categVal = document.getElementById('sscategory').value;

				if(totalPrice !== 0){
					if(confirm('L\'estimation du prix est de $'+totalPrice+' ')) {
						var jsonPanier = {priceTot: totalPrice ,priceLiv: livPrice ,priceTax: taxPrice ,libelle: regName ,url: regOffer ,desc: regDesc, qte: qteVal ,montant: totalPrice ,categ: categVal};
						var postDataPanier = JSON.stringify(jsonPanier);
						var panierJSON = {panier:postDataPanier};
						sendAjoutPanier(panierJSON);
					}
				}
			break;
*/
			default:
				//alert(datas['error']);
				document.getElementById('msgServer').value = datas['error'] ;
			break;
		}
	})
	.fail(function(datas) { 
		//alert(datas['error']);
		document.getElementById('msgServer').value = i18n('MsgBD');
		})
;};


//Foncton d'envoi de donnée au serveur pour panier
function sendAjoutPanier(panierJ) {
	$.post(_urlPanier+token, panierJ)
	.done(function(datas) { 
		if(datas['Message'] !== undefined)
			document.getElementById('msgServer').value = datas['Message'] ;

		if(datas['error'] !== undefined)
			document.getElementById('msgServer').value = datas['error'];
		})
	.fail(function(datas) { 
		document.getElementById('msgServer').value = i18n('MsgBD');
		})
;}

//Permet de remplir les zone de selection et de sous selection
function parseCat(categorieJSON, sc) {
    var $selectCat = $('select[id="'+sc+'category"]');
    $selectCat.empty();
    var obj = JSON.parse(categorieJSON);
    for(var i = 0; i < categorieJSON.length; i++) {
    	if(obj[i]){
	    	if(obj[i].type==0)
	        	$selectCat.append('<option value="'+obj[i].idCat+'" disabled="true">'+obj[i].libelleCat+'</option>');
	        else 
	        	$selectCat.append('<option value="'+obj[i].idCat+'" >'+obj[i].libelleCat+'</option>');
	    }
	}
}

//Fontion pour rechercher les chemin d'access dans la base de donnée
function searchInfo (){
	sendToServer(_urlAccessIn+'&url_site='+regStore, {});
}

//fonction pour récuper les chemin d'access d'un utilisateur
function parseInfo (elem){
	var content_pclass;
				var content_pid;
				var content_nclass;
				var content_nid;
				var content_dclass;
				var content_did;
				var content_iclass;
				var content_iid;

				for(var i=0 ; i<elem.length ; i++)
				{
				    if(elem[i].indexOf('price_class') !== (-1)){
				  		var sous_elem = elem[i].split('<-->');
				  		content_pclass= sous_elem[1]+';'+content_pclass;
				  	}
				  	else if(elem[i].indexOf('price_id') !== (-1)){
				  	 var sous_elem = elem[i].split('<-->');
				  		content_pid= sous_elem[1]+';'+content_pid;
				  	}
				  	else if(elem[i].indexOf('name_class') !== (-1)){
				  		var sous_elem = elem[i].split('<-->');
				  		content_nclass= sous_elem[1]+';'+content_nclass;
				  	}
				  	else if(elem[i].indexOf('name_id') !== (-1)){
				  	 var sous_elem = elem[i].split('<-->');
				  		content_nid= sous_elem[1]+';'+content_nid;
				  	} 
				  	else if(elem[i].indexOf('desc_class') !== (-1)){
				  		var sous_elem = elem[i].split('<-->');
				  		content_dclass= sous_elem[1]+';'+content_dclass;
				  	}
				  	else if(elem[i].indexOf('desc_id') !== (-1)){
				  	 var sous_elem = elem[i].split('<-->');
				  		content_did= sous_elem[1]+';'+content_did;
				  	}
				  	else if(elem[i].indexOf('img_class') !== (-1)){
				  		var sous_elem = elem[i].split('<-->');
				  		content_iclass= sous_elem[1]+';'+content_iclass;
				  	}
				  	else if(elem[i].indexOf('img_id') !== (-1)){
				  	 var sous_elem = elem[i].split('<-->');
				  		content_iid= sous_elem[1]+';'+content_iid;
				  	} 
				} 

				//Test pour le prix
				fromus_recupPrice('id',content_pid);
				if(localStorage['regPrice'] == fromus_error) 
					fromus_recupPrice("class",content_pclass);

				//Test pour le name
				fromus_recupName('id',content_nid);
				if(localStorage['regName'] == fromus_error) 
					fromus_recupName('class',content_nclass);

				//Test pour la description
				fromus_recupDesc('id',content_did);
				if(localStorage['regName'] == fromus_error) 
					fromus_recupDesc('class',content_dclass);

				//Test pour l'image'
				fromus_recupImg('id',content_iid);
				if(localStorage['regName'] == fromus_error) 
					fromus_recupImg('class',content_iclass);

				regPrice = localStorage['regPrice'];
				$('#fromus_price').attr('value',regPrice);
				regName = localStorage['regName'];
				$('#fromus_name').attr('value',regName);
				regDesc = localStorage['regDesc'];
				//$('#fromus_desc').attr('value',regDesc);
				if(regDesc == '?')
					document.getElementById('fromus_desc').value = '...' ;
				else
					document.getElementById('fromus_desc').value = regDesc ;
				regVisu = localStorage['regImg'];
				$('#fromus_image').attr('value',regVisu);
				
}

//fonction pour cacher la div de login
//et montrer la div de deconnection
function hideLog(){
	$('#loginU').hide();
	$('#isconnect').show();
};


//fonction pour cacher la div de logout
//et montrer la div de login
function showLog(){
	$('#loginU').show();
	$('#isconnect').hide();
};

//fonction pour charger tt les text au lancement de l'ext
function loadText(){
	document.getElementById('tabAdd').innerHTML = i18n('tabAdd') ;
	document.getElementById('tabBuy').innerHTML = i18n('tabBuy') ;
	document.getElementById('store').innerHTML = i18n('Merchant') ;
	document.getElementById('nameP').innerHTML = i18n('NameP') ;
	document.getElementById('priceP').innerHTML = i18n('PriceP') ;		
	document.getElementById('categP').innerHTML = i18n('CategP') ;
	document.getElementById('scategP').innerHTML = i18n('SCategP') ;
	document.getElementById('addP').value = i18n('ButtonAdd') ;
				
	document.getElementById('FormP').innerHTML = i18n('FormP') ;
	document.getElementById('disconnect').value = 'logout' ;

	document.getElementById('buyP').value = i18n('ButtonBuy') ;
	document.getElementById('fu_quantite').innerHTML = i18n('QuantityP') ;
	document.getElementById('fu_assurance').innerHTML = i18n('InsuranceP') ;

	document.getElementById('priceQ').value = '?';
	document.getElementById('priceQ').title = i18n('BullePrice') ;
	document.getElementById('nameQ').value = '?';
	document.getElementById('nameQ').title = i18n('BulleName') ;
	document.getElementById('descQ').value = '?';
	document.getElementById('descQ').title = i18n('BulleDesc') ;
	document.getElementById('imgQ').value = '?';
	document.getElementById('imgQ').title = i18n('BulleImg') ;

	document.getElementById('descP').innerHTML = i18n('Description') ;
	document.getElementById('imgP').innerHTML = i18n('Image') ;

   	sendToServer(_urlCategorie+defLng,{});

}

//Fonction pour mettre a jour les zone de texte apres sélection du client
function miseaJ(){
	if(localStorage['regPrice']){
		document.getElementById('fromus_price').value = localStorage['regPrice'] ;
	}
	if(localStorage['regName']){
		document.getElementById('fromus_name').value = localStorage['regName'] ;
	}
	if(localStorage['regDesc']){
		document.getElementById('fromus_desc').value = localStorage['regDesc'] ;
	}
	if(localStorage['regImg'] && isUrl(localStorage['regImg'])) {
		document.getElementById('fromus_image').value = localStorage['regImg'] ;
	}
}

//Permet de savoir si c'est une url
function isUrl(s) {
	var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
	return regexp.test(s);
}

$(document).on('change, keyup, mouseover', 'input', function() {
	if(regVisu != 'undefined'){
	    $('#img-view').css('background-image', 'url('+regVisu+')');
	    $('#img-view').width( $(this).width()+2 );
	}
});

$(document).ready(function() {
	
	var newDialog = $('<div id="fromus_dialogBox" class="toto">' +
					    '<div id="header">'+
							'<div id="selectLang">' +
	      						'<img id="lgfr" src="" />'+
							    '<img id="lgen" src="" />'+
							    '<img id="lgde" src="" />'+
	    					'</div>'+
	    					'<FORM name="loginU" id="loginU">'+
	    						'<hr id="hr1" style="margin-top: 20px;"/>'+
	     						'<input type="textbox" id="emailBox" placeholder="email"/><input type="password" id="passBox" placeholder="password"/>'+
	     						'<INPUT TYPE="button" NAME="logB" VALUE="Login" id="connect">'+
	     						'<hr id="hr2" style="margin-top: 65px;"/>'+
	    					'</FORM>'+
	    					'<div id="isconnect">'+
	    						'<hr id="hr1" style="margin-top: 20px;"/>'+
	      						'<input type="textbox" id="nick_name" disabled="true" style="border:none"/><br />'+
							    '<input type="textbox" id="ptsFU" disabled="true" style="border:none"/><br />'+
							    '<INPUT TYPE="button" NAME="dislogB" id="disconnect">'+
							    '<hr id="hr2" style="margin-top: 35px;"/>'+
					    	'</div>'+
					    '</div>'+
							'<form id="fromusForm">' + 
								'<div id="menu" class="element_menu">'+
									'<ul id="onglets">'+
									    '<li id="liAdd"><a href="#tab1" id="tabAdd"></a></li>'+
									    '<li id="liBuy"><a href="#tab2" id="tabBuy"></a></li>'+
									'</ul>'+
								'</div><br />'+
								'<div id="corpAdd">'+
									'<input type="textbox" id="msgServer" disabled="true" style="border:none"/>'+
									'<div id="fromus_tabs">'+
									    '<h2 id="FormP"></h2>'+
									    '<form id="fromusForm">'+
									    '<label for="store" id="store"></label><br />'+
										'<input type="textbox" id="fromus_store" disabled="true"/><br />'+
										'<label for="name" id="nameP"></label><br />'+
										'<input type="textbox" id="fromus_name" disabled="true"/><input title="" type="button" id="nameQ"><br />'+
										'<label for="price" id="priceP" ></label><br />'+
										'<input type="textbox" id="fromus_price" disabled="true"/><input title="" type="button" id="priceQ"> <br />'+
										'<label for="description" id="descP" ></label><br />'+
										'<textarea id="fromus_desc" disabled="true" rows="2" cols="32"></textarea><input type="button" title="" id="descQ"> <br />'+
										'<label for="image" id="imgP" ></label><br />'+
										'<div id="image">'+
											'<input type="textbox" id="fromus_image" disabled="true"/>'+
									     	'<span id="img-view"></span>'+
									    '</div>'+
									    '<input type="button" title="" id="imgQ"> <br />'+
										'<label for="category" id="categP"></label><br />'+
										'<select id="category">'+
										'</select><br />'+
										'<label for="sscategory" id="scategP"></label><br />'+
										'<select id="sscategory">'+
										'</select><br />'+
									'<div class="content" id="tab1">'+
									    '<input type="button" id="addP">'+
									'</div>'+
									'<div class="content" id="tab2">'+
									    '<label id="fu_quantite" for="quantite"></label><input id="QteSpinner" value="1"><br />'+
									    '<label id="fu_assurance" for="assurance"></label><input type="checkbox" id="checkassur" name="assurance" /><br />'+
									    '<input type="button" id="buyP"> '+
									'</div>'+
							'</form>'+
						'<a href="http://from-us.com/fromus" target=_blank><img id="logofromus" height="100" src=""/></a>' +
					'</div>'
	);

	// variable qui permet de savoir si la dialog box est ouverte
	var isOpen = $('#fromus_dialogBox').dialog('isOpen');

	
	if (isOpen != true) {	

		newDialog.dialog({
	    	modal: false,
			title: 'from-us',
			position: 
				{
					my: 'right top', 
					at: 'right top'
				},
			height: 667,
			width: 345,
			resizable: true,
			closeOnEscape: true,

			// bouton X => ferme la pop up
			close: function(ev,ui) {
				$(this).remove();
			},

			// au demarrage on cache le bouton commander, la quantité et l'assurance
			open: function(ev,ui) {
				var img = document.getElementById('logofromus');
  				img.src = chrome.extension.getURL('/img/logo.png');
  				var imgen = document.getElementById('lgen');
  				imgen.src = chrome.extension.getURL('/img/en.png');
  				var imgde = document.getElementById('lgde');
  				imgde.src = chrome.extension.getURL('/img/de.png');
  				var imgfr = document.getElementById('lgfr');
  				imgfr.src = chrome.extension.getURL('/img/fr.png');

  				reloadUrl();
  				loadText();

  				$('#tab2').hide();
				$('#tab1').show();

  				chrome.storage.local.get('tokenFU',function(result){
				 	token=result.tokenFU;
				 	if(token && token != 'undefined'){
						hideLog();
					}
					else 
					showLog();
				});
				chrome.storage.local.get('nameFU',function(result){
				  Nick_Name=result.nameFU;
				  if(Nick_Name && Nick_Name != 'undefined'){
						document.getElementById('nick_name').value = i18n('MsgWelcome')+Nick_Name ;
						sendToServer(_urlPts+token,{});
					}		
				});

				regStore = localStorage['regStore'];
				$('#fromus_store').attr('value',regStore);

				searchInfo();
			}
	    });

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

	    //Pour montrer que l'onglet add
		$('a[id=tabAdd]').click(function() {
			$('#tab2').hide();
			$('#tab1').show();
	  	});

		//Pour montrer que l'onglet buy
		$('a[id=tabBuy]').click(function() {
			$('#tab1').hide();
			$('#tab2').show();
	  	});

		$('input[id=connect]').click(function() {
			
	   		var emailV = document.getElementById('emailBox').value;
			var passwordV = document.getElementById("passBox").value;
			if (emailV && passwordV){
				var jsonLog = {email: emailV ,password: passwordV};
				var postLog = JSON.stringify(jsonLog);
				var logJSON = {log:postLog};
				sendToServer(_urlLogin, logJSON);
			}
	  	});

	  	$('input[id=addP]').click(function() {
	  		if(!token)
	  			document.getElementById('msgServer').value = i18n('MsgConnect');
	  		else{
				var categVal = document.getElementById('sscategory').value;
				regOffer = localStorage['urlOffer'];
				if(!regName)
					regName=localStorage['regName'];
				if(!regPrice)
					regPrice=localStorage['regPrice'];

				
				if((localStorage["regGetName"] || localStorage["regGetPrice"] )&& regStore){
					var siteAccess='';
					if(localStorage["regGetName"])
						siteAccess = siteAccess + localStorage["regGetName"];
					if(localStorage["regGetPrice"])
						siteAccess = siteAccess + localStorage["regGetPrice"];

					var jsonAccess = {url: regStore, access: siteAccess};
					var postDataAccess = JSON.stringify(jsonAccess);
					var accessJSON = {access:postDataAccess};
					sendToServer(_urlAccessOut+token, accessJSON);
				}

				if(!categVal)
					categVal=0;
				if(regName && regOffer && regPrice){
					var jsonProduct = {prd_libelle: regName ,prd_site: regOffer, prd_desc: regDesc, prd_visu: regVisu, prd_prix: regPrice, prd_cat: categVal};
					var postData = JSON.stringify(jsonProduct);
					var productJSON = {product:postData};
					sendToServer(_urlProduct+token , productJSON);
				}
			}
	  	});

	  	$('input[id=buyP]').click(function() {
	  		if(!token)
	  			document.getElementById('msgServer').value = i18n('MsgConnect');
	  		else{
				var qteVal = document.getElementById('QteSpinner').value;
				var categVal = document.getElementById('sscategory').value;

				
				regOffer = localStorage['urlOffer'];
				if(!regName)
					regName=localStorage['regName'];
				if(!regPrice)
					regPrice=localStorage['regPrice'];

				
				if((localStorage["regGetName"] || localStorage["regGetPrice"] )&& regStore){
					var siteAccess='';
					if(localStorage["regGetName"])
						siteAccess = siteAccess + localStorage["regGetName"];
					if(localStorage["regGetPrice"])
						siteAccess = siteAccess + localStorage["regGetPrice"];

					var jsonAccess = {url: regStore, access: siteAccess};
					var postDataAccess = JSON.stringify(jsonAccess);
					var accessJSON = {access:postDataAccess};
					sendToServer(_urlAccessOut+token, accessJSON);
				}

				if(!categVal)
					categVal=0;

				if(regName && regOffer && regPrice){
					var jsonProduct = {prd_libelle: regName ,prd_site: regOffer, prd_desc: regDesc, prd_visu: regVisu, prd_prix: regPrice, prd_cat: categVal};
					var postData = JSON.stringify(jsonProduct);
					var productJSON = {product:postData};
					sendToServer(_urlProduct+token , productJSON);
				}

				setTimeout(function() {
					categVal = document.getElementById('sscategory').value;
					
					if(!categVal ){
						document.getElementById('msgServer').value = i18n('Infocateg');
					}
		  			else{
						/*
						var jsonCalcul = {libelle: regName, qte: qteVal ,montant: regPrice ,categ: categVal};
						var postDataCalcul = JSON.stringify(jsonCalcul);
						var calculJSON = {calcul:postDataCalcul};
						sendToServer(_urlCalcul+token , calculJSON);
						*/
						document.getElementById('msgServer').value = '' ;
						qteVal = document.getElementById('QteSpinner').value;
						categVal = document.getElementById('sscategory').value;
						
						var jsonPanier = {priceTot: regPrice ,libelle: regName ,url: regOffer ,desc: regDesc, qte: qteVal ,categ: categVal};
						var postDataPanier = JSON.stringify(jsonPanier);
						var panierJSON = {panier:postDataPanier};
						console.log(panierJSON);
						sendAjoutPanier(panierJSON);
					}
				}, 1000);
			}
	  	});

	  	$('input[id=disconnect]').click(function() {
			
	   		sendToServer(_urlLogout+token, {});
			chrome.storage.local.set({'tokenFU': ''});
			chrome.storage.local.set({'nameFU': ''});
			token='';
			Nick_Name = '';
			showLog();
	  	});

	  	$('select[id=category]').change(function() {
		var categV = document.getElementById('category').value;
		if (categV)
			sendToServer(_urlSSCategorie+defLng+'&sscateg='+categV, {});
		else{
		   	var $selectCat = $('select[id=sscategory]');
		   	$selectCat.empty();
		}
	  	});

	  	//Pour le changement de langue
		$('img[id=lgfr]').click(function() {
			changeLng('fr');
			loadText();
			reloadUrl();
	  	});
	  	$('img[id=lgen]').click(function() {
			changeLng('en');
			loadText();
			reloadUrl();
		});
		$('img[id=lgde]').click(function() {
			changeLng('de');
			loadText();
			reloadUrl();
		});

		//Pour la recuperation de la part de lutilisateur
		var priceq = document.getElementById('priceQ');
		var runtimeOrExtension = chrome.runtime && chrome.runtime.sendMessage ?
 		'runtime' : 'extension';
		priceq.addEventListener('click', function(e){
			console.log('debut listener priceq');
			document.getElementById('fromus_price').value="";
			var settime = setTimeout(function() {getPrice()}, 1000);
			var setinter = setInterval(function() {miseaJ()}, 600); 
			if(document.getElementById('fromus_price').value)
				clearInterval(setinter);
		}, false); 

		var nameq = document.getElementById('nameQ');
		nameq.addEventListener('click', function(e){
			console.log('debut listener nameq');
			document.getElementById('fromus_name').value="";
			var settime = setTimeout(function() {getName()}, 1000);
			var setinter = setInterval(function() {miseaJ()}, 600); 
			if(document.getElementById('fromus_name').value)
				clearInterval(setinter);
		}, false);

		var descq = document.getElementById('descQ');
		descq.addEventListener('click', function(e){
			console.log('debut listener descq');
			document.getElementById('fromus_desc').value="";
			var settime = setTimeout(function() {getDesc()}, 1000);
			var setinter = setInterval(function() {miseaJ()}, 600); 
			if(document.getElementById('fromus_desc').value)
				clearInterval(setinter);
		}, false);  

		var imgq = document.getElementById('imgQ');
		imgq.addEventListener('click', function(e){
			console.log('debut listener imgq');
			document.getElementById('fromus_image').value="";
			var settime = setTimeout(function() {getImg()}, 1000);
			var setinter = setInterval(function() {miseaJ()}, 600); 
			if(document.getElementById('fromus_image').value)
				clearInterval(setinter);
		}, false);      
	
		// ouverture de la dialog box
		newDialog.dialog('open');
		//suppression des key dans le localstorage
		localStorage.removeItem('regDesc');
		localStorage.removeItem('regName');
		localStorage.removeItem('regPrice');
		localStorage.removeItem('regGetName');
		localStorage.removeItem('regGetPrice');
		localStorage.removeItem('regStore');
		localStorage.removeItem('regOffer'); 
	}
});

