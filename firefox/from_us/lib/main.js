var data = require('self').data;
var tabs = require('tabs');
var pageMod = require('page-mod');
var ss = require('sdk/simple-storage');
console.log('debut pageMod');

/*if (!ss.storage.pages)
  ss.storage.pages = [];
*/

/*pageMod.PageMod({
  	include: '*',
  attachTo: ['existing', 'top'],    
  	contentScriptFile: 
  		[
  			data.url('jquery/jquery.min.js'),
        	data.url('jquery/jquery-ui-css-fix.js'),
            data.url('fromus_recuperation.js'),
            data.url('getPrice.js'),
            data.url('getName.js'),
            data.url('locales/en/enLng.js'),
            data.url('locales/fr/frLng.js'),
            data.url('langue.js'),
            data.url('dialog.js')
        ],
    contentStyleFile: data.url('jquery/jquery-ui-css-fix.css'),
    onAttach: function (worker) {
    console.log(ss.storage.pages);
  },
    contentScriptOptions: {
      imgfr: data.url('img/fr.png'),
      imgen: data.url('img/en.png'),
      imgde: data.url('img/de.png'),
      imgadd: data.url('img/bouton_ajouter.png'),
      imgbuy: data.url('img/bouton_commander.png'),
      imglogo: data.url('img/logo.png')
    }
});*/


var tbb = require('toolbarbutton').ToolbarButton({
  id: 'button',
  label: 'us-button',
  image: data.url('img/on.png'),
  onCommand: function () {

    tabs.activeTab.attach ({

        contentScriptFile: [
            data.url('jquery/jquery.min.js'),
            data.url('jquery/jquery-ui.js'),
            data.url('fromus_recuperation.js'),
            data.url('getPrice.js'),
            data.url('getName.js'),
            data.url('locales/en/enLng.js'),
            data.url('locales/fr/frLng.js'),
            data.url('locales/de/deLng.js'),
            data.url('langue.js'),
            data.url('ajoutCSS.js'),
            data.url('dialog.js')
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