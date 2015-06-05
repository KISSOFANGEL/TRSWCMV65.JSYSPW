<%--
/** 
 *	History				Who				What
 *	2006-01-13			wenyh			�޸ĸ��ĵ�����Ȩ�޵�Ȩ������(32-->40)
 *
 */
--%>
<%@ page contentType="text/html;charset=UTF-8" pageEncoding="GBK" errorPage="../include/error.jsp"%>
<!------- WCM IMPORTS BEGIN ------------>
<%@ page import="com.trs.components.wcm.content.persistent.Document" %>
<%@ page import="com.trs.components.wcm.resource.Status" %>
<%@ page import="com.trs.components.wcm.resource.Statuses" %>
<%@ page import="com.trs.infra.support.config.ConfigServer" %>
<%@ page import="com.trs.presentation.locale.LocaleServer" %>
<!------- WCM IMPORTS END ------------>
<%@include file="../include/public_server.jsp"%>

<%!
	boolean bSupportLogo = "TRUE".equalsIgnoreCase(
	ConfigServer.getServer().getInitProperty("SUPPORT_LOGO")
	);
%>


var MENU_ITEM_SYSTEM = [
{"ItemText" : "<%=LocaleServer.getString("system.button.add", "�ɼ�")%>",			"ItemId" : "addnew",	"ItemAction" : "WCMDocument.addNew(m_nCurrChannelId);",		"ItemParent" : null, "RightIndex" : 31},
{"ItemText" : "", "ItemId" : "SP1", "ItemAction" : null},
{"ItemText" : "<%=LocaleServer.getString("document.button.moveto", "�ƶ�ȫ���ĵ���")%>", "ItemId" : "moveall",	"ItemAction" : "WCMDocument.moveAll(m_nCurrChannelId);",		"ItemParent" : null, "RightIndex" : 65},
{"ItemText" : "<%=LocaleServer.getString("document.button.copyto", "����ȫ���ĵ���")%>", "ItemId" : "copyall",	"ItemAction" : "WCMDocument.copyAll(m_nCurrChannelId);",		"ItemParent" : null, "RightIndex" : 34},
{"ItemText" : "", "ItemId" : "SP2", "ItemAction" : null},
{"ItemText" : "<%=LocaleServer.getString("document.button.import", "�ĵ�����")%>",		"ItemId" : "importdoc",	"ItemAction" : "WCMDocument.importDoc(m_nCurrChannelId);",	"ItemParent" : null, "RightIndex" : 31},
{"ItemText" : "", "ItemId" : "SP3", "ItemAction" : null},
{"ItemText" : "<%=LocaleServer.getString("system.label.refresh", "ˢ��")%>",		"ItemId" : "refreshMe",	"ItemAction" : "CTRSAction_refreshMe();",	"ItemParent" : null, "RightIndex" : null}
];

var MENU_ITEM_SYSTEM_ONLYSEARCH = [,
{"ItemText" : "<%=LocaleServer.getString("system.label.refresh", "ˢ��")%>",		"ItemId" : "refreshMe",	"ItemAction" : "CTRSAction_refreshMe();",	"ItemParent" : null, "RightIndex" : null}
];

