var data = require("sdk/self").data;
 
// Create a panel whose content is defined in "text-entry.html".
// Attach a content script called "get-text.js".
var text_entry = require("sdk/panel").Panel({
  width: 212,
  height: 200,
  contentURL: data.url("popup.html"),
  contentScriptFile: data.url("recup.js")
  
});

text_entry.on("show", function() {
  text_entry.port.emit("show");
});

text_entry.port.on("text-entered", function (fprice) {
  console.log(fprice);
  
});


var pageMod = require("sdk/page-mod");
pageMod.PageMod({
  include: "*",
  contentScriptFile: data.url("recup.js"),
  contentScriptWhen: 'end'
});
 

// Create a widget, and attach the panel to it, so the panel is
// shown when the user clicks the widget.
require("sdk/widget").Widget({
  label: "Text entry",
  id: "text-entry",
  contentURL: "http://www.mozilla.org/favicon.ico",
  panel: text_entry
});