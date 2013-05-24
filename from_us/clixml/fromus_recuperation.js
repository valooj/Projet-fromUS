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
var fromus_reg = /(\$[0-9\,]{0,}[\.0-9]{0,3})/g;	// Permet de récupérer un prix
var fromus_sitelist = new Array();	// Tableau contenant les sites
var fromus_error	=	'?';	// Message à afficher en absence de résultat
var fromus_moreprice,
fromus_morename,
fromus_moreimg,		// Ces variables servent à indiquer si l'utilisateur a demandé un/e autre nom, prix, description, image
fromus_moredesc;


/////////////////////////////////////// Début de l'attribution des valeurs aux indicateurs ///////////////////////////////////////
if(localStorage["fromus_morename"] != undefined)
{
	fromus_morename = JSON.parse(localStorage["fromus_morename"]);
}
else
{
	fromus_morename = false;
}
if(localStorage["fromus_moreprice"] != undefined)
{
	fromus_moreprice = JSON.parse(localStorage["fromus_moreprice"]);
}
else
{
	fromus_moreprice = false;
}
if(localStorage["fromus_moreimg"] != undefined)
{
	fromus_moreimg = JSON.parse(localStorage["fromus_moreimg"]);
}
else
{
	fromus_moreimg= false;
}
if(localStorage["fromus_moredesc"] != undefined)
{
	fromus_moredesc = JSON.parse(localStorage["fromus_moredesc"]);
}
else
{
	fromus_moredesc = false;
}
/////////////////////////////////////// Fin de l'attribution des valeurs aux indicateurs ///////////////////////////////////////

/**********************************************************************************************/
/*																																							*/
/*	Un site est traité comme un objet; ses attributs sont des tableaux.								*/
/*	Il y a deux tableaux par donnée à récupérer, un pour les classes et un pour les id.	*/
/*																																							*/
/**********************************************************************************************/

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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//déclaration de sites en dur pour le débug uniquement.

fromus_sitelist['www.6pm.com'] = new fromus_siteObj();
fromus_sitelist['www.6pm.com'].name_class.push('linkfn');
fromus_sitelist['www.6pm.com'].img_id.push('detailImage');
fromus_sitelist['www.6pm.com'].price_id.push('priceSlot');
fromus_sitelist['www.6pm.com'].desc_class.push('description');

fromus_sitelist['www.amazon.com'] = new fromus_siteObj();
fromus_sitelist['www.amazon.com'].name_id.push('btAsinTitle');
fromus_sitelist['www.amazon.com'].img_id.push('main-image');
fromus_sitelist['www.amazon.com'].img_id.push('prodImage');
fromus_sitelist['www.amazon.com'].price_class.push('priceLarge');
fromus_sitelist['www.amazon.com'].price_id.push('listPriceValue');
fromus_sitelist['www.amazon.com'].desc_id.push('productDescription');

fromus_sitelist['www.beallsflorida.com'] = new fromus_siteObj();
fromus_sitelist['www.beallsflorida.com'].name_id.push('quick-order-section');
fromus_sitelist['www.beallsflorida.com'].img_id.push('productImage');
fromus_sitelist['www.beallsflorida.com'].price_class.push('offer-price');
fromus_sitelist['www.beallsflorida.com'].name_id.push('title');
fromus_sitelist['www.beallsflorida.com'].img_id.push('flyoutZoomView');
fromus_sitelist['www.beallsflorida.com'].price_class.push('offer-price');
fromus_sitelist['www.beallsflorida.com'].desc_id.push('detail');

fromus_sitelist['www.rakuten.com'] = new fromus_siteObj();
fromus_sitelist['www.rakuten.com'].name_class.push('bwcProductTitle');
fromus_sitelist['www.rakuten.com'].price_class.push('mpsTotalPriceMoney');
fromus_sitelist['www.rakuten.com'].img_class.push('itemimage');
fromus_sitelist['www.rakuten.com'].desc_id.push('ctl00_TemplateContentPlaceHolder_ctlProductSummary_divDescription');
fromus_sitelist['www.rakuten.com'].name_id.push('AuthorArtistTitle_productTitle');
fromus_sitelist['www.rakuten.com'].name_id.push('StorePromo_title');
fromus_sitelist['www.rakuten.com'].img_id.push('ImageVideo_ImageRepeater_ctl00_Image');
fromus_sitelist['www.rakuten.com'].img_id.push('StorePromo_imgPromo');
fromus_sitelist['www.rakuten.com'].price_id.push('spanMainTotalPrice');
fromus_sitelist['www.rakuten.com'].price_id.push('StorePromo_PriceText');
fromus_sitelist['www.rakuten.com'].desc_id.push('divDescription');
fromus_sitelist['www.rakuten.com'].desc_id.push('StorePromo_spnDescription1');

fromus_sitelist['www.disneystore.com'] = new fromus_siteObj();
fromus_sitelist['www.disneystore.com'].name_class.push('quickLook');
fromus_sitelist['www.disneystore.com'].img_class.push('thumbs');
fromus_sitelist['www.disneystore.com'].price_class.push('priceregularlargePrice');
fromus_sitelist['www.disneystore.com'].price_class.push('pricesale');
fromus_sitelist['www.disneystore.com'].img_class.push('viewerMain');
fromus_sitelist['www.disneystore.com'].price_class.push('pricesale');
fromus_sitelist['www.disneystore.com'].price_class.push('price');
fromus_sitelist['www.disneystore.com'].desc_class.push('productShortDescription');

fromus_sitelist['www.walmart.com'] = new fromus_siteObj();
fromus_sitelist['www.walmart.com'].name_class.push('productTitle');
fromus_sitelist['www.walmart.com'].img_id.push('Zoomer');
fromus_sitelist['www.walmart.com'].price_class.push('clearfixcamelPrice');
fromus_sitelist['www.walmart.com'].desc_class.push('ql-details-short-desc');

