<%--
/** Title:			purchase_delete.jsp
 *  Description:
 *		ɾ��Purchase��ҳ��
 *  Copyright: 		www.trs.com.cn
 *  Company: 		TRS Info. Ltd.
 *  Author:			wangjiang
 *  Created:		2014-10-31 10:46:29
 *  Vesion:			1.0
 *  Last EditTime:	2014-10-31 / 2014-10-31
 *	Update Logs:
 *		wangjiang@2014-10-31 �������ļ�
 *
 *  Parameters:
 *		see purchase_delete.xml
 *
 */
--%>

<%@ page contentType="text/html;charset=UTF-8" pageEncoding="GBK" errorPage="../include/error.jsp"%>
<!------- WCM IMPORTS BEGIN ------------>
<%@ page import="com.trs.jsyspw.Purchases" %>
<!------- WCM IMPORTS END ------------>

<!--- ҳ��״̬�趨����¼У�顢������ȡ��������public_server.jsp�� --->
<%@include file="../include/public_server_nologin.jsp"%>
<%!boolean IS_DEBUG = false;%>
<%
//4.��ʼ��(��ȡ����)
	String sPurchaseIds = currRequestHelper.getString("PurchaseIds");

//5.Ȩ��У��

//6.ҵ�����
	/** TODO �����Ϊ��Service��������
	IPurchaseService currPurchaseService = (IPurchaseService)DreamFactory.createObjectById("IPurchaseService");
	currPurchaseService.delete(sPurchaseIds);
	**/
	Purchases currPurchases = Purchases.findByIds(loginUser, sPurchaseIds);
	currPurchases.removeAll(true);
	

//7.����
	out.clear();
%>

<HTML>
<HEAD>
<META http-equiv="Content-Type" content="text/html; charset=UTF-8">
<TITLE>TRS WCM 5.2 ɾ��Purchase</TITLE>
<LINK href="../style/style.css" rel="stylesheet" type="text/css">
<%@include file="../include/public_client_addedit.jsp"%>
</HEAD>

<BODY>
<SCRIPT LANGUAGE="JavaScript">
window.returnValue = true;
window.close();
</SCRIPT>
</BODY>
</HTML>