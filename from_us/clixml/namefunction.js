function fromus_recupName(idclass)
{
	if(idclass == 'id'
	{
		fromus_sitelist[fromus_site].name_id = request.data.split(';');
		fromus_sitelist[fromus_site].name_class.push('');		
	}
	else
	{
		fromus_sitelist[fromus_site].name_class = request.data.split(';');
		fromus_sitelist[fromus_site].name_id.push('');		
	}
	/////////////////////////////////////// Début de l'attribution des valeurs aux indicateurs ///////////////////////////////////////
	if(localStorage["fromus_morename"])
	{
		fromus_morename = JSON.parse(localStorage["fromus_morename"]);
	}
	else
	{
		fromus_morename = false;
	}
	///////////////////////////////////////////////////// Partie cherchant l'info /////////////////////////////////////////////////////
	//name
	if(fromus_morename)
	{
		fromus_i = parseInt(localStorage["fromus_iname"]);
		fromus_objectname	=	'';
	}
	else
	{
		fromus_i = 0;
	}
	
	for(fromus_i ; (fromus_i < fromus_sitelist[fromus_site].name_id.length) && !(fromus_objectname) ; fromus_i++)
	{	//Boucle parcourant les id connus du site pour voir si l'un d'eux est présent sur la page.
		
		var fromus_name_id = document.getElementById(fromus_sitelist[fromus_site].name_id[fromus_i]);
		if(fromus_name_id)
		{	//S'il y a un résultat, l'enregistrer
			fromus_objectname = fromus_name_id.textContent;
			localStorage["fromus_iname"] = fromus_i + 1 ;
		}
	}
	
	if(fromus_morename)
	{
		fromus_i = parseInt(localStorage["fromus_iname"]);
		fromus_objectname	=	'';
	}
	else
	{
		fromus_i = 0;
	}
	
	if(!fromus_objectname)
	{	//S'il n'y a pas eu de résultat, faire la recherche dans le tableau contenant les classes
		for(fromus_i ; (fromus_i < fromus_sitelist[fromus_site].name_class.length) && !(fromus_objectname) ; fromus_i++)
		{
			var fromus_name_class = document.getElementsByClassName(fromus_sitelist[fromus_site].name_class[fromus_i])[0];
			if(fromus_name_class)
			{
				fromus_objectname = fromus_name_class.textContent;
				localStorage["fromus_iname"] = fromus_i + 1;	
			}
		}
	}
	
	if(!(fromus_objectname))
	{	// S'il n'y a eu aucun résultat...
		fromus_objectname = fromus_error;
	}
	
	fromus_objectname			=	fromus_objectname.replace(/^[\s]{0,}/,'').replace(/\n.*/g,'').substring(0,100);
	
	// stockage du nom dans local storage
	localStorage["regName"] = fromus_objectname;
	//Mise à zéro des indicateurs
	localStorage["fromus_morename"] =	JSON.stringify(false);
}