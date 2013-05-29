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

	
	var newDialog = $('<div id="fromus_dialogBox" class="toto">' +
						'<div id="fromus_tabs">' +
							'<ul>' +
								'<li><a href="#fromus_tabs-1">tabAdd</a></li>' +
								'<li><a href="#fromus_tabs-1">tabBuy</a></li>' +
								'<li><a href="#fromus_tabs-2">tabAccount</a></li>' +
							'</ul>' +
							'<label for="Nick_Name"></label><input type="textbox" id="Nick_Name" disabled="true"/></br>' +
							'<div id="fromus_tabs-1">' +
								'<h2>FormP</h2>' +
								'<form id="fromusForm">' + 

									'<label for="store">Merchant</label><input type="textbox" id="fromus_store" disabled="true"/></br>' +
									'<label for="name">NameP</label><input type="textbox" id="fromus_name" disabled="true"/><input type="button" id="fromus_morename" /></br>' + 
									'<label for="price">PriceP</label><input type="textbox" id="fromus_price" /><input type="button" id="fromus_moreprice" /></br>' +
									'<label for="category">CategP</label>'+ 
										'<select id="category">' +
										'</select></br>' +
									'<label for="sscategory">SCategP</label>' +
										'<select id="sscategory">' +

										'</select></br>' +
									'<label id="fromus_quantite" for="quantite">QuantityP</label><input id="QteSpinner" value="1"></br>' +
									'<label id="fromus_assurance" for="assurance">InsuranceP</label>' +
									'<div id="fromus_divassurance">' +
										'<input type="checkbox" id="fromus_checkassurance" name="assurance" />' +
									'</div>' +
								'</form>' +
							'</div>' +
							'<div id="fromus_tabs-2">' +
								'<h2>From-us.com</h2>' +

								'<p>MsgIdPass</p>' +
								'<label for="idfromus">EmailU</label><input type="textbox" id="idfromus" /></br>' +
								'<label for="mdpfromus">PasswordU</label><input type="password" id="mdpfromus" /></br>' +

								'<input type="button" value="login" id="log" />' +
								'<a id="login" href="http://from-us.com/fromus" target="_blank">OubliU</a>' +
								'<a id="create" href="http://from-us.com/fromus" target="_blank">CreateU</a>' +
							'</div>' +
						'</div>' +
						'<a href="http://from-us.com/fromus" target=_blank><img id="logofromus" height="100" src=""/></a>' +
					'</div>');

	// variable qui permet de savoir si la dialog box est ouverte
	var isOpen = $("#fromus_dialogBox").dialog("isOpen");
	console.log("apres la trad");

	
	if (isOpen != true) {	

		newDialog.tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
		newDialog.removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
		console.log("apres tabs vertical");
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
			height: 400,
			width: 880,
			resizable: true,
			closeOnEscape: true,

			// bouton X => ferme la pop up
			close: function(ev,ui) {
				$(this).remove();
			},

			// au demarrage on cache le bouton commander, la quantité et l'assurance
			open: function(ev,ui) {
				//var img = document.getElementById('logofromus');
  				//img.src = chrome.extension.getURL('/img/logo.png');
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
						text: "ButtonBuy", 
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
						text: "ButtonAdd", 
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

		console.log("apres newDialog");

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

		console.log("apres dialog tabs");
						
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

		console.log("apres ajout automatiquement");

		console.log("avant d'appuyer sur le bouton : " + localStorage["regName"]);

		var fromus_morename = document.getElementById('fromus_morename');
		/*var runtimeOrExtension = chrome.runtime && chrome.runtime.sendMessage ?
 		'runtime' : 'extension';
		fromus_morename.addEventListener('click', function(e){
			console.log('morename');
			console.log("avant d'executer le script : " + localStorage["regName"]);
			var start = new Date().getTime();
			localStorage["fromus_morename"] =	JSON.stringify(true);
			chrome[runtimeOrExtension].sendMessage({greeting: "hello"}, function(response) {
  			console.log(response.farewell);
  		});
			var end = new Date().getTime();
			var time = end - start;
			var timeafterbtn = time + 15;
			
			setTimeout(function () {
	        	$('#fromus_name').attr('value',localStorage["regName"]);
	        	console.log("apres avoir d'executer le script : " + localStorage["regName"]);
        	}, timeafterbtn);
			
			
		}, false);

		var fromus_moreprice = document.getElementById('fromus_moreprice');
		var runtimeOrExtension = chrome.runtime && chrome.runtime.sendMessage ?
 		'runtime' : 'extension';
		fromus_moreprice.addEventListener('click', function(e){
			console.log('moreprice');
			console.log("avant d'executer le script : " + localStorage["regPrice"]);
			var start = new Date().getTime();
			localStorage["fromus_moreprice"] =	JSON.stringify(true);
			chrome[runtimeOrExtension].sendMessage({greeting: "youhou"}, function(response) {
  			console.log(response.farewell);
  		});
			var end = new Date().getTime();
			var time = end - start;
			var timeafterbtn = time + 15;
			
			setTimeout(function () {
	        	$('#fromus_price').attr('value',localStorage["regPrice"]);
	        	console.log("apres avoir d'executer le script : " + localStorage["regPrice"]);
        	}, timeafterbtn);
			
			
		}, false);

		console.log("apres btn morename et moreprice");*/

		


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

		console.log("apres btn login logout");

		//action sur le select de categorie pour la mise a jour de sscategory
		var categ = document.getElementById('category');
		categ.addEventListener('change', function(e){
			var categV = categ.value;
			if (categV){
				sendToServer(_urlSSCategorie+categV, {});
		    }    
		}, false);

		/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Includes: jquery.ui.core.css, jquery.ui.accordion.css, jquery.ui.autocomplete.css, jquery.ui.button.css, jquery.ui.datepicker.css, jquery.ui.dialog.css, jquery.ui.menu.css, jquery.ui.progressbar.css, jquery.ui.resizable.css, jquery.ui.selectable.css, jquery.ui.slider.css, jquery.ui.spinner.css, jquery.ui.tabs.css, jquery.ui.tooltip.css, jquery.ui.theme.css
* Copyright 2013 jQuery Foundation and other contributors;
	Licensed MIT */
$(".toto .ui-dialog-titlebar").css({
	"background-color":"#203064",
	"text-align":"left"
});
$("#ui-id-4").css({
	"width":"858px"
});
$(".toto .ui-widget-header").css({
	"background-color":"#203064"
});
$(".toto label").css({
	"display":"inline-block",
	"width":"130px",
	"text-align":"right",
	"margin-left":"90px",
	"margin-top":"3px"
});
$(".toto #login").css({
	"font-size":"small",
	"color":"grey", 
	"display":"inline-block",
	"margin-left":"200px"
});
$(".toto #create").css({
	"font-size":"small",
	"color":"grey", 
	"display":"inline-block",
	"margin-left":"255px"
});

$(".toto #log").css({
	"display":"inline-block",
	"float":"center",
	"margin-left":"280px"
});
/*
$(".toto * ").css({
	"border":"1px solid red"
}*/
$(".toto #fromus_tabs-1 ").css({
	"border":"2px double #203064",
	"border-radius":"5px",
	"margin":"10px",
	"padding":"20px"
});
$(".toto input#Nick_Name").css({
	"width":"600px",
	"float":"right",
	"margin-top":"0px",
	"text-align":"right",
	"font-size":"small",
	"border":"none"
});
$(".toto h2").css({
	"margin-bottom":"20px",
	"text-align":"center",
	"font-size":"x-large",
	"text-decoration":"underline",
	"color":"#203064"
});
$(".toto #fromusForm").css({});
$(".toto #FromusFrom label").css({
	"float":"left",
	"text-align":"right",
	"width":"200px"
});
/*$(".toto #fromusForm input[type="textbox"] ").css({
	"width":"280px",
	"margin":"0px",
	"margin-bottom":"5px",
	"padding":"0px"
});*/
$(".toto select#category").css({
	"width":"282px",
	"margin-top":"0px",
	"margin-bottom":"5px",
	"padding":"0px",
	"height":"20px"
});
$(".toto select#sscategory").css({
	"width":"282px",
	"margin-bottom":"5px",
	"margin-top":"0px",
	"padding":"0px",
	"height":"20px"
});
$(".toto input#QteSpinner").css({
	"width":"50px",
	"height":"20px",
	"border":"none"
});
$(".toto .ui-spinner").css({
	"height":"18px",
	"margin-top":"0px",
	"margin-bottom":"5px",
	"border":"none"
});
$(".toto #fromus_divassurance").css({
	"width":"50px",
	"display":"inline-block",
	"margin-top":"-4px",
	"margin-bottom":"5px"
});
$(".toto #logofromus").css({
	"float":"left",
	"margin-left":"50px"
});
/* Layout helpers
----------------------------------*/
$(".ui-helper-hidden").css({
	"display":"none"
});
$(".ui-helper-hidden-accessible").css({
	"border":"0",
	"clip":"rect(0 0 0 0)",
	"height": "1px",
	"margin":"-1px",
	"overflow":"hidden",
	"padding":"0",
	"position": "absolute",
	"width": "1px"
});
$(".ui-helper-reset").css({
	"margin":"0",
	"padding":"0",
	"border":"0",
	"outline":"0",
	"line-height":"1.3",
	"text-decoration":"none",
	"font-size":"100%",
	"list-style":"none"
});
$(".ui-helper-clearfix:before").css({});
$(".ui-helper-clearfix:after").css({
	"content":"",
	"display":"table",
	"border-collapse":"collapse"
});
$(".ui-helper-clearfix:after").css({
	"clear":"both"
});
$(".ui-helper-clearfix").css({
	"min-height":"0" /* support: IE7 */
});
$(".ui-helper-zfix").css({
	"width":"100%",
	"height":"100%",
	"top":"0",
	"left":"0",
	"position":"absolute",
	"opacity":"0",
	"filter":"Alpha(Opacity=0)"
});

$(".ui-front").css({
	"z-index":"100"
});


/* Interaction Cues
----------------------------------*/
$(".ui-state-disabled").css({
	"cursor":"default !important"
});


/* Icons
----------------------------------*/

/* states and images */
$(".ui-icon").css({
	"display":"block",
	"text-indent":"-99999px",
	"overflow":"hidden",
	"background-repeat":"no-repeat"
});
console.log("apres states images");

/* Misc visuals
----------------------------------*/

/* Overlays */
$(".ui-widget-overlay").css({
	"position":"fixed",
	"top":"0",
	"left":"0",
	"width":"100%",
	"height":"100%"
});

$(".ui-accordion .ui-accordion-header").css({
	"display":"block",
	"cursor":"pointer",
	"position":"relative",
	"margin-top":"2px",
	"padding":".5em .5em .5em .7em",
	"min-height":"0" /* support: IE7 */
});
$(".ui-accordion .ui-accordion-icons").css({
	"padding-left":"2.2em"
});
$(".ui-accordion .ui-accordion-noicons").css({
	"padding-left":".7em"
});
$(".ui-accordion .ui-accordion-icons .ui-accordion-icons").css({
	"padding-left":"2.2em"
});
$(".ui-accordion .ui-accordion-header .ui-accordion-header-icon").css({
	"position":"absolute",
	"left":".5em",
	"top":"50%",
	"margin-top":"-8px"
});
$(".ui-accordion .ui-accordion-content").css({
	"padding":"1em 2.2em",
	"border-top":"0",
	"overflow":"auto"
});

console.log("apres accordion");

$(".ui-autocomplete").css({
	"position":"absolute",
	"top":"0",
	"left":"0",
	"cursor":"default"
});

/*$(".ui-button").css({
	"display":"inline-block",
	"position":"relative",
	"padding":"0",
	"line-height":"normal",
	"margin-right":".1em",
	"cursor":"pointer",
	"vertical-align":"middle",
	"text-align":"center",
	"overflow":"visible", /* removes extra width in IE /

}*/
$(".ui-button").css({});
$(".ui-button:link").css({});
$(".ui-button:visited").css({});
$(".ui-button:hover").css({});
$(".ui-button:active").css({
	"text-decoration":"none"
});
/* to make room for the icon, a width needs to be set here */
$(".ui-button-icon-only").css({
	"width":"2.2em"
});
/* button elements seem to need a little more width */
$("button.ui-button-icon-only").css({
	"width":"2.4em"
});
$(".ui-button-icons-only").css({
	"width":"3.4em"
});
$("button.ui-button-icons-only").css({
	"width":"3.7em"
});

/* button text element */
$(".ui-button .ui-button-text").css({
	"display":"block",
	"line-height":"normal",
	"color":"white"
});
$(".ui-button-text-only .ui-button-text").css({
	"padding":".4em 1em"
});
$(".ui-button-icon-only .ui-button-text").css({});
$(".ui-button-icons-only .ui-button-text").css({
	"padding":".4em",
	"text-indent":"-9999999px"
});
$(".ui-button-text-icon-primary .ui-button-text").css({});
$(".ui-button-text-icons .ui-button-text").css({
	"padding":".4em 1em .4em 2.1em"
});
$(".ui-button-text-icon-secondary .ui-button-text").css({});
$(".ui-button-text-icons .ui-button-text").css({
	"padding":".4em 2.1em .4em 1em"
});
$(".ui-button-text-icons .ui-button-text").css({
	"padding-left":"2.1em",
	"padding-right":"2.1em"
});
/* no icon support for input elements, provide padding by default */
$("input.ui-button").css({
	"padding":".4em 1em"
});

/* button icon element(s) */
$(".ui-button-icon-only .ui-icon").css({});
$(".ui-button-text-icon-primary .ui-icon").css({});
$(".ui-button-text-icon-secondary .ui-icon").css({});
$(".ui-button-text-icons .ui-icon").css({});
$(".ui-button-icons-only .ui-icon").css({
	"position":"absolute",
	"top":"50%",
	"margin-top":"-8px",
	"margin-right":"10px"
});
$(".ui-button-icon-only .ui-icon").css({
	"left":"50%",
	"margin-left":"-8px"
});
$(".ui-button-text-icon-primary .ui-button-icon-primary").css({});
$(".ui-button-text-icons .ui-button-icon-primary").css({});
$(".ui-button-icons-only .ui-button-icon-primary").css({
	"left":".5em",
	"color":"white"
});
$(".ui-button-text-icon-secondary .ui-button-icon-secondary").css({});
$(".ui-button-text-icons .ui-button-icon-secondary").css({});
$(".ui-button-icons-only .ui-button-icon-secondary").css({
	"right":".5em"
});

/* button sets */
$(".ui-buttonset").css({
	"margin-right":"7px"
});
$(".ui-buttonset .ui-button").css({
	"margin-left":"0",
	"margin-right":"-.3em"
});

console.log("apres button sets");

/* workarounds */
/* reset extra padding in Firefox, see h5bp.com/l */
$("input.ui-button::-moz-focus-inner").css({});
$("button.ui-button::-moz-focus-inner").css({
	"border":"0",
	"padding":"0"
});
$(".ui-dialog").css({
	"position":"absolute",
	"top":"0",
	"left":"0",
	/*"padding":".2em",*/
	"outline":"0",
	"z-index":"999999999"

});
$(".ui-dialog .ui-dialog-titlebar").css({
	/*"padding":".4em 1em",*/
	"position":"relative",
	"background-color":"#203064",
	"color":"white"
});
$(".ui-dialog .ui-dialog-title").css({
	"float":"left",
	/*"margin":".1em 0",*/
	"white-space":"nowrap",
	"width":"90%",
	"overflow":"hidden",
	"text-overflow":"ellipsis"
});
$(".ui-dialog .ui-dialog-titlebar-close").css({
	"position":"absolute",
	/*"right":".3em",*/
	"top":"50%",
	"width":"21px",
	"margin":"-10px 0 0 0",
	"padding":"1px",
	"height":"20px"
});
$(".ui-dialog .ui-dialog-content").css({
	"position":"relative",
	"border":"0",
	/*"padding":".5em 1em",*/
	"background":"none",
	"overflow":"auto"
});
$(".ui-dialog .ui-dialog-buttonpane").css({
	"text-align":"left",
	"border-width":"1px 0 0 0",
	"background-image":"none"
	/*"margin-top":".5em",*/
	/*"padding":".3em 1em .5em .4em",*/
});
$(".ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset").css({
	"float":"right"
});
$(".ui-dialog .ui-dialog-buttonpane button").css({
	/*"margin":".5em .4em .5em 0",*/
	"cursor":"pointer"
});
$(".ui-dialog .ui-resizable-se").css({
	"width":"12px",
	"height":"12px",
	"right":"-5px",
	"bottom":"-5px",
	"background-position":"16px 16px"
});
$(".ui-draggable .ui-dialog-titlebar").css({
	"cursor":"move"
});

$(".ui-menu").css({
	"list-style":"none",
	"padding":"2px",
	"margin":"0",
	"display":"block",
	"outline":"none"
});
$(".ui-menu .ui-menu").css({
	"margin-top":"-3px",
	"position":"absolute"
});
$(".ui-menu .ui-menu-item").css({
	"margin":"0",
	"padding":"0",
	"width":"100%"
});
$(".ui-menu .ui-menu-divider").css({
	"margin":"5px -2px 5px -2px",
	"height":"0",
	"font-size":"0",
	"line-height":"0",
	"border-width":"1px 0 0 0"
});
$(".ui-menu .ui-menu-item a").css({
	"text-decoration":"none",
	"display":"block",
	"padding":"2px .4em",
	"line-height":"1.5",
	"min-height":"0", /* support: IE7 */
	"font-weight":"normal"
});
$(".ui-menu .ui-menu-item a.ui-state-focus").css({});
$(".ui-menu .ui-menu-item a.ui-state-active").css({
	"font-weight":"normal",
	"margin":"-1px"
});

$(".ui-menu .ui-state-disabled").css({
	"font-weight":"normal",
	"margin":".4em 0 .2em",
	"line-height":"1.5"
});
$(".ui-menu .ui-state-disabled a").css({
	"cursor":"default"
});

console.log("avant icon support");

/* icon support */
$(".ui-menu-icons").css({
	"position":"relative"
});
$(".ui-menu-icons .ui-menu-item a").css({
	"position":"relative",
	"padding-left":"2em"
});

/* left-aligned */
$(".ui-menu .ui-icon").css({
	"position":"absolute",
	"top":".2em",
	"left":".2em"
});

/* right-aligned */
$(".ui-menu .ui-menu-icon").css({
	"position":"static",
	"float":"right"
});

$(".ui-progressbar").css({
	"height":"2em",
	"text-align":"left",
	"overflow":"hidden"
});
$(".ui-progressbar .ui-progressbar-value").css({
	"margin":"-1px",
	"height":"100%"
});
$(".ui-progressbar .ui-progressbar-overlay").css({
/*	"background: url("chrome-extension":"//__MSG_@@extension_id__/jquery/images/animated-overlay.gif")",*/
	"height":"100%",
	"filter":"alpha(opacity=25)",
	"opacity":"0.25"
});
$(".ui-progressbar-indeterminate .ui-progressbar-value").css({
	"background-image":"none"
});

console.log("apres progressbar");

$(".ui-resizable").css({
	"position":"relative"
});

$(".ui-resizable-handle").css({
	"position":"absolute",
	"font-size":"0.1px",
	"display":"block"
});

$(".ui-resizable-disabled .ui-resizable-handle").css({});
$(".ui-resizable-autohide .ui-resizable-handle").css({
	"display":"none"
});
$(".ui-resizable-n").css({
	"cursor":"n-resize",
	"height":"7px",
	"width":"100%",
	"top":"-5px",
	"left":"0"
});
$(".ui-resizable-s").css({
	"cursor":"s-resize",
	"height":"7px",
	"width":"100%",
	"bottom":"-5px",
	"left":"0"
});
$(".ui-resizable-e").css({
	"cursor":"e-resize",
	"width":"7px",
	"right":"-5px",
	"top":"0",
	"height":"100%"
});
$(".ui-resizable-w").css({
	"cursor":"w-resize",
	"width":"7px",
	"left":"-5px",
	"top":"0",
	"height":"100%"
});
$(".ui-resizable-se").css({
	"cursor":"se-resize",
	"width":"12px",
	"height":"12px",
	"right":"1px",
	"bottom":"1px"
});
$(".ui-resizable-sw").css({
	"cursor":"sw-resize",
	"width":"9px",
	"height":"9px",
	"left":"-5px",
	"bottom":"-5px"
});
$(".ui-resizable-nw").css({
	"cursor":"nw-resize",
	"width":"9px",
	"height":"9px",
	"left":"-5px",
	"top":"-5px"
});
$(".ui-resizable-ne").css({
	"cursor":"ne-resize",
	"width":"9px",
	"height":"9px",
	"right":"-5px",
	"top":"-5px"
});

$(".ui-selectable-helper").css({
	"position":"absolute",
	"z-index":"100",
	"border":"1px dotted black"
});

$(".ui-slider").css({
	"position":"relative",
	"text-align":"left"
});
$(".ui-slider .ui-slider-handle").css({
	"position":"absolute",
	"z-index":"2",
	"width":"1.2em",
	"height":"1.2em",
	"cursor":"default"
});
$(".ui-slider .ui-slider-range").css({
	"position":"absolute",
	"z-index":"1",
	"font-size":".7em",
	"display":"block",
	"border":"0",
	"background-position":"0 0"
});

/* For IE8 - See #6727 */
$(".ui-slider.ui-state-disabled .ui-slider-handle").css({});
$(".ui-slider.ui-state-disabled .ui-slider-range").css({
	"filter":"inherit"
});

$(".ui-slider-horizontal").css({
	"height":".8em"
});
$(".ui-slider-horizontal .ui-slider-handle").css({
	"top":"-.3em",
	"margin-left":"-.6em"
});
$(".ui-slider-horizontal .ui-slider-range").css({
	"top":"0",
	"height":"100%"
});
$(".ui-slider-horizontal .ui-slider-range-min").css({
	"left":"0"
});
$(".ui-slider-horizontal .ui-slider-range-max").css({
	"right":"0"
});

$(".ui-slider-vertical").css({
	"width":".8em",
	"height":"100px"
});
$(".ui-slider-vertical .ui-slider-handle").css({
	"left":"-.3em",
	"margin-left":"0",
	"margin-bottom":"-.6em"
});
$(".ui-slider-vertical .ui-slider-range").css({
	"left":"0",
	"width":"100%"
});
$(".ui-slider-vertical .ui-slider-range-min").css({
	"bottom":"0"
});
$(".ui-slider-vertical .ui-slider-range-max").css({
	"top":"0"
});

$(".ui-spinner").css({
	"position":"relative",
	"display":"inline-block",
	"overflow":"hidden",
	"padding":"0",
	"vertical-align":"middle"

});
$(".ui-spinner-input").css({
	"border":"none",
	"background":"none",
	"color":"inherit",
	"padding":"0",
	"margin":".2em 0",
	"vertical-align":"middle",
	"margin-left":".4em",
	"margin-right":"22px"
});
$(".ui-spinner-button").css({
	"width":"16px",
	"height":"50%",
	"font-size":".5em",
	"padding":"0",
	"margin":"0",
	"text-align":"center",
	"position":"absolute",
	"cursor":"default",
	"display":"block",
	"overflow":"hidden",
	"right":"0"
});
/* more specificity required here to overide default borders */
$(".ui-spinner a.ui-spinner-button").css({
	"border-top":"none",
	"border-bottom":"none",
	"border-right":"none"
});
/* vertical centre icon */
$(".ui-spinner .ui-icon").css({
	"position":"absolute",
	"margin-top":"-8px",
	"top":"50%",
	"left":"0"
});
$(".ui-spinner-up").css({
	"top":"0"
});
$(".ui-spinner-down").css({
	"bottom":"0"
});

/* TR overrides */
$(".ui-spinner .ui-icon-triangle-1-s").css({
	/* need to fix icons sprite */
	"background-position":"-65px -16px"
});

console.log("apres spinner");

$(".ui-tabs").css({
	"position":"relative",/* position: relative prevents IE scroll bug (element with position: relative inside container with overflow: auto appear as"fixed") */
	"padding":".2em"
});

/* ajout de tab vertical */
$(".ui-tabs-vertical").css({
	"width":"55em"
});
$(".ui-tabs-vertical .ui-tabs-nav").css({
	"padding":".2em .1em .2em .2em",
	"float":"left",
	"background-color":"#c11f34"
});
$(".ui-tabs-vertical .ui-tabs-nav li").css({
	"clear":"center",
	"width":"80%",
	"background-color":"#203064",
	"margin-left":"0px"
});
$(".ui-tabs-vertical .ui-tabs-nav li a").css({
	"display":"block",
	"color":"white",
	"width":"128px"
});
$(".ui-tabs-vertical .ui-tabs-nav li.ui-tabs-active").css({
	"padding-bottom":"0",
	"padding-right":"3px",
	"background-color":"#204093"
});
$(".ui-tabs-vertical .ui-tabs-panel").css({
	"padding":"1em",
	"float":"right",
	"width":"40em"
});
$(".ui-tabs .ui-tabs-nav").css({
	"width":"160px",
	"margin":"5px",
	"padding":"5px"
});

console.log("apres tabs vertical");



$(".ui-tabs .ui-tabs-nav li").css({
	"list-style":"none",
	"float":"left",
	"position":"relative",
	"top":"0",
	"width":"158px",
	"border-bottom-width":"0",
	"padding":"0",
	"white-space":"nowrap"
});
$(".ui-tabs .ui-tabs-nav li a").css({
	"float":"left",
	"padding":".5em 1em",
	"text-decoration":"none"
});
$(".ui-tabs .ui-tabs-nav li.ui-tabs-active").css({

	"margin-bottom":"-1px",
	"padding-bottom":"1px"
});
$(".ui-tabs .ui-tabs-nav li.ui-tabs-active a").css({});
$(".ui-tabs .ui-tabs-nav li.ui-state-disabled a").css({});
$(".ui-tabs .ui-tabs-nav li.ui-tabs-loading a").css({
	"cursor":"text"
});
$(".ui-tabs .ui-tabs-nav li a").css({});
/* first selector in group seems obsolete, but required to overcome bug in Opera applying cursor: text overall if defined elsewhere... */
$(".ui-tabs-collapsible .ui-tabs-nav li.ui-tabs-active a").css({
	"cursor":"pointer"
});
$(".ui-tabs .ui-tabs-panel").css({
	"display":"block",
	"border-width":"0",
	"padding":"1em 1.4em",
	"background":"none"
});

console.log("apres tabs");

$(".ui-tooltip").css({
	"padding":"8px",
	"position":"absolute",
	"z-index":"9999",
	"max-width":"300px",
	"-webkit-box-shadow":"0 0 5px #aaa",
	"box-shadow":"0 0 5px #aaa"
});
$("body .ui-tooltip").css({
	"border-width":"2px"
});

/* Component containers
----------------------------------*/
$(".ui-widget").css({
	"font-family":"Verdana,Arial,sans-serif", 
	/*"font-size":"1.1em{fsDefault}",*/
	"font-size":"15px"
});
$(".ui-widget .ui-widget").css({
	"font-size":"1em"
});
$(".ui-widget input").css({});
$(".ui-widget select").css({});
$(".ui-widget textarea").css({});
$(".ui-widget button").css({
	"font-family":"Verdana,Arial,sans-serif",
	/*"font-size":"1em",*/
	"font-size":"15px"
});
$(".ui-widget button").css({
	"background-color":"#203064",
	"color":"white"
});
$(".ui-widget-content").css({
	"border":"1px solid #aaaaaa",
/*	"background: white url(chrome-extension":"//__MSG_@@extension_id__/jquery/images/ui-bg_flat_75_ffffff_40x100.png) 50% 50% repeat-x",*/
	"color":"#222222",

});
$(".ui-widget-content a").css({
	"color":"#222222",
});
$(".ui-widget-header").css({
	"border":"1px solid #aaaaaa",
	"color":"#222222",
	"font-weight":"bold"
});
$(".ui-widget-header a").css({
	"color":"#222222",
});

/* Interaction states
----------------------------------*/
$(".ui-state-default").css({});
$(".ui-widget-content .ui-state-default").css({});
$(".ui-widget-header .ui-state-default").css({
	"border":"1px solid #d3d3d3",
	"font-weight":"normal",
	"color":"#555555"
});
$(".ui-state-default a").css({});
$(".ui-state-default a:link").css({});
$(".ui-state-default a:visited").css({
	"color":"#555555",
	"text-decoration":"none"
});
$(".ui-state-hover").css({});
$(".ui-widget-content .ui-state-hover").css({});
$(".ui-widget-header .ui-state-hover").css({});
$(".ui-state-focus").css({});
$(".ui-widget-content .ui-state-focus").css({});
$(".ui-widget-header .ui-state-focus").css({
	"border":"1px solid #999999",
	"font-weight":"normal",
	"color":"#212121",
});
$(".ui-state-hover a").css({});
$(".ui-state-hover a:hover").css({});
$(".ui-state-hover a:link").css({});
$(".ui-state-hover a:visited").css({
	"color":"#212121",
	"text-decoration":"none"
});
$(".ui-state-active").css({});
$(".ui-widget-content .ui-state-active").css({});
$(".ui-widget-header .ui-state-active").css({
	"border":"1px solid #aaaaaa ",
	"font-weight":"normal",
	"color":"#212121"
});
$(".ui-state-active a").css({});
$(".ui-state-active a:link").css({});
$(".ui-state-active a:visited").css({
	"color":"#212121",
	"text-decoration":"none"
});

/* Interaction Cues
----------------------------------*/
$(".ui-state-highlight").css({});
$(".ui-widget-content .ui-state-highlight").css({});
$(".ui-widget-header .ui-state-highlight").css({
	"border":"1px solid #fcefa1",
/*	"background: #fbf9ee",*/
	"color":"#363636"
});
$(".ui-state-highlight a").css({});
$(".ui-widget-content .ui-state-highlight a").css({});
$(".ui-widget-header .ui-state-highlight a").css({
	"color":"#363636"
});
$(".ui-state-error").css({});
$(".ui-widget-content .ui-state-error").css({});
$(".ui-widget-header .ui-state-error").css({
	"border":"1px solid #cd0a0a",
/*	"background: #fef1ec",*/
	"color":"#cd0a0a"
});
$(".ui-state-error a").css({});
$(".ui-widget-content .ui-state-error a").css({});
$(".ui-widget-header .ui-state-error a").css({
	"color":"#cd0a0a"
});
$(".ui-state-error-text").css({});
$(".ui-widget-content .ui-state-error-text").css({});
$(".ui-widget-header .ui-state-error-text").css({
	"color":"#cd0a0a"
});
$(".ui-priority-primary").css({});
$(".ui-widget-content .ui-priority-primary").css({});
$(".ui-widget-header .ui-priority-primary").css({
	"font-weight":"bold"
});
$(".ui-priority-secondary").css({});
$(".ui-widget-content .ui-priority-secondary").css({});
$(".ui-widget-header .ui-priority-secondary").css({
	"opacity":".7",
	"filter":"Alpha(Opacity=70)",
	"font-weight":"normal"
});
$(".ui-state-disabled").css({});
$(".ui-widget-content .ui-state-disabled").css({});
$(".ui-widget-header .ui-state-disabled").css({
	"opacity":".35",
	"filter":"Alpha(Opacity=35)",
	"background-image":"none"
});
$(".ui-state-disabled .ui-icon").css({
	"filter":"Alpha(Opacity=35)" /* For IE8 - See #6059 */
});

/* Icons
----------------------------------*/

/* states and images */
$(".ui-icon").css({
	"width":"16px",
	"height":"16px",
	"float":"right",
	"margin-right":"0px"
});
$(".ui-icon").css({});
$(".ui-widget-content .ui-icon").css({
/*	"background-image: url(chrome-extension":"//__MSG_@@extension_id__/jquery/images/ui-icons_cd0a0a_256x240.png)"*/
});
$(".ui-widget-header .ui-icon").css({
/*	"background-image: url(chrome-extension":"//__MSG_@@extension_id__/jquery/images/ui-icons_cd0a0a_256x240.png)"*/
});
$(".ui-state-default .ui-icon").css({
/*	"background-image: url(chrome-extension":"//__MSG_@@extension_id__/jquery/images/ui-icons_cd0a0a_256x240.png)",*/
	"float":"right",
	"margin-right":"0px !important"
});
$(".ui-state-hover .ui-icon").css({});
$(".ui-state-focus .ui-icon").css({
/*	"background-image: url(chrome-extension":"//__MSG_@@extension_id__/jquery/images/ui-icons_cd0a0a_256x240.png)"*/
});
$(".ui-state-active .ui-icon").css({
/*	"background-image: url(chrome-extension":"//__MSG_@@extension_id__/jquery/images/ui-icons_cd0a0a_256x240.png)"*/
});
$(".ui-state-highlight .ui-icon").css({
/*	"background-image: url(chrome-extension":"//__MSG_@@extension_id__/jquery/images/ui-icons_cd0a0a_256x240.png)"*/
});
$(".ui-state-error .ui-icon").css({});
$(".ui-state-error-text .ui-icon").css({
/*	"background-image: url(chrome-extension":"//__MSG_@@extension_id__/jquery/images/ui-icons_cd0a0a_256x240.png)"*/
});

/* positioning */
$(".ui-icon-blank").css({
	"background-position":"16px 16px"
});
$(".ui-icon-carat-1-n").css({
	"background-position":"0 0"
});
$(".ui-icon-carat-1-ne").css({
	"background-position":"-16px 0"
});
$(".ui-icon-carat-1-e").css({
	"background-position":"-32px 0"
});
$(".ui-icon-carat-1-se").css({
	"background-position":"-48px 0"
});
$(".ui-icon-carat-1-s").css({
	"background-position":"-64px 0"
});
$(".ui-icon-carat-1-sw").css({
	"background-position":"-80px 0"
});
$(".ui-icon-carat-1-w").css({
	"background-position":"-96px 0"
});
$(".ui-icon-carat-1-nw").css({
	"background-position":"-112px 0"
});
$(".ui-icon-carat-2-n-s").css({
	"background-position":"-128px 0"
});
$(".ui-icon-carat-2-e-w").css({
	"background-position":"-144px 0"
});
$(".ui-icon-triangle-1-n").css({
	"background-position":"0 -16px"
});
$(".ui-icon-triangle-1-ne").css({
	"background-position":"-16px -16px"
});
$(".ui-icon-triangle-1-e").css({
	"background-position":"-32px -16px"
});
$(".ui-icon-triangle-1-se").css({
	"background-position":"-48px -16px"
});
$(".ui-icon-triangle-1-s").css({
	"background-position":"-64px -16px"
});
$(".ui-icon-triangle-1-sw").css({
	"background-position":"-80px -16px"
});
$(".ui-icon-triangle-1-w").css({
	"background-position":"-96px -16px"
});
$(".ui-icon-triangle-1-nw").css({
	"background-position":"-112px -16px"
});
$(".ui-icon-triangle-2-n-s").css({
	"background-position":"-128px -16px"
});
$(".ui-icon-triangle-2-e-w").css({
	"background-position":"-144px -16px"
});
$(".ui-icon-arrow-1-n").css({
	"background-position":"0 -32px"
});
$(".ui-icon-arrow-1-ne").css({
	"background-position":"-16px -32px"
});
$(".ui-icon-arrow-1-e").css({
	"background-position":"-32px -32px"
});
$(".ui-icon-arrow-1-se").css({
	"background-position":"-48px -32px"
});
$(".ui-icon-arrow-1-s").css({
	"background-position":"-64px -32px"
});
$(".ui-icon-arrow-1-sw").css({
	"background-position":"-80px -32px"
});
$(".ui-icon-arrow-1-w").css({
	"background-position":"-96px -32px"
});
$(".ui-icon-arrow-1-nw").css({
	"background-position":"-112px -32px"
});
$(".ui-icon-arrow-2-n-s").css({
	"background-position":"-128px -32px"
});
$(".ui-icon-arrow-2-ne-sw").css({
	"background-position":"-144px -32px"
});
$(".ui-icon-arrow-2-e-w").css({
	"background-position":"-160px -32px"
});
$(".ui-icon-arrow-2-se-nw").css({
	"background-position":"-176px -32px"
});
$(".ui-icon-arrowstop-1-n").css({
	"background-position":"-192px -32px"
});
$(".ui-icon-arrowstop-1-e").css({
	"background-position":"-208px -32px"
});
$(".ui-icon-arrowstop-1-s").css({
	"background-position":"-224px -32px"
});
$(".ui-icon-arrowstop-1-w").css({
	"background-position":"-240px -32px"
});
$(".ui-icon-arrowthick-1-n").css({
	"background-position":"0 -48px"
});
$(".ui-icon-arrowthick-1-ne").css({
	"background-position":"-16px -48px"
});
$(".ui-icon-arrowthick-1-e").css({
	"background-position":"-32px -48px"
});
$(".ui-icon-arrowthick-1-se").css({
	"background-position":"-48px -48px"
});
$(".ui-icon-arrowthick-1-s").css({
	"background-position":"-64px -48px"
});
$(".ui-icon-arrowthick-1-sw").css({
	"background-position":"-80px -48px"
});
$(".ui-icon-arrowthick-1-w").css({
	"background-position":"-96px -48px"
});
$(".ui-icon-arrowthick-1-nw").css({
	"background-position":"-112px -48px"
});
$(".ui-icon-arrowthick-2-n-s").css({
	"background-position":"-128px -48px"
});
$(".ui-icon-arrowthick-2-ne-sw").css({
	"background-position":"-144px -48px"
});
$(".ui-icon-arrowthick-2-e-w").css({
	"background-position":"-160px -48px"
});
$(".ui-icon-arrowthick-2-se-nw").css({
	"background-position":"-176px -48px"
});
$(".ui-icon-arrowthickstop-1-n").css({
	"background-position":"-192px -48px"
});
$(".ui-icon-arrowthickstop-1-e").css({
	"background-position":"-208px -48px"
});
$(".ui-icon-arrowthickstop-1-s").css({
	"background-position":"-224px -48px"
});
$(".ui-icon-arrowthickstop-1-w").css({
	"background-position":"-240px -48px"
});
$(".ui-icon-arrowreturnthick-1-w").css({
	"background-position":"0 -64px"
});
$(".ui-icon-arrowreturnthick-1-n").css({
	"background-position":"-16px -64px"
});
$(".ui-icon-arrowreturnthick-1-e").css({
	"background-position":"-32px -64px"
});
$(".ui-icon-arrowreturnthick-1-s").css({
	"background-position":"-48px -64px"
});
$(".ui-icon-arrowreturn-1-w").css({
	"background-position":"-64px -64px"
});
$(".ui-icon-arrowreturn-1-n").css({
	"background-position":"-80px -64px"
});
$(".ui-icon-arrowreturn-1-e").css({
	"background-position":"-96px -64px"
});
$(".ui-icon-arrowreturn-1-s").css({
	"background-position":"-112px -64px"
});
$(".ui-icon-arrowrefresh-1-w").css({
	"background-position":"-128px -64px"
});
$(".ui-icon-arrowrefresh-1-n").css({
	"background-position":"-144px -64px"
});
$(".ui-icon-arrowrefresh-1-e").css({
	"background-position":"-160px -64px"
});
$(".ui-icon-arrowrefresh-1-s").css({
	"background-position":"-176px -64px"
});
$(".ui-icon-arrow-4").css({
	"background-position":"0 -80px"
});
$(".ui-icon-arrow-4-diag").css({
	"background-position":"-16px -80px"
});
$(".ui-icon-extlink").css({
	"background-position":"-32px -80px"
});
$(".ui-icon-newwin").css({
	"background-position":"-48px -80px"
});
$(".ui-icon-refresh").css({
	"background-position":"-64px -80px"
});
$(".ui-icon-shuffle").css({
	"background-position":"-80px -80px"
});
$(".ui-icon-transfer-e-w").css({
	"background-position":"-96px -80px"
});
$(".ui-icon-transferthick-e-w").css({
	"background-position":"-112px -80px"
});
$(".ui-icon-folder-collapsed").css({
	"background-position":"0 -96px"
});
$(".ui-icon-folder-open").css({
	"background-position":"-16px -96px"
});
$(".ui-icon-document").css({
	"background-position":"-32px -96px"
});
$(".ui-icon-document-b").css({
	"background-position":"-48px -96px"
});
$(".ui-icon-note").css({
	"background-position":"-64px -96px"
});
$(".ui-icon-mail-closed").css({
	"background-position":"-80px -96px"
});
$(".ui-icon-mail-open").css({
	"background-position":"-96px -96px"
});
$(".ui-icon-suitcase").css({
	"background-position":"-112px -96px"
});
$(".ui-icon-comment").css({
	"background-position":"-128px -96px"
});
$(".ui-icon-person").css({
	"background-position":"-144px -96px"
});
$(".ui-icon-print").css({
	"background-position":"-160px -96px"
});
$(".ui-icon-trash").css({
	"background-position":"-176px -96px"
});
$(".ui-icon-locked").css({
	"background-position":"-192px -96px"
});
$(".ui-icon-unlocked").css({
	"background-position":"-208px -96px"
});
$(".ui-icon-bookmark").css({
	"background-position":"-224px -96px"
});
$(".ui-icon-tag").css({
	"background-position":"-240px -96px"
});
$(".ui-icon-home").css({
	"background-position":"0 -112px"
});
$(".ui-icon-flag").css({
	"background-position":"-16px -112px"
});
$(".ui-icon-calendar").css({
	"background-position":"-32px -112px"
});
$(".ui-icon-cart").css({
	"background-position":"-48px -112px"
});
$(".ui-icon-pencil").css({
	"background-position":"-64px -112px"
});
$(".ui-icon-clock").css({
	"background-position":"-80px -112px"
});
$(".ui-icon-disk").css({
	"background-position":"-96px -112px"
});
$(".ui-icon-calculator").css({
	"background-position":"-112px -112px"
});
$(".ui-icon-zoomin").css({
	"background-position":"-128px -112px"
});
$(".ui-icon-zoomout").css({
	"background-position":"-144px -112px"
});
$(".ui-icon-search").css({
	"background-position":"-160px -112px"
});
$(".ui-icon-wrench").css({
	"background-position":"-176px -112px"
});
$(".ui-icon-gear").css({
	"background-position":"-192px -112px"
});
$(".ui-icon-heart").css({
	"background-position":"-208px -112px"
});
$(".ui-icon-star").css({
	"background-position":"-224px -112px"
});
$(".ui-icon-link").css({
	"background-position":"-240px -112px"
});
$(".ui-icon-cancel").css({
	"background-position":"0 -128px"
});
$(".ui-icon-plus").css({
	"background-position":"-16px -128px"
});
$(".ui-icon-plusthick").css({
	"background-position":"-32px -128px"
});
$(".ui-icon-minus").css({
	"background-position":"-48px -128px"
});
$(".ui-icon-minusthick").css({
	"background-position":"-64px -128px"
});
$(".ui-icon-close").css({
	"background-position":"-80px -128px"
});
$(".ui-icon-closethick").css({
	"background-position":"-96px -128px"
});
$(".ui-icon-key").css({
	"background-position":"-112px -128px"
});
$(".ui-icon-lightbulb").css({
	"background-position":"-128px -128px"
});
$(".ui-icon-scissors").css({
	"background-position":"-144px -128px"
});
$(".ui-icon-clipboard").css({
	"background-position":"-160px -128px"
});
$(".ui-icon-copy").css({
	"background-position":"-176px -128px"
});
$(".ui-icon-contact").css({
	"background-position":"-192px -128px"
});
$(".ui-icon-image").css({
	"background-position":"-208px -128px"
});
$(".ui-icon-video").css({
	"background-position":"-224px -128px"
});
$(".ui-icon-script").css({
	"background-position":"-240px -128px"
});
$(".ui-icon-alert").css({
	"background-position":"0 -144px"
});
$(".ui-icon-info").css({
	"background-position":"-16px -144px"
});
$(".ui-icon-notice").css({
	"background-position":"-32px -144px"
});
$(".ui-icon-help").css({
	"background-position":"-48px -144px"
});
$(".ui-icon-check").css({
	"background-position":"-64px -144px"
});
$(".ui-icon-bullet").css({
	"background-position":"-80px -144px"
});
$(".ui-icon-radio-on").css({
	"background-position":"-96px -144px"
});
$(".ui-icon-radio-off").css({
	"background-position":"-112px -144px"
});
$(".ui-icon-pin-w").css({
	"background-position":"-128px -144px"
});
$(".ui-icon-pin-s").css({
	"background-position":"-144px -144px"
});
$(".ui-icon-play").css({
	"background-position":"0 -160px"
});
$(".ui-icon-pause").css({
	"background-position":"-16px -160px"
});
$(".ui-icon-seek-next").css({
	"background-position":"-32px -160px"
});
$(".ui-icon-seek-prev").css({
	"background-position":"-48px -160px"
});
$(".ui-icon-seek-end").css({
	"background-position":"-64px -160px"
});
$(".ui-icon-seek-start").css({
	"background-position":"-80px -160px"
});
/* ui-icon-seek-first is deprecated, use ui-icon-seek-start instead */
$(".ui-icon-seek-first").css({
	"background-position":"-80px -160px"
});
$(".ui-icon-stop").css({
	"background-position":"-96px -160px"
});
$(".ui-icon-eject").css({
	"background-position":"-112px -160px"
});
$(".ui-icon-volume-off").css({
	"background-position":"-128px -160px"
});
$(".ui-icon-volume-on").css({
	"background-position":"-144px -160px"
});
$(".ui-icon-power").css({
	"background-position":"0 -176px"
});
$(".ui-icon-signal-diag").css({
	"background-position":"-16px -176px"
});
$(".ui-icon-signal").css({
	"background-position":"-32px -176px"
});
$(".ui-icon-battery-0").css({
	"background-position":"-48px -176px"
});
$(".ui-icon-battery-1").css({
	"background-position":"-64px -176px"
});
$(".ui-icon-battery-2").css({
	"background-position":"-80px -176px"
});
$(".ui-icon-battery-3").css({
	"background-position":"-96px -176px"
});
$(".ui-icon-circle-plus").css({
	"background-position":"0 -192px"
});
$(".ui-icon-circle-minus").css({
	"background-position":"-16px -192px"
});
$(".ui-icon-circle-close").css({
	"background-position":"-32px -192px"
});
$(".ui-icon-circle-triangle-e").css({
	"background-position":"-48px -192px"
});
$(".ui-icon-circle-triangle-s").css({
	"background-position":"-64px -192px"
});
$(".ui-icon-circle-triangle-w").css({
	"background-position":"-80px -192px"
});
$(".ui-icon-circle-triangle-n").css({
	"background-position":"-96px -192px"
});
$(".ui-icon-circle-arrow-e").css({
	"background-position":"-112px -192px"
});
$(".ui-icon-circle-arrow-s").css({
	"background-position":"-128px -192px"
});
$(".ui-icon-circle-arrow-w").css({
	"background-position":"-144px -192px"
});
$(".ui-icon-circle-arrow-n").css({
	"background-position":"-160px -192px"
});
$(".ui-icon-circle-zoomin").css({
	"background-position":"-176px -192px"
});
$(".ui-icon-circle-zoomout").css({
	"background-position":"-192px -192px"
});
$(".ui-icon-circle-check").css({
	"background-position":"-208px -192px"
});
$(".ui-icon-circlesmall-plus").css({
	"background-position":"0 -208px"
});
$(".ui-icon-circlesmall-minus").css({
	"background-position":"-16px -208px"
});
$(".ui-icon-circlesmall-close").css({
	"background-position":"-32px -208px"
});
$(".ui-icon-squaresmall-plus").css({
	"background-position":"-48px -208px"
});
$(".ui-icon-squaresmall-minus").css({
	"background-position":"-64px -208px"
});
$(".ui-icon-squaresmall-close").css({
	"background-position":"-80px -208px"
});
$(".ui-icon-grip-dotted-vertical").css({
	"background-position":"0 -224px"
});
$(".ui-icon-grip-dotted-horizontal").css({
	"background-position":"-16px -224px"
});
$(".ui-icon-grip-solid-vertical").css({
	"background-position":"-32px -224px"
});
$(".ui-icon-grip-solid-horizontal").css({
	"background-position":"-48px -224px"
});
$(".ui-icon-gripsmall-diagonal-se").css({
	"background-position":"-64px -224px"
});
$(".ui-icon-grip-diagonal-se").css({
	"background-position":"-80px -224px"
});


/* Misc visuals
----------------------------------*/

/* Corner radius */
$(".ui-corner-all").css({});
$(".ui-corner-top").css({});
$(".ui-corner-left").css({});
$(".ui-corner-tl").css({
	"border-top-left-radius":"4px"
});
$(".ui-corner-all").css({});
$(".ui-corner-top").css({});
$(".ui-corner-right").css({});
$(".ui-corner-tr").css({
	"border-top-right-radius":"4px"
});
$(".ui-corner-all").css({});
$(".ui-corner-bottom").css({});
$(".ui-corner-left").css({});
$(".ui-corner-bl").css({
	"border-bottom-left-radius":"4px"
});
$(".ui-corner-all").css({});
$(".ui-corner-bottom").css({});
$(".ui-corner-right").css({});
$(".ui-corner-br").css({
	"border-bottom-right-radius":"4px"
});

/* Overlays */
$(".ui-widget-overlay").css({
/*	"background: #aaaaaa",*/
	"opacity":".3",
	"filter":"Alpha(Opacity=30)"
});
$(".ui-widget-shadow").css({
	"margin":"-8px",
	"padding":"8px",
/*	"background: #aaaaaa",*/
	"opacity":".3",
	"filter":"Alpha(Opacity=30)",
	"border-radius":"8px"
});




		console.log("apres le css");

		
		// ouverture de la dialog box
		newDialog.dialog("open");

		//Recupere la liste de catégorie
		sendToServer(_urlCategorie,{});

		//Récupere le token 
		if(readCookie('token')){
			token=readCookie('token');
			(!token)?in_out.value = 'login' : in_out.value = 'logout';
			document.getElementById("Nick_Name").value = "MsgWelcome"+readCookie('Nick_Name');
		}
		else
			document.getElementById("Nick_Name").value = "MsgConnect";
			//alert('Vous devez vous connecter');

				
		// suppression des key dans le localstorage
		localStorage.removeItem('regDesc');
		localStorage.removeItem('regName');
		localStorage.removeItem('regPrice');
		localStorage.removeItem('regStore');
		localStorage.removeItem('regOffer');

		console.log("fin de script");
			
	}
});





