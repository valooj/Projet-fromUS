var token_ext = 'ezgrzgrzg463663';
//var token = 'a12344v234577zee';
var token;
var _urlProduct = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-product&token=';
var _urlCalcul = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-calcul&token=';
var _urlPanier = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-panier&token=';

var _urlConnect = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-connect&token_ext='+token_ext;
var _urlLogout = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-logout&token_ext='+token_ext;

var _urlLogin = 'http://localhost/projetFU/from_us/authentification.php?token_ext='+token_ext;

var productJSON = {};
var calculJSON = {};
var panierJSON = {};
var qteVal;
var categVal;
var regStore;
var regName;
var regPrice;
var regOffer;
var regDesc;
var regVisu;

function connect(urlSelected) {
	$.get(urlSelected)
	.done(function(datas) { 
		if(datas['Token'] !== undefined)
			token = datas['Token'];
		if(datas['error'] !== undefined)
			alert(datas['error']);  
		})
	.fail(function(datas) { 
		alert(datas['error']); 
		})
;}

function sendToServer(urlSelected, jsonSelected) {
	$.post(urlSelected+token, jsonSelected)
	.done(function(datas) { 
		if(datas['status'] == 1){
			if(datas['Message'] !== undefined)
				alert(datas['Message']);
		}

		if(datas['status'] == 3){
			if(datas['Prix'] !== undefined){
				var totalPrice = datas['Prix'];
				if(totalPrice !== 0){
					if(confirm('L\'estimation du prix est de $'+totalPrice+' ')) {
						
						var jsonPanier = {libelle: regName ,url: regOffer ,desc: regDesc, qte: qteVal ,montant: totalPrice ,categ: categVal};
						var postDataPanier = JSON.stringify(jsonPanier);
						panierJSON = {panier:postDataPanier};
						sendAjoutPanier();
					}
				}
				
			}
		}

		if(datas['error'] !== undefined)
			alert(datas['error']);  
		})
	.fail(function(datas) { 
		alert(datas['error']); 
		})
;}

