/** Title:			CWCMDocument.js
 *  Description:
 *		Define WCMDocument Object
 *  Copyright: 		www.trs.com.cn
 *  Company: 		TRS Info. Ltd.
 *  Author:			WSW
 *  Created:		2004-11-25 15:38
 *  Vesion:			1.0
 *  Last EditTime:	2004-11-25
 *	Update Logs:
 *		2006.04.30	caohui
 *			全部移动文档性能的提升
 *		wenyh@20060323,修正了CWCMDocument_share的返回值
 *		wenyh@20060726,回到list_of_site.jsp
 *		wenyh@20060817 添加恢复前的校验
 *	Note:
 *		
 *	Depends:
 *		CTRSAction.js
 *		CWCMObj.js
 *		CWCMObjHelper.js
 *	Examples:
 *			
 */

function CWCMDocument_publishChnlDocs(_sChnlDocIds){
	var sChnlDocIds    = _sChnlDocIds || "";
	if(sChnlDocIds.length <= 0){
		CTRSAction_alert("请选择需要发布的文档!");
		return;
	}

	sChnlDocIds = this.validate(sChnlDocIds,"39",2);
	if(sChnlDocIds.length <= 0)  return;
	var oTRSAction = new CTRSAction("../document/chnldoc_publish.jsp");
	oTRSAction.setParameter("ChnlDocIds", sChnlDocIds);
	oTRSAction.setParameter("PubType",   3);
	var bResult = oTRSAction.doDialogAction(500, 500);

	if(bResult) {
		CTRSAction_alert("您的发布操作已经提交到后台执行，请查看发布管理中的 [发布监控] 跟踪此发布操作！", true);
		CTRSAction_refreshMe();
	}
}

function CWCMDocument_publish(_sDocIds, _nFromChannelId){
	var sDocIds    = _sDocIds || "";
	if(sDocIds.length <= 0){
		CTRSAction_alert("请选择需要发布的文档!");
		return;
	}
	var nFromChannelId	= _nFromChannelId || 0;

	sDocIds = this.validate(sDocIds,"39");
	if(sDocIds.length <= 0)  return;

	var oTRSAction = new CTRSAction("../document/document_publish.jsp");
	oTRSAction.setParameter("DocumentIds", sDocIds);
	oTRSAction.setParameter("ChannelId",   nFromChannelId);
	oTRSAction.setParameter("PubType",   3);
	var bResult = oTRSAction.doDialogAction(500, 500);

	if(bResult) {
		CTRSAction_alert("您的发布操作已经提交到后台执行，请查看发布管理中的 [发布监控] 跟踪此发布操作！", true);
		CTRSAction_refreshMe();
	}
}

function CWCMDocument_deleteDoc(_docIds, _channelId, _bDrop, _nSiteId){
	//参数校验
	var sDocIds    = _docIds || "";	
	if(sDocIds.length <= 0){
		CTRSAction_alert("请选择需要删除的文档!");
		return;
	}

	var bDrop = _bDrop || 0;
	/*
	if(!CTRSAction_confirm((bDrop?"您确定需要彻底删除文档吗?":"您确定需要将文档放入回收站吗?"))){
		return;
	}
	*/

	var nFromChannelId	= _channelId || 0;
	var nFromSiteId = _nSiteId || 0;

	var sRightIndex = _bDrop?"18":"33";

	sDocIds = this.validate(sDocIds,sRightIndex);
	if(sDocIds.length <= 0)  return;
	
	var oTRSAction = new CTRSAction("../document/document_delete_info_main.jsp");
	oTRSAction.setParameter("DocumentIds", sDocIds);
	oTRSAction.setParameter("ChannelId",   nFromChannelId);
	oTRSAction.setParameter("SiteId",   nFromSiteId);
	oTRSAction.setParameter("Drop",		   bDrop);
	var bResult = oTRSAction.doDialogAction(800, 500);

	if(bResult)CTRSAction_refreshMe();
	return;
}