var MENU_ITEM_DOCUMENT = [
{"ItemText" : "<%=LocaleServer.getString("system.label.edit", "�༭")%>", "ItemId" : "editdoc",		
"ItemAction" : "editDoc(m_objSrcEl.DocumentId);", "ItemParent" : null, "RightIndex" : 32},
//�����˵����ı�˳��caohui@2006-7-4
{"ItemText" : "�ı�˳��", "ItemId" : "docPositionSet",		
"ItemAction" : "setDocPosition(m_objSrcEl.DocumentId);", "ItemParent" : null, "RightIndex" : 32},

<%
if(bSupportLogo){
%>
{"ItemText" : "�ĵ�LOGO", "ItemId" : "editlogo",		
"ItemAction" : "editLogo(m_objSrcEl);", "ItemParent" : null, "RightIndex" : 32},
<%
}	
%>
{"ItemText" : "<%=LocaleServer.getString("document.label.rightset", "����Ȩ��")%>",	"ItemId" : "setRight",	
"ItemAction" : "dowithRight(m_objSrcEl.DocumentId);","ItemParent" : null, "RightIndex" : 40},
{"ItemText" : "<%=LocaleServer.getString("system.button.drop", "ɾ��")%>",					"ItemId" : "deletedoc",		"ItemAction" : "rmDelete(getDocIdsInRightMenu(m_objSrcEl));",		"ItemParent" : null, "RightIndex" : 33},
{"ItemText" : "", "ItemId" : "SP1", "ItemAction" : null},
{"ItemText" : "<%=LocaleServer.getString("document.label.changestatus", "�ı�״̬")%>",		"ItemId" : "changestatus",	"ItemAction" : "", "ItemParent" : null, "RightIndex" : null},
<%
	Statuses currStatues = Statuses.openWCMObjs(loginUser, null);
	Status currStatus = null;
	for(int i=0;i<currStatues.size();i++) {
		currStatus = (Status)currStatues.getAt(i);
		if(currStatus == null || currStatus.getId() == Status.STATUS_ID_PUBLISHED) continue;
		int nStatusId = currStatus.getId();
		out.println("{\"ItemText\":\""+currStatus.getDisp()+"\", \"ItemId\":\"status_"+nStatusId+"\", \"ItemAction\":\"changeDocStatus("+nStatusId+", getDocIdsInRightMenu(m_objSrcEl));\", \"ItemParent\":\"changestatus\", \"RightIndex\":"+currStatus.getRightIndex()+"},");
	}
%>
{"ItemText" : "<%=LocaleServer.getString("document.button.quickpublish", "���ٷ���")%>",	"ItemId" : "quickpublish",	"ItemAction" : "rmQuickPublish(getDocIdsInRightMenu(m_objSrcEl))",	"ItemParent" : null, "RightIndex" : 39},
{"ItemText" : "<%=LocaleServer.getString("document.button.publishoption", "�߼�����")%>",	"ItemId" : "propublish",	"ItemAction" : "rmPublishOption(getDocIdsInRightMenu(m_objSrcEl));","ItemParent" : null, "RightIndex" : 39},
{"ItemText" : "<%=LocaleServer.getString("document.button.publishhistory", "������ʷ")%>",	"ItemId" : "publishinfo",	"ItemAction" : "rmPublishInfo(m_objSrcEl.DocumentId);","ItemParent" : null, "RightIndex" : 39},
{"ItemText" : "", "ItemId" : "SP2", "ItemAction" : null},
{"ItemText" : "<%=LocaleServer.getString("system.button.move", "�ƶ�")%>",					"ItemId" : "move",			"ItemAction" : "rmMove(getDocIdsInRightMenu(m_objSrcEl));",			"ItemParent" : null, "RightIndex" : 65},
{"ItemText" : "<%=LocaleServer.getString("system.button.copy", "����")%>",					"ItemId" : "copy",			"ItemAction" : "rmCopy(getDocIdsInRightMenu(m_objSrcEl));",			"ItemParent" : null, "RightIndex" : 34},
{"ItemText" : "<%=LocaleServer.getString("system.button.refer", "����")%>",					"ItemId" : "quote",			"ItemAction" : "rmQuote(getDocIdsInRightMenu(m_objSrcEl));",		"ItemParent" : null, "RightIndex" : 34},

{"ItemText" : "", "ItemId" : "SP3", "ItemAction" : null},
{"ItemText" : "<%=LocaleServer.getString("document.button.export", "�ĵ�����")%>",			"ItemId" : "exportdoc",		"ItemAction" : "rmExportDoc(getDocIdsInRightMenu(m_objSrcEl));",	"ItemParent" : null, "RightIndex" : 34},
{"ItemText" : "", "ItemId" : "SP4", "ItemAction" : null},
{"ItemText" : "<%=LocaleServer.getString("document.label.backup", "�汾����")%>",			"ItemId" : "backup",	"ItemAction" : "onBackup(getDocIdsInRightMenu(m_objSrcEl))",					"ItemParent" : null, "RightIndex" : 32}
];

