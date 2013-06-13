var data = require('self').data;
var tabs = require('tabs');
var pageMod = require('page-mod');
var ss = require('sdk/simple-storage');
console.log('debut pageMod');

if (ss.storage.name) {
  console.log (ss.storage.name);
}
else {
  console.log ("Storing!");
  ss.storage.name = "ryan";
}

var prefSet = require("simple-prefs");
var token_fus = prefSet.prefs.tokenFU;


token_fus = 'token';


/*pageMod.PageMod({
  	include: '*',
  attachTo: ['existing', 'top'],    
  	contentScriptFile: 
  		[
  			data.url('jquery/jquery.min.js'),
        	data.url('jquery/jquery-ui.js'),
            data.url('fromus_recuperation.js'),
            data.url('getPrice.js'),
            data.url('getName.js'),
            data.url('getDesc.js'),
            data.url('getImg.js'),
            data.url('locales/en/enLng.js'),
            data.url('locales/fr/frLng.js'),
            data.url('locales/de/deLng.js'),
            data.url('langue.js'),
            data.url('ajoutCSS.js'),
            data.url('dialog3.js')
        ],
    //contentStyleFile: data.url('jquery/jquery-ui-css-fix.css'),
    contentScriptOptions: {
      imgfr: data.url('img/fr.png'),
      imgen: data.url('img/en.png'),
      imgde: data.url('img/de.png'),
      imgadd: data.url('img/bouton_ajouter.png'),
      imgbuy: data.url('img/bouton_commander.png'),
      imgplugin: data.url('img/plugin_vide.png'),
      imglogo: data.url('img/logo.png')
    },
    onAttach: function(worker) {
    
    worker.port.emit('main-to-content', token_fus);
  }
});*/


var tbb = require('toolbarbutton').ToolbarButton({
  id: 'fromus_button',
  label: 'from_us',
  image: data.url('img/on.png'),
  onCommand: function () {

    var worker = tabs.activeTab.attach ({

        contentScriptFile: [
            data.url('jquery/jquery.min.js'),
            data.url('jquery/jquery-ui.js'),
            data.url('fromus_recuperation.js'),
            data.url('getPrice.js'),
            data.url('getName.js'),
            data.url('getDesc.js'),
            data.url('getImg.js'),
            data.url('locales/en/enLng.js'),
            data.url('locales/fr/frLng.js'),
            data.url('locales/de/deLng.js'),
            data.url('langue.js'),
            data.url('ajoutCSS.js'),
            data.url('dialog3.js')
      ],
      contentScriptOptions: {
      imgfr: data.url('img/fr.png'),
      imgen: data.url('img/en.png'),
      imgde: data.url('img/de.png'),
      imgadd: data.url('img/bouton_ajouter.png'),
      imgbuy: data.url('img/bouton_commander.png'),
      imgplugin: data.url('img/plugin_vide.png'),
      imglogo: data.url('img/logo.png')
    }
   });
    worker.port.emit('main-to-content', token_fus);

  }
  
  
  
  
});


