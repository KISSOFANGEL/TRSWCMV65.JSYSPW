var CONST_SITE	   = 0;
var CONST_CHANNEL  = 1;
var CONST_DOCUMENT = 2;

// site & channel tree view in the navigator-left context menu
try{renderAdden(MENU_ITEM_SITE, 1, CONST_SITE);} catch(e){}
try{renderAdden(MENU_ITEM_CHANNEL_NORMAL, 13, CONST_CHANNEL);} catch(e){}
try{renderAdden(MENU_ITEM_CHANNEL_TOPIC, 13, CONST_CHANNEL);} catch(e){}
try{renderAdden(MENU_ITEM_CHANNEL_LINK, 13, CONST_CHANNEL);} catch(e){}

// document management context menu
try{renderAdden(MENU_ITEM_DOCUMENT, 32, CONST_DOCUMENT);} catch(e){}
try{renderAdden(MENU_ITEM_DOCUMENT_TOPPIC, 32, CONST_DOCUMENT);} catch(e){}

// core adding option
function renderAdden(_arrItems, _modifyRight, _nFlag){
	//1. parameters check
	if (_arrItems == null){
		return;
	}
	//2. add a menu item sperator
	_arrItems.push({"ItemText" : "", "ItemId" : "SPComment", "ItemAction" : null});

	//3. compose [ids] for commenting action 
	var sSiteId, sChnlId, sDocId;
	switch (_nFlag){
		case CONST_SITE:
			sSiteId = "m_objSrcEl.ObjId";
			sChnlId = "null";
			sDocId  = "null";
			break;			
		case CONST_CHANNEL:
			sSiteId = "getSiteId(m_objSrcEl.ObjId)";
			sChnlId = "m_objSrcEl.ObjId";
			sDocId  = "null";
			break;		
		case CONST_DOCUMENT:			
			sSiteId = "m_objSrcEl.SiteId";
			sChnlId = "m_objSrcEl.ChannelId";
			sDocId  = "m_objSrcEl.NewsId";
			break;
		default:
			return;
	}//prompt("debug", "manageCommment(" + sSiteId + "," + sChnlId + "," + sDocId + ")");
	//4. add the menu item and attach the action for commenting
	try{_arrItems.push(
		{
		"ItemText" : "管理评论", 
		"ItemId" : "commentMgr",  
		"ItemAction" : "manageCommment(" + sSiteId + "," + sChnlId + "," + sDocId + ")", 
		"ItemParent" : null, 
		"RightIndex" : _modifyRight
		}
	);}catch(e){prompt(1, e);}
}

// go to the commenting manage
function manageCommment(_nSiteId, _nChannelId, _nDocumentId){
	//1. render the url value
	var sURL = "../comment/comment_mgr.jsp?SiteId=" + _nSiteId;
	if(_nChannelId)
		sURL += "&ChannelId=" + _nChannelId;
	if(_nDocumentId)
		sURL += "&DocumentId=" + _nDocumentId;

	//2. open the commenting management console in a new win
	openCentralPos(sURL, "_blank");
}
function openCentralPos(_sUrl, _sOpenStyle){
	var nWidth = 1024;
	var nHeight = 768;
	try{
		nWidth = window.screen.availWidth;
		nHeight = window.screen.availHeight;		 			
	}catch(e){
	
	}
	
	sFeatures = "left=" + 0 + ",top=" + 0
		+ ",width=" + nWidth + ",height=" + nHeight 
		//+ ",menubar=no,location=no,toolbar=no;resizable=yes";

	//alert(sFeatures);
	window.open(_sUrl);//, _sOpenStyle, sFeatures);
}
