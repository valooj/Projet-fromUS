<?php
header('Content-type: application/json');

file_put_contents('./trace.txt', print_r($_REQUEST, 1) . PHP_EOL . '===========================================' . PHP_EOL, FILE_APPEND);

// Requete insert to .... on duplicate key
//Permet d'insérer un element , si il existe déja, il est mit à jour. 
$sql_prepared_update_product = <<<SQL
INSERT INTO produits(prd_libelle, prd_site, prd_desc, prd_cat, prd_visu, prd_prix, prd_vis)
	VALUES (:_libelle, :_site, :_desc, :_cat, :_visu, :_prix, :_vis)
	ON DUPLICATE KEY UPDATE
		prd_desc= :_desc, prd_visu= :_visu, prd_prix= :_prix, prd_vis= :_vis
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
		cmdd_libelle= :_libelle, cmdd_url= :_url, cmdd_desc= :_desc, cmdd_qte= cmdd_qte + :_qte, cmdd_montant= :_montant, cmdd_categ= :_categ, cmdd_poids= :_poids, cmdd_unitep= :_unitep, cmdd_larg= :_larg, cmdd_long= :_long, cmdd_haut= :_haut, cmdd_united= :_united, cmdd_proforma= :_proforma, cmdd_ent= :_ent
SQL;

$sql_prepared_update_login = <<<SQL
INSERT INTO token(tok_user, tok_token)
	VALUES (:_id_user, :_token_user)
	ON DUPLICATE KEY UPDATE
		tok_token = :_token_user
SQL;

function getLng(){
	$lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
	return $lang;
}