fromus_sitelist['www.dogfunk.com'] = new fromus_siteObj();
fromus_sitelist['www.dogfunk.com'].name_id.push('buy_box_title');
fromus_sitelist['www.dogfunk.com'].img_id.push('main_product_image');
fromus_sitelist['www.dogfunk.com'].price_id.push('sales_price');
fromus_sitelist['www.dogfunk.com'].desc_id.push('desc_and_bottom_line');

fromus_sitelist['www.dsw.com'] = new fromus_siteObj();
fromus_sitelist['www.dsw.com'].name_class.push('title');
fromus_sitelist['www.dsw.com'].desc_id.push('productDesc');
fromus_sitelist['www.dsw.com'].name_class.push('productTitle');
fromus_sitelist['www.dsw.com'].img_class.push('zoom_fixed');
fromus_sitelist['www.dsw.com'].price_id.push('priceSelected');

fromus_sitelist['www.gap.com'] = new fromus_siteObj();
fromus_sitelist['www.gap.com'].name_id.push('quickLookProductName');
fromus_sitelist['www.gap.com'].img_id.push('quicklook_product_image');
fromus_sitelist['www.gap.com'].price_id.push('quickLookPriceText');
fromus_sitelist['www.gap.com'].name_id.push('productNameText');
fromus_sitelist['www.gap.com'].img_id.push('product_image');
fromus_sitelist['www.gap.com'].price_id.push('priceText');
fromus_sitelist['www.gap.com'].desc_class.push('description');

fromus_sitelist['www.giggle.com'] = new fromus_siteObj();
fromus_sitelist['www.giggle.com'].name_class.push('productname');
fromus_sitelist['www.giggle.com'].price_class.push('descript-price');
fromus_sitelist['www.giggle.com'].desc_class.push('short-description');
fromus_sitelist['www.giggle.com'].img_id.push('wrap');
fromus_sitelist['www.giggle.com'].img_class.push('productimageQuickViewproductimage');

fromus_sitelist['www.gymboree.com'] = new fromus_siteObj();
fromus_sitelist['www.gymboree.com'].name_id.push('p-title');
fromus_sitelist['www.gymboree.com'].img_id.push('p-picture');
fromus_sitelist['www.gymboree.com'].price_class.push('reg-price-dollars');
fromus_sitelist['www.gymboree.com'].price_id.push('b-price-s');
fromus_sitelist['www.gymboree.com'].desc_id.push('p-desc');

fromus_sitelist['www.hautelook.com'] = new fromus_siteObj();
fromus_sitelist['www.hautelook.com'].name_class.push('product_title');
fromus_sitelist['www.hautelook.com'].price_class.push('sale_price');
fromus_sitelist['www.hautelook.com'].img_id.push('imgModMediumImg');
fromus_sitelist['www.hautelook.com'].desc_id.push('moduleProductInfo');

fromus_sitelist['www.swimoutlet.com'] = new fromus_siteObj();
fromus_sitelist['www.swimoutlet.com'].name_class.push('ProductNameColorLARGE');
fromus_sitelist['www.swimoutlet.com'].price_id.push('ProductPrice');
fromus_sitelist['www.swimoutlet.com'].img_id.push('product_photo');
fromus_sitelist['www.swimoutlet.com'].desc_class.push('so-product-description');

fromus_sitelist['www.jcrew.com'] = new fromus_siteObj();
fromus_sitelist['www.jcrew.com'].name_id.push('pdp-title');
fromus_sitelist['www.jcrew.com'].price_class.push('pdp-single');
fromus_sitelist['www.jcrew.com'].img_id.push('mainImg');
fromus_sitelist['www.jcrew.com'].desc_class.push('descmore_text');

fromus_sitelist['www.jcpenney.com'] = new fromus_siteObj();
fromus_sitelist['www.jcpenney.com'].name_class.push('def_curpdp_title');
fromus_sitelist['www.jcpenney.com'].price_id.push('priceDetails');
fromus_sitelist['www.jcpenney.com'].price_class.push('def_curflt_clrdisp_blk');
fromus_sitelist['www.jcpenney.com'].img_id.push('mapImageSjElement4_img');
fromus_sitelist['www.jcpenney.com'].desc_class.push('pdp_brand_desc_info');

fromus_sitelist['www.juicycouture.com'] = new fromus_siteObj();
fromus_sitelist['www.juicycouture.com'].name_class.push('product-name');
fromus_sitelist['www.juicycouture.com'].price_class.push('product-price');
fromus_sitelist['www.juicycouture.com'].img_class.push('product-primary-image');
fromus_sitelist['www.juicycouture.com'].desc_class.push('cntproduct-description');

fromus_sitelist['www.kohls.com'] = new fromus_siteObj();
fromus_sitelist['www.kohls.com'].name_class.push('overlay_right');
fromus_sitelist['www.kohls.com'].img_class.push('quickViewProductImage');
fromus_sitelist['www.kohls.com'].name_class.push('title');
fromus_sitelist['www.kohls.com'].img_class.push('feature');
fromus_sitelist['www.kohls.com'].price_class.push('sale');
fromus_sitelist['www.kohls.com'].price_class.push('original');
fromus_sitelist['www.kohls.com'].desc_id.push('maincopy');

fromus_sitelist['www.landsend.com'] = new fromus_siteObj();
fromus_sitelist['www.landsend.com'].name_class.push('pp-product-name');
fromus_sitelist['www.landsend.com'].price_class.push('pp-summary-price');
fromus_sitelist['www.landsend.com'].img_id.push('backImageSjElement5_img');
fromus_sitelist['www.landsend.com'].desc_class.push('pp-product-description');

