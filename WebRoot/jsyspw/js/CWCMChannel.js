/** Title:			CWCMChannel.js
 *  Description:
 *		Define WCMChannel Object
 *		定义了频道相关的操作：发布、删除等等
 *  Copyright: 		www.trs.com.cn
 *  Company: 		TRS Info. Ltd.
 *  Author:			CH
 *  Created:		2004-11-25 15:38
 *  Vesion:			1.0
 *  Last EditTime:	2004-11-25
 *	Update Logs:
 *		
 *	Note:
 *		
 *	Depends:
 *		CTRSAction.js
 *	Examples:
 *			
 */


function CWCMChannel_publish(_sChannelIds, _nPublishType){
	var sChannelIds    = "" + (_sChannelIds || "");
	if(sChannelIds.length <= 0){
		CTRSAction_alert("请选择需要发布的频道!");
		return;
	}
	var nPublishType	= _nPublishType || 0;

	var oTRSAction = new CTRSAction("../channel/channel_publish.jsp");
	var arChannelId = sChannelIds.split(",");
	var bResult = false;
	for(var i=0; i<arChannelId.length; i++){
		oTRSAction.setParameter("ChannelId", arChannelId[i]);
		oTRSAction.setParameter("PubType", nPublishType);
		bResult = oTRSAction.doDialogAction(500,500);
	}	
	
	if(bResult) {
		CTRSAction_alert("您的发布操作已经提交到后台执行，请查看发布管理中的 [发布监控] 跟踪此发布操作！", true);
		CTRSAction_refreshMe();
	}
}

function CWCMChannel_preview(_nChannelId){
	var nChannelId = _nChannelId || 0;
	if(nChannelId <= 0){
		CTRSAction_alert("传入无效的频道ID，预览失败！");
		return;
	}
	var sUrl = "../channel/channel_preview.jsp?ChannelId=" + nChannelId;
	this.gotoLink(sUrl);
}

function CWCMChannel_sitePreview(_nSiteId){
	var nSiteId = _nSiteId || 0;
	if(nSiteId <= 0){
		CTRSAction_alert("传入无效的站点ID，预览失败！");
		return;
	}
	var sUrl = "../channel/site_preview.jsp?SiteId=" + nSiteId;
	this.gotoLink(sUrl);
}

function CWCMChannel_show(_nChannelId){
	var nChannelId = _nChannelId || 0;
	var oTRSAction = new CTRSAction("../channel/channel_show.jsp");
	oTRSAction.setParameter("ChannelId", nChannelId);
	oTRSAction.doOpenWinAction();
}

function CWCMChannel_setChannelRight(_nChannelId){
	var nChannelId = _nChannelId || 0;
	var oTRSAction = new CTRSAction("../auth/right_set.jsp");
	oTRSAction.setParameter("ObjId", nChannelId);
	oTRSAction.setParameter("ObjType", 101);
	oTRSAction.doDialogAction(800, 500);
}

function CWCMChannel_setWebSiteRight(_nSiteId){
	var nSiteId = _nSiteId || 0;
	var oTRSAction = new CTRSAction("../auth/right_set.jsp");
	oTRSAction.setParameter("ObjId", nSiteId);
	oTRSAction.setParameter("ObjType", 103);
	oTRSAction.doDialogAction(800, 500);
}

function CWCMChannel_setTemplate(_nChannelId){
	var nChannelId = _nChannelId || 0;
	var oTRSAction = new CTRSAction("../channel/channel_template_set.jsp");
	oTRSAction.setParameter("FolderType", nChannelId);
	oTRSAction.doDialogAction(500, 300);
}

function CWCMChannel_rmChangeTab(_nType, _nId, _nOperType){
	var nId = _nId || 0;
	if(nId <= 0){
		CTRSAction_alert("传入无效的ID["+nId+"]！");
		return;
	}

	if(_nType == 101){//channel
		switch(_nOperType){
		case 0:
			var sMainUrl = "../channel/channel_main.jsp?ChannelId="+nId;
			window.top.gotoTab(0, sMainUrl);
			return;
		case 1:
			var sMainUrl = "../document/document_list_of_channel.jsp?ChannelId="+nId;
			window.top.gotoTab(1, sMainUrl);
			return;
		case 2:
			var sMainUrl = "../publish/publish_main.jsp?ChannelId="+nId;
			window.top.gotoTab(2, sMainUrl);
			return;
		default:
			CTRSAction_alert("传入无效的操作类型！");
			return;
		}
	}

	if(_nType == 103){//website
		switch(_nOperType){
		case 0:
			var sMainUrl = "../channel/site_main.jsp?SiteId="+nId;
			window.top.gotoTab(0, sMainUrl);
			return;
		case 1:
			var sMainUrl = "../document/document_list_of_site.jsp?SiteId="+nId;
			window.top.gotoTab(1, sMainUrl);
			return;
		case 2:
			var sMainUrl = "../publish/publish_main.jsp?SiteId="+nId;
			window.top.gotoTab(2, sMainUrl);
			return;
		default:
			CTRSAction_alert("传入无效的操作类型！");
			return;
		}
	}

	CTRSAction_alert("传入无效的类型，必须是站点[103]或频道[101]！");
	return;
}

