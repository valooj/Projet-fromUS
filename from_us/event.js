
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
		chrome.tabs.insertCSS(null,{file:'jquery/jquery-ui.css',allFrames:false,runAt:'document_end'})
		chrome.tabs.executeScript(null,{file:'/clixml/fromus_recuperation.js',allFrames:false,runAt:'document_end'});
		//chrome.tabs.executeScript(null,{file:'fromus_favelet_comments.js',allFrames:false,runAt:'document_end'});
		chrome.tabs.executeScript(null,{file:'dialog.js',allFrames:false,runAt:'document_end'});
		//chrome.tabs.executeScript(null,{file:'fromus_onglets.js',allFrames:false});
		//chrome.tabs.executeScript(null,{file:'passlog.js',allFrames:false});
	});