fromus_sitelist['www.llbean.com'] = new fromus_siteObj();
fromus_sitelist['www.llbean.com'].name_id.push('ppHeader');
fromus_sitelist['www.llbean.com'].name_id.push('quickviewContentRight');
fromus_sitelist['www.llbean.com'].price_class.push('toOrderItemPrice');
fromus_sitelist['www.llbean.com'].img_id.push('backImageSjElement4_img');
fromus_sitelist['www.llbean.com'].desc_id.push('ppLongDesc');

fromus_sitelist['www1.macys.com'] = new fromus_siteObj();
fromus_sitelist['www1.macys.com'].name_id.push('productTitle');
fromus_sitelist['www1.macys.com'].img_id.push('mainView_1');
fromus_sitelist['www1.macys.com'].price_class.push('productPrice');
fromus_sitelist['www1.macys.com'].name_id.push('quickViewProductName');
fromus_sitelist['www1.macys.com'].img_id.push('mapImageSjElement4_img');
fromus_sitelist['www1.macys.com'].price_id.push('quickViewPrices');
fromus_sitelist['www1.macys.com'].desc_id.push('longDescription');

fromus_sitelist['www.moosejaw.com'] = new fromus_siteObj();
fromus_sitelist['www.moosejaw.com'].name_class.push('product-name');
fromus_sitelist['www.moosejaw.com'].price_id.push('product-price');
fromus_sitelist['www.moosejaw.com'].img_id.push('main-image-link');
fromus_sitelist['www.moosejaw.com'].desc_class.push('description-left');

fromus_sitelist['www.neimanmarcus.com'] = new fromus_siteObj();
fromus_sitelist['www.neimanmarcus.com'].name_id.push('productName');
fromus_sitelist['www.neimanmarcus.com'].name_class.push('lineItemInfo');
fromus_sitelist['www.neimanmarcus.com'].price_class.push('price');
fromus_sitelist['www.neimanmarcus.com'].img_class.push('zoom-available');
fromus_sitelist['www.neimanmarcus.com'].desc_class.push('productCutline');
fromus_sitelist['www.neimanmarcus.com'].desc_id.push('qvDescription');

fromus_sitelist['www.nike.com'] = new fromus_siteObj();
fromus_sitelist['www.nike.com'].name_class.push('product-title');
fromus_sitelist['www.nike.com'].price_class.push('local');
fromus_sitelist['www.nike.com'].img_class.push('primary-product-image');
fromus_sitelist['www.nike.com'].desc_id.push('pi-main-headline');
fromus_sitelist['www.nike.com'].desc_class.push('pi-sub-title');

fromus_sitelist['www.overstock.com'] = new fromus_siteObj();
fromus_sitelist['www.overstock.com'].name_class.push('qv-hd');
fromus_sitelist['www.overstock.com'].img_id.push('qv-hero-img');
fromus_sitelist['www.overstock.com'].name_id.push('prod_mainCenter');
fromus_sitelist['www.overstock.com'].img_class.push('proImageCenter');
fromus_sitelist['www.overstock.com'].img_id.push('activeImage');
fromus_sitelist['www.overstock.com'].price_class.push('Ovaluemain-price-red');
fromus_sitelist['www.overstock.com'].desc_id.push('details_descFull');

fromus_sitelist['www.ralphlauren.com'] = new fromus_siteObj();
fromus_sitelist['www.ralphlauren.com'].name_id.push('title2Banner');
fromus_sitelist['www.ralphlauren.com'].price_class.push('ProductPriceContainer');
fromus_sitelist['www.ralphlauren.com'].img_class.push('s7flyoutFlyoutView');
fromus_sitelist['www.ralphlauren.com'].desc_id.push('padDescDiv');

fromus_sitelist['www.qvc.com'] = new fromus_siteObj();
fromus_sitelist['www.qvc.com'].name_class.push('fn');
fromus_sitelist['www.qvc.com'].img_id.push('imageID');
fromus_sitelist['www.qvc.com'].price_id.push('parProductDetailPrice');
fromus_sitelist['www.qvc.com'].desc_id.push('divProductDetailDescriptionAreaDisplay1');

fromus_sitelist['www.rei.com'] = new fromus_siteObj();
fromus_sitelist['www.rei.com'].name_class.push('fn');
fromus_sitelist['www.rei.com'].price_class.push('itemprice');
fromus_sitelist['www.rei.com'].img_id.push('zoomLink');
fromus_sitelist['www.rei.com'].desc_class.push('tab-contentdescriptioncf');
fromus_sitelist['www.rei.com'].desc_id.push('videoDescription');

fromus_sitelist['www.ruelala.com'] = new fromus_siteObj();
fromus_sitelist['www.ruelala.com'].name_id.push('productAttributes');
fromus_sitelist['www.ruelala.com'].price_id.push('salePrice');
fromus_sitelist['www.ruelala.com'].img_id.push('imgZoom');
fromus_sitelist['www.ruelala.com'].desc_id.push('info');
fromus_sitelist['www.ruelala.com'].desc_id.push('details');

fromus_sitelist['www.saksfifthavenue.com'] = new fromus_siteObj();
fromus_sitelist['www.saksfifthavenue.com'].name_class.push('boldBlackText12');
fromus_sitelist['www.saksfifthavenue.com'].name_class.push('product-name');
fromus_sitelist['www.saksfifthavenue.com'].name_class.push('product-title');
fromus_sitelist['www.saksfifthavenue.com'].price_class.push('product-sale-price');
fromus_sitelist['www.saksfifthavenue.com'].price_class.push('product-price');
fromus_sitelist['www.saksfifthavenue.com'].desc_class.push('productCopy-container');
fromus_sitelist['www.saksfifthavenue.com'].desc_id.push('product-description');

fromus_sitelist['www.shoes.com'] = new fromus_siteObj();
fromus_sitelist['www.shoes.com'].name_class.push('PD_BrandStyle');
fromus_sitelist['www.shoes.com'].img_id.push('ctl00_cphPageMain_ImageMultiView1_imgLargeDisplay');
fromus_sitelist['www.shoes.com'].price_id.push('ctl00_cphPageMain_BrandAndPrice1_ProductPrice');
fromus_sitelist['www.shoes.com'].desc_id.push('ProductDescription');

