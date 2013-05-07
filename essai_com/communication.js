function getXMLHttpRequest() {
    var xhr = null;
     
    if (window.XMLHttpRequest || window.ActiveXObject) {
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } else {
            xhr = new XMLHttpRequest(); 
        }
    } else {
        alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
        return null;
    }
     
    return xhr;
}

var name = encodeURIComponent("Valériane");
var pseudo = encodeURIComponent("valooj");
var xhr = getXMLHttpRequest();

xhr.onreadstatechange = function(){
    if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
        alert("OK");
    }
};

xhr.open("POST", "cible.php", true);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.send("name = " + name + "pseudo = " + pseudo);