function CWCMDocument_operation_validate(_docIds,_rightIndexes,_docType,_width,_height){
	var sDocIds    = _docIds || "";
	var sRightIndexes    = _rightIndexes || "";
	var nDocType = _docType || 1;
	var nWidth = _width || 500;
	var nHeight = _height || 500;

	if ((sDocIds == "")||(sRightIndexes == "")) return sDocIds;

	var oTRSAction = new CTRSAction("../include/validate_operator.jsp");
	oTRSAction.setParameter("Ids", sDocIds);
	oTRSAction.setParameter("RightIndexes",   sRightIndexes);
	oTRSAction.setParameter("Type", nDocType);
	return oTRSAction.doDialogAction(nWidth, nHeight) || "";
}


function CWCMDocument_restore(_docIds, _chnlId){
	//参数校验
	var nChannelId	= _chnlId || 0;
	var sDocIds    = _docIds || "";	
	if(sDocIds.length <= 0){
		CTRSAction_alert("请选择需要恢复的文档!");
		return;
	}
	
	//验证权限
	sDocIds = this.validate(sDocIds,"18");
	if(sDocIds.length <= 0)  return;
	
	var canRestore = this.validateRestoreChnlDoc(sDocIds,nChannelId);
	if(canRestore.length < sDocIds.length){
		CTRSAction_alert("恢复的文档中包含实体已删除的文档,系统将忽略这些文档的恢复!\r\n需要先恢复文档实体,才能恢复这些文档");
	}

	if(canRestore.length <= 0) return;

	sDocIds = canRestore;

	//提交请求
	var oTRSAction = new CTRSAction("../document/document_restore_info_main.jsp");
	oTRSAction.setParameter("DocumentIds", sDocIds);
	oTRSAction.setParameter("ChannelId", nChannelId);
	var bResult = oTRSAction.doDialogAction(800, 500);

	if(bResult)//CTRSAction_refreshMe();
		window.location = "../document/document_list_of_channel.jsp?ChannelId="+nChannelId;
	return;
}

function CWCMDocument_restoreSiteDoc(_docIds, _siteId){
	//参数校验
	var nSite	= _siteId || 0;
	var sDocIds    = _docIds || "";	
	if(sDocIds.length <= 0){
		CTRSAction_alert("请选择需要恢复的文档!");
		return;
	}
	
	//验证权限
	sDocIds = this.validate(sDocIds,"33");
	if(sDocIds.length <= 0)  return;

	//提交请求
	var oTRSAction = new CTRSAction("../document/document_restore_info_main.jsp");
	oTRSAction.setParameter("DocumentIds", sDocIds);
	oTRSAction.setParameter("ChannelId", 0);
	var bResult = oTRSAction.doDialogAction(800, 500);

	if(bResult)//CTRSAction_refreshMe();
		//window.location = "../document/document_list_of_trsserver.jsp?SiteId="+nSite;
		//wenyh@20060726,回到list_of_site.jsp
		window.location = "../document/document_list_of_site.jsp?SiteId="+nSite;
	return;
}

function CWCMDocument_restoreDraftDoc(_docIds){
	//参数校验
	var sDocIds    = _docIds || "";	
	if(sDocIds.length <= 0){
		CTRSAction_alert("请选择需要恢复的文档!");
		return;
	}
	
	//验证权限
	sDocIds = this.validate(sDocIds,"33");
	if(sDocIds.length <= 0)  return;

	//提交请求
	var oTRSAction = new CTRSAction("../document/document_restore_info_main.jsp");
	oTRSAction.setParameter("DocumentIds", sDocIds);
	oTRSAction.setParameter("ChannelId", 0);
	var bResult = oTRSAction.doDialogAction(800, 500);

	if(bResult)//CTRSAction_refreshMe();
		window.location = "../document/document_list_of_draft.jsp";
	return;
}

function CWCMDocument_addNew(_nChannelId){
	var nChannelId	= _nChannelId || 0;
	var sURL		= "../document/document_addedit.jsp";

	var oTRSAction = new CTRSAction(sURL);
	oTRSAction.setParameter("DocumentId", 0);
	oTRSAction.setParameter("ChannelId",  nChannelId);
	oTRSAction.doOpenWinAction();
}

function CWCMDocument_edit(_documentId, _channelId, _bInSearch){
	var nFromChannelId = _channelId || 0;
	var bInSearch = _bInSearch || false;
	
	if(CKMSimCheckOnEdit(_documentId)){
		return;
	}
	
	var oTRSAction = new CTRSAction("../document/document_addedit.jsp");
	oTRSAction.setParameter("DocumentId", _documentId);
	oTRSAction.setParameter("ChannelId",  nFromChannelId);
	if(bInSearch)
		oTRSAction.setParameter("bInSearch", 1);
	oTRSAction.doOpenWinAction();
	return;
}

