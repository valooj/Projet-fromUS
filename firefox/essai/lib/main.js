var self = require('self');
var tabs = require('tabs');



/*var pageMod = require("sdk/page-mod");
 
pageMod.PageMod({
  include: "*",
  contentScriptFile: [self.data.url("jquery/jquery.min.js"),
                      self.data.url("jquery/jquery-ui.js"),
                      self.data.url('box.js')
                      ],
  contentStyleFile: self.data.url('jquery/jquery-ui.css')
});*/

var panel = require("sdk/panel").Panel({
  contentURL: self.data.url("popup.html")
});
 
panel.show();