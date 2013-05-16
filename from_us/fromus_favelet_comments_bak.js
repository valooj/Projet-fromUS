// Code JavaScript écrit par BERGS Guillaume (Contact: guillaume.robert.bergs@gmail.com)		//
// Dans le cadre de son stage du 15/04/13 au 24/06/13																//
//																																			//
// Objectif du script: 	Récupérer les informations de nom, site, page, image, description 			//
//								et prix de l'offre.																						//
//																																			//
// NB: Utiliser le fichier favelet.js comme favelet. N'utiliser le code suivant que								//
// dans une application, un plugin ou autre page web. 																//
//	(Le code n'étant pas compressé et riche en espaces et commentaires, il est fortement 			//
//	déconseillé de l'utiliser en l'état pour autre chose que du debbuging.)										//																							//
//																																			//
// Ajouter des sites est simple: il suffit d'ajouter des "case" supplémentaires tout en 					//
// suivant la structure déjà existante.																						//
// NB: En cas de site dont l'url est de type domaine1.site.com , domaine2.site.com ,					//
//  , domaine3.site.com, avec domaine le secteur d'activité (babies.site.com et 							//
//	outdoor.site.com par exemple) il est IMPERATIF de rajouter une ligne dans la section				//	
//	"Normalisation des sites du type quelquechose.nomdusite.com", suivant le modèle				//
//	existant. Cela permet de n'écrire qu'un "case" pour tout le site au lieu d'un "case"					//
//	par secteur d'activité. En plus de diminuer le temps nécessaire à écrire le code,						//
//	cela réduit le temps nécessaire au chargement du script.														//
//																																			//
// Actuellement, les offre "Kindle" du site amazon.com ne sont pas supportées:							//
// chaque produit de la gamme a une page web utilisant une structure qui lui est propre.				//
// 																																			//
// Walmart n'a pas le support des previews.																				//
// 																																			//
// 																																			//
// 																																			//
// 																																			//
// 																																			//
// shop 11 http://www.ebay.com reporté.																					//
// shop 13 endless a été racheté par amazon																			//
// 																																			//
// shop 16 http://www.guess.eu ne correspond pas à from-us														//	
// shop 29 www.nike.com : les pages de customisation produit ne sont pas traitées, car				//
// 			elles sont en flash.																										//
// shop 30 inaccessible (24 avril 2013)																						//	
// shop 32 = gap, qui est déjà fait.																							//
// shop 36 = ralphlauren.com qui est déjà fait																			//
// shop 38 http://www.saksfifthavenue.com utilise flash pour ses images										//
// shop 39 inaccessible (25 avril 2013)																						//
// shop 41 www.sierratradingpost.com n'a pas de récupération dans les previews						//
// shop 52 www.altrec.com ne marche pas si présence de vidéo comme image							//
// shop 84 www.anthropologie.eu ne correspond pas à from_us													//
// shop 86 www.bestbuy.com n'a pas le support des pages offres spéciales DELL						//
// shop 88 http://www.maccosmetics.com reporté																		//
// shop 89 www.toofaced.com : les previews ne fonctionnent pas												//
// shop 91 www.covergirl.com : ne fait que rediriger (ex: vers walmart) sans indiquer de prix			//
// shop 97 = shop 98 (www.victoriassecret.com)																		//
// shop 100 http://www.chinaglaze.com/ ne vend rien en ligne?													//
// shop 103 www.dell.com reporté																							//
// shop 104 www.ford.com reporté																							//
// shop 105 www.chevrolet.com : support des pages de type présentation et "build your own"		//
// shop 111 www.lincoln.com "build your own" en flash et images des pages de présentation 		//
//			gérées de la même façon.																							//
// shop 113 www.shelby.com reporté																						//
// shop 115 www.hummer.com ne permet pas l'achat et redirige vers general motors					//
// shop 116 www.pontiac.com ne permet pas l'achat et redirige vers general motors						//
// shop 118 www.saturn.com ne permet pas l'achat et redirige vers general motors						//
// shop 119 www.harley-davidson.com reporté																			//
// shop 120 www.shercousa.com ne vends rien. Le plus proche est une liste de petites annonces.//
// shop 121 www.atkmotorcyclesusa.com est en flash																//
// shop 122 www.buell.com ne vend rien, mais redirige vers des tiers.											//
// shop 123 www.indianmotorcycle.com les previews ne sont pas supportées, aucune raison 		//
//			rationnelle apparente. Un id présent sur la page est considéré comme indéfini.				//
// shop 124 à 127 = www. fossil.com																						//
// shop 128 à 132 http://www.michaelkors.com/ reporté																//
// shop 134-135 www.converse.com entièrement en flash															//
// shop 137 à 139 = www.bebe.com																							//
// shop 140 à 143 = www.shopblackjack.com																			//
// shop 143 à 145 = www.hottopic.com																					//
// shop 146 à 153 www.shopkitson.com reporté																		//
//																																			//
//	Infinityusa.com aurait changé de design?																				//
//																																			//
//																																			//
//																																			//
//																																			//
//																																			//
//																																			//
// Les outfits de gymboree.com ne sont pas supportés, ils sont  composés de produits				//
//	individuels accessibles séparément au même prix.																//
//																																			//
//	Les shops reportés sont majoritairement ceux qui présentent une structure complexe au 		//
//	premier abord et sembleraient nécessiter beaucoup de temps pour leur support.						//
//	Ex: Ford a un mix de flash et de html pour certaines pages, que du flash pour d'autres.			//
//		Le support partiel est donc possible, mais nécessite beaucoup de code comparé à d'autres//
//																																			//
//																																			//
//																																			//
//																																			//
//																																			//	

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
//	NB: Les sites dont le code n'est composé que de getElement(s) ById, TagName, ClassName, ou autre, ne seront pas détaillés.			//
//	Idéalement, tout getElement/s, (ainsi que la/les opération/s qui en découle/nt) devrai/en/t se trouver dans un "if" afin de ne pas bloquer	//
//	l'exécution du code en cas d'erreur.																																					//
	