try
{
	// connection a la bd
    $options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;
    $options[PDO::MYSQL_ATTR_INIT_COMMAND] = 'SET NAMES UTF8;';
    $bdd = new PDO('mysql:host=localhost;dbname=fromus', 'root', '', $options);

	// externals datas
	$get_action = isset($_GET['action']) ? htmlspecialchars($_GET['action']) : null;
	
	//Pour le choix de la langue
	$prefered_lng = getLng();
	//echo($prefered_lng);
	$lng = array();
	include './lngs/en.php';
	if( $prefered_lng && ($file = './lngs/' . $prefered_lng . '.php'))
		include $file;
	// actions
	switch($get_action)
	{
		case 'MAJ-product':

			// variables
			$get_token = isset($_GET['token']) ? htmlspecialchars($_GET['token']) : null;
			$get_product = isset($_REQUEST['product']) ? json_decode($_REQUEST['product'], TRUE) : null;

			// variables tests
			if ( !$get_token )
				throw new Exception($lng['invalid_token']);

			if ( !$get_product )
				throw new Exception($lng['invalid_product']);

			if( !isset($get_product['prd_prix'], $get_product['prd_libelle'], $get_product['prd_site'], $get_product['prd_cat'], $get_product['prd_desc'], $get_product['prd_cat']) )
				throw new Exception($lng['bad_param']);

			$get_product['prd_prix'] = str_replace('$', null, $get_product['prd_prix']);

			if ( !is_numeric($get_product['prd_prix']) )
				throw new Exception($lng['invalid_price']);

			if ( !is_numeric($get_product['prd_cat']) )
				throw new Exception($lng['invalid_categ']);
/*
			//Recupere l'id a partir du token
			$req = $bdd->prepare('SELECT tok_user FROM token where tok_token= :_token');
			$req->execute(array('_token' =>$get_token));
			$tokId = $req->fetch();
			$tokId = $tokId[0];
			$req->closeCursor();

			if(!$tokId)
				throw new Exception($lng['invalid_token']);
*/
					
			// code MAJ du produit visité
			$req = $bdd->prepare($sql_prepared_update_product);
            $req->bindValue('_libelle' , $get_product['prd_libelle'],   PDO::PARAM_STR);
            $req->bindValue('_site' ,    $get_product['prd_site'], 		PDO::PARAM_STR);
            $req->bindValue('_desc' ,    $get_product['prd_desc'],  	PDO::PARAM_STR);
            $req->bindValue('_cat' ,     $get_product['prd_cat'], 		PDO::PARAM_INT);
            $req->bindValue('_visu' ,    $get_product['prd_visu'],  		PDO::PARAM_STR);
            $req->bindValue('_prix' ,    $get_product['prd_prix'], 		PDO::PARAM_STR);
            $req->bindValue('_vis' ,     0,                        		PDO::PARAM_INT);
            $rep = $req->execute();
            
            if(!$rep)
            	throw new Exception($lng['invalid_insert']);
/*
			$bonus = ($req->rowCount() == 1) ? 100 : ( ($req->rowCount() == 0) ? 0 : 50 );
			$req->closeCursor(); 

            // code MAJ ajout bonus
			$req = $bdd->prepare($sql_prepared_update_bonus);
            $req->bindValue('_client' ,  $tokId,     PDO::PARAM_INT);
            $req->bindValue('_nb'     ,  $bonus,         PDO::PARAM_INT);
            $rep = $req->execute();
            $req->closeCursor();

            $response['Status'] = 'A';
	        $response['Message'] = $lng['win'].$bonus.' pts';
*/
	        $response['Status'] = 'A';
	        $response['Message'] = 'confirmation product';
			break;

		case 'MAJ-pts':

			// variables
			$get_token = isset($_GET['token']) ? htmlspecialchars($_GET['token']) : null;

			// variables tests
			if ( !$get_token )
				throw new Exception($lng['invalid_token']);

			$req = $bdd->prepare('SELECT tok_user FROM token where tok_token= :_token');
			$req->execute(array('_token' =>$get_token));
			$tokId = $req->fetch();
			$tokId = $tokId[0];
			$req->closeCursor();

			if(!$tokId)
				throw new Exception($lng['invalid_token']);

			$req = $bdd->prepare('SELECT pts_nb FROM pts_bonus where pts_cli= :_cli');
			$req->execute(array('_cli' =>$tokId));
			$pts = $req->fetch();
			$pts = $pts[0];
			$req->closeCursor();

			
	        $response['Status'] = 'p';
	        $response['Message'] = $pts;
			break;


		case 'MAJ-panier':

			// variables
			$get_token = isset($_GET['token']) ? htmlspecialchars($_GET['token']) : null;
			$get_panier = isset($_REQUEST['panier']) ? json_decode($_REQUEST['panier'], TRUE) : null;

			// variables tests
			if ( !$get_token )
				throw new Exception($lng['invalid_token']);

			if ( !$get_panier )
				throw new Exception($lng['invalid_panier']);

			if( !isset($get_panier['libelle'], $get_panier['qte'], $get_panier['montant'] , $get_panier['url'], $get_panier['desc'], $get_panier['categ']) )
				throw new Exception($lng['bad_param']);

			if( $get_panier['qte'] <= 0)
				throw new Exception($lng['invalid_qte']);

			if ( !is_numeric($get_panier['qte']) )
				throw new Exception($lng['invalid_categ']);

			if ( !is_numeric($get_panier['montant']) )
				throw new Exception($lng['invalid_price']);

			if ( !is_numeric($get_panier['categ']) )
				throw new Exception($lng['invalid_categ']);

			//Recupere l'id a partir du token
			$req = $bdd->prepare('SELECT tok_user FROM token where tok_token= :_token');
			$req->execute(array('_token' =>$get_token));
			$tokId = $req->fetch();
			$tokId = $tokId[0];
			$req->closeCursor();

			if(!$tokId)
				throw new Exception($lng['invalid_token']);
	
			// code MAJ du produit visité
			$req = $bdd->prepare($sql_prepared_update_panier);

            $req->bindValue('_libelle' , 	$get_panier['libelle'],		PDO::PARAM_STR);
            $req->bindValue('_url' ,     	$get_panier['url'], 			PDO::PARAM_STR);
            $req->bindValue('_desc' ,    	$get_panier['desc'],                			PDO::PARAM_STR);
            $req->bindValue('_qte' ,     	$get_panier['qte'],                      			PDO::PARAM_INT);
            $req->bindValue('_montant' ,    $get_panier['montant'],               			PDO::PARAM_STR); //decimal
            $req->bindValue('_categ' ,    	$get_panier['categ']   , 			PDO::PARAM_INT);
            $req->bindValue('_poids' ,    	 2,                        			PDO::PARAM_STR); //decimal
            $req->bindValue('_unitep' , 	 2, 		PDO::PARAM_STR);
            $req->bindValue('_larg' ,    	 2, 			PDO::PARAM_STR); //decimal
            $req->bindValue('_long' ,    	 2,                			PDO::PARAM_STR); //decimal
            $req->bindValue('_haut' ,        2,                       			PDO::PARAM_STR); //decimal
            $req->bindValue('_united' ,     'united',              		    PDO::PARAM_STR);
            $req->bindValue('_proforma' ,   'proforma', 			PDO::PARAM_STR);
            $req->bindValue('_ent' ,     	 $tokId,                        PDO::PARAM_INT);
            $rep = $req->execute();
            $req->closeCursor();

            if(!$rep)
            	throw new Exception('Error :: Insert panier invalid');

			$response['Status'] = 'P';
			$response['Message'] = $lng['product_insert'];
			
			break;

		case 'MAJ-calcul':

			$get_token = isset($_GET['token']) ? htmlspecialchars($_GET['token']) : null;
			$get_calcul = isset($_REQUEST['calcul']) ? json_decode($_REQUEST['calcul'], TRUE) : null;

			// variables tests
			if ( !$get_token )
				throw new Exception($lng['invalid_token']);

			if ( !$get_calcul )
				throw new Exception($lng['invalid_calcul']);

			if( !isset($get_calcul['libelle'], $get_calcul['qte'], $get_calcul['montant'] ) )
				throw new Exception($lng['bad_param']);

			if( $get_calcul['qte'] == 0)
				throw new Exception($lng['invalid_qte']);

			if ( !is_numeric($get_calcul['qte']) )
				throw new Exception($lng['invalid_price']);

			if ( !is_numeric($get_calcul['montant']) )
				throw new Exception($lng['invalid_price']);

			if ( !is_numeric($get_calcul['categ']) )
				throw new Exception($lng['invalid_categ']);

			//Recupere l'id 
			$req = $bdd->prepare('SELECT tok_user FROM token where tok_token= :_token');
			$req->execute(array('_token' =>$get_token));
			$tokId = $req->fetch();
			$tokId = $tokId[0];
			$req->closeCursor();

			// variables tests
			if(!$tokId)
				throw new Exception($lng['invalid_token']);
	
			$apv=0;
			$frais_liv = 0;		
			//estimation des taxe :
			$api_code = "dea6303fcaa6a888";
			$url = "http://www.dutycalculator.com/api2.1/".$api_code."/calculation?from=usa";

			$req = $bdd->prepare('SELECT user_pays FROM users WHERE  user_id = :user_id');
			$req->execute(array('user_id' => $tokId));
			$arr = $req->fetch();

			$array = array('fr'=>'fra', 'en'=>'gbr', 'it'=>'ita', 'es'=>'esp', 'nl'=>'nld', 'da'=>'dnk', 'sv'=>'swe','no'=>'nor', 'pt'=>'prt','ch'=>'che','au'=>'aut','be'=>'bel');

			if( !isset($array[$arr['user_pays']]) )
				throw  new Exception($lng['invalid_country']);
	
			$code_pays = $array[$arr['user_pays']];

			//$url .= "&to=".$code_pays;
			$url .= "&to=bel";
			$url .= "&classify_by=cat";
			
			$url .= "&cat[0]=".$get_calcul['categ']."&desc[0]=".$get_calcul['libelle']."&qty[0]=".$get_calcul['qte']."&value[0]=".$get_calcul['montant'];
			
			//code a mettre pour le ship si le poidt supérireur a 70,5, $ship=250
			$ship = 0;
			
			$url .= "&shipping=".$ship."&insurance=0";
			$url .= htmlentities("&currency");
			$url .="=usd&output_currency=usd";
			
			$url = html_entity_decode($url);
			
			//recupere le flux xml :
			$homepage = file_get_contents($url);
			//traitement du fichier XML :
			
			$categorie = new SimpleXMLElement($homepage);
			$tab_duty =array();
			$i=0;
			//recupere le duty 
			foreach ($categorie->{'total-charges'} as $famille) 
			  foreach ($famille->duty as $atome)
		    	foreach ($atome->amount as $item)
				{
						$tab_duty[$i]["duty"] = ((string) $item);	
						$i++;
				}
			
			//recupere le VAT :
			$tab_VAT =array();
			$j=0;
			//recupere le duty 
			foreach ($categorie->{'total-charges'} as $famille) 
			  foreach ($famille->{'sales-tax'} as $atome)
		    	foreach ($atome->amount as $item)
				{
						$tab_VAT[$j]["VAT"] = ((string) $item);	
						$j++;
				}
					
			//recuperation de l'outil de calcul des douanes/taxe:
			$tot = $get_calcul['qte']*$get_calcul['montant'];
			$prix = $tot;
			$frais_liv = $ship;
			$base_calcul = $prix+$frais_liv;
			
			//Prix from US 
			$marge_fus = $tot*(10/100);
			
			//calcul du total :
			$prix_total = $base_calcul+$tab_duty[0]["duty"]+$tab_VAT[0]["VAT"]+$marge_fus;
			$tpaie = "";
			$tax = $tab_duty[0]["duty"]+$tab_VAT[0]["VAT"];
			$mod_livr="e";
			$stat = "10";
			
			$response['Status'] = 'C';
			$response['Prix'] = $prix_total;
	

			break;

		case 'MAJ-login':
			$get_log = isset($_REQUEST['log']) ? json_decode($_REQUEST['log'], TRUE) : null;

			// variables tests
			if ( !$get_log )
				throw new Exception($lng['invalid_log']);

			if( !isset($get_log['email'], $get_log['password'] ) )
				throw new Exception($lng['bad_param']);

			if (!filter_var($get_log['email'], FILTER_VALIDATE_EMAIL) )
				throw new Exception('Error :: Email not valid');

			//selection de l'id a partir de l'email et du password
			$req = $bdd->prepare('SELECT user_id, user_prenom, user_nom FROM users where user_email= :_email and user_mdp = :_password ');
			$req->execute(array(
			    '_email' => $get_log['email'],
			    '_password' => $get_log['password']));
			$arr = $req->fetch();
			$req->closeCursor();

			if(!$arr)
				throw new Exception($lng['invalid_email']);

			//Creation du token et ajout dans la table
			$new_token_user = uniqid();
			$req = $bdd->prepare($sql_prepared_update_login);
			$req->bindParam(':_id_user', $arr[0], PDO::PARAM_INT);
			$req->bindParam(':_token_user', $new_token_user, PDO::PARAM_STR);
			$req->execute();
			$req->closeCursor();

			$response['Status'] = 'L';
			$response['Token'] = $new_token_user;
			$response['Message'] = $arr[1].' '.$arr[2];

			break;

		case 'MAJ-logout':
			$get_token= isset($_GET['token']) ? htmlspecialchars($_GET['token']) : null;

			// variables tests
			if ( !$get_token)
				throw new Exception($lng['invalid_token']);

			$req = $bdd->prepare('UPDATE token SET tok_token = :_myNull where tok_token = :_token');
			$myNull = null;
			$req->bindParam(':_myNull', $myNull, PDO::PARAM_NULL);
			$req->bindParam(':_token', $get_token, PDO::PARAM_STR);
			$req->execute();
			$req->closeCursor();

			$response['Status'] = 'l';
			//$response['Message'] = $lng['logout'];

			break;

		case 'MAJ-categorie':

			//Selection de la categorie
			$req = $bdd->prepare('SELECT cat_liee , cat_libelle FROM categorie where cat_langue= :_lang ORDER BY cat_libelle ASC');
			$req->execute(array(
				'_lang' => getLng()));
			
			$categorie= '[';
			$scategorie= null;

			//Pour régler le probleme de la virgule
			$categorie = $categorie.'{"type":"1","idCat":"'.null.'","libelleCat":"'.$lng['choix_categ'].'"}';

			//selection de la sous categorie
			foreach($req->fetchall() as $arr){
			$reqs = $bdd->prepare('SELECT scat_liee , scat_libelle FROM scategorie where scat_cat= :_cat and scat_lang= :_lang ORDER BY scat_libelle ASC');
			$reqs->execute(array(
			    '_cat' => $arr[0],
			    '_lang' => getLng()));

			foreach($reqs->fetchall() as $arrs){
				$scategorie = $scategorie.',{"type":"1","idCat":"'.$arrs[0].'","libelleCat":"'.$arrs[1].'"}';
			}
			
			//$categorie = $categorie.' {'.$arr[0].' : '.$arr[1].' '.$scategorie.'} ';
			$categorie = $categorie.',{"type":"0","idCat":"'.$arr[0].'","libelleCat":"'.$arr[1].'"}'.$scategorie;
			$scategorie= null;
			
			}			
			$response['Status'] = 'c';
			$response['Message'] = $categorie.']';
			
			$req->closeCursor();
			$reqs->closeCursor();

			break;

		case 'MAJ-sscategorie':

			$get_sscateg= isset($_GET['sscateg']) ? htmlspecialchars($_GET['sscateg']) : null;

			// variables tests
			if ( !$get_sscateg)
				throw new Exception($lng['invalid_categ']);

			$sscategory = '[';
			//$cat = array();
			
			//selection de la sous sous categorie
			$req = $bdd->prepare('SELECT sscat_liee , sscat_libelle FROM sscategorie where sscat_scat= :_scat and sscat_lang= :_lang ORDER BY sscat_libelle ASC');
			$req->execute(array(
			    '_scat' => $get_sscateg,
			    '_lang' => getLng()));

			$sscategory .= '{"type":"0","idCat":"'.null.'","libelleCat":"'.$lng['choix_scateg'].'"}';
			//$cat[0] = json_encode (array('type' => '0','idCat' =>''.null.'','libelleCat' => ''.null.''));
		
			foreach($req->fetchall() as $arr){
				$sscategory .= ',{"type":"1","idCat":"'.$arr[0].'","libelleCat":"'.$arr[1].'"}';
				//$cat[] = json_encode (array('type' => '1','idCat' => ''.$arr[0].'','libelleCat' => ''.$arr[1].''));
				
			}
			$response['Status'] = 's';
			$response['Message'] = $sscategory.']';
			//$reponse['Message'] = $cat;
			$req->closeCursor();

			break;

		case 'MAJ-access':
			// variables
			$get_url = isset($_POST['url_site']) ? htmlspecialchars($_POST['url_site']) : null;

			// variables tests
			if ( !$get_url )
				throw new Exception($lng['invalid_token']);

			$req = $bdd->prepare('SELECT sa_chemin FROM site_access where sa_site= :_url and sa_valid= :_valid');
			$req->execute(array('_token' =>$get_token));
			$tokId = $req->fetch();
			$tokId = $tokId[0];
			$req->closeCursor();

			if(!$tokId)
				throw new Exception($lng['invalid_token']);
			
	        $response['Status'] = 'p';
	        $response['Message'] = $pts;
			break;
			break;

		default:
			throw new Exception($lng['invalid_action']);
			break;
	}
}

catch( Exception $error )
{
	$response['error'] = $error->getMessage();
}
echo json_encode($response);

?>