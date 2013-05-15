// Import the page-mod API
var pageMod = require('sdk/page-mod');
// Import the self API
var self = require('sdk/self');
var tabs = require('tabs');

var tbb = require('toolbarbutton').ToolbarButton({
      id: 'from-us_button',
      label: 'from-us',
      image: self.data.url('img/on.png'),
      onCommand: function () {
        //tbb.destroy(); 
        tabs.activeTab.attach ({
        	/*contentScript:
        		'var fromus_offre = document.location.href;' +
        		'window.alert(fromus_offre);'*/
        	contentStyleFile: self.data.url('jquery/style.css'),
        	contentScriptFile: [self.data.url('jquery/jquery.min.js'),
        						self.data.url('jquery/jquery-ui.js'),
                      			self.data.url('fromus_favelet_comments.js'),
                      			self.data.url('dialog.js')],
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