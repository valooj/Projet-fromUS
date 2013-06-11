var defLng='fr';

function i18n(text) {
	if( _lng[defLng] )
		if( _lng[defLng][text] )
			return _lng[defLng][text];
	return null;
}

function changeLng(lng) {
	chrome.storage.local.set({'lngFU': lng});
	defLng = lng;
}

