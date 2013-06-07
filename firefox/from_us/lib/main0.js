// Import the page-mod API
var pageMod = require('sdk/page-mod');
// Import the self API
var self = require('sdk/self');
var tabs = require('tabs');
var _ = require("sdk/l10n").get;
var pageMod = require('page-mod');

pageMod.PageMod({
    include: "*",
    contentScriptFile: 
      [
            self.data.url('locales/en/enLng.js'),
            self.data.url('locales/fr/frLng.js'),
            self.data.url('langue.js')
            
        ]
    
});


var tbb = require('toolbarbutton').ToolbarButton({
      id: 'from-us_button',
      label: 'from-us',
      image: self.data.url('img/on.png'),
      onCommand: function () {
        //tbb.destroy(); 
        tabs.activeTab.attach ({
        	
        	contentScriptFile: [
            self.data.url('jquery/jquery.min.js'),
        		self.data.url('jquery/jquery-ui.js'),
            self.data.url('fromus_recuperation.js'),
            self.data.url('locales/en/enLng.js'),
            self.data.url('locales/fr/frLng.js'),
            self.data.url('langue.js'),
            self.data.url('dialog.js')
          ],
          //contentStyleFile: self.data.url('jquery/style.css'),
          //contentStyleFile: self.data.url('jquery/jquery-ui.css'),
          //contentScript: 'var divs = document.getElementsByTagName("div");' +
        //'for (var i = 0; i < divs.length; ++i) {' +
          //'divs[i].setAttribute("style", "border: solid red 1px;");' +
        //'}',
       //contentScript: 'var form = document.getElementById("fromusForm").getElementsByTagName("label");' +
       //    'form.setAttribute("style", "float: left;text-align: right;width: 200px;");',
       //contentStyleFile: self.data.url('http://sebastiensy.github.io/test/jquery-ui.css'),
       //contentStyle: ["div { padding: 10px; border: 5px solid red}"],
          
          contentScriptWhen: 'end'
		    });

      }
    
});



if (require('self').loadReason == 'install') {
  tbb.moveTo({
    toolbarID: 'nav-bar',
    forceMove: false // only move from palette
  });
}

// worker = tab.attach(script.js);
// worker.on("message",handleMessage);
 
// Create a page mod
// It will run a script whenever a ".org" URL is loaded
// The script replaces the page contents with a message
/*pageMod.PageMod({
  include: 'http://*',
  contentScriptFile: [self.data.url('jquery.min.js'),
                      self.data.url('fromus_favelet_comments.js')],
  contentScriptWhen: 'end'
});*/

// handleMessage(message);
// request.post(message);