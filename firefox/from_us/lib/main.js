var self = require('sdk/self');
var tabs = require('sdk/tabs');
var pageMod = require('sdk/page-mod');
console.log('debut pageMod');

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
            self.data.url('ajoutCSS.js'),
            self.data.url('dialog4.js')
      ],
      contentScriptOptions: {
      imgfr: self.data.url('img/fr.png'),
      imgen: self.data.url('img/en.png'),
      imgde: self.data.url('img/de.png'),
      imgadd: self.data.url('img/bouton_ajouter.png'),
      imgbuy: self.data.url('img/bouton_commander.png'),
      imgplugin: self.data.url('img/plugin_vide.png'),
      imglogo: self.data.url('img/logo.png'),
      imglogotop: self.data.url('img/logo_small.png')
    }
   });
    
  
  /*pageMod.PageMod({
    include: tabs.activeTab.url,
    attachTo: ["existing", "top"],
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
            self.data.url('dialog4.js')
    ],
    contentStyleFile: self.data.url('jquery/jquery-ui-final.css'),
    contentStyle: ["a#tabBuy { background-image: url(" + self.data.url("img/bouton_commander.png") + ") !important}" +
                  "a#tabAdd { background-image: url(" + self.data.url('img/bouton_ajouter.png') + ") !important}" +
                  "#fromus_tabs { background-image: url(" + self.data.url('img/plugin_vide.png') + ") !important}" +
                  "#fromus_dialogBox { background-image: url(" + self.data.url('img/plugin_vide.png') + ") !important}" + 
                  ".ui-toto-widget-content { background: white url(" + self.data.url('jquery/images/ui-toto-bg_flat_75_ffffff_40x100.png') + ") 50% 50% repeat-x !important}" +
                  ".ui-toto-widget-header .ui-toto-state-highlight { background: #fbf9ee url(" + self.data.url('jquery/images/ui-toto-bg_glass_55_fbf9ee_1x400.png') + ") 50% 50% repeat-x !important}" +
                  ".ui-toto-widget-header .ui-toto-state-error { background: #fef1ec url(" + self.data.url('jquery/images/ui-toto-bg_glass_95_fef1ec_1x400.png') + ") 50% 50% repeat-x !important}" +
                  ".ui-toto-widget-content .ui-toto-icon { background-image: url(" + self.data.url('jquery/images/ui-toto-icons_cd0a0a_256x240.png') + ") !important}" +
                  ".ui-toto-widget-header .ui-toto-icon { background-image: url(" + self.data.url('jquery/images/ui-toto-icons_cd0a0a_256x240.png') + ") !important}" +
                  ".ui-toto-state-default .ui-toto-icon { background-image: url(" + self.data.url('jquery/images/ui-toto-icons_cd0a0a_256x240.png') + ") !important}" +
                  ".ui-toto-state-focus .ui-toto-icon { background-image: url(" + self.data.url('jquery/images/ui-toto-icons_cd0a0a_256x240.png') + ") !important}" +
                  ".ui-toto-state-active .ui-toto-icon { background-image: url(" + self.data.url('jquery/images/ui-toto-icons_cd0a0a_256x240.png') + ") !important}" +
                  ".ui-toto-state-highlight .ui-toto-icon { background-image: url(" + self.data.url('jquery/images/ui-toto-icons_cd0a0a_256x240.png') + ") !important}" +
                  ".ui-toto-state-error-text .ui-toto-icon { background-image: url(" + self.data.url('jquery/images/ui-toto-icons_cd0a0a_256x240.png') + ") !important}" +
                  ".ui-toto-widget-overlay { background: #aaaaaa url(" + self.data.url('jquery/images/ui-toto-bg_flat_0_aaaaaa_40x100.png') + ") 50% 50% repeat-x !important}" +
                  ".ui-toto-widget-shadow { background: #aaaaaa url(" + self.data.url('jquery/images/ui-toto-bg_flat_0_aaaaaa_40x100.png') + ") 50% 50% repeat-x !important}" ],
    contentScriptOptions: {
      imgfr: self.data.url('img/fr.png'),
      imgen: self.data.url('img/en.png'),
      imgde: self.data.url('img/de.png'),
      imgadd: self.data.url('img/bouton_ajouter.png'),
      imgbuy: self.data.url('img/bouton_commander.png'),
      imgplugin: self.data.url('img/plugin_vide.png'),
      imglogo: self.data.url('img/logo.png'),
      imglogotop: self.data.url('img/logo_small.png')
    }
  });*/

  }
 
});

if (require('sdk/self').loadReason == 'install') {
  tbb.moveTo({
    toolbarID: 'nav-bar',
    forceMove: false // only move from palette
  });
}
