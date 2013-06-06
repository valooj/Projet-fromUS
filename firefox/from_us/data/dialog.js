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
				var content_pclass;
				var content_pid;
				for(var i=0 ; i<elem.length ; i++)
				{
				    if(elem[i].indexOf('price_class') !== (-1)){
				  		var sous_elem = elem[i].split('<-->');
				  		//alert(sous_elem[0]);
				  		//alert(sous_elem[1]);
				  		content_pclass= sous_elem[1]+';'+content_pclass;
				  	}
				  	else if(elem[i].indexOf('price_id') !== (-1)){
				  	 var sous_elem = elem[i].split('<-->');
				  		//alert(sous_elem[0]);
				  		//alert(sous_elem[1]);
				  		//fromus_sitelist[localStorage["popup_store"]].price_class.push(sous_elem[1]);
				  		//i = elem.length+1;
				  		content_pid= sous_elem[1]+';'+content_pid;
				  	} 
				} 
				//console.log(content_pclass +'class    id'+ content_pid);
				fromus_recupPrice("class",content_pclass);
				regPrice = localStorage["regPrice"];
				$('#fromus_price').attr('value',regPrice);
				/*chrome.extension.sendMessage({method: "price_class", data: content_pclass});
				chrome.extension.sendMessage({method: "price_id", data: content_pid});

				chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
				   document.getElementById('fromus_price').value = localStorage["regPrices"] ;

				  });  */
				
				
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
	var jsonUrl = {info_url:localStorage["popup_store"]};
	var postUrl = JSON.stringify(jsonUrl);
	var urlJSON = {url_site:postUrl};
	sendToServer(_urlAccessIn+'&url_site='+regStore, {});
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
											            '<input type="textbox" id="fromus_name" disabled="true"/></br>'+
											            '<label for="price" id="priceP" ></label></br>'+
											            '<input type="textbox" id="fromus_price" /></br>'+
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
						'<a href="http://from-us.com/fromus" target=_blank><img id="logofromus" height="100" src="img/logo.png"/></a>' +
					'</div>'
	);

	// variable qui permet de savoir si la dialog box est ouverte
	var isOpen = $("#fromus_dialogBox").dialog("isOpen");

	console.log('avant isopen');
	if (isOpen != true) {	

		//newDialog.tabs().addClass( "ui-tabs-horizontal ui-helper-clearfix" );
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
  				$('.toto .Fromus-toto-ui-dialog-titlebar').css({
'background-color':'#203064',
'text-align':'left'
});
$('#Fromus-toto-ui-id-4 ').css({
width:'858px'
});
$('.toto .Fromus-toto-ui-widget-header').css({
'background-color':'#203064'
});
$('.toto label ').css({
display:'inline-block',
width:'130px',
'text-align':'right',
'margin-left':'90px',
'margin-top':'3px'
});
$('.toto #login').css({
'font-size':'small',
color:'grey',  
display:'inline-block',
'margin-left':'200px'
});
$('.toto #create ').css({
'font-size':'small',
color:'grey',  
display:'inline-block',
'margin-left':'255px'
});

$('.toto #log').css({
display:'inline-block',
'float':'center',
'margin-left':'280px'
});
/*
$('.toto * ').css({
border: 1px solid red;
}*/
$('.toto #fromus_tabs-1 ').css({
border:'2px double #203064',
'border-radius':'5px',
margin:'10px',
padding:'20px'
});
$('.toto input#Nick_Name ').css({
width:'600px',
'float':'right',
'margin-top':'0px',
'text-align':'right',
'font-size':'small',
border:'none'
});
$('.toto h2').css({
'margin-bottom':'20px',
'text-align':'center',
'font-size':'x-large',
'text-decoration':'underline',
color:'#203064'
});
$('.toto #fromusForm ').css({
});
$('.toto #FromusFrom label').css({
'float':'left',
'text-align':'right',
width:'200px'
});
$('.toto #fromusForm input[type="textbox"] ').css({
width:'280px',
margin:'0px',
'margin-bottom':'5px',
padding:'0px'
});
$('.toto select#category').css({
width:'282px',
'margin-top':'0px',
'margin-bottom':'5px',
padding:'0px',
height:'20px'
});
$('.toto select#sscategory').css({
width:'282px',
'margin-bottom':'5px',
'margin-top':'0px',
padding:'0px',
height:'20px'
});
$('.toto input#QteSpinner').css({
width:'50px',
height:'20px',
border:'none'
});
$('.toto .Fromus-toto-ui-spinner').css({
height:'18px',
'margin-top':'0px',
'margin-bottom':'5px',
border:'none'
});
$('.toto #fromus_divassurance	').css({
width:'50px',
display:'inline-block',
'margin-top':'-4px',
'margin-bottom':'5px'
});
$('.toto #logofromus').css({
'float':'left',
'margin-left':'50px'
});
/* Layout helpers
----------------------------------*/
$('.Fromus-toto-ui-helper-hidden ').css({
display:'none'
});
$('.Fromus-toto-ui-helper-hidden-accessible ').css({
border:'0',
clip:'rect(0 0 0 0)',
height:'1px',
margin:'-1px',
overflow:'hidden',
padding:'0',
position:'absolute',
width:'1px'
});
$('.Fromus-toto-ui-helper-reset ').css({
margin:'0',
padding:'0',
border:'0',
outline:'0',
'line-height':'1.3',
'text-decoration':'none',
'font-size':'100%',
	/*font-size':'55px',*/
'list-style':'none'
});
$('.Fromus-toto-ui-helper-clearfix:before').css({});
$('.Fromus-toto-ui-helper-clearfix:after ').css({
content:'',
display:'table',
'border-collapse':'collapse'
});
$('.Fromus-toto-ui-helper-clearfix:after ').css({
clear:'both'
});
$('.Fromus-toto-ui-helper-clearfix ').css({
'min-height':'0' 
});
$('.Fromus-toto-ui-helper-zfix ').css({
width:'100%',
height:'100%',
top:'0',
left:'0',
position:'absolute',
opacity:'0',
filter:'Alpha(Opacity=0)'
});

$('.Fromus-toto-ui-front ').css({
'z-index':'100'
});


/* Interaction Cues
----------------------------------*/
$('.Fromus-toto-ui-state-disabled ').css({
cursor:'default !important'
});


/* Icons
----------------------------------*/

/* states and images */
$('.Fromus-toto-ui-icon ').css({
display:'block',
'text-indent':'-99999px',
overflow:'hidden',
'background-repeat':'no-repeat'
});


/* Misc visuals
----------------------------------*/

/* Overlays */
$('.Fromus-toto-ui-widget-overlay ').css({
position:'fixed',
top:'0',
left:'0',
width:'100%',
height:'100%'
});

$('.Fromus-toto-ui-accordion .Fromus-toto-ui-accordion-header ').css({
display:'block',
cursor:'pointer',
position:'relative',
'margin-top':'2px',
padding:'.5em .5em .5em .7em',
'min-height':'0' 
});
$('.Fromus-toto-ui-accordion .Fromus-toto-ui-accordion-icons ').css({
'padding-left':'2.2em'
});
$('.Fromus-toto-ui-accordion .Fromus-toto-ui-accordion-noicons ').css({
'padding-left':'.7em'
});
$('.Fromus-toto-ui-accordion .Fromus-toto-ui-accordion-icons .Fromus-toto-ui-accordion-icons ').css({
'padding-left':'2.2em'
});
$('.Fromus-toto-ui-accordion .Fromus-toto-ui-accordion-header .Fromus-toto-ui-accordion-header-icon ').css({
position:'absolute',
left:'.5em',
top:'50%',
'margin-top':'-8px'
});
$('.Fromus-toto-ui-accordion .Fromus-toto-ui-accordion-content ').css({
padding:'1em 2.2em',
'border-top':'0',
overflow:'auto'
});

$('.Fromus-toto-ui-autocomplete ').css({
position:'absolute',
top:'0',
left:'0',
cursor:'default'
});

/*$('.Fromus-toto-ui-button ').css({
display: inline-block;
position: relative;
padding: 0;
'line-height':'normal',
'margin-right':'.1em',
cursor: pointer;
'vertical-align':'middle',
'text-align':'center',
overflow: visible; /* removes extra width in IE /

}*/
$('.Fromus-toto-ui-button').css({});
$('.Fromus-toto-ui-button:link').css({});
$('.Fromus-toto-ui-button:visited').css({});
$('.Fromus-toto-ui-button:hover').css({});
$('.Fromus-toto-ui-button:active ').css({
'text-decoration':'none'
});
/* to make room for the icon, a width needs to be set here */
$('.Fromus-toto-ui-button-icon-only ').css({
width:'2.2em'
});
/* button elements seem to need a little more width */
$('button.Fromus-toto-ui-button-icon-only ').css({
width:'2.4em'
});
$('.Fromus-toto-ui-button-icons-only ').css({
width:'3.4em'
});
$('button.Fromus-toto-ui-button-icons-only ').css({
width:'3.7em'
});

/* button text element */
$('.Fromus-toto-ui-button .Fromus-toto-ui-button-text ').css({
display:'block',
'line-height':'normal',
color:'white'
});
$('.Fromus-toto-ui-button-text-only .Fromus-toto-ui-button-text ').css({
padding:'.4em 1em'
});
$('.Fromus-toto-ui-button-icon-only .Fromus-toto-ui-button-text').css({});
$('.Fromus-toto-ui-button-icons-only .Fromus-toto-ui-button-text ').css({
padding:'.4em',
'text-indent':'-9999999px'
});
$('.Fromus-toto-ui-button-text-icon-primary .Fromus-toto-ui-button-text').css({});
$('.Fromus-toto-ui-button-text-icons .Fromus-toto-ui-button-text ').css({
padding:'.4em 1em .4em 2.1em'
});
$('.Fromus-toto-ui-button-text-icon-secondary .Fromus-toto-ui-button-text').css({});
$('.Fromus-toto-ui-button-text-icons .Fromus-toto-ui-button-text ').css({
padding:'.4em 2.1em .4em 1em'
});
$('.Fromus-toto-ui-button-text-icons .Fromus-toto-ui-button-text ').css({
'padding-left':'2.1em',
'padding-right':'2.1em'
});
/* no icon support for input elements, provide padding by default */
$('input.Fromus-toto-ui-button ').css({
padding:'.4em 1em'
});

/* button icon element(s) */
$('.Fromus-toto-ui-button-icon-only .Fromus-toto-ui-icon').css({});
$('.Fromus-toto-ui-button-text-icon-primary .Fromus-toto-ui-icon').css({});
$('.Fromus-toto-ui-button-text-icon-secondary .Fromus-toto-ui-icon').css({});
$('.Fromus-toto-ui-button-text-icons .Fromus-toto-ui-icon').css({});
$('.Fromus-toto-ui-button-icons-only .Fromus-toto-ui-icon ').css({
position:'absolute',
top:'50%',
'margin-top':'-8px',
'margin-right':'10px'
});
$('.Fromus-toto-ui-button-icon-only .Fromus-toto-ui-icon ').css({
left:'50%',
'margin-left':'-8px'
});
$('.Fromus-toto-ui-button-text-icon-primary .Fromus-toto-ui-button-icon-primary').css({});
$('.Fromus-toto-ui-button-text-icons .Fromus-toto-ui-button-icon-primary').css({});
$('.Fromus-toto-ui-button-icons-only .Fromus-toto-ui-button-icon-primary ').css({
left:'.5em',
color:'white'
});
$('.Fromus-toto-ui-button-text-icon-secondary .Fromus-toto-ui-button-icon-secondary').css({});
$('.Fromus-toto-ui-button-text-icons .Fromus-toto-ui-button-icon-secondary').css({});
$('.Fromus-toto-ui-button-icons-only .Fromus-toto-ui-button-icon-secondary ').css({
right:'.5em'
});

/* button sets */
$('.Fromus-toto-ui-buttonset ').css({
'margin-right':'7px'
});
$('.Fromus-toto-ui-buttonset .Fromus-toto-ui-button ').css({
'margin-left':'0',
'margin-right':'-.3em'
});

/* workarounds */
/* reset extra padding in Firefox, see h5bp.com/l */
$('input.Fromus-toto-ui-button::-moz-focus-inner').css({});
$('button.Fromus-toto-ui-button::-moz-focus-inner ').css({
border:'0',
padding:'0'
});
$('.Fromus-toto-ui-dialog ').css({
position:'absolute',
top:'0',
left:'0',
	/*padding: .2em;*/
outline:'0',
'z-index':'999999999'

});
$('.Fromus-toto-ui-dialog .Fromus-toto-ui-dialog-titlebar ').css({
	/*padding: .4em 1em;*/
position:'relative',
'background-color':'#203064',
color:'white'
});
$('.Fromus-toto-ui-dialog .Fromus-toto-ui-dialog-title ').css({
'float':'left',
	/*margin: .1em 0;*/
'white-space':'nowrap',
width:'90%',
overflow:'hidden',
'text-overflow':'ellipsis'
});
$('.Fromus-toto-ui-dialog .Fromus-toto-ui-dialog-titlebar-close ').css({
position:'absolute',
	/*right: .3em;*/
top:'50%',
width:'21px',
margin:'-10px 0 0 0',
padding:'1px',
height:'20px'
});
$('.Fromus-toto-ui-dialog .Fromus-toto-ui-dialog-content ').css({
position:'relative',
border:'0',
	/*padding: .5em 1em;*/
background:'none',
overflow:'auto'
});
$('.Fromus-toto-ui-dialog .Fromus-toto-ui-dialog-buttonpane ').css({
'text-align':'left',
'border-width':'1px 0 0 0',
'background-image':'none',
	/*margin-top: .5em;*/
	/*padding: .3em 1em .5em .4em;*/
});
$('.Fromus-toto-ui-dialog .Fromus-toto-ui-dialog-buttonpane .Fromus-toto-ui-dialog-buttonset ').css({
'float':'right'
});
$('.Fromus-toto-ui-dialog .Fromus-toto-ui-dialog-buttonpane button ').css({
	/*margin: .5em .4em .5em 0;*/
cursor:'pointer'
});
$('.Fromus-toto-ui-dialog .Fromus-toto-ui-resizable-se ').css({
width:'12px',
height:'12px',
right:'-5px',
bottom:'-5px',
'background-position':'16px 16px'
});
$('.Fromus-toto-ui-draggable .Fromus-toto-ui-dialog-titlebar ').css({
cursor:'move'
});

$('.Fromus-toto-ui-menu ').css({
'list-style':'none',
padding:'2px',
margin:'0',
display:'block',
outline:'none'
});
$('.Fromus-toto-ui-menu .Fromus-toto-ui-menu ').css({
'margin-top':'-3px',
position:'absolute'
});
$('.Fromus-toto-ui-menu .Fromus-toto-ui-menu-item ').css({
margin:'0',
padding:'0',
width:'100%'
});
$('.Fromus-toto-ui-menu .Fromus-toto-ui-menu-divider ').css({
margin:'5px -2px 5px -2px',
height:'0',
'font-size':'0',
'line-height':'0',
'border-width':'1px 0 0 0'
});
$('.Fromus-toto-ui-menu .Fromus-toto-ui-menu-item a ').css({
'text-decoration':'none',
display:'block',
padding:'2px .4em',
'line-height':'1.5',
'min-height':'0', 
'font-weight':'normal'
});
$('.Fromus-toto-ui-menu .Fromus-toto-ui-menu-item a.Fromus-toto-ui-state-focus').css({});
$('.Fromus-toto-ui-menu .Fromus-toto-ui-menu-item a.Fromus-toto-ui-state-active ').css({
'font-weight':'normal',
margin:'-1px'
});

$('.Fromus-toto-ui-menu .Fromus-toto-ui-state-disabled ').css({
'font-weight':'normal',
margin:'.4em 0 .2em',
'line-height':'1.5'
});
$('.Fromus-toto-ui-menu .Fromus-toto-ui-state-disabled a ').css({
cursor:'default'
});

/* icon support */
$('.Fromus-toto-ui-menu-icons ').css({
position:'relative'
});
$('.Fromus-toto-ui-menu-icons .Fromus-toto-ui-menu-item a ').css({
position:'relative',
'padding-left':'2em'
});

/* left-aligned */
$('.Fromus-toto-ui-menu .Fromus-toto-ui-icon ').css({
position:'absolute',
top:'.2em',
left:'.2em'
});

/* right-aligned */
$('.Fromus-toto-ui-menu .Fromus-toto-ui-menu-icon ').css({
position:'static',
'float':'right'
});

$('.Fromus-toto-ui-progressbar ').css({
height:'2em',
'text-align':'left',
overflow:'hidden'
});
$('.Fromus-toto-ui-progressbar .Fromus-toto-ui-progressbar-value ').css({
margin:'-1px',
height:'100%'
});
$('.Fromus-toto-ui-progressbar .Fromus-toto-ui-progressbar-overlay ').css({
	/*background:'url("chrome-extension://__MSG_@@extension_id__/jquery/images/animated-overlay.gif")',*/
height:'100%',
filter:'alpha(opacity=25)',
opacity:'0.25'
});
$('.Fromus-toto-ui-progressbar-indeterminate .Fromus-toto-ui-progressbar-value ').css({
'background-image':'none'
});

$('.Fromus-toto-ui-resizable ').css({
position:'relative'
});

$('.Fromus-toto-ui-resizable-handle ').css({
position:'absolute',
'font-size':'0.1px',
display:'block'
});

$('.Fromus-toto-ui-resizable-disabled .Fromus-toto-ui-resizable-handle').css({});
$('.Fromus-toto-ui-resizable-autohide .Fromus-toto-ui-resizable-handle ').css({
display:'none'
});
$('.Fromus-toto-ui-resizable-n ').css({
cursor:'n-resize',
height:'7px',
width:'100%',
top:'-5px',
left:'0'
});
$('.Fromus-toto-ui-resizable-s ').css({
cursor:'s-resize',
height:'7px',
width:'100%',
bottom:'-5px',
left:'0'
});
$('.Fromus-toto-ui-resizable-e ').css({
cursor:'e-resize',
width:'7px',
right:'-5px',
top:'0',
height:'100%'
});
$('.Fromus-toto-ui-resizable-w ').css({
cursor:'w-resize',
width:'7px',
left:'-5px',
top:'0',
height:'100%'
});
$('.Fromus-toto-ui-resizable-se ').css({
cursor:'se-resize',
width:'12px',
height:'12px',
right:'1px',
bottom:'1px'
});
$('.Fromus-toto-ui-resizable-sw ').css({
cursor:'sw-resize',
width:'9px',
height:'9px',
left:'-5px',
bottom:'-5px'
});
$('.Fromus-toto-ui-resizable-nw ').css({
cursor:'nw-resize',
width:'9px',
height:'9px',
left:'-5px',
top:'-5px'
});
$('.Fromus-toto-ui-resizable-ne ').css({
cursor:'ne-resize',
width:'9px',
height:'9px',
right:'-5px',
top:'-5px'
});

$('.Fromus-toto-ui-selectable-helper ').css({
position:'absolute',
'z-index':'100',
border:'1px dotted black'
});

$('.Fromus-toto-ui-slider ').css({
position:'relative',
'text-align':'left'
});
$('.Fromus-toto-ui-slider .Fromus-toto-ui-slider-handle ').css({
position:'absolute',
'z-index':'2',
width:'1.2em',
height:'1.2em',
cursor:'default'
});
$('.Fromus-toto-ui-slider .Fromus-toto-ui-slider-range ').css({
position:'absolute',
'z-index':'1',
'font-size':'.7em',
display:'block',
border:'0',
'background-position':'0 0'
});

/* For IE8 - See #6727 */
$('.Fromus-toto-ui-slider.Fromus-toto-ui-state-disabled .Fromus-toto-ui-slider-handle').css({});
$('.Fromus-toto-ui-slider.Fromus-toto-ui-state-disabled .Fromus-toto-ui-slider-range ').css({
filter:'inherit'
});

$('.Fromus-toto-ui-slider-horizontal ').css({
height:'.8em'
});
$('.Fromus-toto-ui-slider-horizontal .Fromus-toto-ui-slider-handle ').css({
top:'-.3em',
'margin-left':'-.6em'
});
$('.Fromus-toto-ui-slider-horizontal .Fromus-toto-ui-slider-range ').css({
top:'0',
height:'100%'
});
$('.Fromus-toto-ui-slider-horizontal .Fromus-toto-ui-slider-range-min ').css({
left:'0'
});
$('.Fromus-toto-ui-slider-horizontal .Fromus-toto-ui-slider-range-max ').css({
right:'0'
});

$('.Fromus-toto-ui-slider-vertical ').css({
width:'.8em',
height:'100px'
});
$('.Fromus-toto-ui-slider-vertical .Fromus-toto-ui-slider-handle ').css({
left:'-.3em',
'margin-left':'0',
'margin-bottom':'-.6em'
});
$('.Fromus-toto-ui-slider-vertical .Fromus-toto-ui-slider-range ').css({
left:'0',
width:'100%'
});
$('.Fromus-toto-ui-slider-vertical .Fromus-toto-ui-slider-range-min ').css({
bottom:'0'
});
$('.Fromus-toto-ui-slider-vertical .Fromus-toto-ui-slider-range-max ').css({
top:'0'
});

$('.Fromus-toto-ui-spinner ').css({
position:'relative',
display:'inline-block',
overflow:'hidden',
padding:'0',
'vertical-align':'middle'

});
$('.Fromus-toto-ui-spinner-input ').css({
border:'none',
background:'none',
color:'inherit',
padding:'0',
margin:'.2em 0',
'vertical-align':'middle',
'margin-left':'.4em',
'margin-right':'22px'
});
$('.Fromus-toto-ui-spinner-button ').css({
width:'16px',
height:'50%',
'font-size':'.5em',
padding:'0',
margin:'0',
'text-align':'center',
position:'absolute',
cursor:'default',
display:'block',
overflow:'hidden',
right:'0'
});
/* more specificity required here to overide default borders */
$('.Fromus-toto-ui-spinner a.Fromus-toto-ui-spinner-button ').css({
'border-top':'none',
'border-bottom':'none',
'border-right':'none'
});
/* vertical centre icon */
$('.Fromus-toto-ui-spinner .Fromus-toto-ui-icon ').css({
position:'absolute',
'margin-top':'-8px',
top:'50%',
left:'0'
});
$('.Fromus-toto-ui-spinner-up ').css({
top:'0'
});
$('.Fromus-toto-ui-spinner-down ').css({
bottom:'0'
});

/* TR overrides */
$('.Fromus-toto-ui-spinner .Fromus-toto-ui-icon-triangle-1-s ').css({
	/* need to fix icons sprite */
'background-position':'-65px -16px'
});

$('.Fromus-toto-ui-tabs ').css({
position:'relative',
padding:'.2em'
});

/* ajout de tab vertical 
$('.ui-tabs-vertical ').css({ width: 55em; });
$('.ui-tabs-vertical .ui-tabs-nav ').css({ padding: .2em .1em .2em .2em; float: left;  background-color: #c11f34;});
$('.ui-tabs-vertical .ui-tabs-nav li ').css({ clear:center; width: 80%; background-color: #203064; margin-left: 0px;});
$('.ui-tabs-vertical .ui-tabs-nav li a ').css({ display:block;  color: white; width: 128px;});
$('.ui-tabs-vertical .ui-tabs-nav li.ui-tabs-active ').css({ padding-bottom: 0; padding-right: 3px; background-color: #204093; });
$('.ui-tabs-vertical .ui-tabs-panel ').css({ padding: 1em; float: right; width: 40em;});
$('.ui-tabs .ui-tabs-nav ').css({
width: 160px;
margin: 5px;
padding: 5px;
}*/





$('.Fromus-toto-ui-tabs .Fromus-toto-ui-tabs-nav li ').css({
'list-style':'none',
'float':'left',
position:'relative',
top:'0',
width:'158px',
'border-bottom-width':'0',
padding:'0',
'white-space':'nowrap'
});
$('.Fromus-toto-ui-tabs .Fromus-toto-ui-tabs-nav li a ').css({
'float':'left',
padding:'.5em 1em',
'text-decoration':'none'
});
$('.Fromus-toto-ui-tabs .Fromus-toto-ui-tabs-nav li.Fromus-toto-ui-tabs-active ').css({

'margin-bottom':'-1px',
'padding-bottom':'1px'
});
$('.Fromus-toto-ui-tabs .Fromus-toto-ui-tabs-nav li.Fromus-toto-ui-tabs-active a').css({});
$('.Fromus-toto-ui-tabs .Fromus-toto-ui-tabs-nav li.Fromus-toto-ui-state-disabled a').css({});
$('.Fromus-toto-ui-tabs .Fromus-toto-ui-tabs-nav li.Fromus-toto-ui-tabs-loading a ').css({
cursor:'text'
});
$('.Fromus-toto-ui-tabs .Fromus-toto-ui-tabs-nav li a').css({}); 
$('.Fromus-toto-ui-tabs-collapsible .Fromus-toto-ui-tabs-nav li.Fromus-toto-ui-tabs-active a ').css({
cursor:'pointer'
});
$('.Fromus-toto-ui-tabs .Fromus-toto-ui-tabs-panel ').css({
display:'block',
'border-width':'0',
padding:'1em 1.4em',
background:'none'
});

$('.Fromus-toto-ui-tooltip ').css({
padding:'8px',
position:'absolute',
'z-index':'9999',
'max-width':'300px',
'-webkit-box-shadow':'0 0 5px #aaa',
'box-shadow':'0 0 5px #aaa'
});
$('body .Fromus-toto-ui-tooltip ').css({
'border-width':'2px'
});

/* Component containers
----------------------------------*/
$('.Fromus-toto-ui-widget ').css({
'font-family': 'Verdana,Arial,sans-serif',
'font-size':'15px'
});
$('.Fromus-toto-ui-widget .Fromus-toto-ui-widget ').css({
'font-size':'1em'
});
$('.Fromus-toto-ui-widget input').css({});
$('.Fromus-toto-ui-widget select').css({});
$('.Fromus-toto-ui-widget textarea').css({});
$('.Fromus-toto-ui-widget button ').css({
'font-family':'Verdana,Arial,sans-serif',
	/*font-size: 1em;*/
'font-size':'15px'
});
$('.Fromus-toto-ui-widget button').css({
'background-color':'#203064',
color:'white'
});


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

		console.log('apres newDialog');

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

		console.log('apres les langues');

		


		
		// ouverture de la dialog box
		newDialog.dialog("open");
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