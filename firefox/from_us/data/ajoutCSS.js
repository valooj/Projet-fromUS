function ajoutCSS() {
	$('#selectLang').css({
		height: '1px'
	});
	$('#selectLang img').css({
		display: 'inline-block',
		'float': 'right',
		margin: '3px 2px 3px 1px' 
	});
	$('input#passBox').css({
		width: '155px',
		margin: '2px',
		display: 'inline-block',
		'float': 'left'
	});
	$('input#emailBox').css({
		width: '155px',
		margin: '2px',
		display: 'inline-block',
		'float': 'left'
	});
	$('input#connect').css({
		width: '55px',
		margin: '2px',
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
		height: '31px',
		width: '111px',
		'text-indent': '10px',
		'line-height': '31px'

	});
	$('li#liBuy').css({
		display: 'inline-block',
		'float': 'left',
		margin: '0',
		height: '31px',
		width: '111px',
		'text-indent': '10px',
		'line-height': '31px'
	});
	$('a#tabAdd').css({
		display: 'inline-block',
		'float': 'left',
		'background-image': 'url('+self.options.imgadd+')',
		margin: '0',
		height: '31px',
		width: '111px',
		'text-indent': '10px',
		'line-height': '31px',
		'text-indent': '28px',
		'text-align': 'left',
		'font-size': '0.8em'

	});
	$('a#tabBuy').css({
		display: 'inline-block',
		'float': 'right',
		'background-image': 'url('+self.options.imgbuy+')',
		margin: '0px',
		height: '31px',
		width: '111px',
		'text-indent': '10px',
		'line-height': '31px',
		'text-indent': '28px',
		'font-size': '0.8em',
		'text-align': 'left'
	});

	$('#fromus_tabs').css({
		'background-image' : 'url('+self.options.imgplugin+')'
	});

	$('#fromus_dialogBox').css({
		'background-image' : 'url('+self.options.imgplugin+')'
	});

	$('.ui-toto-dialog').css({
	position: 'absolute',
	top: '0',
	left: '0',
	outline: '0',
	'z-index': '999999999'

	});
	$('.ui-toto-dialog .ui-toto-dialog-titlebar').css({
		position: 'relative',
		'background-color': 'white',
		color: 'white',
		border: 'none'
	});
	$('.ui-toto-dialog .ui-toto-dialog-title').css({
		'float': 'left',
		'white-space': 'nowrap',
		width: '90%',
		overflow: 'hidden',
		'text-overflow': 'ellipsis'
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
}