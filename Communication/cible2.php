<?php

try
{
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
			$get_user = isset($_REQUEST['user']) ? htmlspecialchars($_REQUEST['user']) : null;

			// variables tests
			if ( !$get_user )
				throw new Exception('MAJ :: User not specified');

			// code

			$req = $bdd->prepare('SELECT user_id FROM users WHERE  user_id = :user_id');
			$req->execute(array('user_id' => $get_user));
			if( $req->rowCount() != 1 )
				throw new Exception('User does not exists');

			$req = $bdd->prepare('UPDATE users SET user_point = user_point + 1 WHERE  user_id = :user_id');
			$req->bindParam('user_id', $get_user, PDO::PARAM_INT);
			$req->execute();
			$response['for_user_id'] = $get_user;
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

//Header('Content-type: json/application');
echo json_encode($response);

