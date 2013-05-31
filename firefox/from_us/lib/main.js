var self = require('sdk/self');

var panel = require("sdk/panel").Panel({
  contentURL: self.data.url('dialog.html'),
   contentScriptFile: [
        self.data.url('jquery/jquery.min.js'),
        self.data.url('jquery/jquery-ui.js'),
        self.data.url('fromus_recuperation.js'),
        self.data.url('dialog_panel.js')
    ]
  /*onHide: function () {
    panel.contentURL = "about:blank";
  }*/
});
 
require("sdk/widget").Widget({
  id: "bing",
  label: "Bing",
  contentURL: "http://www.bing.com/favicon.ico",
  panel: panel,
  onClick: function() {
    panel.contentURL = "http://m.bing.com/";
  }
});
 
require("sdk/widget").Widget({
  id: "google",
  label: "Google",
  contentURL: "http://www.google.com/favicon.ico",
  panel: panel,
  onClick: function() {
    panel.contentURL = "http://www.google.com/xhtml";
  }
});

var tbb = require('toolbarbutton').ToolbarButton({
      id: 'from-us_button',
      label: 'from-us',
      image: self.data.url('img/on.png'),
      panel: panel
        
    });