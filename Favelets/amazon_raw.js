








    




var AUWLBook = function() {
  var Popover;
  var recognized = 0;
  var stn = function (text) {
    return document.createTextNode(shmEntityDecode(text));
  };
  
var lteIE6 = false /*@cc_on || @_jscript_version < 5.7 @*/;
var borderBoxOffset = function() {
                        var elem = document.createElement('div');
                        elem.style.height = '1px';
                        elem.style.maxHeight = '1px';
                        elem.style.borderStyle = 'solid';
                        elem.style.borderWidth = '0 0 1px';
                        elem.style.fontSize = '1px';
                        elem.innerHTML = '';
                        document.body.appendChild(elem);
                        var oH = elem.offsetHeight;
                        elem.parentNode.removeChild(elem);
                        delete elem;
                        oH = (oH - 2) ? 0 : 1;
                        return oH;
                      }();
var lookupTimeout = 4000;
var maxRequestLength = 4096;
var thumbnailHeight = '125px';
var thumbnailWidth = '125px';
var fullImageHeight = '125px';
var fullImageWidth = '125px';

var bookmarkletWidth = '470px';

var splitButtonHeight = '31px';
var addItemImgWidth = '154px';
var dropDownImgWidth = '26px';
var dropDownWidth = parseInt(addItemImgWidth) + parseInt(dropDownImgWidth) + 6;
var dropDownBrdrClr = '#000074';

var inputElementBorder = '1px solid #DDDDDD';

var primaryBgClr  = '#FFFFFF';
var primaryTxtClr = '#666666';
var borderClr     = '#000000';
var headerClr     = '#CE1300';
var headerTxtClr  = '#606060';
var amznLinkClr   = '#124C90';

var listDDzIndex = 10000000;

var feedbackUrl = 'http://www.amazon.com/gp/feature.html/ref=uwl_po_fb_12332?ie=UTF8&docId=1000807741';
var learnMoreImgSrc = 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/learn-more._V144857397_.png';

var styleSerifFont = 'Georgia, "Times New Roman", Times, serif';
var styleSansSerifFont = 'Arial, Helvetica, Verdana, sans-serif';

var styleCornerDiv = {
  height: '26px',
  width: '34px'
};

var styleFormLabel = {
  fontSize: '11px',
  margin: '1px',
  display: 'block',
  paddingBottom: '1px'
};

var styleFormPrompt = {
  fontSize: '10px',
  margin: '3px'
};

var styleFormValue = {
  display: 'block',
  fontSize: '13px',
  color: '#333333',
  textAlign: 'left', 
  width: '100%',
  margin: '0px',
  paddingTop: '0px',
  paddingBottom: '0px'
};

var formInputWrapper = {
  border: inputElementBorder,
  padding: '4px 3px 3px',
  display: 'inline-block'
};

var formInputWrapperExpand = {
  border: inputElementBorder,
  padding: '4px 3px 3px',
  display: 'inline-block',
  width: '92%'
};

var styleFormField = {
  fontSize: '13px',
  lineHeight:'13px',
  height: '16px',
  color: '#333333',
  backgroundColor: 'white',
  display: 'inline-block',
  verticalAlign: 'bottom'
};

var styleNotesField = {
  fontSize: '12px',
  color: '#666666',
  fontStyle: 'italic',
  border: inputElementBorder,
  marginTop: '1px',
  padding: '5px',
  width: '92%',
  overflow : 'auto',
  height : '31px',
  resize : 'vertical'
};

var styleNotesNonDefaultFont = {
  color: '#333333',
  fontStyle: 'normal'
};

var styleMessage = {
  fontSize: '13px',
  color: '#333333'
};

var styleHeader = {
  fontWeight: 'bold',
  fontFamily: 'Arial',
  fontSize: '14px',
  color: '#000000',
  textAlign: 'center',
  position: 'static',
  display: 'block',
  paddingTop: '4px',
  top: '5px',
  left: '25%' 
};

var styleILMHeader = {
  display: 'block',
  paddingTop: '5px',
  fontSize: '12px',
  fontWeight: 'bold',
  color: '#a31919'
};

var styleILMText = {
  display: 'block',
  fontSize: '12px',
  color: '#a31919'
};

var styleZero = {
  fontWeight: 'normal',
  color: primaryTxtClr,
  fontFamily: styleSansSerifFont,
  fontVariant: 'normal',
  margin: '0px',
  padding: '0px',
  font: '100% ' + styleSansSerifFont,
  fontSize: '100%',
  fontWeight: 'normal',
  fontStyle: 'normal',
  borderCollapse: 'collapse',
  borderWidth: '0px',
  borderSpacing: '0px',
  textAlign: 'left',
  outline: '0',
  float: 'none',
  textTransform: 'none',
  verticalAlign: 'top',
  backgroundColor: 'transparent',
  lineHeight: '130%',
  tableLayout: 'auto',
  minWidth: '0px',
  minHeight: '0px',
  cssFloat: 'none',
  styleFloat: 'none',
  textShadow: 'none',
  boxShadow: 'none',
  boxSizing: 'content-box',
  borderRadius: 0,
  width: 'auto'
};

var styleInline = {
  width: 'auto',
  display: 'inline'
};

var useInline = {
  label: 1,
  span: 1
};

var wishlistLink = {
  color : amznLinkClr,
  textDecoration : "none"
};

var promoLink = {
  fontSize : "11px",
  color : amznLinkClr,
  textDecoration : "none"
};

var legalLinkStyle = {
  fontSize : "9px",
  color : amznLinkClr
};


var popWidth = 480;
var bookmarkletWidth = popWidth + 38 + 'px';
var maxNotesLength = 500;

if (!lteIE6){
  styleFormLabel['cssFloat'] = 'none';
  styleFormPrompt['cssFloat'] = 'none';
  styleFormValue['cssFloat'] = 'none';
} else {
  styleFormLabel['styleFloat'] = 'none';
  styleFormPrompt['styleFloat'] = 'none';
  styleFormValue['styleFloat'] = 'none';
  popWidth += 24;
}


var transparentImg    = 'https://images-na.ssl-images-amazon.com/images/G/01/misc/transparent-pixel._V192551059_.gif';

var prevImgBtnImg     = 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/btn-arrow-left2._V200860388_.png';
var nextImgBtnImg     = 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/btn-arrow-right2._V200860388_.png';
var nextPrevBtnImg     = 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/arrow-new._V148257769_.png';
var outCloseBox       = 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/btn-close-x._V192250362_.gif';
var standardCloseBox  = 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/close-new._V149468554_.png';
var cancelBtnImg      = 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/btn-cancel._V192250363_.gif';
var addItemBtnImg     = 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/Add-to-list-med._V192250362_.gif';
var amznTinyLogo      = 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/UWL-logo-by-Amzn-tiny._V156405369_.png';
var noImageImg        = 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/bkm-no-img._V192250363_.gif';
var questionMark      = 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/question-mark._V153201332_.gif';

var outCornerUpLeft   = 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/po_top_left_gray-new._V148510300_.png'; 
var outCornerUpRight  = 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/po_top_right_gray-new._V148510300_.png';
var outCornerLowLeft  = 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/po_bottom_left_gray-new._V148510302_.png';
var outCornerLowRight = 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/po_bottom_right_gray-new._V148510303_.png';
var outEdgeUp         = 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/po_top_gray-new._V148510303_.png'; 
var outEdgeLow        = 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/po_bottom._V200122327_.png';
var outEdgeLeft       = 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/po_left_gray-new._V148510297_.png';
var outEdgeRight      = 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/po_right_gray-new._V148510303_.png';

var closeBtnImg       = 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/btn-close._V192250357_.gif';
var closeBtnImg2      = 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/btn-close._V192250357_.gif';
var goToListBtnImg    = 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/btn-view-this-list._V192250362_.gif';
var viewListBtnImg    = 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/btn-view-this-list._V192250362_.gif';
var contShoppingBtnImg = 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/btn-continue-shopping._V192250357_.gif';
var amznLogoSuccessImg = 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/amazonlogo_sm-new._V149468552_.png';

var footerLeftImg = 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/uwl-bkm-lower-lt._V192250356_.gif';
var footerRightImg = 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/uwl-bkm-lower-rt._V192250356_.gif';
var gradientImg = 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/uwl-bkm-grad-2._V192250356_.gif';
var uwlTopLogoImg = 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/Amazon_Wish_List_longlogo-new._V149468553_.png';

var alertImg = 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/common/errors-alerts/error-sprite-mini._V192240838_.gif';

var priceLabelStr = "Price";
var addedTo = "added to";
var lookingUpAmazonStr = "Looking for matches on Amazon.com";
var titleLabelStr = "Name";
var priceLabelNewDes = "Price";
var alertSpecifyTitle = "Please specify a name";
var imageNextAltStr = "Next image";
var viewOr = " or";
var noMatchesFoundStr = "Looked for matches on Amazon.com: No matches found.";
var weddRegDrop = "Our Wedding Registry";
var babyRegDrop = "Baby Registry";
var alertCantAddItem = "This item could not be added to your list at this time";
var alertDuplicateItem = "This item was already on the selected list";
var imgXofYStr = "_x_ of _y_";
var notesDescStr = "(up to 500 characters)";
var successLabelStr = "Universal Wish List Button Success!";
var successDescStr = "You're all set up! This button will remain in your Internet browser whenever you use it. Just click this same &quot;Add to Wish List&quot; button while shopping at any online store to save items to any of your Amazon Wish Lists.";
var notesLabelStr = "Comments";
var popoverTitleStr = "Add item to your Amazon Wish List";
var dropdownLabelStr = "Add to";
var imagePrevAltStr = "Previous image";
var alertQuantityError = "Please enter a valid Quantity Desired";
var desiredLabelStr = "Quantity";
var altClose = "Close";
var noLookupStr = "We did not try to find a match on Amazon.com.";
var commentsLabelNewDes = "Comments";
var altCancel = "Cancel";
var wishlistDrop = "Wish List";
var whyNoLookupStr = "We try to detect if Amazon has the item you are wishing for. For sites that have unique products, we might not attempt a match at all.";
var alertChooseLisMessageStr = "Please choose a list below";
var imageAltStr = "Selected image";
var alertHeaderItemNotAdded = "This item has not been added to your registry.";
var qtyLabelNewDes = "Quantity";
var noImageStr = "No image found";
var altContinueShopping = "Continue Shopping";
var altAddItem = "Add to list";

  






var RegistryOption = function(id, name, isDefault, isPrivate, isSearchable) {
  name = shmEntityDecode(name);
  this.getId = function() { return id; };
  this.getName = function() { return name; };
  this.isDefault = function() { return isDefault; };
  this.isPrivate = function() { return isPrivate; };
  this.isSearchable = function() { return isSearchable; };
};

Registries = function() {
  var registriesOptions = new Array();
  var defaultRegistryId = '';
      registriesOptions.push(new RegistryOption('', "Choose a List", 1, -1, -1));
      registriesOptions.push(new RegistryOption('', "--Wish Lists--", 0, -1, -1));
      registriesOptions.push(new RegistryOption('noreg-wishlist', "Wish List", 0, -1, -1));
      registriesOptions.push(new RegistryOption('', "--Gift Lists--", 0, -1, -1));
      registriesOptions.push(new RegistryOption('noreg-giftlist', "Gift List", 0, -1, -1));
      registriesOptions.push(new RegistryOption('', "--Registries--", 0, -1, -1));
      registriesOptions.push(new RegistryOption('noreg-baby', "Baby Registry", 0, -1, -1));
      registriesOptions.push(new RegistryOption('noreg-wedding', "Wedding Registry", 0, -1, -1));

  return {
    hasRegistries : function() {
      return 0;
    },
    getRegistriesOptions : function() {
      return registriesOptions;
    }
  };
}();

  
var drag;
var offset = {X : 0, Y : 0};

var floater;
var content;
var listLink;
var descriptionArray = new Array();
var amazonPrice = null;
var asin;
var successSpan;
var failSpan;
var contentForm;
var submitForm;
var displayPromoLink;
var bkPageVersion;
var regselect;

var cancelButton;
var closeButton;
var saveButton;
var successDiv;
var failDiv;
var installDiv;

var omDPData = null;
var itemData = null;

var inSubmit = 0;

var pageArgs;
var commsFrame;
var asinFrame;
var Registries;
var dropDown;
var forceFallback;

  

var elemZeroMemo = {};

function shmCreateElement(tagName, props, styles, children) {
  if(!elemZeroMemo[tagName]) {
    var cached = document.createElement(tagName);
    shmStyleElement(cached, styleZero,"zero");
    if(useInline[tagName]) {
      shmStyleElement(cached, styleInline,"inline");
    }
    elemZeroMemo[tagName] = cached;
  } 
  
  var element = elemZeroMemo[tagName].cloneNode(false);

  if (props) {
    for (var propName in props) {
      element.setAttribute(propName, props[propName]) || eval('element.'+propName+'=props[propName];');
    }
  }
  if (styles) {
    shmStyleElement(element, styles);
  }
  if (children) {
    for( var i = 3; i < arguments.length; i++ ) {
      element.appendChild(arguments[i]);
    }
  }
  return element;
}


var shmStyleMemo = {};
function shmStyleElement(elt, styles,key) {
  if(key) {
    if(!shmStyleMemo[key]) {
      shmStyleMemo[key] = shmStyleElement(document.createElement("span"),
                                          styles).style.cssText;
    }
    
    elt.style.cssText = elt.style.cssText + shmStyleMemo[key];
    return elt;
  }

  for (var styleName in styles) {
    try {
      elt.style[styleName] = styles[styleName];
    } catch (e) {
      try {
        if (elt.currentStyle) {
          elt.currentStyle[styleName] = styles[styleName];
        }
      } catch (e) {
      }
    }
  }
  return elt;
}

function shmClear(elt) {
  if (elt == null || elt == undefined) {
    return elt;
  }
  while (elt.firstChild) {
    elt.removeChild(elt.firstChild);
  }
  return elt;
}


function shmNullPad(elem){
  elem.setAttribute('cellspacing', '0') || (elem.cellSpacing = '0');
  elem.setAttribute('cellpadding', '0') || (elem.cellPadding = '0');
}


  function shmSetStartPos () {
    if(floater) {
      var rightOffset = shmGetRightOffset();
      var scroll = shmGetScroll();
      floater.style.right = (25 + scroll.X - rightOffset) + "px";
      floater.style.top = (10 + scroll.Y) + "px";
    }
  }


function shmPopOverlaps(elt) {
  while (elt != null && elt != document.body) {
    if (elt == floater) {
      return false;
    }
    elt = elt.parentNode;
  }
  return true;
}


  function shmShiftTo (obj, x, y) {
    if( obj && x && y) {
      obj.style.left = x + "px";
      obj.style.top = y + "px";
    }
  }

  function shmGetRightOffset() {
    if (!window.innerWidth &&
        document.documentElement.clientWidth && document.body.clientWidth &&
        document.documentElement.clientWidth != document.body.clientWidth) {
      return (document.documentElement.clientWidth - document.body.clientWidth) / 2;
    } else {
      return 0;
    }
  }

  function shmGetScroll() {
    var scrollY;
    var scrollX;
    if(typeof window.pageYOffset == 'number') {
      scrollX = window.pageXOffset;
      scrollY = window.pageYOffset;
    } else if(document.body && (document.body.scrollTop || document.body.scrollLeft)) {
      scrollX = document.body.scrollLeft;
      scrollY = document.body.scrollTop;
    } else if(document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
      scrollY = document.documentElement.scrollTop;
      scrollX = document.documentElement.scrollLeft;
    } else {
      scrollX = 0;
      scrollY = 0;
    }
    return { X : scrollX, Y : scrollY };
  }

function shmApplyHeadTxtStyle(elt) {
    elt.style.fontFamily = styleSerifFont;
    elt.style.fontSize = '12px';
    elt.style.color = '#46535b';
    if (!lteIE6){
      elt.style.cssFloat = 'none';
    } else {
      elt.style.styleFloat = 'none';
    }
}



  function shmGetPos(obj) {
    var pos = { X : 0, Y : 0};
    if(obj) {
      if(typeof obj.offsetLeft != "undefined") {
        pos = { X : obj.offsetLeft, Y : obj.offsetTop};
        while(obj = obj.offsetParent) {
          pos.X += obj.offsetLeft;
          pos.Y += obj.offsetTop;
        }
      } else if(typeof obj.pageX != "undefined") {
        pos = { X : obj.pageX, Y : obj.pageY };
      } else if(typeof obj.clientX  != "undefined") {
        var scroll = shmGetScroll();
        pos = { X : obj.clientX + scroll.X, Y : obj.clientY + scroll.Y };
      }
    }
    return pos;
  }

  function shmIsDefined(obj) {
    if ((obj != null) && (typeof obj != 'undefined'))
      return true;
    else
      return false;
  }


  var shmEntityDecodeVar;
  var shmEntityNullInner;
  function shmEntityDecode(text) {
    if( !shmEntityDecodeVar ) {
      shmEntityDecodeVar = document.createElement("textarea");
      shmEntityDecodeVar.innerHTML = '';
      shmEntityNullInner = shmEntityDecodeVar.value;
    }
    shmEntityDecodeVar.innerHTML=text.replace(/</g,"&lt;").replace(/>/g,"&gt;");
    var tmp = shmEntityDecodeVar.value.substring(shmEntityNullInner.length);
    return tmp;
  }

    var textSize = function(font,string) {
        var elem = shmCreateElement('span',{},{});
        var fontSize = font.split(' ',2)[0];
        var fontFamily = font.split(' ',2)[1];
        if(!fontFamily) {
            fontFamily = 'Verdana, Arial ,Helvetica, sans-serif';
        }
        elem.style.fontFamily = fontFamily;
        elem.style.fontSize = fontSize;
        elem.style.visbility = 'none';
        elem.style.position = 'fixed';
        elem.style.zIndex = '-1';

        if(elem.innerText !== undefined) {
          elem.innerText = string;
        }  else {
          elem.textContent = string;
        }

        document.body.appendChild(elem);
        var ret = elem.offsetWidth;
        elem.parentNode.removeChild(elem);
        return ret;
    }


  

var Events = function() {

  return {
    handleOnMouseDown : function(evt) {
      evt = (evt) ? evt : ((event) ? event : null);
      drag = floater;
      if(drag) {
        var evtPos = shmGetPos(evt);
        var divPos = shmGetPos(drag);

        offset.X = evtPos.X - divPos.X + shmGetRightOffset();
        offset.Y = evtPos.Y - divPos.Y;

        return false;
      }
    },

    handleOnMouseUp : function(evt) {
      evt = (evt) ? evt : ((event) ? event : null);
      drag = null;
    },

    handleOnMouseMove : function(evt) {
      evt = (evt) ? evt : ((event) ? event : null);
      if(drag) {

        var evtPos = shmGetPos(evt);
        shmShiftTo(drag, evtPos.X - offset.X, evtPos.Y - offset.Y);

        evt.cancelBubble = true;
        return false;
      }
    },

    ignore : function(evt) {
      evt = (evt) ? evt : ((event) ? event : null);
      if (evt) {
        evt.cancelBubble = true;
      }
      return false;
    },

    addHandler : function(elt, evtName, fn) {
      var onEvent = 'on' + evtName;
      elt[onEvent] = fn;
    }
  };
}();

  
var DropDowns = function() {

  return {
    hiddenDropdowns : null,
    hiddenObjects : null,
    hiddenEmbeds : null,

    hideAll : function(tagName) {
      var hidden = new Array();
      var tags = document.getElementsByTagName(tagName);
      for (var i=0; i < tags.length; i++) {
        if (shmPopOverlaps(tags[i]) && !tags[i].className.match(/ap_never_hide/)) {
          tags[i].style.visibility = 'hidden';
          hidden.push(tags[i]);
        }
      }
      return hidden;
    },

    showAll : function(tags) {
      if (tags) {
        for (var i=0; i < tags.length; i++) {
          tags[i].style.visibility = 'visible';
        }
      }
    },

    hide : function() {
      DropDowns.hiddenObjects = DropDowns.hideAll('object');
      DropDowns.hiddenEmbeds = DropDowns.hideAll('embed');
      if (lteIE6) {
        DropDowns.hiddenDropdowns = DropDowns.hideAll('select');
      }
    },


    show : function() {
      DropDowns.showAll(DropDowns.hiddenObjects);
      DropDowns.hiddenObjects = null;
      DropDowns.showAll(DropDowns.hiddenEmbeds);
      DropDowns.hiddenEmbeds = null;
      if (lteIE6 && DropDowns.hiddenDropdowns) {
        DropDowns.showAll(DropDowns.hiddenDropdowns);
        DropDowns.hiddenDropdowns = null;
      }
    }
  };
}();

  
    



function isVendor() {
  return 0;
};
  
function isBKMSourceDomain() {


  var isSourceDomain;

    isSourceDomain = document.domain.match(/^(?:www\.)?amazon.com/) || document.domain.match(/www.amazon.com/);
    return isSourceDomain;
  };

function isBKMLocalDomain() {

  var isLocalDomain;

    isLocalDomain = document.domain.match(/^(?:www\.|.*\.)?amazon.com/) || document.domain.match(/www.amazon.com/);
    return isLocalDomain;
  };

var PageScraper = function() {
  this.itemData = {};

  this.itemData = this.getVendorItemData();
  if(!this.itemData) {
    this.itemData = this.getGenericItemData();
  }
};

PageScraper.prototype.getVendorItemData = function() {
      var data = null;
      var isAmazon = isBKMSourceDomain();
      if (isAmazon && !isVendor()) {
        data = this.parseAmazonVendorData();
      }
      else {
        this.bkPageVersion = document.getElementById('AUWLBkPageVersion');
        if (this.itemData && this.bkPageVersion && this.itemData.version == parseInt(this.bkPageVersion.innerHTML)) {
          data = this.itemData;
        }

        if (!data) {
          data = this.parseGenericVendorData();
        }

        if (!data) {
          data = this.parseGoogleCheckoutVendorData();
        }

        if (!data && isAmazon && isVendor()) {
          data = this.parseAmazonVendorData();
        }
      }

      return data;
};

PageScraper.prototype.getGenericItemData = function(){
  var itemData = {"unverified" : true};
  itemData.title = this.getTitle();
  itemData.price = this.getPrice();
  itemData.imageArray = this.getGenericImageData();
  return itemData;
};

PageScraper.prototype.getPrice = function() {
    var startTime = new Date().getTime();
    var nodes = [];
    var nonZeroRe = /[1-9]/;
    var priceFormatRe = /((?:\$|USD|\&pound\;|\&\#163\;|\&\#xa3\;|\u00A3|\&yen\;|\uFFE5|\&\#165\;|\&\#xa5\;|\u00A5|eur|\&\#8364\;|\&\#x20ac\;)\s*\d[0-9\,\.]*)/gi;
    var textNodeRe = /textnode/i;
    var emRe = /em/;
    var priceRangeRe = /^(\s|to|\d|\.|\$|\-|,)+$/; 
    var priceBonusRe = /club|total|price|sale|now|brightred/i;
    var outOfStockRe = /soldout|currentlyunavailable|outofstock/i;
    var tagRe = /^(h1|h2|h3|b|strong|sale)$/i;
    var anchorTagRe = /^a$/i;

    var penRe = /original|header|items|under|cart|more|nav|upsell/i;
    
    var last = "";
    var lastNode;
    var outOfStockIndex = -1;
    var foundPositivePriceBeforeOOSMsg = 0;

    var performOutOfStockCheck = function(domainStr) {
       var blacklist = new Array("toysrus.com", "babiesrus.com", "walmart.com");

       for (var i = 0; i < blacklist.length; i++) {
         var regex = new RegExp("^(?:www\.)?" + blacklist[i], "i");
         if (regex.test(domainStr)) {
           return false;
         } 
       }

       return true;
    };

    var getParents = function(node) {
        var parents = [];
        var traverse = node;
        while(traverse.parentNode) {
        parents.push(traverse.parentNode);
        traverse = traverse.parentNode;
        }
        return parents;
    };
    
    var findMutualParent = function(first,second) {

        var firstParents = getParents(first);
        var secondParents = getParents(second);

        for(var i = 0; i < firstParents.length; i++) {
        for(var j = 0; j < secondParents.length; j++) {
            if(firstParents[i] === secondParents[j]) {
                return firstParents[i];
                }
            }
        }
        return undefined;
    };
    
    var getStyleFunc = function(node) {
        if(document.defaultView && document.defaultView.getComputedStyle) {
            var computedStyle = document.defaultView.getComputedStyle(node,null);
            return function(propertyName) {
                return computedStyle.getPropertyValue(propertyName);
                };
        } else {
            return function(propertyName) {

                var mapper = {
                    "font-size" : "fontSize",
                    "font-weight" : "fontWeight",
		    "text-decoration" : "textDecoration"
                };
                
                return node.currentStyle[ mapper[propertyName] ? mapper[propertyName] : propertyName ];
                };
        }
    };
    
    
    var getWalker = function() {
        if(document.createTreeWalker) {
        return document.createTreeWalker(document.body,
                                       NodeFilter.SHOW_TEXT,
                                       function(node) {
                                           return NodeFilter.FILTER_ACCEPT;
                                       },
                                       false
                                      );
    
        } else {


        return {
            q : [],
            intialized : 0,
            currentNode : undefined,
            nextNode : function() {
                if(!this.initialized) {
                    this.q.push(document.body);
                    this.initialized = true;
                }
                
                while(this.q.length) {
                    var working = this.q.pop();
                    if(working.nodeType == 3) {
                        this.currentNode = working;
                        return true;
                    } else if(working.childNodes) {


                        if(working.style && 
                           (working.style.visibility == "hidden" || 
                            working.style.display == "none")) {
                            continue;
                        }

                        var children = new Array(working.childNodes.length);
                        for(var i = 0; i < working.childNodes.length; i++) {
                            children[i] = working.childNodes[i];
                        }
                        children.reverse();
                        this.q = this.q.concat(children);
                    }
                }
                return false;
            }
        };
        }
    };

    var getFontSizePx = function(styleFunc) {

        var fontSize = styleFunc("font-size") || "";
        var sizeFactor = emRe.test(fontSize) ? 16 : 1;

        fontSize = fontSize.replace(/px|em|pt/,"");
        fontSize -= 0;

        if(!isNaN(fontSize)) {
            return fontSize * sizeFactor;
        } else {
            return 0;
        }
    };

    var getOffset = function(node) {

	var offset = node.offsetTop;

	while(node.offsetParent) {
	    node = node.offsetParent;
	    offset += node.offsetTop;
	}

	return offset;
    };

    var getScore = function(node, index) {

        var domNode = node.node;
        var styledNode = domNode.nodeType == 3 ? domNode.parentNode : domNode;

        var price = node.price;
        var content = "";

        if(domNode.nodeType == 3) {
            content = domNode.data;
        } else {
            content = domNode.innerText || domNode.textContent;
        }
    
        var score = 0;
        var getStyle = getStyleFunc(styledNode);
	
	var fontWeight = getStyle("font-weight");

        if(getStyle("font-weight") == "bold") {
            score += 1;
        } 

       if(!styledNode.offsetWidth && !styledNode.offsetHeight ||
           getStyle("visibility") == "hidden" ||
           getStyle("display") == "none") {
                           score -= 100;
        }

        var parentsChildrenContent = (domNode.parentNode.innerText || domNode.parentNode.textContent).replace(/\s/g,"");
	var strippedContent = content.replace(/\s+/g,"");
	


            if(!nonZeroRe.test(price)) {
                score -= 100;
            }

	var strippedContentNoPrice = strippedContent.replace(/price|our/ig,"");
        if(strippedContentNoPrice.length < price.length * 2 + 4) {
	    score += 10;
	}

	if(priceRangeRe.test(strippedContent)) {
	    score += 2;
	}

	if(price.indexOf(".") != -1) {
	    score += 2;
	}

	score -= Math.abs(getOffset(styledNode) / 500);

        score += getFontSizePx(getStyle);
       
        if (penRe.test(content)) { score-=4; }
        if (priceBonusRe.test(content)) { score++; }
        domNode = styledNode;

        var parentsWalked = 0;

        while (domNode !== null &&
	       domNode != document.body &&
               parentsWalked++ < 4 ) {


	    if(parentsWalked !== 0) {
		getStyle = getStyleFunc(domNode);
	    }

            if(getStyle("text-decoration") == "line-through") {
		 score -=100;
            }



            for(var i = 0; i < domNode.childNodes.length; i++) {

                if(domNode.childNodes[i].nodeType == 3) {
                    
                    var tnode = domNode.childNodes[i];
                    
                    if(tnode.data) {
                        if(priceBonusRe.test(tnode.data)) {
                            score += 1;
                        }
                        
                        if(penRe.test(tnode.data)) {
                            score -= 1;
                        }
                    }
                }
            }

	    if(anchorTagRe.test(domNode.tagName)) {
		score -=5 ;
	    }
            if (priceBonusRe.test(domNode.getAttribute('class') || 
                                  domNode.getAttribute('className'))) {
                score+=1;
            }

            if (priceBonusRe.test(domNode.id)) {
                score+=1;
            }

            if (tagRe.test(domNode.tagName)) {
                score += 1;
            }

            if (penRe.test(domNode.tagName)) {
                score -= 1;
            }

            if (penRe.test(domNode.id)) {
                score -= 2;
            }
            
            if (penRe.test(domNode.getAttribute('class') ||
                           domNode.getAttribute('className'))) {
                score -= 2;
            }

            domNode = domNode.parentNode;

        }
        
	
        score -= content.length / 100;

        score -= index / 5;

        return score;

    };

    walker = getWalker();


    while(walker.nextNode() && nodes.length < 100) {

        if( nodes.length % 100 === 0 ) {
            if( new Date().getTime() - startTime > 1500 ) {
                return;
            }
        }

        var node = walker.currentNode;
    
        var text = node.data.replace(/\s/g,"");
        priceFormatRe.lastIndex = 0;
        var priceMatch = text.match(priceFormatRe);
        
        //If OutofStockIndex has not been set and we found a OOS string then
        // we set the index to number of price matches found before this match
        if((outOfStockIndex < 0) && outOfStockRe.test(text) && performOutOfStockCheck(document.domain)) {
             outOfStockIndex = nodes.length;
        }	
        if(priceMatch) {

           if (priceMatch[0].match(/\.$/g) && walker.nextNode()) {
             var nextNode = walker.currentNode;
             if (nextNode && nextNode.data) {
               var nextPrice = nextNode.data.replace(/\s/g,"");
               if (nextPrice && isNaN(nextPrice)) {
                 nextPrice = "00";
               }
               priceMatch[0] += nextPrice;
             }
           } else if (priceMatch[0].match(/\,$/g)) {
             priceMatch[0] = priceMatch[0].substring(0, priceMatch[0].length - 1);
           }
          
           nodes.push(
             {
                "node" : node,
                "price" : priceMatch[0]
             }
           );
           text = "";
        } else if( last !== "" && text !== "") {
           priceMatch = (last + text).match(priceFormatRe);
           if(priceMatch) {
             var mutual = findMutualParent(lastNode,node);
             nodes.push({"node" : mutual, "price" : priceMatch[0]});
           }
        }
    
        lastNode = node;
        last = text;
    }


    var max = undefined;
    var maxNode = undefined;

    for(var i = 0; i < nodes.length; i++) {
        var score = getScore(nodes[i], i);
        //Trying to see if we found a positive price before we found a OOS match
        if((i < outOfStockIndex) && (score > 0)) {
           foundPositivePriceBeforeOOSMsg = 1;
         }
        if(max === undefined || score > max) {
         max = score;
         maxNode = nodes[i];
        }
    }

    if(maxNode && ((outOfStockIndex < 0) || foundPositivePriceBeforeOOSMsg)) {
     return maxNode.price;
    }
}
;


if (RegExp("^https?://www.google.com/shopping/").test(window.location)) {
  var demoteSrc = new RegExp("maps.googleapis.com|googleapis\.com/.*=api\|smartmaps");
  var promoteId = new RegExp("^pp-altimg-init-main$");
  PageScraper.prototype.sortImage = function(a, b) {
    return (promoteId.test(b.id) - promoteId.test(a.id)) || (demoteSrc.test(a.src) - demoteSrc.test(b.src)) || (b.height*b.width) - (a.height*a.width);
  }
} else {
  PageScraper.prototype.sortImage = function(a, b) {
    return (b.height*b.width) - (a.height*a.width);
  }
}



PageScraper.prototype.getGenericImageData = function(includeSrc) {
      var imgs = document.getElementsByTagName('img');
      var imageArray = [];
      var srcs = {};
      for (var i=0;i<imgs.length;i++) {
        var img = imgs[i];
        if (img.src.length > maxRequestLength) {
           continue;
        }
        if (img.src.length < 7 || typeof img.naturalWidth != 'undefined' && img.naturalWidth == 0 || !img.complete) {
           continue;
        }
        if (srcs[img.src]) {
           continue;
        }
        var pixelCount = img.height * img.width;
        var squareness = 1;
        if (img.id && img.id == '__uwl_img_copy__'){
           continue;
        }
        if (img.id && img.id == 'uwl_logo'){
           continue;
        }
        
        if (img.height > img.width && img.height > 0) {
          squareness = img.width / img.height;
        } else if (img.width > img.height && img.width > 0) {
          squareness = img.height / img.width;
        }

        if (pixelCount > 1000 && squareness > 0.5 
            || (includeSrc && img.src == includeSrc)) {
          var imageIndex = imageArray.length;
          imageArray[imageIndex] = {};
          imageArray[imageIndex].src = img.src;
          imageArray[imageIndex].height = img.height;
          imageArray[imageIndex].width = img.width;
          imageArray[imageIndex].id = img.id;
          srcs[img.src] = 1;
        }
      }
      
      var sortFunc = function(a,b) {
          if (includeSrc) {
             if (a.src == includeSrc && b.src != includeSrc) {
                return -1;
             }
             if (a.src != includeSrc && b.src == includeSrc) {
                return 1;
             }
          }
          return PageScraper.prototype.sortImage(a, b);
      };
      imageArray.sort(sortFunc);
      return imageArray;
};

PageScraper.prototype.getElementsByClassName = function(className, elem) {
      elem = elem || document;
      var matches = [];
      if (document.getElementsByClassName) {
        try {
          var elems = elem.getElementsByClassName(className);
          for(var i = 0; i < elems.length; i++) {
            matches.push(elems[i]);
          }
        }
        catch (err) {
            matches = this.getElementsByClassNameFallback(className, elem);           
        }
        return matches;
      }
      else if(document.evaluate) {
        var node;
        var elems = document.evaluate(".//*[contains(concat(' ', @class, ' '),' " + className + " ')]",
                       elem, null, 0, null);
        while (node = elems.iterateNext()) {
          matches.push(node);
        }
        return matches;
      }
      else {
        matches = this.getElementsByClassNameFallback(className, elem);
        return matches;
      }
};

PageScraper.prototype.getElementsByClassNameFallback = function(className, elem) {
      var matches = [],
          elems = elem.getElementsByTagName("*"),
          regex = new RegExp("(^|\\s)" + className + "(\\s|$)");

       for(var i = 0; i < elems.length; i++) {
          if(regex.test(elems[i].className)) {
            matches.push(elems[i]);
          }
        }

      return matches;
};


PageScraper.prototype.extractValue = function(elem) {
      if (elem.nodeName == "IMG" || elem.nodeName == "IFRAME") {
        return elem.src;
      } else if (elem.nodeName == "INPUT") {
        return elem.value;
      }
      return elem.innerHTML;
};

PageScraper.prototype.parseGenericVendorData = function() {
      var postfix = '';
      if (pageArgs && pageArgs.name) {
        postfix = '.' + pageArgs.name;
      }

      var _object = null;
      var obj = function () {
          if (_object){ return _object;}
          _object = new Object();
          return _object;
      }

      var bkHide = document.getElementById('AUWLBkHide' + postfix);
      if (bkHide && bkHide.innerHTML && bkHide.innerHTML.length && isBKMLocalDomain()) {
          obj().hide = bkHide.innerHTML;
      }
      var bkTitle = document.getElementById('AUWLBkTitle' + postfix);
      if (bkTitle){
          obj().title = bkTitle.innerHTML;
      }
      var bkPrice = document.getElementById('AUWLBkPrice' + postfix);
      var bkPriceLow = document.getElementById('AUWLBkPriceLow' + postfix);
      var bkPriceHigh = document.getElementById('AUWLBkPriceHigh' + postfix);
      var bkCurrency = document.getElementById('AUWLBkCurrency' + postfix);
      if (bkPrice && bkPrice.innerHTML && bkPrice.innerHTML.length){
          obj().price = bkPrice.innerHTML;
      } else if (bkPriceLow && bkPriceLow.innerHTML && bkPriceLow.innerHTML.length
              && bkPriceHigh && bkPriceHigh.innerHTML && bkPriceHigh.innerHTML.length) {
          obj().price = bkPriceLow.innerHTML;
      }
      if (bkCurrency && bkCurrency.innerHTML && bkCurrency.innerHTML.length) {
        obj().currency = bkCurrency.innerHTML;
      }
      var bkImage = document.getElementById('AUWLBkImage' + postfix);
      if (bkImage){
        obj().imageArray = [ {
          "src" : bkImage.innerHTML
        }];
      }
      var bkURL = document.getElementById('AUWLBkURL' + postfix);
      if (bkURL){
          obj().url = bkURL.innerHTML;
      }

      if (bkPageVersion) {
        var version = parseInt(bkPageVersion.innerHTML);
        obj().version = version;
      }

      var bkBannerImage = document.getElementById('AUWLBkBannerImage' + postfix);
      var isAmazon = isBKMSourceDomain();
      if(bkBannerImage && isAmazon) {
        obj().bannerImage = bkBannerImage.innerHTML;
      }

      return _object;
};

PageScraper.prototype.parseAmazonVendorData = function() {

      var itemData = new Object();

      try {
        itemData.title = document.title;
        if(typeof itemData.title != "string") {
          itemData.title = "";
        }
        try {
          var titleBlock = document.getElementById('btAsinTitle');
          if (titleBlock) {
            itemData.title = titleBlock.innerText || titleBlock.textContent;
            if (itemData.title) {
              itemData.title = itemData.title.replace(/^\s+|\s+$/g, "");
            }
          }
        } catch(e) {}
        try {
          itemData.asin = document.handleBuy.ASIN.value;
        } catch (e) {
          try {
            var asinFieldNames = {ASIN: 1, asin: 1, o_asin: 1};
            asinFieldNames['ASIN.0'] = 1;
            for (var asinField in asinFieldNames) {
              var asins = document.getElementsByName(asinField);
              if (asins.length) {
                itemData.asin = asins[0].value;
                break;
              }
            }
          } catch (e) {}
        }
        var checkTags = new Array("b", "span"); 
        if (document.evaluate) {
          for (var i=0; i < checkTags.length; i++) {
            var elts = document.evaluate("//div[@id='priceBlock']//table[@class='product']//td//" + checkTags[i] + "[contains(@class,'priceLarge') or contains(@class,'price') or contains(@class,'pa_price')]",
                         document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
            var elt = null;
            while (elt = elts.iterateNext()) {
              if (elt.textContent) {
                itemData.price = elt.textContent;
                break;
              }
            }
            if (itemData.price) break;
          }
        } else {
          var priceBlock = document.getElementById('priceBlock');
          if (priceBlock) {
            var tables = priceBlock.getElementsByTagName('table');
            for (var i=0; i < tables.length; i++) {
              var tableClass = tables[i].getAttribute('class') || tables[i].getAttribute('className');
              if (tableClass == 'product') {
                for (var j=0; i < checkTags.length; j++) {
                  var elements = tables[i].getElementsByTagName(checkTags[j]);
                  for (var i = 0; i < elements.length; i++) {
                    var elementClass = elements[i].getAttribute('class') || elements[i].getAttribute('className');
                    if (elementClass.indexOf('price') > -1 || elementClass.indexOf('priceLarge') > -1 || elementClass.indexOf('pa_price') > -1) {
                      itemData.price = elements[i].innerHTML;
                      break;
                    }
                  }
                  if (itemData.price) break;
                }
              }
            }
          }
        }

        if (itemData && itemData.price) {
          var priceParts = itemData.price.split("-");
          if(priceParts[0]){
            itemData.price = priceParts[0];
          }
        } 

        var imageCellNames = {prodImageCell: 1, fiona_intro_noflash: 1, productheader: 1, 'kib-ma-container-1': 1, 'center-12_feature_div': 1, holderMainImage: 1, 'main-image-outer-wrapper': 1};
        var selectedImage;
        
        for (var imageCell in imageCellNames) {
          var prodImageCell = document.getElementById(imageCell);
          if (prodImageCell) {
            var prodImages = prodImageCell.getElementsByTagName('img');
            if (prodImages.length) {
              var prodImageArray = new Array(prodImages.length);
              for (var i = 0; i < prodImages.length; i++){
                 prodImageArray.push(prodImages[i]);
              }
              prodImageArray.sort(this.sortImage);
              selectedImage = prodImageArray[0];
              break;
            }
          }
        }
        
        if (selectedImage) {
          itemData.imageArray = [{
            "src" : selectedImage.src
          }];
        } else {
          if ( itemData && !itemData.asin) {
            itemData.imageArray = this.getGenericImageData();
          }
        }
      } catch(e) {}

      if(!itemData.imageArray) {
         itemData.imageArray = [];
      }
      return itemData;
};
PageScraper.prototype.parseGoogleCheckoutVendorData = function() {

      var itemData = null;

    var elems = this.getElementsByClassName("product");

      if (elems && elems[0]) {
        itemData = {};
        itemData.unverified = true;
        var prod = elems[0];
        var scrapedImage;

        var titleElem = this.getElementsByClassName("product-title", prod);
        if(titleElem && titleElem[0]) {
          itemData.title = this.extractValue(titleElem[0]);
        }
        var priceElem = this.getElementsByClassName("product-price", prod);
        if(priceElem && priceElem[0]) {
          itemData.price = this.extractValue(priceElem[0]);
        }
        var urlElem = this.getElementsByClassName("product-url", prod);
        if(urlElem && urlElem[0]) {
          itemData.url = this.extractValue(urlElem[0]);
        }
        var imgElem = this.getElementsByClassName("product-image", prod);
        if (imgElem && imgElem[0]) {
          var imgSrc = this.extractValue(imgElem[0]);
          scrapedImage = imgSrc;
        }

        itemData.imageArray = this.getGenericImageData(scrapedImage);
      }

      if(itemData && itemData.title && itemData.price) {
          return itemData;
      } else {
          return null;
      }
};

PageScraper.prototype.getTitle = function() {
  var title = window.document.title;
  if(typeof title != "string") {
    return "";
  }
    
  title = title.replace(/\s+/g,' ');
  title = title.replace(/^\s*|\s*$/g,'');
  
  if(document.domain.match(/amazon\.com/) && asin){
    var titleParts = title.split(":");
    if(titleParts[1]){
      title = titleParts[1];
    }
  }
  return title;
};



var pageArgs = null;
var PageParser = function() {

  var pageScraper;
  var titleCell;
  var priceCell;
  var miscCell;
  var imageCell;
  var asinCell;
  var bannerImageCell;
  var hideCells = {};
  
  return {
    registerHide : function(name, cell){
      hideCells[name] = cell;
    },

    registerAsin : function(cell){
      asinCell = cell;
    },

    registerPrice : function(cell){
      priceCell = cell;
    },

    registerTitle : function(cell){
      titleCell = cell;
    },

    registerMisc : function(cell){
      miscCell = cell;
    },

    registerImage : function(cell){
      imageCell = cell;
    },

    registerBannerImage : function(cell){
      bannerImageCell = cell;
    },
    parsePage : function() {
        if(!pageScraper) {
            pageScraper = new PageScraper();
        }

        uwlPriceArray = PageScraper.uwlPriceArray;
    },
    update : function(){
      ImgSelection.reset();
        
      pageScraper = new PageScraper();

      uwlPriceArray = pageScraper.uwlPriceArray;

      PageParser.updatePrice();
      PageParser.updateTitle();
      PageParser.updateMisc();
      PageParser.updateImage();
      PageParser.updateAsin();
      PageParser.updateBannerImage();
      PageParser.updateHide();
    },

    updateHide : function(){
      var itemData = pageScraper.itemData;
      if (itemData.hide) {
        var fields = itemData.hide.split(',');
        for (var id in fields) {
          var cell = hideCells[fields[id]];
          if (cell) {
            cell.style.visibility = 'hidden';
          }
        }
      }
    },

    updateAsin : function(){
      var itemData = pageScraper.itemData;
      if(asinCell) {
        shmClear(asinCell);
        if (itemData) {
          asinCell.appendChild(shmCreateElement('input', {id: 'auwlBookMarkAsinInput', name: 'asin.0', type: 'text', value: itemData.asin}));
        }
      }
    },
    
    updateImage : function(){
      if(imageCell) {
        shmClear(imageCell);
        imageCell.appendChild(ImgSelection.render());
      }
    },
    
    updateBannerImage : function(){
      var itemData = pageScraper.itemData;
      if(bannerImageCell && itemData && itemData.bannerImage) {
        shmClear(bannerImageCell);
        bannerImageCell.style.display = '';
        bannerImageCell.appendChild(shmCreateElement('img',{src: itemData.bannerImage}));
      }
    },
    
    updateMisc : function(){
      var itemData = pageScraper.itemData;
      if(miscCell) {
        shmClear(miscCell);
        if (isBKMSourceDomain() && itemData && itemData.asin){
          miscCell.appendChild(shmCreateElement('input', {name: 'asin.0', type: 'hidden', value: itemData.asin}));
        } else {
          asin = null;
        }
        
        var prodUrl = shmCreateElement('input', { type: 'hidden', name: 'productUrl.0' });
        if (itemData && itemData.url) {
          prodUrl.value = itemData.url;
        } else {
          try {
            prodUrl.value = window.location;
          } catch(e) {
            prodUrl.value = "???";
          };
        }
        miscCell.appendChild(prodUrl);
      }
    },
    
    updatePrice : function(){
      var itemData = pageScraper.itemData;
      if(priceCell) {
        shmClear(priceCell);
        var pricePrefix = '';
        if (itemData && itemData.currency) {
          var codeMap = {
            USD: '$',
            GBP: '&pound;',
            JPY: '&yen;',
            EUR: '&euro;'
          };
          
          pricePrefix = codeMap[itemData.currency] + ' ';
          priceCell.appendChild(shmCreateElement('input', {id: 'auwlBookMarkCurrency', name: 'currencyInput', type: 'hidden', value: itemData.currency}));
        }
        if (itemData && itemData.price && !itemData.unverified) {
          var thistitle = shmCreateElement('span', {}, styleFormValue);
          thistitle.innerHTML = pricePrefix + itemData.price;
          priceCell.appendChild(thistitle);
          priceCell.appendChild(shmCreateElement('input', {id: 'auwlBookMarkPriceInput', name: 'priceInput', type: 'hidden', value: pricePrefix + itemData.price}));
        }
        else if (itemData && itemData.price) {
          var inputWrapper = shmCreateElement('span', {}, formInputWrapper);
          inputWrapper.appendChild(shmCreateElement('input', {id: 'auwlBookMarkPriceInput', name: 'priceInput', type: 'text', value: pricePrefix + itemData.price, size: '14'}, styleFormField));
          priceCell.appendChild(inputWrapper);
        }
        else if (itemData && itemData.priceLow && itemData.priceHigh) {
          var thistitle = shmCreateElement('span', {}, styleFormValue);
          thistitle.innerHTML = pricePrefix + itemData.priceLow;
          priceCell.appendChild(thistitle);
          priceCell.appendChild(shmCreateElement('input', {id: 'auwlBookMarkPriceInput', name: 'priceInput', type: 'hidden', value: pricePrefix + itemData.priceLow}));
        } else {
          var inputWrapper = shmCreateElement('span', {}, formInputWrapper);
          var priceInputField = shmCreateElement('input', {id: 'auwlBookMarkPriceInput', name: 'priceInput', type: 'text', value: shmEntityDecode(priceLabelNewDes), size: '14'}, styleFormField);
	  shmStyleElement(priceInputField,{color:'#666666',fontStyle:'italic'});
	  // Remove the hint text from the box when it gets the focus.
	  Events.addHandler(priceInputField,'focus',function(e) {if (this.value === shmEntityDecode(priceLabelNewDes)){this.value = ''; shmStyleElement(priceInputField,{color:'#333333',fontStyle:'normal'});}});
          inputWrapper.appendChild(priceInputField);
	  priceCell.appendChild(inputWrapper);
        }
      }
    },
    updateTitle : function(){
      var itemData = pageScraper.itemData;
      if(titleCell) {
        shmClear(titleCell);
        if (itemData && itemData.title && !itemData.unverified) {
          var thistitle = shmCreateElement('span', {}, styleFormValue);
          thistitle.appendChild(stn(itemData.title));
          titleCell.appendChild(thistitle);
          titleCell.appendChild(shmCreateElement('input', {id: 'auwlBookMarkName', name: 'name.0', type: 'hidden', value: itemData.title}));
        } else {
          var title = itemData && itemData.title ? itemData.title : Title.get();
          if(!title) {
            title = "";
          }
          var inputWrapper = shmCreateElement('span', {}, formInputWrapperExpand);
	  inputWrapper.appendChild(shmStyleElement(shmCreateElement('input', {id: 'auwlBookMarkName', name: 'name.0', type: 'text', maxlength: '250', value: shmEntityDecode(title)}, styleFormField), {width: '100%'}));
          titleCell.appendChild(inputWrapper);
        }
      }
    },
    getImages : function(){
      PageParser.parsePage();
      var imageArrayRaw = pageScraper.itemData.imageArray;
      if (!imageArrayRaw) {
        imageArrayRaw = [];
      }
      return imageArrayRaw; 
    }
  }
}();

  
var Title = function() {

  var title;
  var titleListener;

  return {


    get : function() {
      return title;
    },

    set : function(t) {
      title = t;
      if (t && titleListener){
        title = title.replace(/((?:(?:\&[^;]*\;)|(?:\<[^>]*\>)|[^\s&<]){15})/g, "$1&#8203;");
        titleListener.innerHTML = title;
      }
    },

    setListener : function(element){
        titleListener = element;
        Title.set(Title.get());
    }

  };
}();

  
var ButtonMkr = function() {

  return {

    cancelFailed : function (){
      var button = shmCreateElement('img', { src : closeBtnImg2 } );
      button.style.marginBottom = '10px';
      button.style.border = '0';
      button.style.display = 'inline';
      button.style.cursor = 'pointer';

      var cancel = shmCreateElement('a', {target: '_self'});
      cancel.value = button;
      cancel.appendChild(button);
      Events.addHandler(cancel, 'click', function(e) { Popover.hidePopover(); return false; });

      return cancel;
    },

    goToList : function(suffix) {
      var button = shmCreateElement('img', { src : goToListBtnImg } );
      button.style.marginBottom = '10px';
      button.style.marginRight = '5px';
      button.style.border = '0';
      button.style.display = 'inline';
      button.style.cursor = 'pointer';

      listLink = shmCreateElement('a', {target: '_blank'});
      Events.addHandler(listLink, 'click', function(e) { Popover.hidePopover(); return true; });
      listLink.appendChild(button);
      listLink.id = 'goToList' + suffix;
      listLink.href = 'http://www.amazon.com/gp/wishlist/ref=wl_bm-view-list';

      return listLink;
     }

  };
}();

  
var ImgSelection = function(){
  var imgTbl = shmCreateElement('table');
  var shownImage = shmCreateElement('img');
  var inp = shmCreateElement('input');
  var imgXofY = shmCreateElement('nobr');
  var currIdx = 0;
  var imgListener;

  return {
    reset : function() {
      shownImage = shmCreateElement('img');
      inp = shmCreateElement('input');
      imgXofY = shmCreateElement('nobr');
      currIdx = 0;
    },

    render : function() {
      var imageArrayRaw = PageParser.getImages();
      var imageArray = [];
      var imgAttrs = ["src","width","height"];
      for(var i = 0; i < imageArrayRaw.length; i++) {
        var elt = imageArrayRaw[i];
        var img = shmCreateElement('img');
        for(var j = 0; j < imgAttrs.length; j++) {
            if(elt[imgAttrs[j]]) {
               img[imgAttrs[j]] = elt[imgAttrs[j]];
            }
        }

        if(img.width > img.height && img.width > thumbnailWidth) {
          img.height = this.imageArray[i].height * thumbnailWidth/this.imageArray[i].width;
          img.width = thumbnailWidth;
        }
        
        if(img.width <= img.height && img.height > thumbnailWidth) {
          img.width = img.width * thumbnailWidth/img.height;
          img.height = thumbnailWidth;
        }
        imageArray.push(img);
      }

      var imagesDiv = shmCreateElement('div', {valign: 'top', align: 'center'}, {display: 'block', textAlign: 'center'});
      imagesDiv.style.height = '100%';

      var divHeight = parseInt(fullImageHeight) + 2 + 'px';
      var divWidth = parseInt(fullImageWidth) + 2 + 'px';
      if (imageArray.length > 1) {
        divHeight = parseInt(thumbnailHeight) + 2 + 'px';
        divWidth = parseInt(thumbnailWidth) + 2 + 'px';
      }

      imagesDiv.style.padding = '0px';
      imagesDiv.style.width = parseInt(divWidth) + 0 + 'px';
      imagesDiv.align = 'center';
      imagesDiv.style.marginRight = '11px';

      if (!imageArray.length) {
        imagesDiv.appendChild(shmCreateElement('img', {src: noImageImg} ));
        return imagesDiv;
      }

      imgTbl = shmCreateElement('table', {}, {
        width: divWidth,
        height: divHeight,
        border: '0px solid #000000',
        verticalAlign: 'top'
      });

      shmNullPad(imgTbl);

      var tr = imgTbl.insertRow(-1);
      var imgCel = tr.insertCell(-1);
      imgCel.style.textAlign = 'center';
      imgCel.style.verticalAlign = 'top';
      tr.appendChild(imgCel);

      imagesDiv.appendChild(imgTbl);
      inp.type = 'hidden';
      inp.name = 'imageUrl.0';
      inp.value = imageArray[0].src;
      imagesDiv.appendChild(inp);

      imgCel.appendChild(shownImage);
      if (imageArray[0].complete) {
        ImgSelection.setShownImageProps(imageArray[0]);
      } else {
        var setRun = 0;
        var loadingImg = imageArray[0];
        var callBack = function(e) {
          if (!setRun) {
            if (loadingImg.complete) {
              setRun = 1;
              ImgSelection.setShownImageProps(loadingImg);
            }
          }
        };

        loadingImg.onload = callBack;
        setTimeout(callBack,200);
      }
      
      if (imageArray.length > 1) {
        imgXofY.innerHTML = ImgSelection.getImgXofYStr(1);
        shmStyleElement(imgXofY, styleFormPrompt); 
        imgXofY.style.margin = '3px';
        imgXofY.style.textAlign = 'center';
        imgXofY.style.vericalAlign = 'top';
        imgXofY.style.width = 'auto';

        var prev = ImgSelection.prevBtn();
        var next = ImgSelection.nextBtn();

        var prevNext = shmCreateElement('div', {align: 'center'}, {textAlign: 'center', verticalAlign: 'middle', width: 'auto', paddingTop: '4px', display: 'block'});
        prevNext.appendChild(prev);
        prevNext.appendChild(imgXofY);
        prevNext.appendChild(next);

        imagesDiv.appendChild(prevNext);
      }

      return imagesDiv;
    },

    constrainImageDimensions : function(height, width, maxHeight, maxWidth) {
      var overWidth = (width > maxWidth)? width - maxWidth : 0;
      var overHeight = (height > maxHeight)? height - maxHeight : 0;
      if (overWidth || overHeight) {
        if ((overWidth / maxWidth) > (overHeight / maxHeight)) {
          if (width != 0) {
            height = Math.round((maxWidth / width) * height);
            width = maxWidth;
          }
        } else {
          if (height != 0) {
            width = Math.round((maxHeight / height) * width);
            height = maxHeight;
          }
        }
      }
      return { height: height, width: width };
    },

    setShownImageProps : function(img) {
      var imageArray = PageParser.getImages();
      var maxHeight;
      var maxWidth;
      if (imageArray.length > 1) {
        maxHeight = parseInt(thumbnailHeight);
        maxWidth = parseInt(thumbnailWidth);
      } else {
        maxHeight = parseInt(fullImageHeight);
        maxWidth = parseInt(fullImageWidth);
      }
      var newDims = ImgSelection.constrainImageDimensions(img.height, img.width, maxHeight, maxWidth);
      shownImage.height = newDims.height;
      shownImage.style.height = newDims.height + 'px';
      shownImage.width = newDims.width;
      shownImage.style.width = newDims.width + 'px';
      shownImage.style.margin = 'auto';
      shownImage.style.border = '1px solid #DDDDDD';
      shownImage.src = img.src;
      shownImage.alt = shmEntityDecode(imageAltStr);
      shownImage.id = "__uwl_img_copy__";
      inp.value = img.src;
    },

    prevBtn : function() {
      var prev = shmCreateElement('img', { src : transparentImg, alt: shmEntityDecode(imagePrevAltStr) }, { verticalAlign: 'middle', display: 'inline', width: '6px', height: '15px', background: 'url(' + nextPrevBtnImg + ') no-repeat 0 0', marginTop: '2px', marginRight: '8px' });

      prev.onclick = function(e) {
        var imageArray = PageParser.getImages();
        if (currIdx != 0) currIdx--;
        else currIdx = imageArray.length - 1;
        ImgSelection.setShownImageProps(imageArray[currIdx]);
        imgXofY.innerHTML = ImgSelection.getImgXofYStr(currIdx + 1);
      };

      return prev;
    },

    nextBtn : function() {
      var next = shmCreateElement('img', { src : transparentImg, alt: shmEntityDecode(imageNextAltStr) }, { verticalAlign: 'middle', display: 'inline', width: '6px', height: '15px', background: 'url(' + nextPrevBtnImg + ') no-repeat -6px 0', marginTop:'2px', marginLeft: '8px' });

      next.onclick = function(e) {
        var imageArray = PageParser.getImages();
        currIdx++;
        if (currIdx == imageArray.length) currIdx = 0;
        ImgSelection.setShownImageProps(imageArray[currIdx]);
        imgXofY.innerHTML = ImgSelection.getImgXofYStr(currIdx + 1);
      };
      return next;
    },
    getImgXofYStr : function(currImgNum) {
      return imgXofYStr.replace('_x_', currImgNum).replace('_y_', PageParser.getImages().length);
    },

    setImage : function(img) {
      if (imgListener) {
        if (imgListener.hasChildNodes()) {
          imgListener.removeChild(imgListener.firstChild);       
        }
        if(noImageImg == img) {
          imgListener.appendChild(shmCreateElement('img', { src : img}));
        } else {
          imgListener.appendChild(imgTbl.cloneNode(true));
        }
      }
    },

    setListener : function(element) {
      imgListener = element;
    }
  };
}();

  

var Boxer = function() {

  return {

    mkBox : function(parent, body, content, width, showHeader, canMove, closeCode, closeRight, closeTop){
      var topRow = shmCreateElement('tr');
      var topCell = Boxer.genEdge({ edge: 'top', image: outEdgeUp, showHeader: showHeader, contentWidth: width, closeCode: closeCode, closeRight: closeRight, closeTop: closeTop });

      topRow.appendChild(Boxer.genCorner({v: 'U', h: 'L', image: outCornerUpLeft}));
      topRow.appendChild(shmStyleElement(topCell, {textAlign: 'center', align: 'center'}));
      topRow.appendChild(Boxer.genCorner({v: 'U', h: 'R', image: outCornerUpRight}));

      var topMidRow = shmCreateElement('tr', {}, {textAlign: 'center'});
      var topMidEdge = Boxer.genTopMidEdge({ edge: 'top', image: outEdgeUp, showHeader: showHeader, contentWidth: width, closeCode: closeCode, closeRight: closeRight, closeTop: closeTop });
      var topLEdge = Boxer.genEdge({ edge: 'left', image: outEdgeLeft });
      var topREdge = Boxer.genEdge({ edge: 'right', image: outEdgeRight });
      topMidRow.appendChild(topLEdge);
      topMidRow.appendChild(shmStyleElement(topMidEdge, {textAlign: 'center', align: 'center'}));
      topMidRow.appendChild(topREdge);

      var midRow = shmCreateElement('tr', {}, {textAlign: 'center'});
      var lEdge = Boxer.genEdge({ edge: 'left', image: outEdgeLeft });
      var rEdge = Boxer.genEdge({ edge: 'right', image: outEdgeRight });

      midRow.appendChild(lEdge);
      midRow.appendChild(content);
      midRow.appendChild(rEdge);

      var botTable = shmCreateElement('table');
      var botTableBody = shmCreateElement('tbody');
      var botRow = shmCreateElement('tr');
      var botCell = shmCreateElement('td', {colSpan: '3'}, {});
      var botContainerRow = shmCreateElement('tr');
      
      botContainerRow.appendChild(Boxer.genCorner({v: 'L', h: 'L', image: outCornerLowLeft}));
      botContainerRow.appendChild(shmStyleElement(Boxer.genEdge({ edge: 'bottom', image: outEdgeLow }), {textAlign: 'center', align: 'center', width: width + 'px'}));
      botContainerRow.appendChild(Boxer.genCorner({v: 'L', h: 'R', image: outCornerLowRight}));

      botTableBody.appendChild(botContainerRow);
      botTable.appendChild(botTableBody);
      botCell.appendChild(botTable);
      botRow.appendChild(botCell);
           
      body.appendChild(topRow);
      body.appendChild(topMidRow);
      body.appendChild(midRow);
      body.appendChild(botRow);

      if (parent) {
         parent.appendChild(body);
      }

      if (canMove) {
         shmStyleElement(topRow, {cursor: 'move'});
         shmStyleElement(topMidRow, {cursor: 'move'});
         topRow.onmousedown = Events.handleOnMouseDown;
         topRow.onmouseup = Events.handleOnMouseUp;
         topMidRow.onmousedown = Events.handleOnMouseDown;
         topMidRow.onmouseup = Events.handleOnMouseUp;
         lEdge.onmousedown = Events.handleOnMouseDown;
         lEdge.onmouseup = Events.handleOnMouseUp;
         rEdge.onmousedown = Events.handleOnMouseDown;
         rEdge.onmouseup = Events.handleOnMouseUp;
         botRow.onmousedown = Events.handleOnMouseDown;
         botRow.onmouseup = Events.handleOnMouseUp;
      }
    },
      
    genTransparentSpacer : function(width, height, style) {
      var spacer = shmCreateElement('img', {width: width, height: height, border: 0, src: transparentImg, alt: ''});
      if (style) {
        shmStyleElement(spacer, style);
      }
      spacer.width = width;
      spacer.height = height;
      return spacer;
    },


    genCorner : function(params) {
      if (lteIE6) {
        return shmCreateElement('td', {}, {width: '7px', height: '15px', backgroundImage: 'none', filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + params['image'] + '",sizingMethod="scale")'});
      } else {
        var background = 'url(' + params['image'] + ') no-repeat ';
        background += params['v'] == 'U' ? 'top ' : 'bottom ';
        background += params['h'] == 'L' ? 'left' : 'right';
        
        return shmCreateElement('td', {}, {width: '34px', height: '20px', background: background});
      }
    },

    genEdge : function(params) {
      var edge = params['edge'];
      var cell = shmCreateElement('td');

      if (lteIE6) {
          cell = shmCreateElement('td', {}, {height: '24px', backgroundImage: 'none', filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + params['image'] + '",sizingMethod="scale")'});
      } else {
        var background = 'url(' + params['image'] + ') ';
        background += ( edge == 'left' || edge == 'right') ? 'repeat-y ' : 'repeat-x ';
        background += edge;
        var styles = { background: background };
      }

      if (edge == 'top' && params['showHeader']) {
        var contentDiv = shmCreateElement('div');
         
        shmStyleElement(contentDiv, {display: 'block', position: 'relative',  height: '20px'});

        cell.appendChild(contentDiv);
      }
      
      return shmStyleElement(cell, styles);
    },

    genTopMidEdge : function(params) {
      var edge = params['edge'];
      var cell = shmCreateElement('td');

      if (edge == 'top' && params['showHeader']) {
        var contentDiv = shmCreateElement('div');

        shmStyleElement(contentDiv, {display: 'block', position: 'relative', width: (params['contentWidth'] - 1) + 'px', height: '43px',background: 'url(' + uwlTopLogoImg + ') no-repeat center top', backgroundColor: 'white' });

        var closeBoxImg = shmStyleElement(shmCreateElement('img', {border: '0', src: standardCloseBox, alt: shmEntityDecode(altClose)}, {padding: '2px 0'}));
        var closeBox = shmStyleElement(shmCreateElement('a', { href: '#', width: '17px', target: '_self' }), {position: 'absolute', right: params['closeRight'], top: params['closeTop'], marginRight: '7px'});
        Events.addHandler(closeBox, 'click', params['closeCode']);
        closeBox.appendChild(closeBoxImg);
        contentDiv.appendChild(closeBox);

        cell.appendChild(contentDiv);
      }

      return cell;
    }

  };
}();

  
    if ((typeof window.addEventListener != 'undefined' || typeof window.attachEvent != 'undefined') && typeof window.postMessage != 'undefined') {
      commsFrame = shmCreateElement('iframe', {horizontalscrolling: "no", allowtransparency: "true", frameBorder: "0", scrolling: "no", marginwidth: "0", marginheight: "0",
                                                     src: 'https://www.amazon.com/gp/wishlist/drop?ie=UTF8&name=commsFrame&position=0&skin=wishlist' + '&src=' + encodeURIComponent(window.location)},
                                                     {overflow: 'hidden', display: 'block', height: '50px', width: '300px', background: 'none repeat scroll 0% 0% transparent', position: 'absolute'}
                                          );
    } else {
      forceFallback = 1;
      var saveButton = shmCreateElement('span', {}, { cssFloat: 'left', styleFloat: 'left', padding: '0px', paddingLeft: '0px'});

      var addItemImg,dropDownImg, dropDownLink;
      var bgSprite = 'url(https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/AddtoWL_beacon-new2._V391079737_.png)';
      var styleMap = { height:splitButtonHeight,width:addItemImgWidth,background:bgSprite,backgroundPosition:'0 0', display:'inline'};

      addItemImg = shmCreateElement('img' ,{ id: 'auwlAddItemSplitBtn', src:transparentImg,alt:shmEntityDecode(altAddItem), height:'1px', width:'1px'},styleMap);
      Events.addHandler(addItemImg, 'click', function(e) { Popover.updateData(0) });
      var addItemLink = shmCreateElement('a', { href: '#', target: '_self'});
      addItemLink.appendChild(addItemImg);
      saveButton.appendChild(addItemLink);

      styleMap.backgroundPosition = '-' + addItemImgWidth + ' 0';
      styleMap.width = dropDownImgWidth;
      styleMap.filter = "alpha(opacity=40);";
      styleMap.opacity = "0.4";
      dropDownImg = shmCreateElement('img' ,{ id: 'auwlAddItemDropDownSplitBtn', src:transparentImg,alt:shmEntityDecode(altAddItem), height:'1px', width:'1px'},styleMap);
      saveButton.appendChild(dropDownImg);
      dropDownContainer = shmCreateElement('div', { id: 'auwlDropDownContainer'},{display:'block',position:'absolute',width:dropDownWidth + 'px',marginRight:'80px',cssFloat:'right', styleFloat: 'right',zIndex:'1',left:'0px'});

    commsFrame = saveButton;
    }
if (!Array.isArray) {
  Array.isArray = function (vArg) {
    return Object.prototype.toString.call(vArg) === "[object Array]";
  };
}

var Comm = (function(){
  var ok = false;

  var coder,decoder,encodeObject,encodeArray, decodeObject,decodeArray;

  coder = function(field,v) {
    var t='s=';
    if (typeof v == 'object') {
      if (Array.isArray(v)) {
        t = 'a=';
        v = encodeArray(v);
      } else {
        t = 'o=';
        v = encodeObject(v);
      }
    } else if (typeof v == 'boolean') {
      t = 'b=';
      v = v ? '1' : '0';
    }
    return t + encodeURIComponent(field) + '=' + encodeURIComponent(v);
  };
  encodeArray = function (d) {
    var m = [];
    for (var i=0; i<d.length; i++) {
      m.push(coder(i,d[i]));
    }
    return m.join('&');
  };
  encodeObject = function (d) {
    var m = [];
    for (var field in d) {
      if(d.hasOwnProperty(field)) {
        m.push(coder(field,d[field]));
      }
    }
    return m.join('&');
  };
  decoder = function (t,v) {
    if (t == 'o') {
      v = decodeObject(v);
    } else if (t == 'a') {
      v = decodeArray(v);
    } else if (t == 'b') {
      v = v == true;
    }
    return v;
  };
  decodeArray = function (m) {
    var d = [];
    var fields = m.split('&');
    for (var i=0;i<fields.length;i++) {
      var fd = fields[i].split('=');
      d[decodeURIComponent(fd[1])] = decoder(fd[0],decodeURIComponent(fd[2]));
    }
    return d;
  };
  decodeObject = function (m) {
    var d = {};
    var fields = m.split('&');
    for (var i=0;i<fields.length;i++) {
      var fd = fields[i].split('=');
      d[decodeURIComponent(fd[1])] = decoder(fd[0],decodeURIComponent(fd[2]));
    }
    return d;
  };
  var listeners;

  var onmessage = function(e) {
    if (e.origin && e.origin == 'https://www.amazon.com' && e.data) {
      var cmds = e.data.split(':');
      if (cmds[0] === 'AUWLBook') {
        if (listeners && listeners[cmds[1]]) {
          ok = 1;
          var m = cmds.slice(2).join(':');
          listeners[cmds[1]](decodeObject(m),e);
        }
      }
    }
  };
  return {
    name: "Comm",
    frame: "commsFrame",
    send: function(cmd, data, dest) {
      if (forceFallback) {
        return;
      }
      var msg = 'AUWLBook:' + cmd;
      if (data) {
        msg = msg + ':' + encodeObject(data);
      }
      (dest ? dest : commsFrame.contentWindow).postMessage(msg,'https://www.amazon.com');

    },
    listen: function(cmd, handler) {
      if (forceFallback) {
        return;
      }
      if (!listeners) {
        listeners = {};
        if (typeof window.addEventListener != 'undefined') {
          window.addEventListener('message', onmessage, false);
        } else if(typeof window.attachEvent != 'undefined') {
          window.attachEvent('onmessage', onmessage);
        }
      }
      listeners[cmd] = handler;
    },
    ok: function() {
      return ok && (typeof window.addEventListener != 'undefined' || typeof window.attachEvent != 'undefined') && commsFrame.contentWindow;
    }
  };
})();


  
    if ((typeof window.addEventListener != 'undefined' || typeof window.attachEvent != 'undefined') && typeof window.postMessage != 'undefined') {
      asinFrame = shmCreateElement('iframe', {horizontalscrolling: "no", allowtransparency: "true", frameBorder: "0", scrolling: "no", marginwidth: "0", marginheight: "0",
                                                     src: 'https://www.amazon.com/gp/wishlist/drop?ie=UTF8&name=asinFrame&position=1&skin=wishlist' + '&src=' + encodeURIComponent(window.location)},
                                                     {overflow: 'hidden', display: 'block', height: '50px', width: '300px', background: 'none repeat scroll 0% 0% transparent', position: 'absolute'}
                                          );
    } else {
      forceFallback = 1;
      var saveButton = shmCreateElement('span', {}, { cssFloat: 'left', styleFloat: 'left', padding: '0px', paddingLeft: '0px'});

      var addItemImg,dropDownImg, dropDownLink;
      var bgSprite = 'url(https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/AddtoWL_beacon-new2._V391079737_.png)';
      var styleMap = { height:splitButtonHeight,width:addItemImgWidth,background:bgSprite,backgroundPosition:'0 0', display:'inline'};

      addItemImg = shmCreateElement('img' ,{ id: 'auwlAddItemSplitBtn', src:transparentImg,alt:shmEntityDecode(altAddItem), height:'1px', width:'1px'},styleMap);
      Events.addHandler(addItemImg, 'click', function(e) { Popover.updateData(0) });
      var addItemLink = shmCreateElement('a', { href: '#', target: '_self'});
      addItemLink.appendChild(addItemImg);
      saveButton.appendChild(addItemLink);

      styleMap.backgroundPosition = '-' + addItemImgWidth + ' 0';
      styleMap.width = dropDownImgWidth;
      styleMap.filter = "alpha(opacity=40);";
      styleMap.opacity = "0.4";
      dropDownImg = shmCreateElement('img' ,{ id: 'auwlAddItemDropDownSplitBtn', src:transparentImg,alt:shmEntityDecode(altAddItem), height:'1px', width:'1px'},styleMap);
      saveButton.appendChild(dropDownImg);
      dropDownContainer = shmCreateElement('div', { id: 'auwlDropDownContainer'},{display:'block',position:'absolute',width:dropDownWidth + 'px',marginRight:'80px',cssFloat:'right', styleFloat: 'right',zIndex:'1',left:'0px'});

    asinFrame = saveButton;
    }
if (!Array.isArray) {
  Array.isArray = function (vArg) {
    return Object.prototype.toString.call(vArg) === "[object Array]";
  };
}

var asinComm = (function(){
  var ok = false;

  var coder,decoder,encodeObject,encodeArray, decodeObject,decodeArray;

  coder = function(field,v) {
    var t='s=';
    if (typeof v == 'object') {
      if (Array.isArray(v)) {
        t = 'a=';
        v = encodeArray(v);
      } else {
        t = 'o=';
        v = encodeObject(v);
      }
    } else if (typeof v == 'boolean') {
      t = 'b=';
      v = v ? '1' : '0';
    }
    return t + encodeURIComponent(field) + '=' + encodeURIComponent(v);
  };
  encodeArray = function (d) {
    var m = [];
    for (var i=0; i<d.length; i++) {
      m.push(coder(i,d[i]));
    }
    return m.join('&');
  };
  encodeObject = function (d) {
    var m = [];
    for (var field in d) {
      if(d.hasOwnProperty(field)) {
        m.push(coder(field,d[field]));
      }
    }
    return m.join('&');
  };
  decoder = function (t,v) {
    if (t == 'o') {
      v = decodeObject(v);
    } else if (t == 'a') {
      v = decodeArray(v);
    } else if (t == 'b') {
      v = v == true;
    }
    return v;
  };
  decodeArray = function (m) {
    var d = [];
    var fields = m.split('&');
    for (var i=0;i<fields.length;i++) {
      var fd = fields[i].split('=');
      d[decodeURIComponent(fd[1])] = decoder(fd[0],decodeURIComponent(fd[2]));
    }
    return d;
  };
  decodeObject = function (m) {
    var d = {};
    var fields = m.split('&');
    for (var i=0;i<fields.length;i++) {
      var fd = fields[i].split('=');
      d[decodeURIComponent(fd[1])] = decoder(fd[0],decodeURIComponent(fd[2]));
    }
    return d;
  };
  var listeners;

  var onmessage = function(e) {
    if (e.origin && e.origin == 'https://www.amazon.com' && e.data) {
      var cmds = e.data.split(':');
      if (cmds[0] === 'AUWLBook') {
        if (listeners && listeners[cmds[1]]) {
          ok = 1;
          var m = cmds.slice(2).join(':');
          listeners[cmds[1]](decodeObject(m),e);
        }
      }
    }
  };
  return {
    name: "asinComm",
    frame: "asinFrame",
    send: function(cmd, data, dest) {
      if (forceFallback) {
        return;
      }
      var msg = 'AUWLBook:' + cmd;
      if (data) {
        msg = msg + ':' + encodeObject(data);
      }
      (dest ? dest : asinFrame.contentWindow).postMessage(msg,'https://www.amazon.com');

    },
    listen: function(cmd, handler) {
      if (forceFallback) {
        return;
      }
      if (!listeners) {
        listeners = {};
        if (typeof window.addEventListener != 'undefined') {
          window.addEventListener('message', onmessage, false);
        } else if(typeof window.attachEvent != 'undefined') {
          window.attachEvent('onmessage', onmessage);
        }
      }
      listeners[cmd] = handler;
    },
    ok: function() {
      return ok && (typeof window.addEventListener != 'undefined' || typeof window.attachEvent != 'undefined') && asinFrame.contentWindow;
    }
  };
})();


  







var initSelect = function(){
  regselect.style.visibility = 'hidden';
  regselect.style.display = 'none';
  regselect.style.width = '0px';
  if (!regselect.selectedIndex) {
    regselect.selectedIndex = 2;
  }
};

var showDropDown = function(position){
  if (position != dropDown.position) {
    dropDown.setAtPosition(position);
    dropDown.show(0);
    return;
  }

  if (dropDown.style.display == 'none') {
     dropDown.setAtPosition(position);
     dropDown.show(0);
  } else {
     dropDown.hide();
  }
};


var regs;
var dropDownContainer;

var menuGen = (function() {
    var isMenuMade = 0;
    var newView;
    return function(position) {
        if(isMenuMade == 0) {
            isMenuMade = 1;

            var scrollbarWidth = function() {
                var elem = document.createElement('div');
                elem.innerHTML = "<div><br /><br /></div>";
                elem.style.width = '200px'
                elem.style.overflowY = 'scroll';
                document.body.appendChild(elem);

                var nsw = elem.clientWidth;

                var sw = elem.offsetWidth;
                elem.parentNode.removeChild(elem);
                delete elem;
                var sbw = sw - nsw;
                if(sbw == 0) {
                    sbw = 16;
                }
                return sbw;
            }();



            var shadowHH = '4px';
            var shadowFH = '8px';
            var shadowHW = '8px';

            var shadowBW = 5;
            var shadowFW = '8px';

            var shadowX1 = '0px';
            var shadowX2 = '-10px';
            var shadowY1 = '-10px';
            var shadowY2 = '-20px';
 
            var nVstyle = {display:'none',
                           position:'relative',
                           width:'auto',
                           top:'19px',
                           left:'0px',
                           zIndex:listDDzIndex,
                           background: 'transparent'
                          };
            var nVHstyle = {position:'relative',
                            width:'100%',  
                            height: shadowHH,
                            display:'block',
                            overflow:'hidden',
                            lineHeight:'0',
                            fontSize:'0'
                           };
           var nVHLstyle = {backgroundImage:'url(https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/poSprite._V158341484_.png)',
                             backgroundPosition:shadowX1 + ' ' + shadowY1,
                             backgroundAttachment:'scroll',
                             backgroundRepeat:'no-repeat',
                             position:'absolute',
                             width:shadowHW,
                             display:'block',
                             height:'100%',
                             left:'0',
                             top:'0',
                             fontSize:'0',
                             lineHeight:'0',
                             whiteSpace:'nowrap'
                            };
            var nVHMstyle = {backgroundImage:'url(https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/poSprite._V158341484_.png)',
                             backgroundAttachment:'scroll',
                             backgroundRepeat:'repeat-x',
                             marginLeft:shadowHW,
                             marginRight:shadowHW,
                             height:'100%',
                             display:'block',
                             backgroundPosition:'0px 0px' ,
                             fontSize:'0',
                             lineHeight:'0',
                             whiteSpace:'nowrap'
                            };
            var nVHRstyle = {backgroundImage:'url(https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/poSprite._V158341484_.png)',
                             backgroundPosition:shadowX2 + ' ' + shadowY1,
                             backgroundAttachment:'scroll',
                             backgroundRepeat:'no-repeat',
                             position:'absolute',
                             width:shadowHW,
                             display:'block',
                             height:'100%',
                             top:'0',
                             right:'0',
                             fontSize:'0',
                             lineHeight:'0',
                             whiteSpace:'nowrap'
                            };

            var listWidth = dropDownWidth - 2*shadowBW;
            var maxListSize = 6;
            var listBtnHeight = 23;
            var nVBstyle = {height:'100%',
                            position:'relative',
                            textAlign:'left',
                            display:'block',
                            whiteSpace:'nowrap'
                           };
            var nVBMstyle = {left:shadowBW + 'px',
                             overflowX:'hidden',
                             overflowY:'auto',
                             position:'relative',
                             width:listWidth + 'px' ,
                             display:'block',
                             backgroundColor:'white',
                             height:'auto'
                            };

            var listBtnStyle = {borderColor:dropDownBrdrClr,
                                borderStyle:'solid',
                                borderWidth:'0 0 1px',
                                display:'block',
                                height:listBtnHeight + 'px',
                                lineHeight:listBtnHeight + 'px',
                                overflow:'hidden',
                                width:listWidth + 'px',
                                cursor:'pointer',
                                background:'#FFFFFF',
                                paddingLeft:'3px'
                               };
            var nVBLstyle = {backgroundImage:'url(https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/poSides._V158341487_.png)',
                             backgroundPosition:'0px top',
                             backgroundAttachment:'scroll',
                             backgroundRepeat:'repeat-y',
                             display:'block',
                             height:'0px',
                             left:'0',
                             position: 'absolute',
                             top:'0',
                             width:shadowBW + 'px'
                            };
            var nVBRstyle = {backgroundImage:'url(https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/poSides._V158341487_.png)',
                             backgroundAttachment:'scroll',
                             backgroundRepeat:'repeat-y',
                             height:'0px',
                             position:'absolute',
                             display:'block',
                             top:'0',
                             right:'0',
                             width:shadowBW + 'px',
                             backgroundPosition:'-5px top'
                            };
            var nVFstyle = {fontSize:'0',
                            lineHeight:'0',
                            overflow:'hidden',
                            position:'relative',
                            display:'block',
                            width:'100%',
                            height:shadowFH,
                            whiteSpace:'nowrap'
                           };
            var nVFLstyle = {backgroundImage:'url(https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/poSprite._V158341484_.png)',
                             backgroundPosition:shadowX1 + ' ' + shadowY2,
                             backgroundAttachment:'scroll',
                             display:'block',
                             backgroundRepeat:'no-repeat',
                             left:'0',
                             position:'absolute',
                             top:'0',
                             width:shadowFW,
                             height:'100%'
                            };
            var nVFMstyle = {backgroundImage:'url(https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/poSprite._V158341484_.png)',
                             backgroundAttachment:'scroll',
                             backgroundRepeat:'repeat-x',
                             marginLeft:shadowFW,
                             display:'block',
                             marginRight:shadowFW,
                             height:'100%',
                             backgroundPosition:'0px -30px',
                             fontSize:'0',
                             lineHeight:'0',
                             whiteSpace:'nowrap'
                            };
            var nVFRstyle = {backgroundImage:'url(https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/poSprite._V158341484_.png)',
                             backgroundPosition:shadowX2 + ' ' + shadowY2,
                             backgroundAttachment:'scroll',
                             backgroundRepeat:'no-repeat',
                             position:'absolute',
                             display:'block',
                             width:shadowFW,
                             height:'100%',
                             top:'0',
                             right:'0',
                             fontSize:'0',
                             lineHeight:'0',
                             whiteSpace:'nowrap'
                            };



            newView = shmCreateElement('div',{},nVstyle);

            var newViewHdr = shmCreateElement('div',{},nVHstyle);

            var newViewHdrL = shmCreateElement('div',{},nVHLstyle);

            var newViewHdrM = shmCreateElement('div',{},nVHMstyle);

            var newViewHdrR = shmCreateElement('div',{},nVHRstyle);


            var newViewBodyM = shmCreateElement('div',{},nVBMstyle);
            var listLength = 0;
            var lastListItem;

            var stringForDefault = ' (Default)';
            var sizeOfDefault = textSize('10px arial',stringForDefault);
            var privateStr = 'Private';
            var publicStr = 'Public';
            var sharedStr = 'Shared';
            var scrollOverflow = 0;

            newView.clickTargets = [];


            if(regs.length > maxListSize + 3) {
                listWidth -= scrollbarWidth;
            }

            var innerDivs = [];

            for(var i = 0;i < regs.length;i++) {
                 var regName = shmEntityDecode(regs[i].getName());
                 var regID = regs[i].getId();
                 var regIsPrivate = regs[i].isPrivate();
                 var regIsSearchable = regs[i].isSearchable();
                 if(regID == '') {
                     continue;
                 }
                 var innerDiv = shmCreateElement('div', {}, listBtnStyle);
                 innerDiv.style.width = listWidth + 'px';
                 innerDiv.clickID = i;

                 innerDivs.push(innerDiv);

                 newView.clickTargets.push(innerDiv);

                 var privacyStatus = '';

                 if(regIsPrivate == 1) {
                     privacyStatus = privateStr;
                 }
                 if(regIsPrivate == 0) {
                     if (regIsSearchable == 0) {
                        privacyStatus = sharedStr;
                     }
                     if (regIsSearchable == 1) {
                        privacyStatus = publicStr;
                     }
                 }

                 var regNameSize = textSize( '10px arial',regName);
                 var privacyStatusSize = textSize( '9px arial',privacyStatus);
                 var totalSize = regNameSize + privacyStatusSize;
                 if(regs[i].isDefault()) {
                     totalSize += sizeOfDefault;
                 }

                 totalSize += 7;

                 if(totalSize >= listWidth) {
                     var rightSize = totalSize;
                     var highestIndex = regName.length - 1;
                     while(rightSize >= listWidth) {
                         highestIndex--;
                         rightSize -= textSize('10px arial',regName);
                         regName = regName.substring(0,highestIndex);
                         rightSize += textSize('10px arial',regName);
                     }
                     highestIndex -= 3;
                     regName = regName.substring(0,highestIndex);
                     regName += "...";
                 }

                 if(regs[i].isDefault()) {
                     regName += stringForDefault;
                 }
                 var regNameDiv = shmCreateElement('div',{},{font:'10px arial',textAlign:'left',color:amznLinkClr,cssFloat:'left',styleFloat:'left',padding:'5px 0px 0px'});
                 if(regNameDiv.innerText !== undefined) {
                     regNameDiv.innerText = regName;
                 } else {
                     regNameDiv.textContent = regName;
                 }
                 innerDiv.appendChild(regNameDiv);

                 if(privacyStatus) {
                     var privacyStatusDiv = shmCreateElement('div',{},{font:'9px arial',textAlign:'right',color:'#666666',cssFloat:'right',styleFloat:'right',padding:'6px 4px 0px 0px'});
                     privacyStatusDiv.innerHTML = privacyStatus;
                     innerDiv.appendChild(privacyStatusDiv);
                 }
                 innerDiv.onclick = function(e) { regselect.options[this.clickID].selected = 'true';newView.hide();Popover.updateData(newView.position == 1);};
                 innerDiv.onmouseout = function(e){ this.style.background = '#FFFFFF';};
                 innerDiv.onmouseover = function(e){ this.style.background = '#F6F5E7';};
                 newViewBodyM.appendChild(innerDiv);
                 lastListItem = innerDiv;
                 listLength++;
            }

            lastListItem.style.borderWidth = '0 0 0';

            if(listLength > maxListSize) {
                listLength = maxListSize;
                scrollOverflow = 4;
            }

            newViewBodyM.style.height = (((listBtnHeight + borderBoxOffset) * listLength) - scrollOverflow) + 'px';
            nVBstyle.height = (((listBtnHeight + borderBoxOffset) * listLength) - scrollOverflow) + 'px';
            nVBLstyle.height = (((listBtnHeight + borderBoxOffset) * listLength) - scrollOverflow) + 'px';
            nVBRstyle.height = (((listBtnHeight + borderBoxOffset) * listLength) - scrollOverflow) + 'px';

            var newViewBody = shmCreateElement('div',{},nVBstyle);

            var newViewBodyL = shmCreateElement('div',{},nVBLstyle);

            var newViewBodyR = shmCreateElement('div',{},nVBRstyle);


            var newViewFtr = shmCreateElement('div',{},nVFstyle);
            var newViewFtrL = shmCreateElement('div',{},nVFLstyle);
            var newViewFtrM = shmCreateElement('div',{},nVFMstyle);
            var newViewFtrR = shmCreateElement('div',{},nVFRstyle);


            newViewHdr.appendChild(newViewHdrL);
            newViewHdr.appendChild(newViewHdrM);
            newViewHdr.appendChild(newViewHdrR);
            newView.appendChild(newViewHdr);
            newViewBody.appendChild(newViewBodyL);
            newViewBody.appendChild(newViewBodyM);
            newViewBody.appendChild(newViewBodyR);
            newView.appendChild(newViewBody);
            newViewFtr.appendChild(newViewFtrL);
            newViewFtr.appendChild(newViewFtrM);
            newViewFtr.appendChild(newViewFtrR);
            newView.appendChild(newViewFtr);

            var checkForScrollbar = 1;

            newView.hide = (function() {
                               newView.style.display = 'none';
                               var opacity = 0;
                               newView.style.filter = 'alpha(opacity=' + (opacity * 10) + ')';
                               newView.style.opacity = '' + (opacity / 10);
                           });
            newView.show = (function(opacity) {
                                if (opacity == 0) {

                                        if(newView.currentStyle !== undefined) {
                                            newView.style.display = 'inline';
                                        } else {
                                            newView.style.display = 'block';
                                        }
                                            
                                        opacity = 1;
                                }
                                newView.style.filter = 'alpha(opacity=' + (opacity * 10) + ')';
                                newView.style.opacity = '' + (opacity / 10);
                                if(opacity == 10) {
                                        if(checkForScrollbar) {
                                            checkForScrollbar = 0;
                                            for(var i = 0; i < innerDivs.length; i++) {
                                                innerDivs[i].style.width = newViewBodyM.clientWidth + 'px';
                                                innerDivs[i].style.display = 'block';
                                            }
                                        }
                                        return;
                                } else {
                                        setTimeout(function(){newView.show(opacity + 1);},30);
                                }
                           });

            newView.position = position;

            newView.positions = [{left: function() { return (saveButton.offsetLeft - 3) + 'px';} , top: '29px' , parent: dropDownContainer},
                                 {left: '-3px' , top: '-9px' , parent: function() { if(matchView) { return matchView.ddc;} else { return 0;} } }];

            newView.setAtPosition = (function(position) {
                                        newView.position = position;
                                        if (newView.parentNode) {
                                          newView.parentNode.removeChild(newView);
                                        }

                                        var left = newView.positions[position].left;
                                        var top = newView.positions[position].top;
                                        var parent = newView.positions[position].parent;

                                        if(typeof left === 'function') {
                                            left = left();
                                        }
                                        if(typeof top === 'function') {
                                            top = top();
                                        }
                                        if(typeof parent === 'function') {                                        
                                            parent = parent();
                                        }
                                        parent.appendChild(newView);
                                        newView.style.left = left;
                                        newView.style.top = top;
                                    });
            newView.setAtPosition(position);

            function mimicBlur(e) {
                if(!e) {
                  e = window.event;
                }

                var clickedOn;

                if(e.srcElement) {
                  clickedOn = e.srcElement;
                } else {
                  clickedOn = e.target;
                }

                for(var element in newView.clickTargets) {

                    element = newView.clickTargets[element];

                    if(clickedOn == element) {
                        return;
                    }
                }

                newView.hide();
            }

            if (document.body.addEventListener) {
              document.body.addEventListener('click' , (function(e) { mimicBlur(e); }) , false);
            } else {
              document.body.attachEvent('onclick' , (function(e) { mimicBlur(e); }));
            }
        }
        return newView;
    }
})();

  
   var results = function(status, message, link) {
      var args = {};
      var longMessage;
      if (typeof status.status != "undefined") {
         args = status;
         status = args.status;
         message = args.message;
         link = args.link;
         longMessage = args.longMessage;
      }
      var succRe = /SUCC/g;

      var div, span, msg;
      var suffix;
      var success;
      var amznLogoSuccessBlock = document.getElementById('auwlAmznLogoSuccess');
      if (amznLogoSuccessBlock && (isBKMSourceDomain() && !isVendor())) {
           amznLogoSuccessBlock.style.display = 'block';
      } else if(!contentForm.elements['asin.0']) {
        var siteNameDiv = document.getElementById('auwlAsinMatchDomain');
        if(!siteNameDiv) {
          siteNameDiv = displaySiteNameBlock();
        } else {
          siteNameDiv.parentNode.removeChild(siteNameDiv);
        }
        siteNameDiv.style.fontSize = '13px';
        siteNameDiv.style.width = '105px';
        siteNameDiv.style.paddingLeft = '12px';
        siteNameDiv.style.overflow = 'hidden';
        amznLogoSuccessBlock.parentNode.appendChild(siteNameDiv);
        siteNameDiv.style.display = 'block';
      }
      if(status.match(succRe)) {
        msg = shmEntityDecode(message);
        success = 1;
        div = successDiv;
        span = successSpan;
        suffix = 'success';
        if(contentForm.elements['asin.0']) {
            var root = div;
            var arrayList = [root];
            while((root = arrayList.shift()) && root.id != "__uwl_img_copy__") {
                if(root.hasChildNodes()) {
                    for(var i = 0; i < root.childNodes.length; i++) {
                        arrayList.push(root.childNodes[i]);
                    }
                }
            }
            root.src = matchView.image.src;
            root.width = matchView.image.width;
            root.height = matchView.image.height;
            if (amznLogoSuccessBlock) {
                amznLogoSuccessBlock.style.display = 'block';
            }
        }

      } else {
        var dupeRE = /Item not unique/g;
        div = failDiv;
        span = failSpan;
        suffix = 'fail';

        if (longMessage) {
          msg = '';
          span.innerHTML = longMessage;
        } else {
          if (message.match(dupeRE)) {
            msg = alertDuplicateItem;
          } else {
            msg = alertCantAddItem;
          }
        }
      }

      if (link) {
        var altAction = (isBKMSourceDomain()  && !isVendor()) ? 0 : 1;
        link = link + '&altAction=' + altAction;

        var btn = document.getElementById('goToList' + suffix);
        if(btn) {
            btn.href = link;
        }
      }

      contentForm.style.display = 'none';
      if (saveButton) {
        saveButton.style.display = 'none';
      }
      if (dropDown){
        dropDown.hide();
      }
      while (span.hasChildNodes()){
       span.removeChild(span.firstChild);
      }
      if (div.getElementsByTagName('div').length > 4){
        if ((div.childNodes) && (div.childNodes.length > 1)){
          div.removeChild(div.lastChild);
        }
      }

      if(msg && link && success) {
        var msgLink = shmCreateElement('a', {href : link, target: '_blank'}, wishlistLink);
        msgLink.id = 'goToList' + suffix;
        msgLink.onclick = function() {
           Popover.hidePopover(); return true;
        };
        msgLink.appendChild(stn(msg));
        span.appendChild(msgLink);
      } else {
        span.appendChild(stn(msg));
      }

      shmSetStartPos();
      div.style.display = 'block';
      adjustFeedbackLink();
      clipDivText(siteNameDiv);
      inSubmit = 0;
  };




  var signature = function() {
      return '8AC19E4A021307884EE659308CC54A9BD873C8BC';
  };
  if (!forceFallback) {
  Comm.listen('alive', function (d,e) {
    if (d.name == 'commsFrame') {
      Comm.send('alive', {}, e.source);
    }
  });
  Comm.listen('results', function (d,e) {
    results(d);
  });
  Comm.listen('redirect', function (d,e) {
    if (d.url) {
      window.location = d.url;
    }
  });
  Comm.listen('setcsscommsFrame', function (d,e) {
    shmStyleElement(commsFrame, d);
  });
  Comm.listen('setcssasinFrame', function (d,e) {
    shmStyleElement(asinFrame, d);
  });
  asinComm.listen('alive', function (d,e) {
    if (d.name == 'asinFrame') {
      asinComm.send('alive', {}, e.source);
    }
  });
  Comm.listen('updatedata', function (d,e) {
    Popover.updateData(d.position);
  });
  var mimicBlur = function(e) {
    if (Comm.ok()) {
      Comm.send('hide', {});
    }
    if (asinComm.ok()) {
      asinComm.send('hide',{});
    }
  };
  if (document.body.addEventListener) {
    document.body.addEventListener('click' , (function(e) { mimicBlur(e); }) , false);
  } else {
    document.body.attachEvent('onclick' , (function(e) { mimicBlur(e); }));
  }

  }

  var dropDownIniter;


  var matchView;

  var matchViewDiv;

  function findDimensions(obj) {
      if (!obj.innerHTML.length) {

          try {
              obj.innerHTML = " ";
              obj.style.fontSize = "0%";
          }
          catch(err) {
          }
      }

      var elem = obj.cloneNode(true);
      elem.style.visibility = 'hidden';
      elem.style.position = 'fixed';
      elem.style.display = 'inline';
      elem.style.zIndex = -1;

      document.body.appendChild(elem);

      var ret = {'width':elem.offsetWidth,'height':elem.offsetHeight};
      elem.parentNode.removeChild(elem);
      delete elem;
      return ret;
  }


  function findRightLength(startIndex,endWidth,font,string) {
        var endIndex = startIndex;
        do {
            endIndex += 1;
            var width = textSize(font,string.substring(0,endIndex) + '...');
        }while(width < endWidth);

        return endIndex - 2;
  }

  function animate(elem,start,end,afterAnimate) {
      if(start >= end) {
          elem.style.height = '';
          afterAnimate();
          return;
      }
      elem.style.height = start + 'px';
      setTimeout((function(){
                animate(elem,start + 15,end,afterAnimate);
              }),20);
  }

  function findElement(root,className) {
      var arrayList = [root];
      while((root = arrayList.shift()) && root.className != className) {
          if(root.hasChildNodes()) {   
              for(var i = 0;i < root.childNodes.length;i++) {
                arrayList.push(root.childNodes[i]);
              }
          }
      }
      if(root) {
          root.className = '';
      }

      return root;
  }

  function fixContentForm() {
      for(var i = 0;i < contentForm.elements.length;i++) {
          if(!contentForm.elements[contentForm.elements[i].name]) {
              contentForm.elements[contentForm.elements[i].name] = contentForm.elements[i];
          }
      }
  }

  function waitForLoad(callNext,param1,param2) {
    if(!matchViewDiv.childNodes) {
      setTimeout(function(){waitForLoad(callNext,param1,param2)},20);
      return;
    }
    callNext(param1,param2);
  }

  function adjustMatchView(asin,asinSource) {
      matchView = matchViewDiv.childNodes[0];
      matchView.asin = asin;
      matchView.asinSource = asinSource;

      var link = findElement(matchView,'link');
      matchView.link = link;

      var price = findElement(matchView,'price');
      var priceArray = price.childNodes;
      matchView.price = priceArray[priceArray.length - 1].innerHTML;
      matchView.price.replace(/&nbsp;/ , "");

      var image = findElement(matchView,'image');
      matchView.image = image;

      image.onload = (function(e) {

                          var dims;
                          if (image) {
                            dims = findDimensions(image);
                            var imageSize = dims.height;
                          } else {
                            var imageSize = 0;
                          }

                          function adjustText(element) {

                            var maxelementSize = parseInt(popWidth) - 172;
                            dims = findDimensions(element);

                            if(typeof window.attachEvent === 'undefined') {
                                element.style.overflow = 'hidden';
                                element.style.textOverflow = 'ellipsis';
                                element.style.whiteSpace = 'nowrap';
                                element.style.maxWidth = maxelementSize + 'px';
                                return;
                            }

                            var textProperty = (element.textContent) ? 'textContent' : 'innerText';

                            if (dims.width + imageSize > maxelementSize ) {
                              var length = findRightLength(Math.floor((maxelementSize - imageSize) / 8),maxelementSize - imageSize,element.style.fontSize,element[textProperty]);
                              element[textProperty] = element[textProperty].substring(0,length);
                              element[textProperty] += '...';
                            }
                          }

                          var title = findElement(matchView,'title');
                          if (title) {
                            matchView.title = title.innerHTML;
                            adjustText(title);
                          }

                          var byline = findElement(matchView,'byline');
                          if (byline) {
                            adjustText(byline);
                          }
                          var dropDownContainer = findElement(matchView, 'dd').parentNode;
                          dropDownContainer.style.height = '40px';
                          dropDownContainer.innerHTML = '';
                          if (asinFrame.parentNode) {
                            asinFrame.parentNode.removeChild(asinFrame);
                          }
                          dropDownContainer.appendChild(asinFrame);
                          var mvdropDownContainer = findElement(matchView,'ddc');
                          matchView.ddc = mvdropDownContainer;

                          matchViewDiv.style.display = 'block';
			  var prodMatchDomain = document.getElementById('auwlAsinMatchDomain');
			  if (prodMatchDomain) {
                            prodMatchDomain.style.display = 'block';
			  }

                          matchView.style.height = '0px';
                          matchView.style.visibility = 'hidden';
                          matchView.style.display = 'block';
                          matchView.style.visibility = 'visible';

                          function afterAnimate() {
                              // do nothing
			     // This is the callback for post animate. Can be used in future.
                          }


                          animate(matchView,0,imageSize + 41 + 4*borderBoxOffset,afterAnimate);
                      });
  }

  var amazonLookup = (function() {
                          var once = 0;
                          return function() {

                                if(once == 0 && !isBKMSourceDomain()) {

                                    once = 1;

                                    fixContentForm();
                                    var productUrl = contentForm.elements['productUrl.0'].value;
                                    var price = contentForm.elements['priceInput'].value;
                                    var title = contentForm.elements['name.0'].value;
                                    var image = '';
                                    if (contentForm.elements['imageUrl.0']) {
                                        image = contentForm.elements['imageUrl.0'].value;
                                    }

                                    var amznlu_u;
                                    amznlu_u = 'https://www.amazon.com/gp/wishlist/bookmarklet/get-sku.html';
                                    amznlu_u += '?&title=' + encodeURIComponent(title) +
                                                '&price=' + encodeURIComponent(price) +
                                                '&imageUrl=' + encodeURIComponent(image) +
                                                '&productUrl=' + encodeURIComponent(productUrl) +
                                                '&object=' + encodeURIComponent('AUWLBook');

                                    var amznlu_s = document.createElement('script');
                                    amznlu_s.setAttribute('charset', 'UTF-8');
                                    amznlu_s.setAttribute('src', amznlu_u);
                                    document.getElementsByTagName('head')[0].appendChild(amznlu_s);
                                    setTimeout((function(){Popover.extendFloater({'status' : 'failure'});}), lookupTimeout);
                                }
                          }
                    })();


  var fixAfterCSS = (function() {
                        var once = 0;
                        return function() {
                        
                            if(once == 0) {

                                once = 1;

                                if(document.createStyleSheet) {
                                    document.createStyleSheet().addRule('#' + floater.id + ' td:after','content:".";display:none;');
                                } else {
                                    var style = document.createElement('style');
                                    style.setAttribute('type','text/css');
                                    style.innerHTML = '#' + floater.id + ' td:after {content: ".";display: none;}';
                                    document.body.appendChild(style);
                                }
                            }
                        };
                    })();


  function displayFooter() {

    var endCell = shmCreateElement('td', {valign: 'middle', align: 'left', colSpan: 5}, {});

    var containerDiv = shmCreateElement('div', {}, {display: 'block', backgroundColor: '#FFFFFF', height: '40px', marginBottom: '15px', marginTop: '3px', position: 'relative', zIndex: listDDzIndex + 1});


    var miscDiv = shmCreateElement('div', {}, {});
    PageParser.registerMisc(miscDiv);
    containerDiv.appendChild(miscDiv);
    if (commsFrame) {
      containerDiv.appendChild(commsFrame);
    }
    endCell.appendChild(containerDiv);

    return endCell;
  };

  function displayProductMatchBlock() {

    var endProductCell = shmCreateElement('td', {valign: 'middle', align: 'left', colSpan: 5}, {});
    if( !isBKMSourceDomain() ) {
        matchViewDiv = shmCreateElement('div', {id: 'auwlAsinMatchContainer'},{margin:'0px 0px 5px',width:'auto',position:'static', display:'none', padding:'9px 10px 12px 4px', border:'1px solid #DDDDDD', background: 'url(https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/UWL_border-new._V149468553_.png) repeat-x left top', backgroundColor:'#FBFBFB'});
        matchViewDiv.open = 1;

        var lookingUpStr = shmCreateElement('span',{id: 'auwlAsinMatchLookupStr'},{fontSize : '11px' , display : 'inline-block' , paddingLeft : '5px'});
        lookingUpStr.innerHTML = lookingUpAmazonStr;

        var spinner = shmCreateElement('img',{id: 'auwlAsinMatchSpinner', src : 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/spinner._V157256755_.gif' } , { display : 'inline' , paddingLeft : '5px'});

        matchViewDiv.lookingUpStr = lookingUpStr;
        matchViewDiv.spinner = spinner;

        endProductCell.appendChild(matchViewDiv);
    }
    return endProductCell;
  };
 
  function displayTitle() {
    var titleCell = shmCreateElement('td', {colSpan: 2}, {paddingBottom: '0px'});
    var titleDiv = shmCreateElement('div', {}, styleFormValue);
    PageParser.registerTitle(titleDiv);
    titleCell.appendChild(titleDiv);
    return titleCell;
  };

  function displayPrice() {
    var priceCell = shmCreateElement('td', {}, {padding: '7px 20px 0 0', width: '100px'});
    var priceDiv = shmCreateElement('div', {}, styleFormValue);
    PageParser.registerPrice(priceDiv);
    PageParser.registerHide('Price', priceCell);
    priceCell.appendChild(priceDiv);
    return priceCell;
  };

  function displayDesired() {
    var qtyCell = shmCreateElement('td', {}, {paddingTop: '7px', paddingBottom: '0px', width: '200px'});
    PageParser.registerHide('Desired', qtyCell);
    var qtyDiv = shmCreateElement('div', {}, styleFormValue);
    var inlineQtyLabel = shmCreateElement('span',{}, {display:'inline-block', marginTop: '5px', marginRight: '5px', verticalAlign: 'middle', textAlign: 'center'});
    inlineQtyLabel.innerHTML = qtyLabelNewDes;
    var inputWrapper = shmCreateElement('span',{}, formInputWrapper);
    inputWrapper.appendChild(shmCreateElement('input', {id: 'auwlBookMarkDesiredInput', name: 'requestedQty.0', type: 'text', value: '1', size: '3'}, styleFormField));
    qtyDiv.appendChild(inlineQtyLabel);
    qtyDiv.appendChild(inputWrapper);
    qtyCell.appendChild(qtyDiv);
    return qtyCell;
  };

  function displayNotes() {
    var notesCell = shmCreateElement('td', {colSpan: 3}, {paddingTop: '7px', paddingBottom: '0px'});
    var notesDiv = shmCreateElement('div', {}, {display: 'block'});
    var notesInput = shmCreateElement('textarea', { id: 'auwlBookMarkItemComment', name: 'itemComment.0', rows: '2', cols: '44', value: shmEntityDecode(commentsLabelNewDes),
                                       onKeyPress: 'if ( window.event ? window.event.keyCode : event.which >= 32) { if (this.value.length >= ' + maxNotesLength + ') { this.value = this.value.substring(0, ' + maxNotesLength + ');return false;}} return true;'
                                        },
                                      styleNotesField);
    if(!notesInput.attachEvent) {
        notesInput.style.border = '';
        notesInput.style.background = '';
    }
    Events.addHandler(notesInput, 'focus', function(e) {if (this.value === shmEntityDecode(commentsLabelNewDes)){this.value = ""; shmStyleElement(notesInput,{color:'#333333',fontStyle:'normal'});}});
    notesDiv.appendChild(notesInput);
    notesCell.appendChild(notesDiv);
    return notesCell;
  };

  function displaySiteNameBlock() {
     var siteNameDiv = shmCreateElement('div', {id: 'auwlAsinMatchDomain'}, {paddingBottom: '3px', display: 'none', font: '13px', textAlign: 'center'});
     siteNameDiv.innerHTML = document.domain;
     return siteNameDiv;     
  };

  function displayAmznLogoBlock() {
     return shmCreateElement('div', {id: 'auwlAmznLogoSuccess'}, {paddingBottom: '3px', display: 'none', height:'14px',  font: '13px', textAlign: 'center', background: 'url(' + amznLogoSuccessImg + ') no-repeat center top'});
  };

  var InlineMessaging = function(){
    var ilmCell;
    return {
        register : function(_ilmCell) {
          ilmCell = _ilmCell;
        },
        message : function(header, text) {
          InlineMessaging.clear();

          shmStyleElement(ilmCell, {border: '1px solid #dddac0', background: '#ffffcc'});
          ilmCell.appendChild(shmCreateElement('div', {}, {cssFloat: 'left', styleFloat: 'left', padding: '10px', width: '17px'}, Boxer.genTransparentSpacer(17, 17, {background: 'transparent url(' + alertImg + ') 0 -51px no-repeat'})));
          ilmCell.appendChild(shmCreateElement('div', {}, styleILMHeader, stn(header)));
          ilmCell.appendChild(shmCreateElement('div', {}, styleILMText, stn(text)));
        },
        clear : function() {
          while (ilmCell.hasChildNodes()){
               ilmCell.removeChild(ilmCell.firstChild);
          }
          shmStyleElement(ilmCell, {border: '0px solid #ffffff'});
        }
    }
  }();

  function adjustFeedbackLink() {
        var wishListLink = document.getElementById('goToListsuccess');
        if(wishListLink == null) {
            return;
        }
        var margin = 95 - wishListLink.offsetTop;
        var fblink = document.getElementById('auwlfeedbackLink');
        if(fblink == null) {
            return;
        }
        var div = fblink.parentNode;
        div.style.marginTop = margin + 'px';
    };

  function clipDivText(div) {
    if(!div) {
        return;
    }
    var text = div.innerHTML;
    text = text.replace(/^www./g,'');
    if(text.length > 13) {
        var newText = text.substring(0,12);
            newText += '...';
        text = newText;
    }
    div.innerHTML = text;
  };


  Popover = {

  showDropDown: showDropDown,
  

  
  extendFloater : function(response) {

      if (!response) {
        return;
      }

      var elem = matchViewDiv;
      if (elem.open) {
        elem.open = 0;
      } else {
        return;
      }


      var spinnerElem = document.getElementById('auwlAsinMatchSpinner1');
      if (spinnerElem) {
        spinnerElem.parentNode.removeChild(spinnerElem);
      }
	

      if (response.status == 'success') {
        var asin = response.asin;
        var asinSource = response.asinSource;
        var html = response.html;            
        while ( elem.hasChildNodes() ) {
          elem.removeChild( elem.firstChild );       
        }
        elem.innerHTML += html;
        waitForLoad(adjustMatchView,asin,asinSource);
      } else {
        elem.lookingUpStr.innerHTML = noMatchesFoundStr;
      }

  },


    submit : function() {
      contentForm.submit();
    },

    hidePopover : function(){

      if (dropDown){
        dropDown.hide();
      }
      floater.style.display = 'none';
      if (contentForm){
        DropDowns.show();
        contentForm.style.display = 'block';
        if (saveButton) {
          saveButton.style.display = 'inline';
        }
        sDiv = successDiv;
        fDiv = failDiv;
        sDiv.style.display = 'none';
        fDiv.style.display = 'none';
        /* clear the price cell, url, title and notes */
        Popover.clearFields();
      }
    },

    clearFields : function() {
      var nameCell = document.getElementById('auwlBookMarkName');
      nameCell.value = '';
      var commentCell = document.getElementById('auwlBookMarkItemComment');
      commentCell.value = '';
      var priceCell = document.getElementById('auwlBookMarkPriceInput');
      priceCell.value = '';
      Title.set('');
    },
    canDisplayPopover : function() {
        if (document.getElementsByTagName('body').length == 0 &&
            document.getElementsByTagName('frameset').length > 0) {
            return false;
        }

        return true;
    },
    showPopover : function(args){
      if (!document.domain) {
         return;
      }

      if (!this.canDisplayPopover()) {
        window.location.href = 'https://www.amazon.com/wishlist/add' + '?u=' + encodeURIComponent(window.location) + '&t=' + encodeURIComponent(document.title);
        return;
      }

      if (!floater) {
        var rightOffset = shmGetRightOffset();

        floater = shmCreateElement('table', { width: bookmarkletWidth, border: '0', id: 'auwlPopover' },
                                   {position: 'absolute', zIndex: '999999999', width: bookmarkletWidth, tableLayout: 'auto', lineHeight: '100%', borderCollapse: 'collapse'});      

        shmNullPad(floater);
        shmSetStartPos();

        var hidePopFlag = true;
        Events.addHandler(floater, 'click', function(e) {
          hidePopFlag = false;
        });

        Events.addHandler(document, 'click', function(e) {
          if (!e) var e = window.event;
          if (hidePopFlag && (e.button == 0 || e.which == 1)) {
            Popover.hidePopover();
          }
          hidePopFlag = true;
        });

        content = shmCreateElement('td', {}, {backgroundColor: 'white', display: 'inline'});
        if (isBKMSourceDomain()
            && ( window.location.pathname.match(/\/wishlist\/get-button/)
                 || window.location.pathname.match(/\/wishlist\/bkm/)
                 || window.location.pathname.match(/\/registry\/get-button/)
                 || window.location.pathname.match(/\/wishlist\/ipad-install-[1-4]/)
                 || window.location.pathname.match(/\/wishlist\/iphone-install-[1-4]/)
                 || window.location.pathname.match(/\/wishlist\/ext-landing/)
                 || window.location.pathname.match(/\/wishlist\/create-landing/) || (document.getElementById('uwl-upsell')))
            ) {
          Popover.firstInstall();
        } else {
          Popover.writeContent();
        }

        var tbody = shmCreateElement('tbody');
        Boxer.mkBox(null, tbody, content, popWidth, true, true, function() { Popover.hidePopover(); return false; }, '5px', '2px');

        floater.appendChild(tbody);
        amazonLookup();
        document.body.appendChild(floater);
        var origMove = document.onmousemove;
        document.onmousemove = function(evt){
          Events.handleOnMouseMove(evt);
          if (origMove) {
            origMove(evt);
          }
        };
      } else {
        shmSetStartPos();
        floater.style.display = 'block';
        PageParser.update();
        InlineMessaging.clear();
      }
      DropDowns.hide();
      fixAfterCSS();
    },

    writeContent : function(){
      contentForm = shmCreateElement('form', { method: 'post', name: 'add', target: '_self' });
      Events.addHandler(contentForm, 'submit', function(e) { return Popover.updateData(0);});
      shmStyleElement(contentForm, {padding: '0 10px 5px', backgroundColor: primaryBgClr, display: 'block'});
      var contentTable = shmCreateElement('table', { border: '0px'}, { backgroundColor: primaryBgClr} );
      shmNullPad(contentTable);
      var tbody = shmCreateElement('tbody');


      var topRow = shmCreateElement('tr');

      var imageCell = shmCreateElement('td', { align: 'center', rowSpan: '7'}, {verticalAlign: 'top', backgroundColor: primaryBgClr, textAlign: 'center'});
      var imageDiv = shmCreateElement('div', {}, {padding: '0 0 5px 5px', display: 'block'});
      PageParser.registerImage(imageDiv);

      imageCell.appendChild(imageDiv);

      var amznLogo = shmCreateElement('img', { src: amznTinyLogo }, {margin: '10px 41px 0 20px'});
      amznLogo.id = 'uwl_logo';
      topRow.appendChild(imageCell);

      topRow.appendChild(displayTitle());

      tbody.appendChild(topRow);

      var priceRow = shmCreateElement('tr');

      priceRow.appendChild(displayPrice());
      priceRow.appendChild(displayDesired());
      tbody.appendChild(priceRow);


      var notesRow = shmCreateElement('tr');
      notesRow.appendChild(displayNotes());

      tbody.appendChild(notesRow);
      tbody.appendChild(shmCreateElement('tr', {height: '1px'}));

      var ilmRow = shmCreateElement('tr', {}, {padding: '1px'});
      var ilmCell = shmCreateElement('td', {colSpan: '5'}, {});
      InlineMessaging.register(ilmCell);
      ilmRow.appendChild(ilmCell);
      tbody.appendChild(ilmRow);

      tbody.appendChild(shmCreateElement('tr', {height: '1px'}));

      var endRow = shmCreateElement('tr', {height: '36px'});

      endRow.appendChild(displayFooter());


      tbody.appendChild(endRow);

      var productMatchRow = shmCreateElement('tr');
      productMatchRow.appendChild(displayProductMatchBlock());
      tbody.insertBefore(productMatchRow,topRow);
      var siteNameRow = shmCreateElement('tr');
      var siteNameCell = shmCreateElement('td', { align: 'center'}, {verticalAlign: 'top', textAlign: 'center'});
      siteNameCell.appendChild(displaySiteNameBlock());
      siteNameRow.appendChild(siteNameCell);
      tbody.insertBefore(siteNameRow,topRow);

      var bannerRow = shmCreateElement('tr', {}, {});
      var bannerCell = shmCreateElement('td', {colSpan: '5'}, {'paddingTop': '2px', 'display': 'none' });
      bannerRow.appendChild(bannerCell);
 
      PageParser.registerBannerImage(bannerCell);
    
      tbody.appendChild(bannerRow);

      contentTable.appendChild(tbody);
      contentForm.appendChild(contentTable);

      content.appendChild(contentForm);      
      if(recognized) {
        submitForm = shmCreateElement('form', { method: 'post', name: 'submit', target: '_self' });
      } else {
        submitForm = shmCreateElement('form', { method: 'post', name: 'submit', target: '_blank'});
      }

      shmStyleElement(submitForm, {display: 'inline'});
      content.appendChild(submitForm);

      content.appendChild(Popover.genFailContent());
      content.appendChild(Popover.genSuccessContent());
      PageParser.update();
    },

    genInstallContent : function() {
      installDiv = shmCreateElement('div', {}, {display: 'none', cssFloat: 'none'});

      var contentTable = shmCreateElement('table', { width: '100%' }, { backgroundColor: primaryBgClr });
      var tbody =  shmCreateElement('tbody');
      var trow = shmCreateElement('tr');
      var tcell = shmCreateElement('td', {}, {padding: '10px 0 0 10px'});
      var thistitle = shmCreateElement('span', {}, {fontFamily: 'tahoma, sans-serif', fontWeight: 'bold', fontSize: '12px', color: '#c60'});
      thistitle.appendChild(stn(successLabelStr));
      thistitle.appendChild(shmCreateElement('br'));
      thistitle.appendChild(shmCreateElement('br'));
      tcell.appendChild(thistitle);
      tcell.appendChild(stn(successDescStr));
      tcell.appendChild(shmCreateElement('br'));
      tcell.appendChild(shmCreateElement('br'));
      trow.appendChild(tcell);
      tbody.appendChild(trow);

      trow = shmCreateElement('tr');
      tcell = shmCreateElement('td', {align: 'right', valign: 'bottom'}, {padding: '0 0 5px 10px'});
      var button = shmCreateElement('img', {src: closeBtnImg, alt: shmEntityDecode(altClose)}, {border: '0'} );
      
      var close = shmCreateElement('a', {value: button, target: '_self'} );
      Events.addHandler(close, 'click', function(e) { Popover.hidePopover(); return false;});
      close.appendChild(button);

      var closeButton = shmCreateElement('div', {}, {display: 'inline', cssFloat: 'none'});
      closeButton.style.cursor = 'pointer';
      
      closeButton.appendChild(close);
      tcell.appendChild(closeButton);
      trow.appendChild(tcell);

      tbody.appendChild(trow);
      contentTable.appendChild(tbody);
      installDiv.appendChild(contentTable);
      return installDiv;
    },


    genFailContent : function() {
      failDiv = shmCreateElement('div');
      failDiv.style.display = 'none';
      failDiv.style.cssFloat = 'none';

      var contentTable = shmCreateElement('table', {}, {backgroundColor: primaryBgClr, width: '100%'});
      var tbody =  shmCreateElement('tbody');
      var trow = shmCreateElement('tr');
      var tcell = shmCreateElement('td', {colSpan: '3', width: '500px'}, {textAlign: 'center', margin: '20px', padding: '20px'});
      var thistitle = shmCreateElement('span', {}, styleMessage);
      failSpan = thistitle;

      tcell.appendChild(thistitle);
      trow.appendChild(tcell);
      tbody.appendChild(trow);

      trow = shmCreateElement('tr');
      tcell = shmCreateElement('td');
      shmStyleElement(tcell, { textAlign: 'right', verticalAlign: 'top', paddingTop: '5px' });
      tcell.appendChild(ButtonMkr.goToList('fail'));
      trow.appendChild(tcell);

      tcell = shmCreateElement('td');
      shmStyleElement(tcell, { textAlign: 'center', verticalAlign: 'top', paddingTop: '8px', paddingRight: '1px', fontSize: '12px' });
      tcell.appendChild( stn(viewOr) );
      trow.appendChild(tcell);

      tcell = shmCreateElement('td');
      shmStyleElement(tcell, { textAlign: 'left', verticalAlign: 'top', paddingTop: '5px', paddingRight: '30px' });
      tcell.appendChild(ButtonMkr.cancelFailed());

      trow.appendChild(tcell);
      tbody.appendChild(trow);
      contentTable.appendChild(tbody);
      failDiv.appendChild(contentTable);
      return failDiv;
    },


    genSuccessContent : function() {
      successDiv = shmCreateElement('div');
      successDiv.style.display = 'none';
      successDiv.style.cssFloat = 'none';
      successDiv.style.lineHeight = '50%';
      var contentDiv = shmCreateElement('div', {}, {padding: '0px 10px 5px', backgroundColor: primaryBgClr, display: 'block'});
      var contentTable = shmCreateElement('table');
      shmNullPad(contentTable);
      var tbody =  shmCreateElement('tbody');

      var amznLogoSuccessRow = shmCreateElement('tr');
      var  amznLogoSuccessCell = shmCreateElement('td', {align: 'center'}, {verticalAlign: 'bottom', textAlign: 'center', padding: '0 20px 0px 5px', width: '33%'});
      amznLogoSuccessCell.appendChild(displayAmznLogoBlock());
      amznLogoSuccessRow.appendChild(amznLogoSuccessCell);
      tbody.appendChild(amznLogoSuccessRow);

      var trow = shmCreateElement('tr');
      var tcell = shmCreateElement('td', {align: 'center'}, {verticalAlign: 'bottom', textAlign: 'center', padding: '0 20px 15px 5px'});

      ImgSelection.setListener(tcell);
      trow.appendChild(tcell);

      tcell = shmCreateElement('td', {}, {textAlign: 'left', verticalAlign: 'top', paddingRight: '10px', width: '66%'});
      var itemAdded = shmStyleElement(shmCreateElement('span', {}, styleMessage), { fontWeight: 'bold' });
      Title.setListener(itemAdded);
      tcell.appendChild(itemAdded);

      var hasBeenAdded = shmCreateElement('nobr', {}, styleMessage);
      hasBeenAdded.appendChild( stn('&#160;') );
      hasBeenAdded.appendChild( stn(addedTo) );
      hasBeenAdded.appendChild( stn('&#160;') );
      tcell.appendChild(hasBeenAdded);

      var addedToList = shmCreateElement('span', {}, styleMessage);
      successSpan = addedToList;
      tcell.appendChild(addedToList);


          var buttonDiv = shmCreateElement('div', {}, {height: '13px', textAlign: 'left', marginTop: '75px', display: 'block'});


      trow.appendChild(tcell);
      tbody.appendChild(trow);
      contentTable.appendChild(tbody);
      contentDiv.appendChild(contentTable);
      successDiv.appendChild(contentDiv);

      return successDiv;
    },

    genVendorUpsell : function(wrapperCell) { 
        var upsellWrapperDiv = shmCreateElement('div', {id: "vendorUpsellDiv"}, {borderColor: '#DDDDDD', borderStyle: 'solid', borderWidth: '1px 0px', margin: '10px 0', display: 'block'});
        var upsellTable = shmCreateElement('table', {}, {backgroundColor: primaryBgClr, width: '100%'});
        var tbody =  shmCreateElement('tbody');
        var trow = shmCreateElement('tr');

        var logoCell = shmCreateElement('td');
        var logoImg = shmCreateElement('img', {src: "https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/Amazon_Wish_List_Smile_Small._V136270251_.png", alt: shmEntityDecode("Amazon Wish List")}, {margin: '10px 10px 4px 0', display: 'inline'} );
        logoCell.appendChild(logoImg); 
        trow.appendChild(logoCell); 

        var contentCell = shmCreateElement('td');
        contentCell.appendChild( shmCreateElement('span', {id: "vendorUpsellHeader"}, {display: 'block', marginTop: '10px', color: '#E47911', fontWeight: 'bold', fontSize: '13px'}, stn("Wish List Extension for Chrome")) );
        contentCell.appendChild( shmCreateElement('div', {id: "vendorUpsellDescription"}, {fontSize: '12px', marginTop: '5px', color: '#333333'}, stn("You can add anything from any Website.")) );

        var buttonDiv = shmCreateElement('div', {id: "vendorUpsellButtonDiv"}, {height: '31px', margin: '5px 0 10px', display: 'block'});
        
        var learnMoreImg = shmCreateElement('img', {src: learnMoreImgSrc, alt: shmEntityDecode("Learn More")}, {marginTop: '4px', display: 'inline'} );
        var learnMoreBtn = shmCreateElement('a', {href: "http://www.amazon.com/wishlist/universal/ref=cm_wl_pop_ven_lm_chr", target: '_blank'}, {cursor: 'pointer'});
        learnMoreBtn.value = learnMoreImg;
        learnMoreBtn.appendChild(learnMoreImg);
        Events.addHandler(learnMoreBtn, 'click', function(e) { Popover.hidePopover(); return true;});
        buttonDiv.appendChild(learnMoreBtn);
   
        var installImg = shmCreateElement('img', {src: "https://images-na.ssl-images-amazon.com/images/G/01/x-locale/communities/gifting/universal/bkm/InstallChrSmall._V134386655_.png", alt: shmEntityDecode("Install in Chrome")}, {margin: '4px 0 0 8px', display: 'inline'} );
        var installBtn = shmCreateElement('a', {href: "http://www.amazon.com/gp/redirect.html/ref=cm_wl_pop_ven_get_chr?location=http://clients2.google.com/service/update2/crx%3Fx%3Did%253Dciagpekplgpbepdgggflgmahnjgiaced%2526uc%2526lang%253Den-US%26response%3Dredirect&token=0CC86B6E2AF5A5E13978C79B192767D8DEB79933", target: '_self'}, {cursor: 'pointer'});
        installBtn.value = installImg;
        installBtn.appendChild(installImg);
        Events.addHandler(installBtn, 'click', function(e) { Popover.hidePopover(); return true;});
        buttonDiv.appendChild(installBtn);
  
        contentCell.appendChild(buttonDiv);
        trow.appendChild(contentCell);
        tbody.appendChild(trow);
        upsellTable.appendChild(tbody);
        upsellWrapperDiv.appendChild(upsellTable);
        wrapperCell.appendChild(upsellWrapperDiv);
    }, 
 
    updateData : function(isAsinMatch) {
      isAsinMatch = isAsinMatch == 1;
      var fallbackCaller = "Bookmarklet";

      if ( inSubmit ) {
        return;
      }
      if ( regselect && !regselect.value ) {
        InlineMessaging.message(alertHeaderItemNotAdded, alertChooseLisMessageStr);
        return false;
      }


      function swap(a , propA , b , propB) {
        var swapHolder = a[propA];
        a[propA] = b[propB];
        b[propB] = swapHolder;
      }

      if (matchViewDiv) {
        matchViewDiv.open = 0;
      }

      if (isAsinMatch) {
        if (!contentForm.elements['asin.0']) {
          var asinInput  = contentForm.elements['productUrl.0'].cloneNode(true);
          asinInput.name = 'asin.0';
          asinInput.value = matchView.asin;
          contentForm.appendChild(asinInput);
        }

        if (!contentForm.elements['asinSource.0']) {
          var asinSourceInput  = contentForm.elements['productUrl.0'].cloneNode(true);
          asinSourceInput.name = 'asinSource.0';
          asinSourceInput.value = matchView.asinSource;
          contentForm.appendChild(asinSourceInput);
        }

        if (pipelineReq || Registries && !Registries.hasRegistries()) {
          swap(contentForm.elements['productUrl.0'] , 'value' , matchView , 'link');
          swap(contentForm.elements['priceInput'] , 'value' , matchView , 'price');
          swap(contentForm.elements['name.0'] , 'value' , matchView , 'title');
        }
        fixContentForm();
      } else {
        var asinInput = contentForm.elements['asin.0'];
        if (asinInput) {
          asinInput.parentNode.removeChild(asinInput);
        }
      }
      var msg = {};
      var commObject = isAsinMatch ? asinComm : Comm;
      commObject.send('clear',{});

      inSubmit = 1;

      if (isAsinMatch) {
        var myurl = 'https://www.amazon.com/wishlist/add/ref=wl_bm-add-asin';
      } else {
        var myurl = 'https://www.amazon.com/wishlist/add/ref=wl_bm-add';
          if (matchView && !contentForm.elements['asin.0'] && !contentForm.elements['matchedAsin.0']) {
            var asinInput = contentForm.elements['productUrl.0'].cloneNode(true);  
            asinInput.name = 'matchedAsin.0';
            asinInput.value = matchView.asin;
            contentForm.appendChild(asinInput);
          }
      }
      msg['isAsinMatch'] = isAsinMatch;
      myurl += '?ie=UTF8&submit=1&operation=add&o=AUWLBook';

      var caller = "";
      if ('') {
        caller = "";
      } else if(fallbackCaller) {
        caller = fallbackCaller;
      }

      if (caller) {
        myurl += '&caller=' + caller;
        msg['caller'] = caller;
      }
      var isSourceDomain = isBKMSourceDomain();
      var formparams = contentForm.elements;
      var paramstring = '';
      var pipelineReq = 0;
      var itemComment = '';
      var isProductImageSet = 0;
      for (i=0;i<formparams.length;i++) {
        var paramname = formparams[i].name;
        if (paramname) {
          var re = /asin|asinSource|matchedAsin|id|name|comment|url|price|currency|requestedQty/gi;
          var result = paramname.match(re);
          if (result) {
            if (!(isSourceDomain &&
                  asin &&
                  paramname == 'name.0' &&
                  formparams[i].value == window.document.title)) {
              if ((formparams[i].type == 'radio' && formparams[i].checked) ||
                  (formparams[i].type == 'checkbox' && formparams[i].checked) ||
                  (formparams[i].type != 'radio' && formparams[i].type != 'checkbox')){
                if (formparams[i].name == 'name.0') {
                  if (formparams[i].value.replace(/^\s*/, "").replace(/\s*$/, "") == '') {
                    InlineMessaging.message(alertHeaderItemNotAdded, alertSpecifyTitle);
                    inSubmit = 0;
                    return false;
                  }
                  if (isAsinMatch) {
                    Title.set(AUWLBook['asinMatchTitle']);
                  } else {
                    Title.set(formparams[i].value);
                  }
                  msg[formparams[i].name] = Title.get();
                  paramstring = paramstring + formparams[i].name + '=' + encodeURIComponent(Title.get()) + '&';

                } else if (formparams[i].name == 'imageUrl.0') {
                  ImgSelection.setImage(formparams[i].value);
                  isProductImageSet = 1;
                  msg[formparams[i].name] = formparams[i].value.replace("%26", "%2526");
                  paramstring = paramstring + formparams[i].name + '=' + encodeURIComponent(formparams[i].value.replace("%26", "%2526")) + '&';

                } else {
                  if (paramname == 'id' && formparams[i].value.match(/^noreg-/)){
                    pipelineReq = 1;
                  }

                  if (formparams[i].name == 'requestedQty.0' && (formparams[i].value >= 100000 || formparams[i].value < 1)) {
                  InlineMessaging.message(alertHeaderItemNotAdded, alertQuantityError);
                    inSubmit = 0;
                    return false;
                  }

                  if (paramname == 'itemComment.0') {
                    if (formparams[i].value === commentsLabelNewDes) {
                      formparams[i].value = '';
                    }
                    msg[formparams[i].name] = formparams[i].value.replace("%26", "%2526");
                    itemComment = formparams[i].name + '=' + encodeURIComponent(formparams[i].value.replace("%26", "%2526"));
                  } else {
                    msg[formparams[i].name] = formparams[i].value.replace("%26", "%2526");
                    paramstring = paramstring + formparams[i].name + '=' + encodeURIComponent(formparams[i].value.replace("%26", "%2526")) + '&';
                  }
                }
              }
            }
          }
        }
      }
      if (!isProductImageSet) {
        ImgSelection.setImage(noImageImg);
      }
        myurl += '&signature=' + signature();  
      myurl += '&' + paramstring;

      commObject.send('set', msg);

      if (pipelineReq || forceFallback || Registries && !Registries.hasRegistries() || !recognized) {
        myurl += '&' + itemComment;
        myurl += '&mode=form';
        Popover.hidePopover();
        if (dropDown && dropDown.position) { 
          swap(contentForm.elements['productUrl.0'] , 'value' , matchView , 'link');
          swap(contentForm.elements['priceInput'] , 'value' , matchView , 'price');
          swap(contentForm.elements['name.0'] , 'value' , matchView , 'title');
        }
        window.location = myurl;
      } else {
        myurl += '&' + itemComment;
        if (commObject.ok()) {
          commObject.send('post',{});
        } else {
          myurl += '&mode=form';
          window.location = myurl;
        }
      }
      if (!recognized) {
        inSubmit = 0;
        Popover.hidePopover();
      }
    },

    results: results,
    firstInstall : function () {
      content.appendChild(Popover.genInstallContent());
      div = installDiv;
      shmSetStartPos();
      div.style.display = 'inline';
    }
  };
  return Popover;
}();