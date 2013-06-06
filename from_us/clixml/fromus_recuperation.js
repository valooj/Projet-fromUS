console.log('lancement du script');
// Code JavaScript écrit par BERGS Guillaume (Contact: guillaume.robert.bergs@gmail.com)		//
// Dans le cadre de son stage du 15/04/13 au 24/06/13																				//
//																																												//
// Objectif du script: 	Récupérer les informations de nom, site, page, image, description 				//
//										et prix de l'offre.																											//
//																																												//

/////	Définition des variables	/////

var fromus_offre = document.location.href;		//récupération de l'adresse du l'offre
var fromus_site = 'www'+ /.*(\..*\.[a-z]{2,3})\//gi.exec(fromus_offre)[1];	//stockage du site web où se trouve l'offre
var fromus_objectname,
fromus_objectnametmp,		// Les variables tmp sont des variables temporaires requises pour le traitement d'un nombre considérable de sites
fromus_pricemin,					// Le "fromus_" permet d'empêcher les conflits lors de l'utilisation du code dans une application, une extension ou un plugin
fromus_pricemintmp,	
fromus_imgtmp,
fromus_img,
fromus_desc,
fromus_desctmp = null;
var fromus_reg = /(\$[0-9\,]{0,}[\.0-9]{0,3})/g;	// Permet de récupérer un prix
var fromus_sitelist = new Array();			// Tableau contenant les sites
var fromus_error	=	'?';						// Message à afficher en absence de résultat
var fromus_moreprice,
fromus_morename,
fromus_moreimg,		// Ces variables servent à indiquer si l'utilisateur a demandé un/e autre nom, prix, description, image
fromus_moredesc; 

/************************************************************************************************/
/*																							  	*/
/*	Un site est traité comme un objet; ses attributs sont des tableaux.						  	*/
/*	Il y a deux tableaux par donnée à récupérer, un pour les classes et un pour les id.			*/
/*																								*/
/************************************************************************************************/

function fromus_siteObj() 
{
	this.name_id= new Array();
	this.name_class= new Array();
	
	this.price_id= new Array();
	this.price_class= new Array();
	
	this.img_id= new Array();
	this.img_class= new Array();
	
	this.desc_id= new Array();;
	this.desc_class= new Array();
}

/////////////////////////////////////// Début de la déclaration des fonctions de récupération ///////////////////////////////////////

function fromus_recupName(idclass)
{
	if(idclass == 'id')
	{
		fromus_sitelist[fromus_site].name_id = request.data.split(';');
		fromus_sitelist[fromus_site].name_class.push('');		
	}
	else
	{
		fromus_sitelist[fromus_site].name_class = request.data.split(';');
		fromus_sitelist[fromus_site].name_id.push('');		
	}
	/////////////////////////////////////// Début de l'attribution des valeurs aux indicateurs ///////////////////////////////////////
	if(localStorage["fromus_morename"])
	{
		fromus_morename = JSON.parse(localStorage["fromus_morename"]);
	}
	else
	{
		fromus_morename = false;
	}
	///////////////////////////////////////////////////// Partie cherchant l'info /////////////////////////////////////////////////////
	//name
	if(fromus_morename)
	{
		fromus_i = parseInt(localStorage["fromus_iname"]);
		fromus_objectname	=	'';
	}
	else
	{
		fromus_i = 0;
	}
	
	for(fromus_i ; (fromus_i < fromus_sitelist[fromus_site].name_id.length) && !(fromus_objectname) ; fromus_i++)
	{	//Boucle parcourant les id connus du site pour voir si l'un d'eux est présent sur la page.
		
		var fromus_name_id = document.getElementById(fromus_sitelist[fromus_site].name_id[fromus_i]);
		if(fromus_name_id)
		{	//S'il y a un résultat, l'enregistrer
			fromus_objectname = fromus_name_id.textContent;
			localStorage["fromus_iname"] = fromus_i + 1 ;
		}
	}
	
	if(fromus_morename)
	{
		fromus_i = parseInt(localStorage["fromus_iname"]);
		fromus_objectname	=	'';
	}
	else
	{
		fromus_i = 0;
	}
	
	if(!fromus_objectname)
	{	//S'il n'y a pas eu de résultat, faire la recherche dans le tableau contenant les classes
		for(fromus_i ; (fromus_i < fromus_sitelist[fromus_site].name_class.length) && !(fromus_objectname) ; fromus_i++)
		{
			var fromus_name_class = document.getElementsByClassName(fromus_sitelist[fromus_site].name_class[fromus_i])[0];
			if(fromus_name_class)
			{
				fromus_objectname = fromus_name_class.textContent;
				localStorage["fromus_iname"] = fromus_i + 1;	
			}
		}
	}
	
	if(!(fromus_objectname))
	{	// S'il n'y a eu aucun résultat...
		fromus_objectname = fromus_error;
	}
	
	fromus_objectname			=	fromus_objectname.replace(/^[\s]{0,}/,'').replace(/\n.*/g,'').substring(0,100);
	
	// stockage du nom dans local storage
	localStorage["regName"] = fromus_objectname;
	//Mise à zéro des indicateurs
	localStorage["fromus_morename"] =	JSON.stringify(false);
}