switch(fromus_site)	//Permet de sélectionner le code relatif au site consulté
	{
		case "www.6pm.com":
			{
				fromus_objectnametmp			=	document.getElementsByClassName("link fn")[0];
				fromus_objectname				= 	fromus_objectnametmp.replace("http\:\/\/www\.6pm\.com\/","").replace(/-/g," ");
				
				fromus_img							=	document.getElementById("detailImage").getElementsByTagName("img")[0].src;

				fromus_pricemintmp				=	document.getElementById("priceSlot").textContent;
				fromus_pricemin					=	/(?:\$[0-9]{0,}\.[0-9]{2})[ ]{0,}\n{0,}(\$[0-9]{0,}\.[0-9]{2})/gi.exec(fromus_pricemintmp)[1];
				
				fromus_desc						=	document.getElementsByClassName("description")[0].textContent;					
			}break;

		case "www.amazon.com":
			{	
				fromus_objectname				=	document.getElementById("btAsinTitle").textContent;
				
				if(document.getElementById("main-image") != undefined)
				{
					fromus_img						=	document.getElementById("main-image").src;
				}
				else
					{
						fromus_img						=	document.getElementById("prodImage").src;
					}
					
				if(document.getElementsByClassName("priceLarge")[0]!=undefined)
					{
						fromus_pricemin					=	document.getElementsByClassName("priceLarge")[0].innerText;
					}
				if(document.getElementById("listPriceValue")!=undefined)
					{
						fromus_pricemin					=	document.getElementById("listPriceValue").innerText;
					}				
		
				if(document.getElementById("productDescription")!=undefined)
					{
						fromus_desc						=	document.getElementById("productDescription").textContent;
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
						fromus_objectname		=	document.getElementById("quick-order-section").getElementsByTagName("h2")[0].textContent;

						fromus_img				=	document.getElementById("productImage").src;	

						fromus_pricemin			=	document.getElementsByClassName("offer-price")[0].textContent;

						fromus_desc				=	fromus_objectname;							
					}
				else
					{	// S'il s'agit d'une page produit
						fromus_objectname		=	document.getElementById("title").textContent;

						fromus_img				=	document.getElementById("flyoutZoomView").getElementsByTagName("div")[0].getElementsByTagName("img")[0].src;	

						fromus_pricemin			=	document.getElementsByClassName("offer-price")[0].textContent;

						fromus_desc				=	document.getElementById("detail").textContent;
					}
			}break;
			
		case "www.rakuten.com":
			{
			if(!(/(www\.rakuten\.com)/.test(fromus_offre)))	// Si l'offre se trouve sur www.quelquechose.rakuten.com et non pas www.rakuten.com
				{	// qqc.rakuten.com
					fromus_objectname					=	document.getElementsByClassName("bwcProductTitle")[0].textContent;

					fromus_pricemin						=	document.getElementsByClassName("mpsTotalPriceMoney")[0].textContent;
					
					fromus_img							=	document.getElementsByClassName("item image")[0].getElementsByTagName("a")[0].getElementsByTagName("img")[0].src;

					fromus_desc							=	document.getElementById("ctl00_TemplateContentPlaceHolder_ctlProductSummary_divDescription").textContent;
				}
			else
				{	//rakuten.com
				// Le site varie entre l'utilisation de deux modèle pour chaque info récupérée c'est pourquoi cette section contient beaucoup de if/else 
				// se basant sur l'existence de noeuds.
					if(document.getElementById("AuthorArtistTitle_productTitle")!=undefined)
						{
							fromus_objectname			=	document.getElementById("AuthorArtistTitle_productTitle").textContent;
						}
					else
						{
							fromus_objectname			=	document.getElementById("StorePromo_title").textContent;
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
							fromus_pricemin				=	document.getElementById("spanMainTotalPrice").textContent;
						}
					else
						{
							fromus_pricemin				=	document.getElementById("StorePromo_PriceText").textContent;
						}
					
					if(document.getElementById("divDescription")!=undefined)
						{
							fromus_desc					=	document.getElementById("divDescription").textContent;
						}
					else
						{
							fromus_desc					=	document.getElementById("StorePromo_spnDescription1").textContent;
						}	
				}
			}break;
			
		case "www.disneystore.com":
			{
			
				if(document.getElementsByClassName("quickLook")[0]!=undefined)
					{	// S'il s'agit d'une preview
						fromus_objectname 						=	document.getElementsByClassName("quickLook")[0].getElementsByTagName("h1")[0].textContent;						
						
						fromus_img		 							=	document.getElementsByClassName("thumbs")[0].getElementsByTagName("img")[0].src;						
						
						if(document.getElementsByClassName("price regular largePrice")[0]!=undefined)
							{	// Si le produit est à son prix habituel
								fromus_pricemin					=	document.getElementsByClassName("price regular largePrice")[0].textContent;
							}
						else
							{	// Si le produit est en promotion
								fromus_pricemin					=	fromus_reg.exec(document.getElementsByClassName("price sale")[0].textContent)[0];
							}
							
						fromus_desc									=	fromus_objectname;
					}
				else
					{	// S'il s'agit d'une page produit
						fromus_objectname 						=	document.getElementsByTagName("h1")[0].textContent;

						fromus_img									=	document.getElementsByClassName("viewerMain")[0].getElementsByTagName("img")[0].src;
			
						if(document.getElementsByClassName("price sale")[0] != undefined)
							{	// Si le produit est en promotion
								fromus_pricemin					=	fromus_reg.exec(document.getElementsByClassName("price sale")[0].textContent)[0];
							}	
						else
							{	// Si le produit est à son prix habituel
								fromus_pricemintmp				=	document.getElementsByClassName("price")[0].textContent;
								fromus_pricemin					=	/(\$)[0-9,]{1,}(\.)[0-9]{2}/gi.exec(fromus_pricemintmp)[0];
							}						
					
						fromus_desc      							=	document.getElementsByClassName("productShortDescription")[0].textContent;
					}
			}break;
		
		case "www.walmart.com":
			{
				fromus_objectname			=	document.getElementsByClassName("productTitle")[0].textContent;
				
				fromus_img						= 	document.getElementById('Zoomer').href;

				fromus_pricemin					=	document.getElementsByClassName("clearfix camelPrice")[document.getElementsByClassName("clearfix camelPrice").length-1].textContent;
			
				fromus_desc						=	document.getElementsByClassName("ql-details-short-desc")[0].textContent;		
			}break;
				
		case "www.dogfunk.com":
			{
				fromus_objectname				=	document.getElementById("buy_box_title").textContent;
			
				fromus_img						=	document.getElementById("main_product_image").src;
			
				fromus_pricemintmp				=	document.getElementById("sales_price").textContent;
				fromus_pricemin					=	/(\$[0-9]{0,})(\.)([0-9]{2})/gi.exec(fromus_pricemintmp)[0];
				
				fromus_desc						=	document.getElementById("desc_and_bottom_line").textContent;
			}break;
		
		case "www.dsw.com":
			{
				if(document.getElementById("productPageContent")!=undefined)
					{	//Page
						fromus_objectname				=	document.getElementsByClassName("title")[0].textContent;
						
						fromus_desc							=	document.getElementById("productDesc").textContent;
					}
				else
					{	//Preview
						fromus_objectname				=	document.getElementsByClassName("productTitle")[0].textContent;
					}

				fromus_imgtmp					=	document.getElementsByClassName("zoom_fixed")[0];
				fromus_img						=	fromus_imgtmp.src;

				fromus_pricemin					=	document.getElementById("priceSelected").textContent;
			}break;
		
		case "www.gap.com":
			{
				if(document.getElementById("quickLookPriceText")!=undefined)	// Les noeuds changent entre l'aperçu et la page dédiée
					{	// Preview
						fromus_objectname				=	document.getElementById("quickLookProductName").textContent;
			
						fromus_img						=	document.getElementById("quicklook_product_image").src;
			
						fromus_pricemintmp				=	document.getElementById("quickLookPriceText").textContent;
						fromus_pricemin					=	/(\$[0-9]{0,})(\.)([0-9]{2})/gi.exec(fromus_pricemintmp)[0];
					}
				else
					{	// Page	
						fromus_objectname				=	document.getElementById("productNameText").textContent;
						
						fromus_img						=	document.getElementById("product_image").src;	
						
						fromus_pricemintmp				=	document.getElementById("priceText").textContent;
						fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})$/gi.exec(fromus_pricemintmp)[0];
						
						if(document.getElementsByClassName("description")[0]!=undefined)
							{	// Si la description existe, la prendre
								fromus_desc					=	document.getElementsByClassName("description")[0].textContent;
							}
					}
			}break;
				
		case "www.giggle.com":
			{
				fromus_objectname			=	document.getElementsByClassName("productname")[0].textContent;
				
				fromus_pricemintmp				=	document.getElementsByClassName("descript-price")[0].textContent;
				fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})/gi.exec(fromus_pricemintmp)[0];
				
				fromus_desc							=	document.getElementsByClassName("short-description")[0].textContent;
				
				if(document.getElementById("wrap")!=undefined)
					{	//Page
						fromus_img					=	document.getElementById("wrap").getElementsByTagName("a")[0].href;
					}
				else
					{	// Preview
						fromus_img					=	document.getElementsByClassName("productimage QuickViewproductimage")[0].getElementsByTagName("img")[0].src;
					}
			}break;
		
		case "www.gymboree.com":
			{
			fromus_objectname				=	document.getElementById("p-title").textContent;
			
			fromus_img						=	document.getElementById("p-picture").src;
			
			if(document.getElementsByClassName("reg-price-dollars")[0]!=undefined)
				{	//En cas de promo
					fromus_pricemintmp				=	document.getElementsByClassName("reg-price-dollars")[1].textContent;
				}
			else
				{	//Sinon
					fromus_pricemintmp				=	document.getElementById("b-price-s").textContent;
				}	
			fromus_pricemin					=	/(\$[0-9]{0,})(\.)([0-9]{2})/gi.exec(fromus_pricemintmp)[0];
			
			fromus_desc							=	document.getElementById("p-desc").textContent;
			}break;
		
		case "www.hautelook.com":
			{
				fromus_objectname				=	document.getElementsByClassName("product_title")[0].textContent;
		
				fromus_pricemintmp				=	document.getElementsByClassName("sale_price");
				fromus_pricemin					=	fromus_pricemintmp[0].textContent + '';	
				fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})/gi.exec(fromus_pricemin)[0];

				fromus_img							=	document.getElementById("imgModMediumImg").src;
				
				fromus_desc							=	document.getElementById("moduleProductInfo").textContent;
		}break;
		
		case "www.swimoutlet.com":
			{
				fromus_objectname			=	document.getElementsByClassName("ProductNameColorLARGE")[0].textContent;

				fromus_pricemintmp				=	document.getElementById("ProductPrice").textContent;
				fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})/gi.exec(fromus_pricemintmp)[0];		

				fromus_img							=	document.getElementById("product_photo").src;
				
				fromus_desc							= document.getElementsByClassName("so-product-description")[0].textContent;	
		}break;
		
		case "www.jcrew.com":
			{	
				fromus_objectname				=	document.getElementById("pdp-title").textContent;		

				fromus_pricemintmp				=	document.getElementsByClassName("pdp-single")[0].textContent.replace(/\s/g,'');
				fromus_pricemin					=	fromus_reg.exec(fromus_pricemintmp)[0];				

				fromus_img							=	document.getElementById("mainImg").src;

				fromus_desc							=	document.getElementsByClassName('descmore_text')[1].textContent;
			}break;
		
		case "www.jcpenney.com":
			{	
				fromus_objectname				=	document.getElementsByClassName("def_cur pdp_title")[0].textContent.replace("\n","");		
		
				fromus_pricemintmp				=	document.getElementById("priceDetails").textContent;				
				fromus_pricemintmp					=	/(\$[0-9]{0,}[\.]{0,1}[0-9]{0,2})$/gi.exec(fromus_pricemintmp);
				
				//La ligne suivante prend en charge les pages ayant un prix "original" et un prix "sale", celle d'après prend en charge toutes les autres pages
				
				if(fromus_pricemintmp==null)
					{
						fromus_pricemin=/(\$[0-9]{0,}[\.]{0,1}[0-9]{0,2})/gi.exec(document.getElementsByClassName("def_cur flt_clr disp_blk")[1].textContent + '')[0];
					}		
				else
					{
						fromus_pricemin=fromus_pricemintmp[0];
					}
					
				fromus_img						=	document.getElementById("mapImageSjElement4_img").src;

				if(document.getElementsByClassName("pdp_brand_desc_info")[0]!=undefined)
					{
						fromus_desc						=	document.getElementsByClassName("pdp_brand_desc_info")[0].textContent;
					}
			}break;
			
		case "www.juicycouture.com":
			{
				fromus_objectname			=	document.getElementsByClassName("product-name")[0].textContent;		

				fromus_pricemintmp				=	document.getElementsByClassName("product-price")[0].textContent;
				fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})/gi.exec(fromus_pricemintmp)[0];

				fromus_img							=	document.getElementsByClassName("product-primary-image")[0].getElementsByTagName("a")[0].href;				

				fromus_desc							=	document.getElementsByClassName('cnt product-description')[0].textContent;
			}break;
			
		case "www.kohls.com":
			{
				if(/(\/catalog\/)/.test(fromus_offre))		//S'il s'agit d'une preview
					{
						fromus_objectname			=	document.getElementsByClassName("overlay_right")[0].getElementsByTagName("h2")[0].textContent;
						
						fromus_img						=	document.getElementsByClassName("quickViewProductImage")[0].getElementsByTagName("a")[0].href;			
					}	
				else		// S'il s'agit d'une page dédiée
					{
						fromus_objectnametmp			=	document.getElementsByClassName("title");
						fromus_objectname				=	fromus_objectnametmp[0].textContent.replace("\n","");			

						fromus_img							=	document.getElementsByClassName("feature")[0].src;						
					}
				
				// Partie commune aux previews et pages dédiées
				
			
			// Ce site utilise deux noeuds, l'un pour les prix normaux et/ou originaux et l'autre pour les offres spéciales, "sales"
			// quelle que soit l'état de l'offre, les deux sont présents sur la page. Le code ci-dessous va donc en premier voir si
			// la partie "sale" est vide. Si elle ne l'est pas, il récupère le contenu, sinon, il récupère le contenu de la partie "original"
			
				fromus_pricemintmp						=	document.getElementsByClassName("sale")[0].textContent;
				fromus_pricemintmp						=	fromus_pricemintmp.replace("\n","");

				if(fromus_pricemintmp=='')
					{	
						fromus_pricemintmp					=	document.getElementsByClassName("original")[0].textContent;
					}	
				fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})/.exec(fromus_pricemintmp)[0];	

			if(document.getElementById("maincopy")!=undefined)
				{
					fromus_desc						=	document.getElementById("maincopy").textContent;
				}
			}break;			
			
		case "www.landsend.com":
			{
				fromus_objectname			=	document.getElementsByClassName("pp-product-name")[0].textContent;

				fromus_pricemintmp				=	document.getElementsByClassName("pp-summary-price")[0].textContent;
				fromus_pricemin					=	fromus_reg.exec(fromus_pricemintmp)[0];

				fromus_img						=	document.getElementById("backImageSjElement5_img").src;
				fromus_img						=	fromus_img.replace(/(\?.*)/,'');

				if(document.getElementsByClassName("pp-product-description")[0]!=undefined)
					{
						fromus_desc				=	document.getElementsByClassName("pp-product-description")[0].textContent;
					}
			}break;
		
		case "www.llbean.com":
			{
				if(document.getElementById("ppHeader")!=undefined)		//Si la page est propre à l'objet
					{
						fromus_objectname				=	document.getElementById("ppHeader").textContent;
					}
				else		//S'il s'agit d'une preview
					{	
						fromus_objectname				=	document.getElementById("quickviewContentRight").textContent;
					}
				fromus_objectname				=	fromus_objectname.replace(/(\n.*)/i,"");
				if(/ITEM/gi.test(fromus_objectname))	//Si le "nom" contient plus que le nom, tronquer
					{
					fromus_objectname	=	fromus_objectname.replace(/item.*/gi,'');			
					fromus_objectname	= 	/(.*)\n/gi.exec(fromus_objectname)[0];
					}

				fromus_pricemintmp				=	document.getElementsByClassName("toOrderItemPrice");
				fromus_pricemin					=	fromus_pricemintmp[0].textContent + '';	
				fromus_pricemin					=	/(\$[0-9]{0,}[\.0-9]{0,3})/gi.exec(fromus_pricemin)[0];				
							
				fromus_img						=	document.getElementById("backImageSjElement4_img").src;
				fromus_img						=	fromus_img.replace(/(\?.*)/,'');			
				
			if(document.getElementById("ppLongDesc")!=undefined)
					{
						fromus_desc				=	document.getElementById("ppLongDesc").textContent;
					}
			
			}break;
				
		case "www1.macys.com":
			{
				if(document.getElementById("productTitle")!=undefined)	//Page du produit
					{
						fromus_objectname				=	document.getElementById("productTitle").textContent;

						fromus_img						=	document.getElementById("mainView_1").src;
						fromus_img						= 	/(http)(.*)(\?)/gi.exec(fromus_img)[0].replace("?","");	

						//La ligne suivante récupère le dernier prix de l'élément, qui est le prix avec discount le cas échéant

						fromus_pricemintmp				=	document.getElementsByClassName("productPrice")[0].textContent.replace(/\n/g,"").replace(/\s/g,"").replace(/[^0-9\$\.]/g,'');
						fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})$/gi.exec(fromus_pricemintmp)[0];	

					}
				else	//Preview
					{				
						fromus_objectname				=	document.getElementById("quickViewProductName").textContent.replace(/Web ID(.*)/,'');

						fromus_img						=	document.getElementById("mapImageSjElement4_img").src;	

						//La ligne suivante récupère le dernier prix de l'élément, qui est le prix avec discount le cas échéant

						fromus_pricemintmp				=	document.getElementById("quickViewPrices").textContent.replace(/\n/g,"").replace(/\s/g,"").replace(/[^0-9\$\.]/g,'');
						fromus_pricemin					=	fromus_reg.exec(fromus_pricemintmp)[0];

					}
					
				if(document.getElementById("longDescription")!=undefined)
					{
						fromus_desc							=	document.getElementById("longDescription").textContent;
					}
			}break;
			
		case "www.moosejaw.com":
			{			
				fromus_objectnametmp			=	document.getElementsByClassName("product-name");
				fromus_objectname				=	fromus_objectnametmp[0].textContent.replace(/\n(.*)/g,"");	
				
				fromus_pricemintmp				=	document.getElementById("product-price").textContent.replace(/\n/g,"").replace(/\s/g,"").replace(/[^0-9\$\.]/g,'');
				fromus_pricemin					=	/(\$[0-9]{0,})(\.)([0-9]{2})/gi.exec(fromus_pricemintmp)[0];
		
				fromus_img						=	document.getElementById("main-image-link").href;		

				if(document.getElementsByClassName("description-left")[0]!=undefined)
					{
						fromus_desc				=	document.getElementsByClassName("description-left")[0].textContent;
					}
			}break;

		case "www.neimanmarcus.com":
			{
				if(document.getElementById("productName")!=undefined) // S'il s'agit d'une preview
					{
						fromus_objectnametmp			=	document.getElementById("productName").textContent;
						fromus_objectname				=	fromus_objectnametmp.replace(/\n(.*)/g,"");	
					}
				else	// S'il s'agit de la page d'un produit
					{
						fromus_objectnametmp			=	document.getElementsByClassName("lineItemInfo")[0].textContent.replace(/\s/g,'');
						fromus_objectname				=	/(.*\$)/.exec(fromus_objectnametmp)[0];	
				
						//La ligne suivante coupe le nom et insère un espace ainsi: aaaBbb => aaa Bbb
						
						fromus_objectname				=	fromus_objectname.substring(0,fromus_objectname.length-1).replace(/([a-z])([A-Z])/g, '$1 $2');
					}

				fromus_pricemintmp				=	document.getElementsByClassName("price")[0].textContent.replace(/\n/g,"").replace(/\s/g,"").replace(/[^0-9\$\.]/g,'');
				fromus_pricemin					=	fromus_reg.exec(fromus_pricemintmp)[0];

				fromus_img					=	document.getElementsByClassName("zoom-available")[0].src;

				if(document.getElementsByClassName("productCutline")[0]!=undefined)
					{
						fromus_desc				=	document.getElementsByClassName("productCutline")[0].textContent;
					}
				if(document.getElementById("qvDescription")!=undefined)
					{
						fromus_desc				=	document.getElementById("qvDescription").textContent;
					}
			}break;
			
			
		case "www.nike.com":
			{
				fromus_objectname				=	document.getElementsByClassName("product-title")[0].textContent;	
			
				fromus_pricemintmp				=	document.getElementsByClassName("local")[0].textContent;
				fromus_pricemin					=	/(\$[0-9]{0,}[\.0-9]{0,3})/g.exec(fromus_pricemintmp)[0];				

				fromus_img						=	document.getElementsByClassName("primary-product-image")[0].src;

				if(document.getElementById('pi-main-headline')!=undefined)
					{
						fromus_desc						=	document.getElementById('pi-main-headline').textContent;	
					}
				if(document.getElementsByClassName("pi-sub-title")[0]!=undefined)
				{
					fromus_desc				=	document.getElementsByClassName("pi-sub-title")[0].textContent;
				}				
					
					
			}break;
			
		case "www.overstock.com":
			{
				if(document.getElementById("qv-hero-img")!=undefined)	//S'il s'agit d'une preview
					{
						fromus_objectname			=	document.getElementsByClassName("qv-hd")[0].textContent.replace(/\s/g,'').replace(/([a-z])([A-Z])/g, '$1 $2');
					
						fromus_img						=	document.getElementById("qv-hero-img").src;
					}
				else	//S'il s'agit d'une fiche
					{
						fromus_objectname			=	document.getElementById("prod_mainCenter").getElementsByTagName("div")[0].getElementsByTagName("div")[0].textContent;
									
						if(document.getElementById("activeImage")==undefined)	//Si l'image est zoomable
							{
								fromus_img				=	document.getElementsByClassName("proImageCenter")[0].getElementsByTagName("img")[0].src;
							}
						else	// Si l'image n'est pas zoomable
							{
								fromus_img						=	document.getElementById("activeImage").src;
							}
					}	//Le prix est commun aux deux 		
				
					fromus_pricemintmp				=	document.getElementsByClassName("Ovalue main-price-red")[0].textContent;
					fromus_pricemin					=	fromus_reg.exec(fromus_pricemintmp)[0];		

				if(document.getElementById('details_descFull')!=undefined)
					{
						fromus_desc						=	document.getElementById('details_descFull').textContent;	
					}					
			}break;
				
		case "www.ralphlauren.com":
			{
				fromus_objectname			=	document.getElementById("title2Banner").getElementsByTagName("img")[0].alt;			

				fromus_pricemintmp				=	document.getElementsByClassName("ProductPriceContainer")[0].textContent;
				fromus_pricemintmp				=	fromus_pricemintmp.replace(/\s/g,'');
				fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})$/gi.exec(fromus_pricemintmp)[0];				
				
				fromus_img					=	document.getElementsByClassName("s7flyoutFlyoutView")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("img")[0].src;

				if(document.getElementById('padDescDiv')!=undefined)
					{
						fromus_desc						=	document.getElementById('padDescDiv').textContent;	
					}					
			}break;

		case "www.qvc.com":
			{			
				fromus_objectnametmp			=	document.getElementsByClassName("fn");
				fromus_objectname				=	fromus_objectnametmp[0].textContent;			
		
				fromus_img						=	document.getElementById("imageID").src;
				
				fromus_pricemintmp				=	document.getElementById("parProductDetailPrice").textContent;
				fromus_pricemin					=	/(\$[0-9]{0,})(\.)([0-9]{2})/gi.exec(fromus_pricemintmp)[0].replace(/\s/g,'');				
			
				if(document.getElementById('divProductDetailDescriptionAreaDisplay1')!=undefined)
					{
						fromus_desc						=	document.getElementById('divProductDetailDescriptionAreaDisplay1').textContent;	
					}					
			}break;

		case "www.rei.com":
			{
				fromus_objectnametmp			=	document.getElementsByClassName("fn");
				fromus_objectname				=	fromus_objectnametmp[0].textContent;				
				
				fromus_pricemintmp				=	document.getElementsByClassName("itemprice")[0].textContent;
				fromus_pricemintmp				=	fromus_pricemintmp.replace(/\s/g,'');
				fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})/gi.exec(fromus_pricemintmp)[0];					

				fromus_img							=	document.getElementById("zoomLink").href;

				if(document.getElementsByClassName("tab-content description cf")[0]!=undefined)
					{
						fromus_desc					=	document.getElementsByClassName("tab-content description cf")[0].textContent;
					}
				if(document.getElementById("videoDescription")!=undefined)
					{
						fromus_desc					=	document.getElementById("videoDescription").textContent;
					}
			}break;
	
		case "www.ruelala.com":
			{
				fromus_objectname				=	document.getElementById("productAttributes").getElementsByTagName("h2")[0].textContent;
				
				fromus_pricemin					=	document.getElementById("salePrice").textContent;		
		
				fromus_img						=	document.getElementById("imgZoom").src;	

				if(document.getElementById("info")!=undefined)
					{
						fromus_desc					=	document.getElementById("info").textContent;
					}
				if(document.getElementById("details")!=undefined)
					{
						fromus_desc					=	document.getElementById("details").textContent;
					}				
			}break;
		
		case "www.saksfifthavenue.com":
			{
				if(/(\/ProductDetail\.jsp)/.test(fromus_offre))
					{	// Si c'est la page du produit
						fromus_objectnametmp			=	document.getElementsByClassName("boldBlackText12");

						fromus_objectname				=	fromus_objectnametmp[0].textContent+' '+fromus_objectnametmp[1].textContent;
					}
				else
					{	// Si c'est une preview
						fromus_objectnametmp			=	document.getElementsByClassName("product-name");
						fromus_objectname				=	fromus_objectnametmp[0].textContent;
					
						fromus_objectnametmp			=	document.getElementsByClassName("product-title");
						fromus_objectname				=	fromus_objectname+' '+fromus_objectnametmp[0].textContent;
					}
					
				// Que ce soit un produit ou une preview
				
				if(document.getElementsByClassName("product-sale-price")[0] != undefined)
					{	// Si le produit est en "sale"
						fromus_pricemintmp				=	document.getElementsByClassName("product-sale-price")[0].textContent;
						fromus_pricemin					=	/(\$[0-9]{0,})(\.)([0-9]{2})/gi.exec(fromus_pricemintmp)[0].replace(/\s/g,'');						 
					}
				else
					{	// Si le produit est à son prix normal
						fromus_pricemintmp				=	document.getElementsByClassName("product-price")[0].textContent;
						fromus_pricemin					=	/(\$[0-9]{0,})(\.)([0-9]{2})$/gi.exec(fromus_pricemintmp.replace(/\s/g,'').replace(/[^0-9\$\.]/g,''))[0];						 
					}
					
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////		ATTENTION		Les images sont gérées en flash, elles ne sont donc pas récupérées!!		ATTENTION		//////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				
			//	fromus_img = "Recuperation manuelle necessaire";
				
				if(document.getElementsByClassName("productCopy-container")[0]!=undefined)
					{
						fromus_desc					=	document.getElementsByClassName("productCopy-container")[0].textContent;
					}
				if(document.getElementById("product-description")!=undefined)
					{
						fromus_desc					=	document.getElementById("product-description").textContent;
					}
			}break;

		case "www.shoes.com":
			{
				fromus_objectname				=	document.getElementsByClassName("PD_BrandStyle")[0].textContent;
				
				fromus_img						=	document.getElementById("ctl00_cphPageMain_ImageMultiView1_imgLargeDisplay").src;
				
				fromus_pricemintmp				=	document.getElementById("ctl00_cphPageMain_BrandAndPrice1_ProductPrice").textContent;
				fromus_pricemin					=	/(\$[0-9]{0,})(\.)([0-9]{2})/gi.exec(fromus_pricemintmp)[0];
				
				if(document.getElementById("ProductDescription")!=undefined)
					{
						fromus_desc					=	document.getElementById("ProductDescription").textContent;
					}
				
			}break;
		
		case "www.sierratradingpost.com":
			{
				if(document.getElementById("addToCartForm")==undefined)	// S'il s'agit d'une preview
					{			
						fromus_objectname				=	"Nom";	//La recuperation sur preview ne fonctionne pas ici. Dernière vérification : 25 avril 2013
					}
				else	// S'il s'agit d'une fiche
					{
						fromus_objectnametmp			=	document.getElementsByClassName("linkHeavySection");
						fromus_objectname				=	fromus_objectnametmp[0].textContent;								
					}

				fromus_pricemin							=	document.getElementById("displayPrice").textContent;
				fromus_img									=	document.getElementById("largeImage").src;	

				if(document.getElementById("overview")!=undefined)
					{
						fromus_desc							=	document.getElementById("overview").textContent;
					}
			}break;				
			
		case "www.target.com":
			{
				if(document.getElementsByClassName("priceSection")[0]!=undefined)	// Si on est dans une preview
					{
						fromus_objectnametmp			=	document.getElementsByClassName("productName");
						fromus_objectname				=	fromus_objectnametmp[0].textContent;	

						fromus_pricemintmp				=	document.getElementsByClassName("priceSection");
						fromus_pricemin					=	/\$[0-9]{0,}\.[0-9]{2}/.exec(fromus_pricemintmp[0].textContent);
					}
				else	// Si on est dans une fiche
					{		
						fromus_objectnametmp			=	document.getElementsByClassName("fn");
						fromus_objectname				=	fromus_objectnametmp[0].textContent;		
						
						fromus_pricemintmp				=	document.getElementsByClassName("offerPrice");
						fromus_pricemin					=	fromus_pricemintmp[0].textContent;
					}
				fromus_img						=	document.getElementById("heroImage").src;

				if(document.getElementsByClassName("extraProductLink horzBorder")[0]!=undefined)
					{
						fromus_desc					=	document.getElementsByClassName("extraProductLink horzBorder")[0].textContent;
					}
					if(document.getElementsByClassName("context-buttom-gap tabtextfont")[0]!=undefined)
					{
						fromus_desc					=	document.getElementsByClassName("context-buttom-gap tabtextfont")[0].textContent;
					}			
			}break;

		case "www.toysrus.com":
			{
				fromus_objectname				=	/(.*)\n/.exec(document.getElementById("priceReviewAge").textContent)[1];			
	
				fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})$/.exec(document.getElementById("price").textContent.replace(/\n/g,''))[0];			

				fromus_img						=	document.getElementById("curImageZoom").src;	

				if(document.getElementById("tabset_productPage")!=undefined)
					{
						fromus_desc					=	/description(.*)/gi.exec(document.getElementById("tabset_productPage").textContent.replace(/\n/g,''))[1];
					}			
			}break;
			
		case "www.urbanoutfitters.com":
			{
				if(/(\/ProductDetail\.jsp)/gi.test(fromus_offre))	// S'il s'agit d'une fiche
					{
						fromus_objectname				=	document.getElementById("prodTitle").textContent;			
						if(document.getElementsByClassName("promo-price")[0]!=undefined)
							{	// S'il s'agit d'une promo
								fromus_pricemin				=	document.getElementsByClassName("promo-price")[0].textContent;
							}			
						else
							{	// S'il s'agit d'une offre normale
								fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})$/.exec(document.getElementsByClassName("price")[0].textContent.replace(/\n/g,''))[0];
							}			
							
						fromus_img						=	document.getElementById("prodMainImg").src;						
					}
				else
					{	// S'il s'agit d'une preview
					
						fromus_objectname				=	document.getElementById("snapTitle").textContent;			
	
						if(document.getElementsByClassName("promo-price")[0]!=undefined)
							{	// S'il s'agit d'une promo
							fromus_pricemin				=	document.getElementsByClassName("promo-price")[0].textContent;
							}			
						else		
							{	// S'il s'agit d'une offre normale
								fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})$/.exec(document.getElementById("snapPrice").textContent.replace(/\n/g,''))[0];
							}			
						fromus_img						=	document.getElementById("detailMain").src;							
					}
					
			// Pas de description des produits? (13 mai 2013)
			}break;
			
		case "www.afloral.com":
			{			
				if(document.getElementById("quickview")!=undefined)
					{	// Si c'est une preview
						fromus_objectname		=	document.getElementById("quickview").getElementsByTagName("p")[0].textContent;
						
						fromus_pricemin			=	fromus_reg.exec(document.getElementById("quickview").getElementsByTagName("div")[1].textContent.replace(/s/g,''))[0];
						
						fromus_img					=	document.getElementById("quickview").getElementsByTagName("div")[0].getElementsByTagName("img")[0].src;
					}
				else
					{	// Si c'est une fiche
						fromus_objectname		=	document.getElementById("item-info").getElementsByTagName("h1")[0].textContent;
						
						fromus_img					=	document.getElementById("zoom1").getElementsByTagName("img")[0].src;
						
						fromus_pricemin			=	document.getElementsByClassName("current-price")[0].textContent;	
					}		
				if(document.getElementsByClassName("desc")[0]!=undefined)
					{
						fromus_desc					=	document.getElementById("quickview").getElementsByTagName("div")[1].getElementsByTagName("div")[0].textContent;
					}
				if(document.getElementById("item-description")!=undefined)
					{
						fromus_desc					=	document.getElementById("item-description").textContent;
					}					
			}break;

		case "www.backcountry.com":
			{
				fromus_objectname				=	document.getElementsByClassName("product-group-title product-name")[0].textContent;
		
				fromus_pricemintmp				=	document.getElementById("product-display-price").textContent;
				fromus_pricemin					=	fromus_reg.exec(fromus_pricemintmp)[0];
			
				fromus_img						=	document.getElementById("main_product_image").src;	
			// Pas de description des produits? (13 mai 2013)
			}break;

		case "www.bodybuilding.com":
			{
				fromus_objectname				=	document.getElementsByClassName("fn")[0].textContent.replace("\n"," ");

				fromus_pricemintmp				=	document.getElementsByClassName("price")[0].textContent;
				fromus_pricemin					=	fromus_reg.exec(fromus_pricemintmp)[0];

				fromus_img							=	document.getElementsByClassName("photo")[0].src;

				if(document.getElementsByClassName("product-content")[0]!=undefined)
					{
						fromus_desc					=	document.getElementsByClassName("product-content")[0].textContent.replace(/\n/g,'');
					}				
				
			}break;
		
		case "www.daddiesboardshop.com":
			{
				fromus_objectname				=	document.getElementsByClassName("product-name")[0].textContent.replace("\n"," ");

				fromus_pricemin				=	document.getElementsByClassName("price")[0].textContent;

				fromus_img						=	document.getElementById("main-image").href;
				
				if(document.getElementsByClassName("description")[0]!=undefined)
					{
						fromus_desc					=	document.getElementsByClassName("description")[0].textContent;
					}				
			}break;			

		case "www.closeoutlinen.com":
			{
				fromus_objectname				=	document.getElementsByClassName("ProductTitleText")[0].textContent;

				fromus_pricemintmp				=	document.getElementById("priceinfo").textContent;
				fromus_pricemin					=	fromus_reg.exec(fromus_pricemintmp)[0];

				fromus_img							=	document.getElementById("mainpic").src;
				
				if(document.getElementById("item-info")!=undefined)
					{
						fromus_desc					=	document.getElementById("item-info").textContent;
					}
			}break;

		case "www.altrec.com":
			{
				fromus_objectname				=	document.getElementsByClassName("detailBH1")[0].textContent;

				fromus_pricemintmp				=	document.getElementsByClassName("priceLine")[0].textContent;
				fromus_pricemin					=	fromus_reg.exec(fromus_pricemintmp)[0];

				fromus_img						=	document.getElementById("swatchImage").src;
				
				if(document.getElementById("detailReviewsLeft")!=undefined)
					{
						fromus_desc					=	document.getElementById("detailReviewsLeft").textContent;
					}				
			}break;

		case "www.ae.com":
			{
				fromus_objectname				=	document.getElementsByClassName("pName")[0].textContent;

				fromus_pricemin					=	document.getElementsByClassName("price js_toPrice")[0].textContent.replace(/([0-9]{1,})([0-9]{2})/g, '$1\.$2');

				fromus_img							=	document.getElementById("imgHolder").getElementsByTagName("img")[0].src;
				
				if(document.getElementsByClassName("addlEquity")[0]!=undefined)
					{
						fromus_desc					=	document.getElementsByClassName("addlEquity")[0].textContent;
					}
			}break;			
		
		case "www.bhphotovideo.com":
			{			
				fromus_objectname				=	document.getElementById("productHeadingCC").textContent;

				fromus_pricemintmp				=	document.getElementsByClassName("priceList")[0].textContent.replace(/\s/gi,'').replace(/[a-zA-Z]/gi,'');
				fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})$/gi.exec(fromus_pricemintmp)[0];
				
				fromus_img						=	document.getElementById("mainImage").src;
				
				if(document.getElementsByClassName("specWrapper bulletlist clearfix")[0]!=undefined)
					{
						fromus_desc					=	document.getElementsByClassName("specWrapper bulletlist clearfix")[0].textContent;
					}
			}break;
			
		case "www.bestbuy.com":
			{
				//Le site est basé sur la dualité de deux structures qui se mélangent, d'où la succession de if/else suivante.
				if(document.getElementById("sku-title")!=undefined)
					{
						fromus_objectname		=	document.getElementById("sku-title").textContent;
					}
				else
					{
						fromus_objectname	=	document.getElementById("productsummary").getElementsByTagName("h1")[0].textContent;
					}

				if(document.getElementById("saleprice")!=undefined)
					{
						fromus_pricemintmp		=	document.getElementById("saleprice").textContent;
					}
				else
					{
						fromus_pricemintmp		=	document.getElementsByClassName("item-price")[0].textContent;
					}			
				fromus_pricemin					=	fromus_reg.exec(fromus_pricemintmp)[0];	

				if(document.getElementById("postcard-thumbnail")!=undefined)
					{
						fromus_img					=	document.getElementById("postcard-thumbnail").getElementsByTagName("a")[0].getElementsByTagName("img")[0].src;
					}
				else
					{
						fromus_img					=	document.getElementById("imagepreview").getElementsByTagName("img")[0].src;
					}

				if(document.getElementById("tabbed-bundle-overview")!=undefined)
					{
						fromus_desc					=	document.getElementById("tabbed-bundle-overview").textContent;
					}			
				if(document.getElementsByClassName("csc-medium-column csc-last-column")[0]!=undefined)
					{
						fromus_desc					=	document.getElementsByClassName("csc-medium-column csc-last-column")[0].textContent;
					}					
				if(document.getElementById("features")!=undefined)
					{
						fromus_desc					=	document.getElementById("features").textContent;
					}

			}break;

		case "www.urbandecay.com":
			{			
				fromus_objectname				=	document.getElementsByClassName("productname")[0].textContent;

				fromus_pricemintmp				=	document.getElementById("price").textContent.replace(/\s/gi,'').replace(/[a-zA-Z]/gi,'');
				fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})$/gi.exec(fromus_pricemintmp)[0];

				fromus_img			=	document.getElementsByClassName("product-imageMain")[0].src;
				
				if(document.getElementsByClassName("mainattributes")[0]!=undefined)
					{
						fromus_desc					=	document.getElementsByClassName("mainattributes")[0].textContent;
					}				
			}break;

		case "www.bobbibrowncosmetics.com":
			{
				fromus_objectname				=	document.getElementsByClassName("product-info")[0].getElementsByTagName('h1')[0].textContent;

				if(document.getElementsByClassName("product-info")[0]!=undefined)
					{
						fromus_desc					=	document.getElementsByClassName("product-info")[0].textContent;
					}

				fromus_pricemintmp				=	document.getElementsByClassName("purchase-row")[0].textContent;
				fromus_pricemin					=	fromus_reg.exec(fromus_pricemintmp)[0];

				fromus_img							=	document.getElementsByClassName("img-holder")[0].getElementsByTagName("img")[0].src;
			}break;

		case "tartecosmetics.com":
			{
				fromus_objectnametmp			=	document.getElementById("item_detailsTopInner").textContent;
				fromus_objectname				=	/(.*)\n/.exec(fromus_objectnametmp)[0];
	
				fromus_pricemin					=	fromus_reg.exec(fromus_objectnametmp)[0];

				fromus_img						=	document.getElementById("productImg").src;
				
				if(document.getElementById("item_description")!=undefined)
					{
						fromus_desc					=	document.getElementById("item_description").textContent;
					}				
			}break;

		case "www.nyxcosmetics.com":
			{
				if(document.getElementById("product-description")!=undefined)
					{	// Fiche		
						fromus_objectname				=	document.getElementById("product-description").getElementsByTagName("h1")[0].textContent;
									
						fromus_pricemintmp				= 	document.getElementById("price").textContent;
						fromus_pricemin					=	fromus_reg.exec(fromus_pricemintmp)[0];		

						fromus_img						=	document.getElementById("product-image").getElementsByTagName("div")[0].getElementsByTagName("div")[1].getElementsByTagName("img")[0].src
					}
				else
					{	// Preview
						fromus_objectname				=	document.getElementsByClassName("product-meta")[0].getElementsByTagName("h2")[0].textContent;

						fromus_pricemintmp				= 	document.getElementsByClassName("product-meta")[0].getElementsByTagName("p")[0].textContent;
						fromus_pricemin					=	fromus_reg.exec(fromus_pricemintmp)[0];

						fromus_img							=	document.getElementsByClassName("product-img")[0].getElementsByTagName("img")[0].src;						
					}
				if(document.getElementsByClassName("description")[0]!=undefined)
					{
						fromus_desc					=	document.getElementsByClassName("product-meta")[0].getElementsByTagName("p")[1].textContent;
					}
				if(document.getElementById("description-content")!=undefined)
					{
						fromus_desc					=	document.getElementById("description-content").textContent;
					}				
				
					
				fromus_objectname				=	fromus_objectname.toLowerCase();	// Personne n'aime lire du texte en CAPSLOCK		
			}break;
			
		case "www.smashbox.com":
			{
				if(document.getElementsByClassName("spp-left-col")[0]!=undefined)
					{	// Fiche
						fromus_objectname				=	document.getElementsByClassName("spp-left-col")[0].getElementsByTagName("h1")[0].textContent;
					}
				else
					{	// Preview
						fromus_objectname				=	document.getElementsByClassName("description-container")[0].getElementsByTagName("h1")[0].textContent;
					}
					
				fromus_pricemin					=	document.getElementById("price-span").textContent;

				fromus_img							=	document.getElementsByClassName("spp_image")[0].getElementsByTagName("img")[0].src;

				if(document.getElementsByClassName("description")[0]!=undefined)
					{
						fromus_desc					=	document.getElementsByClassName("description")[0].textContent;
					}
				
				fromus_objectname				=	fromus_objectname.toLowerCase();	// Personne n'aime lire du texte en CAPSLOCK
			}break;	

		case "milanicosmetics.com":
			{
				fromus_objectname				=	document.getElementById("product-meta").getElementsByTagName("h1")[0].textContent;
				
				fromus_pricemin					=	document.getElementsByClassName("product-price")[0].textContent;

				fromus_img							=	document.getElementById("product-image-large").getElementsByTagName("img")[0].src;
				
				if(document.getElementById("product-meta")!=undefined)
					{
						fromus_desc					=	document.getElementById("product-meta").textContent;
					}
			}break;			

		case "www.victoriassecret.com":
			{
				if(document.getElementById("vsImage")!=undefined)
					{ 	// Fiche
						fromus_objectname				=	document.getElementsByClassName("short x-large cufon-replaced")[0].textContent;								

						fromus_img					=	document.getElementById("vsImage").src;		
					}
				else
					{	// Preview
						fromus_objectname			=	document.getElementsByClassName("small short cufon-replaced")[0].textContent;							

						fromus_img						=	document.getElementsByClassName("col-a view")[0].getElementsByTagName("img")[0].src;
					}			
						fromus_pricemintmp				= 	document.getElementsByClassName("pricing")[0].textContent;
						fromus_pricemin					=	/(\$[0-9\,]{0,}[\.0-9]{0,3})/.exec(fromus_pricemintmp)[0];	
				if(document.getElementsByClassName("full trunc-on")[0]!=undefined)
					{
						fromus_desc					=	document.getElementsByClassName("full trunc-on")[0].textContent;
					}						
			}break;
	
		case "www.staples.com":
			{
				fromus_objectnametmp			=	document.getElementsByClassName("gridWidth04 productDetails")[0].textContent;
				fromus_objectname				=	/(.*)\n/.exec(fromus_objectnametmp)[0];
	
				fromus_pricemin					=	fromus_reg.exec(document.getElementsByClassName("finalPrice")[0].textContent)[0];
	
				if(document.getElementById("largeProductImageQv")!=undefined)
					{	// Preview
						fromus_img						=	document.getElementById("largeProductImageQv").src;
					}
				else
					{	// Fiche
						fromus_img						=	document.getElementById("largeProductImage").src;						
					}
			
				if(document.getElementById("subdesc_content")!=undefined)
					{
						fromus_desc					=	document.getElementById("subdesc_content").textContent;
					}

				if(document.getElementById("subdesc_content").getElementsByTagName('div')[0]!=undefined)
					{
						fromus_desc					=	document.getElementById("subdesc_content").getElementsByTagName('div')[0].textContent;
					}				
			}break;
	
		case "www.chevrolet.com":
			{
			
				if( /build-your-own/.test(fromus_offre))
					{	// S'il s'agit d'une page "buid your own vehicule"
						fromus_objectname				=	document.getElementById("totalPriceContainer").textContent;
						
						fromus_pricemintmp				=	document.getElementById("currentDisplayMSRP").textContent;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

						fromus_img						=	document.getElementById("img_ext").src;						
					}
				else
					{	// S'il s'agit d'une page présentant un véhicule
						fromus_objectnametmp			=	fromus_offre;
						fromus_objectname				=	/chevrolet.com\/(.*)\.html/.exec(fromus_objectnametmp)[1].replace(/-/g,' ');

						fromus_pricemintmp				=	document.getElementsByClassName('parbase ts_attr_c1 section')[0].textContent;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

						if(document.getElementsByClassName("modMh_item_1 colorizer_view mm_colorizer_c1 ui-helper-visible")[0]!=undefined)
							{	
								fromus_img					=	document.getElementsByClassName("modMh_item_1 colorizer_view mm_colorizer_c1 ui-helper-visible")[0].getElementsByTagName('figure')[0].getElementsByTagName('img')[0].src;
							}
					}
			
				if(document.getElementsByClassName("mod modCnt_well_1 mds-cmp-content20")[0]!=undefined)
					{
						fromus_desc					=	document.getElementsByClassName("mod modCnt_well_1 mds-cmp-content20")[0].textContent;
					}			
			}break;	
	
		case "www.cadillac.com":
			{
			
				if( /build-your-own/.test(fromus_offre))
					{	// S'il s'agit d'une page "buid your own vehicule"
						fromus_objectname				=	document.getElementById("totalPriceContainer").textContent;
						
						fromus_pricemintmp				=	document.getElementById("currentDisplayMSRP").textContent;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

						fromus_img						=	document.getElementById("img_ext").src;						
					}
				else
					{	// S'il s'agit d'une page présentant un véhicule
						fromus_objectnametmp			=	fromus_offre;
						fromus_objectname				=	/cadillac.com\/(.*)\.html/.exec(fromus_objectnametmp)[1].replace(/-/g,' ');

						fromus_pricemintmp				=	document.getElementsByClassName('mds-cmp-content19 mod modVi_2 section vi_2')[0].textContent;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

						fromus_img						=	document.getElementsByClassName("color-slides")[0].getElementsByTagName('ul')[0].getElementsByTagName('li')[0].getElementsByTagName('img')[0].src;
						
						if(document.getElementsByClassName("fck_authorsinput tx")[0]!=undefined)
							{
								fromus_desc					=	document.getElementsByClassName("fck_authorsinput tx")[0].textContent;
							}
					}
			}break;
		
		case "www.dodge.com":
			{
			
				if( /hostc\/bmo/.test(fromus_offre))
					{	// S'il s'agit d'une page "buid your own vehicule"
						fromus_objectname				=	document.getElementsByClassName("bmo-vehicleName")[0].textContent;
					
						fromus_pricemintmp				=	document.getElementById("summary-net-price-div").textContent;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];
	
						fromus_img							=	document.getElementById("bmo-vehicleImg-wrap").getElementsByTagName("div")[0].getElementsByTagName("img")[0].src;					
					}
				else
					{	// S'il s'agit d'une page présentant un véhicule
						fromus_objectnametmp			=	fromus_offre;
						fromus_objectname				=	/dodge\.com.*(\/.*\/)$/.exec(fromus_objectnametmp)[1].replace(/\//g,' ');

						if(document.getElementsByClassName("background")[0]!=undefined)
							{
								fromus_img					=	document.getElementsByClassName("background")[0].src;
							}
						if(document.getElementById("msrp")!=undefined)
							{
								fromus_pricemintmp				=	document.getElementById('msrp').textContent;
								fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];
							}						
					}

				if(document.getElementsByClassName("specs_content")[0]!=undefined)
					{
						fromus_desc					=	document.getElementsByClassName("specs_content")[0].textContent;
					}
				if(document.getElementById("detail")!=undefined)
					{
						fromus_desc					=	document.getElementById("detail").textContent;
					}
					}break;
			
		case "www.chrysler.com":
			{		
				if( /hostc\/bmo/.test(fromus_offre))
					{	// S'il s'agit d'une page "buid your own vehicule"
						fromus_objectname				=	document.getElementsByClassName("bmo-vehicleName")[0].textContent;
					
						fromus_pricemintmp				=	document.getElementsByClassName("pricingToolsNumber top-padding bottom-padding")[0].textContent.replace(/\s/g,'');
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];
	
						fromus_img						=	document.getElementById("bmo-vehicleImg-wrap").getElementsByTagName("div")[0].getElementsByTagName("img")[0].src;						
					}
				else
					{	// S'il s'agit d'une page présentant un véhicule
						fromus_objectname				=	"CHRYSLER "+/\n(.*)\n/.exec(document.getElementById('configurator').textContent)[1];

						fromus_pricemintmp				=	document.getElementsByClassName('price')[0].textContent;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];
						
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// ATTENTION		Il n'y a pas d'image unique à récupérer!! Le chassis et les roues sont séparés!!    	ATTENTION ////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
						//fromus_img						=	"Recuperation automatique impossible";
					}
			
