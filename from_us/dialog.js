var token = '1';
var _urlProduct = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-product&token='+token;
var _urlCalcul = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-calcul&token='+token;
var _urlPanier = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-panier&token='+token;
var productJSON = {};
var panierJSON = {};
var qteVal;
var categVal;

function sendToServer(urlSelected) {
	$.post(urlSelected, productJSON)
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
						var jsonPanier = {libelle: localStorage["regName"] ,url: localStorage["regOffer"] ,desc: localStorage["regDesc"], qte: qteVal ,montant: totalPrice ,categ: categVal};
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
	$.post(_urlPanier, panierJSON)
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
var newDialog = $('<div id="dialogBox"><p>Formulaire</p><form id="myForm"><label for="store">Marchand : </label><input type="textbox" id="store" disabled="true"/></br><label for="name">Nom du produit : </label><input type="textbox" id="name" disabled="true"/></br><label for="price">Prix du produit : </label><input type="textbox" id="price" disabled="true"/></br><label for="category">Catégorie:</label><select id="category"><option value="default" selected="selected">Choisir une catégorie</option><option value="1">Antiques, Art & Collectibles</option><option value="24">Auto & Moto</option><option value="15">Bijoux & Montres</option><option value="16">Chaussures</option><option value="13">Entreprises & Industries</option><option value="19">Habits pour enfants</option><option value="26">Habits pour femmes</option><option value="25">Habits pour hommes</option><option value="14">Instrument de musique</option><option value="17">Jeux & Jouets</option><option value="28">Jeux vidéos & Informatique</option><option value="3">Livres, Films & Musiques</option><option value="30">Maison & Jardin</option><option value="27">Ordinateurs & Bureau</option><option value="23">Pièces, Bricolage & Outillage</option><option value="18">Puericulture</option><option value="21">Sacs & Accessoires</option><option value="29">Santé & Beauté</option><option value="12">Sports & Loisirs</option></select></br><label for="quantite">Quantite : </label><input id="QteSpinner"></form></div>');

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
					var jsonProduct = {prd_libelle: localStorage["regName"] ,prd_site: localStorage["regOffer"],prd_desc: localStorage["regDesc"] ,prd_prix: localStorage["regPrice"], prd_cat: categVal};
					var postData = JSON.stringify(jsonProduct);
					productJSON = {product:postData};
					sendToServer(_urlProduct);

					
					var qteSpinner = document.getElementById("QteSpinner");
					qteVal = qteSpinner.value;
					var categSelect = document.getElementById("category");
					categVal = categSelect.value;

					var jsonProduct = {libelle: localStorage["regName"] ,url: localStorage["regOffer"] ,desc: localStorage["regDesc"], prd_visu: localStorage["regVisu"], qte: qteVal ,montant: localStorage["regPrice"] ,categ: categVal};
					var postData = JSON.stringify(jsonProduct);
					productJSON = {product:postData};
					sendToServer(_urlCalcul);
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

					var jsonProduct = {prd_libelle: localStorage["regName"] ,prd_site: localStorage["regOffer"], prd_desc: localStorage["regDesc"], prd_visu: localStorage["regVisu"], prd_prix: localStorage["regPrice"], prd_cat: categVal};
					var postData = JSON.stringify(jsonProduct);
					productJSON = {product:postData};
					sendToServer(_urlProduct);
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


