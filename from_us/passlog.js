var _urlLog = 'https://localhost/projetFU/Communication/cible3.php?action=MAJ-log';

function check() {
	alert( "login");
	$.post(_urlLog, logJSON, function(datas) {
		alert(datas);
	});
	$.post({
		url: _urlLog,
		datas: logJSON,
		success: function(datas) {
			alert(datas);
		},
		error: function(datas) {
			alert(datas);
		}
	});
	
	alert("fin log");
}

$(document).ready(function() {

// creation de la dialog box
var newDialog = $('<div id="dialogBox"><p>      Identification </p><form id="myForm"></br></br><label for="login">  Login : </label><input type="text" id="login" /></br></br><label for="password">  Password : </label><input type="text" id="password" /></br></form></div>');

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
				title: "Permet de se connecter", 
				click: function() {
					var login = document.getElementById("login");
					var password = document.getElementById("password");
					var log = login.value;
					var pass = password.value;
					if (log && pass)
						var jsonLog = {login: log ,password: pass};
						var postLog = JSON.stringify(jsonLog);
						logJSON = {log:postLog};
						check();
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
		]
	});

	// ouverture de la dialog box
	newDialog.dialog("open");

}
});

