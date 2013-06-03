var data = require('sdk/self').data;
var tabs = require('sdk/tabs');
var _ = require("sdk/l10n").get;
console.log(_("tabAdd"));

var fromus_panel = require('panel').Panel({
	width: 200,
	height: 500,
	//focus: false,
	contentURL: data.url('popup.html'),
	contentScriptFile: [
            	/*data.url('jquery/jquery.min.js'),
        		data.url('jquery/jquery-ui.js'),
        		data.url('popup.js')*/
        		]
});

var tbb = require('toolbarbutton').ToolbarButton({
    id: 'from-us_button',
    label: 'from-us',
    image: data.url('img/on.png'),
    onCommand: function () {
        /*tabs.activeTab.attach ({
        	contentScriptFile: [
            	data.url('jquery/jquery.min.js'),
        		data.url('jquery/jquery-ui.js'),
        		data.url('popup.js')
            
            
            
          ],
            contentScriptWhen: 'end'
		});*/

    },
    panel: fromus_panel
    
});



if (require('self').loadReason == 'install') {
  tbb.moveTo({
    toolbarID: 'nav-bar',
    forceMove: false // only move from palette
  });
}


var alertContentScript = "self.port.on('alert', function(message) {" +
                         "  window.alert(message);" +
                         "})";
 
tabs.on("ready", function(tab) {
  worker = tab.attach({
    contentScript: alertContentScript
  });
  worker.port.emit("alert", "Message from the add-on");
});
 
tabs.open("http://www.mozilla.org");