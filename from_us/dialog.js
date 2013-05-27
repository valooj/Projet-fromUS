var token;
var language =  window.navigator.language ;


var _urlProduct = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-product&token=';
var _urlCalcul = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-calcul&token=';
var _urlPanier = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-panier&token=';
var _urlLogout = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-logout&token=';
var _urlLogin = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-login';

var _urlCategorie = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-categorie';
var _urlSSCategorie = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-sscategorie&sscateg=';

var qteVal;
var categVal;
var regStore;
var regName;
var regPrice;
var regOffer;
var regDesc;
var regVisu;

//Pour stocker le cookie et le lire 
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}


//Fonctions d'envoie de données au serveur
function sendToServer(urlSelected, jsonSelected) {
	$.post(urlSelected, jsonSelected)
	.done(function(datas) { 
		switch(datas['Status']){
			case 'l':
				document.getElementById("Nick_Name").value = chrome.i18n.getMessage("MsgConnect");
				//alert(datas['Message']);
			break;

			case 'L':
				token = datas['Token'];
				createCookie('token',token,21);
				createCookie('Nick_Name',datas['Message'],21);
				document.getElementById("Nick_Name").value = chrome.i18n.getMessage("MsgWelcome")+datas['Message'];
			break;

			case 'c':
				parseCat(datas['Message'],'');
			break;

			case 's':
				parseCat(datas['Message'], 'ss');
			break;

			case 'A':
				alert(datas['Message']);
			break;

			case 'C':
				var totalPrice = datas['Prix'];
				if(totalPrice !== 0){
					if(confirm('L\'estimation du prix est de $'+totalPrice+' ')) {
						
						var jsonPanier = {libelle: regName ,url: regOffer ,desc: regDesc, qte: qteVal ,montant: totalPrice ,categ: categVal};
						var postDataPanier = JSON.stringify(jsonPanier);
						var panierJSON = {panier:postDataPanier};
						sendAjoutPanier(panierJSON);
					}
				}
			break;

			default:
				alert(datas['error']);
			break;
		}
	})
	.fail(function(datas) { 
		alert(datas['error']); 
		})
;}


function sendAjoutPanier(panierJ) {
	$.post(_urlPanier+token, panierJ)
	.done(function(datas) { 
		if(datas['Message'] !== undefined)
			alert(datas['Message']);

		if(datas['error'] !== undefined)
			alert(datas['error']);  
		})
	.fail(function(datas) { 
		alert(datas['error']); 
		})
;}

function parseCat(categorieJSON, sc) {
    var $selectCat = $('select[id="'+sc+'category"]');
    $selectCat.empty();
    var obj = JSON.parse(categorieJSON);
    for(var i = 0; i < categorieJSON.length; i++) {
    	if(obj[i].type==0)
        	$selectCat.append('<option value="'+obj[i].idCat+'" disabled="true">'+obj[i].libelleCat+'</option>');
        else
        	$selectCat.append('<option value="'+obj[i].idCat+'" >'+obj[i].libelleCat+'</option>');
    }
}

