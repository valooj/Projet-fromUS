var data = require('self').data;
var tabs = require('tabs');
var pageMod = require('page-mod');
console.log('debut pageMod');

pageMod.PageMod({
  	include: '*',
  attachTo: ['existing', 'top'],    
  	contentScriptFile: 
  		[
  			data.url('jquery/jquery.min.js'),
        	data.url('jquery/jquery-ui-css-fix.js'),
            data.url('fromus_recuperation.js'),
            data.url('getPrice.js'),
            data.url('getName.js'),
            data.url('locales/en/enLng.js'),
            data.url('locales/fr/frLng.js'),
            data.url('langue.js'),
            data.url('dialog.js')
        ],
    contentStyleFile: data.url('jquery/jquery-ui-css-fix.css'),
    contentScriptOptions: {
      imgfr: data.url('img/fr.png'),
      imgen: data.url('img/en.png'),
      imgde: data.url('img/de.png'),
      imglogo: data.url('img/logo.png')
    }
});

/*var tbb = require('toolbarbutton').ToolbarButton({
  id: 'button',
  label: 'us-button',
  image: data.url('img/on.png'),
  onCommand: function () {

    tabs.activeTab.attach ({

        contentScriptFile: [
            data.url('jquery/jquery.min.js'),
            data.url('jquery/jquery-ui.js'),
            data.url('fromus_recuperation.js'),
            data.url('getPrice.js'),
            data.url('getName.js'),
            data.url('locales/en/enLng.js'),
            data.url('locales/fr/frLng.js'),
            data.url('langue.js'),
            data.url('dialog.js')
      ],
      contentScriptOptions: {
      imgfr: data.url('img/fr.png'),
      imgen: data.url('img/en.png'),
      imgde: data.url('img/de.png'),
      imglogo: data.url('img/logo.png')
    }
   });
  }
});*/