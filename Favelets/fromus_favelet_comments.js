// Code JavaScript écrit par BERGS Guillaume (Contact: guillaume.robert.bergs@gmail.com)		//
// Dans le cadre de son stage du 15/04/13 au 24/06/13											//
//																								//
// Objectif du script: Récupérer les informations de nom, site, page, image et prix de l'offre.	//
//																								//
// NB: Utiliser le fichier favelet.js comme favelet. N'utiliser le code suivant que				//
// dans une application, un plugin ou autre page web. La présence de commentaires				//
// empêche l'utilisation de ce code comme favelet.												//
//																								//
// Ajouter des sites est simple: il suffit d'ajouter des "case" supplémentaires tout en 		//
// suivant la structure déjà existante.															//
// NB: En cas de site dont l'url est de type domaine1.site.com , domaine2.site.com ,			//
//  , domaine3.site.com, avec domaine le secteur d'activité (babies.site.com et 				//
//	outdoor.site.com par exemple) il est IMPERATIF de rajouter une ligne dans la section		//	
//	"Normalisation des sites du type quelquechose.nomdusite.com", suivant le modèle				//
//	existant. Cela permet de n'écrire qu'un "case" pour tout le site au lieu d'un "case"		//
//	par secteur d'activité. En plus de diminuer le temps nécessaire à écrire le code,			//
//	cela réduit le temps nécessaire au chargement du script.									//
//																								//
// Actuellement, les offre "Kindle" du site amazon.com ne sont pas supportées:					//
// chaque produit de la gamme a une page web utilisant une structure qui lui est propre.		//
// 																								//
// Walmart n'a pas le support des previews.														//
// 																								//
// 																								//
// 																								//
// 																								//
// 																								//
// shop 11 http://www.ebay.com reporté.															//
// shop 13 endless a été racheté par amazon														//
// 																								//
// shop 16 http://www.guess.eu ne correspond pas à from-us										//	
// shop 29 www.nike.com : les pages de customisation produit ne sont pas traitées, car			//
// 			elles sont en flash.																//
// shop 30 inaccessible (24 avril 2013)															//	
// shop 32 = gap, qui est déjà fait.															//
// shop 36 = ralphlauren.com qui est déjà fait													//
// shop 38 http://www.saksfifthavenue.com utilise flash pour ses images							//
// shop 39 inaccessible (25 avril 2013)															//
// shop 41 www.sierratradingpost.com n'a pas de récupération dans les previews					//
// shop 52 www.altrec.com ne marche pas si présence de vidéo comme image						//
// shop 84 www.anthropologie.eu ne correspond pas à from_us										//
// shop 86 www.bestbuy.com n'a pas le support des pages offres spéciales DELL					//
// shop 88 http://www.maccosmetics.com reporté													//
// shop 89 www.toofaced.com : les previews ne fonctionnent pas									//
// shop 91 www.covergirl.com : ne fait que rediriger (ex: vers walmart) sans indiquer de prix	//																				//
// shop 97 = shop 98 (www.victoriassecret.com)													//
// shop 100 http://www.chinaglaze.com/ ne vend rien en ligne?									//
// shop 103 www.dell.com reporté																//
// shop 104 www.ford.com reporté																//
// shop 105 www.chevrolet.com : support des pages de type présentation et "build your own"		//
// shop 111 www.lincoln.com "build your own" en flash et images des pages de présentation gérées//
//			de la même façon.																	//
// shop 113 www.shelby.com reporté																//
// shop 115 www.hummer.com ne permet pas l'achat et redirige vers general motors				//
// shop 116 www.pontiac.com ne permet pas l'achat et redirige vers general motors				//
// shop 118 www.saturn.com ne permet pas l'achat et redirige vers general motors				//
// shop 119 www.harley-davidson.com reporté														//
// shop 120 www.shercousa.com ne vends rien. Le plus proche est une liste de petites annonces.	//
// shop 121 www.atkmotorcyclesusa.com est en flash												//
// shop 122 www.buell.com ne vend rien, mais redirige vers des tiers.							//
// shop 123 www.indianmotorcycle.com les previews ne sont pas supportées, aucune raison 		//
//			rationnelle apparente. Un id présent sur la page est considéré comme indéfini.		//
// shop 124 à 127 = www. fossil.com																//
// shop 128 à 132 http://www.michaelkors.com/ reporté											//
// shop 134-135 www.converse.com entièrement en flash											//
// shop 137 à 139 = www.bebe.com																//
// shop 140 à 143 = www.shopblackjack.com														//
// shop 143 à 145 = www.hottopic.com															//
// shop 146 à 153 www.shopkitson.com reporté													//
//																								//
//																								//
//																								//
//																								//
//																								//
//																								//
//																								//
//																								//
// Les outfits de gymboree.com ne sont pas supportés, ils sont  composés de produits			//
//	individuels accessibles séparément au même prix.											//
//																								//
//	Les shops reportés sont majoritairement ceux qui présentent une structure complexe au 		//
//	premier abord et sembleraient nécessiter beaucoup de temps pour leur support.				//
//	Ex: Ford a un mix de flash et de html pour certaines pages, que du flash pour d'autres.		//
//		Le support partiel est donc possible, mais nécessite beaucoup de code comparé à d'autres//
//																								//
//																								//
//																								//
//																								//
//																								//	

//javascript:	// Permet l'exécution comme favelet, à supprimer du code pour toute autre utilisation.

/////	Définition des variables	/////

var fromus_offre = document.location.href;		//récupération de l'adresse du l'offre
var fromus_site = /http[s]{0,1}\:\/\/(.*\.com)/gi.exec(fromus_offre)[1];	//stockage du site web où se trouve l'offre
var fromus_objectname,
	fromus_objectnametmp,		// Les variables tmp sont des variables temporaires requises pour le traitement d'un nombre considérable de sites
	fromus_pricemin,			// Le "fromus_" permet d'empêcher les conflits lors de l'utilisation du code dans une application, une extension ou un plugin
	fromus_pricemintmp,	
	fromus_imgtmp,
	fromus_img;
var fromus_reg = /(\$[0-9\,]{0,}[\.0-9]{0,3})/;

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

/////	Récupération des données	/////
//	NB: Les sites dont le code n'est composé que de getElement(s) ById, TagName, ClassName, ou autre, ne seront pas détaillés.	//
	
