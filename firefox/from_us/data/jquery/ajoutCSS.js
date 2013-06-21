function ajoutCSS() {

	$('#fromus_help').css({
	'font-size': '0.7em',
	'float': 'left'
    });

	$('#selectLang').css({
	height: '1px'
	});
	$('#selectLang img').css({
		display: 'inline-block',
		'float': 'right',
		margin: '3px 2px 3px 1px'
	});

	$('input#passBox').css({
		width: '150px',
		margin: '2px 10px 2px 2px',
		display: 'inline-block',
		'float': 'left',
		border: '1px solid rgb(170, 170, 170)',
		'border-radius': '3px'
	});
	$('input#emailBox').css({
		width: '150px',
		margin: '2px',
		display: 'inline-block',
		'float': 'left',
		'border-radius': '3px',
		border: '1px solid rgb(170, 170, 170)'
	});
	$('input#connect').css({
		width: '55px',
		margin: '2px',
		padding: '2px',
		display: 'inline-block',
		'float': 'right'
	});
	$('input#nick_name').css({
		width: '300px',
		'text-align': 'left'
	});
	$('input#ptsFU').css({
		width: '300px',
		'text-align': 'center'
	});
	$('input#disconnect').css({
		width: '55px',
		margin: '2px',
		padding: '2px',
		display: 'inline-block',
		'float': 'left'
	});
	$('ul#onglets').css({
		'background-color': 'white',
		border: 'none'
	});
	$('li#liAdd').css({
		display: 'inline-block',
		'float': 'left',
		margin: '0 0 0 50px',
		height:'31px',
		width:'111px',
		'text-indent': '10px',
		'line-height': '31px'
	});
	$('li#liBuy').css({
		display: 'inline-block',
		'float': 'left',
		margin: '0',
		height:'31px',
		width:'111px',
		'text-indent': '10px',
		'line-height': '31px'
	});
	$('a#tabAdd').css({
		display: 'inline-block',
		'float': 'left',
		'background-image': 'url('+self.options.imgadd+')',
		margin: '0',
		height:'31px',
		width:'111px',
		'text-indent': '10px',
		'line-height': '31px',
		'text-indent': '28px',
		'text-align': 'left',
		'font-family': 'Arial, Verdana',
		'text-decoration': 'none',
		'font-size': '0.8em',
		color: '#000000'
	});
	$('a#tabBuy').css({
		display: 'inline-block',
		'float': 'right',
		'background-image': 'url('+self.options.imgbuy+')',
		margin: '0px',
		height:'31px',
		width:'111px',
		'text-indent': '10px',
		'line-height': '31px',
		'text-indent': '28px',
		'font-size': '0.8em',
		'font-family': 'Arial, Verdana',
		'text-align': 'left',
		'text-decoration': 'none',
		color: '#000000'
	});
	$('input#msgServer').css({
		width: '300px',
		color: '#c11f34',
		'text-align': 'center'
	});
	$('h2#FormP').css({
		color: 'black',
		'text-decoration': 'none',
		'text-transform': 'uppercase',
		'font-weight': 'bold',
		'text-align': 'center',
		'margin-bottom': '10px'
	});
	$('#fromus_tabs label').css({
		display: 'inline-block',
		'float': 'left',
		width: '250px',
		margin: '3px 0 0 5px',
		'text-align': 'left',
		'font-size': '1em'
	});
	$('#fromus_tabs input[type="textbox"]').css({
		display: 'inline-block',
		'float': 'left',
		width: '280px',
		margin: '1px 0 5px 5px', 
		padding: '0px'
	});
	$('input#priceQ').css({
		display: 'inline-block',
		'float': 'left',
		width: '25px',
		height: '25px',
		padding: '0px',
		'margin-left': '0px'
	});

	$('input#nameQ').css({
		display: 'inline-block',
		'float': 'left',
		width: '25px',
		height: '25px',
		padding: '0px',
		'margin-left': '0px'
	});
	$('textarea#fromus_desc').css({
		display: 'inline-block',
		'float': 'left',
		width: '280px',
		margin: '1px 0 5px 5px', 
		padding: '0px'
	});
	$('input#descQ').css({
		display: 'inline-block',
		'float': 'left',
		width: '25px',
		height: '25px',
		padding: '0px',
		'margin-left': '0px'
	});
	$('span#img-view').css({
	    display: 'none', 
	    border: '2px solid black',
	    height: '70px', 
	    width: '70px', /* H/W */
	    overflow: 'hidden', /* cache ce qui dépasse */
	    'background-size': '70px 70px',
	    'background-position': 'center center',
	    'background-repeat': 'no-repeat',
	    border: 'none'
	});
	$('span#img-view img').css({ 
		'max-height': '70px',
		'max-width': '70px'
	});
	$('div#image:hover span#img-view').css({ 
		display: 'block',
		position: 'absolute'
	});
	$('input#fromus_image').css({
		display: 'inline-block',
		'float': 'left',
		width: '280px',
		margin: '1px 0 5px 5px', 
		padding: '0px'
	});
	$('input#imgQ').css({
		display: 'inline-block',
		'float': 'left',
		width: '25px',
		height: '25px',
		padding: '0px',
		'margin-left': '0px'
	});
	$('select#category').css({
		display: 'inline-block',
		'float': 'left',
		width: '302px',
		margin: '1px 0 5px 5px',
		padding: '0px'
	});
	$('select#sscategory').css({
		display: 'inline-block',
		'float': 'left',
		width: '302px',
		margin: '1px 0 5px 5px',
		padding: '0px'
	});
	$('label#fu_quantite').css({
		display: 'inline-block',
		'float': 'left',
		width: '75px',
		margin: '3px 0 0 5px',
		'text-align': 'left',
		'font-size': '1em'
	});
	$('input#QteSpinner').css({
		display: 'inline-block',
		'float': 'left',
		width: '40px',
		'text-align': 'right',
		'border-radius': '4px',
		margin: '3px 120px 0 5px'
	});
	$('label#fu_assurance').css({
		display: 'inline-block',
		'float': 'left',
		width: '110px',
		margin: '3px 0 0 5px',
		'text-align': 'left',
		'font-size': '1em'
	});
	$('input#checkassur').css({
		display: 'inline-block',
		'float': 'left',
		margin: '7px 100px 0 5px'
	});

	$('input#addP').css({
		display: 'inline-block',
		'float': 'right',
		margin: '3px 5px 0 0',
		padding: '3px'
	});
	$('input#buyP').css({
		display: 'inline-block',
		'float': 'right',
		margin: '3px 5px 0 0',
		padding: '3px'
	});
	$('#logofromus').css({
		'float': 'left',
		'margin-left': '50px'
	});

	/*Fin*/

	$('#fromus_tabs').css({
		'background-image' : 'url('+self.options.imgplugin+')'
	});

	$('#fromus_dialogBox').css({
		'background-image' : 'url('+self.options.imgplugin+')'
	});

		/* Layout helpers
	----------------------------------*/
	$('.ui-toto-helper-hidden').css({
		display: 'none'
	});
	$('.ui-toto-helper-hidden-accessible').css({
		border: '0',
		clip: 'rect(0 0 0 0)',
		height: '1px',
		margin: '-1px',
		overflow: 'hidden',
		padding: '0',
		position: 'absolute',
		width: '1px'
	});
	$('.ui-toto-helper-reset').css({
		margin: '0',
		padding: '0',
		border: '0',
		outline: '0',
		'line-height': '1.3',
		'text-decoration': 'none',
		'font-size': '100%',
		
		'list-style': 'none'
	});
	$('.ui-toto-helper-clearfix:before').css({});
	$('.ui-toto-helper-clearfix:after').css({
		content: '',
		display: 'table',
		'border-collapse': 'collapse'
	});
	$('.ui-toto-helper-clearfix:after').css({
		clear: 'both'
	});
	$('.ui-toto-helper-clearfix').css({
		'min-height': '0' 
	});
	$('.ui-toto-helper-zfix').css({
		width: '100%',
		height: '100%',
		top: '0',
		left: '0',
		position: 'absolute',
		opacity: '0',
		filter:'Alpha(Opacity=0)'
	});

	$('.ui-toto-front').css({
		'z-index': '100'
		
	});


	/* Interaction Cues
	----------------------------------*/
	$('.ui-toto-state-disabled').css({
		cursor: 'default !important'
	});


	/* Icons
	----------------------------------*/

	/* states and images */
	$('.ui-toto-icon').css({
		display: 'block',
		'text-indent': '-99999px',
		overflow: 'hidden',
		'background-repeat': 'no-repeat'
	});


	/* Misc visuals
	----------------------------------*/

	/* Overlays */
	$('.ui-toto-widget-overlay').css({
		position: 'fixed',
		top: '0',
		left: '0',
		width: '100%',
		height: '100%'
	});

	$('.ui-toto-accordion .ui-toto-accordion-header').css({
		display: 'block',
		cursor: 'pointer',
		position: 'relative',
		'margin-top': '2px',
		padding: '.5em .5em .5em .7em',
		'min-height': '0', 
	});
	$('.ui-toto-accordion .ui-toto-accordion-icons').css({
		'padding-left': '2.2em'
	});
	$('.ui-toto-accordion .ui-toto-accordion-noicons').css({
		'padding-left': '.7em'
	});
	$('.ui-toto-accordion .ui-toto-accordion-icons .ui-toto-accordion-icons').css({
		'padding-left': '2.2em'
	});
	$('.ui-toto-accordion .ui-toto-accordion-header .ui-toto-accordion-header-icon').css({
		position: 'absolute',
		left: '.5em',
		top: '50%',
		'margin-top': '-8px'
	});
	$('.ui-toto-accordion .ui-toto-accordion-content').css({
		padding: '1em 2.2em',
		'border-top': '0',
		overflow: 'auto'
	});

	$('.ui-toto-autocomplete').css({
		position: 'absolute',
		top: '0',
		left: '0',
		cursor: 'default'
	});

	/*$('/*.ui-toto-button').css({
		display: 'inline-block',
		position: 'relative',
		padding: '0',
		'line-height': 'normal',
		'margin-right': '.1em',
		cursor: 'pointer',
		'vertical-align': 'middle',
		'text-align': 'center',
		overflow: 'visible', 

	});*/
	$('.ui-toto-button').css({});
	$('.ui-toto-button:link').css({});
	$('.ui-toto-button:visited').css({});
	$('.ui-toto-button:hover').css({});
	$('.ui-toto-button:active').css({
		'text-decoration': 'none'
	});
	/* to make room for the icon, a width needs to be set here */
	$('.ui-toto-button-icon-only').css({
		width: '2.2em'
	});
	/* button elements seem to need a little more width */
	$('button.ui-toto-button-icon-only').css({
		width: '2.4em'
	});
	$('.ui-toto-button-icons-only').css({
		width: '3.4em'
	});
	$('button.ui-toto-button-icons-only').css({
		width: '3.7em'
	});

	/* button text element */
	$('.ui-toto-button .ui-toto-button-text').css({
		
		display: 'block',
		'line-height': 'normal'
		
	});
	$('.ui-toto-button-text-only .ui-toto-button-text').css({
		border: 'none',
		padding: '0'
	});
	$('.ui-toto-button-icon-only .ui-toto-button-text').css({});
	$('.ui-toto-button-icons-only .ui-toto-button-text').css({
		padding: '.4em',
		'text-indent': '-9999999px'
	});
	$('.ui-toto-button-text-icon-primary .ui-toto-button-text').css({});
	$('.ui-toto-button-text-icons .ui-toto-button-text').css({
		padding: '.4em 1em .4em 2.1em'
	});
	$('.ui-toto-button-text-icon-secondary .ui-toto-button-text').css({});
	$('.ui-toto-button-text-icons .ui-toto-button-text').css({
		padding: '.4em 2.1em .4em 1em'
	});
	$('.ui-toto-button-text-icons .ui-toto-button-text').css({
		'padding-left': '2.1em',
		'padding-right': '2.1em'
	});
	/* no icon support for input elements, provide padding by default */
	$('input.ui-toto-button').css({
		padding: '.4em 1em'
	});

	/* button icon element(s) */
	$('.ui-toto-button-icon-only .ui-toto-icon').css({});
	$('.ui-toto-button-text-icon-primary .ui-toto-icon').css({});
	$('.ui-toto-button-text-icon-secondary .ui-toto-icon').css({});
	$('.ui-toto-button-text-icons .ui-toto-icon').css({});
	$('.ui-toto-button-icons-only .ui-toto-icon').css({
		position: 'absolute',
		top: '50%',
		'margin-top': '-8px',
		'margin-right': '10px'
	});
	$('.ui-toto-button-icon-only .ui-toto-icon').css({
		left: '50%',
		'margin-left': '-8px'
	});
	$('.ui-toto-button-text-icon-primary .ui-toto-button-icon-primary').css({});
	$('.ui-toto-button-text-icons .ui-toto-button-icon-primary').css({});
	$('.ui-toto-button-icons-only .ui-toto-button-icon-primary').css({
		left: '.5em',
		color: 'white'
	});
	$('.ui-toto-button-text-icon-secondary .ui-toto-button-icon-secondary').css({});
	$('.ui-toto-button-text-icons .ui-toto-button-icon-secondary').css({});
	$('.ui-toto-button-icons-only .ui-toto-button-icon-secondary').css({
		right: '.5em'
	});

	/* button sets */
	$('.ui-toto-buttonset').css({
		'margin-right': '7px'
	});
	$('.ui-toto-buttonset .ui-toto-button').css({
		'margin-left': '0',
		'margin-right': '-.3em'
	});

	/* workarounds */
	/* reset extra padding in Firefox, see h5bp.com/l */
	$('input.ui-toto-button::-moz-focus-inner').css({});
	$('button.ui-toto-button::-moz-focus-inner').css({
		border: '0',
		padding: '0'
	});
	$('.ui-toto-dialog').css({
		position: 'absolute',
		
		
		outline: '0',
		'z-index': '999999999'

	});
	$('.ui-toto-dialog .ui-toto-dialog-titlebar').css({
		
		position: 'relative',
		'background-color': '#203064',
		color: 'white'

	});
	$('.ui-toto-dialog .ui-toto-dialog-title').css({
		'float': 'left',
		'background-color': '#203064',
		'white-space': 'nowrap',

		width: '90%',
		overflow: 'hidden',
		'text-overflow': 'ellipsis',
		'text-align': 'center'
	});
	$('.ui-toto-dialog .ui-toto-dialog-titlebar-close').css({
		position: 'absolute',
		
		top: '50%',
		width: '21px',
		margin: '-10px 0 0 0',
		padding: '1px',
		height: '20px',
		border: 'none',
		'background-color': 'white'


	});
	$('.ui-toto-dialog .ui-toto-dialog-content').css({
		position: 'relative',
		border: '0',
		width: '350px', //ici pour le problème de taille de la popup
		background: 'none',
		overflow: 'auto'
	});
	$('.ui-toto-dialog .ui-toto-dialog-buttonpane').css({
		'text-align': 'left',
		'border-width': '1px 0 0 0',
		'background-image': 'none'
		
		
	});
	$('.ui-toto-dialog .ui-toto-dialog-buttonpane .ui-toto-dialog-buttonset').css({
		'float': 'right'
	});
	$('.ui-toto-dialog .ui-toto-dialog-buttonpane button').css({
		
		cursor: 'pointer'
	});
	$('.ui-toto-dialog .ui-resizable-se').css({
		width: '12px',
		height: '12px',
		right: '-5px',
		bottom: '-5px',
		'background-position': '16px 16px'
	});
	$('.ui-draggable .ui-toto-dialog-titlebar').css({
		cursor: 'move'

	});

	$('.ui-toto-menu').css({
		'list-style': 'none',
		padding: '2px',
		margin: '0',
		display: 'block',
		outline: 'none'
	});
	$('.ui-toto-menu .ui-toto-menu').css({
		'margin-top': '-3px',
		position: 'absolute'
	});
	$('.ui-toto-menu .ui-toto-menu-item').css({
		margin: '0',
		padding: '0',
		width: '100%'
	});
	$('.ui-toto-menu .ui-toto-menu-divider').css({
		margin: '5px -2px 5px -2px',
		height: '0',
		'font-size': '0',
		'line-height': '0',
		'border-width': '1px 0 0 0'
	});
	$('.ui-toto-menu .ui-toto-menu-item a').css({
		'text-decoration': 'none',
		display: 'block',
		padding: '2px .4em',
		'line-height': '1.5',
		'min-height': '0', 
		'font-weight': 'normal'
	});
	$('.ui-toto-menu .ui-toto-menu-item a.ui-toto-state-focus').css({});
	$('.ui-toto-menu .ui-toto-menu-item a.ui-toto-state-active').css({
		'font-weight': 'normal',
		margin: '-1px'
	});

	$('.ui-toto-menu .ui-toto-state-disabled').css({
		'font-weight': 'normal',
		margin: '.4em 0 .2em',
		'line-height': '1.5'
	});
	$('.ui-toto-menu .ui-toto-state-disabled a').css({
		cursor: 'default'
	});

	/* icon support */
	$('.ui-toto-menu-icons').css({
		position: 'relative'
	});
	$('.ui-toto-menu-icons .ui-toto-menu-item a').css({
		position: 'relative',
		'padding-left': '2em'
	});

	/* left-aligned */
	$('.ui-toto-menu .ui-toto-icon').css({
		position: 'absolute',
		top: '.2em',
		left: '.2em'
	});

	/* right-aligned */
	$('.ui-toto-menu .ui-toto-menu-icon').css({
		position: 'static',
		'float': 'right'
	});

	$('.ui-toto-progressbar').css({
		height: '2em',
		'text-align': 'left',
		overflow: 'hidden'
	});
	$('.ui-toto-progressbar .ui-toto-progressbar-value').css({
		margin: '-1px',
		height: '100%'
	});
	$('.ui-toto-progressbar .ui-toto-progressbar-overlay').css({
		
		height: '100%',
		filter: 'alpha(opacity=25)',
		opacity: '0.25'
	});
	$('.ui-toto-progressbar-indeterminate .ui-toto-progressbar-value').css({
		'background-image': 'none'
	});

	$('.ui-resizable').css({
		position: 'relative'
	});

	$('.ui-resizable-handle').css({
		position: 'absolute',
		'font-size': '0.1px',
		display: 'block'
	});

	$('.ui-resizable-disabled .ui-resizable-handle').css({});
	$('.ui-resizable-autohide .ui-resizable-handle').css({
		display: 'none'
	});
	$('.ui-resizable-n').css({
		cursor: 'n-resize',
		height: '7px',
		width: '100%',
		top: '-5px',
		left: '0'
	});
	$('.ui-resizable-s').css({
		cursor: 's-resize',
		height: '7px',
		width: '100%',
		bottom: '-5px',
		left: '0'
	});
	$('.ui-resizable-e').css({
		cursor: 'e-resize',
		width: '7px',
		right: '-5px',
		top: '0',
		height: '100%'
	});
	$('.ui-resizable-w').css({
		cursor: 'w-resize',
		width: '7px',
		left: '-5px',
		top: '0',
		height: '100%'
	});
	$('.ui-resizable-se').css({
		cursor: 'se-resize',
		width: '12px',
		height: '12px',
		right: '1px',
		bottom: '1px'
	});
	$('.ui-resizable-sw').css({
		cursor: 'sw-resize',
		width: '9px',
		height: '9px',
		left: '-5px',
		bottom: '-5px'
	});
	$('.ui-resizable-nw').css({
		cursor: 'nw-resize',
		width: '9px',
		height: '9px',
		left: '-5px',
		top: '-5px'
	});
	$('.ui-resizable-ne').css({
		cursor: 'ne-resize',
		width: '9px',
		height: '9px',
		right: '-5px',
		top: '-5px'
	});

	$('.ui-toto-selectable-helper').css({
		position: 'absolute',
		'z-index': '100',
		border: '1px dotted black'
	});

	$('.ui-toto-slider').css({
		position: 'relative',
		'text-align': 'left'
	});
	$('.ui-toto-slider .ui-toto-slider-handle').css({
		position: 'absolute',
		'z-index': '2',
		width: '1.2em',
		height: '1.2em',
		cursor: 'default'
	});
	$('.ui-toto-slider .ui-toto-slider-range').css({
		position: 'absolute',
		'z-index': '1',
		'font-size': '.7em',
		display: 'block',
		border: '0',
		'background-position': '0 0'
	});

	/* For IE8 - See #6727 */
	$('.ui-toto-slider.ui-toto-state-disabled .ui-toto-slider-handle').css({});
	$('.ui-toto-slider.ui-toto-state-disabled .ui-toto-slider-range').css({
		filter: 'inherit'
	});

	$('.ui-toto-slider-horizontal').css({
		height: '.8em'
	});
	$('.ui-toto-slider-horizontal .ui-toto-slider-handle').css({
		top: '-.3em',
		'margin-left': '-.6em'
	});
	$('.ui-toto-slider-horizontal .ui-toto-slider-range').css({
		top: '0',
		height: '100%'
	});
	$('.ui-toto-slider-horizontal .ui-toto-slider-range-min').css({
		left: '0'
	});
	$('.ui-toto-slider-horizontal .ui-toto-slider-range-max').css({
		right: '0'
	});

	$('.ui-toto-slider-vertical').css({
		width: '.8em',
		height: '100px'
	});
	$('.ui-toto-slider-vertical .ui-toto-slider-handle').css({
		left: '-.3em',
		'margin-left': '0',
		'margin-bottom': '-.6em'
	});
	$('.ui-toto-slider-vertical .ui-toto-slider-range').css({
		left: '0',
		width: '100%'
	});
	$('.ui-toto-slider-vertical .ui-toto-slider-range-min').css({
		bottom: '0'
	});
	$('.ui-toto-slider-vertical .ui-toto-slider-range-max').css({
		top: '0'
	});

	$('.ui-toto-spinner').css({
		position: 'relative',
		display: 'inline-block',
		overflow: 'hidden',
		padding: '0',
		'vertical-align': 'middle',

	});
	$('.ui-toto-spinner-input').css({
		border: 'none',
		background: 'none',
		color: 'inherit',
		padding: '0',
		margin: '.2em 0',
		'vertical-align': 'middle',
		'margin-left': '.4em',
		'margin-right': '22px'
	});
	$('.ui-toto-spinner-button').css({
		width: '16px',
		height: '50%',
		'font-size': '.5em',
		padding: '0',
		margin: '0',
		'text-align': 'center',
		position: 'absolute',
		cursor: 'default',
		display: 'block',
		overflow: 'hidden',
		right: '0'
	});
	/* more specificity required here to overide default borders */
	$('.ui-toto-spinner a.ui-toto-spinner-button').css({
		'border-top': 'none',
		'border-bottom': 'none',
		'border-right': 'none'
	});
	/* vertical centre icon */
	$('.ui-toto-spinner .ui-toto-icon').css({
		position: 'absolute',
		'margin-top': '-8px',
		top: '50%',
		left: '0'
	});
	$('.ui-toto-spinner-up').css({
		top: '0'
	});
	$('.ui-toto-spinner-down').css({
		bottom: '0'
	});

	/* TR overrides */
	$('.ui-toto-spinner .ui-toto-icon-triangle-1-s').css({
		/* need to fix icons sprite */
		'background-position': '-65px -16px'
	});

	$('.ui-toto-tabs').css({
		position: 'relative',
		padding: '.2em'
	});

	$('.ui-toto-tabs .ui-toto-tabs-nav li').css({
		'list-style': 'none',
		'float': 'left',
		position: 'relative',
		top: '0',
		width: '158px',
		'border-bottom-width': '0',
		padding: '0',
		'white-space': 'nowrap'
	});
	$('.ui-toto-tabs .ui-toto-tabs-nav li a').css({
		'float': 'left',
		padding: '.5em 1em',
		'text-decoration': 'none'
	});
	$('.ui-toto-tabs .ui-toto-tabs-nav li.ui-toto-tabs-active').css({

		'margin-bottom': '-1px',
		'padding-bottom': '1px'
	});
	$('.ui-toto-tabs .ui-toto-tabs-nav li.ui-toto-tabs-active a').css({});
	$('.ui-toto-tabs .ui-toto-tabs-nav li.ui-toto-state-disabled a').css({});
	$('.ui-toto-tabs .ui-toto-tabs-nav li.ui-toto-tabs-loading a').css({
		cursor: 'text'
	});
	$('.ui-toto-tabs .ui-toto-tabs-nav li a').css({}); 
	$('.ui-toto-tabs-collapsible .ui-toto-tabs-nav li.ui-toto-tabs-active a').css({
		cursor: 'pointer'
	});
	$('.ui-toto-tabs .ui-toto-tabs-panel').css({
		display: 'block',
		'border-width': '0',
		padding: '1em 1.4em',
		background: 'none'
	});

	$('.ui-toto-tooltip').css({
		padding: '8px',
		position: 'absolute',
		'z-index': '9999',
		'max-width': '300px',
		'-webkit-box-shadow': '0 0 5px #aaa',
		'box-shadow': '0 0 5px #aaa'
	});
	$('body .ui-toto-tooltip').css({
		'border-width': '2px'
	});

	/* Component containers
	----------------------------------*/
	$('.ui-toto-widget').css({
		'font-family': 'Verdana,Arial,sans-serif', 
		//left: '70%', //ici pour mettre à droite la popup
		'font-size': '15px'
	});
	$('.ui-toto-widget .ui-toto-widget').css({
		'font-size': '1em'
	});
	$('.ui-toto-widget input').css({});
	$('.ui-toto-widget select').css({});
	$('.ui-toto-widget textarea').css({});
	$('.ui-toto-widget button').css({
		'font-family': 'Verdana,Arial,sans-serif',
		
		'font-size': '15px'
	});
	$('.ui-toto-widget button').css({
		'background-color': '#203064',
		color: 'white'
	});
	$('.ui-toto-widget-content').css({
		border: '1px solid #aaaaaa',
		background: 'white url('+self.options.imgbgflat+') 50% 50% repeat-x',
		color: '#222222'
	});
	$('.ui-toto-widget-content a').css({
		color: '#222222'
	});
	$('.ui-toto-widget-header').css({
		border: '1px solid #aaaaaa',
		color: 'white',
		'background-color': '#222222',
		'font-weight': 'bold'
	});
	$('.ui-toto-widget-header a').css({
		color: '#222222'
	});

	/* Interaction states
	----------------------------------*/
	$('.ui-toto-state-default').css({});
	$('.ui-toto-widget-content .ui-toto-state-default').css({});
	$('.ui-toto-widget-header .ui-toto-state-default').css({
		display: 'inline-block',
		'float': 'right',
		border: '1px solid #d3d3d3',
		'font-weight': 'normal',
		'background-color': '#c11f34',
		color: 'white',
		padding: '0'
	});
	$('.ui-toto-state-default a').css({});
	$('.ui-toto-state-default a:link').css({});
	$('.ui-toto-state-default a:visited').css({
		color: '#555555',
		'text-decoration': 'none'
	});
	$('.ui-toto-state-hover').css({});
	$('.ui-toto-widget-content .ui-toto-state-hover').css({});
	$('.ui-toto-widget-header .ui-toto-state-hover').css({});
	$('.ui-toto-state-focus').css({});
	$('.ui-toto-widget-content .ui-toto-state-focus').css({});
	$('.ui-toto-widget-header .ui-toto-state-focus').css({
		border: '1px solid #999999',
		'font-weight': 'normal',
		color: '#212121'
	});
	$('.ui-toto-state-hover a').css({});
	$('.ui-toto-state-hover a:hover').css({});
	$('.ui-toto-state-hover a:link').css({});
	$('.ui-toto-state-hover a:visited').css({
		color: '#212121',
		'text-decoration': 'none'
	});
	$('.ui-toto-state-active').css({});
	$('.ui-toto-widget-content .ui-toto-state-active').css({});
	$('.ui-toto-widget-header .ui-toto-state-active').css({
		border: '1px solid #aaaaaa ',
		'font-weight': 'normal',
		color: '#212121'
	});
	$('.ui-toto-state-active a').css({});
	$('.ui-toto-state-active a:link').css({});
	$('.ui-toto-state-active a:visited').css({
		color: '#212121',
		'text-decoration': 'none'
	});

	/* Interaction Cues
	----------------------------------*/
	$('.ui-toto-state-highlight').css({});
	$('.ui-toto-widget-content .ui-toto-state-highlight').css({});
	$('.ui-toto-widget-header .ui-toto-state-highlight').css({
		border: '1px solid #fcefa1',
		background: '#fbf9ee url(jquery/images/ui-toto-bg_glass_55_fbf9ee_1x400.png) 50% 50% repeat-x',
		color: '#363636'
	});
	$('.ui-toto-state-highlight a').css({});
	$('.ui-toto-widget-content .ui-toto-state-highlight a').css({});
	$('.ui-toto-widget-header .ui-toto-state-highlight a').css({
		color: '#363636'
	});
	$('.ui-toto-state-error').css({});
	$('.ui-toto-widget-content .ui-toto-state-error').css({});
	$('.ui-toto-widget-header .ui-toto-state-error').css({
		border: '1px solid #cd0a0a',
		background: '#fef1ec url(jquery/images/ui-toto-bg_glass_95_fef1ec_1x400.png) 50% 50% repeat-x',
		color: '#cd0a0a'
	});
	$('.ui-toto-state-error a').css({});
	$('.ui-toto-widget-content .ui-toto-state-error a').css({});
	$('.ui-toto-widget-header .ui-toto-state-error a').css({
		color: '#cd0a0a'
	});
	$('.ui-toto-state-error-text').css({});
	$('.ui-toto-widget-content .ui-toto-state-error-text').css({});
	$('.ui-toto-widget-header .ui-toto-state-error-text').css({
		color: '#cd0a0a'
	});
	$('.ui-toto-priority-primary').css({});
	$('.ui-toto-widget-content .ui-toto-priority-primary').css({});
	$('.ui-toto-widget-header .ui-toto-priority-primary').css({
		'font-weight': 'bold'
	});
	$('.ui-toto-priority-secondary').css({});
	$('.ui-toto-widget-content .ui-toto-priority-secondary').css({});
	$('.ui-toto-widget-header .ui-toto-priority-secondary').css({
		opacity: '.7',
		filter:'Alpha(Opacity=70)',
		'font-weight': 'normal'
	});
	$('.ui-toto-state-disabled').css({});
	$('.ui-toto-widget-content .ui-toto-state-disabled').css({});
	$('.ui-toto-widget-header .ui-toto-state-disabled').css({
		opacity: '.35',
		filter:'Alpha(Opacity=35)',
		'background-image': 'none'
	});
	$('.ui-toto-state-disabled .ui-toto-icon').css({
		filter:'Alpha(Opacity=35)' 
	});

	/* Icons
	----------------------------------*/

	/* states and images */
	$('.ui-toto-icon').css({
		width: '16px',
		height: '16px',
		'float': 'right',
		'margin-right': '0px'
	});
	$('.ui-toto-icon').css({});
	$('.ui-toto-widget-content .ui-toto-icon').css({
		//'background-image': 'url('+self.options.imgicons+')'
	});
	$('.ui-toto-widget-header .ui-toto-icon').css({
		//'background-image': 'url('+self.options.imgicons+')'
	});
	$('.ui-toto-state-default .ui-toto-icon').css({
		//'background-image': 'url('+self.options.imgicons+')',
		'float':'right',
		'margin-right': '0px !important'
	});
	$('.ui-toto-state-hover .ui-toto-icon').css({});
	$('.ui-toto-state-focus .ui-toto-icon').css({
		//'background-image': 'url('+self.options.imgicons+')'
	});
	$('.ui-toto-state-active .ui-toto-icon').css({
		//'background-image': 'url('+self.options.imgicons+')'
	});
	$('.ui-toto-state-highlight .ui-toto-icon').css({
		//'background-image': 'url('+self.options.imgicons+')'
	});
	$('.ui-toto-state-error .ui-toto-icon').css({});
	$('.ui-toto-state-error-text .ui-toto-icon').css({
		//'background-image': 'url('+self.options.imgicons+')'
	});

	/* positioning */
	$('.ui-toto-icon-blank').css({ 'background-position': '16px 16px'});
	$('.ui-toto-icon-carat-1-n').css({ 'background-position': '0 0'});
	$('.ui-toto-icon-carat-1-ne').css({ 'background-position': '-16px 0'});
	$('.ui-toto-icon-carat-1-e').css({ 'background-position': '-32px 0'});
	$('.ui-toto-icon-carat-1-se').css({ 'background-position': '-48px 0'});
	$('.ui-toto-icon-carat-1-s').css({ 'background-position': '-64px 0'});
	$('.ui-toto-icon-carat-1-sw').css({ 'background-position': '-80px 0'});
	$('.ui-toto-icon-carat-1-w').css({ 'background-position': '-96px 0'});
	$('.ui-toto-icon-carat-1-nw').css({ 'background-position': '-112px 0'});
	$('.ui-toto-icon-carat-2-n-s').css({ 'background-position': '-128px 0'});
	$('.ui-toto-icon-carat-2-e-w').css({ 'background-position': '-144px 0'});
	$('.ui-toto-icon-triangle-1-n').css({ 'background-position': '0 -16px'});
	$('.ui-toto-icon-triangle-1-ne').css({ 'background-position': '-16px -16px'});
	$('.ui-toto-icon-triangle-1-e').css({ 'background-position': '-32px -16px'});
	$('.ui-toto-icon-triangle-1-se').css({ 'background-position': '-48px -16px'});
	$('.ui-toto-icon-triangle-1-s').css({ 'background-position': '-64px -16px'});
	$('.ui-toto-icon-triangle-1-sw').css({ 'background-position': '-80px -16px'});
	$('.ui-toto-icon-triangle-1-w').css({ 'background-position': '-96px -16px'});
	$('.ui-toto-icon-triangle-1-nw').css({ 'background-position': '-112px -16px'});
	$('.ui-toto-icon-triangle-2-n-s').css({ 'background-position': '-128px -16px'});
	$('.ui-toto-icon-triangle-2-e-w').css({ 'background-position': '-144px -16px'});
	$('.ui-toto-icon-arrow-1-n').css({ 'background-position': '0 -32px'});
	$('.ui-toto-icon-arrow-1-ne').css({ 'background-position': '-16px -32px'});
	$('.ui-toto-icon-arrow-1-e').css({ 'background-position': '-32px -32px'});
	$('.ui-toto-icon-arrow-1-se').css({ 'background-position': '-48px -32px'});
	$('.ui-toto-icon-arrow-1-s').css({ 'background-position': '-64px -32px'});
	$('.ui-toto-icon-arrow-1-sw').css({ 'background-position': '-80px -32px'});
	$('.ui-toto-icon-arrow-1-w').css({ 'background-position': '-96px -32px'});
	$('.ui-toto-icon-arrow-1-nw').css({ 'background-position': '-112px -32px'});
	$('.ui-toto-icon-arrow-2-n-s').css({ 'background-position': '-128px -32px'});
	$('.ui-toto-icon-arrow-2-ne-sw').css({ 'background-position': '-144px -32px'});
	$('.ui-toto-icon-arrow-2-e-w').css({ 'background-position': '-160px -32px'});
	$('.ui-toto-icon-arrow-2-se-nw').css({ 'background-position': '-176px -32px'});
	$('.ui-toto-icon-arrowstop-1-n').css({ 'background-position': '-192px -32px'});
	$('.ui-toto-icon-arrowstop-1-e').css({ 'background-position': '-208px -32px'});
	$('.ui-toto-icon-arrowstop-1-s').css({ 'background-position': '-224px -32px'});
	$('.ui-toto-icon-arrowstop-1-w').css({ 'background-position': '-240px -32px'});
	$('.ui-toto-icon-arrowthick-1-n').css({ 'background-position': '0 -48px'});
	$('.ui-toto-icon-arrowthick-1-ne').css({ 'background-position': '-16px -48px'});
	$('.ui-toto-icon-arrowthick-1-e').css({ 'background-position': '-32px -48px'});
	$('.ui-toto-icon-arrowthick-1-se').css({ 'background-position': '-48px -48px'});
	$('.ui-toto-icon-arrowthick-1-s').css({ 'background-position': '-64px -48px'});
	$('.ui-toto-icon-arrowthick-1-sw').css({ 'background-position': '-80px -48px'});
	$('.ui-toto-icon-arrowthick-1-w').css({ 'background-position': '-96px -48px'});
	$('.ui-toto-icon-arrowthick-1-nw').css({ 'background-position': '-112px -48px'});
	$('.ui-toto-icon-arrowthick-2-n-s').css({ 'background-position': '-128px -48px'});
	$('.ui-toto-icon-arrowthick-2-ne-sw').css({ 'background-position': '-144px -48px'});
	$('.ui-toto-icon-arrowthick-2-e-w').css({ 'background-position': '-160px -48px'});
	$('.ui-toto-icon-arrowthick-2-se-nw').css({ 'background-position': '-176px -48px'});
	$('.ui-toto-icon-arrowthickstop-1-n').css({ 'background-position': '-192px -48px'});
	$('.ui-toto-icon-arrowthickstop-1-e').css({ 'background-position': '-208px -48px'});
	$('.ui-toto-icon-arrowthickstop-1-s').css({ 'background-position': '-224px -48px'});
	$('.ui-toto-icon-arrowthickstop-1-w').css({ 'background-position': '-240px -48px'});
	$('.ui-toto-icon-arrowreturnthick-1-w').css({ 'background-position': '0 -64px'});
	$('.ui-toto-icon-arrowreturnthick-1-n').css({ 'background-position': '-16px -64px'});
	$('.ui-toto-icon-arrowreturnthick-1-e').css({ 'background-position': '-32px -64px'});
	$('.ui-toto-icon-arrowreturnthick-1-s').css({ 'background-position': '-48px -64px'});
	$('.ui-toto-icon-arrowreturn-1-w').css({ 'background-position': '-64px -64px'});
	$('.ui-toto-icon-arrowreturn-1-n').css({ 'background-position': '-80px -64px'});
	$('.ui-toto-icon-arrowreturn-1-e').css({ 'background-position': '-96px -64px'});
	$('.ui-toto-icon-arrowreturn-1-s').css({ 'background-position': '-112px -64px'});
	$('.ui-toto-icon-arrowrefresh-1-w').css({ 'background-position': '-128px -64px'});
	$('.ui-toto-icon-arrowrefresh-1-n').css({ 'background-position': '-144px -64px'});
	$('.ui-toto-icon-arrowrefresh-1-e').css({ 'background-position': '-160px -64px'});
	$('.ui-toto-icon-arrowrefresh-1-s').css({ 'background-position': '-176px -64px'});
	$('.ui-toto-icon-arrow-4').css({ 'background-position': '0 -80px'});
	$('.ui-toto-icon-arrow-4-diag').css({ 'background-position': '-16px -80px'});
	$('.ui-toto-icon-extlink').css({ 'background-position': '-32px -80px'});
	$('.ui-toto-icon-newwin').css({ 'background-position': '-48px -80px'});
	$('.ui-toto-icon-refresh').css({ 'background-position': '-64px -80px'});
	$('.ui-toto-icon-shuffle').css({ 'background-position': '-80px -80px'});
	$('.ui-toto-icon-transfer-e-w').css({ 'background-position': '-96px -80px'});
	$('.ui-toto-icon-transferthick-e-w').css({ 'background-position': '-112px -80px'});
	$('.ui-toto-icon-folder-collapsed').css({ 'background-position': '0 -96px'});
	$('.ui-toto-icon-folder-open').css({ 'background-position': '-16px -96px'});
	$('.ui-toto-icon-document').css({ 'background-position': '-32px -96px'});
	$('.ui-toto-icon-document-b').css({ 'background-position': '-48px -96px'});
	$('.ui-toto-icon-note').css({ 'background-position': '-64px -96px'});
	$('.ui-toto-icon-mail-closed').css({ 'background-position': '-80px -96px'});
	$('.ui-toto-icon-mail-open').css({ 'background-position': '-96px -96px'});
	$('.ui-toto-icon-suitcase').css({ 'background-position': '-112px -96px'});
	$('.ui-toto-icon-comment').css({ 'background-position': '-128px -96px'});
	$('.ui-toto-icon-person').css({ 'background-position': '-144px -96px'});
	$('.ui-toto-icon-print').css({ 'background-position': '-160px -96px'});
	$('.ui-toto-icon-trash').css({ 'background-position': '-176px -96px'});
	$('.ui-toto-icon-locked').css({ 'background-position': '-192px -96px'});
	$('.ui-toto-icon-unlocked').css({ 'background-position': '-208px -96px'});
	$('.ui-toto-icon-bookmark').css({ 'background-position': '-224px -96px'});
	$('.ui-toto-icon-tag').css({ 'background-position': '-240px -96px'});
	$('.ui-toto-icon-home').css({ 'background-position': '0 -112px'});
	$('.ui-toto-icon-flag').css({ 'background-position': '-16px -112px'});
	$('.ui-toto-icon-calendar').css({ 'background-position': '-32px -112px'});
	$('.ui-toto-icon-cart').css({ 'background-position': '-48px -112px'});
	$('.ui-toto-icon-pencil').css({ 'background-position': '-64px -112px'});
	$('.ui-toto-icon-clock').css({ 'background-position': '-80px -112px'});
	$('.ui-toto-icon-disk').css({ 'background-position': '-96px -112px'});
	$('.ui-toto-icon-calculator').css({ 'background-position': '-112px -112px'});
	$('.ui-toto-icon-zoomin').css({ 'background-position': '-128px -112px'});
	$('.ui-toto-icon-zoomout').css({ 'background-position': '-144px -112px'});
	$('.ui-toto-icon-search').css({ 'background-position': '-160px -112px'});
	$('.ui-toto-icon-wrench').css({ 'background-position': '-176px -112px'});
	$('.ui-toto-icon-gear').css({ 'background-position': '-192px -112px'});
	$('.ui-toto-icon-heart').css({ 'background-position': '-208px -112px'});
	$('.ui-toto-icon-star').css({ 'background-position': '-224px -112px'});
	$('.ui-toto-icon-link').css({ 'background-position': '-240px -112px'});
	$('.ui-toto-icon-cancel').css({ 'background-position': '0 -128px'});
	$('.ui-toto-icon-plus').css({ 'background-position': '-16px -128px'});
	$('.ui-toto-icon-plusthick').css({ 'background-position': '-32px -128px'});
	$('.ui-toto-icon-minus').css({ 'background-position': '-48px -128px'});
	$('.ui-toto-icon-minusthick').css({ 'background-position': '-64px -128px'});
	$('.ui-toto-icon-close').css({ 'background-position': '-80px -128px'});
	$('.ui-toto-icon-closethick').css({ 'background-position': '-96px -128px'});
	$('.ui-toto-icon-key').css({ 'background-position': '-112px -128px'});
	$('.ui-toto-icon-lightbulb').css({ 'background-position': '-128px -128px'});
	$('.ui-toto-icon-scissors').css({ 'background-position': '-144px -128px'});
	$('.ui-toto-icon-clipboard').css({ 'background-position': '-160px -128px'});
	$('.ui-toto-icon-copy').css({ 'background-position': '-176px -128px'});
	$('.ui-toto-icon-contact').css({ 'background-position': '-192px -128px'});
	$('.ui-toto-icon-image').css({ 'background-position': '-208px -128px'});
	$('.ui-toto-icon-video').css({ 'background-position': '-224px -128px'});
	$('.ui-toto-icon-script').css({ 'background-position': '-240px -128px'});
	$('.ui-toto-icon-alert').css({ 'background-position': '0 -144px'});
	$('.ui-toto-icon-info').css({ 'background-position': '-16px -144px'});
	$('.ui-toto-icon-notice').css({ 'background-position': '-32px -144px'});
	$('.ui-toto-icon-help').css({ 'background-position': '-48px -144px'});
	$('.ui-toto-icon-check').css({ 'background-position': '-64px -144px'});
	$('.ui-toto-icon-bullet').css({ 'background-position': '-80px -144px'});
	$('.ui-toto-icon-radio-on').css({ 'background-position': '-96px -144px'});
	$('.ui-toto-icon-radio-off').css({ 'background-position': '-112px -144px'});
	$('.ui-toto-icon-pin-w').css({ 'background-position': '-128px -144px'});
	$('.ui-toto-icon-pin-s').css({ 'background-position': '-144px -144px'});
	$('.ui-toto-icon-play').css({ 'background-position': '0 -160px'});
	$('.ui-toto-icon-pause').css({ 'background-position': '-16px -160px'});
	$('.ui-toto-icon-seek-next').css({ 'background-position': '-32px -160px'});
	$('.ui-toto-icon-seek-prev').css({ 'background-position': '-48px -160px'});
	$('.ui-toto-icon-seek-end').css({ 'background-position': '-64px -160px'});
	$('.ui-toto-icon-seek-start').css({ 'background-position': '-80px -160px'});
	/* ui-toto-icon-seek-first is deprecated, use ui-toto-icon-seek-start instead */
	$('.ui-toto-icon-seek-first').css({ 'background-position': '-80px -160px'});
	$('.ui-toto-icon-stop').css({ 'background-position': '-96px -160px'});
	$('.ui-toto-icon-eject').css({ 'background-position': '-112px -160px'});
	$('.ui-toto-icon-volume-off').css({ 'background-position': '-128px -160px'});
	$('.ui-toto-icon-volume-on').css({ 'background-position': '-144px -160px'});
	$('.ui-toto-icon-power').css({ 'background-position': '0 -176px'});
	$('.ui-toto-icon-signal-diag').css({ 'background-position': '-16px -176px'});
	$('.ui-toto-icon-signal').css({ 'background-position': '-32px -176px'});
	$('.ui-toto-icon-battery-0').css({ 'background-position': '-48px -176px'});
	$('.ui-toto-icon-battery-1').css({ 'background-position': '-64px -176px'});
	$('.ui-toto-icon-battery-2').css({ 'background-position': '-80px -176px'});
	$('.ui-toto-icon-battery-3').css({ 'background-position': '-96px -176px'});
	$('.ui-toto-icon-circle-plus').css({ 'background-position': '0 -192px'});
	$('.ui-toto-icon-circle-minus').css({ 'background-position': '-16px -192px'});
	$('.ui-toto-icon-circle-close').css({ 'background-position': '-32px -192px'});
	$('.ui-toto-icon-circle-triangle-e').css({ 'background-position': '-48px -192px'});
	$('.ui-toto-icon-circle-triangle-s').css({ 'background-position': '-64px -192px'});
	$('.ui-toto-icon-circle-triangle-w').css({ 'background-position': '-80px -192px'});
	$('.ui-toto-icon-circle-triangle-n').css({ 'background-position': '-96px -192px'});
	$('.ui-toto-icon-circle-arrow-e').css({ 'background-position': '-112px -192px'});
	$('.ui-toto-icon-circle-arrow-s').css({ 'background-position': '-128px -192px'});
	$('.ui-toto-icon-circle-arrow-w').css({ 'background-position': '-144px -192px'});
	$('.ui-toto-icon-circle-arrow-n').css({ 'background-position': '-160px -192px'});
	$('.ui-toto-icon-circle-zoomin').css({ 'background-position': '-176px -192px'});
	$('.ui-toto-icon-circle-zoomout').css({ 'background-position': '-192px -192px'});
	$('.ui-toto-icon-circle-check').css({ 'background-position': '-208px -192px'});
	$('.ui-toto-icon-circlesmall-plus').css({ 'background-position': '0 -208px'});
	$('.ui-toto-icon-circlesmall-minus').css({ 'background-position': '-16px -208px'});
	$('.ui-toto-icon-circlesmall-close').css({ 'background-position': '-32px -208px'});
	$('.ui-toto-icon-squaresmall-plus').css({ 'background-position': '-48px -208px'});
	$('.ui-toto-icon-squaresmall-minus').css({ 'background-position': '-64px -208px'});
	$('.ui-toto-icon-squaresmall-close').css({ 'background-position': '-80px -208px'});
	$('.ui-toto-icon-grip-dotted-vertical').css({ 'background-position': '0 -224px'});
	$('.ui-toto-icon-grip-dotted-horizontal').css({ 'background-position': '-16px -224px'});
	$('.ui-toto-icon-grip-solid-vertical').css({ 'background-position': '-32px -224px'});
	$('.ui-toto-icon-grip-solid-horizontal').css({ 'background-position': '-48px -224px'});
	$('.ui-toto-icon-gripsmall-diagonal-se').css({ 'background-position': '-64px -224px'});
	$('.ui-toto-icon-grip-diagonal-se').css({ 'background-position': '-80px -224px'});


	/* Misc visuals
	----------------------------------*/

	/* Corner radius */
	$('.ui-toto-corner-all').css({});
	$('.ui-toto-corner-top').css({});
	$('.ui-toto-corner-left').css({});
	$('.ui-toto-corner-tl').css({
		'border-top-left-radius': '4px'
	});
	$('.ui-toto-corner-all').css({});
	$('.ui-toto-corner-top').css({});
	$('.ui-toto-corner-right').css({});
	$('.ui-toto-corner-tr').css({
		'border-top-right-radius': '4px'
	});
	$('.ui-toto-corner-all').css({});
	$('.ui-toto-corner-bottom').css({});
	$('.ui-toto-corner-left').css({});
	$('.ui-toto-corner-bl').css({
		'border-bottom-left-radius': '4px'
	});
	$('.ui-toto-corner-all').css({});
	$('.ui-toto-corner-bottom').css({});
	$('.ui-toto-corner-right').css({});
	$('.ui-toto-corner-br').css({
		'border-bottom-right-radius': '4px'
	});

	/* Overlays */
	$('.ui-toto-widget-overlay').css({
		background: '#aaaaaa url(jquery/images/ui-toto-bg_flat_0_aaaaaa_40x100.png) 50% 50% repeat-x',
		opacity: '.3',
		filter: 'Alpha(Opacity=30)'
	});
	$('.ui-toto-widget-shadow').css({
		margin: '-8px 0 0 -8px',
		padding: '8px',
		background: '#aaaaaa url(jquery/images/ui-toto-bg_flat_0_aaaaaa_40x100.png) 50% 50% repeat-x',
		opacity: '.3',
		filter: 'Alpha(Opacity=30)',
		'border-radius': '8px'
	});


}