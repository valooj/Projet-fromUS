var self = require('sdk/self');
var tabs = require('sdk/tabs');


var tbb = require('toolbarbutton').ToolbarButton({
  id: 'fromus_button',
  label: 'From-US.com',
  image: self.data.url('img/on.png'),
  onCommand: function () {

    let worker = tabs.activeTab.attach ({

        contentScriptFile: [
            self.data.url('jquery/jquery.min.js'),
            self.data.url('jquery/jquery-ui.js'),
            self.data.url('clixml/fromus_recuperation.js'),
            self.data.url('clixml/getPrice.js'),
            self.data.url('clixml/getName.js'),
            self.data.url('clixml/getDesc.js'),
            self.data.url('clixml/getImg.js'),
            self.data.url('locales/en/enLng.js'),
            self.data.url('locales/fr/frLng.js'),
            self.data.url('locales/de/deLng.js'),
            self.data.url('langue.js'),
            self.data.url('jquery/ajoutCSS.js'),
            self.data.url('dialog.js')
      ],
      contentScriptOptions: {
      imgfr: self.data.url('img/fr.png'),
      imgen: self.data.url('img/en.png'),
      imgde: self.data.url('img/de.png'),
      imgadd: self.data.url('img/bouton_ajouter.png'),
      imgbuy: self.data.url('img/bouton_commander.png'),
      imgplugin: self.data.url('img/plugin_vide.png'),
      imglogo: self.data.url('img/logo.png'),
      imglogotop: self.data.url('img/logo_small.png'),
      imgbgflat: self.data.url('jquery/images/ui-toto-bg_flat_75_ffffff_40x100.png'),
      imgicons: self.data.url('jquery/images/ui-toto-icons_cd0a0a_256x240.png')
    }
   });
  }
 
});


// à la première installation on ouvre la page from-us
exports.main = function (options, callbacks) {
  if (options.loadReason === 'install'){
    tbb.moveTo({
      toolbarID: 'nav-bar',
      forceMove: false // only move from palette
    });
    tabs.open("http://www.from-us.com/fromus/");
  }
};

