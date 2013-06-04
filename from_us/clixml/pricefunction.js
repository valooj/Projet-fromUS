function fromus_recupPrice(idclass)
{
	if(idclass == 'id'
	{
		fromus_sitelist[fromus_site].price_id = request.data.split(';');
		fromus_sitelist[fromus_site].price_class.push('');		
	}
	else
	{
		fromus_sitelist[fromus_site].price_class = request.data.split(';');
		fromus_sitelist[fromus_site].price_id.push('');		
	}
	
	if(localStorage["fromus_moreprice"])
	{
		fromus_moreprice = JSON.parse(localStorage["fromus_moreprice"]);
	}
	else
	{
		fromus_moreprice = false;
	}
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
	
	localStorage["fromus_moreprice"]	=	JSON.stringify(false);
}