fromus_sitelist['www.sierratradingpost.com'] = new fromus_siteObj();
fromus_sitelist['www.sierratradingpost.com'].name_class.push('linkHeavySection');
fromus_sitelist['www.sierratradingpost.com'].price_id.push('displayPrice');
fromus_sitelist['www.sierratradingpost.com'].img_id.push('largeImage');
fromus_sitelist['www.sierratradingpost.com'].desc_id.push('overview');

fromus_sitelist['www.target.com'] = new fromus_siteObj();
fromus_sitelist['www.target.com'].name_class.push('productName');
fromus_sitelist['www.target.com'].price_class.push('priceSection');
fromus_sitelist['www.target.com'].name_class.push('fn');
fromus_sitelist['www.target.com'].price_class.push('offerPrice');
fromus_sitelist['www.target.com'].img_id.push('heroImage');
fromus_sitelist['www.target.com'].desc_class.push('extraProductLinkhorzBorder');
fromus_sitelist['www.target.com'].desc_class.push('context-buttom-gaptabtextfont');

fromus_sitelist['www.toysrus.com'] = new fromus_siteObj();
fromus_sitelist['www.toysrus.com'].name_id.push('priceReviewAge');
fromus_sitelist['www.toysrus.com'].price_id.push('price');
fromus_sitelist['www.toysrus.com'].img_id.push('curImageZoom');
fromus_sitelist['www.toysrus.com'].desc_id.push('tabset_productPage');

fromus_sitelist['www.urbanoutfitters.com'] = new fromus_siteObj();
fromus_sitelist['www.urbanoutfitters.com'].name_id.push('prodTitle');
fromus_sitelist['www.urbanoutfitters.com'].price_class.push('promo-price');
fromus_sitelist['www.urbanoutfitters.com'].price_class.push('price');
fromus_sitelist['www.urbanoutfitters.com'].img_id.push('prodMainImg');
fromus_sitelist['www.urbanoutfitters.com'].name_id.push('snapTitle');
fromus_sitelist['www.urbanoutfitters.com'].price_class.push('promo-price');
fromus_sitelist['www.urbanoutfitters.com'].price_id.push('snapPrice');
fromus_sitelist['www.urbanoutfitters.com'].img_id.push('detailMain');

fromus_sitelist['www.afloral.com'] = new fromus_siteObj();
fromus_sitelist['www.afloral.com'].name_id.push('quickview');
fromus_sitelist['www.afloral.com'].price_id.push('quickview');
fromus_sitelist['www.afloral.com'].img_id.push('quickview');
fromus_sitelist['www.afloral.com'].name_id.push('item-info');
fromus_sitelist['www.afloral.com'].img_id.push('zoom1');
fromus_sitelist['www.afloral.com'].price_class.push('current-price');
fromus_sitelist['www.afloral.com'].desc_id.push('quickview');
fromus_sitelist['www.afloral.com'].desc_id.push('item-description');

fromus_sitelist['www.backcountry.com'] = new fromus_siteObj();
fromus_sitelist['www.backcountry.com'].name_class.push('product-group-titleproduct-name');
fromus_sitelist['www.backcountry.com'].price_id.push('product-display-price');
fromus_sitelist['www.backcountry.com'].img_id.push('main_product_image');

fromus_sitelist['www.bodybuilding.com'] = new fromus_siteObj();
fromus_sitelist['www.bodybuilding.com'].name_class.push('fn');
fromus_sitelist['www.bodybuilding.com'].price_class.push('price');
fromus_sitelist['www.bodybuilding.com'].img_class.push('photo');
fromus_sitelist['www.bodybuilding.com'].desc_class.push('product-content');

fromus_sitelist['www.daddiesboardshop.com'] = new fromus_siteObj();
fromus_sitelist['www.daddiesboardshop.com'].name_class.push('product-name');
fromus_sitelist['www.daddiesboardshop.com'].price_class.push('price');
fromus_sitelist['www.daddiesboardshop.com'].img_id.push('main-image');
fromus_sitelist['www.daddiesboardshop.com'].desc_class.push('description');

fromus_sitelist['www.closeoutlinen.com'] = new fromus_siteObj();
fromus_sitelist['www.closeoutlinen.com'].name_class.push('ProductTitleText');
fromus_sitelist['www.closeoutlinen.com'].price_id.push('priceinfo');
fromus_sitelist['www.closeoutlinen.com'].img_id.push('mainpic');
fromus_sitelist['www.closeoutlinen.com'].desc_id.push('item-info');

fromus_sitelist['www.altrec.com'] = new fromus_siteObj();
fromus_sitelist['www.altrec.com'].name_class.push('detailBH1');
fromus_sitelist['www.altrec.com'].price_class.push('priceLine');
fromus_sitelist['www.altrec.com'].img_id.push('swatchImage');
fromus_sitelist['www.altrec.com'].desc_id.push('detailReviewsLeft');

fromus_sitelist['www.ae.com'] = new fromus_siteObj();
fromus_sitelist['www.ae.com'].name_class.push('pName');
fromus_sitelist['www.ae.com'].price_class.push('pricejs_toPrice');
fromus_sitelist['www.ae.com'].img_id.push('imgHolder');
fromus_sitelist['www.ae.com'].desc_class.push('addlEquity');

fromus_sitelist['www.bhphotovideo.com'] = new fromus_siteObj();
fromus_sitelist['www.bhphotovideo.com'].name_id.push('productHeadingCC');
fromus_sitelist['www.bhphotovideo.com'].price_class.push('priceList');
fromus_sitelist['www.bhphotovideo.com'].img_id.push('mainImage');
fromus_sitelist['www.bhphotovideo.com'].desc_class.push('specWrapperbulletlistclearfix');

