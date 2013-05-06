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

javascript:setTimeout(function(){alert(document.location.href)},500);

javascript:window.alert(document.location.href);


javascript:
var fromus_offre = window.location.pathname;
alert(fromus_offre);
var fromus_site = /http[s]{0,1}\:\/\/(.*\.com)/gi.exec(fromus_offre)[1];
alert(fromus_site);

javascript:alert(document.getElementsByClassName("product-meta")[0].firstChild.innerHTML.replace(/[^A-Z\s]/g,''));
javascript:
var fromus_objectnametmp	=	/[\s]{0,}[A-Z]{1,}(.*)[A-Z]{1,}[\s]/.exec(document.getElementsByClassName("product-meta")[0].firstChild.innerHTML.replace(/[^A-Z\s]/g,''))[0];
var fromus_objectname	=	/[\s]{1,}(.*)/.exec(fromus_objectnametmp.replace(/[A-Z]{1,}/,' '))[1]);
alert(fromus_objectname);


javascript:alert(document.location.href);

javascript:document.getElementsByClassName("topImg").firstChild.src="http\:\/\/i.dell.com/das/xa.ashx/global-site-design%20WEB/fb0aae3b-ddb3-36f1-8e64-2d5d5e254b18/1/OriginalPng?id=Dell/Product_Images/Dell_Client_Products/Notebooks/XPS_Notebooks/XPS_15_panamera/Pdp/tooltip/laptop-xps-15-love-pdp-module-2.jpg";