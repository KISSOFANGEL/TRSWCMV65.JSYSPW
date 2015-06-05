<%@ page contentType="text/html;charset=UTF-8" pageEncoding="GBK" errorPage="../include/error.jsp"%>
<!------- WCM IMPORTS BEGIN ------------>
<%@ page import="com.trs.components.wcm.resource.Status" %>
<%@ page import="com.trs.components.wcm.resource.Statuses" %>
<!------- WCM IMPORTS END ------------>
<%@include file="../include/public_server.jsp"%>

var MENU_ITEM_SYSTEM = [
	{"ItemText" : "<%=LocaleServer.getString("system.button.add", "采集")%>",			"ItemId" : "addnew",	"ItemAction" : "WCMDocument.addNew(0);",		"ItemParent" : null, "RightIndex" : null},
];

var MENU_ITEM_DOCUMENT = new Array(
	{"ItemText" : "<%=LocaleServer.getString("system.label.edit", "编辑")%>",					"ItemId" : "editdoc",		"ItemAction" : "WCMDocument.edit(m_objSrcEl.DocumentId, m_objSrcEl.ChannelId);",					"ItemParent" : null, "RightIndex" : 32},
	{"ItemText" : "<%=LocaleServer.getString("document.label.rightset", "设置权限")%>",					"ItemId" : "setRight",		"ItemAction" : "dowithRight(m_objSrcEl.DocumentId);",					"ItemParent" : null, "RightIndex" : 40},
	{"ItemText" : "<%=LocaleServer.getString("system.button.drop", "删除")%>",					"ItemId" : "deletedoc",		"ItemAction" : "rmDelete(getDocIdsInRightMenu(m_objSrcEl), m_objSrcEl.ChannelId);",		"ItemParent" : null, "RightIndex" : 33},
	{"ItemText" : "", "ItemId" : "SP1", "ItemAction" : null},
	{"ItemText" : "<%=LocaleServer.getString("document.label.changestatus", "改变状态")%>",		"ItemId" : "changestatus",	"ItemAction" : "", "ItemParent" : null, "RightIndex" : null},
	<%
		Statuses currStatues = Statuses.openWCMObjs(loginUser, null);
		Status currStatus = null;
		for(int i=0;i<currStatues.size();i++) {
			currStatus = (Status)currStatues.getAt(i);
			if(currStatus == null || currStatus.getId() == Status.STATUS_ID_PUBLISHED) continue;
			int nStatusId = currStatus.getId();
			out.println("{\"ItemText\":\""+currStatus.getDisp()+"\", \"ItemId\":\"status_"+nStatusId+"\", \"ItemAction\":\"changeDocStatus("+nStatusId+", getDocIdsInRightMenu(m_objSrcEl), m_objSrcEl.ChannelId);\", \"ItemParent\":\"changestatus\", \"RightIndex\":"+currStatus.getRightIndex()+"},");
		}
	%>
	{"ItemText" : "<%=LocaleServer.getString("document.button.quickpublish", "快速发布")%>",	"ItemId" : "quickpublish",	"ItemAction" : "rmQuickPublish(getDocIdsInRightMenu(m_objSrcEl), m_objSrcEl.ChannelId)",	"ItemParent" : null, "RightIndex" : 39},
	{"ItemText" : "<%=LocaleServer.getString("document.button.publishoption", "高级发布")%>",	"ItemId" : "propublish",	"ItemAction" : "rmPublishOption(getDocIdsInRightMenu(m_objSrcEl));","ItemParent" : null, "RightIndex" : 39},
	{"ItemText" : "<%=LocaleServer.getString("document.button.publishhistory", "发布历史")%>",	"ItemId" : "publishinfo",	"ItemAction" : "rmPublishInfo(m_objSrcEl.DocumentId);","ItemParent" : null, "RightIndex" : 39},
	{"ItemText" : "", "ItemId" : "SP2", "ItemAction" : null},
	{"ItemText" : "<%=LocaleServer.getString("system.button.move", "移动")%>",					"ItemId" : "move",			"ItemAction" : "rmMove(getDocIdsInRightMenu(m_objSrcEl), m_objSrcEl.ChannelId);",			"ItemParent" : null, "RightIndex" : 33},
	{"ItemText" : "<%=LocaleServer.getString("system.button.copy", "复制")%>",					"ItemId" : "copy",			"ItemAction" : "rmCopy(getDocIdsInRightMenu(m_objSrcEl), m_objSrcEl.ChannelId);",			"ItemParent" : null, "RightIndex" : 34},
	{"ItemText" : "<%=LocaleServer.getString("system.button.refer", "引用")%>",					"ItemId" : "quote",			"ItemAction" : "rmQuote(getDocIdsInRightMenu(m_objSrcEl), m_objSrcEl.ChannelId);",		"ItemParent" : null, "RightIndex" : 34},

	{"ItemText" : "", "ItemId" : "SP3", "ItemAction" : null},
	{"ItemText" : "<%=LocaleServer.getString("document.button.export", "文档导出")%>",			"ItemId" : "exportdoc",		"ItemAction" : "rmExportDoc(getDocIdsInRightMenu(m_objSrcEl), m_objSrcEl.ChannelId);",	"ItemParent" : null, "RightIndex" : 34},
	{"ItemText" : "", "ItemId" : "SP4", "ItemAction" : null},
	{"ItemText" : "<%=LocaleServer.getString("document.label.backup", "版本保存")%>",			"ItemId" : "backup",	"ItemAction" : "onBackup(m_objSrcEl.DocumentId)",					"ItemParent" : null, "RightIndex" : 32}
);

document.write("<script type='text/javascript' language='javascript'  src='../js/CTRSRightMenu_res_extends.jsp'></script>");

document.write("<script type='text/javascript' language='javascript'  src='../js/CTRSRightMenu_res_doc_site_renderDisplay.js'></script>");

<%
	currStatues.clear();
%>