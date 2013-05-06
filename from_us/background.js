// Recupere le marchand dans le background 
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        if(request.type == "popup_store"){
            // The type of message has been identified as the variable for our popup, let's save it to localStorage 
            localStorage["popup_store"] = request.regStore;
        }
    }
);


// Recupere le nom dans le background 
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        if(request.type == "popup_name"){
            // The type of message has been identified as the variable for our popup, let's save it to localStorage 
            localStorage["popup_name"] = request.regName;
        }
    }
);







// Recupere le prix dans le background 
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        if(request.type == "popup_price"){
            // The type of message has been identified as the variable for our popup, let's save it to localStorage 
            localStorage["popup_price"] = request.regPrice;
        }
    }
);