var MENU_ITEM_DOCUMENT_ONLYSEARCH = new Array(
//{"ItemText" : "<%=LocaleServer.getString("system.button.add", "�ɼ�")%>",				"ItemId" : "addnew",		"ItemAction" : "WCMDocument.addNew(m_nCurrChannelId);",				"ItemParent" : null, "RightIndex" : 31},
{"ItemText" : "<%=LocaleServer.getString("system.label.edit", "�༭")%>",					"ItemId" : "editdoc",		"ItemAction" : "editDoc(m_objSrcEl.DocumentId);",					"ItemParent" : null, "RightIndex" : 32},
//{"ItemText" : "<%=LocaleServer.getString("document.label.rightset", "����Ȩ��")%>",					"ItemId" : "setRight",		"ItemAction" : "dowithRight(m_objSrcEl.DocumentId);",					"ItemParent" : null, "RightIndex" : 40},
//{"ItemText" : "<%=LocaleServer.getString("system.button.drop", "ɾ��")%>",					"ItemId" : "deletedoc",		"ItemAction" : "rmDelete(getDocIdsInRightMenu(m_objSrcEl));",		"ItemParent" : null, "RightIndex" : 33},
{"ItemText" : "", "ItemId" : "SP1", "ItemAction" : null},
{"ItemText" : "<%=LocaleServer.getString("document.label.changestatus", "�ı�״̬")%>",		"ItemId" : "changestatus",	"ItemAction" : "", "ItemParent" : null, "RightIndex" : null},
<%
	currStatues = Statuses.openWCMObjs(loginUser, null);
	currStatus = null;
	for(int i=0;i<currStatues.size();i++) {
		currStatus = (Status)currStatues.getAt(i);
		if(currStatus == null || currStatus.getId() == Status.STATUS_ID_PUBLISHED) continue;
		int nStatusId = currStatus.getId();
		out.println("{\"ItemText\":\""+currStatus.getDisp()+"\", \"ItemId\":\"status_"+nStatusId+"\", \"ItemAction\":\"changeDocStatus("+nStatusId+", getDocIdsInRightMenu(m_objSrcEl));\", \"ItemParent\":\"changestatus\", \"RightIndex\":"+currStatus.getRightIndex()+"},");
	}
%>
{"ItemText" : "<%=LocaleServer.getString("document.button.quickpublish", "���ٷ���")%>",	"ItemId" : "quickpublish",	"ItemAction" : "rmQuickPublish(getDocIdsInRightMenu(m_objSrcEl))",	"ItemParent" : null, "RightIndex" : 39},
{"ItemText" : "<%=LocaleServer.getString("document.button.publishoption", "�߼�����")%>",	"ItemId" : "propublish",	"ItemAction" : "rmPublishOption(getDocIdsInRightMenu(m_objSrcEl));","ItemParent" : null, "RightIndex" : 39},
{"ItemText" : "<%=LocaleServer.getString("document.button.publishhistory", "������ʷ")%>",	"ItemId" : "publishinfo",	"ItemAction" : "rmPublishInfo(m_objSrcEl.DocumentId);","ItemParent" : null, "RightIndex" : 39},
{"ItemText" : "", "ItemId" : "SP2", "ItemAction" : null},
//{"ItemText" : "<%=LocaleServer.getString("system.button.move", "�ƶ�")%>",					"ItemId" : "move",			"ItemAction" : "rmMove(getDocIdsInRightMenu(m_objSrcEl));",			"ItemParent" : null, "RightIndex" : 65},
//{"ItemText" : "<%=LocaleServer.getString("system.button.copy", "����")%>",					"ItemId" : "copy",			"ItemAction" : "rmCopy(getDocIdsInRightMenu(m_objSrcEl));",			"ItemParent" : null, "RightIndex" : 34},
//{"ItemText" : "<%=LocaleServer.getString("system.button.refer", "����")%>",					"ItemId" : "quote",			"ItemAction" : "rmQuote(getDocIdsInRightMenu(m_objSrcEl));",		"ItemParent" : null, "RightIndex" : 34},

{"ItemText" : "", "ItemId" : "SP3", "ItemAction" : null},
{"ItemText" : "<%=LocaleServer.getString("document.button.export", "�ĵ�����")%>",			"ItemId" : "exportdoc",		"ItemAction" : "rmExportDoc(getDocIdsInRightMenu(m_objSrcEl));",	"ItemParent" : null, "RightIndex" : 34},
{"ItemText" : "", "ItemId" : "SP4", "ItemAction" : null},
{"ItemText" : "<%=LocaleServer.getString("document.label.backup", "�汾����")%>",			"ItemId" : "backup",	"ItemAction" : "onBackup(getDocIdsInRightMenu(m_objSrcEl))",					"ItemParent" : null, "RightIndex" : 32}
);

