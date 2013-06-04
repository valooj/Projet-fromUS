function fromus_recupImg(idclass)
{
	if(idclass == 'id'
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