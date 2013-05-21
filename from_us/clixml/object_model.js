javascript:

function fromus_site() 
{
	this.name_idN= 0;
	this.name_id= new Array();
	this.name_classN= 0;
	this.name_class= new Array();
	
	this.price_idN= 0;
	this.price_id= new Array();
	this.price_classN= 0;
	this.price_class= new Array();
	
	this.img_idN= 0;
	this.img_id= new Array();
	this.img_classN= 0;
	this.img_class= new Array();
	
	this.desc_idN= 0;
	this.desc_id= new Array();
	this.desc_classN= 0;
	this.desc_class= new Array();
}

var fromus_sitelist = new Array();

fromus_sitelist['rakuten.com'] = new fromus_site();

fromus_sitelist['rakuten.com'].price_id[0]='id_name';

alert(fromus_sitelist['rakuten.com'].price_id[0]);