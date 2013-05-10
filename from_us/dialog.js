var _url = 'http://localhost/projetFU/Communication/cible2.php?action=MAJ';
var productJSON = {};
var pseudo = 'monPseudo';
var mdp = 'monMDP';
var userJSON = {};

function sendToServer() {
	alert('debut 1er post');
	$.post(_url, productJSON, function(datas) {
		alert(datas);
	});
	alert('1er post');
	$.post({
		url: _url,
		datas: productJSON,
		success: function(datas) {
			alert(datas);
		},
		error: function(datas) {
			alert(datas);
		}
	});
}

function sendDataUser() {
	alert('debut 1er post');
	$.post(_url, userJSON, function(datas) {
		alert(datas);
	});
	alert('1er post');
	$.post({
		url: _url,
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
var newDialog = $('<div id="dialogBox"><p>Formulaire</p><form id="myForm"><label for="store">Marchand : </label><input type="textbox" id="store" disabled="true"/></br><label for="name">Nom du produit : </label><input type="textbox" id="name" disabled="true"/></br><label for="price">Prix du produit : </label><input type="textbox" id="price" disabled="true"/></br><label for="category">Catégorie:</label><select id="category"><option value="default" selected="selected">Choisir une catégorie</option><option value="antique_art">Antiques, Art & Collectibles</option><option value="auto_moto">Auto & Moto</option><option value="bijoux_montres">Bijoux & Montres</option><option value="chaussures">Chaussures</option><option value="entreprises_industries">Entreprises & Industries</option><option value="habits_enfants">Habits pour enfants</option><option value="habits_femmes">Habits pour femmes</option><option value="habits_hommes">Habits pour hommes</option><option value="instrument_musique">Instrument de musique</option><option value="jeux_jouets">Jeux & Jouets</option><option value="jeux_informatique">Jeux vidéos & Informatique</option><option value="livres_films_musiques">Livres, Films & Musiques</option><option value="maison_jardin">Maison & Jardin</option><option value="ordinateurs_bureau">Ordinateurs & Bureau</option><option value="pieces_bricolage_outillage">Pièces, Bricolage & Outillage</option><option value="puericulture">Puericulture</option><option value="sacs_accessoires">Sacs & Accessoires</option><option value="sante_beaute">Santé & Beauté</option><option value="sports_loisirs">Sports & Loisirs</option></select></br><label for="quantite">Quantite : </label><input id="spinner"></form></div>');

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
				//request();
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

					//objectJSON.products=[];
					//objectJSON.products[0]={'prd_libelle':localStorage['regPrice'] ,'prd_site': localStorage['regPrice'],'prd_prix':localStorage['regPrice']};
					//objectJSON.products[0]={"prd_libelle": "libelloo" ,"prd_site": "siteoo"};

					var jsonProduct = {prd_libelle: localStorage['regName'] ,prd_site: localStorage['regStore'],prd_prix: localStorage['regPrice']};
					//var jsonObj = {prd_libelle: 'libellodf' ,prd_site: 'siteoddo'};
					var postData = JSON.stringify(jsonProduct);
					productJSON = {product:postData};

					alert('debut fct');
					sendToServer();
					alert('fin fct');

					alert('Début envoi données client');
					var jsonUser = {pseud : pseudo ,mot : mdp};
					var postData2 = JSON.stringify(jsonUser);
					userJSON = {user:postData};
					
					sendDataUser();
					alert('Fin envoi des données');
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


