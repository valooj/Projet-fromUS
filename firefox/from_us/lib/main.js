var data = require('self').data;
var self = require('self');
var tabs = require('tabs');
var pageMod = require('page-mod');
console.log('debut pageMod');

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
  label: 'From-US.com',
  image: data.url('img/on.png'),
  onCommand: function () {

    /*let worker = tabs.activeTab.attach ({

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
      imglogo: data.url('img/logo.png'),
      imglogotop: data.url('img/logo_small.png')
    }
   });*/
    
  
  pageMod.PageMod({
    include: tabs.activeTab.url,
    attachTo: ["existing", "top"],
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
            data.url('dialog3.js')
    ],
    contentStyleFile: data.url('jquery/jquery-ui-final.css'),
    contentStyle: ["a#tabBuy { background-image: url(" + data.url("img/bouton_commander.png") + ")}" +
                  "a#tabAdd { background-image: url(" + data.url('img/bouton_ajouter.png') + ")}"],
    contentScriptOptions: {
      imgfr: data.url('img/fr.png'),
      imgen: data.url('img/en.png'),
      imgde: data.url('img/de.png'),
      imgadd: data.url('img/bouton_ajouter.png'),
      imgbuy: data.url('img/bouton_commander.png'),
      imgplugin: data.url('img/plugin_vide.png'),
      imglogo: data.url('img/logo.png'),
      imglogotop: data.url('img/logo_small.png')
    }
  });

  }
 
});


