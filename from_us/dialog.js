$(document).ready(function() {

console.log( "Variable from Content Script: "+localStorage["regStore"] );
console.log( "Variable from Content Script: "+localStorage["regName"] );
console.log( "Variable from Content Script: "+localStorage["regPrice"] );


// creation de la dialog box
var newDialog = $('<div id="dialogBox"><p>Formulaire</p><form id="myForm"><label for="store">Marchand : </label><input type="textbox" id="store" disabled="true"/></br><label for="name">Nom du produit : </label><input type="textbox" id="name" disabled="true"/></br><label for="price">Prix du produit : </label><input type="textbox" id="price" disabled="true"/></form></div>');

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
		{text: "Submit", click: function() {}},
	
		// bouton cancel, mettre destroy au lieu de close pour supprimer completement la dialog box
		{text: "Cancel", click: function() {
		$(this).dialog('destroy');
		}},
		
		/*
		// bouton ajouter le marchand
		{text: "Ajouter le marchand", click: function() {
			var content = localStorage["regStore"];
			//alert(content);
			$('#store').attr('value',content);
	
			//$('#store').attr('value',content);
			//var textbox = document.getElementById('store');
			//textbox.value = content;
		}},
	
		// bouton ajouter le nom
		{text: "Ajouter le nom", click: function() {
			var content = localStorage["regName"];
			var textbox = document.getElementById('name');
			textbox.value = content;
		}},
	
		// bouton ajouter le prix
		{text: "Ajouter le prix", click: function() {
			var content = localStorage["regPrice"];
			var textbox = document.getElementById('price');
			textbox.value = content;
		}}
	*/
	]
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


