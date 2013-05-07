
// quand on clique sur l'extension, execution des scripts price.js et dialog.js
chrome.browserAction.onClicked.addListener(function(tab) {
		//chrome.tabs.executeScript(null,{file:'jquery/jquery.min.js',allFrames:false});
		//chrome.tabs.executeScript(null,{file:'jquery/jquery-ui.js',allFrames:false});
        chrome.tabs.executeScript(null,{file:'fromus_favelet_comments.js',allFrames:false});
		chrome.tabs.executeScript(null,{file:'dialog.js',allFrames:false});
		
	});









