
// au premier lancement de l'extension, on ouvre la page fromus
chrome.runtime.onInstalled.addListener(function(details) {
	if(details.reason == "install"){
        chrome.tabs.create({url: "http://www.from-us.com/fromus/"});
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
		//chrome.tabs.executeScript(null,{file:'fromus_favelet_comments.js',allFrames:false,runAt:'document_end'});

		chrome.tabs.executeScript(null,{file:'locales/en/enLng.js',allFrames:false,runAt:'document_end'});
		chrome.tabs.executeScript(null,{file:'locales/fr/frLng.js',allFrames:false,runAt:'document_end'});
		chrome.tabs.executeScript(null,{file:'locales/de/deLng.js',allFrames:false,runAt:'document_end'});
		chrome.tabs.executeScript(null,{file:'langue.js',allFrames:false,runAt:'document_end'});
		chrome.tabs.executeScript(null,{file:'dialog.js',allFrames:false,runAt:'document_end'});

		//chrome.tabs.executeScript(null,{file:'fromus_onglets.js',allFrames:false});
		//chrome.tabs.executeScript(null,{file:'passlog.js',allFrames:false});
	});


/*chrome.tabs.getSelected(null, function(tab) {
  chrome.tabs.sendMessage(tab.id, {greeting: "hello"}, function(response) {
    console.log(response.farewell);

  });
});*/

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
/*
chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "knockknock");
  port.onMessage.addListener(function(msg) {
    if (msg.joke == "Knock knock")
      {port.postMessage({question: "Who's there?"});
  		console.log('who');
  	chrome.tabs.executeScript(null,{file:'/clixml/fromus_recuperation.js',allFrames:false,runAt:'document_end'});}
    else if (msg.answer == "Madame")
      {port.postMessage({question: "Madame who?"});
  		console.log('madame who');}
    else if (msg.answer == "Madame... Bovary")
      {port.postMessage({question: "I don't get it."});
  		console.log('don\'t get it');}
  });
});
*/