//Pas de véritable description		
			}break;
		
		case "www.buick.com":
			{	
				if( /build-your-own/.test(fromus_offre))
					{	// S'il s'agit d'une page "buid your own vehicule"
						fromus_objectname				=	document.getElementById("totalPriceContainer").textContent;
						
						fromus_pricemintmp				=	document.getElementById("currentDisplayMSRP").textContent;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

						fromus_img						=	document.getElementById("img_ext").src;						
					}
				else
					{	// S'il s'agit d'une page présentant un véhicule
						fromus_objectnametmp			=	fromus_offre;
						fromus_objectname				=	/buick.com\/(.*)\.html/.exec(fromus_objectnametmp)[1].replace(/-/g,' ');

						if(document.getElementsByClassName("txt3")[0]!=undefined)
							{
								fromus_pricemintmp				=	document.getElementsByClassName('txt3')[0].textContent;
								fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];
							}

						if(document.getElementsByClassName("mod modMh_item_1 colorizer_view mm_colorizer_c1 ui-helper-visible")[0]!=undefined)
							{
								fromus_img							=	document.getElementsByClassName("mod modMh_item_1 colorizer_view mm_colorizer_c1 ui-helper-visible")[0].getElementsByTagName("figure")[0].getElementsByTagName("img")[0].src;
							}
					}
			
				if(document.getElementsByClassName("fck_authorsinput tx")[0]!=undefined)
					{
						fromus_desc					=	document.getElementsByClassName("fck_authorsinput tx")[0].textContent;
					}			
			}break;
	
		case "www.lincoln.com":
			{
				fromus_objectname				=	document.getElementsByClassName("nameplate-titlename")[0].textContent;

				fromus_pricemintmp				=	document.getElementById('starting-price-vehicle').textContent;
				fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////		ATTENTION		Les images sont gérées en flash, elles ne sont donc pas récupérées!!		ATTENTION		//////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////				
				
				//fromus_img						=	"Recuperation automatique impossible";
				
				if(document.getElementById("overviewTitle")!=undefined)
					{
						fromus_desc					=	document.getElementById("overviewTitle").textContent;
					}				
			}break;	

		case "www.gmc.com":
			{
				if( /build-your-own/.test(fromus_offre))
					{	// S'il s'agit d'une page "buid your own vehicule"
						fromus_objectname				=	document.getElementById("totalPriceContainer").textContent;
						
						fromus_pricemintmp				=	document.getElementById("currentDisplayMSRP").textContent;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

						fromus_img						=	document.getElementById("img_ext").src;						
					}
				else
					{	// S'il s'agit d'une page présentant un véhicule
						fromus_objectnametmp			=	fromus_offre;
						fromus_objectname				=	/gmc.com\/(.*)\.html/.exec(fromus_objectnametmp)[1].replace(/-/g,' ');

						fromus_pricemintmp				=	document.getElementsByClassName('txt3')[0].textContent;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

						fromus_img					=	document.getElementById("threesixty-image").src;
						
						if(document.getElementsByClassName("mds-area-pn1")[0]!=undefined)
							{
								fromus_desc					=	document.getElementsByClassName("mds-area-pn1")[0].textContent;
							}						
					}
			}break;

		case "www.infinitiusa.com":
			{
				if( /build/.test(fromus_offre))
					{
						fromus_objectname				=	document.getElementsByClassName("model")[0].textContent;

						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(document.getElementsByClassName("price")[0].textContent)[0];

						fromus_img						=	document.getElementsByClassName("vehicle")[0].src;						
					}
				else
					{
						fromus_objectname				=	document.getElementsByClassName('model')[0].textContent;

						fromus_pricemintmp				=	document.getElementsByClassName('price standard')[0].textContent;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

						fromus_img						=	"Pas d'image sur cette page";	
					}
					
			}break;	

		case "www.scion.com":
			{
				if( /buildyourscion/.test(fromus_offre))
					{	// S'il s'agit d'une page "buid your own vehicule"
						fromus_objectname				=	/(.*)SUMMARY/.exec(document.getElementById("vehicle-cost-summary").textContent)[1];

						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(document.getElementById("summary-total").textContent)[0];
						
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////		ATTENTION		Les images sont gérées en flash, elles ne sont donc pas récupérées!!		ATTENTION		//////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				
						//fromus_img						=	"Pas de recuperation automatique possible";						
					}
				else
					{	// S'il s'agit d'une page présentant un véhicule
						fromus_objectname				=	document.getElementsByClassName('h1 model')[0].textContent;

						fromus_pricemintmp				=	document.getElementsByClassName('model-price-block')[0].textContent;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

						fromus_img						=	"http://www.scion.com"+document.getElementsByClassName("model-detail-background")[0].getAttribute('backstretch');	
					}
			
				if(document.getElementsByClassName("model-detail-block")[0]!=undefined)
					{
						fromus_desc					=	document.getElementsByClassName("model-detail-block")[0].textContent;
					}			
			}break;

			case "www.harley-davidson.com":
			{//alert("harley-davidson");
				fromus_harleypage						=	/harley-davidson\.com\/(.*)\//.exec(fromus_offre)[1];
		
				if(fromus_harleypage=="shop")
					{//alert("shop");
						fromus_pricemin			=	document.getElementById("productPrice").textContent;
				//alert(fromus_pricemin);		
						fromus_objectname		=	document.getElementById("detailsContent").textContent;
				//alert(fromus_objectname);						
						fromus_img				=	"Image en flash";
				//alert(fromus_img);	
					}
				
				if(fromus_harleypage=="store")
					{//alert("store");
						
					}
					
				if(fromus_harleypage=="en_US/Motorcycles")
					{//alert("motor");
		
					};
					
				if(fromus_harleypage=="used_bikes")
					{//alert("used");
						
					}

			}break;

		case "www.indianmotorcycle.com":
			{
			if(document.getElementById("indian-model-overview-image")!=undefined)
				{	//S'il s'agit d'une page presentant une moto
					fromus_objectname				=	document.getElementById("indian-model-navigation").getElementsByTagName('div')[0].getElementsByTagName('h2')[0].textContent;

					fromus_pricemintmp				=	document.getElementsByClassName('price')[0].textContent;		
					fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

					fromus_img						=	document.getElementById("indian-model-overview-image").getElementsByTagName('img')[0].src;
				}
			else
				{	// S'il s'agit d'une page produit et théoriquement d'une preview, mais le code ne fonctionne pas dans ce cas (chrome, 03/05/13)
					fromus_objectname				=	document.getElementById("indian-ecomm-product-listing-container").getElementsByTagName('div')[0].getElementsByTagName('h3')[0].textContent;

					fromus_pricemintmp				=	document.getElementsByClassName('section')[0].getElementsByTagName('h3')[0].textContent;		
					fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

					fromus_img						=	document.getElementById("product-detail-image").getElementsByTagName('img')[0].src;
				}
			
				if(document.getElementsByClassName("product-description selected")[0]!=undefined)
					{
						fromus_desc					=	document.getElementsByClassName("product-description selected")[0].textContent;
					}			
			}break;
			
		case "www.fossil.com":
			{
					fromus_objectname					=	document.getElementById("productName").textContent;
	
					fromus_pricemin						=	/(\$[0-9]{0,}[\.0-9]{0,3})$/.exec(document.getElementById("productPrice").textContent.replace(/\s/g,''))[0];

					fromus_img							=	document.getElementById("mainImage").getElementsByTagName("img")[0].src;
			
				if(document.getElementsByClassName("descText")[0]!=undefined)
					{
						fromus_desc					=	document.getElementsByClassName("descText")[0].textContent;
					}			
			}break;
			
		case "www.collectiblestampsgallery.com":
			{
					fromus_objectname					=	document.getElementsByClassName("detailname")[0].textContent.replace(/\s/g,' ');
	
					fromus_pricemin						=	document.getElementById("pricediv0").textContent;

					fromus_img							=	document.getElementById("prodimage0").src;
					
					if(document.getElementsByClassName("detaildescription")[0]!=undefined)
						{
							fromus_desc					=	document.getElementsByClassName("detaildescription")[0].textContent;
						}
			}break;			
				
		case "www.bebe.com":
			{
					if(document.getElementsByClassName("img-main")[0]!=undefined)
						{	// S'il s'agit d'une preview
							fromus_objectname			=	document.getElementsByClassName("product-information jsDescriptionWrap")[0].getElementsByTagName("h1")[0].getElementsByTagName("a")[0].textContent;
	
							fromus_pricemin				=	fromus_reg.exec(document.getElementsByClassName("price-container")[0].textContent)[0];
		
							fromus_img						=	document.getElementsByClassName("img-main")[0].getElementsByTagName("div")[0].getElementsByTagName("a")[0].getElementsByTagName("img")[0].src;
						}
					else	
						{	// S'il s'agit d'une page normale
							fromus_objectnametmp		=	/bebe.com\/[a-zA-Z\-\_0-9]{0,}\/[a-zA-Z\-\_0-9]{0,}\/(.*)\//.exec(fromus_offre)[1];									
							fromus_objectname			=	fromus_objectnametmp.replace(/\/.*/,'').replace(/\-/g,' ');
		
							fromus_pricemin				=	fromus_reg.exec(document.getElementsByClassName("priceDisplay")[0].textContent)[0];
	
							fromus_img						=	document.getElementsByClassName("entity-image")[0].getElementsByTagName("div")[0].getElementsByTagName("img")[0].src;
						}
						
				if(document.getElementsByClassName("description")[0]!=undefined)
					{
						fromus_desc							=	document.getElementsByClassName("description")[0].textContent;
					}
			}break;		

		case "www.shopblackjack.com":
			{
					fromus_objectname					=	document.getElementsByClassName("productnamecolorLARGE colors_productname")[0].textContent;

					fromus_pricemin						=	fromus_reg.exec(document.getElementsByClassName("pricecolor colors_productprice")[0].textContent)[0];

					fromus_img								=	document.getElementById("product_photo").src;
					
				if(document.getElementsByClassName("colors_descriptionbox")[0]!=undefined)
					{
						fromus_desc							=	document.getElementsByClassName("colors_descriptionbox")[0].textContent;
					}					
			}break;
		
		case "www.hottopic.com":
			{
				if(document.getElementsByClassName("pTitle")[0]!=undefined)
					{
						fromus_objectname							=	document.getElementsByClassName("pTitle")[0].textContent;
					}
				if(document.getElementById("product-title")!=undefined)
					{
						fromus_objectname							=	document.getElementById("product-title").textContent;
					}
					
				if(document.getElementsByClassName("pPrice")[0]!=undefined)
					{
						fromus_pricemin								=	document.getElementsByClassName("pPrice")[0].textContent;
					}
				if(document.getElementById("product-price")!=undefined)
					{
						fromus_pricemin								=	/(\$[0-9\,]{0,}\.[0-9]{0,})$/.exec(document.getElementById("product-price").textContent.replace(/\s/g,''))[0];
					}		
					
				if(document.getElementsByClassName("pPrice")[0]!=undefined)
					{
						fromus_img										=	document.getElementsByClassName("bigimage")[0].src;
					}
				if(document.getElementById("product-price")!=undefined)
					{
						fromus_img										=	document.getElementById("product-image").getElementsByTagName("a")[0].getElementsByTagName("img")[0].src;
					}							
					
				if(document.getElementById("productDesc")!=undefined)
					{
						fromus_desc							=	document.getElementById("productDesc").textContent;
					}					
			}break;
	
		case "www.shopangl.com":
			{
					fromus_objectname					=	document.getElementsByClassName("sys_title_m")[0].textContent;

					fromus_pricemin						=	document.getElementById("textMultiPrice").textContent;

					fromus_img								=	document.getElementsByClassName("img_prd_detail")[0].src;
						
					fromus_desc								=	"The one and only, superb and fabulous " + fromus_objectname;
			}break;

		case "www.gilt.com":
			{
				fromus_objectname		=	document.getElementsByClassName("product-name")[0].textContent;
				
				fromus_pricemin			=	document.getElementsByClassName("price-emphasis")[0].textContent;
				
				fromus_img					=	document.getElementsByClassName("image-switcher-container")[0].getElementsByTagName("img")[0].src;
			
				if(document.getElementsByClassName("content-container")[0]!=undefined)
					{
						fromus_desc					=	document.getElementsByClassName("content-container")[0].textContent;
					}			
			}break;
			
		case "www.gilttaste.com":
			{  
				fromus_objectname		=	document.getElementsByClassName("product_name")[0].textContent;
				
				fromus_pricemin			=	fromus_reg.exec(document.getElementsByClassName("price")[0].textContent)[0];
				
				fromus_img				=	document.getElementsByClassName("product main")[0].src;

				if(document.getElementsByClassName("summary")[0]!=undefined)
					{
						fromus_desc					=	document.getElementsByClassName("summary")[0].textContent;
					}						
			}break;
						
		default :	//Cas par defaut, si le code est appele sur une page non geree.
			{
				fromus_objectname				=	"non trouve";
				fromus_pricemin					=	"non trouve";
				fromus_img							= 	"non trouve";
			}
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