function CWCMChannel_gotoLink(_sUrl){
	var sUrl = _sUrl || "";
	if(sUrl.length <= 0){
		CTRSAction_alert("传入无效的地址，打开窗口失败！");
		return;
	}

	var oAnchor = document.createElement("<A NAME='AnchorGoto'></A>");
	oAnchor = document.body.insertBefore(oAnchor);
	oAnchor.setAttribute("target", "_blank");
	oAnchor.setAttribute("href", sUrl);
	oAnchor.click();
	oAnchor.removeNode();
}

function CWCMChannel_quickPublish(_nType, _nId){
	var nId = _nId || 0;
	if(nId <= 0){
		CTRSAction_alert("传入无效的ID["+nId+"]！");
		return;
	}

	var oTRSAction = null;
	if(_nType == 101){//channel
		oTRSAction = new CTRSAction("../channel/channel_publish.jsp");
		oTRSAction.setParameter("ChannelId", nId);
		oTRSAction.setParameter("PubType", 1);
		var bResult = oTRSAction.doDialogAction(500, 500);
		if(bResult) {
			CTRSAction_alert("您的发布操作已经提交到后台执行，请查看发布管理中的 [发布监控] 跟踪此发布操作！", true);
		}
		return;
	}

	if(_nType == 103){//website
		oTRSAction = new CTRSAction("../channel/site_publish.jsp");
		oTRSAction.setParameter("SiteId", nId);
		oTRSAction.setParameter("PubType", 1);
		var bResult = oTRSAction.doDialogAction(500, 500);
		if(bResult) {
			CTRSAction_alert("您的发布操作已经提交到后台执行，请查看发布管理中的 [发布监控] 跟踪此发布操作！", true);
		}
		return;
	}

	CTRSAction_alert("传入无效的类型，必须是站点[103]或频道[101]！");
	return;
}

function CWCMChannel_proPublish(_nType, _nId){
	var oTRSAction = new CTRSAction("../publish/publish_option.jsp");
	oTRSAction.setParameter("ObjType", _nType);
	oTRSAction.setParameter("ObjIds", _nId);
	var bResult = oTRSAction.doDialogAction(500, 400);
	if(bResult) {
		CTRSAction_alert("您的发布操作已经提交到后台执行，请查看发布管理中的 [发布监控] 跟踪此发布操作！", true);
	}
}

/*
 * wenyh@20060118,站点角色管理
 */
function CMCMChannel_manageSiteRoles(_nSiteId){
	var oTRSAction = new CTRSAction("../channel/siterole_list.jsp");
	oTRSAction.setParameter("SiteId", _nSiteId);
	oTRSAction.doDialogAction(800, 500);
}

function CWCMChannel(){
	this.publish = CWCMChannel_publish;	//发布频道

	this.preview = CWCMChannel_preview;	//预览频道

	this.channelPreview = CWCMChannel_preview;	//预览频道

	this.sitePreview = CWCMChannel_sitePreview; //预览站点

	this.show    = CWCMChannel_show;	//查看频道属性

	this.setRight= CWCMChannel_setChannelRight;//设置频道权限

	this.setChannelRight= CWCMChannel_setChannelRight;//设置频道权限

	this.setSiteRight= CWCMChannel_setWebSiteRight;//设置站点权限

	this.setTemplate = CWCMChannel_setTemplate; //设置频道模板

	this.rmChangeTab = CWCMChannel_rmChangeTab; //右键菜单功能函数，切换Tab

	this.gotoLink	 = CWCMChannel_gotoLink;

	this.quickPublish= CWCMChannel_quickPublish;

	this.proPublish  = CWCMChannel_proPublish;
	
	this.manSiteRoles = CMCMChannel_manageSiteRoles;
}

var WCMChannel = new CWCMChannel();