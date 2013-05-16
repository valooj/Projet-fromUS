var token = 'a12344v234577zee';
var _urlProduct = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-product&token='+token;
var _urlCalcul = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-calcul&token='+token;
var _urlPanier = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-panier&token='+token;
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


function sendToServer(urlSelected, jsonSelected) {
	$.post(urlSelected, jsonSelected)
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

function change( el )
{
    alert("BUTTON");
}


$(document).ready(function() {

console.log( "Variable from Content Script: "+localStorage["regStore"] );
console.log( "Variable from Content Script: "+localStorage["regName"] );
console.log( "Variable from Content Script: "+localStorage["regPrice"] );
console.log( "Variable from Content Script: "+localStorage["regDesc"] );

// creation de la dialog box
var newDialog = $('<div id="dialogBox"><input onclick="change(this)" type="button" value="Login" id="log" /> <p>Formulaire</p><form id="myForm"><label for="store">Marchand : </label><input type="textbox" id="store" disabled="true"/></br><label for="name">Nom du produit : </label><input type="textbox" id="name" disabled="true"/></br><label for="price">Prix du produit : </label><input type="textbox" id="price" disabled="true"/></br><label for="category">Catégorie:</label><select id="category"><option value="default" selected="selected">Choisir une catégorie</option><option value="1">Antiques, Art & Collectibles</option><option value="24">Auto & Moto</option><option value="15">Bijoux & Montres</option><option value="16">Chaussures</option><option value="13">Entreprises & Industries</option><option value="19">Habits pour enfants</option><option value="26">Habits pour femmes</option><option value="25">Habits pour hommes</option><option value="14">Instrument de musique</option><option value="17">Jeux & Jouets</option><option value="28">Jeux vidéos & Informatique</option><option value="3">Livres, Films & Musiques</option><option value="30">Maison & Jardin</option><option value="27">Ordinateurs & Bureau</option><option value="23">Pièces, Bricolage & Outillage</option><option value="18">Puericulture</option><option value="21">Sacs & Accessoires</option><option value="29">Santé & Beauté</option><option value="12">Sports & Loisirs</option></select></br><label for="quantite">Quantite : </label><input id="QteSpinner"></form></div>');

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
	});
	
	
	// creation du spinner pour la quantite
	var newSpinner = $( "#spinner" ).spinner({
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

	// ouverture de la dialog box
	newDialog.dialog("open");
	
	// suppression des key dans le localstorage
	localStorage.removeItem('regDesc');
	localStorage.removeItem('regName');
	localStorage.removeItem('regPrice');
	localStorage.removeItem('regStore');
	localStorage.removeItem('regOffer');

}
});

function turnImgCheck(objCheck)
{
    var img = document.getElementById('in_out');
    var t = img.src.split('/');
    img.src = (t[t.length-1] == 'check2.gif') ? 'check1.gif' : 'check2.gif';
}



