// Code JavaScript écrit par BERGS Guillaume (Contact: guillaume.robert.bergs@gmail.com)		//
// Dans le cadre de son stage du 15/04/13 au 24/06/13																				//
//																																												//
// Objectif du script: 	Récupérer les informations de nom, site, page, image, description 				//
//										et prix de l'offre.																											//
//																																												//


/////	Définition des variables	/////

var fromus_offre = document.location.href;		//récupération de l'adresse du l'offre
var fromus_site = /http[s]{0,1}\:\/\/(.*\.com)/gi.exec(fromus_offre)[1];	//stockage du site web où se trouve l'offre
var fromus_objectname,
fromus_objectnametmp,		// Les variables tmp sont des variables temporaires requises pour le traitement d'un nombre considérable de sites
fromus_pricemin,			// Le "fromus_" permet d'empêcher les conflits lors de l'utilisation du code dans une application, une extension ou un plugin
fromus_pricemintmp,	
fromus_imgtmp,
fromus_img,
fromus_desc,
fromus_desctmp;
var fromus_reg = /(\$[0-9\,]{0,}[\.0-9]{0,3})/g;
var fromus_sitelist = new Array();

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

//déclaration de dogfunk

fromus_sitelist['www.dogfunk.com'] = new fromus_siteObj();

fromus_sitelist['www.dogfunk.com'].name_id[1]='buy_box_title';

fromus_sitelist['www.dogfunk.com'].price_id[1]='sales_price';

fromus_sitelist['www.dogfunk.com'].img_id[1]='main_product_image';

fromus_sitelist['www.dogfunk.com'].desc_id[1]='desc_and_bottom_line';


/////	Normalisation des sites du type quelquechose.nomdusite.com	/////	

if(/(\.rakuten)/.test(fromus_site))
{
	fromus_site = "www.rakuten.com";
}
else
{
	if(/(\.gap)/.test(fromus_site))
	{
		fromus_site = "www.gap.com";
	}
	else	
	{
		if(/(\.nike)/.test(fromus_site))
		{
			fromus_site = "www.nike.com";
		}
		else
		{
			if(/(qvc\.com)/.test(fromus_site))
			{
				fromus_site = "www.qvc.com";
			}
		}
	}
	
}

// regex pour supprimmer www.         
var regStore = fromus_site.replace(/www\./,'');

// stockage du marchand dans local storage 
localStorage["regStore"] = regStore;	

