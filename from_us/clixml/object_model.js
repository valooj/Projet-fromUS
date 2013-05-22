javascript:

var fromus_sitelist = new Array();

function fromus_site() 
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



	fromus_sitelist['www.dogfunk.com'] = new fromus_site();
	
	fromus_sitelist['www.dogfunk.com'].name_id[1]='buy_box_title';
	
	fromus_sitelist['www.dogfunk.com'].price_id[1]='sales_price';
	
	fromus_sitelist['www.dogfunk.com'].img_id[1]='main_product_image';
	
	fromus_sitelist['www.dogfunk.com'].desc_id[1]='desc_and_bottom_line';
	
alert(fromus_sitelist['www.dogfunk.com'].name_id);