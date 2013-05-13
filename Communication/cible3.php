<?php
header('Content-type: application/json');

file_put_contents('./trace.txt', print_r($_REQUEST, 1) . PHP_EOL . '===========================================' . PHP_EOL, FILE_APPEND);


// un champ unique, ici : l'URI = URL + page_vers_le_produit
// OU un couple unique (URL, article)
$sql_prepared_update_product = <<<SQL
INSERT INTO produits(prd_libelle, prd_site, prd_desc, prd_cat, prd_visu, prd_prix, prd_vis)
	VALUES (:_libelle, :_site, :_desc, :_cat, :_visu, :_prix, :_vis)
	ON DUPLICATE KEY UPDATE
		prd_desc= :_desc, prd_cat= :_cat, prd_visu= :_visu, prd_prix= :_prix, prd_vis= :_vis
SQL;

$sql_prepared_update_bonus = <<<SQL
INSERT INTO pts_bonus(pts_cli, pts_nb)
	VALUES (:_client, :_nb)
	ON DUPLICATE KEY UPDATE
		pts_nb= pts_nb + :_nb
SQL;

$sql_prepared_update_panier = <<<SQL
INSERT INTO commande_detail(cmdd_libelle, cmdd_url, cmdd_desc, cmdd_qte, cmdd_montant, cmdd_categ, cmdd_poids, cmdd_unitep, cmdd_larg, cmdd_long, cmdd_haut, cmdd_united, cmdd_proforma, cmdd_ent)
	VALUES (:_libelle, :_url, :_desc, :_qte, :_montant, :_categ, :_poids, :_unitep, :_larg, :_long, :_haut, :_united, :_proforma, :_ent)
	ON DUPLICATE KEY UPDATE
		cmdd_libelle= :_libelle, cmdd_url= :_url, cmdd_desc= :_desc, cmdd_qte= :_qte, cmdd_montant= :_montant, cmdd_categ= :_categ, cmdd_poids= :_poids, cmdd_unitep= :_unitep, cmdd_larg= :_larg, cmdd_long= :_long, cmdd_haut= :_haut, cmdd_united= :_united, cmdd_proforma= :_proforma, cmdd_ent= :_ent
SQL;


