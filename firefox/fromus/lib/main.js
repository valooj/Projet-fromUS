var data = require('sdk/self').data;
var tabs = require('sdk/tabs');

var fromus_panel = require('panel').Panel({
	contentURL: data.url('popup.html')
	//contentScriptFile: data.url('popup.js')
});

var tbb = require('toolbarbutton').ToolbarButton({
    id: 'from-us_button',
    label: 'from-us',
    image: data.url('img/on.png'),
    onCommand: function () {
        tabs.activeTab.attach ({
        	contentScriptFile: [
            	data.url('jquery/jquery.min.js'),
        		data.url('jquery/jquery-ui.js'),
        		data.url('popup.js')
            
            
            
          ],
            contentScriptWhen: 'end'
		});

    },
    panel: fromus_panel
    
});



if (require('self').loadReason == 'install') {
  tbb.moveTo({
    toolbarID: 'nav-bar',
    forceMove: false // only move from palette
  });
}