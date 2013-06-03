var token;
var Nick_Name;
var language;
var points;


var _urlProduct = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-product&token=';
var _urlCalcul = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-calcul&token=';
var _urlPanier = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-panier&token=';
var _urlLogout = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-logout&token=';
var _urlLogin = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-login';
var _urlCategorie = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-categorie';
var _urlSSCategorie = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-sscategorie&sscateg=';
var _urlPts = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-pts&token=';

/*document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('tabAdd').innerHTML = chrome.i18n.getMessage("tabAdd") ;
    document.getElementById('tabBuy').innerHTML = chrome.i18n.getMessage("tabBuy") ;
	document.getElementById('store').innerHTML = chrome.i18n.getMessage("Merchant") ;
    document.getElementById('nameP').innerHTML = chrome.i18n.getMessage("NameP") ;
	document.getElementById('priceP').innerHTML = chrome.i18n.getMessage("PriceP") ;
	document.getElementById('categP').innerHTML = chrome.i18n.getMessage("CategP") ;
	document.getElementById('scategP').innerHTML = chrome.i18n.getMessage("SCategP") ;
	document.getElementById('addP').value = chrome.i18n.getMessage("ButtonAdd") ;
	
	document.getElementById('FormP').innerHTML = chrome.i18n.getMessage("FormP") ;
	document.getElementById('disconnect').value = 'logout' ;

	document.getElementById('buyP').value = chrome.i18n.getMessage("ButtonBuy") ;
	document.getElementById('fu_quantite').innerHTML =chrome.i18n.getMessage("QuantityP") ;
	document.getElementById('fu_assurance').innerHTML = chrome.i18n.getMessage("InsuranceP") ;

});*/

window.onload = function() {
	sendToServer(_urlCategorie,{});

	if(readCookie('tokenFU')){
		hideLog();
		token=readCookie('tokenFU');
		if(readCookie('nameFU')){
			Nick_Name = readCookie('nameFU');
			document.getElementById("nick_name").value = chrome.i18n.getMessage("MsgWelcome")+Nick_Name ;
			sendToServer(_urlPts+token,{});
		}
	}
	else 
		showLog();

	//$("#tab2").hide();

};

//Pour creer le cookie 
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+";path=/";
}

//Pour lire le cookie
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

//Pour supprimer le cookie
function eraseCookie(name) {
	createCookie(name,"",-1);
}


//Fonctions d'envoie de données au serveur
function sendToServer(urlSelected, jsonSelected) {
	$.post(urlSelected, jsonSelected)
	.done(function(datas) { 
		switch(datas['Status']){
			case 'l':
				logShow();
			break;

			case 'L':
				token = datas['Token'];
				createCookie('tokenFU',token,21);
				Nick_Name = datas['Message'];
				createCookie('nameFU',Nick_Name,21);
				document.getElementById("nick_name").value = chrome.i18n.getMessage("MsgWelcome")+Nick_Name ;
				hideLog();
				sendToServer(_urlPts+token,{});
				
			break;

			case 'p':
				points = datas['Message'];
				document.getElementById("ptsFU").value = points+' pts' ;
			break;

			case 'c':
				//alert(datas['Message']);
				parseCat(datas['Message'],'');
			break;

			case 's':
				parseCat(datas['Message'], 'ss');
			break;

			case 'A':
				document.getElementById('msgServer').value = datas['Message'];
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
				//alert(datas['error']);
				document.getElementById('msgServer').value = datas['error'] ;
			break;
		}
	})
	.fail(function(datas) { 
		//alert(datas['error']);
		document.getElementById('msgServer').value = chrome.i18n.getMessage("MsgBD");
		})
;};


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


$(document).ready( function () {

	 $(".content").each(function(i){
        this.id = "#" + this.id;
    });

	$(".content").not(":first").hide();

	$("#menu a").click(function() {
        var idTab = $(this).attr("href");
        $(".content").hide();
        $("div[id='" + idTab + "']").fadeIn();
        return false;
    });   

	$("input[id='connect']").click(function() {
		
   		var emailV = document.getElementById('emailBox').value;
		var passwordV = document.getElementById("passBox").value;
		if (emailV && passwordV){
			var jsonLog = {email: emailV ,password: passwordV};
			var postLog = JSON.stringify(jsonLog);
			var logJSON = {log:postLog};
			sendToServer(_urlLogin, logJSON);
		}
  	});

  	$("input[id='addP']").click(function() {
		var categVal = document.getElementById("sscategory").value;
		if(categVal){
			var jsonProduct = {prd_libelle: regName ,prd_site: regOffer, prd_desc: regDesc, prd_visu: regVisu, prd_prix: regPrice, prd_cat: categVal};
			var postData = JSON.stringify(jsonProduct);
			var productJSON = {product:postData};
			sendToServer(_urlProduct+token , productJSON);
		}
  	});

  	$("input[id='buyP']").click(function() {
		var qteSpinner = document.getElementById("QteSpinner").value;
		var categSelect = document.getElementById("sscategory").value;

		var jsonProduct = {prd_libelle: regName ,prd_site: regOffer, prd_desc: regDesc, prd_visu: regVisu, prd_prix: regPrice, prd_cat: categVal};
		var postData = JSON.stringify(jsonProduct);
		var productJSON = {product:postData};
		sendToServer(_urlProduct+token,productJSON);

		var jsonCalcul = {libelle: regName, qte: qteVal ,montant: regPrice ,categ: categVal};
		var postDataCalcul = JSON.stringify(jsonCalcul);
		var calculJSON = {calcul:postDataCalcul};
		sendToServer(_urlCalcul+token , calculJSON);
  	});

  	$("input[id='disconnect']").click(function() {
		
   		sendToServer(_urlLogout+token, {});
		eraseCookie('tokenFU');
		eraseCookie('nameFU');
		token="";
		Nick_Name = "";
		showLog();
  	});

  	$("select[id='category']").change(function() {
	var categV = document.getElementById("category").value;
	if (categV)
		sendToServer(_urlSSCategorie+categV, {});
	else{
	   	var $selectCat = $('select[id=sscategory]');
	   	$selectCat.empty();
	}
  	});

  	$("img[id='lgfr']").click(function() {
	
		alert('fr');
		//config.i18n.default_locale = 'fr'
		alert('fr');

  	});
  	$("img[id='lgen']").click(function() {
		
		alert('en');
		//config.i18n.default_locale = 'en'
		alert('en');
  	});

});


function hideLog(){
	$("#loginU").hide();
	$("#isconnect").show();
};

function showLog(){
	$("#loginU").show();
	$("#isconnect").hide();
};


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