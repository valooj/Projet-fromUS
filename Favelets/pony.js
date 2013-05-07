javascript:
(function (srcs,cfg) 
	{ 
		var cbcount = 1;
		 var callback = function () 
			 { -- cbcount;
				 if (cbcount === 0) 
					 { 
						 BrowserPonies.setBaseUrl(cfg.baseurl);
						 if (!BrowserPoniesBaseConfig.loaded) 
							 { BrowserPonies.loadConfig(BrowserPoniesBaseConfig);
								BrowserPoniesBaseConfig.loaded = true;
							 } 
						 BrowserPonies.loadConfig(cfg);
						 if (!BrowserPonies.running()) BrowserPonies.start();
					 } 
			 };
		 if (typeof(BrowserPoniesConfig) === "undefined") 
			 { 
				window.BrowserPoniesConfig = {};
			 } 
		 if (typeof(BrowserPoniesBaseConfig) === "undefined") 
			 { 
				++ cbcount;
				BrowserPoniesConfig.onbasecfg = callback;
			 } 
		if (typeof(BrowserPonies) === "undefined") 
			{	
				++ cbcount;
				BrowserPoniesConfig.oninit = callback;
			} 
		var node = (document.body || document.documentElement || document.getElementsByTagName('head')[0]);
		 for (var id in srcs) 
			{ 
				if (document.getElementById(id)) continue;
				if (node) 
					{ 
						var s = document.createElement('script');
						s.type = 'text/javascript';
						s.id = id;
						s.src = srcs[id];
						node.appendChild(s);
					} 
				else 
					{ 
						document.write('\u003cscript type="text/javscript" src="'+ srcs[id]+'" id="'+id+'"\u003e\u003c/script\u003e');
					} 
			} 
		callback();

	})
	({
		"browser-ponies-script":"http://panzi.github.io/Browser-Ponies/browserponies.js",
		"browser-ponies-config":"http://panzi.github.io/Browser-Ponies/basecfg.js"
	 },
		{	"fadeDuration":500,
			"volume":1,"fps":25,
			"speed":3,
			"audioEnabled":false,
			"showFps":false,
			"showLoadProgress":true,
			"speakProbability":0.95,
			"baseurl":"http://panzi.github.io/Browser-Ponies/",
			"spawn":{"derpy hooves":1}
		});
void(0)