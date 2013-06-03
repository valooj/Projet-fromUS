
// au premier lancement de l'extension, on ouvre la page fromus
chrome.runtime.onInstalled.addListener(function(details) {
	if(details.reason == "install"){
        chrome.tabs.create({url: "http://www.from-us.com/fromus/"});
    }
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



chrome[runtimeOrExtension].onMessage.addListener(
		  function(request, sender, sendResponse) {
		    if(request.type == "popup_store"){
		    	localStorage["popup_store"]=request.regStore;
		    }
		  }
);