//wenyh@2006-10-28 添加在编辑文档进入时即进行CKM查重操作
function CKMSimCheckOnEdit(_docId){
	//Check if TRSCKM enable.
	if(!window.WCMCKMSimSearchConfig || !WCMCKMSimSearchConfig.enable){
		return false;
	}
	
	var args = [];
	args[0] = _docId;
	args[1] = "";
	args[2] = "true";
	
	//1.verify parameters
	var nWidth	= 700;
	var nHeight = 300;

	var nLeft	= (window.screen.availWidth - nWidth)/2;
	var nTop	= (window.screen.availHeight - nHeight)/2;


	//2.Construct parameters for dialog
	var sFeatures		= "dialogHeight: "+nHeight+"px; dialogWidth: "+nWidth+"px; "
						+ "dialogTop: "+nTop+"; dialogLeft: "+nLeft+"; "
						+ "center: Yes; scroll:Yes;help: No; resizable: No; status: No;";
	//3.display Dialog
	var sURL = "../ckm/document_sim_search.html";
	try{
		var bResult = window.showModalDialog(sURL, args, sFeatures);					
		return bResult;			
	}catch(e){
		alert("您的IE插件已经将对话框拦截！\n"
				+ "请将拦截去掉-->点击退出-->关闭IE，然后重新打开IE登录即可！\n"
				+ "给您造成不便，TRS致以深深的歉意！");		
	}	
	return false;
}

function CWCMDocument_show(_documentId, _channelId){
	var nDocumentId = _documentId || 0;
	if(nDocumentId <= 0) return;

	var nChannelId = _channelId || 0;
	var oTRSAction = new CTRSAction("../document/document_show.jsp");
	oTRSAction.setParameter("DocumentId", nDocumentId);
	oTRSAction.setParameter("ChannelId", nChannelId);
	oTRSAction.doOpenWinAction();
	return;
}

function CWCMDocument_share(_docIds, _channelId, _operType, _bTransmitAll, _strChannelTypes, _strDisabledChannels){
	var sDocIds = _docIds;
	var nChannelId = _channelId || 0;

	if(!_bTransmitAll){
		if (_operType == 10) sDocIds = this.validate(sDocIds,"33",1);
		else sDocIds = this.validate(sDocIds,"34",1);
		if(sDocIds.length <=0) return;
	}
	
	var oTRSAction = new CTRSAction("../document/document_transmit.jsp");
	oTRSAction.setParameter("DocumentIds", sDocIds);
	oTRSAction.setParameter("FromChannelId", nChannelId);
	oTRSAction.setParameter("OperType",		 _operType);
	oTRSAction.setParameter("TransmitAll",	 _bTransmitAll)
	if(_strChannelTypes != null && _strChannelTypes != "") {
		oTRSAction.setParameter("ChannelTypes",	 _strChannelTypes);
	}
	if(_strDisabledChannels != null && _strDisabledChannels != "") {
		oTRSAction.setParameter("DisabledChannels",	 _strDisabledChannels);
	}

	var arResult = oTRSAction.doNoScrollDialogAction(500, 650);
	
	//wenyh@20060323,修改了document_transmit.jsp,如果都操作成功不显示报告页,返回值可能只是一个布尔值.
	if(typeof(arResult) == "boolean"){
		return [arResult];
	}
	
	return arResult;

	//if(_operType==10 && bResult )CTRSAction_refreshMe();
}

function CWCMDocument_moveDoc(_docIds, _channelId, _bTransmitAll){
	var sDocIds = _docIds;
	if(sDocIds.length <= 0){
		CTRSAction_alert("请选择您要移动的文档！");
		return;
	}
	var arResult = this.share(_docIds, _channelId, 10, _bTransmitAll, this.getDisplayTypes(_channelId, _docIds));
	if(!arResult) return;
	if(arResult[0]) CTRSAction_refreshMe();
}

