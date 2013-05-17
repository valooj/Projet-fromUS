<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Titre</title>
        <SCRIPT LANGUAGE="javascript">
        var logJSON;
        var _urlLog;

		function check(url , json) {
			$.post(url, json)
			.done(function(datas) { 
				if(datas['Message'] !== undefined)
					alert(datas['Message']);
				if(datas['error'] !== undefined)
					alert(datas['error']);  
			})
			.fail(function(datas) { 
				alert(datas['error']); 
			})
			}

		function jsonData(token) {
			var token_ext = token ;
			_urlLog = 'https://localhost/projetFU/Communication/cible3.php?action=MAJ-login&token_ext='+token_ext;
			var login = document.getElementById("pseudo");
			var password = document.getElementById("pass");
			var log = login.value;
			var pass = password.value;
			if (log && pass){
				var jsonLog = {login: log ,password: pass};
				var postLog = JSON.stringify(jsonLog);
				logJSON = {log:postLog};
				check(_urlLog, logJSON);
				$(this).dialog('destroy');
			}
		}
		</SCRIPT>

    </head>
 
    <body>
	   <form method="post" action="traitement.php">
	   <p>
	   		<?php 
				$token_ext = isset($_GET['token_ext']) ? htmlspecialchars($_GET['token_ext']) : null;
			?>

	       <label for="pseudo">Votre pseudo :</label>
	       <input type="text" name="pseudo" id="pseudo" />
	        
	       <br />
	       <label for="pass">Votre mot de passe :</label>
	       <input type="password" name="pass" id="pass" />

	       <br />
	       <input type="submit" value="Envoyer" onClick="jsonData('<?php  echo $token_ext; ?> ')"/>
	   </p>
		</form>
    </body>
</html>