fromus_sitelist['www.bestbuy.com'] = new fromus_siteObj();
fromus_sitelist['www.bestbuy.com'].name_id.push('sku-title');
fromus_sitelist['www.bestbuy.com'].name_id.push('productsummary');
fromus_sitelist['www.bestbuy.com'].price_id.push('saleprice');
fromus_sitelist['www.bestbuy.com'].price_class.push('item-price');
fromus_sitelist['www.bestbuy.com'].img_id.push('postcard-thumbnail');
fromus_sitelist['www.bestbuy.com'].img_id.push('imagepreview');
fromus_sitelist['www.bestbuy.com'].desc_id.push('tabbed-bundle-overview');
fromus_sitelist['www.bestbuy.com'].desc_class.push('csc-medium-columncsc-last-column');
fromus_sitelist['www.bestbuy.com'].desc_id.push('features');

fromus_sitelist['www.urbandecay.com'] = new fromus_siteObj();
fromus_sitelist['www.urbandecay.com'].name_class.push('productname');
fromus_sitelist['www.urbandecay.com'].price_id.push('price');
fromus_sitelist['www.urbandecay.com'].img_class.push('product-imageMain');
fromus_sitelist['www.urbandecay.com'].desc_class.push('mainattributes');

fromus_sitelist['www.bobbibrowncosmetics.com'] = new fromus_siteObj();
fromus_sitelist['www.bobbibrowncosmetics.com'].name_class.push('product-info');
fromus_sitelist['www.bobbibrowncosmetics.com'].desc_class.push('product-info');
fromus_sitelist['www.bobbibrowncosmetics.com'].price_class.push('purchase-row');
fromus_sitelist['www.bobbibrowncosmetics.com'].img_class.push('img-holder');

fromus_sitelist['www.tartecosmetics.com'] = new fromus_siteObj();
fromus_sitelist['www.tartecosmetics.com'].name_id.push('item_detailsTopInner');
fromus_sitelist['www.tartecosmetics.com'].img_id.push('productImg');
fromus_sitelist['www.tartecosmetics.com'].desc_id.push('item_description');

fromus_sitelist['www.nyxcosmetics.com'] = new fromus_siteObj();
fromus_sitelist['www.nyxcosmetics.com'].name_id.push('product-description');
fromus_sitelist['www.nyxcosmetics.com'].price_id.push('price');
fromus_sitelist['www.nyxcosmetics.com'].img_id.push('product-image');
fromus_sitelist['www.nyxcosmetics.com'].name_class.push('product-meta');
fromus_sitelist['www.nyxcosmetics.com'].price_class.push('product-meta');
fromus_sitelist['www.nyxcosmetics.com'].img_class.push('product-img');
fromus_sitelist['www.nyxcosmetics.com'].desc_class.push('product-meta');
fromus_sitelist['www.nyxcosmetics.com'].desc_id.push('description-content');

fromus_sitelist['www.smashbox.com'] = new fromus_siteObj();
fromus_sitelist['www.smashbox.com'].name_class.push('spp-left-col');
fromus_sitelist['www.smashbox.com'].name_class.push('description-container');
fromus_sitelist['www.smashbox.com'].price_id.push('price-span');
fromus_sitelist['www.smashbox.com'].img_class.push('spp_image');
fromus_sitelist['www.smashbox.com'].desc_class.push('description');

fromus_sitelist['www.milanicosmetics.com'] = new fromus_siteObj();
fromus_sitelist['www.milanicosmetics.com'].name_id.push('product-meta');
fromus_sitelist['www.milanicosmetics.com'].price_class.push('product-price');
fromus_sitelist['www.milanicosmetics.com'].img_id.push('product-image-large');
fromus_sitelist['www.milanicosmetics.com'].desc_id.push('product-meta');

fromus_sitelist['www.victoriassecret.com'] = new fromus_siteObj();
fromus_sitelist['www.victoriassecret.com'].name_class.push('shortx-largecufon-replaced');
fromus_sitelist['www.victoriassecret.com'].img_id.push('vsImage');
fromus_sitelist['www.victoriassecret.com'].name_class.push('smallshortcufon-replaced');
fromus_sitelist['www.victoriassecret.com'].img_class.push('col-aview');
fromus_sitelist['www.victoriassecret.com'].price_class.push('pricing');
fromus_sitelist['www.victoriassecret.com'].desc_class.push('fulltrunc-on');

fromus_sitelist['www.staples.com'] = new fromus_siteObj();
fromus_sitelist['www.staples.com'].name_class.push('gridWidth04productDetails');
fromus_sitelist['www.staples.com'].price_class.push('finalPrice');
fromus_sitelist['www.staples.com'].img_id.push('largeProductImageQv');
fromus_sitelist['www.staples.com'].img_id.push('largeProductImage');
fromus_sitelist['www.staples.com'].desc_id.push('subdesc_content');
fromus_sitelist['www.staples.com'].desc_id.push('subdesc_content');

fromus_sitelist['www.chevrolet.com'] = new fromus_siteObj();
fromus_sitelist['www.chevrolet.com'].name_id.push('totalPriceContainer');
fromus_sitelist['www.chevrolet.com'].price_id.push('currentDisplayMSRP');
fromus_sitelist['www.chevrolet.com'].img_id.push('img_ext');
fromus_sitelist['www.chevrolet.com'].price_class.push('parbasets_attr_c1section');
fromus_sitelist['www.chevrolet.com'].img_class.push('modMh_item_1colorizer_viewmm_colorizer_c1ui-helper-visible');
fromus_sitelist['www.chevrolet.com'].desc_class.push('modmodCnt_well_1mds-cmp-content20');

