var newDialog = $('<div id="fromus_dialogBox" class="toto">' +
						'<div id="fromus_tabs">' +
							'<ul>' +
								'<li><a href="#fromus_tabs-1">tabAdd</a></li>' +
								'<li><a href="#fromus_tabs-1">tabBuy</a></li>' +
								'<li><a href="#fromus_tabs-2">tabAccount</a></li>' +
							'</ul>' +
							'<label for="Nick_Name"></label><input type="textbox" id="Nick_Name" disabled="true"/></br>' +
							'<div id="fromus_tabs-1">' +
								'<h2>FormP</h2>' +
								'<form id="fromusForm">' + 

									'<label for="store">Merchant</label><input type="textbox" id="fromus_store" disabled="true"/></br>' +
									'<label for="name">NameP</label><input type="textbox" id="fromus_name" disabled="true"/><input type="button" id="fromus_morename" /></br>' + 
									'<label for="price">PriceP</label><input type="textbox" id="fromus_price" /><input type="button" id="fromus_moreprice" /></br>' +
									'<label for="category">CategP</label>'+ 
										'<select id="category">' +
										'</select></br>' +
									'<label for="sscategory">SCategP</label>' +
										'<select id="sscategory">' +

										'</select></br>' +
									'<label id="fromus_quantite" for="quantite">QuantityP</label><input id="QteSpinner" value="1"></br>' +
									'<label id="fromus_assurance" for="assurance">InsuranceP</label>' +
									'<div id="fromus_divassurance">' +
										'<input type="checkbox" id="fromus_checkassurance" name="assurance" />' +
									'</div>' +
								'</form>' +
							'</div>' +
							'<div id="fromus_tabs-2">' +
								'<h2>From-us.com</h2>' +

								'<p>MsgIdPass</p>' +
								'<label for="idfromus">EmailU</label><input type="textbox" id="idfromus" /></br>' +
								'<label for="mdpfromus">PasswordU</label><input type="password" id="mdpfromus" /></br>' +

								'<input type="button" value="login" id="log" />' +
								'<a id="login" href="http://from-us.com/fromus" target="_blank">OubliU</a>' +
								'<a id="create" href="http://from-us.com/fromus" target="_blank">CreateU</a>' +
							'</div>' +
						'</div>' +
						'<a href="http://from-us.com/fromus" target=_blank><img id="logofromus" height="100" src=""/></a>' +
					'</div>');

	// variable qui permet de savoir si la dialog box est ouverte
	var isOpen = $("#fromus_dialogBox").dialog("isOpen");
	console.log("apres la trad");

	
	if (isOpen != true) {	

		newDialog.tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
		newDialog.removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
		console.log("apres tabs vertical");
		newDialog.dialog({
	    	modal: false,
			title: "From-us.com",
			//show: 'clip',
			//hide: 'clip',
			//autoOpen: false
			position: 
				{
					my: "right top", 
					at: "right top"
				},
			height: 400,
			width: 880,
			resizable: true,
			closeOnEscape: true,

			// bouton X => ferme la pop up
			close: function(ev,ui) {
				$(this).remove();
			},

			// au demarrage on cache le bouton commander, la quantité et l'assurance
			open: function(ev,ui) {
				//var img = document.getElementById('logofromus');
  				//img.src = chrome.extension.getURL('/img/logo.png');
  				$("#btnSubmit").hide();
  				$("#QteSpinner").hide();
				$("#fromus_quantite").hide();
				$("#fromus_assurance").hide();
				$("#fromus_divassurance").hide();
			},

			buttons: 
				[
					// bouton submit qui permet de commander un produit 
					{
						text: "ButtonBuy", 
						id: "btnSubmit",
						click: function() {

							var qteSpinner = document.getElementById("QteSpinner");
							qteVal = qteSpinner.value;
							var categSelect = document.getElementById("sscategory");
							categVal = categSelect.value;

							var jsonProduct = {prd_libelle: regName ,prd_site: regOffer, prd_desc: regDesc, prd_visu: regVisu, prd_prix: regPrice, prd_cat: categVal};
							var postData = JSON.stringify(jsonProduct);
							var productJSON = {product:postData};
							sendToServer(_urlProduct+token,productJSON);


							var jsonCalcul = {libelle: regName, qte: qteVal ,montant: regPrice ,categ: categVal};
							var postDataCalcul = JSON.stringify(jsonCalcul);
							var calculJSON = {calcul:postDataCalcul};
							sendToServer(_urlCalcul+token , calculJSON);
						}
					},		
				
					// bouton ajouter qui permet d'ajouter un produit dans la base de données 
					// à ne pas confondre avec le bouton submit 
					{ 
						text: "ButtonAdd", 
						id: "btnAdd",
						click: function() {

							var qteSpinner = document.getElementById("QteSpinner");
							qteVal = qteSpinner.value;
							var categSelect = document.getElementById("sscategory");
							categVal = categSelect.value;

							var jsonProduct = {prd_libelle: regName ,prd_site: regOffer, prd_desc: regDesc, prd_visu: regVisu, prd_prix: regPrice, prd_cat: categVal};
							var postData = JSON.stringify(jsonProduct);
							var productJSON = {product:postData};
							sendToServer(_urlProduct+token , productJSON);
						}
					},


					// bouton cancel, mettre destroy au lieu de close pour supprimer completement la dialog box
					// à modifier en bouton reset
					{
						text: "Reset", 
						id: "btnReset",
						click: function() {
							$(':input','#fromusForm')
							   .not(':button, :submit, :reset, :hidden')
							   .val('')
							   .removeAttr('checked')
							   .removeAttr('selected');
						}
					},
				]
	    });

		console.log("apres newDialog");

		var bindEvent = function(elem ,evt,cb) {
			//vérifie si addEventListenerexiste dans l'élément
			if ( elem.addEventListener ) {
				elem.addEventListener(evt,cb,false);
		        //si addEventListener n'est pas présent, vérifie si le navigateur est une version  d'IE
		        } else if ( elem.attachEvent ) {
				//ajoute le préfixe "on" à l'event
				elem.attachEvent('on' + evt, function(){
					// Simule addEventListener ; s'assure que le callback obtient l'élément pour "this" et s'assure que le premier élément de la fonction est un event
					cb.call(event.srcElement,event);
				});
			}
		}

		

		newDialog.tabs({
			active: 0,
			activate: function(event,ui) {

				bindEvent(document,'click', function(event) 
					{ 
						var target = event.target || event.srcElement;
						var tabclick = target.textContent;
					
						// si bouton commander on affiche comander, reset, quantite et assurance
						// et on cache le bouton ajouter
						if (/Commander/.test(tabclick) || /Buy/.test(tabclick)) {
							$("#btnSubmit").show();
							$("#btnReset").show();
							$("#btnAdd").hide();
							$("#QteSpinner").show();
							$("#fromus_quantite").show();
							$("#fromus_assurance").show();
							$("#fromus_divassurance").show();
						}

						// si bouton ajouter on affiche bouton ajouter, reset
						// et on cache bouton commander, quantite et assurance
						if (/Ajouter/.test(tabclick)|| /Add/.test(tabclick)) {
							$("#btnAdd").show();
							$("#btnReset").show();
							$("#btnSubmit").hide();
							$("#QteSpinner").hide();
							$("#fromus_quantite").hide();
							$("#fromus_assurance").hide();
							$("#fromus_divassurance").hide();
							
						}

						// si bouton mon compte on cache bouton ajouter, commander et reset
						if (/Mon compte/.test(tabclick)|| /My account/.test(tabclick)) {
							$("#btnAdd").hide();
							$("#btnReset").hide();
							$("#btnSubmit").hide();
						}

					this.removeEventListener('click',arguments.callee,false);
					});
			}
  		});

		console.log("apres dialog tabs");
						
		// creation du spinner pour la quantite
		var newSpinner = $( "#QteSpinner" ).spinner({
			min: 1
		});	

		/*var value;
		var $container=$("#QteSpinner");
		var newSpinner = $container.spinner({
		        min: 1,
		    }).focus(function () {
		        value = $container.val();
		    }).blur(function () {
		        var value1 = $container.val();
		        if (value1<0) {
		           $container.val(value);
		        }
		        if(isNaN(value1))
		        {
		           $container.val(value);
		        } 

		    });*/


		// ajout du marchand automatiquement
		regStore = localStorage["regStore"];
		$('#fromus_store').attr('value',regStore);

		// ajout du nom automatiquement
		regName = localStorage["regName"];
		$('#fromus_name').attr('value',regName);

		// ajout du prix automatiquement
		regPrice = localStorage["regPrice"];
		$('#fromus_price').attr('value',regPrice);

		regOffer = localStorage["regOffer"];

		regDesc = localStorage["regDesc"];

		regVisu = localStorage["regImg"];

		console.log("apres ajout automatiquement");

		console.log("avant d'appuyer sur le bouton : " + localStorage["regName"]);

		var fromus_morename = document.getElementById('fromus_morename');
		/*var runtimeOrExtension = chrome.runtime && chrome.runtime.sendMessage ?
 		'runtime' : 'extension';
		fromus_morename.addEventListener('click', function(e){
			console.log('morename');
			console.log("avant d'executer le script : " + localStorage["regName"]);
			var start = new Date().getTime();
			localStorage["fromus_morename"] =	JSON.stringify(true);
			chrome[runtimeOrExtension].sendMessage({greeting: "hello"}, function(response) {
  			console.log(response.farewell);
  		});
			var end = new Date().getTime();
			var time = end - start;
			var timeafterbtn = time + 15;
			
			setTimeout(function () {
	        	$('#fromus_name').attr('value',localStorage["regName"]);
	        	console.log("apres avoir d'executer le script : " + localStorage["regName"]);
        	}, timeafterbtn);
			
			
		}, false);

		var fromus_moreprice = document.getElementById('fromus_moreprice');
		var runtimeOrExtension = chrome.runtime && chrome.runtime.sendMessage ?
 		'runtime' : 'extension';
		fromus_moreprice.addEventListener('click', function(e){
			console.log('moreprice');
			console.log("avant d'executer le script : " + localStorage["regPrice"]);
			var start = new Date().getTime();
			localStorage["fromus_moreprice"] =	JSON.stringify(true);
			chrome[runtimeOrExtension].sendMessage({greeting: "youhou"}, function(response) {
  			console.log(response.farewell);
  		});
			var end = new Date().getTime();
			var time = end - start;
			var timeafterbtn = time + 15;
			
			setTimeout(function () {
	        	$('#fromus_price').attr('value',localStorage["regPrice"]);
	        	console.log("apres avoir d'executer le script : " + localStorage["regPrice"]);
        	}, timeafterbtn);
			
			
		}, false);

		console.log("apres btn morename et moreprice");*/

		


		//Action sur le bouton login/logout
		var in_out = document.getElementById('log');
		in_out.addEventListener('click', function(e){
			if ( in_out.value == "login" ){
		    	in_out.value = "logout";
		    	var getemail = document.getElementById("idfromus");
				var getpassword = document.getElementById("mdpfromus");
				var emailV = getemail.value;
				var passwordV = getpassword.value;
				document.getElementById("idfromus").value='';
				document.getElementById("mdpfromus").value='';
				if (emailV && passwordV){
					var jsonLog = {email: emailV ,password: passwordV};
					var postLog = JSON.stringify(jsonLog);
					var logJSON = {log:postLog};
					sendToServer(_urlLogin, logJSON);
					
				}
		    }
		    else{
		        in_out.value = "login";
		    	sendToServer(_urlLogout+token, {});
		    	eraseCookie('token');
		    	eraseCookie('Nick_Name');
		    	
			}
				    
		}, false);

		console.log("apres btn login logout");

		//action sur le select de categorie pour la mise a jour de sscategory
		var categ = document.getElementById('category');
		categ.addEventListener('change', function(e){
			var categV = categ.value;
			if (categV){
				sendToServer(_urlSSCategorie+categV, {});
		    }    
		}, false);


		// ouverture de la dialog box
		newDialog.dialog("open");

		//Recupere la liste de catégorie
		sendToServer(_urlCategorie,{});

		//Récupere le token 
		if(readCookie('token')){
			token=readCookie('token');
			(!token)?in_out.value = 'login' : in_out.value = 'logout';
			document.getElementById("Nick_Name").value = "MsgWelcome"+readCookie('Nick_Name');
		}
		else
			document.getElementById("Nick_Name").value = "MsgConnect";
			//alert('Vous devez vous connecter');

				
		// suppression des key dans le localstorage
		localStorage.removeItem('regDesc');
		localStorage.removeItem('regName');
		localStorage.removeItem('regPrice');
		localStorage.removeItem('regStore');
		localStorage.removeItem('regOffer');

		console.log("fin de script");
	}		
	