var MENU_ITEM_DOCUMENT_TOPPIC = new Array(
//{"ItemText" : "<%=LocaleServer.getString("system.button.add", "�ɼ�")%>",				"ItemId" : "addnew",		"ItemAction" : "WCMDocument.addNew(m_nCurrChannelId);",				"ItemParent" : null, "RightIndex" : 31},
{"ItemText" : "<%=LocaleServer.getString("system.label.edit", "�༭")%>",					"ItemId" : "editdoc",		"ItemAction" : "editDoc(m_objSrcEl.DocumentId);",					"ItemParent" : null, "RightIndex" : 32},
{"ItemText" : "<%=LocaleServer.getString("document.label.rightset", "����Ȩ��")%>",					"ItemId" : "setRight",		"ItemAction" : "dowithRight(m_objSrcEl.DocumentId);",					"ItemParent" : null, "RightIndex" : 40},
{"ItemText" : "<%=LocaleServer.getString("system.button.drop", "ɾ��")%>",					"ItemId" : "deletedoc",		"ItemAction" : "rmDelete(getDocIdsInRightMenu(m_objSrcEl));",		"ItemParent" : null, "RightIndex" : 33},
{"ItemText" : "", "ItemId" : "SP1", "ItemAction" : null},
{"ItemText" : "<%=LocaleServer.getString("document.label.changestatus", "�ı�״̬")%>",		"ItemId" : "changestatus",	"ItemAction" : "", "ItemParent" : null, "RightIndex" : null},
<%
	currStatus = null;
	for(int i=0;i<currStatues.size();i++) {
		currStatus = (Status)currStatues.getAt(i);
		if(currStatus == null || currStatus.getId() == Status.STATUS_ID_PUBLISHED) continue;
		int nStatusId = currStatus.getId();
		out.println("{\"ItemText\":\""+currStatus.getDisp()+"\", \"ItemId\":\"status_"+nStatusId+"\", \"ItemAction\":\"changeDocStatus("+nStatusId+", getDocIdsInRightMenu(m_objSrcEl));\", \"ItemParent\":\"changestatus\", \"RightIndex\":"+currStatus.getRightIndex()+"},");
	}
%>
{"ItemText" : "<%=LocaleServer.getString("document.button.quickpublish", "���ٷ���")%>",	"ItemId" : "quickpublish",	"ItemAction" : "rmQuickPublish(getDocIdsInRightMenu(m_objSrcEl))",	"ItemParent" : null, "RightIndex" : 39},
{"ItemText" : "<%=LocaleServer.getString("document.button.publishoption", "�߼�����")%>",	"ItemId" : "propublish",	"ItemAction" : "rmPublishOption(getDocIdsInRightMenu(m_objSrcEl));","ItemParent" : null, "RightIndex" : 39},
{"ItemText" : "<%=LocaleServer.getString("document.button.publishhistory", "������ʷ")%>",	"ItemId" : "publishinfo",	"ItemAction" : "rmPublishInfo(m_objSrcEl.DocumentId);","ItemParent" : null, "RightIndex" : 39},
{"ItemText" : "", "ItemId" : "SP2", "ItemAction" : null},
{"ItemText" : "<%=LocaleServer.getString("system.button.move", "�ƶ�")%>",					"ItemId" : "move",			"ItemAction" : "rmMove(getDocIdsInRightMenu(m_objSrcEl));",			"ItemParent" : null, "RightIndex" : 65},
{"ItemText" : "<%=LocaleServer.getString("system.button.copy", "����")%>",					"ItemId" : "copy",			"ItemAction" : "rmCopy(getDocIdsInRightMenu(m_objSrcEl));",			"ItemParent" : null, "RightIndex" : 34},
{"ItemText" : "<%=LocaleServer.getString("system.button.refer", "����")%>",					"ItemId" : "quote",			"ItemAction" : "rmQuote(getDocIdsInRightMenu(m_objSrcEl));",		"ItemParent" : null, "RightIndex" : 34},

{"ItemText" : "", "ItemId" : "SP3", "ItemAction" : null},
{"ItemText" : "<%=LocaleServer.getString("document.button.export", "�ĵ�����")%>",			"ItemId" : "exportdoc",		"ItemAction" : "rmExportDoc(getDocIdsInRightMenu(m_objSrcEl));",	"ItemParent" : null, "RightIndex" : 34},
{"ItemText" : "", "ItemId" : "SP4", "ItemAction" : null},
{"ItemText" : "<%=LocaleServer.getString("document.label.backup", "�汾����")%>",			"ItemId" : "backup",	"ItemAction" : "onBackup(getDocIdsInRightMenu(m_objSrcEl))",					"ItemParent" : null, "RightIndex" : 32}
);