if( fromus_sitelist[fromus_site] != undefined)
{
	//name
	for(var fromus_i = 0 ; (fromus_i < fromus_sitelist[fromus_site].name_id.length) && (fromus_objectname === undefined) ; fromus_i++)
	{
	var fromus_name_id = document.getElementById(fromus_sitelist[fromus_site].name_id[fromus_i]);
		if(fromus_name_id)
		{
			fromus_objectname = fromus_name_id.textContent;
		}
	}
	
	if(fromus_objectname === undefined)
	{
		for(var fromus_i = 0 ; (fromus_i < fromus_sitelist[fromus_site].name_class.length) && (fromus_objectname === undefined) ; fromus_i++)
		{
			var fromus_name_class = document.getElementsByClassName(fromus_sitelist[fromus_site].name_class[fromus_i])[0];
			if(fromus_name_class)
			{
				fromus_objectname = fromus_name_class.textContent;
			}
		}
	}
	
	if(fromus_objectname === undefined)
	{
		fromus_objectname = 'error';
	}
	
	
	//price 
	for(var fromus_i = 0 ; (fromus_i < fromus_sitelist[fromus_site].name_id.length) && (fromus_pricemin === undefined) ; fromus_i++)
	{
		var fromus_price_id = document.getElementById(fromus_sitelist[fromus_site].price_id[fromus_i]);
		if(fromus_price_id)
		{
			fromus_pricemin = fromus_price_id.textContent;
		}
	}
	
	if(fromus_pricemin === undefined)
	{
		for(var fromus_i = 0 ; (fromus_i < fromus_sitelist[fromus_site].name_class.length) && (fromus_pricemin === undefined) ; fromus_i++)
		{
			var fromus_price_class = document.getElementsByClassName(fromus_sitelist[fromus_site].price_class[fromus_i])[0];
			if(fromus_price_class)
			{
				fromus_pricemin = fromus_price_class.textContent;
			}
		}
	}
	
	if(fromus_pricemin === undefined)
	{
		fromus_pricemin = 'error';
	}
	
	//img 
	for(var fromus_i = 0 ; (fromus_i < fromus_sitelist[fromus_site].img_id.length) && (fromus_img === undefined) ; fromus_i++)
	{
		var fromus_img_id = document.getElementById(fromus_sitelist[fromus_site].img_id[fromus_i]);
		if(fromus_img_id)
		{
				if(fromus_img_id.href!=undefined)
				{
					fromus_img	=	fromus_img_id.href;
				}
				if(fromus_img_id.src!=undefined)
				{
					fromus_img	=	fromus_img_id.src;
				}
			
		}
	}
	
	if(fromus_img === undefined)
	{
		for(var fromus_i = 0 ; (fromus_i < fromus_sitelist[fromus_site].img_class.length) && (fromus_img === undefined) ; fromus_i++)
		{
		var fromus_img_class = document.getElementsByClassName(fromus_sitelist[fromus_site].img_class[fromus_i])[0];
			if(fromus_img_class)
			{
				if(fromus_img_class.href != undefined)
				{
					fromus_img = fromus_img_class.href;
				}
				if(fromus_img = fromus_img_class.src != undefined)
				{
					fromus_img = fromus_img_class.src;
				}
			}
		}
	}
	
	if(fromus_img === undefined)
	{
		fromus_img = 'error';
	}
	
	//desc 
	for(var fromus_i = 0 ; (fromus_i < fromus_sitelist[fromus_site].desc_id.length) && (fromus_desc === undefined) ; fromus_i++)
	{
		var fromus_desc_id = document.getElementById(fromus_sitelist[fromus_site].desc_id[fromus_i]);
		if(fromus_desc_id)
		{
			fromus_desc = fromus_desc_id.textContent;
		}
	}
	
	if(fromus_desc === undefined)
	{
		for(var fromus_i = 0 ; (fromus_i < fromus_sitelist[fromus_site].desc_class.length) && (fromus_desc === undefined) ; fromus_i++)
		{
			var fromus_desc_class = document.getElementsByClassName(fromus_sitelist[fromus_site].desc_class[fromus_i])[0];
			if(fromus_desc_class)
			{
				fromus_desc = fromus_desc_class.textContent;
			}
		}
	}
	
	if(fromus_desc === undefined)
	{
		fromus_desc = 'error';
	}
	
}

else
{
	fromus_desc='error'
	fromus_img='error';
	fromus_objectname='error';
	fromus_pricemin='error';
}

if((fromus_desc===undefined) ||(fromus_desc==undefined)||(fromus_desc=='undefined')|| ( /[\S]{1,}/g.test(fromus_desc)==false ) )//En cas d'absence de description, utiliser le nom du produit.
{
	fromus_desc									=	fromus_objectname;
}

//Début de la section "limitation de la longueur des données".
if(fromus_desc.length > 200)
{
	fromus_desc									=	fromus_desc.substring(0,195)+"[...]";
}
fromus_objectname						=	fromus_objectname.replace(/\n/g,'').substring(0,100);
fromus_pricemin							=	fromus_pricemin.replace(/\$/g,'');
fromus_pricemin							=	parseFloat(/[0-9\.]{1,}/g.exec(fromus_pricemin.replace(',',''))[0]);

// stockage du nom dans local storage
localStorage["regName"] = fromus_objectname;

// stockage du prix dans local storage
localStorage["regPrice"] = fromus_pricemin;

// stockage de la description dans local storage
localStorage["regDesc"] = fromus_desc;

// stockage du visuel dans local storage
localStorage["regImg"] = fromus_img;

// stockage de la page du site dans local storage
var wwwOffre = fromus_offre.replace(/www\./,'');
localStorage["regOffer"] = /http[s]{0,1}\:\/\/(.*)/gi.exec(wwwOffre)[1];	
//localStorage["regOffer"] = fromus_offre;	