fromus_sitelist['www.cadillac.com'] = new fromus_siteObj();
fromus_sitelist['www.cadillac.com'].name_id.push('totalPriceContainer');
fromus_sitelist['www.cadillac.com'].price_id.push('currentDisplayMSRP');
fromus_sitelist['www.cadillac.com'].img_id.push('img_ext');
fromus_sitelist['www.cadillac.com'].price_class.push('mds-cmp-content19modmodVi_2sectionvi_2');
fromus_sitelist['www.cadillac.com'].img_class.push('color-slides');
fromus_sitelist['www.cadillac.com'].desc_class.push('fck_authorsinputtx');

fromus_sitelist['www.dodge.com'] = new fromus_siteObj();
fromus_sitelist['www.dodge.com'].name_class.push('bmo-vehicleName');
fromus_sitelist['www.dodge.com'].price_id.push('summary-net-price-div');
fromus_sitelist['www.dodge.com'].img_id.push('bmo-vehicleImg-wrap');
fromus_sitelist['www.dodge.com'].img_class.push('background');
fromus_sitelist['www.dodge.com'].price_id.push('msrp');
fromus_sitelist['www.dodge.com'].desc_class.push('specs_content');
fromus_sitelist['www.dodge.com'].desc_id.push('detail');

fromus_sitelist['www.chrysler.com'] = new fromus_siteObj();
fromus_sitelist['www.chrysler.com'].name_class.push('bmo-vehicleName');
fromus_sitelist['www.chrysler.com'].price_class.push('pricingToolsNumbertop-paddingbottom-padding');
fromus_sitelist['www.chrysler.com'].img_id.push('bmo-vehicleImg-wrap');
fromus_sitelist['www.chrysler.com'].name_id.push('configurator');
fromus_sitelist['www.chrysler.com'].price_class.push('price');

fromus_sitelist['www.buick.com'] = new fromus_siteObj();
fromus_sitelist['www.buick.com'].name_id.push('totalPriceContainer');
fromus_sitelist['www.buick.com'].price_id.push('currentDisplayMSRP');
fromus_sitelist['www.buick.com'].img_id.push('img_ext');
fromus_sitelist['www.buick.com'].price_class.push('txt3');
fromus_sitelist['www.buick.com'].img_class.push('modmodMh_item_1colorizer_viewmm_colorizer_c1ui-helper-visible');
fromus_sitelist['www.buick.com'].desc_class.push('fck_authorsinputtx');

fromus_sitelist['www.lincoln.com'] = new fromus_siteObj();
fromus_sitelist['www.lincoln.com'].name_class.push('nameplate-titlename');
fromus_sitelist['www.lincoln.com'].price_id.push('starting-price-vehicle');
fromus_sitelist['www.lincoln.com'].desc_id.push('overviewTitle');

fromus_sitelist['www.gmc.com'] = new fromus_siteObj();
fromus_sitelist['www.gmc.com'].name_id.push('totalPriceContainer');
fromus_sitelist['www.gmc.com'].price_id.push('currentDisplayMSRP');
fromus_sitelist['www.gmc.com'].img_id.push('img_ext');
fromus_sitelist['www.gmc.com'].price_class.push('txt3');
fromus_sitelist['www.gmc.com'].img_id.push('threesixty-image');
fromus_sitelist['www.gmc.com'].desc_class.push('mds-area-pn1');

fromus_sitelist['www.infinitiusa.com'] = new fromus_siteObj();
fromus_sitelist['www.infinitiusa.com'].name_class.push('model');
fromus_sitelist['www.infinitiusa.com'].price_class.push('price');
fromus_sitelist['www.infinitiusa.com'].img_class.push('vehicle');
fromus_sitelist['www.infinitiusa.com'].name_class.push('model');
fromus_sitelist['www.infinitiusa.com'].price_class.push('pricestandard');

fromus_sitelist['www.scion.com'] = new fromus_siteObj();
fromus_sitelist['www.scion.com'].name_id.push('vehicle-cost-summary');
fromus_sitelist['www.scion.com'].price_id.push('summary-total');
fromus_sitelist['www.scion.com'].name_class.push('h1model');
fromus_sitelist['www.scion.com'].price_class.push('model-price-block');
fromus_sitelist['www.scion.com'].desc_class.push('model-detail-block');

fromus_sitelist['www.harley-davidson.com'] = new fromus_siteObj();
fromus_sitelist['www.harley-davidson.com'].price_id.push('productPrice');
fromus_sitelist['www.harley-davidson.com'].name_id.push('detailsContent');

fromus_sitelist['www.indianmotorcycle.com'] = new fromus_siteObj();
fromus_sitelist['www.indianmotorcycle.com'].name_id.push('indian-model-navigation');
fromus_sitelist['www.indianmotorcycle.com'].price_class.push('price');
fromus_sitelist['www.indianmotorcycle.com'].img_id.push('indian-model-overview-image');
fromus_sitelist['www.indianmotorcycle.com'].name_id.push('indian-ecomm-product-listing-container');
fromus_sitelist['www.indianmotorcycle.com'].price_class.push('section');
fromus_sitelist['www.indianmotorcycle.com'].img_id.push('product-detail-image');
fromus_sitelist['www.indianmotorcycle.com'].desc_class.push('product-descriptionselected');

fromus_sitelist['www.fossil.com'] = new fromus_siteObj();
fromus_sitelist['www.fossil.com'].name_id.push('productName');
fromus_sitelist['www.fossil.com'].price_id.push('productPrice');
fromus_sitelist['www.fossil.com'].img_id.push('mainImage');
fromus_sitelist['www.fossil.com'].desc_class.push('descText');

fromus_sitelist['www.collectiblestampsgallery.com'] = new fromus_siteObj();
fromus_sitelist['www.collectiblestampsgallery.com'].name_class.push('detailname');
fromus_sitelist['www.collectiblestampsgallery.com'].price_id.push('pricediv0');
fromus_sitelist['www.collectiblestampsgallery.com'].img_id.push('prodimage0');
fromus_sitelist['www.collectiblestampsgallery.com'].desc_class.push('detaildescription');