function fromus_recupPrice(idclass)
{
	if(idclass == 'id')
	{
		fromus_sitelist[fromus_site].price_id = request.data.split(';');
		fromus_sitelist[fromus_site].price_class.push('');		
	}
	else
	{
		fromus_sitelist[fromus_site].price_class = request.data.split(';');
		fromus_sitelist[fromus_site].price_id.push('');		
	}
	/////////////////////////////////////// Début de l'attribution des valeurs aux indicateurs ///////////////////////////////////////
	if(localStorage["fromus_moreprice"])
	{
		fromus_moreprice = JSON.parse(localStorage["fromus_moreprice"]);
	}
	else
	{
		fromus_moreprice = false;
	}
	///////////////////////////////////////////////////// Partie cherchant l'info /////////////////////////////////////////////////////
	//price			
	if(fromus_moreprice)
	{
		fromus_i = parseInt(localStorage["fromus_iprice"]);
		fromus_pricemin = '';
	}
	else
	{
		fromus_i = 0;
	}
	
	for(fromus_i ; (fromus_i < fromus_sitelist[fromus_site].price_id.length) && !(fromus_pricemin) ; fromus_i++)
	{	//Boucle parcourant les id connus du site pour voir si l'un d'eux est présent sur la page.
		var fromus_price_id = document.getElementById(fromus_sitelist[fromus_site].price_id[fromus_i]);
		if(fromus_price_id)
		{	//S'il y a un résultat, l'enregistrer
			fromus_pricemin = fromus_price_id.textContent;
			localStorage["fromus_iprice"] = fromus_i + 1;
		}
	}
	
	if(fromus_moreprice)
	{
		fromus_i = parseInt(localStorage["fromus_iprice"]);
		fromus_pricemin = '';
	}
	else
	{
		fromus_i = 0;
	}	
	
	if(!(fromus_pricemin))
	{	//S'il n'y a pas eu de résultat, faire la recherche dans le tableau contenant les classes
		for(fromus_i ; (fromus_i < fromus_sitelist[fromus_site].price_class.length) && !(fromus_pricemin) ; fromus_i++)
		{
			var fromus_price_class = document.getElementsByClassName(fromus_sitelist[fromus_site].price_class[fromus_i])[0];
			if(fromus_price_class)
			{
				fromus_pricemin = fromus_price_class.textContent;
				localStorage["fromus_iprice"] = fromus_i + 1;
			}
		}
	}
	
	if(!(fromus_pricemin))
	{	// S'il n'y a eu aucun résultat...
		fromus_pricemin = fromus_error;
	}
	
	if(typeof(fromus_pricemin)=='string')
	{
		fromus_pricemin			=	fromus_pricemin.replace(/\$/g,'').replace(',','');
		if( /[0-9\.]{1,}/g.test(fromus_pricemin))
		{
			fromus_pricemin		=	parseFloat(/[0-9\.]{1,}/g.exec(fromus_pricemin)[0]);
		}
	}	
	
	// stockage du prix dans local storage
	localStorage["regPrice"] = fromus_pricemin;	
	//Mise à zéro des indicateurs
	localStorage["fromus_moreprice"]	=	JSON.stringify(false);
}