function sendAjoutPanier() {
	$.post(_urlPanier+token, panierJSON)
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


$(document).ready(function() {

console.log( "Variable from Content Script: "+localStorage["regStore"] );
console.log( "Variable from Content Script: "+localStorage["regName"] );
console.log( "Variable from Content Script: "+localStorage["regPrice"] );
console.log( "Variable from Content Script: "+localStorage["regDesc"] );

// creation de la dialog box
//var newDialog = $('<div id="dialogBox"><input type="button" value="login" id="log" /> <p>Formulaire</p><form id="myForm"><label for="store">Marchand : </label><input type="textbox" id="store" disabled="true"/></br><label for="name">Nom du produit : </label><input type="textbox" id="name" disabled="true"/></br><label for="price">Prix du produit : </label><input type="textbox" id="price" disabled="true"/></br><label for="category">Catégorie:</label><select id="category"><option value="default" selected="selected">Choisir une catégorie</option><option value="1">Antiques, Art & Collectibles</option><option value="24">Auto & Moto</option><option value="15">Bijoux & Montres</option><option value="16">Chaussures</option><option value="13">Entreprises & Industries</option><option value="19">Habits pour enfants</option><option value="26">Habits pour femmes</option><option value="25">Habits pour hommes</option><option value="14">Instrument de musique</option><option value="17">Jeux & Jouets</option><option value="28">Jeux vidéos & Informatique</option><option value="3">Livres, Films & Musiques</option><option value="30">Maison & Jardin</option><option value="27">Ordinateurs & Bureau</option><option value="23">Pièces, Bricolage & Outillage</option><option value="18">Puericulture</option><option value="21">Sacs & Accessoires</option><option value="29">Santé & Beauté</option><option value="12">Sports & Loisirs</option></select></br><label for="quantite">Quantite : </label><input id="QteSpinner"></form></div>');

// variable qui permet de savoir si la dialog box est ouverte
//var isOpen = $("#dialogBox").dialog("isOpen");


// creation de la popup
$.Zebra_Dialog({
    'type': 'false',
	'modal': false,
	'width': 450,
	'position': ['left + 20', 'top + 20'],
	'overlay_close': false,
	'auto_close': false,
	'title': 'From-us.com',
	'message': '<input type="button" value="Login" id="log" /></br>' + 
				'<form id="myForm">' +
					'<label for="store">Marchand : </label><input type="textbox" id="store" disabled="true"/></br>' +
					'<label for="name">Nom du produit : </label><input type="textbox" id="name" disabled="true"/></br>' +
					'<label for="price">Prix du produit : </label><input type="textbox" id="price" disabled="true"/></br>' + 
					'<label for="category">Catégorie:</label>' +
						'<select id="category">' +
							'<option value="default" selected="selected">Choisir une catégorie</option>' +
							'<option value="1">Antiques, Art & Collectibles</option>' +
							'<option value="24">Auto & Moto</option>' +
							'<option value="15">Bijoux & Montres</option>' + 
							'<option value="16">Chaussures</option>' + 
							'<option value="13">Entreprises & Industries</option>' + 
							'<option value="19">Habits pour enfants</option>' + 
							'<option value="26">Habits pour femmes</option>' +
							'<option value="25">Habits pour hommes</option>' +
							'<option value="14">Instrument de musique</option>' + 
							'<option value="17">Jeux & Jouets</option>' + 
							'<option value="28">Jeux vidéos & Informatique</option>' + 
							'<option value="3">Livres, Films & Musiques</option>' +
							'<option value="30">Maison & Jardin</option>' + 
							'<option value="27">Ordinateurs & Bureau</option>' + 
							'<option value="23">Pièces, Bricolage & Outillage</option>' + 
							'<option value="18">Puericulture</option>' +
							'<option value="21">Sacs & Accessoires</option>' +
							'<option value="29">Santé & Beauté</option>' + 
							'<option value="12">Sports & Loisirs</option>' +
						'</select></br>' +
					'<label for="quantite">Quantite : </label><input id="QteSpinner">' + 
				'</form>',
    'buttons':  [
					// bouton commander
                    {caption: 'Commander', callback: function() { 
						var qteSpinner = document.getElementById("QteSpinner");
						qteVal = qteSpinner.value;
						var categSelect = document.getElementById("category");
						categVal = categSelect.value;

						var jsonProduct = {prd_libelle: regName ,prd_site: regOffer, prd_desc: regDesc, prd_visu: regVisu, prd_prix: regPrice, prd_cat: categVal};
						var postData = JSON.stringify(jsonProduct);
						productJSON = {product:postData};
						sendToServer(_urlProduct,productJSON);


						var jsonCalcul = {libelle: regName, qte: qteVal ,montant: regPrice ,categ: categVal};
						var postDataCalcul = JSON.stringify(jsonCalcul);
						calculJSON = {calcul:postDataCalcul};
						sendToServer(_urlCalcul , calculJSON);
					}},
						
					// bouton soummettre un produit qui permet d'ajouter un produit dans la base de données
                    {caption: 'Ajouter fiche produit', callback: function() { 
						var qteSpinner = document.getElementById("QteSpinner");
						qteVal = qteSpinner.value;
						var categSelect = document.getElementById("category");
						categVal = categSelect.value;

						var jsonProduct = {prd_libelle: regName ,prd_site: regOffer, prd_desc: regDesc, prd_visu: regVisu, prd_prix: regPrice, prd_cat: categVal};
						var postData = JSON.stringify(jsonProduct);
						productJSON = {product:postData};
						sendToServer(_urlProduct , productJSON);
					}},
					
					// bouton annuler
                    {caption: 'Annuler', callback: function() { close()}}
                ]
});

// permet de deplacer la popup
$( ".ZebraDialog" ).draggable();

// si il n'y a pas de la dialog box alors on l'a crée
/*if (isOpen != true) {
	
	newDialog.dialog({
		modal: false,
		title: "From-us.com",
		show: 'clip',
		hide: 'clip',
		autoOpen: false,
		position: {
			my: "left top", 
			at: "left top"
		},

		width: 400,
		height: 300,
		maxHeight: 300,
		maxWidth: 400,
		closeOnEscape: false,
		buttons: [
			// bouton submit qui permet de commander un produit (ne marche pas pour l'instant)
			{
				text: "Submit", 
				title: "Permet de commander", 
				click: function() {

					var qteSpinner = document.getElementById("QteSpinner");
					qteVal = qteSpinner.value;
					var categSelect = document.getElementById("category");
					categVal = categSelect.value;

					var jsonProduct = {prd_libelle: regName ,prd_site: regOffer, prd_desc: regDesc, prd_visu: regVisu, prd_prix: regPrice, prd_cat: categVal};
					var postData = JSON.stringify(jsonProduct);
					productJSON = {product:postData};
					sendToServer(_urlProduct,productJSON);


					var jsonCalcul = {libelle: regName, qte: qteVal ,montant: regPrice ,categ: categVal};
					var postDataCalcul = JSON.stringify(jsonCalcul);
					calculJSON = {calcul:postDataCalcul};
					sendToServer(_urlCalcul , calculJSON);
				}
			},
	
			// bouton cancel, mettre destroy au lieu de close pour supprimer completement la dialog box
			{
				text: "Cancel", 
				title: "Fermer la pop up",
				click: function() {
					$(this).dialog('destroy');
				}
			},
			
			// bouton ajouter qui permet d'ajouter un produit dans la base de données 
			// à ne pas confondre avec le bouton submit (marche pas pour l'instant)
			{ 
				text: "Soumettre un produit", 
				title: "Ajouter un produit dans la base de données",
				click: function() {

					var qteSpinner = document.getElementById("QteSpinner");
					qteVal = qteSpinner.value;
					var categSelect = document.getElementById("category");
					categVal = categSelect.value;

					var jsonProduct = {prd_libelle: regName ,prd_site: regOffer, prd_desc: regDesc, prd_visu: regVisu, prd_prix: regPrice, prd_cat: categVal};
					var postData = JSON.stringify(jsonProduct);
					productJSON = {product:postData};
					sendToServer(_urlProduct , productJSON);
				}
			},
				
		
		
		]
	});*/
	
	
	// creation du spinner pour la quantite
	var newSpinner = $( "#QteSpinner" ).spinner({
		min: 1
	});	

	// ajout du marchand automatiquement
	regStore = localStorage["regStore"];
	$('#store').attr('value',regStore);

	// ajout du nom automatiquement
	regName = localStorage["regName"];
	$('#name').attr('value',regName);

	// ajout du prix automatiquement
	regPrice = localStorage["regPrice"];
	$('#price').attr('value',regPrice);

	regOffer = localStorage["regOffer"];

	regDesc = localStorage["regDesc"];

	regVisu = localStorage["regImg"];



	//Action sur le bouton login/logout
	var in_out = document.getElementById('log');
	 (!token) ? in_out.value = 'logout' : in_out.value = 'login';
	in_out.addEventListener('click', function(e){
			
		if ( in_out.value == "login" ){
	    	in_out.value = "logout";
	    	window.open(_urlLogin);
	    	//chrome.tabs.executeScript( null, {file: 'passlog.js', allFrames:false});
	    }
	    else{
	        in_out.value = "login";
	    	connect(_urlLogout);
		}
	    
	}, false);

	// ouverture de la dialog box
	//newDialog.dialog("open");
	connect(_urlConnect);
	
	// suppression des key dans le localstorage
	localStorage.removeItem('regDesc');
	localStorage.removeItem('regName');
	localStorage.removeItem('regPrice');
	localStorage.removeItem('regStore');
	localStorage.removeItem('regOffer');

}
);





