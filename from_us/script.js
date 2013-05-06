
//console.log( "Variable from Content Script: "+localStorage["popup_price"] );
console.log( "Variable from Content Script: "+localStorage["popup_store"] );
console.log( "Variable from Content Script: "+localStorage["popup_name"] );
/*var testbox = document.getElementById('name');
testbox.disabled = false;
console.log(testbox.disabled);*/


/* Bouton ajouter le marchand */
var bstore = document.getElementById('addstore');
bstore.addEventListener('click', function(e) {
	 
	var content = localStorage["popup_store"];
	var textbox = document.getElementById('store');
	textbox.value = content;
	
}, false);


/* Bouton ajouter le nom */
var bname = document.getElementById('addname');
bname.addEventListener('click', function(e) {
	 
	var content = localStorage["popup_name"];
	var textbox = document.getElementById('name');
	textbox.value = content;
	
}, false);



/* Boutton ajouter le prix */
var bprice = document.getElementById('addprice');
bprice.addEventListener('click', function(e) {
	 
	var content = localStorage["popup_price"];
	var textbox = document.getElementById('price');
	textbox.value = content;
	
}, false);




/*
*	marche pas pour check checkbox => enable textbox
*/

/*// Checkbox activer le nom
var chname = document.getElementById('checkname');
if (chname.checked = true) {
chname.addEventListener('click', function(e) {

	var content = false;
	var textbox = document.getElementById('name');
	textbox.disabled = content;
	
}, false);}

// Checkbox desactiver le nom
//var acname = document.getElementById('checkname');
else if (chname.checked = false) {
chname.addEventListener('click', function(e) {
	 
	var content = true; 
	var textbox = document.getElementById('name');
	textbox.disabled = content;
	
}, false);}*/

/*// Checkbox activer le nom
var chname = document.getElementById('checkname');
if (chname.getAttribute("checked")) {
var textbox = document.getElementById('name');
textbox.disabled = true;
console.log(textbox.disabled);
}
else {
var textbox = document.getElementById('name');
textbox.disabled = false;
console.log(textbox.disabled);
}*/

/*
var chname = document.getElementById('checkname');
var content = false;
if (chname.getAttribute("checked")) {
chrome.runtime.sendMessage({
    type: "popup_check", 
	disable: content  
    
});
chname.addEventListener('click', function(e) {
	 
	var content = localStorage["popup_check"];
	var textbox = document.getElementById('name');
	textbox.disabled = content;
	
}, false);}*/


/*var btonoff = document.getElementById('btonoff');
if (btonoff.value = 'desactiver') {
btonoff.addEventListener('click', function(e) {
	 
	chrome.browserAction.setIcon({path:"off.png"});
	btonoff.value = 'activer';
	
}, false);
}*/

/*if (btonoff.value = 'activer') {
btonoff.addEventListener('click', function(e) {
	 
	chrome.browserAction.setIcon({path:"on.png"});
	btonoff.value = 'desactiver';
	
}, false);
}*/


/*
var myForm = document.getElementById('myForm');
   
myForm.addEventListener('submit', function(e) {		
	  alert('TEST. Vous avez envoye le formulaire ');
	  //e.preventDefault();								//en commentaire car je ne sais pas à quoi ça sert
}, true);



  
//addEventListener('nom_de_l'evenement', la fonction à executer, un booleen
//pour dire si c'est phase capture ou bouillonnement. En général c'est false  
//true = capture ; false = bouillonement ; pour l'instant je laisse true
  
myForm.addEventListener('reset', function(e) {
	  var inputs = document.getElementsByTagName('input');
	  var inputsLength = inputs.length;
	  alert('Vous avez reinitialise le formulaire !');
	  for (var i = 0 ; i < inputsLength ; i++) {
		if (inputs[i].type == 'text') {
            inputs[i].className = '';
        } 
	  }
   }, true);			
*/										