function CWCMDocument_moveAll(_channelId){
	var arResult = this.share("", _channelId, 10, 1, this.getDisplayTypes(_channelId, ""));
	if(!arResult) return;
	if(arResult[0]) CTRSAction_refreshMe();
}

function CWCMDocument_copyDoc(_docIds, _channelId, _bTransmitAll){
	var sDocIds = _docIds;
	if(sDocIds.length <= 0){
		CTRSAction_alert("请选择您要复制的文档！");
		return;
	}
	var arResult = this.share(_docIds, _channelId, 20, _bTransmitAll, this.getDisplayTypes(_channelId, _docIds));
	if(!arResult) return;
	if(arResult[0]) CTRSAction_refreshMe();
}

function CWCMDocument_copyAll(_channelId){
	var arResult = this.share("", _channelId, 20, 1, this.getDisplayTypes(_channelId, ""));
	if(!arResult) return;
	if(arResult[0]) CTRSAction_refreshMe();
}

function CWCMDocument_quoteDoc(_docIds, _channelId, _bTransmitAll){
	var sDocIds = _docIds;
	if(sDocIds.length <= 0){
		CTRSAction_alert("请选择您要引用的文档！");
		return;
	}
	var arResult = this.share(_docIds, _channelId, 30, _bTransmitAll, this.getDisplayTypes(_channelId, ""));
	if(!arResult) return;
	if(arResult[0]) CTRSAction_refreshMe();
}

function CWCMDocument_preview(_docId, _chnlId){
	var nDocumentId = _docId || 0;
	var nChannelId = _chnlId || 0;

	var oTRSAction = new CTRSAction("../document/document_preview.jsp");
	oTRSAction.setParameter("DocumentId", nDocumentId);
	oTRSAction.setParameter("ChannelId", nChannelId);
	oTRSAction.doOpenWinAction();
}

function CWCMDocument_import(_channelId){
	var nChannelId = _channelId || 0;

	var oTRSAction = new CTRSAction("../document/document_import.jsp");
	oTRSAction.setParameter("ChannelId", nChannelId);
	var arResult = oTRSAction.doDialogAction(500, 450);
	if(!arResult) return;
	if(arResult[0])CTRSAction_refreshMe();
	return;
}

function CWCMDocument_export(_channelId, _documentIds, _downloadUrl, _nSiteId){
	//参数校验
	var nChannelId = _channelId || 0;
	var nSiteId = _nSiteId || 0;
	var strDocumentIds = _documentIds || "";
	if(strDocumentIds.length <= 0){
		CTRSAction_alert("请选择需要导出的文档!");
		return;
	}

	strDocumentIds = this.validate(strDocumentIds,"34",1);
	if(strDocumentIds.length <= 0) return;
    
	var oTRSAction = new CTRSAction("../document/document_export.jsp");
	oTRSAction.setParameter("ChannelId", nChannelId);
	oTRSAction.setParameter("SiteId", nSiteId);
	oTRSAction.setParameter("DocumentIds", _documentIds);
	var sResult = oTRSAction.doDialogAction(550, 300);

	sResult = sResult || "";
	if(sResult == "") {
		return;
	}
	
	var frm = document.all("ifrmDownload");
	var sUrl = _downloadUrl+"?DownName=DOCUMENT&FileName="+sResult; 
	frm.src = sUrl;
}

function CWCMDocument_findById(_nDocId){
	var nDocmentId = _nDocId || 0;

	var oTRSAction = new CTRSAction("../document/document_get_by_id.jsp");
	oTRSAction.setParameter("DocumentId", nDocmentId);
	var sXMLString = oTRSAction.doXMLHttpAction();
	if(!sXMLString || sXMLString.length<=0){
		return false;
	}

	return WCMObjHelper.parseXMLStrToObj(sXMLString);
}

function CWCMDocument_getProperty(_nDocId, _sPropertyName){
	var oDocument = this.findById(_nDocId);
	
	if(oDocument == null){
		CTRSAction_alert("没有找到ID为["+_nDocId+"]的文档！");
		return;
	}
	
	var sPropertyName = _sPropertyName || "";
	sPropertyName = sPropertyName.toUpperCase();
	return oDocument.getProperty(sPropertyName);
}