switch(fromus_site)	//Permet de sélectionner le code relatif au site consulté
	{
		case "www.6pm.com":
			{
				fromus_objectnametmp			=	document.getElementsByClassName("link fn")[0];
				fromus_objectnametmp			+= 	'';
				fromus_objectname				= 	fromus_objectnametmp.replace("http\:\/\/www\.6pm\.com\/","").replace(/-/g," ");
				
				fromus_imgtmp					=	document.getElementById("detailImage").innerHTML;
				fromus_imgtmp					= 	fromus_imgtmp+'';
				fromus_img						= 	/(http)(.*)(\.jpg|\.png|\.gif)/gi.exec(fromus_imgtmp)[0];		

				fromus_pricemintmp				=	document.getElementById("priceSlot").innerText;
				fromus_pricemintmp				=	/(?:\$[0-9]{0,}\.[0-9]{2})[ ]{0,}\n{0,}(\$[0-9]{0,}\.[0-9]{2})/gi.exec(fromus_pricemintmp);
				fromus_pricemin					=	fromus_pricemintmp[1];
				
				fromus_desc						=	document.getElementsByClassName("description")[0].innerText;					
			}break;

		case "www.amazon.com":
			{	
				fromus_objectname				=	document.getElementById("btAsinTitle").innerText;
				
				if(document.getElementById("main-image") != undefined)
				{
					fromus_img						=	document.getElementById("main-image").src;
				}
				else
					{
						fromus_img						=	document.getElementById("prodImage").src;
					}
					
				fromus_pricemintmp				=	document.getElementsByClassName("priceLarge")[0].innerHTML;
				fromus_pricemintmp				+=	'';
				fromus_pricemin					=	fromus_pricemintmp;
				
				if(document.getElementById("productDescription")!=undefined)
					{
						fromus_desc						=	document.getElementById("productDescription").innerText;
					}
				else
					{
						fromus_desc						=	fromus_objectname;
					}
			}break;
			
		case "www.beallsflorida.com":
			{
				if(document.getElementById("productImage")!=undefined)
					{	// S'il s'agit d'une preview
						fromus_objectname		=	document.getElementById("quick-order-section").getElementsByTagName("h2")[0].innerText;

						fromus_img				=	document.getElementById("productImage").src;	

						fromus_pricemin			=	document.getElementsByClassName("offer-price")[0].innerText;

						fromus_desc				=	fromus_objectname;							
					}
				else
					{	// S'il s'agit d'une page produit
						fromus_objectname		=	document.getElementById("title").innerText;

						fromus_img				=	document.getElementById("flyoutZoomView").getElementsByTagName("div")[0].getElementsByTagName("img")[0].src;	

						fromus_pricemin			=	document.getElementsByClassName("offer-price")[0].innerText;

						fromus_desc				=	document.getElementById("detail").innerText;
					}
			}break;
			
		case "www.rakuten.com":
			{
			if(!(/(www\.rakuten\.com)/.test(fromus_offre)))	// Si l'offre se trouve sur www.quelquechose.rakuten.com et non pas www.rakuten.com
				{	// qqc.rakuten.com
					fromus_objectname					=	document.getElementsByClassName("bwcProductTitle")[0].innerText;

					fromus_pricemin						=	document.getElementsByClassName("mpsTotalPriceMoney")[0].innerText;
					
					fromus_img							=	document.getElementsByClassName("item image")[0].getElementsByTagName("a")[0].getElementsByTagName("img")[0].src;

					fromus_desc							=	document.getElementById("ctl00_TemplateContentPlaceHolder_ctlProductSummary_divDescription").innerText;
				}
			else
				{	//rakuten.com
				// Le site varie entre l'utilisation de deux modèle pour chaque info récupérée c'est pourquoi cette section contient beaucoup de if/else 
				// se basant sur l'existence de noeuds.
					if(document.getElementById("AuthorArtistTitle_productTitle")!=undefined)
						{
							fromus_objectname			=	document.getElementById("AuthorArtistTitle_productTitle").innerText;
						}
					else
						{
							fromus_objectname			=	document.getElementById("StorePromo_title").innerText;
						}

					if(document.getElementById("ImageVideo_ImageRepeater_ctl00_Image")!=undefined)
						{
							fromus_img					=	document.getElementById("ImageVideo_ImageRepeater_ctl00_Image").src;
						}
					else
						{
							fromus_img					=	document.getElementById("StorePromo_imgPromo").src;
						}

					if(document.getElementById("spanMainTotalPrice")!=undefined)
						{
							fromus_pricemin				=	document.getElementById("spanMainTotalPrice").innerText;
						}
					else
						{
							fromus_pricemin				=	document.getElementById("StorePromo_PriceText").innerText;
						}
					
					if(document.getElementById("divDescription")!=undefined)
						{
							fromus_desc					=	document.getElementById("divDescription").innerText;
						}
					else
						{
							fromus_desc					=	document.getElementById("StorePromo_spnDescription1").innerText;
						}	
				}
			}break;
			
		case "www.disneystore.com":
			{
			
				if(document.getElementsByClassName("quickLook")[0]!=undefined)
					{	// S'il s'agit d'une preview
						fromus_objectname 				=	document.getElementsByClassName("quickLook")[0].getElementsByTagName("h1")[0].innerText;						
						
						fromus_img		 				=	document.getElementsByClassName("thumbs")[0].getElementsByTagName("img")[0].src;						
						
						if(document.getElementsByClassName("price regular largePrice")[0]!=undefined)
							{	// Si le produit est à son prix habituel
								fromus_pricemin					=	document.getElementsByClassName("price regular largePrice")[0].innerText;
							}
						else
							{	// Si le produit est en promotion
								fromus_pricemin					=	fromus_reg.exec(document.getElementsByClassName("price sale")[0].innerText)[0];
							}
							
						fromus_desc						=	fromus_objectname;
					}
				else
					{	// S'il s'agit d'une page produit
						fromus_objectname 	=	document.getElementsByTagName("h1")[0].innerText;

						fromus_imgtmp					=	document.getElementsByClassName("viewerMain")[0].innerHTML;
						fromus_imgtmp					= 	fromus_imgtmp+'';
						fromus_img						= 	/(http)(.*)(\?)/gi.exec(fromus_imgtmp)[0].replace("?","");	
			
						if(document.getElementsByClassName("price sale")[0] != undefined)
							{	// Si le produit est en promotion
								fromus_pricemintmp		=	document.getElementsByClassName("price sale")[0].innerHTML;
								fromus_pricemintmp		= 	fromus_pricemintmp+'';
								fromus_pricemin			= 	/(\$)[0-9\.]{1,}/gi.exec(fromus_pricemintmp)[0];
							}	
						else
							{	// Si le produit est à son prix habituel
								fromus_pricemintmp		=	document.getElementsByClassName("price")[0].innerText;
								fromus_pricemin			=	/(\$)[0-9,]{1,}(\.)[0-9]{2}/gi.exec(fromus_pricemintmp)[0];
							}						
					
						fromus_desc      				=	document.getElementsByClassName("productShortDescription")[0].innerText;
					}
			}break;
		
		case "www.walmart.com":
			{
				fromus_objectnametmp			=	document.getElementsByClassName("productTitle");
				fromus_objectname				=	fromus_objectnametmp[0].innerHTML;
				
				fromus_img						= 	document.getElementById('Zoomer').href;

				fromus_pricemin					=	document.getElementsByClassName("clearfix camelPrice")[document.getElementsByClassName("clearfix camelPrice").length-1].innerText;
			
				fromus_desc						=	document.getElementsByClassName("ql-details-short-desc")[0].innerText;		
			}break;
		
		
		case "www.dogfunk.com":
			{
				fromus_objectname				=	document.getElementById("buy_box_title").innerText;
			
				fromus_img						=	document.getElementById("main_product_image").src;
			
				fromus_pricemintmp				=	document.getElementById("sales_price").innerText;
				fromus_pricemin					=	/(\$[0-9]{0,})(\.)([0-9]{2})/gi.exec(fromus_pricemintmp)[0];
			}break;
		
		case "www.dsw.com":
			{
				if(document.getElementById("productPageContent")!=undefined)
					{	// Seul le noeud du nom change entre l'aperçu rapide et la page de l'article
						fromus_objectnametmp			=	document.getElementsByClassName("productInfoBlock");
						fromus_objectnametmp			=	fromus_objectnametmp[0].innerText;
						fromus_objectname				=	/(.*)(\n\$)/.exec(fromus_objectnametmp)[1];
					}
				else
					{
						fromus_objectnametmp			=	document.getElementsByClassName("productTitle");
						fromus_objectname				=	fromus_objectnametmp[0].innerHTML;
					}

				fromus_imgtmp					=	document.getElementsByClassName("zoom_fixed")[0];
				fromus_img						=	fromus_imgtmp.src;

				fromus_pricemin					=	document.getElementById("priceSelected").innerText;
			}break;
		
		case "www.gap.com":
			{
				if(document.getElementById("quickLookPriceText")!=undefined)	// Les noeuds changent entre l'aperçu et la page dédiée
					{
						fromus_objectname				=	document.getElementById("quickLookProductName").innerText;
			
						fromus_img						=	document.getElementById("quicklook_product_image").src;
			
						fromus_pricemintmp				=	document.getElementById("quickLookPriceText").innerText;
						fromus_pricemin					=	/(\$[0-9]{0,})(\.)([0-9]{2})/gi.exec(fromus_pricemintmp)[0];
					}
				else
					{			
						fromus_objectname				=	document.getElementById("productNameText").innerText;
						
						fromus_img						=	document.getElementById("product_image").src;	
						
						fromus_pricemintmp				=	document.getElementById("priceText").innerText;
						fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})$/gi.exec(fromus_pricemintmp)[0];
					}
			}break;
				
		case "www.giggle.com":
			{
				fromus_objectnametmp			=	document.getElementsByClassName("productname");
				fromus_objectname				=	fromus_objectnametmp[0].innerHTML;
				fromus_objectname				=	fromus_objectname.replace("<!-- Product Name Display -->","");
				fromus_objectname				=	fromus_objectname.replace("amp;","");	
				
				fromus_pricemintmp				=	document.getElementsByClassName("descript-price");
				fromus_pricemin					=	fromus_pricemintmp[0].innerText + '';	
				fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})/gi.exec(fromus_pricemin)[0];
				
				if(document.getElementById("wrap")!=undefined)
					{	//Le noeud change entre l'aperçu et la page dédiée
				
						fromus_imgtmp					=	document.getElementById("wrap").innerHTML;
						fromus_imgtmp					+=	'';		

						fromus_img						= 	/(demandware\.edgesuite\.net.*)(\.jpg|\.png|\.gif)(\")/gi.exec(fromus_imgtmp)[0] + '';
						fromus_img						=	fromus_img.substring(0,fromus_img.length-1);
					}
				else
					{
						fromus_imgtmp					=	document.getElementById("pdpMain").innerHTML;
						fromus_imgtmp					+=	'';		
						fromus_img						= 	/(demandware\.edgesuite\.net)(.*)(jpg|png|gif)/gi.exec(fromus_imgtmp)[0];
					}
			}break;
		
		case "www.gymboree.com":
			{
			fromus_objectname				=	document.getElementById("p-title").innerText;
			
			fromus_img						=	document.getElementById("p-picture").src;
			
			fromus_pricemintmp				=	document.getElementById("b-price-s").innerText;
			fromus_pricemin					=	/(\$[0-9]{0,})(\.)([0-9]{2})/gi.exec(fromus_pricemintmp)[0];
			}break;
		
		case "www.hautelook.com":
			{
				fromus_objectnametmp			=	document.getElementsByClassName("product_title");
				fromus_objectname				=	fromus_objectnametmp[0].innerHTML;		
		
				fromus_pricemintmp				=	document.getElementsByClassName("sale_price");
				fromus_pricemin					=	fromus_pricemintmp[0].innerText + '';	
				fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})/gi.exec(fromus_pricemin)[0];

				fromus_img						=	document.getElementById("imgModMediumImg").src;
		}break;
		
		case "www.swimoutlet.com":
			{
				fromus_objectnametmp			=	document.getElementsByClassName("ProductNameColorLARGE");
				fromus_objectname				=	fromus_objectnametmp[0].innerHTML;		
		
				fromus_pricemintmp				=	document.getElementsByClassName("pricecolor");
				fromus_pricemin					=	fromus_pricemintmp[0].innerText + '';	
				fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})/gi.exec(fromus_pricemin)[0];		
				
				fromus_img						=	document.getElementById("product_photo").src;		
		}break;
		
		case "www.jcrew.com":
			{	
				fromus_objectname				=	document.getElementById("pdp-title").innerText;		

				fromus_pricemintmp				=	document.getElementsByClassName("pdp-single")[0];
				fromus_pricemin					=	fromus_pricemintmp.innerText + '';	
				fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})/g.exec(fromus_pricemin)[0];				

				fromus_imgtmp					=	document.getElementsByClassName("prod_main_img")[0].innerHTML;
				fromus_imgtmp					+=	'';				
				fromus_img						= 	/(http\:\/\/.*)(\?\$pdp)/gi.exec(fromus_imgtmp)[0] + '';
				fromus_img						=	fromus_img.substring(0,fromus_img.length-5);			
			}break;
		
		case "www.jcpenney.com":
			{	
				fromus_objectnametmp			=	document.getElementsByClassName("def_cur pdp_title");
				fromus_objectname				=	fromus_objectnametmp[0].innerHTML.replace("\n","");		
		
				fromus_pricemintmp				=	document.getElementById("priceDetails").innerText;				
				fromus_pricemintmp					=	/(\$[0-9]{0,}[\.]{0,1}[0-9]{0,2})$/gi.exec(fromus_pricemintmp);
				
				//La ligne suivante prend en charge les pages ayant un prix "original" et un prix "sale", celle d'après prend en charge toutes les autres pages
				
				if(fromus_pricemintmp==null)
					{
						fromus_pricemin=/(\$[0-9]{0,}[\.]{0,1}[0-9]{0,2})/gi.exec(document.getElementsByClassName("def_cur flt_clr disp_blk")[1].innerText + '')[0];
					}		
				else
					{
						fromus_pricemin=fromus_pricemintmp[0];
					}
					
				fromus_img						=	document.getElementById("mapImageSjElement4_img").src;					
			}break;
			
		case "www.juicycouture.com":
			{
				fromus_objectnametmp			=	document.getElementsByClassName("productname");
				fromus_objectname				=	fromus_objectnametmp[0].innerHTML;
				fromus_objectname				=	fromus_objectname.replace("<!-- Product Name Display -->","");
				fromus_objectname				=	fromus_objectname.replace("amp;","");				
			
				fromus_pricemintmp				=	document.getElementsByClassName("standardprice");
				fromus_pricemin					=	fromus_pricemintmp[0].innerText + '';	
				fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})/gi.exec(fromus_pricemin)[0];
			
				fromus_img						=	document.getElementById("prodImage").src;				
				fromus_img						=	fromus_img.replace(/(\$.*\$)/,"");
			}break;
			
		case "www.kohls.com":
			{
				if(/(\/catalog\/)/.test(fromus_offre))		//S'il s'agit d'une preview
					{
						fromus_objectnametmp			=	document.getElementsByClassName("overlay_right");
						fromus_objectname				=	fromus_objectnametmp[0].innerText.replace("\n","");			

						fromus_imgtmp					=	document.getElementsByClassName("quickViewProductImage")[0].innerHTML;
						fromus_imgtmp					+= 	'';
						fromus_imgtmp					= 	/(http)(.*)(\?)/gi.exec(fromus_imgtmp)[0];		
						fromus_img						=	fromus_imgtmp.replace(/(&quot)(.*)/,"");				
					}	
				else		// S'il s'agit d'une page dédiée
					{
						fromus_objectnametmp			=	document.getElementsByClassName("title");
						fromus_objectname				=	fromus_objectnametmp[0].innerText.replace("\n","");			

						fromus_imgtmp					=	document.getElementsByClassName("image_container")[0].innerHTML;
						fromus_imgtmp					+=	'';
						fromus_imgtmp					= 	/(http)(.*)(\?)/gi.exec(fromus_imgtmp)[0];		
						fromus_img						=	fromus_imgtmp.replace(/(&quot)(.*)/,"");							
					}
				
				// Partie commune aux previews et pages dédiées
				
				if(/(.*)(?:sale \$|now \$|original \$)/.test(fromus_objectname))	// Si le "nom" contient plus que le nom, tronquer l'excédent
					{
						fromus_objectname						=	/(.*)(?:sale \$|now \$|original \$)/.exec(fromus_objectname)[1];
					}
			
			// Ce site utilise deux noeuds, l'un pour les prix normaux et/ou originaux et l'autre pour les offres spéciales, "sales"
			// quelle que soit l'état de l'offre, les deux sont présents sur la page. Le code ci-dessous va donc en premier voir si
			// la partie "sale" est vide. Si elle ne l'est pas, il récupère le contenu, sinon, il récupère le contenu de la partie "original"
			
				fromus_pricemintmp						=	document.getElementsByClassName("sale")[0].innerText;
				fromus_pricemintmp						=	fromus_pricemintmp.replace("\n","");

				if(fromus_pricemintmp=='')
					{	
						fromus_pricemintmp				=	document.getElementsByClassName("original");
						fromus_pricemintmp					=	fromus_pricemintmp[0].innerHTML;
						alert(fromus_pricemin);
					}	
				fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})/.exec(fromus_pricemintmp)[0];				
			}break;			
			
		case "www.landsend.com":
			{
				fromus_objectnametmp			=	document.getElementsByClassName("pp-product-name");
				fromus_objectname				=	fromus_objectnametmp[0].innerHTML;		
		
				fromus_pricemintmp				=	document.getElementsByClassName("pp-summary-price");
				fromus_pricemin					=	fromus_pricemintmp[0].innerText + '';	
				fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})/gi.exec(fromus_pricemin)[0];
				
				fromus_img						=	document.getElementById("backImageSjElement5_img").src;
				fromus_img						=	fromus_img.replace(/(\?.*)/,'');
			}break;
		
		case "www.llbean.com":
			{
				if(document.getElementById("ppHeader")!=undefined)		//Si la page est propre à l'objet
					{
						fromus_objectname				=	document.getElementById("ppHeader").innerText;
					}
				else		//S'il s'agit d'une preview
					{	
						fromus_objectname				=	document.getElementById("quickviewContentRight").innerText;
					}
				fromus_objectname				=	fromus_objectname.replace(/(\n.*)/i,"");
				if(/ITEM/gi.test(fromus_objectname))	//Si le "nom" contient plus que le nom, tronquer
					{
					fromus_objectname	=	fromus_objectname.replace(/item.*/gi,'');			
					fromus_objectname	= 	/(.*)\n/gi.exec(fromus_objectname)[0];
					}

				fromus_pricemintmp				=	document.getElementsByClassName("toOrderItemPrice");
				fromus_pricemin					=	fromus_pricemintmp[0].innerText + '';	
				fromus_pricemin					=	/(\$[0-9]{0,}[\.0-9]{0,3})/gi.exec(fromus_pricemin)[0];				
							
				fromus_img						=	document.getElementById("backImageSjElement4_img").src;
				fromus_img						=	fromus_img.replace(/(\?.*)/,'');				
			}break;
				
		case "www1.macys.com":
			{
				if(document.getElementById("productTitle")!=undefined)	//Si on est la page du produit
					{
						fromus_objectname				=	document.getElementById("productTitle").innerText;

						fromus_img						=	document.getElementById("mainView_1").src;
						fromus_img						= 	/(http)(.*)(\?)/gi.exec(fromus_img)[0].replace("?","");	

						//La ligne suivante récupère le dernier prix de l'élément, qui est le prix avec discount le cas échéant

						fromus_pricemintmp				=	document.getElementById("priceInfo").innerText.replace(/\n/g,"").replace(/\s/g,"").replace(/[^0-9\$\.]/g,'');
						fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})$/gi.exec(fromus_pricemintmp)[0];	
					}
				else	//Si on regarde une preview
					{				
						fromus_objectname				=	document.getElementById("quickViewProductName").innerText.replace(/Web ID(.*)/,'');
				
						fromus_img						=	document.getElementById("mapImageSjElement4_img").src;	

						//La ligne suivante récupère le dernier prix de l'élément, qui est le prix avec discount le cas échéant

						fromus_pricemintmp				=	document.getElementById("quickViewPrices").innerText.replace(/\n/g,"").replace(/\s/g,"").replace(/[^0-9\$\.]/g,'');
						fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})$/gi.exec(fromus_pricemintmp)[0];
					}
		
			}break;
			
		case "www.moosejaw.com":
			{			
				fromus_objectnametmp			=	document.getElementsByClassName("product-name");
				fromus_objectname				=	fromus_objectnametmp[0].innerText.replace(/\n(.*)/g,"");	
				
				fromus_pricemintmp				=	document.getElementById("product-price").innerText.replace(/\n/g,"").replace(/\s/g,"").replace(/[^0-9\$\.]/g,'');
				fromus_pricemin					=	/(\$[0-9]{0,})(\.)([0-9]{2})/gi.exec(fromus_pricemintmp)[0];
		
				fromus_img						=	document.getElementById("main-image-link").href;				
			}break;

		case "www.neimanmarcus.com":
			{
				if(document.getElementById("productName")!=undefined) // S'il s'agit d'une preview
					{
						fromus_objectnametmp			=	document.getElementById("productName").innerText;
						fromus_objectname				=	fromus_objectnametmp.replace(/\n(.*)/g,"");	
					}
				else	// S'il s'agit de la page d'un produit
					{
						fromus_objectnametmp			=	document.getElementsByClassName("lineItemInfo")[0].innerText.replace(/\s/g,'');
						fromus_objectname				=	/(.*\$)/.exec(fromus_objectnametmp)[0];	
				
						//La ligne suivante coupe le nom et insère un espace ainsi: aaaBbb => aaa Bbb
						
						fromus_objectname				=	fromus_objectname.substring(0,fromus_objectname.length-1).replace(/([a-z])([A-Z])/g, '$1 $2');
					}
				fromus_pricemintmp				=	document.getElementsByClassName("price")[0].innerText.replace(/\n/g,"").replace(/\s/g,"").replace(/[^0-9\$\.]/g,'');
				fromus_pricemin					=	/(\$[0-9,]{0,}[\.0-9]{0,32})/gi.exec(fromus_pricemintmp)[0];

				fromus_imgtmp					=	document.getElementsByClassName("main-img")[0].innerHTML;
				fromus_imgtmp					+=	'';				
				fromus_img						= 	(/\"(http\:\/\/.*)(\.jpg|\.jpeg|\.tif|\.bmp|\.png|\.gif)\" /gi.exec(fromus_imgtmp)[0] + '').replace(/alt.*/,'').replace("\"","").replace("\"","");
			}break;

		case "www.nike.com":
			{
				fromus_objectnametmp			=	document.getElementsByClassName("product-title");
				fromus_objectname				=	fromus_objectnametmp[0].innerHTML;			
			
				fromus_pricemintmp				=	document.getElementsByClassName("local")[0];
				fromus_pricemin					=	fromus_pricemintmp.innerText + '';	
				fromus_pricemin					=	/(\$[0-9]{0,}[\.0-9]{0,3})/g.exec(fromus_pricemin)[0];				

				fromus_imgtmp					=	document.getElementsByClassName("product-image-wrap")[0].innerHTML;
				fromus_imgtmp					= 	fromus_imgtmp+'';
				fromus_img						= 	/(http.*)(\.jpg|\.jpeg|\.png|\.bmp|\.tif|\.gif)/gi.exec(fromus_imgtmp)[0].replace("?","");					
			}break;
			
		case "www.overstock.com":
			{
				if(document.getElementById("qv-hero-img")!=undefined)	//S'il s'agit d'une preview
					{
						fromus_objectname			=	document.getElementsByClassName("qv-hd")[0].innerText.replace(/\s/g,'').replace(/([a-z])([A-Z])/g, '$1 $2');
					
						fromus_img						=	document.getElementById("qv-hero-img").src;
					}
				else	//S'il s'agit d'une fiche
					{
						fromus_objectnametmp			=	document.getElementById("prod_mainCenter").innerHTML.replace(/\s/g,'');
						fromus_objectname				=	/(?:\<h1\>)(.*)(?:\<\/h1\>)/.exec(fromus_objectnametmp)[1].replace(/<h1>/,'').replace(/([a-z])([A-Z])/g, '$1 $2');
									
						if(document.getElementById("activeImage")==undefined)	//Si l'image est zoomable
							{
								fromus_imgtmp					=	document.getElementById("proImageHero").innerHTML.replace(/\s/g,'');
								fromus_imgtmp					= 	fromus_imgtmp+'';
								fromus_img						= 	/(http.*)(\.jpg|\.jpeg|\.png|\.bmp|\.tif|\.gif)/gi.exec(fromus_imgtmp)[0];
							}
						else	// Si l'image n'est pas zoomable
							{
								fromus_img						=	document.getElementById("activeImage").src;
							}
					}	//Le prix est commun aux deux 		
				
					fromus_pricemintmp				=	document.getElementsByClassName("Ovalue main-price-red")[0];
					fromus_pricemin					=	fromus_pricemintmp.innerText + '';	
					fromus_pricemin					=	/(\$[0-9]{0,}[\.0-9]{0,3})/g.exec(fromus_pricemin)[0];					
			}break;
				
		case "www.ralphlauren.com":
			{
				fromus_objectnametmp			=	document.getElementsByClassName("prodtitleLG");
				fromus_objectname				=	fromus_objectnametmp[0].innerText.replace(/\n(.*)/g,"");				

				fromus_pricemintmp				=	document.getElementsByClassName("ProductPriceContainer")[0].innerText;
				fromus_pricemintmp				=	fromus_pricemintmp.replace(/\s/g,'');
				fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})$/gi.exec(fromus_pricemintmp)[0];				
				
				fromus_imgtmp					=	document.getElementsByClassName("s7flyoutFlyoutView")[0].innerHTML;
				fromus_imgtmp					= 	fromus_imgtmp+'';
				fromus_img						= 	/(http.*\?)/gi.exec(fromus_imgtmp)[0].replace("?","");	
			}break;

		case "www.qvc.com":
			{			
				fromus_objectnametmp			=	document.getElementsByClassName("fn");
				fromus_objectname				=	fromus_objectnametmp[0].innerText;			
		
				fromus_img						=	document.getElementById("imageID").src;
				
				fromus_pricemintmp				=	document.getElementById("parProductDetailPrice").innerText;
				fromus_pricemin					=	/(\$[0-9]{0,})(\.)([0-9]{2})/gi.exec(fromus_pricemintmp)[0].replace(/\s/g,'');				
			}break;

		case "www.rei.com":
			{
				fromus_objectnametmp			=	document.getElementsByClassName("fn");
				fromus_objectname				=	fromus_objectnametmp[0].innerText;				
				
				fromus_pricemintmp				=	document.getElementsByClassName("itemprice")[0].innerText;
				fromus_pricemintmp				=	fromus_pricemintmp.replace(/\s/g,'');
				fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})/gi.exec(fromus_pricemintmp)[0];					

				fromus_img						=	document.getElementById("zoomLink").href;					
			}break;
	
		case "www.ruelala.com":
			{
				fromus_objectnametmp			=	document.getElementById("productAttributes").innerHTML;
				fromus_objectname				=	/(?:\<h2)(.*)(?:\<\/h2\>)/g.exec(fromus_objectnametmp.replace(/\s/g,''))[1].replace(/<h2>/,'').replace(/(.*)>/,'').replace(/([a-z])([A-Z])/g, '$1 $2');
				
				fromus_pricemin					=	document.getElementById("salePrice").innerText;		
		
				fromus_img						=	document.getElementById("imgZoom").src;						
			}break;
		
		case "www.saksfifthavenue.com":
			{
				if(/(\/ProductDetail\.jsp)/.test(fromus_offre))
					{	// Si c'est la page du produit
						fromus_objectnametmp			=	document.getElementsByClassName("boldBlackText12");

						fromus_objectname				=	fromus_objectnametmp[0].innerText+' '+fromus_objectnametmp[1].innerText;
					}
				else
					{	// Si c'est une preview
						fromus_objectnametmp			=	document.getElementsByClassName("product-name");
						fromus_objectname				=	fromus_objectnametmp[0].innerText;
					
						fromus_objectnametmp			=	document.getElementsByClassName("product-title");
						fromus_objectname				=	fromus_objectname+' '+fromus_objectnametmp[0].innerText;
					}
					
				// Que ce soit un produit ou une preview
				
				if(document.getElementsByClassName("product-sale-price")[0] != undefined)
					{	// Si le produit est en "sale"
						fromus_pricemintmp				=	document.getElementsByClassName("product-sale-price")[0].innerText;
						fromus_pricemin					=	/(\$[0-9]{0,})(\.)([0-9]{2})/gi.exec(fromus_pricemintmp)[0].replace(/\s/g,'');						 
					}
				else
					{	// Si le produit est à son prix normal
						fromus_pricemintmp				=	document.getElementsByClassName("product-price")[0].innerText;
						fromus_pricemin					=	/(\$[0-9]{0,})(\.)([0-9]{2})$/gi.exec(fromus_pricemintmp.replace(/\s/g,'').replace(/[^0-9\$\.]/g,''))[0];						 
					}
					
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////		ATTENTION		Les images sont gérées en flash, elles ne sont donc pas récupérées!!		ATTENTION		//////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				
				fromus_img = "Recuperation manuelle necessaire";
			}break;

		case "www.shoes.com":
			{
				fromus_objectname				=	document.getElementsByClassName("PD_BrandStyle")[0].innerText;
				
				fromus_img						=	document.getElementById("ctl00_cphPageMain_ImageMultiView1_imgLargeDisplay").src;
				
				fromus_pricemintmp				=	document.getElementById("ctl00_cphPageMain_BrandAndPrice1_ProductPrice").innerText;
				fromus_pricemin					=	/(\$[0-9]{0,})(\.)([0-9]{2})/gi.exec(fromus_pricemintmp)[0];				
			}break;
		
		case "www.sierratradingpost.com":
			{
				if(document.getElementById("addToCartForm")==undefined)	// S'il s'agit d'une preview
					{			
						alert("La recuperation sur preview ne fonctionne pas ici.");	// Dernière vérification : 25 avril 2013
					}
				else	// S'il s'agit d'une fiche
					{
						fromus_objectnametmp			=	document.getElementsByClassName("linkHeavySection");
						fromus_objectname				=	fromus_objectnametmp[0].innerText;								
					}

				fromus_pricemin					=	document.getElementById("displayPrice").innerText;
				fromus_img						=	document.getElementById("largeImage").src;				
			}break;				
			
		case "www.target.com":
			{
				if(document.getElementsByClassName("priceSection")[0]!=undefined)	// Si on est dans une preview
					{
						fromus_objectnametmp			=	document.getElementsByClassName("productName");
						fromus_objectname				=	fromus_objectnametmp[0].innerText;	

						fromus_pricemintmp				=	document.getElementsByClassName("priceSection");
						fromus_pricemin					=	/\$[0-9]{0,}\.[0-9]{2}/.exec(fromus_pricemintmp[0].innerText);
					}
				else	// Si on est dans une fiche
					{		
						fromus_objectnametmp			=	document.getElementsByClassName("fn");
						fromus_objectname				=	fromus_objectnametmp[0].innerText;		
						
						fromus_pricemintmp				=	document.getElementsByClassName("offerPrice");
						fromus_pricemin					=	fromus_pricemintmp[0].innerText;
					}
				fromus_img						=	document.getElementById("heroImage").src;			
			}break;

		case "www.toysrus.com":
			{
				fromus_objectname				=	/(.*)\n/.exec(document.getElementById("priceReviewAge").innerText)[1];			
	
				fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})$/.exec(document.getElementById("price").innerText.replace(/\n/g,''))[0];			

				fromus_img						=	document.getElementById("curImageZoom").src;				
			}break;
			
		case "www.urbanoutfitters.com":
			{
				if(/(\/ProductDetail\.jsp)/gi.test(fromus_offre))	// S'il s'agit d'une fiche
					{
						fromus_objectname				=	document.getElementById("prodTitle").innerText;			
						if(document.getElementsByClassName("promo-price")[0]!=undefined)
							{	// S'il s'agit d'une promo
								fromus_pricemin				=	document.getElementsByClassName("promo-price")[0].innerText;
							}			
						else
							{	// S'il s'agit d'une offre normale
								fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})$/.exec(document.getElementsByClassName("price")[0].innerText.replace(/\n/g,''))[0];
							}			
							
						fromus_img						=	document.getElementById("prodMainImg").src;						
					}
				else
					{	// S'il s'agit d'une preview
					
						fromus_objectname				=	document.getElementById("snapTitle").innerText;			
	
						if(document.getElementsByClassName("promo-price")[0]!=undefined)
							{	// S'il s'agit d'une promo
							fromus_pricemin				=	document.getElementsByClassName("promo-price")[0].innerText;
							}			
						else		
							{	// S'il s'agit d'une offre normale
								fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})$/.exec(document.getElementById("snapPrice").innerText.replace(/\n/g,''))[0];
							}			
						fromus_img						=	document.getElementById("detailMain").src;							
					}
			}break;
			
		case "www.afloral.com":
			{			
				if(document.getElementById("quickview")!=undefined)
					{	// Si c'est une preview
						fromus_objectname		=	document.getElementsByClassName("title")[0].innerText;
						
						fromus_pricemin			=	document.getElementsByClassName("ourprice")[0].innerText;
						
						fromus_imgtmp			=	document.getElementById("quickview").innerHTML;
						fromus_img				=	/src=\"(.*)\"/gi.exec(fromus_imgtmp)[1];				
					}
				else
					{	// Si c'est une fiche
						fromus_objectnametmp	=	document.getElementById("item-info").innerHTML;
						fromus_objectname		=	/\<h1 itemprop=\"name\"\>(.*)\<\/h1\>/.exec(fromus_objectnametmp)[1];
						
						fromus_pricemin			=	document.getElementsByClassName("current-price")[0].innerText;
						
							
					}					
			}break;

		case "www.backcountry.com":
			{
				fromus_objectname				=	document.getElementsByClassName("product-group-title product-name")[0].innerText;
		
				fromus_pricemintmp				=	document.getElementById("product-display-price").innerText;
				fromus_pricemin					=	fromus_reg.exec(fromus_pricemintmp)[0];
			
				fromus_img						=	document.getElementById("main_product_image").src;	
			}break;

		case "www.bodybuilding.com":
			{
				fromus_objectname				=	document.getElementsByClassName("fn")[0].innerText.replace("\n"," ");

				fromus_pricemintmp				=	document.getElementsByClassName("price")[0].innerText;
				fromus_pricemin					=	fromus_reg.exec(fromus_pricemintmp)[0];

				fromus_imgtmp					=	document.getElementsByClassName("boom-three-column product-image vat")[0].innerHTML;
				fromus_img						=	/\<img src=\"(.*\.jpg)/.exec(fromus_imgtmp)[1];
			}break;
		
		case "www.daddiesboardshop.com":
			{
				fromus_objectname				=	document.getElementsByClassName("product-name")[0].innerText.replace("\n"," ");

				fromus_pricemintmp				=	document.getElementsByClassName("price")[0].innerText;
				fromus_pricemin					=	fromus_reg.exec(fromus_pricemintmp)[0];

				fromus_imgtmp					=	document.getElementsByClassName("product-image image-zoom")[0].innerHTML;
				fromus_img						=	/\<img src=\"(.*\.jpg)/.exec(fromus_imgtmp)[1];
			}break;			

		case "www.closeoutlinen.com":
			{
				fromus_objectname				=	document.getElementsByClassName("ProductTitleText")[0].innerText;

				fromus_pricemintmp				=	document.getElementById("priceinfo").innerText;
				fromus_pricemin					=	fromus_reg.exec(fromus_pricemintmp)[0];

				fromus_img						=	document.getElementById("mainpic").src;
			}break;

		case "www.altrec.com":
			{
				fromus_objectname				=	document.getElementsByClassName("detailBH1")[0].innerText;

				fromus_pricemintmp				=	document.getElementsByClassName("priceLine")[0].innerText;
				fromus_pricemin					=	fromus_reg.exec(fromus_pricemintmp)[0];

				fromus_img						=	document.getElementById("swatchImage").src;
			}break;

		case "www.ae.com":
			{
				fromus_objectname				=	document.getElementsByClassName("pName")[0].innerText;

				fromus_pricemin					=	document.getElementsByClassName("price js_toPrice")[0].innerText.replace(/([0-9]{1,})([0-9]{2})/g, '$1\.$2');

				fromus_imgtmp						=	document.getElementById("imgHolder").innerHTML;
				fromus_img						=	"http:"+/\<img src=\"(.*)\" alt/.exec(fromus_imgtmp)[1];
			}break;			
		
		case "www.bhphotovideo.com":
			{			
				fromus_objectname				=	document.getElementById("productHeadingCC").innerText;

				fromus_pricemintmp				=	document.getElementsByClassName("priceList")[0].innerText.replace(/\s/gi,'').replace(/[a-zA-Z]/gi,'');
				fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})$/gi.exec(fromus_pricemintmp)[0];
				
				fromus_img						=	document.getElementById("mainImage").src;
			}break;
			
		case "www.bestbuy.com":
			{
				//Le site est basé sur la dualité de deux structures qui se mélangent, d'où la succession de if/else suivante.
				if(document.getElementById("sku-title")!=undefined)
					{
						fromus_objectname		=	document.getElementById("sku-title").innerText;
					}
				else
					{
						fromus_objectnametmp	=	document.getElementById("productsummary").innerText;
						fromus_objectname		=	/(.*)\n/.exec(fromus_objectnametmp)[0];
					}

				if(document.getElementById("saleprice")!=undefined)
					{
						fromus_pricemintmp		=	document.getElementById("saleprice").innerText;
					}
				else
					{
						fromus_pricemintmp		=	document.getElementsByClassName("item-price")[0].innerText;
					}			
				fromus_pricemin					=	fromus_reg.exec(fromus_pricemintmp)[0];	

				if(document.getElementById("postcard-thumbnail")!=undefined)
					{
						fromus_imgtmp			=	document.getElementById("postcard-thumbnail").innerHTML.replace(/\s/gi,'');
					}
				else
					{
						fromus_imgtmp			=	document.getElementById("imagepreview").innerHTML.replace(/\s/gi,'');
					}
				fromus_img						=	/\<img.*src=\"(.*(\.jpg|\.gif|\.png|\;)).*\>/.exec(fromus_imgtmp)[1];
		
				if(/;/.test(fromus_img))	// Certaines src n'ont pas d'extension, elles sont coupées au ; et cette vérification tronque
					{						// ce qui dépasse
						fromus_img				=	fromus_img.replace(/;.*/g,'');
					}	
			}break;

		case "www.urbandecay.com":
			{			
				fromus_objectname				=	document.getElementsByClassName("productname")[0].innerText;

				fromus_pricemintmp				=	document.getElementById("price").innerText.replace(/\s/gi,'').replace(/[a-zA-Z]/gi,'');
				fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})$/gi.exec(fromus_pricemintmp)[0];

				fromus_img			=	document.getElementsByClassName("product-imageMain")[0].src;
			}break;

		case "www.toofaced.com":
			{
				fromus_objectname				=	document.getElementsByClassName("productName")[0].innerText;

				fromus_pricemintmp				=	document.getElementsByClassName("variantprice")[0].innerText;
				fromus_pricemin					=	fromus_reg.exec(fromus_pricemintmp)[0];

				fromus_imgtmp					=	document.getElementsByClassName("mainImage")[0].innerHTML.replace(/\s/gi,'');
				fromus_img						=	"https://www.toofaced.com"+/\<img.*src=\"(.*(\.jpg|\.gif|\.png|\;)).*\>/.exec(fromus_imgtmp)[1];
			}break;

		case "www.bobbibrowncosmetics.com":
			{
				fromus_objectnametmp			=	document.getElementsByClassName("product-info")[0].innerText;
				if(/\S/.test(/(.*)\n(.*)\n(.*)/g.exec(fromus_objectnametmp)[2]))
					{	// Si le nom est en première ligne...
						fromus_objectname		=	/(.*)\n(.*)\n(.*)/g.exec(fromus_objectnametmp)[2];
						if(fromus_objectname == 'New')
							{	// ...Mais qu'en fait, ce n'est pas le nom
								fromus_objectname		=	/(.*)\n(.*)\n(.*)/g.exec(fromus_objectnametmp)[3];
							}
					}
				else
					{	// Si le nom est en seconde ligne
						fromus_objectname		=	/(.*)\n(.*)\n(.*)/g.exec(fromus_objectnametmp)[3];
					}
					
				fromus_pricemintmp				=	document.getElementsByClassName("purchase-row")[0].innerText;
				fromus_pricemin					=	fromus_reg.exec(fromus_pricemintmp)[0];

				fromus_imgtmp					=	document.getElementsByClassName("img-holder")[0].innerHTML.replace(/\s/gi,'');
				fromus_img						=	/\<img.*src=\"(.*(\.jpg|\.gif|\.png|\;)).*\>/.exec(fromus_imgtmp)[1];
			}break;

		case "tartecosmetics.com":
			{
				fromus_objectnametmp			=	document.getElementById("item_detailsTopInner").innerText;
				fromus_objectname				=	/(.*)\n/.exec(fromus_objectnametmp)[0];
	
				fromus_pricemin					=	fromus_reg.exec(fromus_objectnametmp)[0];

				fromus_img						=	document.getElementById("productImg").src;
			}break;

		case "www.nyxcosmetics.com":
			{
				if(document.getElementById("product-description")!=undefined)
					{	// Fiche
						fromus_objectnametmp			=	document.getElementById("product-description").innerHTML.replace(/[^A-Z\s]/g,'');		
						fromus_objectnametmp			=	/[\s]{0,}[A-Z]{1,}(.*)[A-Z]{1,}[\s]/.exec(fromus_objectnametmp)[0];		
						fromus_objectname				=	/[\s]{1,}(.*)/.exec(fromus_objectnametmp.replace(/[A-Z]{1,}/,' '))[1];
						fromus_objectname 				=	fromus_objectname.replace(/\s/g,'.').replace(/\.\./g,'.').replace(/\.\./g,'.').replace(/\.\./g,'.').replace(/\.\./g,'.').replace(/\.\./g,'.').replace(/\.\./g,'.').replace(/\.\./g,'.');
						fromus_objectname 				=	fromus_objectname.replace(/\./g,' ');
						fromus_objectname 				=	fromus_objectname.split(' ');
						fromus_objectnametmp			=	fromus_objectname[0]+' '+fromus_objectname[1]+' '+fromus_objectname[3]+' '+fromus_objectname[5]+' '+fromus_objectname[7]+' '+fromus_objectname[9];
						fromus_objectnametmp			=	fromus_objectnametmp+' '+fromus_objectname[11]+' '+fromus_objectname[13]+' '+fromus_objectname[15]+' '+fromus_objectname[17];
						fromus_objectnametmp			=	fromus_objectnametmp+' '+fromus_objectname[19]+' '+fromus_objectname[21]+' '+fromus_objectname[23]+' '+fromus_objectname[25];
						fromus_objectnametmp			=	fromus_objectnametmp+' '+fromus_objectname[27]+' '+fromus_objectname[29]+' '+fromus_objectname[31]+' '+fromus_objectname[33];
						fromus_objectnametmp			=	fromus_objectnametmp+' '+fromus_objectname[35]+' '+fromus_objectname[37]+' '+fromus_objectname[39]+' '+fromus_objectname[41];
						fromus_objectname				=	fromus_objectnametmp.replace(/ undefined/g,'');
									
						fromus_pricemintmp				= 	document.getElementById("price").innerText;
						fromus_pricemin					=	fromus_reg.exec(fromus_pricemintmp)[0];		

						fromus_imgtmp					=	document.getElementById("product-image").innerHTML;
						fromus_imgtmp					=	/\<img.*src=\"(.*(\.jpg|\.gif|\.png|\;)).*\>/.exec(fromus_imgtmp)[1];
						fromus_imgtmp					=	/\"(http.*(\.jpg|\.png|\.gif))$/i.exec(fromus_imgtmp)[0];
						fromus_img						=	fromus_imgtmp.substring(1,fromus_imgtmp.length);
					}
				else
					{	// Preview
						fromus_objectnametmp			=	document.getElementsByClassName("product-meta")[0].firstChild.innerHTML.replace(/[^A-Z\s]/g,'');		
						fromus_objectnametmp			=	/[\s]{0,}[A-Z]{1,}(.*)[A-Z]{1,}[\s]/.exec(fromus_objectnametmp)[0];		
						fromus_objectname				=	/[\s]{1,}(.*)/.exec(fromus_objectnametmp.replace(/[A-Z]{1,}/,' '))[1];
						
						fromus_objectname 				=	fromus_objectname.replace(/\s/g,'.').replace(/\.\./g,'.').replace(/\.\./g,'.').replace(/\.\./g,'.').replace(/\.\./g,'.').replace(/\.\./g,'.').replace(/\.\./g,'.').replace(/\.\./g,'.');
						fromus_objectname 				=	fromus_objectname.replace(/\./g,' ');
						fromus_objectname 				=	fromus_objectname.split(' ');
						fromus_objectnametmp			=	fromus_objectname[0]+' '+fromus_objectname[1]+' '+fromus_objectname[3]+' '+fromus_objectname[5]+' '+fromus_objectname[7]+' '+fromus_objectname[9];
						fromus_objectnametmp			=	fromus_objectnametmp+' '+fromus_objectname[11]+' '+fromus_objectname[13]+' '+fromus_objectname[15]+' '+fromus_objectname[17];
						fromus_objectnametmp			=	fromus_objectnametmp+' '+fromus_objectname[19]+' '+fromus_objectname[21]+' '+fromus_objectname[23]+' '+fromus_objectname[25];
						fromus_objectnametmp			=	fromus_objectnametmp+' '+fromus_objectname[27]+' '+fromus_objectname[29]+' '+fromus_objectname[31]+' '+fromus_objectname[33];
						fromus_objectnametmp			=	fromus_objectnametmp+' '+fromus_objectname[35]+' '+fromus_objectname[37]+' '+fromus_objectname[39]+' '+fromus_objectname[41];
						fromus_objectname				=	fromus_objectnametmp.replace(/ undefined/g,'');

						fromus_pricemintmp				= 	document.getElementsByClassName("variantprice")[0].innerText;
						fromus_pricemin					=	fromus_reg.exec(fromus_pricemintmp)[0];

						fromus_imgtmp					=	document.getElementsByClassName("product-img")[0].innerHTML;
						fromus_img						=	/\<img.*src=\"(.*(\.jpg|\.gif|\.png|\;)).*\>/.exec(fromus_imgtmp)[1];							
					}
				fromus_objectname				=	fromus_objectname.toLowerCase();	// Personne n'aime lire du texte en CAPSLOCK		
			}break;
			
		case "www.smashbox.com":
			{
				if(document.getElementsByClassName("spp-left-col")[0]!=undefined)
					{	// Fiche
						fromus_objectnametmp			=	document.getElementsByClassName("spp-left-col")[0].innerText;
						fromus_objectname				=	/(.*)\n/.exec(fromus_objectnametmp)[0];
					}
				else
					{	// Preview
						fromus_objectnametmp			=	document.getElementsByClassName("description-container")[0].innerText;
						fromus_objectname				=	/(.*)\n/.exec(fromus_objectnametmp)[0];
					}
					
				fromus_pricemin					=	document.getElementById("price-span").innerText;

				fromus_imgtmp					=	document.getElementsByClassName("spp_image")[0].innerHTML;
				fromus_img						=	'http://www.smashbox.com'+/\<img.*src=\"(.*(\.jpg|\.gif|\.png|\;)).*\>/.exec(fromus_imgtmp)[1];
				
				fromus_objectname				=	fromus_objectname.toLowerCase();	// Personne n'aime lire du texte en CAPSLOCK
			}break;	

		case "milanicosmetics.com":
			{
				fromus_objectnametmp			=	document.getElementById("product-meta").innerText;
				fromus_objectname				=	/(.*)\n/.exec(fromus_objectnametmp)[0];

				fromus_pricemin					=	document.getElementsByClassName("product-price")[0].innerText;

				fromus_imgtmp					=	document.getElementById("product-image-large").innerHTML;
				fromus_img						=	'http://www.smashbox.com/'+/\<img.*src=\"(.*(\.jpg|\.gif|\.png|\;)).*\>/.exec(fromus_imgtmp)[1];
			}break;			

		case "www.victoriassecret.com":
			{
				if(document.getElementById("vsImage")!=undefined)
					{ 	// Fiche
						fromus_objectnametmp			=	document.getElementsByClassName("short x-large cufon-replaced")[0].innerHTML.replace(/[^A-Za-z\s]/g,'');								
						fromus_objectnametmp			=	fromus_objectnametmp.replace(/cufon/g,' ').replace(/class/g,' ').replace(/canvas/g,' ').replace(/ alt/g,' ').replace(/style/g,' ').replace(/width/g,' ').replace(/px/g,' ').replace(/height/g,' ').replace(/text/g,' ').replace(/left/g,' ').replace(/top/g,' ');			
						fromus_objectname				=	/[\s]{1,}(.*)/.exec(fromus_objectnametmp.replace(/[A-Z]{1,}/,' '))[1];							
						fromus_objectname 				=	fromus_objectname.replace(/\s/g,'.').replace(/\.\./g,'.').replace(/\.\./g,'.').replace(/\.\./g,'.').replace(/\.\./g,'.').replace(/\.\./g,'.').replace(/\.\./g,'.').replace(/\.\./g,'.');								
						fromus_objectname 				=	fromus_objectname.replace(/\./g,' ');								
						fromus_objectname 				=	fromus_objectname.split(' ');							
						fromus_objectnametmp			=	fromus_objectname[1]+' '+fromus_objectname[3]+' '+fromus_objectname[5]+' '+fromus_objectname[7]+' '+fromus_objectname[9];							
						fromus_objectnametmp			=	fromus_objectnametmp+' '+fromus_objectname[11]+' '+fromus_objectname[13]+' '+fromus_objectname[15]+' '+fromus_objectname[17];		
						fromus_objectnametmp			=	fromus_objectnametmp+' '+fromus_objectname[19]+' '+fromus_objectname[21]+' '+fromus_objectname[23]+' '+fromus_objectname[25];
						fromus_objectnametmp			=	fromus_objectnametmp+' '+fromus_objectname[27]+' '+fromus_objectname[29]+' '+fromus_objectname[31]+' '+fromus_objectname[33];
						fromus_objectnametmp			=	fromus_objectnametmp+' '+fromus_objectname[35]+' '+fromus_objectname[37]+' '+fromus_objectname[39]+' '+fromus_objectname[41];
						fromus_objectname				=	fromus_objectnametmp.replace(/ undefined/g,'');

						fromus_img					=	document.getElementById("vsImage").src;		
					}
				else
					{	// Preview
						fromus_objectnametmp			=	document.getElementsByClassName("small short cufon-replaced")[0].innerHTML.replace(/[^A-Za-z\s]/g,'');								
						fromus_objectnametmp			=	fromus_objectnametmp.replace(/cufon/g,' ').replace(/class/g,' ').replace(/canvas/g,' ').replace(/ alt/g,' ').replace(/style/g,' ').replace(/width/g,' ').replace(/px/g,' ').replace(/height/g,' ').replace(/text/g,' ').replace(/left/g,' ').replace(/top/g,' ');			
						fromus_objectname				=	/[\s]{1,}(.*)/.exec(fromus_objectnametmp.replace(/[A-Z]{1,}/,' '))[1];							
						fromus_objectname 				=	fromus_objectname.replace(/\s/g,'.').replace(/\.\./g,'.').replace(/\.\./g,'.').replace(/\.\./g,'.').replace(/\.\./g,'.').replace(/\.\./g,'.').replace(/\.\./g,'.').replace(/\.\./g,'.');								
						fromus_objectname 				=	fromus_objectname.replace(/\./g,' ');								
						fromus_objectname 				=	fromus_objectname.split(' ');							
						fromus_objectnametmp			=	fromus_objectname[1]+' '+fromus_objectname[3]+' '+fromus_objectname[5]+' '+fromus_objectname[7]+' '+fromus_objectname[9];							
						fromus_objectnametmp			=	fromus_objectnametmp+' '+fromus_objectname[11]+' '+fromus_objectname[13]+' '+fromus_objectname[15]+' '+fromus_objectname[17];		
						fromus_objectnametmp			=	fromus_objectnametmp+' '+fromus_objectname[19]+' '+fromus_objectname[21]+' '+fromus_objectname[23]+' '+fromus_objectname[25];
						fromus_objectnametmp			=	fromus_objectnametmp+' '+fromus_objectname[27]+' '+fromus_objectname[29]+' '+fromus_objectname[31]+' '+fromus_objectname[33];
						fromus_objectnametmp			=	fromus_objectnametmp+' '+fromus_objectname[35]+' '+fromus_objectname[37]+' '+fromus_objectname[39]+' '+fromus_objectname[41];
						fromus_objectname				=	fromus_objectnametmp.replace(/ undefined/g,'');

						fromus_imgtmp					=	document.getElementsByClassName("col-a view")[0].innerHTML;	
						fromus_img						=	/\<img.*src=\"(.*(\.jpg|\.gif|\.png|\;)).*\>/.exec(fromus_imgtmp)[1];
					}			
						fromus_pricemintmp				= 	document.getElementsByClassName("pricing")[0].innerText;
						fromus_pricemin					=	/(\$[0-9\,]{0,}[\.0-9]{0,3})/.exec(fromus_pricemintmp)[0];		
			}break;
	
		case "www.staples.com":
			{
				fromus_objectnametmp			=	document.getElementsByClassName("gridWidth04 productDetails")[0].innerText;
				fromus_objectname				=	/(.*)\n/.exec(fromus_objectnametmp)[0];
	
				fromus_pricemin					=	fromus_reg.exec(document.getElementsByClassName("finalPrice")[0].innerText)[0];
	
				if(document.getElementById("largeProductImageQv")!=undefined)
					{	// Preview
						fromus_img						=	document.getElementById("largeProductImageQv").src;
					}
				else
					{	// Fiche
						fromus_img						=	document.getElementById("largeProductImage").src;						
					}
			}break;
	
		case "www.chevrolet.com":
			{
			
				if( /build-your-own/.test(fromus_offre))
					{	// S'il s'agit d'une page "buid your own vehicule"
						fromus_objectname				=	document.getElementById("totalPriceContainer").innerText;
						
						fromus_pricemintmp				=	document.getElementById("currentDisplayMSRP").innerText;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

						fromus_img						=	document.getElementById("img_ext").src;						
					}
				else
					{	// S'il s'agit d'une page présentant un véhicule
						fromus_objectnametmp			=	fromus_offre;
						fromus_objectname				=	/chevrolet.com\/(.*)\.html/.exec(fromus_objectnametmp)[1].replace(/-/g,' ');

						fromus_pricemintmp				=	document.getElementsByClassName('parbase ts_attr_c1 section')[0].innerText;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

						fromus_imgtmp					=	document.getElementsByClassName("modMh_item_1 colorizer_view mm_colorizer_c1 ui-helper-visible")[0].innerHTML;
						fromus_img						=	'http://www.chevrolet.com/'+/\<img.*src=\"(.*(\.jpg|\.gif|\.png)).*\>/.exec(fromus_imgtmp)[1];
					}
			}break;	
	
		case "www.cadillac.com":
			{
			
				if( /build-your-own/.test(fromus_offre))
					{	// S'il s'agit d'une page "buid your own vehicule"
						fromus_objectname				=	document.getElementById("totalPriceContainer").innerText;
						
						fromus_pricemintmp				=	document.getElementById("currentDisplayMSRP").innerText;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

						fromus_img						=	document.getElementById("img_ext").src;						
					}
				else
					{	// S'il s'agit d'une page présentant un véhicule
						fromus_objectnametmp			=	fromus_offre;
						fromus_objectname				=	/cadillac.com\/(.*)\.html/.exec(fromus_objectnametmp)[1].replace(/-/g,' ');

						fromus_pricemintmp				=	document.getElementsByClassName('mds-cmp-content19 mod modVi_2 section vi_2')[0].innerText;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

						fromus_imgtmp					=	document.getElementsByClassName("color-slides")[0].innerHTML;
						fromus_img						=	'http://www.cadillac.com'+/\<img.*src=\"(.*(\.jpg|\.gif|\.png))\"\>/.exec(fromus_imgtmp)[1];
					}
			}break;
		
		case "www.dodge.com":
			{
			
				if( /hostc\/bmo/.test(fromus_offre))
					{	// S'il s'agit d'une page "buid your own vehicule"
						fromus_objectname				=	document.getElementsByClassName("bmo-vehicleName")[0].innerText;
					
						fromus_pricemintmp				=	document.getElementById("summary-net-price-div").innerText;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];
	
						fromus_imgtmp					=	document.getElementById("bmo-vehicleImg-wrap").innerHTML.replace(/\n/,'');
						fromus_img						=	/\<img.*src=\"(.*(\.jpg|\.gif|\.png)).*\>/.exec(fromus_imgtmp)[1];						
					}
				else
					{	// S'il s'agit d'une page présentant un véhicule
						fromus_objectnametmp			=	fromus_offre;
						fromus_objectname				=	/dodge\.com.*(\/.*\/)$/.exec(fromus_objectnametmp)[1].replace(/\//g,' ');

						fromus_pricemintmp				=	document.getElementById('msrp').innerText;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

						fromus_img					=	document.getElementsByClassName("background")[0].src;
					}
			}break;
			
		case "www.chrysler.com":
			{
			
				if( /hostc\/bmo/.test(fromus_offre))
					{	// S'il s'agit d'une page "buid your own vehicule"
						fromus_objectname				=	document.getElementsByClassName("bmo-vehicleName")[0].innerText;
					
						fromus_pricemintmp				=	document.getElementsByClassName("pricingToolsNumber top-padding bottom-padding")[0].innerText.replace(/\s/g,'');
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];
	
						fromus_imgtmp					=	document.getElementById("bmo-vehicleImg-wrap").innerHTML.replace(/\n/,'');
						fromus_img						=	/\<img.*src=\"(.*(\.jpg|\.gif|\.png)).*\>/.exec(fromus_imgtmp)[1];						
					}
				else
					{	// S'il s'agit d'une page présentant un véhicule
						fromus_objectname				=	"CHRYSLER "+/\n(.*)\n/.exec(document.getElementById('configurator').innerText)[1];

						fromus_pricemintmp				=	document.getElementsByClassName('price')[0].innerText;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];
						
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// ATTENTION		Il n'y a pas d'image unique à récupérer!! Le chassis et les roues sont séparés!!    	ATTENTION ////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
						fromus_img						=	"Recuperation automatique impossible";
					}
			}break;
		
		case "www.buick.com":
			{
			
				if( /build-your-own/.test(fromus_offre))
					{	// S'il s'agit d'une page "buid your own vehicule"
						fromus_objectname				=	document.getElementById("totalPriceContainer").innerText;
						
						fromus_pricemintmp				=	document.getElementById("currentDisplayMSRP").innerText;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

						fromus_img						=	document.getElementById("img_ext").src;						
					}
				else
					{	// S'il s'agit d'une page présentant un véhicule
						fromus_objectnametmp			=	fromus_offre;
						fromus_objectname				=	/buick.com\/(.*)\.html/.exec(fromus_objectnametmp)[1].replace(/-/g,' ');

						fromus_pricemintmp				=	document.getElementsByClassName('txt3')[0].innerText;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

						fromus_imgtmp					=	document.getElementsByClassName("mod modMh_item_1 colorizer_view mm_colorizer_c1 ui-helper-visible")[0].innerHTML;
						fromus_img						=	'http://www.chevrolet.com/'+/\<img.*src=\"(.*(\.jpg|\.gif|\.png)).*\>/.exec(fromus_imgtmp)[1];
					}
			}break;
	
		case "www.lincoln.com":
			{
				fromus_objectname				=	document.getElementById("overviewTitle").innerText.replace(/\n.*/,"");

				fromus_pricemintmp				=	document.getElementById('starting-price-vehicle').innerText;
				fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////		ATTENTION		Les images sont gérées en flash, elles ne sont donc pas récupérées!!		ATTENTION		//////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////				
				
				fromus_img						=	"Recuperation automatique impossible";
			}break;	

		case "www.gmc.com":
			{
				if( /build-your-own/.test(fromus_offre))
					{	// S'il s'agit d'une page "buid your own vehicule"
						fromus_objectname				=	document.getElementById("totalPriceContainer").innerText;
						
						fromus_pricemintmp				=	document.getElementById("currentDisplayMSRP").innerText;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

						fromus_img						=	document.getElementById("img_ext").src;						
					}
				else
					{	// S'il s'agit d'une page présentant un véhicule
						fromus_objectnametmp			=	fromus_offre;
						fromus_objectname				=	/gmc.com\/(.*)\.html/.exec(fromus_objectnametmp)[1].replace(/-/g,' ');

						fromus_pricemintmp				=	document.getElementsByClassName('txt3')[0].innerText;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

						fromus_img					=	document.getElementById("threesixty-image").src;
					}
			}break;

		case "www.infinitiusa.com":
			{
				if( /build/.test(fromus_offre))
					{
						fromus_objectname				=	document.getElementsByClassName("model")[0].innerText;

						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(document.getElementsByClassName("price")[0].innerText)[0];

						fromus_img						=	document.getElementsByClassName("vehicle")[0].src;						
					}
				else
					{
						fromus_objectname				=	document.getElementsByClassName('model')[0].innerText;

						fromus_pricemintmp				=	document.getElementsByClassName('price standard')[0].innerText;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

						fromus_img						=	"Pas d'image sur cette page";	
					}
			}break;	

		case "www.scion.com":
			{
				if( /buildyourscion/.test(fromus_offre))
					{	// S'il s'agit d'une page "buid your own vehicule"
						fromus_objectname				=	/(.*)SUMMARY/.exec(document.getElementById("vehicle-cost-summary").innerText)[1];

						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(document.getElementById("summary-total").innerText)[0];
						
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////		ATTENTION		Les images sont gérées en flash, elles ne sont donc pas récupérées!!		ATTENTION		//////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				
						fromus_img						=	"Pas de recuperation automatique possible";						
					}
				else
					{	// S'il s'agit d'une page présentant un véhicule
						fromus_objectname				=	document.getElementsByClassName('h1 model')[0].innerText;

						fromus_pricemintmp				=	document.getElementsByClassName('model-price-block')[0].innerText;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

						fromus_img						=	"http://www.scion.com"+document.getElementsByClassName("model-detail-background")[0].getAttribute('backstretch');	
					}
			}break;

			case "www.harley-davidson.com":
			{alert("harley-davidson");
				fromus_harleypage						=	/harley-davidson\.com\/(.*)\//.exec(fromus_offre)[1];
		
				if(fromus_harleypage=="shop")
					{alert("shop");
						fromus_pricemin			=	document.getElementById("productPrice").innerText;
				alert(fromus_pricemin);		
						fromus_objectname		=	document.getElementById("detailsContent").innerText;
				alert(fromus_objectname);						
						fromus_img				=	"Image en flash";
				alert(fromus_img);	
					}
				
				if(fromus_harleypage=="store")
					{alert("store");
						
					}
					
				if(fromus_harleypage=="en_US/Motorcycles")
					{alert("motor");
		
					};
					
				if(fromus_harleypage=="used_bikes")
					{alert("used");
						
					}

			}break;

		case "www.indianmotorcycle.com":
			{
			if(document.getElementById("indian-model-overview-image")!=undefined)
				{	//S'il s'agit d'une page presentant une moto
					fromus_objectname				=	document.getElementById("indian-model-navigation").getElementsByTagName('div')[0].getElementsByTagName('h2')[0].innerText;

					fromus_pricemintmp				=	document.getElementsByClassName('price')[0].innerText;		
					fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

					fromus_img						=	document.getElementById("indian-model-overview-image").getElementsByTagName('img')[0].src;
				}
			else
				{	// S'il s'agit d'une page produit et théoriquement d'une preview, mais le code ne fonctionne pas dans ce cas (chrome, 03/05/13)
					fromus_objectname				=	document.getElementById("indian-ecomm-product-listing-container").getElementsByTagName('div')[0].getElementsByTagName('h3')[0].innerText;

					fromus_pricemintmp				=	document.getElementsByClassName('section')[0].getElementsByTagName('h3')[0].innerText;		
					fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

					fromus_img						=	document.getElementById("product-detail-image").getElementsByTagName('img')[0].src;
				}
			}break;
			
		case "www.fossil.com":
			{
					fromus_objectname					=	document.getElementById("productName").innerText;
	
					fromus_pricemin						=	/(\$[0-9]{0,}[\.0-9]{0,3})$/.exec(document.getElementById("productPrice").innerText.replace(/\s/g,''))[0];

					fromus_img							=	document.getElementById("mainImage").getElementsByTagName("img")[0].src;
			}break;
			
		case "www.collectiblestampsgallery.com":
			{
					fromus_objectname					=	document.getElementsByClassName("detailname")[0].innerText.replace(/\s/g,' ');
	
					fromus_pricemin						=	document.getElementById("pricediv0").innerText;

					fromus_img							=	document.getElementById("prodimage0").src;
			}break;			
				
		case "www.bebe.com":
			{
					if(document.getElementsByClassName("img-main")[0]!=undefined)
						{	// S'il s'agit d'une preview
							fromus_objectname			=	document.getElementsByClassName("product-information jsDescriptionWrap")[0].getElementsByTagName("h1")[0].getElementsByTagName("a")[0].innerText;
	
							fromus_pricemin				=	fromus_reg.exec(document.getElementsByClassName("price-container")[0].innerHTML)[0];
		
							fromus_img					=	document.getElementsByClassName("img-main")[0].getElementsByTagName("div")[0].getElementsByTagName("a")[0].getElementsByTagName("img")[0].src;
						}
					else	
						{	// S'il s'agit d'une page normale
							fromus_objectnametmp		=	/bebe.com\/[a-zA-Z\-\_0-9]{0,}\/[a-zA-Z\-\_0-9]{0,}\/(.*)\//.exec(fromus_offre)[1];									
							fromus_objectname			=	fromus_objectnametmp.replace(/\/.*/,'').replace(/\-/g,' ');
		
							fromus_pricemin				=	fromus_reg.exec(document.getElementsByClassName("priceDisplay")[0].innerHTML)[0];
	
							fromus_img					=	document.getElementsByClassName("entity-image")[0].getElementsByTagName("div")[0].getElementsByTagName("img")[0].src;
						}
			}break;		

		case "www.shopblackjack.com":
			{
					fromus_objectname					=	document.getElementsByClassName("productnamecolorLARGE colors_productname")[0].innerText;

					fromus_pricemin						=	fromus_reg.exec(document.getElementsByClassName("pricecolor colors_productprice")[0].innerText)[0];

					fromus_img							=	document.getElementById("product_photo").src;
			}break;
		
		case "www.hottopic.com":
			{
					fromus_objectname					=	document.getElementById("product-title").innerText;

					fromus_pricemin						=	/(\$[0-9\,]{0,}\.[0-9]{0,})$/.exec(document.getElementById("product-price").innerText.replace(/\s/g,''))[0];

					fromus_img							=	document.getElementById("product-image").getElementsByTagName("a")[0].getElementsByTagName("img")[0].src;
			}break;
	
		case "www.shopangl.com":
			{
					fromus_objectname					=	document.getElementsByClassName("sys_title_m")[0].innerText;

					fromus_pricemin						=	document.getElementById("textMultiPrice").innerText;

					fromus_img							=	document.getElementsByClassName("img_prd_detail")[0].src;
				
				
			}break;

		case "www.gilt.com":
			{
				fromus_objectname		=	document.getElementsByClassName("product-name")[0].innerText;
				
				fromus_pricemin			=	document.getElementsByClassName("price-emphasis")[0].innerText;
				
				fromus_img				=	document.getElementsByClassName("image-switcher-container")[0].getElementsByTagName("img")[0].src;
			}break;
			
		case "www.gilttaste.com":
			{  
				fromus_objectname		=	document.getElementsByClassName("product_name")[0].innerText;
				
				fromus_pricemin			=	fromus_reg.exec(document.getElementsByClassName("price")[0].innerText)[0];
				
				fromus_img				=	document.getElementsByClassName("product main")[0].src;
			}break;
				


				
		default :	//Cas par defaut, si le code est appele sur une page non geree.
			{
				fromus_objectname				=	"non trouve";
				fromus_pricemin					=	"non trouve";
				fromus_img						= 	"non trouve";
			}
	}
// stockage du nom dans local storage
localStorage["regName"] = fromus_objectname;
// stockage du prix dans local storage
localStorage["regPrice"] = fromus_pricemin;		
	
//window.alert("Vendeur: \n" + fromus_site + "\n\nOffre: \n" + fromus_offre + "\n\nNom: \n" + fromus_objectname + "\n\nImage: \n" + fromus_img + " \n\nPrix minimal: \n" + fromus_pricemin);	// Affichage des informations recuperees
