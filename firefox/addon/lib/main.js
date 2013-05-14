var data = require("self").data;
var tabs = require("tabs");
var pageMod = require("sdk/page-mod");

/*exports.main = function(options) {
    var btn = require("toolbarbutton").ToolbarButton({
        id: 'from-us_button',
        label: 'from-us.com',
        image: data.url('img/on.png'),
        onCommand: function() {            
              if (typeof(tabs.activeTab._worker) == 'undefined') {
                let worker = tabs.activeTab.attach({
                    // contentScript: 'self.port.on("sayhello", function() { alert("Hello world!"); })'
                                        
                                      
                });
                tabs.activeTab._worker = worker;
            }
            tabs.activeTab._worker.port.emit("sayhello");
        }
    });

    if (options.loadReason === "install") {
    btn.moveTo({
      toolbarID: "nav-bar",
      //insertbefore: "home-button",
      forceMove: false // only move from palette
    });
  }
};*/

pageMod.PageMod({
  include: "*.org",
  contentScriptFile: self.data.url("script.js")
});