<%@ page contentType="text/html;charset=UTF-8" pageEncoding="GBK" errorPage="../include/error.jsp"%>
<!------- WCM IMPORTS BEGIN ------------>
<%@ page import="com.trs.components.wcm.resource.Status" %>
<%@ page import="com.trs.components.wcm.resource.Statuses" %>
<!------- WCM IMPORTS END ------------>
<%@include file="../include/public_server.jsp"%>

var MENU_ITEM_SYSTEM = [
{"ItemText" : "<%=LocaleServer.getString("system.button.add", "采集")%>",			"ItemId" : "addnew",	"ItemAction" : "addeditSureform();",		"ItemParent" : null, "RightIndex" : 31},
{"ItemText" : "", "ItemId" : "SP1", "ItemAction" : null},
{"ItemText" : "<%=LocaleServer.getString("document.button.moveto", "移动全部文档到")%>", "ItemId" : "moveall",	"ItemAction" : "WCMDocument.moveAll(m_nCurrChannelId);",		"ItemParent" : null, "RightIndex" : 33},
{"ItemText" : "<%=LocaleServer.getString("document.button.copyto", "复制全部文档到")%>", "ItemId" : "copyall",	"ItemAction" : "WCMDocument.copyAll(m_nCurrChannelId);",		"ItemParent" : null, "RightIndex" : 34},
{"ItemText" : "", "ItemId" : "SP2", "ItemAction" : null},
{"ItemText" : "<%=LocaleServer.getString("document.button.import", "文档导入")%>",		"ItemId" : "importdoc",	"ItemAction" : "WCMDocument.importDoc(m_nCurrChannelId);",	"ItemParent" : null, "RightIndex" : 31}
];

var MENU_ITEM_DOCUMENT = [
//{"ItemText" : "<%=LocaleServer.getString("system.button.add", "采集")%>",			"ItemId" : "addnew",		"ItemAction" : "addeditSureform();",				"ItemParent" : null, "RightIndex" : 31},
{"ItemText" : "<%=LocaleServer.getString("system.label.edit", "编辑")%>",					"ItemId" : "editdoc",		"ItemAction" : "addeditSureform(m_objSrcEl.DocumentId);",					"ItemParent" : null, "RightIndex" : 32},
{"ItemText" : "<%=LocaleServer.getString("document.label.rightset", "设置权限")%>",					"ItemId" : "setRight",		"ItemAction" : "dowithRight(m_objSrcEl.DocumentId);",					"ItemParent" : null, "RightIndex" : 32},
{"ItemText" : "<%=LocaleServer.getString("system.button.drop", "删除")%>",					"ItemId" : "deletedoc",		"ItemAction" : "rmDelete(getDocIdsInRightMenu(m_objSrcEl));",		"ItemParent" : null, "RightIndex" : 33},
{"ItemText" : "", "ItemId" : "SP1", "ItemAction" : null},
{"ItemText" : "<%=LocaleServer.getString("document.label.changestatus", "改变状态")%>",		"ItemId" : "changestatus",	"ItemAction" : "", "ItemParent" : null, "RightIndex" : 32},
<%
	Statuses currStatues = Statuses.openWCMObjs(loginUser, null);
	Status currStatus = null;
	for(int i=0;i<currStatues.size();i++) {
		currStatus = (Status)currStatues.getAt(i);
		if(currStatus == null || currStatus.getId() == Status.STATUS_ID_PUBLISHED) continue;
		int nStatusId = currStatus.getId();
		out.println("{\"ItemText\":\""+currStatus.getDisp()+"\", \"ItemId\":\"status_"+nStatusId+"\", \"ItemAction\":\"changeDocStatus("+nStatusId+", getDocIdsInRightMenu(m_objSrcEl));\", \"ItemParent\":\"changestatus\", \"RightIndex\":32},");
	}
%>
{"ItemText" : "<%=LocaleServer.getString("document.button.quickpublish", "快速发布")%>",	"ItemId" : "quickpublish",	"ItemAction" : "rmQuickPublish(getDocIdsInRightMenu(m_objSrcEl))",	"ItemParent" : null, "RightIndex" : 39},
{"ItemText" : "<%=LocaleServer.getString("document.button.publishoption", "高级发布")%>",	"ItemId" : "propublish",	"ItemAction" : "rmPublishOption(getDocIdsInRightMenu(m_objSrcEl));","ItemParent" : null, "RightIndex" : 39},
{"ItemText" : "<%=LocaleServer.getString("document.button.publishhistory", "发布历史")%>",	"ItemId" : "publishinfo",	"ItemAction" : "rmPublishInfo(m_objSrcEl.DocumentId);","ItemParent" : null, "RightIndex" : 39},
{"ItemText" : "", "ItemId" : "SP2", "ItemAction" : null},
{"ItemText" : "<%=LocaleServer.getString("system.button.move", "移动")%>",					"ItemId" : "move",			"ItemAction" : "rmMove(getDocIdsInRightMenu(m_objSrcEl));",			"ItemParent" : null, "RightIndex" : 33},
{"ItemText" : "<%=LocaleServer.getString("system.button.copy", "复制")%>",					"ItemId" : "copy",			"ItemAction" : "rmCopy(getDocIdsInRightMenu(m_objSrcEl));",			"ItemParent" : null, "RightIndex" : 34},
{"ItemText" : "<%=LocaleServer.getString("system.button.refer", "引用")%>",					"ItemId" : "quote",			"ItemAction" : "rmQuote(getDocIdsInRightMenu(m_objSrcEl));",		"ItemParent" : null, "RightIndex" : 34},

{"ItemText" : "", "ItemId" : "SP3", "ItemAction" : null},
{"ItemText" : "<%=LocaleServer.getString("document.button.export", "文档导出")%>",			"ItemId" : "exportdoc",		"ItemAction" : "rmExportDoc(getDocIdsInRightMenu(m_objSrcEl));",	"ItemParent" : null, "RightIndex" : 34}
];

var systemMenu		= new ContextMenu("SystemMenu", MENU_ITEM_SYSTEM);
var documentMenu	= new ContextMenu("DocumentMenu", MENU_ITEM_DOCUMENT);

var m_arContextMenu = new Array();
m_arContextMenu[0] = systemMenu;
m_arContextMenu[1] = documentMenu;