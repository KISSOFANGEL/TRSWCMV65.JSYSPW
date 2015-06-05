var TRSTAB_IMAGE_FIRST_NORM		= "../images/tab-left.gif";
var TRSTAB_IMAGE_FIRST_CHECK		= "../images/tab-left-hot.gif";

var TRSTAB_IMAGE_MIDDLE_NORM		= "../images/tab-center.gif";
var TRSTAB_IMAGE_MIDDLE_CHECK_L	= "../images/tab-left-hot-.gif";
var TRSTAB_IMAGE_MIDDLE_CHECK_R	= "../images/tab-right-hot.gif";


var TRSTAB_IMAGE_ITEM_NORM			= "../images/tab.gif";
var TRSTAB_IMAGE_ITEM_CHECK		= "../images/tab-bg-hot.gif";

var TRSTAB_IMAGE_END_NORM			= "../images/tab-right.gif";
var TRSTAB_IMAGE_END_CHECK			= "../images/tab-right-hot-.gif";

var TRSTAB_PARENT_ELEMENT			= "TD";

var TRSTAB_LINK_TARGET				= "mainWindow";

function getParentElement(_el, _sTagName){
	var elTemp = _el;	
	if(elTemp == null)return null;	

	for(var i=0; i<15; i++){	
		elTemp = elTemp.parentElement;

		if(elTemp == null)return null;
		if(elTemp.tagName == _sTagName)return elTemp;		
	}
}

function CTRSTab_getTabLink(_nIndex){
	if(this.arTabItems.length <= this._nIndex){
		CTRSAction_alert("Index["+_nIndex+"] Invalid!");
	}

	return document.all(this.arTabItems[_nIndex].getLinkId()).href;	
}

function CTRSTab_openItem(_nIndex, _elItemA){
	if(this.arTabItems.length <= this._nIndex){
		CTRSAction_alert("Index["+_nIndex+"] Invalid!");
	}

	var elItemA = _elItemA;
	if(_elItemA == null){
		elItemA	= document.all(this.arTabItems[_nIndex].getLinkId());
	}

	this.nCurrIndex = _nIndex;
	var elTabParent = getParentElement(elItemA, TRSTAB_PARENT_ELEMENT);
	if(TRSTAB_PARENT_ELEMENT == "TD" 
		|| TRSTAB_PARENT_ELEMENT == "TR" 
		|| TRSTAB_PARENT_ELEMENT == "TABLE")
	{//必须再获取一次
		elTabParent = getParentElement(elTabParent, TRSTAB_PARENT_ELEMENT);
	}
	elTabParent.innerHTML = this.toHTML();

	return true;
}

function CTRSTab_size(){
	return this.arTabItems.length;
}

function CTRSTab_addItem(_sTitle, _sHref){
	var nIndex = this.size();
	this.arTabItems[nIndex] = new CTRSItem(_sTitle, _sHref, this, nIndex);
}

function CTRSTab_draw(){
	document.write(this.toHTML());	
}

function CTRSTab_toHTML(){
	var sHTML = ""
			+"<TABLE border=\"0\" cellpadding=\"0\" cellspacing=\"0\">" 
			+"	<TR>";

	var nCount = this.size();
	for(var i=0; i<nCount; i++){
		sHTML += this.arTabItems[i].toHTML();
	}

	sHTML += "</TR></TABLE>";

	return sHTML;
}

function CTRSItem_isFirst(){
	return (this.nIndex == 0);
}

function CTRSItem_isLast(){
	return (this.nIndex == (this.oTRSTab.size()-1));
}

function CTRSItem_getLinkId(){
	return "id_tab"+this.nIndex+"_a";
}

function CTRSItem_toHTML() {
	var bCurrIndex			= (this.oTRSTab.nCurrIndex == this.nIndex);
	var bPreIsCurrIndex	= (this.oTRSTab.nCurrIndex == (this.nIndex-1));

	var sHTML = "";
	if(this.isFirst()){
		sHTML += ""
			+"<TD width=\"9\"><IMG src=\""
			+(bCurrIndex? TRSTAB_IMAGE_FIRST_CHECK : TRSTAB_IMAGE_FIRST_NORM)+"\" "
			+"width=\"9\" height=\"31\"></TD>";		
	}else{
		sHTML += ""
			+"<TD class=\"td29\"><IMG src=\""
			+(bCurrIndex?TRSTAB_IMAGE_MIDDLE_CHECK_L:
				(bPreIsCurrIndex? TRSTAB_IMAGE_MIDDLE_CHECK_R:TRSTAB_IMAGE_MIDDLE_NORM))+"\" "
			+"width=\"29\" height=\"31\"></TD>";
	}

	sHTML += ""
			+"<TD width=\"60\" background=\""
			+(bCurrIndex? TRSTAB_IMAGE_ITEM_CHECK : TRSTAB_IMAGE_ITEM_NORM)+"\" "
			+" class=\"tab_td\">" 
			+"			<A id=\""+this.getLinkId()+"\" href=\""+this.sHref+"\" onclick=\"return TRSTab.openItem("+this.nIndex+", this);\""
			+" target=\""+TRSTAB_LINK_TARGET+"\" "
			+" class=\"tab_link\">"+this.sTitle+"</A>" 
			+"</TD>";	

	
	if(this.isLast()){
		sHTML += ""
			+"<TD width=\"35\"><IMG src=\""
			+(bCurrIndex? TRSTAB_IMAGE_END_CHECK : TRSTAB_IMAGE_END_NORM)+"\" "
			+" width=\"35\" height=\"31\"></TD>";
	}

	return sHTML;
}

function CTRSItem_draw(){
	document.write(this.toHTML());
}

function CTRSItem(_sTitle, _sHref, _oTRSTab, _nIndex){
//Define Properties
	this.sTitle			= _sTitle;
	this.sHref			= _sHref;
	this.oTRSTab		= _oTRSTab;
	this.nIndex			= _nIndex;

//Define Methods
	this.isFirst		= CTRSItem_isFirst;
	this.isLast			= CTRSItem_isLast;
	this.draw			= CTRSItem_draw;
	this.toHTML			= CTRSItem_toHTML;
	this.getLinkId		= CTRSItem_getLinkId;
	
}

function CTRSTab(){
//Define Properties
	this.arTabItems	= new Array();	
	this.nCurrIndex	= -1;

//Define Methods
	this.size			= CTRSTab_size;
	this.addItem		= CTRSTab_addItem;
	this.draw			= CTRSTab_draw;
	this.toHTML			= CTRSTab_toHTML;
	this.openItem		= CTRSTab_openItem;
	this.getTabLink		= CTRSTab_getTabLink;
}

var TRSTab = new CTRSTab();