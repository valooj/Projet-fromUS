var token;
var Nick_Name;
var points;

var _urlProduct = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-product&lng='+defLng+'&token=';
var _urlCalcul = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-calcul&lng='+defLng+'&token=';
var _urlPanier = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-panier&lng='+defLng+'&token=';
var _urlLogout = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-logout&lng='+defLng+'&token=';
var _urlLogin = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-login&lng='+defLng;
var _urlCategorie = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-categorie&lng='+defLng;
var _urlSSCategorie = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-sscategorie&lng='+defLng+'&sscateg=';
var _urlPts = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-pts&lng='+defLng+'&token=';
var _urlAccessIn = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-accessIn';
var _urlAccessOut = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-accessOut&token=';


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
	document.cookie = name+"="+value+expires+";path=";
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
		document.getElementById('msgServer').value = "";
		switch(datas['Status']){
			case 'l':
				logShow();
			break;

			case 'L':
				token = datas['Token'];
				createCookie('tokenFU',token,21);
				Nick_Name = datas['Message'];
				createCookie('nameFU',Nick_Name,21);
				document.getElementById("nick_name").value = i18n("MsgWelcome")+Nick_Name ;
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

			case 'a':
				//fromus_sitelist[localStorage["popup_store"]] = new fromus_siteObj();
				//alert(datas['Message']['sa_chemin']);
				var elem = datas['Message']['sa_chemin'].split('/');
				//alert(elem[2]);
				parseInfo(elem);
				
			break;

			break;

			case 'C':
				var totalPrice = datas['Prix'];
				var livPrice = datas['Prix_liv'];
				var taxPrice = datas['Prix_tax'];
				if(totalPrice !== 0){
					if(confirm('L\'estimation du prix est de $'+totalPrice+' ')) {
						// pour tester a changer
						var jsonPanier = {priceTot: regtotal ,priceLiv: livPrice ,priceTax: taxPrice ,libelle: regName ,url: regOffer ,desc: regDesc, qte: qteVal ,montant: totalPrice ,categ: categVal};
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
		document.getElementById('msgServer').value = i18n("MsgBD");
		})
;};