try
{
	//debug
	//$_REQUEST['product'] =  '{ "prd_libelle":"John", "prd_site":"site", "prd_prix":22 }';
	

	// connection
    $options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;
    $options[PDO::MYSQL_ATTR_INIT_COMMAND] = 'SET NAMES UTF8;';
    $bdd = new PDO('mysql:host=localhost;dbname=fromus', 'root', '', $options);

	// externals datas
	$get_action = isset($_GET['action']) ? htmlspecialchars($_GET['action']) : null;
	$get_token = isset($_GET['token']) ? htmlspecialchars($_GET['token']) : null;

	// variables tests
	if ( !$get_token )
		throw new Exception('MAJ :: Token not specified');

	// actions
	switch($get_action)
	{
		case 'MAJ-product':
			// variables
			$get_product = isset($_REQUEST['product']) ? json_decode($_REQUEST['product'], TRUE) : null;

			// variables tests
			if ( !$get_product )
				throw new Exception('MAJ :: Product not specified');

			if( !isset($get_product['prd_prix'], $get_product['prd_libelle'], $get_product['prd_site']) )
				throw new Exception('MAJ :: Bad parameters into Product Entity');

			$get_product['prd_prix'] = str_replace('$', null, $get_product['prd_prix']);

			if ( !is_numeric($get_product['prd_prix']) )
				throw new Exception('MAJ :: Price invalid');
			
			// code MAJ du produit visité
			$req = $bdd->prepare($sql_prepared_update_product);
            $req->bindValue('_libelle' , $get_product['prd_libelle'],   PDO::PARAM_STR);
            $req->bindValue('_site' ,    $get_product['prd_site'], 		PDO::PARAM_STR);
            $req->bindValue('_desc' ,    'dscnico',                		PDO::PARAM_STR);
            $req->bindValue('_cat' ,     99,                      		PDO::PARAM_INT);
            $req->bindValue('_visu' ,    'visunico',               		PDO::PARAM_STR);
            $req->bindValue('_prix' ,    $get_product['prd_prix'], 		PDO::PARAM_STR);
            $req->bindValue('_vis' ,     1,                        		PDO::PARAM_INT);
            $rep = $req->execute();
            
            if($rep == false)
				throw new Exception('MAJ :: Insert invalid');
			$bonus = ($req->rowCount() == 1) ? 100 : ( ($req->rowCount() == 0) ? 0 : 50 );
			$req->closeCursor(); 

            // code MAJ ajout bonus
			$req = $bdd->prepare($sql_prepared_update_bonus);
            $req->bindValue('_client' ,  $get_token,     PDO::PARAM_INT);
            $req->bindValue('_nb'     ,  $bonus,         PDO::PARAM_INT);
            $rep = $req->execute();
            $req->closeCursor();

			break;

		case 'MAJ-panier':
		// variables
			$get_product = isset($_REQUEST['product']) ? json_decode($_REQUEST['product'], TRUE) : null;

			// variables tests
			if ( !$get_product )
				throw new Exception('MAJ :: Product not specified');

			if( !isset($get_product['prd_prix'], $get_product['prd_libelle'], $get_product['prd_site']) )
				throw new Exception('MAJ :: Bad parameters into Product Entity');

			$get_product['prd_prix'] = str_replace('$', null, $get_product['prd_prix']);

			if ( !is_numeric($get_product['prd_prix']) )
				throw new Exception('MAJ :: Price invalid');
			
			// code MAJ du produit visité
			$req = $bdd->prepare($sql_prepared_update_panier);

            $req->bindValue('_libelle' , 	$get_product['prd_libelle'],		PDO::PARAM_STR);
            $req->bindValue('_url' ,     	$get_product['prd_site'], 			PDO::PARAM_STR);
            $req->bindValue('_desc' ,    	'dscnico',                			PDO::PARAM_STR);
            $req->bindValue('_qte' ,     	99,                      			PDO::PARAM_INT);
            $req->bindValue('_montant' ,    'visunico',               			PDO::PARAM_STR); //decimal
            $req->bindValue('_categ' ,    	$get_product['prd_prix'], 			PDO::PARAM_INT);
            $req->bindValue('_poids' ,    	 1,                        			PDO::PARAM_STR); //decimal
            $req->bindValue('_unitep' , 	$get_product['prd_libelle'], 		PDO::PARAM_STR);
            $req->bindValue('_larg' ,    	$get_product['prd_site'], 			PDO::PARAM_STR); //decimal
            $req->bindValue('_long' ,    	'dscnico',                			PDO::PARAM_STR); //decimal
            $req->bindValue('_haut' ,        99,                       			PDO::PARAM_INT); //decimal
            $req->bindValue('_united' ,     'visunico',              		    PDO::PARAM_STR);
            $req->bindValue('_proforma' ,    $get_product['prd_prix'], 			PDO::PARAM_STR);
            $req->bindValue('_ent' ,     	 $get_token,                        PDO::PARAM_INT);
            $rep = $req->execute();
            
            if($rep == false)
				throw new Exception('MAJ :: Insert invalid');
			$bonus = ($req->rowCount() == 1) ? 100 : 50 ;
			$req->closeCursor(); 

            // code MAJ ajout bonus
			$req = $bdd->prepare($sql_prepared_update_bonus);
            $req->bindValue('_client' ,  $get_token,     PDO::PARAM_INT);
            $req->bindValue('_nb'     ,  $bonus,         PDO::PARAM_INT);
            $rep = $req->execute();
            $req->closeCursor();

            // retourne le moins chere de la même catégorie
            // $response['product'] <<<< SELECT * from products WHRE name like '%iphone%' LIMIT 1 ORDER BY price DESC
            $req = $bdd->prepare('SELECT * FROM produits WHERE prd_libelle LIKE ? ORDER BY prd_prix DESC LIMIT 1');
			$req->execute(array( "%$get_product[prd_libelle]%"));
			$response['product'] = $req->fetch();
			$req->closeCursor();

			
			break;

		case 'MAJ-log':
			$get_log = isset($_REQUEST['log']) ? json_decode($_REQUEST['log'], TRUE) : null;

			// variables tests
			if ( !$get_log )
				throw new Exception('MAJ :: Log not specified');

			if( !isset($get_log['login'], $get_log['password'] ) )
				throw new Exception('MAJ :: Bad parameter into Log Entity');

			// log={"login":"liaznzade", "password":"password"}

			$req = $bdd->prepare('SELECT user_id FROM users where user_pseudo= :_pseudo and user_password = :_password ');
			$req->execute(array(
			    '_pseudo' => $get_log['login'],
			    '_password' => $get_log['password']));
			$arr = $req->fetch();
			$req->closeCursor();

			if(!$arr)
				throw new Exception('MAJ :: Users or Password invalid');

			$response['user'] = $arr['user_id'];
			//action a définir si ds la base 
			break;

		case 'MAJ-user':

			$get_user = isset($_REQUEST['user']) ? json_decode($_REQUEST['user'], TRUE) : null;

			//variables tests
			if (!$get_user)
				throw new Exception('MAJ :: User not specified');

			$req = $bdd->prepare('SELECT user_point FROM users WHERE user_id= :_id ');
			$req->execute(array('_id' => $get_user['id']));
				
			break;

		default:
			throw new Exception('No action specified');
			break;
	}

	//$response['status'] = 1;
}
catch( Exception $error )
{
	$response['error'] = $error->getMessage();
}
echo json_encode($response);

