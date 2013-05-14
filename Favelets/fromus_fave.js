javascript:
fromus_fave=document.createElement("script");
fromus_fave.setAttribute('src','http://guillaumebergs.github.io/fave.js');
fromus_fave.setAttribute('type','text/javascript');
fromus_fave.setAttribute('id','fromus_favelet_ID');
void(document.getElementsByTagName("head")[0].appendChild(fromus_fave));
window.alert("Vendeur: \n" + fromus_site + "\n\nOffre: \n" + fromus_offre + "\n\nNom: \n" + fromus_objectname + "\n\nImage: \n" + fromus_img + " \n\nPrix minimal: \n$" + fromus_pricemin + " \n\nDescription: \n" + fromus_desc);