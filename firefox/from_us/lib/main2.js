var myScript = "window.addEventListener('click', function(event) {" +
               "  var t = event.target;" +
               "  if (t.nodeName == 'A')" +
               "    self.port.emit('click-link', t.toString());" +
               "}, false);"
 
var panel = require("sdk/panel").Panel({
  contentURL: "http://www.bbc.co.uk/mobile/index.html",
  contentScript: myScript
});
 
panel.port.on("click-link", function(url) {
  console.log(url);
});
 
panel.show();