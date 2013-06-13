var data = require('self').data;
var tabs = require('tabs');
var pageMod = require('page-mod');
var ss = require('sdk/simple-storage');
console.log('debut pageMod');

/*var { startServerAsync } = require("sdk/test/httpd");
var srv = startServerAsync(80, '/localhost/projetFU/Communication/cible3.php?');
require("sdk/system/unload").when(function cleanup() {
  srv.stop(function() { // you should continue execution from this point.
  })
});*/


if (ss.storage.name) {
  console.log (ss.storage.name);
}
else {
  console.log ("Storing!");
  ss.storage.name = "ryan";
}

/*if (!ss.storage.pages)
  ss.storage.pages = [];
*/

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
            data.url('dialog2.js')
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
    }
});*/


var tbb = require('toolbarbutton').ToolbarButton({
  id: 'fromus_button',
  label: 'from_us',
  image: data.url('img/on.png'),
  onCommand: function () {

    tabs.activeTab.attach ({

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
  }
  
});