function fromus_recupImg(idclass)
{
	if(idclass == 'id')
	{
		fromus_sitelist[fromus_site].img_id = request.data.split(';');
		fromus_sitelist[fromus_site].img_class.push('');		
	}
	else
	{
		fromus_sitelist[fromus_site].img_class = request.data.split(';');
		fromus_sitelist[fromus_site].img_id.push('');		
	}
	/////////////////////////////////////// Début de l'attribution des valeurs aux indicateurs ///////////////////////////////////////
	if(localStorage["fromus_moreimg"])
	{
		fromus_moreimg = JSON.parse(localStorage["fromus_moreimg"]);
	}
	else
	{
		fromus_moreimg= false;
	}
	///////////////////////////////////////////////////// Partie cherchant l'info /////////////////////////////////////////////////////
	//img 		
	if(fromus_moreimg)
	{
		fromus_i = parseInt(localStorage["fromus_iimg"]);
		fromus_img = '';
	}
	else
	{
		fromus_i = 0;
	}		
	
	for(fromus_i ; (fromus_i < fromus_sitelist[fromus_site].img_id.length) && !(fromus_img) ; fromus_i++)
	{	//Boucle parcourant les id connus du site pour voir si l'un d'eux est présent sur la page.
		var fromus_img_id = document.getElementById(fromus_sitelist[fromus_site].img_id[fromus_i]);
		if(fromus_img_id)
		{	//S'il y a un résultat, vérifier s'il a un src ou un href et l'enregistrer le cas échéant
			if(fromus_img_id.href!=undefined)
			{
				fromus_img	=	fromus_img_id.href;
				localStorage["fromus_iimg"] = fromus_i + 1;
			}
			if(fromus_img_id.src!=undefined)
			{
				fromus_img	=	fromus_img_id.src;
				localStorage["fromus_iimg"] = fromus_i + 1;
			}
		}
	}
	
	if(fromus_moreimg)
	{
		fromus_i = parseInt(localStorage["fromus_iimg"]);
		fromus_img = '';
	}
	else
	{
		fromus_i = 0;
	}			
	
	if(!(fromus_img))
	{//S'il n'y a pas eu de résultat, faire la recherche dans le tableau contenant les classes
		for(fromus_i ; (fromus_i < fromus_sitelist[fromus_site].img_class.length) && !(fromus_img) ; fromus_i++)
		{
			var fromus_img_class = document.getElementsByClassName(fromus_sitelist[fromus_site].img_class[fromus_i])[0];
			if(fromus_img_class)
			{
				if(fromus_img_class.href)
				{
					fromus_img = fromus_img_class.href;
					localStorage["fromus_iimg"] = fromus_i + 1;
				}
				if(fromus_img_class.src)
				{
					fromus_img = fromus_img_class.src;
					localStorage["fromus_iimg"] = fromus_i + 1;
				}
			}
		}
	}
	
	if(!(fromus_img))
	{	// S'il n'y a eu aucun résultat...
		fromus_img = fromus_error;
	}
	
	if(fromus_moredesc)
	{
		fromus_i = parseInt(localStorage["fromus_idesc"]);
		fromus_desc	=	'';
	}
	else
	{
		fromus_i = 0;
	}			

	// stockage du visuel dans local storage
	localStorage["regImg"] = fromus_img;
	//Mise à zéro des indicateurs	
	localStorage["fromus_moreimg"]	=	JSON.stringify(false);
}

