// Import the page-mod API
var pageMod = require("sdk/page-mod");
// Import the self API
var self = require("sdk/self");

// worker = tab.attach(script.js);
// worker.on("message",handleMessage);
 
// Create a page mod
// It will run a script whenever a ".org" URL is loaded
// The script replaces the page contents with a message
pageMod.PageMod({
  include: "http://*",
  contentScriptFile: [self.data.url("jquery.min.js"),
                      self.data.url("fromus_favelet_comments.js")],
  contentScriptWhen: "end"
});

// handleMessage(message);
// request.post(message);