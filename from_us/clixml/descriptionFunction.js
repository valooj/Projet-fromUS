function fromus_recupdDesc(idclass)
{
	if(idclass == 'id'
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