function sendAjoutPanier(panierJ) {
	$.post(_urlPanier+token, panierJ)
	.done(function(datas) { 
		if(datas['Message'] !== undefined)
			alert(datas['Message']);

		if(datas['error'] !== undefined)
			alert(datas['error']);  
		})
	.fail(function(datas) { 
		//alert(datas['error']); 
		alert(i18n("MsgBD"));
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

function searchInfo (){
	sendToServer(_urlAccessIn+'&url_site='+regStore, {});
}

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
				fromus_recupPrice("id",content_pid);
				if(localStorage["regPrice"] == fromus_error) 
					fromus_recupPrice("class",content_pclass);

				//Test pour le name
				fromus_recupName("id",content_nid);
				if(localStorage["regName"] == fromus_error) 
					fromus_recupName("class",content_nclass);

				//Test pour la description
				fromus_recupDesc("id",content_did);
				if(localStorage["regName"] == fromus_error) 
					fromus_recupDesc("class",content_dclass);

				//Test pour l'image'
				fromus_recupImg("id",content_iid);
				if(localStorage["regName"] == fromus_error) 
					fromus_recupImg("class",content_iclass);

				regPrice = localStorage["regPrice"];
				$('#fromus_price').attr('value',regPrice);
				regName = localStorage["regName"];
				$('#fromus_name').attr('value',regName);
				regDesc = localStorage["regDesc"];
				regVisu = localStorage["regImg"];

				
}

function hideLog(){
	$("#loginU").hide();
	$("#isconnect").show();
};

function showLog(){
	$("#loginU").show();
	$("#isconnect").hide();
};

function loadText(){
	document.getElementById('tabAdd').innerHTML = i18n("tabAdd") ;
	document.getElementById('tabBuy').innerHTML = i18n("tabBuy") ;
	document.getElementById('store').innerHTML = i18n("Merchant") ;
	document.getElementById('nameP').innerHTML = i18n("NameP") ;
	document.getElementById('priceP').innerHTML = i18n("PriceP") ;		
	document.getElementById('categP').innerHTML = i18n("CategP") ;
	document.getElementById('scategP').innerHTML = i18n("SCategP") ;
	document.getElementById('addP').value = i18n("ButtonAdd") ;
				
	document.getElementById('FormP').innerHTML = i18n("FormP") ;
	document.getElementById('disconnect').value = 'logout' ;

	document.getElementById('buyP').value = i18n("ButtonBuy") ;
	document.getElementById('fu_quantite').innerHTML = i18n("QuantityP") ;
	document.getElementById('fu_assurance').innerHTML = i18n("InsuranceP") ;

	document.getElementById('priceQ').value = "?";
	document.getElementById('nameQ').value = "?";
   
   

}

function miseaJ(){
	if(localStorage["regPrice"]){
		document.getElementById('fromus_price').value = localStorage["regPrice"] ;
	}
	if(localStorage["regName"]){
				document.getElementById('fromus_name').value = localStorage["regName"] ;
	}
}




$(document).ready(function() {
	
	var newDialog = $('<div id="fromus_dialogBox" class="toto">' +
					    '<div id="header">'+
							'<div id="selectLang">' +
	      						'<img id="lgfr" src="" />'+
							    '<img id="lgen" src="" />'+
							    '<img id="lgde" src="" />'+
	    					'</div>'+
	    					'<FORM name="loginU" id="loginU">'+
	     						'<input type="textbox" id="emailBox" placeholder="email"/><input type="password" id="passBox" placeholder="password"/>'+
	     						'<INPUT TYPE="button" NAME="logB" VALUE="Login" id="connect">'+
	    					'</FORM>'+
	    					'<div id="isconnect">'+
	      						'<input type="textbox" id="nick_name" disabled="true" style="border:none"/></br>'+
							    '<input type="textbox" id="ptsFU" disabled="true" style="border:none"/></br>'+
							    '<INPUT TYPE="button" NAME="dislogB" id="disconnect">'+
					    	'</div>'+
					    '</div>'+
							'<form id="fromusForm">' + 
								'<div id="menu" class="element_menu">'+
									'<ul id="onglets">'+
									    '<li><a href="#tab1" id="tabAdd"></a></li>'+
									    '<li><a href="#tab2" id="tabBuy"></a></li>'+
									'</ul>'+
								'</div></br>'+
								'<div id="corpAdd">'+
									      		'<input type="textbox" id="msgServer" disabled="true" style="border:none"/>'+
									      		'<div id="fromus_tabs">'+
									        		'<h2 id="FormP"></h2>'+
									        		'<form id="fromusForm">'+
									          			'<label for="store" id="store"></label></br>'+
											            '<input type="textbox" id="fromus_store" disabled="true"/></br>'+
											            '<label for="name" id="nameP"></label></br>'+
											            '<input type="textbox" id="fromus_name" disabled="true"/><input type="button" id="nameQ"></br>'+
											            '<label for="price" id="priceP" ></label></br>'+
											            '<input type="textbox" id="fromus_price" /><input type="button" id="priceQ"> </br>'+
											            '<label for="category" id="categP"></label></br>'+
											            '<select id="category">'+
											            '</select></br>'+
											            '<label for="sscategory" id="scategP"></label></br>'+
											            '<select id="sscategory">'+
											            '</select></br>'+
									            '<div class="content" id="tab1">'+
									            '<input type="button" id="addP">'+
									'</div>'+
									'<div class="content" id="tab2">'+
									    '<label id="fu_quantite" for="quantite"></label><input id="QteSpinner" value="1"></br>'+
									    '<label id="fu_assurance" for="assurance"></label><input type="checkbox" id="checkassur" name="assurance" /></br>'+
									    '<input type="button" id="buyP"> '+
									'</div>'+
							'</form>'+
						'<a href="http://from-us.com/fromus" target=_blank><img id="logofromus" height="100" src=""/></a>' +
					'</div>'
	);

	// variable qui permet de savoir si la dialog box est ouverte
	var isOpen = $("#fromus_dialogBox").dialog("isOpen");

	
	if (isOpen != true) {	

		newDialog.tabs().addClass( "ui-tabs-horizontal ui-helper-clearfix" );
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
			height: 550,
			width: 480,
			resizable: true,
			closeOnEscape: true,

			// bouton X => ferme la pop up
			close: function(ev,ui) {
				$(this).remove();
			},

			// au demarrage on cache le bouton commander, la quantité et l'assurance
			open: function(ev,ui) {
				/*var img = document.getElementById('logofromus');
  				img.src = chrome.extension.getURL('/img/logo.png');
  				var imgen = document.getElementById('lgen');
  				imgen.src = chrome.extension.getURL('/img/en.png');
  				var imgde = document.getElementById('lgde');
  				imgde.src = chrome.extension.getURL('/img/de.png');
  				var imgfr = document.getElementById('lgfr');
  				imgfr.src = chrome.extension.getURL('/img/fr.png');*/

  				loadText();
  				
  				sendToServer(_urlCategorie,{});
				if(readCookie('tokenFU')){
					hideLog();
					token=readCookie('tokenFU');
					if(readCookie('nameFU')){
						Nick_Name = readCookie('nameFU');
						document.getElementById("nick_name").value = i18n("MsgWelcome")+Nick_Name ;
						sendToServer(_urlPts+token,{});
					}
				}
				else 
					showLog();

				regStore = localStorage["regStore"];
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
			if(!regName)
				regName=localStorage["regName"];
			if(!regPrice)
				regPrice=localStorage["regPrice"];

	/*		console.log(regStore);
			//console.log(localStorage["regGetName"]);
			console.log(localStorage["regGetPrice"]);
			if(localStorage["regGetName"] && localStorage["regGetPrice"] && regStore){
				alert('ok');
				var siteAccess = localStorage["regGetName"]+localStorage["regGetPrice"];
				var jsonAccess = {url: regStore, access: siteAccess};
				var postDataAccess = JSON.stringify(jsonAccess);
				var accessJSON = {calcul:postDataAccess};
				sendToServer(_urlAccessOut+token, accessJSON);
			}
*/
			if(categVal && regName && regStore && regPrice){
				var jsonProduct = {prd_libelle: regName ,prd_site: regStore, prd_desc: regDesc, prd_visu: regVisu, prd_prix: regPrice, prd_cat: categVal};
				var postData = JSON.stringify(jsonProduct);
				var productJSON = {product:postData};
				sendToServer(_urlProduct+token , productJSON);
			}
	  	});

	  	$("input[id='buyP']").click(function() {
			var qteSpinner = document.getElementById("QteSpinner").value;
			var categSelect = document.getElementById("sscategory").value;

			var jsonProduct = {prd_libelle: regName ,prd_site: regStore, prd_desc: regDesc, prd_visu: regVisu, prd_prix: regPrice, prd_cat: categVal};
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
			changeLng('fr');
			loadText();
	  	});
	  	$("img[id='lgen']").click(function() {
			changeLng('en');
			loadText();
		});
		$("img[id='lgde']").click(function() {
			changeLng('de');
			loadText();
		});

		var priceq = document.getElementById('priceQ');
		/*var runtimeOrExtension = chrome.runtime && chrome.runtime.sendMessage ?
 		'runtime' : 'extension';*/
		priceq.addEventListener('click', function(e){
			console.log('debut listener priceq');
			document.getElementById('fromus_price').value="";
			var settime = setTimeout(function () {
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

				fromus_selectedTexttmp	=	fromus_classmatch[0].substring(7,fromus_classmatch[0].length-1);			
				var fus_priceclass = fromus_selectedTexttmp;				
				
				
				fromus_selectedTexttmp	= fromus_idmatch[0].substring(4,fromus_idmatch[0].length-1);			
				var fus_priceid =fromus_selectedTexttmp;
				
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
}, 1000);
			console.log('apres get price');
			var setinter = setInterval(function () {
				if(localStorage["regPrice"]){
					document.getElementById('fromus_price').value = localStorage["regPrice"] ;
				}
				if(localStorage["regName"]){
					document.getElementById('fromus_name').value = localStorage["regName"] ;
		}
		}	, 600); 
				if(document.getElementById('fromus_price').value)
					{clearInterval(setinter);}
			}, false); 

		var nameq = document.getElementById('nameQ');
		nameq.addEventListener('click', function(e){
			console.log('debut listener nameq');
			document.getElementById('fromus_name').value="";
			var settime = setTimeout("getName()", 1000);
			var setinter = setInterval("miseaJ()", 600); 
			if(document.getElementById('fromus_name').value)
				clearInterval(setinter);
		}, false);


	
		// ouverture de la dialog box
		newDialog.dialog("open");
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


/*	// suppression des key dans le localstorage
		localStorage.removeItem('regDesc');
		localStorage.removeItem('regName');
		localStorage.removeItem('regPrice');
		localStorage.removeItem('regStore');
		localStorage.removeItem('regOffer');   
	*/
			


/*


		// ajout du marchand automatiquement
		regStore = localStorage["regStore"];
		$('#fromus_store').attr('value',fromus_site);

		// ajout du nom automatiquement
		regName = localStorage["regName"];
		$('#fromus_name').attr('value',regName);

		// ajout du prix automatiquement
		regPrice = localStorage["regPrice"];
		$('#fromus_price').attr('value',regPrice);

		regOffer = localStorage["regOffer"];

		regDesc = localStorage["regDesc"];

		regVisu = localStorage["regImg"];

		console.log("avant d'appuyer sur le bouton : " + localStorage["regName"]);

		var fromus_morename = document.getElementById('fromus_morename');
		var runtimeOrExtension = chrome.runtime && chrome.runtime.sendMessage ?
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
*/

/*var jsonAccess = {libelle: regName, qte: qteVal ,montant: regPrice ,categ: categVal};
			var postDataAccess = JSON.stringify(jsonAccess);
			var accessJSON = {calcul:postDataAccess};
			sendToServer(_urlAccessOut+token, accessJSON); */