function fromus_recupDesc(idclass)
{
	if(idclass == 'id')
	{
		fromus_sitelist[fromus_site].desc_id = request.data.split(';');
		fromus_sitelist[fromus_site].desc_class.push('');		
	}
	else
	{
		fromus_sitelist[fromus_site].desc_class = request.data.split(';');
		fromus_sitelist[fromus_site].desc_id.push('');		
	}
	/////////////////////////////////////// Début de l'attribution des valeurs aux indicateurs ///////////////////////////////////////
	if(localStorage["fromus_moredesc"])
	{
		fromus_moredesc = JSON.parse(localStorage["fromus_moredesc"]);
	}
	else
	{
		fromus_moredesc = false;
	}	
	///////////////////////////////////////////////////// Partie cherchant l'info /////////////////////////////////////////////////////
	//desc 
	for(fromus_i ; (fromus_i < fromus_sitelist[fromus_site].desc_id.length) && !(fromus_desc) ; fromus_i++)
	{	//Boucle parcourant les id connus du site pour voir si l'un d'eux est présent sur la page.
		var fromus_desc_id = document.getElementById(fromus_sitelist[fromus_site].desc_id[fromus_i]);
		if(fromus_desc_id)
		{	//S'il y a un résultat, l'enregistrer
			fromus_desc = fromus_desc_id.textContent;
			localStorage["fromus_idesc"] = fromus_i + 1;
		}
	}
	
	if(fromus_moredesc)
	{
		fromus_i = parseInt(localStorage["fromus_idesc"]);
		fromus_desc	=	'';
	}
	else
	{
		fromus_i = 0;
	}				
	
	if(!(fromus_desc))
	{	//S'il n'y a pas eu de résultat, faire la recherche dans le tableau contenant les classes
		for(fromus_i ; (fromus_i < fromus_sitelist[fromus_site].desc_class.length) && !(fromus_desc) ; fromus_i++)
		{
			var fromus_desc_class = document.getElementsByClassName(fromus_sitelist[fromus_site].desc_class[fromus_i])[0];
			if(fromus_desc_class)
			{
				fromus_desc = fromus_desc_class.textContent;
				localStorage["fromus_idesc"] = fromus_i + 1;
			}
		}
	}
	
	if(!(fromus_desc))
	{	// S'il n'y a eu aucun résultat...
		fromus_desc = fromus_error;
	}
	
	if((fromus_desc===undefined) ||(fromus_desc==undefined)||(fromus_desc=='undefined')|| ( /[\S]{1,}/g.test(fromus_desc)==false ) )
	{//En cas d'absence de description, utiliser le nom du produit.
		fromus_desc =	fromus_objectname;
	}

	// stockage de la description dans local storage
	localStorage["regDesc"] = fromus_desc;
	
	//Mise à zéro des indicateurs
	localStorage["fromus_moredesc"]	=	JSON.stringify(false);

}
///////////////////////////////////////////////////// Partie cherchant l'info /////////////////////////////////////////////////////

// stockage du marchand dans local storage 
localStorage["regStore"] = fromus_site;	
console.log('localStorage 1'+localStorage("regStore"));
if( fromus_sitelist[fromus_site])
{	//Si le site est connu

}
else
{	// Si le site n'est pas enregistré
	fromus_desc=fromus_error;
	fromus_img=fromus_error;
	fromus_objectname=fromus_error;
	fromus_pricemin=fromus_error;
}

//Début de la section "limitation de la longueur des données".
if(fromus_desc.length > 200)
{
	fromus_desc					=	fromus_desc.substring(0,195)+"[...]";
}

// stockage de la page du site dans local storage
var wwwOffre = fromus_offre.replace(/www\./,'');
localStorage["regOffer"] = /http[s]{0,1}\:\/\/(.*)/gi.exec(wwwOffre)[1];	
//localStorage["regOffer"] = fromus_offre;
console.log('localStorage 2'+localStorage("regStore"));
