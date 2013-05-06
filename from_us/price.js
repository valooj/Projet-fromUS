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
// shop 11 http://www.ebay.com reporté.															//
// shop 13 endless a été racheté par amazon														//
// shop 15 http://www.gilt.com reporté															//
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


//	Rajout du code modifié par Sébastien SY le 03/05/2013
//	Supression de toutes les lignes contenant fromus_img et fromus_imgtmp car inutile pour l'extension


/////	Définition des variables	/////

var fromus_offre = document.location.href;		//récupération de l'adresse du l'offre
var fromus_site = /http[s]{0,1}\:\/\/(.*\.com)/gi.exec(fromus_offre)[1];	//stockage du site web où se trouve l'offre
var fromus_objectname,
	fromus_objectnametmp,		// Les variables tmp sont des variables temporaires requises pour le traitement d'un nombre considérable de sites
	fromus_pricemin,			// Le "fromus_" permet d'empêcher les conflits lors de l'utilisation du code dans une application, une extension ou un plugin
	fromus_pricemintmp,	
	fromus_reg;
var fromus_reg = /(\$[0-9\,]{0,}\.[0-9]{0,})/;
	
	

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
				
				
				
						

				fromus_pricemintmp				=	document.getElementById("priceSlot").innerText;
				fromus_pricemintmp				=	/(?:\$[0-9]{0,}\.[0-9]{2})[ ]{0,}\n{0,}(\$[0-9]{0,}\.[0-9]{2})/gi.exec(fromus_pricemintmp);
				fromus_pricemin					=	fromus_pricemintmp[1];
			}break;

		case "www.amazon.com":
			{	
				fromus_objectname				=	document.getElementById("btAsinTitle").innerText;
				
				
					
				fromus_pricemintmp				=	document.getElementsByClassName("priceLarge")[0].innerHTML;
				fromus_pricemintmp				+=	'';
				fromus_pricemin					=	fromus_pricemintmp;
			}break;
			
		case "www.beallsflorida.com":
			{
				fromus_objectname				=	document.getElementById("title").innerText;

				
						
					

				fromus_pricemintmp				=	document.getElementsByClassName("offer-price")[0].innerHTML;
				fromus_pricemintmp				+=	'';
				fromus_pricemin					=	fromus_pricemintmp;		
			}break;
			
		case "www.rakuten.com":
			{
			if(/(www\.rakuten\.com)/.test(fromus_offre))	// Si l'offre se trouve sur www.quelquechose.rakuten.com et non pas www.rakuten.com
				{	
				//Les sites en www.rakuten.quelquechose.com varient entre l'utilisation de deux modèle pour chaque info récupérée
				// c'est pourquoi cette section contient beaucoup de if/else se basant sur l'existence de noeuds.
					if(document.getElementById("StorePromo_title") != undefined)
						{
							fromus_objectnametmp				=	document.getElementById("StorePromo_title").title;
							fromus_objectname					=	fromus_objectnametmp.replace("Show me more info about ","").replace(/:.*/g,"");
							if(fromus_objectname == '')
								{
									fromus_objectname			=	document.getElementById("StorePromo_title").innerText;
								}
						}
					else
						{
							fromus_objectname				=	document.getElementById("AuthorArtistTitle_productTitle").innerText;
						}
					
					
					
					if(document.getElementById("StorePromo_PriceText") != undefined)
						{
							fromus_pricemintmp				=	document.getElementById("StorePromo_PriceText").innerText;
						}
					else
						{
							fromus_pricemintmp				=	document.getElementById("spanMainTotalPrice").innerText;
						}
					fromus_pricemintmp						+=	'';
					fromus_pricemin							=	fromus_pricemintmp;				
				}
			
			else	//Si l'offre se trouve sur http://rakuten.com 
				{
					fromus_objectname	=	document.getElementsByClassName("bwcProductTitleHolder")[0].innerText;	
					
					
					
							
					
					
					
					fromus_pricemintmp				=	document.getElementsByClassName("mpsTotalPriceMoney")[0].innerHTML;
					fromus_pricemintmp				+=	'';
					fromus_pricemin					=	fromus_pricemintmp;	
				}
			}break;
			
		case "www.disneystore.com":
			{
				fromus_objectname 	=	document.getElementsByTagName("h1")[0].innerText;

				
				
					
	
				if(document.getElementsByClassName("price sale")[0] != undefined)	//Si l'offre est une promotion, le noeud du prix change
					{
						fromus_pricemintmp					=	document.getElementsByClassName("price sale")[0].innerHTML;
						fromus_pricemintmp					= 	fromus_pricemintmp+'';
						fromus_pricemin						= 	/(\$)[0-9\.]{1,}/gi.exec(fromus_pricemintmp)[0];
					}	
				else
					{
						fromus_pricemintmp					=	document.getElementsByClassName("price")[0].innerHTML;
						fromus_pricemintmp					+=	'';
						fromus_pricemin						=	/(\$)[0-9,]{1,}(\.)[0-9]{2}/gi.exec(fromus_pricemintmp)[0];
					}				
			}break;
		
		case "www.walmart.com":
			{
				fromus_objectnametmp			=	document.getElementsByClassName("productTitle");
				fromus_objectname				=	fromus_objectnametmp[0].innerHTML;
				
				
							
				var fromus_walmart_$price		=	document.getElementsByClassName("bigPriceText1");
				var fromus_walmart_centsprice	=	document.getElementsByClassName("smallPriceText1");
				fromus_pricemin					=	fromus_walmart_$price[0].innerHTML + fromus_walmart_centsprice[0].innerHTML;
			}break;
		
		case "www.dogfunk.com":
			{
				fromus_objectname				=	document.getElementById("buy_box_title").innerText;
			
				
			
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

				
				

				fromus_pricemin					=	document.getElementById("priceSelected").innerText;
			}break;
		
		case "www.gap.com":
			{
				if(document.getElementById("quickLookPriceText")!=undefined)	// Les noeuds changent entre l'aperçu et la page dédiée
					{
						fromus_objectname				=	document.getElementById("quickLookProductName").innerText;
			
						
			
						fromus_pricemintmp				=	document.getElementById("quickLookPriceText").innerText;
						fromus_pricemin					=	/(\$[0-9]{0,})(\.)([0-9]{2})/gi.exec(fromus_pricemintmp)[0];
					}
				else
					{			
						fromus_objectname				=	document.getElementById("productNameText").innerText;
						
							
						
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

				
			}break;
		
		case "www.gymboree.com":
			{
			fromus_objectname				=	document.getElementById("p-title").innerText;
			
			
			
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

				
		}break;
		
		case "www.swimoutlet.com":
			{
				fromus_objectnametmp			=	document.getElementsByClassName("ProductNameColorLARGE");
				fromus_objectname				=	fromus_objectnametmp[0].innerHTML;		
		
				fromus_pricemintmp				=	document.getElementsByClassName("pricecolor");
				fromus_pricemin					=	fromus_pricemintmp[0].innerText + '';	
				fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})/gi.exec(fromus_pricemin)[0];		
				
						
		}break;
		
		case "www.jcrew.com":
			{	
				fromus_objectname				=	document.getElementById("pdp-title").innerText;		

				fromus_pricemintmp				=	document.getElementsByClassName("pdp-single")[0];
				fromus_pricemin					=	fromus_pricemintmp.innerText + '';	
				fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})/g.exec(fromus_pricemin)[0];				

				
								
				
							
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
			
								
				
			}break;
			
		case "www.kohls.com":
			{
				if(/(\/catalog\/)/.test(fromus_offre))		//S'il s'agit d'une preview
					{
						fromus_objectnametmp			=	document.getElementsByClassName("overlay_right");
						fromus_objectname				=	fromus_objectnametmp[0].innerText.replace("\n","");			

						
						
								
										
					}	
				else		// S'il s'agit d'une page dédiée
					{
						fromus_objectnametmp			=	document.getElementsByClassName("title");
						fromus_objectname				=	fromus_objectnametmp[0].innerText.replace("\n","");			

						
						
								
													
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
							
				
								
			}break;
				
		case "www1.macys.com":
			{
				if(document.getElementById("productTitle")!=undefined)	//Si on est la page du produit
					{
						fromus_objectname				=	document.getElementById("productTitle").innerText;

						
							

						//La ligne suivante récupère le dernier prix de l'élément, qui est le prix avec discount le cas échéant

						fromus_pricemintmp				=	document.getElementById("priceInfo").innerText.replace(/\n/g,"").replace(/\s/g,"").replace(/[^0-9\$\.]/g,'');
						fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})$/gi.exec(fromus_pricemintmp)[0];	
					}
				else	//Si on regarde une preview
					{				
						fromus_objectname				=	document.getElementById("quickViewProductName").innerText.replace(/Web ID(.*)/,'');
				
							

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

				
								
				
			}break;

		case "www.nike.com":
			{
				fromus_objectnametmp			=	document.getElementsByClassName("product-title");
				fromus_objectname				=	fromus_objectnametmp[0].innerHTML;			
			
				fromus_pricemintmp				=	document.getElementsByClassName("local")[0];
				fromus_pricemin					=	fromus_pricemintmp.innerText + '';	
				fromus_pricemin					=	/(\$[0-9]{0,}[\.0-9]{0,3})/g.exec(fromus_pricemin)[0];				

				
				
									
			}break;
			
		case "www.overstock.com":
			{
				if(document.getElementById("qv-hero-img")!=undefined)	//S'il s'agit d'une preview
					{
						fromus_objectname			=	document.getElementsByClassName("qv-hd")[0].innerText.replace(/\s/g,'').replace(/([a-z])([A-Z])/g, '$1 $2');
					
						
					}
				else	//S'il s'agit d'une fiche
					{
						fromus_objectnametmp			=	document.getElementById("prod_mainCenter").innerHTML.replace(/\s/g,'');
						fromus_objectname				=	/(?:\<h1\>)(.*)(?:\<\/h1\>)/.exec(fromus_objectnametmp)[1].replace(/<h1>/,'').replace(/([a-z])([A-Z])/g, '$1 $2');
									
						if(document.getElementById("activeImage")==undefined)	//Si l'image est zoomable
							{
								
								
								
							}
						else	// Si l'image n'est pas zoomable
							{
								
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
				
				
				
					
			}break;

		case "www.qvc.com":
			{			
				fromus_objectnametmp			=	document.getElementsByClassName("fn");
				fromus_objectname				=	fromus_objectnametmp[0].innerText;			
		
				
				
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

									
			}break;
	
		case "www.ruelala.com":
			{
				fromus_objectnametmp			=	document.getElementById("productAttributes").innerHTML;
				fromus_objectname				=	/(?:\<h2)(.*)(?:\<\/h2\>)/g.exec(fromus_objectnametmp.replace(/\s/g,''))[1].replace(/<h2>/,'').replace(/(.*)>/,'').replace(/([a-z])([A-Z])/g, '$1 $2');
				
				fromus_pricemin					=	document.getElementById("salePrice").innerText;		
		
										
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
				
				
			}break;

		case "www.shoes.com":
			{
				fromus_objectname				=	document.getElementsByClassName("PD_BrandStyle")[0].innerText;
				
				
				
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
							
			}break;

		case "www.toysrus.com":
			{
				fromus_objectname				=	/(.*)\n/.exec(document.getElementById("priceReviewAge").innerText)[1];			
	
				fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})$/.exec(document.getElementById("price").innerText.replace(/\n/g,''))[0];			

								
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
													
					}
			}break;
			
		case "www.afloral.com":
			{			
				if(document.getElementById("quickview")!=undefined)
					{	// Si c'est une preview
						fromus_objectname		=	document.getElementsByClassName("title")[0].innerText;
						
						fromus_pricemin			=	document.getElementsByClassName("ourprice")[0].innerText;
						
						
										
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
			
					
			}break;

		case "www.bodybuilding.com":
			{
				fromus_objectname				=	document.getElementsByClassName("fn")[0].innerText.replace("\n"," ");

				fromus_pricemintmp				=	document.getElementsByClassName("price")[0].innerText;
				fromus_pricemin					=	fromus_reg.exec(fromus_pricemintmp)[0];

				
				
			}break;
		
		case "www.daddiesboardshop.com":
			{
				fromus_objectname				=	document.getElementsByClassName("product-name")[0].innerText.replace("\n"," ");

				fromus_pricemintmp				=	document.getElementsByClassName("price")[0].innerText;
				fromus_pricemin					=	fromus_reg.exec(fromus_pricemintmp)[0];

				
				
			}break;			

		case "www.closeoutlinen.com":
			{
				fromus_objectname				=	document.getElementsByClassName("ProductTitleText")[0].innerText;

				fromus_pricemintmp				=	document.getElementById("priceinfo").innerText;
				fromus_pricemin					=	fromus_reg.exec(fromus_pricemintmp)[0];

				
			}break;

		case "www.altrec.com":
			{
				fromus_objectname				=	document.getElementsByClassName("detailBH1")[0].innerText;

				fromus_pricemintmp				=	document.getElementsByClassName("priceLine")[0].innerText;
				fromus_pricemin					=	fromus_reg.exec(fromus_pricemintmp)[0];

				
			}break;

		case "www.ae.com":
			{
				fromus_objectname				=	document.getElementsByClassName("pName")[0].innerText;

				fromus_pricemin					=	document.getElementsByClassName("price js_toPrice")[0].innerText.replace(/([0-9]{1,})([0-9]{2})/g, '$1\.$2');

				
				
			}break;			
		
		case "www.bhphotovideo.com":
			{			
				fromus_objectname				=	document.getElementById("productHeadingCC").innerText;

				fromus_pricemintmp				=	document.getElementsByClassName("priceList")[0].innerText.replace(/\s/gi,'').replace(/[a-zA-Z]/gi,'');
				fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})$/gi.exec(fromus_pricemintmp)[0];
				
				
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

				
				
		
				
			}break;

		case "www.urbandecay.com":
			{			
				fromus_objectname				=	document.getElementsByClassName("productname")[0].innerText;

				fromus_pricemintmp				=	document.getElementById("price").innerText.replace(/\s/gi,'').replace(/[a-zA-Z]/gi,'');
				fromus_pricemin					=	/(\$[0-9]{0,}\.[0-9]{2})$/gi.exec(fromus_pricemintmp)[0];

				
			}break;

		case "www.toofaced.com":
			{
				fromus_objectname				=	document.getElementsByClassName("productName")[0].innerText;

				fromus_pricemintmp				=	document.getElementsByClassName("variantprice")[0].innerText;
				fromus_pricemin					=	fromus_reg.exec(fromus_pricemintmp)[0];

				
				
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

				
				
			}break;

		case "tartecosmetics.com":
			{
				fromus_objectnametmp			=	document.getElementById("item_detailsTopInner").innerText;
				fromus_objectname				=	/(.*)\n/.exec(fromus_objectnametmp)[0];
	
				fromus_pricemin					=	fromus_reg.exec(fromus_objectnametmp)[0];

				
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

				
				
				
				fromus_objectname				=	fromus_objectname.toLowerCase();	// Personne n'aime lire du texte en CAPSLOCK
			}break;	

		case "milanicosmetics.com":
			{
				fromus_objectnametmp			=	document.getElementById("product-meta").innerText;
				fromus_objectname				=	/(.*)\n/.exec(fromus_objectnametmp)[0];

				fromus_pricemin					=	document.getElementsByClassName("product-price")[0].innerText;

				
				
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

							
						
					}			
						fromus_pricemintmp				= 	document.getElementsByClassName("pricing")[0].innerText;
						fromus_pricemin					=	/(\$[0-9\,]{0,}[\.0-9]{0,3})/.exec(fromus_pricemintmp)[0];		
			}break;
	
		case "www.staples.com":
			{
				fromus_objectnametmp			=	document.getElementsByClassName("gridWidth04 productDetails")[0].innerText;
				fromus_objectname				=	/(.*)\n/.exec(fromus_objectnametmp)[0];
	
				fromus_pricemin					=	fromus_reg.exec(document.getElementsByClassName("finalPrice")[0].innerText)[0];
	
				
			}break;
	
		case "www.chevrolet.com":
			{
			
				if( /build-your-own/.test(fromus_offre))
					{	// S'il s'agit d'une page "buid your own vehicule"
						fromus_objectname				=	document.getElementById("totalPriceContainer").innerText;
						
						fromus_pricemintmp				=	document.getElementById("currentDisplayMSRP").innerText;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

												
					}
				else
					{	// S'il s'agit d'une page présentant un véhicule
						fromus_objectnametmp			=	fromus_offre;
						fromus_objectname				=	/chevrolet.com\/(.*)\.html/.exec(fromus_objectnametmp)[1].replace(/-/g,' ');

						fromus_pricemintmp				=	document.getElementsByClassName('parbase ts_attr_c1 section')[0].innerText;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

						
						
					}
			}break;	
	
		case "www.cadillac.com":
			{
			
				if( /build-your-own/.test(fromus_offre))
					{	// S'il s'agit d'une page "buid your own vehicule"
						fromus_objectname				=	document.getElementById("totalPriceContainer").innerText;
						
						fromus_pricemintmp				=	document.getElementById("currentDisplayMSRP").innerText;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

												
					}
				else
					{	// S'il s'agit d'une page présentant un véhicule
						fromus_objectnametmp			=	fromus_offre;
						fromus_objectname				=	/cadillac.com\/(.*)\.html/.exec(fromus_objectnametmp)[1].replace(/-/g,' ');

						fromus_pricemintmp				=	document.getElementsByClassName('mds-cmp-content19 mod modVi_2 section vi_2')[0].innerText;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

						
						
					}
			}break;
		
		case "www.dodge.com":
			{
			
				if( /hostc\/bmo/.test(fromus_offre))
					{	// S'il s'agit d'une page "buid your own vehicule"
						fromus_objectname				=	document.getElementsByClassName("bmo-vehicleName")[0].innerText;
					
						fromus_pricemintmp				=	document.getElementById("summary-net-price-div").innerText;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];
	
						
												
					}
				else
					{	// S'il s'agit d'une page présentant un véhicule
						fromus_objectnametmp			=	fromus_offre;
						fromus_objectname				=	/dodge\.com.*(\/.*\/)$/.exec(fromus_objectnametmp)[1].replace(/\//g,' ');

						fromus_pricemintmp				=	document.getElementById('msrp').innerText;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

						
					}
			}break;
			
		case "www.chrysler.com":
			{
			
				if( /hostc\/bmo/.test(fromus_offre))
					{	// S'il s'agit d'une page "buid your own vehicule"
						fromus_objectname				=	document.getElementsByClassName("bmo-vehicleName")[0].innerText;
					
						fromus_pricemintmp				=	document.getElementsByClassName("pricingToolsNumber top-padding bottom-padding")[0].innerText.replace(/\s/g,'');
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];
	
						
												
					}
				else
					{	// S'il s'agit d'une page présentant un véhicule
						fromus_objectname				=	"CHRYSLER "+/\n(.*)\n/.exec(document.getElementById('configurator').innerText)[1];

						fromus_pricemintmp				=	document.getElementsByClassName('price')[0].innerText;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];
						
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// ATTENTION		Il n'y a pas d'image unique à récupérer!! Le chassis et les roues sont séparés!!    	ATTENTION ////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
						
					}
			}break;
		
		case "www.buick.com":
			{
			
				if( /build-your-own/.test(fromus_offre))
					{	// S'il s'agit d'une page "buid your own vehicule"
						fromus_objectname				=	document.getElementById("totalPriceContainer").innerText;
						
						fromus_pricemintmp				=	document.getElementById("currentDisplayMSRP").innerText;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

												
					}
				else
					{	// S'il s'agit d'une page présentant un véhicule
						fromus_objectnametmp			=	fromus_offre;
						fromus_objectname				=	/buick.com\/(.*)\.html/.exec(fromus_objectnametmp)[1].replace(/-/g,' ');

						fromus_pricemintmp				=	document.getElementsByClassName('txt3')[0].innerText;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

						
						
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
				
				
			}break;	

		case "www.gmc.com":
			{
				if( /build-your-own/.test(fromus_offre))
					{	// S'il s'agit d'une page "buid your own vehicule"
						fromus_objectname				=	document.getElementById("totalPriceContainer").innerText;
						
						fromus_pricemintmp				=	document.getElementById("currentDisplayMSRP").innerText;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

												
					}
				else
					{	// S'il s'agit d'une page présentant un véhicule
						fromus_objectnametmp			=	fromus_offre;
						fromus_objectname				=	/gmc.com\/(.*)\.html/.exec(fromus_objectnametmp)[1].replace(/-/g,' ');

						fromus_pricemintmp				=	document.getElementsByClassName('txt3')[0].innerText;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

						
					}
			}break;

		case "www.infinitiusa.com":
			{
				if( /build/.test(fromus_offre))
					{
						fromus_objectname				=	document.getElementsByClassName("model")[0].innerText;

						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(document.getElementsByClassName("price")[0].innerText)[0];

												
					}
				else
					{
						fromus_objectname				=	document.getElementsByClassName('model')[0].innerText;

						fromus_pricemintmp				=	document.getElementsByClassName('price standard')[0].innerText;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

							
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
				
												
					}
				else
					{	// S'il s'agit d'une page présentant un véhicule
						fromus_objectname				=	document.getElementsByClassName('h1 model')[0].innerText;

						fromus_pricemintmp				=	document.getElementsByClassName('model-price-block')[0].innerText;
						fromus_pricemin					=	/(\$[0-9\,]{0,})/.exec(fromus_pricemintmp)[0];

							
					}
			}break;

			
		default :	//Cas par défaut, si le code est appelé sur une page non gérée.
			{
				fromus_objectname				=	"non trouve";
				fromus_pricemin					=	"non trouve";
				
			}
	}

// stockage du nom dans local storage
localStorage["regName"] = fromus_objectname;

// stockage du prix dans local storage
localStorage["regPrice"] = fromus_pricemin;