// import the modules we need
var data = require('self').data;
var {Cc, Ci} = require('chrome');
var mediator = Cc['@mozilla.org/appshell/window-mediator;1'].getService(Ci.nsIWindowMediator);
var tabs = require('tabs');
var self = require('self');

function pmclick(){
	var pageMod = require("sdk/page-mod").PageMod({
		  include: "http://*",
		  contentStyleFile: data.url("jquery/jquery-ui.css"),
		  contentScriptFile: [
		            data.url('jquery/jquery.min.js'),
		        	data.url('jquery/jquery-ui.js'),
		            data.url('fromus_recuperation.js'),
		            data.url('dialog_css.js')
		            ],
		  contentScriptWhen: 'end',
		  
		});
	}
 
// exports.main is called when extension is installed or re-enabled
exports.main = function(options, callbacks) {
	addToolbarButton();
	
	// do other stuff
};
 
// exports.onUnload is called when Firefox starts and when the extension is disabled or uninstalled
exports.onUnload = function(reason) {
	removeToolbarButton();
	// do other stuff
};
 
// add our button
function addToolbarButton() {
	// this document is an XUL document
	var document = mediator.getMostRecentWindow('navigator:browser').document;		
	var navBar = document.getElementById('nav-bar');
	if (!navBar) {
		return;
	}
	var btn = document.createElement('toolbarbutton');	
	btn.setAttribute('id', 'mybutton-id');
	btn.setAttribute('type', 'button');
	// the toolbarbutton-1 class makes it look like a traditional button
	btn.setAttribute('class', 'toolbarbutton-1');
	// the data.url is relative to the data folder
	btn.setAttribute('image', data.url('img/on.png'));
	btn.setAttribute('orient', 'horizontal');
	// this text will be shown when the toolbar is set to text or text and iconss
	btn.setAttribute('label', 'My Button');
	btn.addEventListener('click', function() {
		// do stuff, for example with tabs or pageMod
		console.log('test');
		pmclick();
		

		
	}, false)
	navBar.appendChild(btn);
}
 
function removeToolbarButton() {
	// this document is an XUL document
	var document = mediator.getMostRecentWindow('navigator:browser').document;		
	var navBar = document.getElementById('nav-bar');
	var btn = document.getElementById('mybutton-id');
	if (navBar && btn) {
		navBar.removeChild(btn);
	}
}