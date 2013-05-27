<div id="fromus_dialogBox" class="toto">  
	<div id="fromus_tabs">  
		<ul>  
			<li><a href="#fromus_tabs-1">Ajouter</a></li>  
			<li><a href="#fromus_tabs-1">Commander</a></li>  
			<li><a href="#fromus_tabs-2">Mon compte</a></li>  
		</ul>  
		<div id="fromus_tabs-1">  
			<h2>Formulaire</h2>  
			<form id="fromusForm">   
				<label for="store">Marchand : </label><input type="textbox" id="fromus_store" disabled="true"/></br>  
				<label for="name">Nom du produit : </label><input type="textbox" id="fromus_name" disabled="true"/></br>   
				<label for="price">Prix du produit : </label><input type="textbox" id="fromus_price" /></br>  
				<label for="category">Catégorie:</label>  
				<select id="category">  
				</select></br>  
				<label for="sscategory">Sous-catégorie:</label>  
				<select id="sscategory">  			// c'est la qu'il faut que tu mettes les sous catégories

				</select></br>  
				<label id="fromus_quantite" for="quantite">Quantite : </label><input id="QteSpinner"></br>  
				<label id="fromus_assurance" for="assurance">Assurance : </label>  
				<div id="fromus_divassurance">  
					<input type="checkbox" id="fromus_checkassurance" name="assurance" />  
				</div>  
			</form>  
		</div>  
		<div id="fromus_tabs-2">  
			<h2>From-us.com</h2>  
			<p>Merci dentrer votre identifiant et votre mot de passe From-us.com.</p>  
			<label for="idfromus">Identifiant : </label><input type="textbox" id="idfromus" /></br>  
			<label for="mdpfromus">Mot de passe : </label><input type="password" id="mdpfromus" /></br>  
			<input type="button" value="login" id="log" />  
			<a href="http://from-us.com/fromus" target="_blank">Identifiant ou mot de passe oublié ?</a>  
		</div>  
	</div>  
	<a href="http://from-us.com/fromus" target=_blank><img id="logofromus" height="100" src=""/></a>  
</div>