fromus_sitelist['www.bebe.com'] = new fromus_siteObj();
fromus_sitelist['www.bebe.com'].name_class.push('product-informationjsDescriptionWrap');
fromus_sitelist['www.bebe.com'].price_class.push('price-container');
fromus_sitelist['www.bebe.com'].img_class.push('img-main');
fromus_sitelist['www.bebe.com'].price_class.push('priceDisplay');
fromus_sitelist['www.bebe.com'].img_class.push('entity-image');
fromus_sitelist['www.bebe.com'].desc_class.push('description');

fromus_sitelist['www.shopblackjack.com'] = new fromus_siteObj();
fromus_sitelist['www.shopblackjack.com'].name_class.push('productnamecolorLARGEcolors_productname');
fromus_sitelist['www.shopblackjack.com'].price_class.push('pricecolorcolors_productprice');
fromus_sitelist['www.shopblackjack.com'].img_id.push('product_photo');
fromus_sitelist['www.shopblackjack.com'].desc_class.push('colors_descriptionbox');

fromus_sitelist['www.hottopic.com'] = new fromus_siteObj();
fromus_sitelist['www.hottopic.com'].name_class.push('pTitle');
fromus_sitelist['www.hottopic.com'].name_id.push('product-title');
fromus_sitelist['www.hottopic.com'].price_class.push('pPrice');
fromus_sitelist['www.hottopic.com'].price_id.push('product-price');
fromus_sitelist['www.hottopic.com'].img_class.push('bigimage');
fromus_sitelist['www.hottopic.com'].img_id.push('product-image');
fromus_sitelist['www.hottopic.com'].desc_id.push('productDesc');

fromus_sitelist['www.shopangl.com'] = new fromus_siteObj();
fromus_sitelist['www.shopangl.com'].name_class.push('sys_title_m');
fromus_sitelist['www.shopangl.com'].price_id.push('textMultiPrice');
fromus_sitelist['www.shopangl.com'].img_class.push('img_prd_detail');

fromus_sitelist['www.gilt.com'] = new fromus_siteObj();
fromus_sitelist['www.gilt.com'].name_class.push('product-name');
fromus_sitelist['www.gilt.com'].price_class.push('price-emphasis');
fromus_sitelist['www.gilt.com'].img_class.push('image-switcher-container');
fromus_sitelist['www.gilt.com'].desc_class.push('content-container');

fromus_sitelist['www.gilttaste.com'] = new fromus_siteObj();
fromus_sitelist['www.gilttaste.com'].name_class.push('product_name');
fromus_sitelist['www.gilttaste.com'].price_class.push('price');
fromus_sitelist['www.gilttaste.com'].img_class.push('productmain');
fromus_sitelist['www.gilttaste.com'].desc_class.push('summary');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////// Partie cherchant l'info /////////////////////////////////////////////////////

// regex pour supprimmer www.         
var regStore = fromus_site.replace(/www\./,'');

// stockage du marchand dans local storage 
localStorage["regStore"] = regStore;	

