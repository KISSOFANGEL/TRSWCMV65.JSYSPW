<%--
/** Title:			yuser_delete.jsp
 *  Description:
 *		ɾ��YUser��ҳ��
 *  Copyright: 		www.trs.com.cn
 *  Company: 		TRS Info. Ltd.
 *  Author:			trs wcm
 *  Created:		2015-06-03 14:39:59
 *  Vesion:			1.0
 *  Last EditTime:	2015-06-03 / 2015-06-03
 *	Update Logs:
 *		trs wcm@2015-06-03 �������ļ�
 *
 *  Parameters:
 *		see yuser_delete.xml
 *
 */
--%>

<%@ page contentType="text/html;charset=UTF-8" pageEncoding="GBK" errorPage="../include/error.jsp"%>
<!------- WCM IMPORTS BEGIN ------------>
<%@ page import="com.trs.jsyspw.YUsers" %>
<!------- WCM IMPORTS END ------------>

<!--- ҳ��״̬�趨����¼У�顢������ȡ��������public_server.jsp�� --->
<%@include file="../include/public_server.jsp"%>
<%!boolean IS_DEBUG = false;%>
<%
//4.��ʼ��(��ȡ����)
	String sYUserIds = currRequestHelper.getString("YUserIds");

//5.Ȩ��У��

//6.ҵ�����
	/** TODO �����Ϊ��Service��������
	IYUserService currYUserService = (IYUserService)DreamFactory.createObjectById("IYUserService");
	currYUserService.delete(sYUserIds);
	**/
	YUsers currYUsers = YUsers.findByIds(loginUser, sYUserIds);
	currYUsers.removeAll(true);
	

//7.����
	out.clear();
%>

<HTML>
<HEAD>
<META http-equiv="Content-Type" content="text/html; charset=UTF-8">
<TITLE>TRS WCM 5.2 ɾ��YUser</TITLE>
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