function CWCMDocument_findByIds(_sDocIds){
	var sDocIds = _sDocIds || "";
	if(sDocIds == null || sDocIds.length <= 0){
		return null;
	}
	var oTRSAction = new CTRSAction("../document/document_get_by_ids.jsp");
	oTRSAction.setParameter("DocumentIds", sDocIds);
	var sXMLString = oTRSAction.doXMLHttpAction();
	if(!sXMLString || sXMLString.length<=0){
		return false;
	}

	return WCMObjHelper.fromXMLString(sXMLString);
}

function CWCMDocument_restoreAll(_channelId){
	if(!CTRSAction_confirm("您确定恢复回收站所有的文档吗？")) {
		return;
	}
	var nChannelId	= _channelId || 0;
	//提交请求
	var oTRSAction = new CTRSAction("../document/document_restore_all.jsp");
	oTRSAction.setParameter("ChannelId", nChannelId);
	var bResult = oTRSAction.doDialogAction(500, 300);

	if(bResult)
		window.location = "../document/document_list_of_channel.jsp?ChannelId="+nChannelId;
	return;
}

function CWCMDocument_clearRecycle(_channelId){
	if(!CTRSAction_confirm("您确定清空回收站吗？")) {
		return;
	}
	var nChannelId = _channelId || 0;
	
	var oTRSAction = new CTRSAction("../document/document_clear_recycle.jsp");
	oTRSAction.setParameter("ChannelId",   nChannelId);
	var bResult = oTRSAction.doDialogAction(500, 300);

	if(bResult)CTRSAction_refreshMe();
	return;
}

function CWCMDocument_getDisplayTypes(_nChannelId, _strDocumentIds) {
	var oTRSAction = new CTRSAction("../document/document_chnltypes.jsp");
	oTRSAction.setParameter("ChannelId", _nChannelId);
	oTRSAction.setParameter("DocumentIds", _strDocumentIds);
	var sResult = oTRSAction.doXMLHttpAction();
	
	if(sResult == null || sResult == "null") 
		sResult = "";
	return sResult;
}

/*
 *	wenyh@2006-08-17	添加恢复前的校验
 */
function CMCMDocument_validateRestoreChnlDoc(_docIds,_nChannelId){	
	var validateAction = new CTRSAction("../document/chnldoc_restore_validate.jsp");
	validateAction.setParameter("DocumentIds",_docIds);
	validateAction.setParameter("ChannelId",_nChannelId);

	var result = validateAction.doXMLHttpAction();	
	if(result){
		var ix = result.indexOf("<canrestoreids>");
		var ixx = result.indexOf("</canrestoreids>");
		if(ix >= 0 && ixx > 0){
			result = result.substring(ix+15,ixx);
		}
	}	
	
	return result;
}

function CWCMDocument(){
	this.deleteDoc	= CWCMDocument_deleteDoc;

	this.addNew		= CWCMDocument_addNew;

	this.edit		= CWCMDocument_edit;

	this.share		= CWCMDocument_share;

	this.move		= CWCMDocument_moveDoc;

	this.moveAll	= CWCMDocument_moveAll;

	this.copy		= CWCMDocument_copyDoc;

	this.copyAll	= CWCMDocument_copyAll;

	this.quote		= CWCMDocument_quoteDoc;

	this.publish	= CWCMDocument_publish;	

	this.show		= CWCMDocument_show;
	
	this.restore	= CWCMDocument_restore;

	this.preview	= CWCMDocument_preview;

	this.importDoc	= CWCMDocument_import;

	this.exportDoc	= CWCMDocument_export;

	this.findById   = CWCMDocument_findById;

	this.findByIds  = CWCMDocument_findByIds;

	this.getProperty= CWCMDocument_getProperty;

	this.restoreAll= CWCMDocument_restoreAll;

	this.clearRecycle= CWCMDocument_clearRecycle;

	this.getDisplayTypes= CWCMDocument_getDisplayTypes;

	this.restoreSiteDoc = CWCMDocument_restoreSiteDoc;

	this.restoreDraftDoc = CWCMDocument_restoreDraftDoc;

	this.validate = CWCMDocument_operation_validate;

	this.publishChnlDocs = CWCMDocument_publishChnlDocs;
	
	this.validateRestoreChnlDoc	= CMCMDocument_validateRestoreChnlDoc;
}

var WCMDocument = new CWCMDocument();