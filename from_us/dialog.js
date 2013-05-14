var token = '1';
var _urlProduct = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-product&token='+token;
var _urlUser = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-user&token='+token;
var _urlPanier = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-panier&token='+token;
var productJSON = {};
var userID = 2;
var userJSON = {};

function sendToServer(urlSelected) {
	$.post(urlSelected, productJSON)
	.done(function(datas) { 
		if(datas['Message'] !== undefined)
			alert(datas['Message']); 
		})
	.fail(function(datas) { 
		alert(datas['fail']); 
		})
	;}

function sendDataUser() {
	//alert('debut 1er post');
	$.post(_urlUser, userJSON, function(datas) {
		alert(datas);
	});
	//alert('1er post');
	$.post({
		url: _urlUser,
		datas: userJSON,
		success: function(datas) {
			alert(datas);
		},
		error: function(datas) {
			alert(datas);
		}
	});
}




$(document).ready(function() {

console.log( "Variable from Content Script: "+localStorage["regStore"] );
console.log( "Variable from Content Script: "+localStorage["regName"] );
console.log( "Variable from Content Script: "+localStorage["regPrice"] );
console.log( "Variable from Content Script: "+localStorage["regDesc"] );

// creation de la dialog box
var newDialog = $('<div id="dialogBox"><p>Formulaire</p><form id="myForm"><label for="store">Marchand : </label><input type="textbox" id="store" disabled="true"/></br><label for="name">Nom du produit : </label><input type="textbox" id="name" disabled="true"/></br><label for="price">Prix du produit : </label><input type="textbox" id="price" disabled="true"/></br><label for="category">Catégorie:</label><select id="category"><option value="default" selected="selected">Choisir une catégorie</option><option value="antique_art">Antiques, Art & Collectibles</option><option value="auto_moto">Auto & Moto</option><option value="bijoux_montres">Bijoux & Montres</option><option value="chaussures">Chaussures</option><option value="entreprises_industries">Entreprises & Industries</option><option value="habits_enfants">Habits pour enfants</option><option value="habits_femmes">Habits pour femmes</option><option value="habits_hommes">Habits pour hommes</option><option value="instrument_musique">Instrument de musique</option><option value="jeux_jouets">Jeux & Jouets</option><option value="jeux_informatique">Jeux vidéos & Informatique</option><option value="livres_films_musiques">Livres, Films & Musiques</option><option value="maison_jardin">Maison & Jardin</option><option value="ordinateurs_bureau">Ordinateurs & Bureau</option><option value="pieces_bricolage_outillage">Pièces, Bricolage & Outillage</option><option value="puericulture">Puericulture</option><option value="sacs_accessoires">Sacs & Accessoires</option><option value="sante_beaute">Santé & Beauté</option><option value="sports_loisirs">Sports & Loisirs</option></select></br><label for="quantite">Quantite : </label><input id="QteSpinner"></form></div>');

// variable qui permet de savoir si la dialog box est ouverte
var isOpen = $("#dialogBox").dialog("isOpen");

// si il n'y a pas de la dialog box alors on l'a crée
if (isOpen != true) {
	
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
					var jsonProduct = {prd_libelle: localStorage["regName"] ,prd_site: localStorage["regOffer"],prd_prix: localStorage["regPrice"]};
					var postData = JSON.stringify(jsonProduct);
					productJSON = {product:postData};
					sendToServer(_urlProduct);

					var jsonProduct = {libelle: localStorage["regName"] ,url: localStorage["regOffer"] ,desc: localStorage["regDesc"], qte: document.getElementById("QteSpinner") ,montant: 333 ,categ: document.getElementById("category")};
					var postData = JSON.stringify(jsonProduct);
					productJSON = {product:postData};
					sendToServer(_urlPanier);
					alert('fin');
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

					var jsonProduct = {prd_libelle: localStorage["regName"] ,prd_site: localStorage["regOffer"],prd_prix: localStorage["regPrice"]};
					var postData = JSON.stringify(jsonProduct);
					productJSON = {product:postData};
					sendToServer(_urlProduct);

					/*
					//var jsonProduct = {prd_libelle: 'asedrr' ,prd_site: 'bjkitgh',prd_prix: 69};
					var jsonUser = { id : userID};
					var postData2 = JSON.stringify(jsonUser);
					userJSON = {user:postData2};
					sendDataUser();
					*/
				}
			},
				
		
		
		]
	});
	
	
	// creation du spinner pour la quantite
	var newSpinner = $( "#spinner" ).spinner({
		min: 1
	});	

	// ajout du marchand automatiquement
	var regStore = localStorage["regStore"];
	$('#store').attr('value',regStore);

	// ajout du nom automatiquement
	var regName = localStorage["regName"];
	$('#name').attr('value',regName);

	// ajout du prix automatiquement
	var regPrice = localStorage["regPrice"];
	$('#price').attr('value',regPrice);

	// ouverture de la dialog box
	newDialog.dialog("open");

}
});