if( fromus_sitelist[fromus_site] != undefined)
{	//Si le site est connu
	//name
	
	if(fromus_morename)
	{
		fromus_i = localStorage["fromus_iname"];
	}
	else
	{
		fromus_i = 0;
	}
	
	for(fromus_i ; (fromus_i < fromus_sitelist[fromus_site].name_id.length) && (fromus_objectname === undefined) ; fromus_i++)
	{	//Boucle parcourant les id connus du site pour voir si l'un d'eux est présent sur la page.
		var fromus_name_id = document.getElementById(fromus_sitelist[fromus_site].name_id[fromus_i]);
		if(fromus_name_id)
		{	//S'il y a un résultat, l'enregistrer
			fromus_objectname = fromus_name_id.textContent;
			localStorage["fromus_iname"] = fromus_i;
		}
	}
	
	if(fromus_morename)
	{
		fromus_i = localStorage["fromus_iname"];
	}
	else
	{
		fromus_i = 0;
	}
	
	
	if(fromus_objectname === undefined)
	{	//S'il n'y a pas eu de résultat, faire la recherche dans le tableau contenant les classes
		for(fromus_i ; (fromus_i < fromus_sitelist[fromus_site].name_class.length) && (fromus_objectname === undefined) ; fromus_i++)
		{
			var fromus_name_class = document.getElementsByClassName(fromus_sitelist[fromus_site].name_class[fromus_i])[0];
			if(fromus_name_class)
			{
				fromus_objectname = fromus_name_class.textContent;
				localStorage["fromus_iname"] = fromus_i;				
			}
		}
	}
	
	if(fromus_objectname === undefined)
	{	// S'il n'y a eu aucun résultat...
		fromus_objectname = fromus_error;
	}
	
	if(fromus_moreprice)
	{
		fromus_i = localStorage["fromus_iprice"];
	}
	else
	{
		fromus_i = 0;
	}
	
	
	//price 
	for(fromus_i ; (fromus_i < fromus_sitelist[fromus_site].name_id.length) && (fromus_pricemin === undefined) ; fromus_i++)
	{	//Boucle parcourant les id connus du site pour voir si l'un d'eux est présent sur la page.
		var fromus_price_id = document.getElementById(fromus_sitelist[fromus_site].price_id[fromus_i]);
		if(fromus_price_id)
		{	//S'il y a un résultat, l'enregistrer
			fromus_pricemin = fromus_price_id.textContent;
			localStorage["fromus_iprice"] = fromus_i;
		}
	}
	
	if(fromus_moreprice)
	{
		fromus_i = localStorage["fromus_iprice"];
	}
	else
	{
		fromus_i = 0;
	}	
	
	if(fromus_pricemin === undefined)
	{	//S'il n'y a pas eu de résultat, faire la recherche dans le tableau contenant les classes
		for(fromus_i ; (fromus_i < fromus_sitelist[fromus_site].name_class.length) && (fromus_pricemin === undefined) ; fromus_i++)
		{
			var fromus_price_class = document.getElementsByClassName(fromus_sitelist[fromus_site].price_class[fromus_i])[0];
			if(fromus_price_class)
			{
				fromus_pricemin = fromus_price_class.textContent;
				localStorage["fromus_iprice"] = fromus_i;
			}
		}
	}
	
	if(fromus_pricemin === undefined)
	{	// S'il n'y a eu aucun résultat...
		fromus_pricemin = fromus_error;
	}
	
	if(fromus_moreimg)
	{
		fromus_i = localStorage["fromus_img"];
	}
	else
	{
		fromus_i = 0;
	}		
	
	//img 
	for(fromus_i ; (fromus_i < fromus_sitelist[fromus_site].img_id.length) && (fromus_img === undefined) ; fromus_i++)
	{	//Boucle parcourant les id connus du site pour voir si l'un d'eux est présent sur la page.
		var fromus_img_id = document.getElementById(fromus_sitelist[fromus_site].img_id[fromus_i]);
		if(fromus_img_id)
		{	//S'il y a un résultat, vérifier s'il a un src ou un href et l'enregistrer le cas échéant
			if(fromus_img_id.href!=undefined)
			{
				fromus_img	=	fromus_img_id.href;
				localStorage["fromus_moreimg"] = fromus_i;
			}
			if(fromus_img_id.src!=undefined)
			{
				fromus_img	=	fromus_img_id.src;
				localStorage["fromus_moreimg"] = fromus_i;
			}
		}
	}
	
	if(fromus_moreimg)
	{
		fromus_i = localStorage["fromus_img"];
	}
	else
	{
		fromus_i = 0;
	}			
	
	if(fromus_img === undefined)
	{//S'il n'y a pas eu de résultat, faire la recherche dans le tableau contenant les classes
		for(fromus_i ; (fromus_i < fromus_sitelist[fromus_site].img_class.length) && (fromus_img === undefined) ; fromus_i++)
		{
			var fromus_img_class = document.getElementsByClassName(fromus_sitelist[fromus_site].img_class[fromus_i])[0];
			if(fromus_img_class)
			{
				if(fromus_img_class.href != undefined)
				{
					fromus_img = fromus_img_class.href;
					localStorage["fromus_moreimg"] = fromus_i;
				}
				if(fromus_img = fromus_img_class.src != undefined)
				{
					fromus_img = fromus_img_class.src;
					localStorage["fromus_moreimg"] = fromus_i;
				}
			}
		}
	}
	
	if(fromus_img === undefined)
	{	// S'il n'y a eu aucun résultat...
		fromus_img = fromus_error;
	}
	
	if(fromus_moredesc)
	{
		fromus_i = localStorage["fromus_desc"];
	}
	else
	{
		fromus_i = 0;
	}			
	
	
	//desc 
	for(fromus_i ; (fromus_i < fromus_sitelist[fromus_site].desc_id.length) && (fromus_desc === undefined) ; fromus_i++)
	{	//Boucle parcourant les id connus du site pour voir si l'un d'eux est présent sur la page.
		var fromus_desc_id = document.getElementById(fromus_sitelist[fromus_site].desc_id[fromus_i]);
		if(fromus_desc_id)
		{	//S'il y a un résultat, l'enregistrer
			fromus_desc = fromus_desc_id.textContent;
			localStorage["fromus_moredesc"] = fromus_i;
		}
	}
	
	if(fromus_moredesc)
	{
		fromus_i = localStorage["fromus_moredesc"];
	}
	else
	{
		fromus_i = 0;
	}				
	
	if(fromus_desc === undefined)
	{	//S'il n'y a pas eu de résultat, faire la recherche dans le tableau contenant les classes
		for(fromus_i ; (fromus_i < fromus_sitelist[fromus_site].desc_class.length) && (fromus_desc === undefined) ; fromus_i++)
		{
			var fromus_desc_class = document.getElementsByClassName(fromus_sitelist[fromus_site].desc_class[fromus_i])[0];
			if(fromus_desc_class)
			{
				fromus_desc = fromus_desc_class.textContent;
				localStorage["fromus_moredesc"] = fromus_i;
			}
		}
	}
	
	if(fromus_desc === undefined)
	{	// S'il n'y a eu aucun résultat...
		fromus_desc = fromus_error;
	}
}

else
{	// Si le site n'est pas enregistré
	fromus_desc=fromus_error
	fromus_img=fromus_error;
	fromus_objectname=fromus_error;
	fromus_pricemin=fromus_error;
}

if((fromus_desc===undefined) ||(fromus_desc==undefined)||(fromus_desc=='undefined')|| ( /[\S]{1,}/g.test(fromus_desc)==false ) )
{//En cas d'absence de description, utiliser le nom du produit.
	fromus_desc =	fromus_objectname;
}

//Début de la section "limitation de la longueur des données".
if(fromus_desc.length > 200)
{
	fromus_desc									=	fromus_desc.substring(0,195)+"[...]";
}
fromus_objectname						=	fromus_objectname.replace(/\n/g,'').substring(0,100);

if(typeof(fromus_pricemin)=='string')
{
	fromus_pricemin							=	fromus_pricemin.replace(/\$/g,'').replace(',','');
	if( /[0-9\.]{1,}/g.test(fromus_pricemin))
	{
		fromus_pricemin							=	parseFloat(/[0-9\.]{1,}/g.exec(fromus_pricemin)[0]);
	}
}

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

//Mise à zéro des indicateurs
localStorage["fromus_morename"] =	JSON.stringify(false);
localStorage["fromus_moreprice"]	=	JSON.stringify(false);
localStorage["fromus_moreimg"]	=	JSON.stringify(false);
localStorage["fromus_moredesc"]	=	JSON.stringify(false);