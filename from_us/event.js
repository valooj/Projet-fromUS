
// au premier lancement de l'extension, on ouvre la page fromus
chrome.runtime.onInstalled.addListener(function(details) {
	if(details.reason == 'install'){
        chrome.tabs.create({url: "http://www.from-us.com/fromus/"});
    }
    if(details.reason == 'update' && details.previousVersion != chrome.app.getDetails().version){
    	var notification = window.webkitNotifications.createNotification(
	    'img/logo_small.png',                      // The image.
	    'From-US.com', // The title.
	    'From-US.com : extension v'+ chrome.app.getDetails().version     // The body.
	  	);

		notification.show();
		setTimeout(function(){
		notification.cancel();
		},5000);
	}
});




// quand on clique sur l'extension, execution des scripts 
chrome.browserAction.onClicked.addListener(function(tab) {
		chrome.tabs.executeScript(null,{file:'jquery/jquery.min.js',allFrames:false,runAt:'document_end'});
		chrome.tabs.executeScript(null,{file:'jquery/jquery-ui.js',allFrames:false,runAt:'document_end'});
		chrome.tabs.insertCSS(null,{file:'jquery/jquery-ui.css',allFrames:false,runAt:'document_end'});
		chrome.tabs.executeScript(null,{file:'/clixml/fromus_recuperation.js',allFrames:false,runAt:'document_end'});

		chrome.tabs.executeScript(null,{file:'/clixml/getPrice.js',allFrames:false,runAt:'document_end'});
		chrome.tabs.executeScript(null,{file:'/clixml/getName.js',allFrames:false,runAt:'document_end'});
		chrome.tabs.executeScript(null,{file:'/clixml/getDesc.js',allFrames:false,runAt:'document_end'});
		chrome.tabs.executeScript(null,{file:'/clixml/getImg.js',allFrames:false,runAt:'document_end'});

		chrome.tabs.executeScript(null,{file:'locales/en/enLng.js',allFrames:false,runAt:'document_end'});
		chrome.tabs.executeScript(null,{file:'locales/fr/frLng.js',allFrames:false,runAt:'document_end'});
		chrome.tabs.executeScript(null,{file:'locales/de/deLng.js',allFrames:false,runAt:'document_end'});
		chrome.tabs.executeScript(null,{file:'langue.js',allFrames:false,runAt:'document_end'});
		chrome.tabs.executeScript(null,{file:'dialog.js',allFrames:false,runAt:'document_end'});
	});



var runtimeOrExtension = chrome.runtime && chrome.runtime.sendMessage ?
'runtime' : 'extension';

chrome[runtimeOrExtension].onMessage.addListener(
		  function(request, sender, sendResponse) {
		    console.log(sender.tab ?
		                "from a content script:" + sender.tab.url :
		                "from the extension");
		    if (request.greeting == "hello") {
		      	sendResponse({farewell: "goodbyeevent"});
		  		chrome.tabs.executeScript(null,{file:'/clixml/fromus_recuperation.js',allFrames:false,runAt:'document_end'});
			}
		  }
);

chrome[runtimeOrExtension].onMessage.addListener(
		  function(request, sender, sendResponse) {
		    console.log(sender.tab ?
		                "from a content script:" + sender.tab.url :
		                "from the extension");
		    if (request.greeting == "youhou") {
		      	sendResponse({farewell: "hello"});
		  		chrome.tabs.executeScript(null,{file:'/clixml/fromus_recuperation.js',allFrames:false,runAt:'document_end'});
			}
		  }
);













