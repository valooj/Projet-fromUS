var xhr = null;
     
function getXMLHttpRequest() {
    if (window.XMLHttpRequest || window.ActiveXObject) {
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } else {
            xhr = new XMLHttpRequest(); 

        }
    } else {
        alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
        return null;
    }
    return xhr;
};

function request() {
    xhr = getXMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            alert(xhr.responseText);
        }
    };
    
    var var_store = encodeURIComponent(localStorage["regStore"]);
    var var_name = encodeURIComponent(localStorage["regName"]);
    var var_price = encodeURIComponent(localStorage["regPrice"]);


 	var data ="Store="+var_store+"&Name="+var_name+"&Price="+var_price;

	xhr.open("GET", "http://localhost/projetFU/Communication/cible.php?"+data, true);

 	xhr.send(null);
 	alert("fin send");

};

$(document).ready(function() {

console.log( "Variable from Content Script: "+localStorage["regStore"] );
console.log( "Variable from Content Script: "+localStorage["regName"] );
console.log( "Variable from Content Script: "+localStorage["regPrice"] );


// creation de la dialog box
var newDialog = $('<div id="dialogBox"><p>Formulaire</p><form id="myForm"><label for="store">Marchand : </label><input type="textbox" id="store" disabled="true"/></br><label for="name">Nom du produit : </label><input type="textbox" id="name" disabled="true"/></br><label for="price">Prix du produit : </label><input type="textbox" id="price" disabled="true"/></br><label for="quantite">Quantite : </label><input id="spinner"></form></div>');

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
			{text: "Submit", click: function() {
				request();
			}},
	
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


