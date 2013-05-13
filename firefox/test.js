/*var widgets = require("sdk/widget");
var tabs = require("sdk/tabs");
var self = require("sdk/self");
 
var widget = widgets.Widget({
  id: "mozilla-link",
  label: "Mozilla website",
  contentURL: self.data.url("on.png"),
  onClick: function() {
    tabs.open("http://www.mozilla.org/");
  }
});*/

/*
exports.main = function(options) {
      // create toolbarbutton
      var tbb = require("toolbarbutton").ToolbarButton({
        id: "from-us",
        label: "from-us",
        image: "http://sebastiensy.github.io/test/on.png",
        //image: data.url('on.png'),
        onCommand: function () {
           var newDialog = $('<div id="dialogBox"><p>Formulaire</p><form id="myForm"><label for="store">Marchand : </label><input type="textbox" id="store" disabled="true"/></br><label for="name">Nom du produit : </label><input type="textbox" id="name" disabled="true"/></br><label for="price">Prix du produit : </label><input type="textbox" id="price" disabled="true"/></br><label for="category">Catégorie:</label><select id="category"><option value="default" selected="selected">Choisir une catégorie</option><option value="antique_art">Antiques, Art & Collectibles</option><option value="auto_moto">Auto & Moto</option><option value="bijoux_montres">Bijoux & Montres</option><option value="chaussures">Chaussures</option><option value="entreprises_industries">Entreprises & Industries</option><option value="habits_enfants">Habits pour enfants</option><option value="habits_femmes">Habits pour femmes</option><option value="habits_hommes">Habits pour hommes</option><option value="instrument_musique">Instrument de musique</option><option value="jeux_jouets">Jeux & Jouets</option><option value="jeux_informatique">Jeux vidéos & Informatique</option><option value="livres_films_musiques">Livres, Films & Musiques</option><option value="maison_jardin">Maison & Jardin</option><option value="ordinateurs_bureau">Ordinateurs & Bureau</option><option value="pieces_bricolage_outillage">Pièces, Bricolage & Outillage</option><option value="puericulture">Puericulture</option><option value="sacs_accessoires">Sacs & Accessoires</option><option value="sante_beaute">Santé & Beauté</option><option value="sports_loisirs">Sports & Loisirs</option></select></br><label for="quantite">Quantite : </label><input id="spinner"></form></div>');
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
				
				}
			},
            ]
        });
        newDialog.dialog("open");
        }
      });
      
    
      if (options.loadReason == "install") {
        tbb.moveTo({
          toolbarID: "nav-bar",
          forceMove: false // only move from palette
        });
      }
    };
*/


alert('gello');
var data = require("self").data;
var {Cc, Ci} = require("chrome");
var mediator = Cc['@mozilla.org/appshell/window-mediator;1'].getService(Ci.nsIWindowMediator);

exports.main = function(options, callbacks) {
    addToolbarButton();
    // other stuff
};

function addToolbarButton() {
    var document = mediator.getMostRecentWindow("navigator:browser").document;      
    var navBar = document.getElementById("nav-bar");
    if (!navBar) {
        return;
    }
    var btn = document.createElement("toolbarbutton");  

    btn.setAttribute('type', 'button');
    btn.setAttribute('class', 'toolbarbutton-1');
    btn.setAttribute('image', data.url('on.png')); // path is relative to data folder
    btn.setAttribute('orient', 'horizontal');
    btn.setAttribute('label', 'My App');
    btn.addEventListener('click', function() {
        // use tabs.activeTab.attach() to execute scripts in the context of the browser tab
        //console.log('clicked');
        alert("hello");
    }, false)
    navBar.appendChild(btn);
}
