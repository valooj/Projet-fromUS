chrome.runtime.onInstalled.addListener(function(details) {
	// au premier lancement de l'extension, on ouvre la page fromus
	if(details.reason == 'install'){
        chrome.tabs.create({url: "http://www.from-us.com/fromus/"});
    }

    // quand une mise à jour est installée, on affiche une notification
    if(details.reason == 'update' && details.previousVersion != chrome.app.getDetails().version){
    	var notification = window.webkitNotifications.createNotification(
	    'img/logo_small.png',                       					// The image.
	    'From-US.com', 													// The title.
	    'From-US.com : extension v'+ chrome.app.getDetails().version 	// The body.
	  	);

		notification.show();
		
		// notification disparait au bout de 5 secondes
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














