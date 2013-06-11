<?php
header('Content-type: application/json');

//file_put_contents('./trace.txt', print_r($_REQUEST, 1) . PHP_EOL . '===========================================' . PHP_EOL, FILE_APPEND);

try
{
	//debug
	//$_REQUEST['product'] =  '{ "prd_libelle":"John", "prd_site":"site", "prd_prix":22 }';
	

	// connection
    $options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;
    $options[PDO::MYSQL_ATTR_INIT_COMMAND] = 'SET NAMES UTF8;';
    $bdd = new PDO('mysql:host=localhost;dbname=demo_fromus', 'root', '', $options);

	// externals datas
	$get_action = isset($_GET['action']) ? htmlspecialchars($_GET['action']) : null;


	// actions
	switch($get_action)
	{
		case 'MAJ':
			// variables
			$get_user = isset($_REQUEST['user']) ? json_decode(stripslashes($_REQUEST['user']),TRUE) : null;
			$get_product = isset($_REQUEST['product']) ? json_decode(stripslashes($_REQUEST['product']),TRUE) : null;

			$var_libelle=$get_product['prd_libelle'];
			$var_site=$get_product['prd_site'];
			$var_prix=str_replace ( '$', '', $get_product['prd_prix']);

			// variables tests
			if ( !$get_user )
				throw new Exception('MAJ :: User not specified');
			if ( !$get_product )
				throw new Exception('MAJ :: Product not specified');
			if (!is_numeric($var_prix))
				throw new Exception('MAJ :: Price invalid');
			// code
			
			$req = $bdd->prepare('SELECT user_id FROM users WHERE  user_id = :user_id');
			$req->execute(array('user_id' => $get_user));
			if( $req->rowCount() != 1 )
				throw new Exception('User does not exists');

			$req = $bdd->prepare('UPDATE users SET user_point = user_point + 1 WHERE  user_id = :user_id');
			$req->bindParam('user_id', $get_user, PDO::PARAM_INT);
			$req->execute();
			$response['for_user_id'] = $get_user;
			
 
			//Test de présence dans la table
			$req = $bdd->prepare('SELECT prd_id, prd_prix FROM produits where prd_libelle= :_libelle');
			$req->execute(array(
			    '_libelle' => $var_libelle));
			$arr = $req->fetch();
			$req->closeCursor();
			if($arr == false)
			{ 
                //Ajout dans la table
				$req = $bdd->prepare('INSERT INTO produits(prd_libelle, prd_site, prd_desc, prd_cat, prd_visu, prd_prix, prd_vis) VALUES(:_libelle, :_site, :_desc, :_cat, :_visu, :_prix, :_vis)');

                $req->bindValue('_libelle' , $var_libelle, PDO::PARAM_STR);
                $req->bindValue('_site' , $var_site, PDO::PARAM_STR);
                $req->bindValue('_desc' , 'dscnico', PDO::PARAM_STR);
                $req->bindValue('_cat' , 99, PDO::PARAM_INT);
                $req->bindValue('_visu' , 'visunico', PDO::PARAM_STR);
                $req->bindValue('_prix' , $var_prix, PDO::PARAM_STR);
                $req->bindValue('_vis' , 1, PDO::PARAM_INT);
                $req->execute();
                $req->closeCursor();
                
            } 
            else
			{
		   		//Update du porduit si le prix est inférieur
				if ( $arr['prd_prix'] >= $var_prix)
				{
			        $req = $bdd->prepare('UPDATE produits SET prd_libelle= :_libelle, prd_site= :_site, prd_desc= :_desc, prd_cat= :_cat, prd_visu= :_visu, prd_prix= :_prix, prd_vis= :_vis where prd_id= :_id');
			        $req->bindValue('_libelle' , $var_libelle, PDO::PARAM_STR);
	                $req->bindValue('_site' , $var_site, PDO::PARAM_STR);
	                $req->bindValue('_desc' , 'dscnico', PDO::PARAM_STR);
	                $req->bindValue('_cat' , 99, PDO::PARAM_INT);
	                $req->bindValue('_visu' , 'visunico', PDO::PARAM_STR);
	                $req->bindValue('_prix' , $var_prix, PDO::PARAM_STR);
	                $req->bindValue('_vis' , 1, PDO::PARAM_INT);
	                $req->bindValue('_id' , $arr['prd_id'] , PDO::PARAM_INT);
	                $req->execute();
	                $req->closeCursor();
	            }
			}

			break;

		default:
			throw new Exception('No action specified');
			break;
	}

	$response['status'] = 1;
}
catch( Exception $error )
{
	$response['error'] = $error->getMessage();
}
echo json_encode($response);

