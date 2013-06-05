var data = require('sdk/self').data;
var tabs = require('sdk/tabs');


var pageMod = require("sdk/page-mod").PageMod({
  include: "*",
  contentScriptFile: [
    data.url('fromus_recuperation.js')
    ],
  contentScriptWhen : "end",
  attachTo: ["existing", "top"],
  onAttach: function(worker) {
    /*fromus_panel.port.on('panel-message', function(data) {
            // we emit the same message through to the page-mod
            worker.port.emit('panel-message', data);
        });*/
    
  }
});




var fromus_panel = require('panel').Panel({
	width: 200,
	height: 500,
	//focus: false,
	contentURL: data.url('popup.html'),
	contentScriptFile: [
            	data.url('jquery/jquery.min.js'),
        		data.url('locales/en/enLng.js'),
        		data.url('locales/fr/frLng.js'),
        		data.url('langue.js'),
        		data.url('popup.js')
        		],
    contentScriptWhen : "ready"
    
});

pageMod.port.on("recuperation-to-panel",function(fromus){
    fromus_panel.port.emit("recuperation-to-panel",fromus);
});



var tbb = require('toolbarbutton').ToolbarButton({
    id: 'from-us_button',
    label: 'from-us',
    image: data.url('img/on.png'),
    onCommand: function () {
        tabs.activeTab.attach ({
          /*contentScriptFile: [
            data.url('jquery/jquery.min.js'),
            data.url('locales/en/enLng.js'),
            data.url('locales/fr/frLng.js'),
            data.url('langue.js'),
            data.url('fromus_recuperation.js'),
            data.url('popup.js')
            
            
            
          ],
            contentScriptWhen: 'end'*/
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






/*var alertContentScript = "self.port.on('alert', function(message) {" +
                         "  window.alert(message);" +
                         "})";
 
tabs.on("ready", function(tab) {
  worker = tab.attach({
    contentScript: alertContentScript
  });
  worker.port.emit("alert", "Message from the add-on");
});
 
tabs.open("http://www.mozilla.org");*/