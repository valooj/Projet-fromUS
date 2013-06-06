var defLng= 'fr';
//var _lng= {};

//Pour creer le cookie 
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+";path=/";
}

//Pour lire le cookie
function readCookie(name) {
	var nameEQ = name + '=';
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

//Pour supprimer le cookie
function eraseCookie(name) {
	createCookie(name, '', -1);
}

function i18n(text) {
	if( _lng[defLng] )
		if( _lng[defLng][text] )
			return _lng[defLng][text];
	return null;
	
}

function changeLng(lng) {
	eraseCookie('defLng');
	createCookie('defLng',lng,21);
	defLng = readCookie('defLng');
	//document.location.assign(document.location.href);
	document.location.reload(); 
}