var MENU_ITEM_BLANK_TOPPIC = [
//{"ItemText" : "<%=LocaleServer.getString("system.button.add", "�ɼ�")%>",			"ItemId" : "addnew",	"ItemAction" : "WCMDocument.addNew(m_nCurrChannelId);",		"ItemParent" : null, "RightIndex" : 31},
//{"ItemText" : "", "ItemId" : "SP1", "ItemAction" : null},
{"ItemText" : "<%=LocaleServer.getString("document.button.moveto", "�ƶ�ȫ���ĵ���")%>", "ItemId" : "moveall",	"ItemAction" : "WCMDocument.moveAll(m_nCurrChannelId);",		"ItemParent" : null, "RightIndex" : 65},
{"ItemText" : "<%=LocaleServer.getString("document.button.copyto", "����ȫ���ĵ���")%>", "ItemId" : "copyall",	"ItemAction" : "WCMDocument.copyAll(m_nCurrChannelId);",		"ItemParent" : null, "RightIndex" : 34},
//{"ItemText" : "", "ItemId" : "SP2", "ItemAction" : null},
//{"ItemText" : "<%=LocaleServer.getString("document.button.import", "�ĵ�����")%>",		"ItemId" : "importdoc",	"ItemAction" : "WCMDocument.importDoc(m_nCurrChannelId);",	"ItemParent" : null, "RightIndex" : 31},
{"ItemText" : "", "ItemId" : "SP3", "ItemAction" : null},
{"ItemText" : "<%=LocaleServer.getString("system.label.refresh", "ˢ��")%>",		"ItemId" : "refreshMe",	"ItemAction" : "CTRSAction_refreshMe();",	"ItemParent" : null, "RightIndex" : null}
];


<%if(request.getParameter("importMoreJs")==null || "1".equals(request.getParameter("importMoreJs"))){%>
//================ BEGIN �����Ĳ˵����ı�˳�� caohui@2006-7-4==============//
document.write('<link type="text/css" rel="StyleSheet" href="../style/style_CTRSCrashBoard.css" />');
document.write('<script type="text/javascript" src="../js/prototype.js"></script>');
document.write('<script type="text/javascript" src="../js/CTRSCrashBoard.js"></script>');
document.write('<script type="text/javascript" src="../js/DocumentPosition.js"></script>');
//================ END �����Ĳ˵����ı�˳�� caohui@2006-7-4==============//
<%}%>





document.write("<script type='text/javascript' language='javascript'  src='../js/CTRSRightMenu_res_extends.jsp'></script>");

document.write("<script type='text/javascript' language='javascript'  src='../js/CTRSRightMenu_res_doc_renderDisplay.js'></script>");

<%
	currStatues.clear();
%>

function editLogo(_el){
	var oTRSAction = new CTRSAction("../logo/logo_list.jsp");
	oTRSAction.setParameter("HostDesc", _el.innerText);
	oTRSAction.setParameter("HostType", <%= Document.OBJ_TYPE %>);
	oTRSAction.setParameter("HostId", _el.DocumentId);

	oTRSAction.doAction();
}