$(document).ready(function() {

	console.log( "Variable from Content Script: "+localStorage["regStore"] );
	console.log( "Variable from Content Script: "+localStorage["regName"] );
	console.log( "Variable from Content Script: "+localStorage["regPrice"] );
	console.log( "Variable from Content Script: "+localStorage["regDesc"] );

	var retyu = 0;
	console.log(retyu + 1);


	var newDialog = $('<div id="fromus_dialogBox" class="toto">' +
						'<div id="fromus_tabs">' +
							'<ul>' +
								'<li><a href="#fromus_tabs-1">'+chrome.i18n.getMessage("tabAdd")+'</a></li>' +
								'<li><a href="#fromus_tabs-1">'+chrome.i18n.getMessage("tabBuy")+'</a></li>' +
								'<li><a href="#fromus_tabs-2">'+chrome.i18n.getMessage("tabAccount")+'</a></li>' +
							'</ul>' +
							'<div id="fromus_tabs-1">' +
								'<label for="Nick_Name"></label><input type="textbox" id="Nick_Name" disabled="true" style="border:None"/></br>' +
								'<h2>'+chrome.i18n.getMessage("FormP")+'</h2>' +
								'<form id="fromusForm">' + 

									'<label for="store">'+chrome.i18n.getMessage("Merchant")+'</label><input type="textbox" id="fromus_store" disabled="true"/></br>' +
									'<label for="name">'+chrome.i18n.getMessage("NameP")+'</label><input type="textbox" id="fromus_name" disabled="true"/><input type="button" value="test" id="fromus_morename" /></br>' + 
									'<label for="price">'+chrome.i18n.getMessage("PriceP")+'</label><input type="textbox" id="fromus_price" /></br>' +
									'<label for="category">'+chrome.i18n.getMessage("CategP")+'</label>'+ 
										'<select id="category">' +
										'</select></br>' +
									'<label for="sscategory">'+chrome.i18n.getMessage("SCategP")+'</label>' +
										'<select id="sscategory">' +

										'</select></br>' +
									'<label id="fromus_quantite" for="quantite">'+chrome.i18n.getMessage("QuantityP")+'</label><input id="QteSpinner" value="1"></br>' +
									'<label id="fromus_assurance" for="assurance">'+chrome.i18n.getMessage("InsuranceP")+'</label>' +
									'<div id="fromus_divassurance">' +
										'<input type="checkbox" id="fromus_checkassurance" name="assurance" />' +
									'</div>' +
								'</form>' +
							'</div>' +
							'<div id="fromus_tabs-2">' +
								'<h2>From-us.com</h2>' +

								'<p>'+chrome.i18n.getMessage("MsgIdPass")+'</p>' +
								'<label for="idfromus">'+chrome.i18n.getMessage("EmailU")+'</label><input type="textbox" id="idfromus" /></br>' +
								'<label for="mdpfromus">'+chrome.i18n.getMessage("PasswordU")+'</label><input type="password" id="mdpfromus" /></br>' +

								'<input type="button" value="login" id="log" />' +
								'<a href="http://from-us.com/fromus" target="_blank">'+chrome.i18n.getMessage("OubliU")+'</a>' +
								'<a href="http://from-us.com/fromus" target="_blank">'+chrome.i18n.getMessage("CreateU")+'</a>' +
							'</div>' +
						'</div>' +
						'<a href="http://from-us.com/fromus" target=_blank><img id="logofromus" height="100" src=""/></a>' +
					'</div>');

	// variable qui permet de savoir si la dialog box est ouverte
	var isOpen = $("#fromus_dialogBox").dialog("isOpen");

	
	if (isOpen != true) {	

		newDialog.tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
		newDialog.removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
		newDialog.dialog({
	    	modal: false,
			title: "From-us.com",
			//show: 'clip',
			//hide: 'clip',
			//autoOpen: false
			position: 
				{
					my: "left top", 
					at: "left top"
				},
			height: 380	,
			width: 880,
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
  				$("#btnSubmit").hide();
  				$("#QteSpinner").hide();
				$("#fromus_quantite").hide();
				$("#fromus_assurance").hide();
				$("#fromus_divassurance").hide();
			},

			buttons: 
				[
					// bouton submit qui permet de commander un produit 
					{
						text: chrome.i18n.getMessage("ButtonBuy"), 
						id: "btnSubmit",
						click: function() {

							var qteSpinner = document.getElementById("QteSpinner");
							qteVal = qteSpinner.value;
							var categSelect = document.getElementById("sscategory");
							categVal = categSelect.value;

							var jsonProduct = {prd_libelle: regName ,prd_site: regOffer, prd_desc: regDesc, prd_visu: regVisu, prd_prix: regPrice, prd_cat: categVal};
							var postData = JSON.stringify(jsonProduct);
							var productJSON = {product:postData};
							sendToServer(_urlProduct+token,productJSON);


							var jsonCalcul = {libelle: regName, qte: qteVal ,montant: regPrice ,categ: categVal};
							var postDataCalcul = JSON.stringify(jsonCalcul);
							var calculJSON = {calcul:postDataCalcul};
							sendToServer(_urlCalcul+token , calculJSON);
						}
					},		
				
					// bouton ajouter qui permet d'ajouter un produit dans la base de données 
					// à ne pas confondre avec le bouton submit 
					{ 
						text: chrome.i18n.getMessage("ButtonAdd"), 
						id: "btnAdd",
						click: function() {

							var qteSpinner = document.getElementById("QteSpinner");
							qteVal = qteSpinner.value;
							var categSelect = document.getElementById("sscategory");
							categVal = categSelect.value;

							var jsonProduct = {prd_libelle: regName ,prd_site: regOffer, prd_desc: regDesc, prd_visu: regVisu, prd_prix: regPrice, prd_cat: categVal};
							var postData = JSON.stringify(jsonProduct);
							var productJSON = {product:postData};
							sendToServer(_urlProduct+token , productJSON);
						}
					},


					// bouton cancel, mettre destroy au lieu de close pour supprimer completement la dialog box
					// à modifier en bouton reset
					{
						text: "Reset", 
						id: "btnReset",
						click: function() {
							$(':input','#fromusForm')
							   .not(':button, :submit, :reset, :hidden')
							   .val('')
							   .removeAttr('checked')
							   .removeAttr('selected');
						}
					},
				]
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

		

		newDialog.tabs({
			active: 0,
			activate: function(event,ui) {

				bindEvent(document,'click', function(event) 
					{ 
						var target = event.target || event.srcElement;
						var tabclick = target.textContent;
					
						// si bouton commander on affiche comander, reset, quantite et assurance
						// et on cache le bouton ajouter
						if (/Commander/.test(tabclick) || /Buy/.test(tabclick)) {
							$("#btnSubmit").show();
							$("#btnReset").show();
							$("#btnAdd").hide();
							$("#QteSpinner").show();
							$("#fromus_quantite").show();
							$("#fromus_assurance").show();
							$("#fromus_divassurance").show();
						}

						// si bouton ajouter on affiche bouton ajouter, reset
						// et on cache bouton commander, quantite et assurance
						if (/Ajouter/.test(tabclick)|| /Add/.test(tabclick)) {
							$("#btnAdd").show();
							$("#btnReset").show();
							$("#btnSubmit").hide();
							$("#QteSpinner").hide();
							$("#fromus_quantite").hide();
							$("#fromus_assurance").hide();
							$("#fromus_divassurance").hide();
							
						}

						// si bouton mon compte on cache bouton ajouter, commander et reset
						if (/Mon compte/.test(tabclick)|| /My account/.test(tabclick)) {
							$("#btnAdd").hide();
							$("#btnReset").hide();
							$("#btnSubmit").hide();
						}

					this.removeEventListener('click',arguments.callee,false);
					});
			}
  		});

						
		// creation du spinner pour la quantite
		var newSpinner = $( "#QteSpinner" ).spinner({
			min: 1
		});	

		/*var value;
		var $container=$("#QteSpinner");
		var newSpinner = $container.spinner({
		        min: 1,
		    }).focus(function () {
		        value = $container.val();
		    }).blur(function () {
		        var value1 = $container.val();
		        if (value1<0) {
		           $container.val(value);
		        }
		        if(isNaN(value1))
		        {
		           $container.val(value);
		        } 

		    });*/


		// ajout du marchand automatiquement
		regStore = localStorage["regStore"];
		$('#fromus_store').attr('value',regStore);

		// ajout du nom automatiquement
		regName = localStorage["regName"];
		$('#fromus_name').attr('value',regName);

		// ajout du prix automatiquement
		regPrice = localStorage["regPrice"];
		$('#fromus_price').attr('value',regPrice);

		regOffer = localStorage["regOffer"];

		regDesc = localStorage["regDesc"];

		regVisu = localStorage["regImg"];

		var fromus_morename = document.getElementById('fromus_morename');
		var runtimeOrExtension = chrome.runtime && chrome.runtime.sendMessage ?
 		'runtime' : 'extension';
		fromus_morename.addEventListener('click', function(e){
			console.log('morename');
			localStorage["fromus_morename"] =	JSON.stringify(true);
			chrome[runtimeOrExtension].sendMessage({greeting: "hello"}, function(response) {
  			console.log(response.farewell);
		});

			//$('#fromus_name').attr('value',"you");
			$('#fromus_name').attr('value',localStorage["regName"]);
		}, false);


		

		
		
		/*$( "#fromus_morename" ).button({
      icons: {
        primary: "ui-icon-locked"
      },
      text: false
  		});*/



		//Action sur le bouton login/logout
		var in_out = document.getElementById('log');
		in_out.addEventListener('click', function(e){
			if ( in_out.value == "login" ){
		    	in_out.value = "logout";
		    	var getemail = document.getElementById("idfromus");
				var getpassword = document.getElementById("mdpfromus");
				var emailV = getemail.value;
				var passwordV = getpassword.value;
				document.getElementById("idfromus").value='';
				document.getElementById("mdpfromus").value='';
				if (emailV && passwordV){
					var jsonLog = {email: emailV ,password: passwordV};
					var postLog = JSON.stringify(jsonLog);
					var logJSON = {log:postLog};
					sendToServer(_urlLogin, logJSON);
					
				}
		    }
		    else{
		        in_out.value = "login";
		    	sendToServer(_urlLogout+token, {});
		    	eraseCookie('token');
		    	eraseCookie('Nick_Name');
		    	
			}
				    
		}, false);

		//action sur le select de categorie pour la mise a jour de sscategory
		var categ = document.getElementById('category');
		categ.addEventListener('change', function(e){
			var categV = categ.value;
			if (categV){
				sendToServer(_urlSSCategorie+categV, {});
		    }    
		}, false);

		
		// ouverture de la dialog box
		newDialog.dialog("open");

		//Recupere la liste de catégorie
		sendToServer(_urlCategorie,{});

		//Récupere le token 
		if(readCookie('token')){
			token=readCookie('token');
			(!token)?in_out.value = 'login' : in_out.value = 'logout';
			document.getElementById("Nick_Name").value = chrome.i18n.getMessage("MsgWelcome")+readCookie('Nick_Name');
		}
		else
			document.getElementById("Nick_Name").value = chrome.i18n.getMessage("MsgConnect");
			//alert('Vous devez vous connecter');

				
		// suppression des key dans le localstorage
		localStorage.removeItem('regDesc');
		//localStorage.removeItem('regName');
		localStorage.removeItem('regPrice');
		localStorage.removeItem('regStore');
		localStorage.removeItem('regOffer');
			
	}
});





