var data = require('self').data;
var tabs = require('tabs');
var pageMod = require('page-mod');
console.log('debut pageMod');

pageMod.PageMod({
  	include: '*',
  	contentScriptFile: 
  		[
  			data.url('jquery/jquery.min.js'),
        	data.url('jquery/jquery-ui.js'),
            data.url('fromus_recuperation.js'),
            data.url('locales/en/enLng.js'),
            data.url('locales/fr/frLng.js'),
            data.url('langue.js'),
            data.url('dialog.js')
        ],
    contentStyleFile: data.url('jquery/jquery-ui-avant-fromus.css'),
    contentScriptOptions: {
      imgfr: data.url('img/fr.png'),
      imgen: data.url('img/en.png'),
      imgde: data.url('img/de.png'),
      imglogo: data.url('img/logo.png')
    }
});