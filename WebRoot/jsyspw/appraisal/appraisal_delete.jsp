<%--
/** Title:			appraisal_delete.jsp
 *  Description:
 *		ɾ��Appraisal��ҳ��
 *  Copyright: 		www.trs.com.cn
 *  Company: 		TRS Info. Ltd.
 *  Author:			wangjiang
 *  Created:		2015-05-28 17:09:15
 *  Vesion:			1.0
 *  Last EditTime:	2015-05-28 / 2015-05-28
 *	Update Logs:
 *		wangjiang@2015-05-28 �������ļ�
 *
 *  Parameters:
 *		see appraisal_delete.xml
 *
 */
--%>

<%@ page contentType="text/html;charset=UTF-8" pageEncoding="GBK" errorPage="../include/error.jsp"%>
<!------- WCM IMPORTS BEGIN ------------>
<%@ page import="com.trs.jsyspw.Appraisals" %>
<!------- WCM IMPORTS END ------------>

<!--- ҳ��״̬�趨����¼У�顢������ȡ��������public_server.jsp�� --->
<%@include file="../include/public_server.jsp"%>
<%!boolean IS_DEBUG = false;%>
<%
//4.��ʼ��(��ȡ����)
	String sAppraisalIds = currRequestHelper.getString("AppraisalIds");

//5.Ȩ��У��

//6.ҵ�����
	/** TODO �����Ϊ��Service��������
	IAppraisalService currAppraisalService = (IAppraisalService)DreamFactory.createObjectById("IAppraisalService");
	currAppraisalService.delete(sAppraisalIds);
	**/
	Appraisals currAppraisals = Appraisals.findByIds(loginUser, sAppraisalIds);
	currAppraisals.removeAll(true);
	

//7.����
	out.clear();
%>

<HTML>
<HEAD>
<META http-equiv="Content-Type" content="text/html; charset=UTF-8">
<TITLE>TRS WCM 5.2 ɾ��Appraisal</TITLE>
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