<%--
/** Title:			appraisal_show.jsp
 *  Description:
 *		Appraisal����ʾҳ��
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
 *		see appraisal_show.xml
 *
 */
--%>

<%@ page contentType="text/html;charset=UTF-8" pageEncoding="GBK"
	errorPage="../include/error.jsp"%>
<!------- WCM IMPORTS BEGIN ------------>
<%@ page import="com.trs.jsyspw.Appraisal" %>
<%@ page import="com.trs.jsyspw.Appraisals" %>
<!------- WCM IMPORTS END ------------>

<!--- ҳ��״̬�趨����¼У�顢������ȡ��������public_server.jsp�� --->
<%@include file="../include/public_server.jsp"%>
<%!boolean IS_DEBUG = false;%>
<%
//4.��ʼ������ȡ���ݣ�
	int nAppraisalId = currRequestHelper.getInt("AppraisalId", 0);
	Appraisal currAppraisal = Appraisal.findById(nAppraisalId);
	if(currAppraisal == null){
		throw new WCMException(ExceptionNumber.ERR_PARAM_INVALID, "��������û���ҵ�IDΪ["+nAppraisalId+"]��Appraisal��");
	}

//5.Ȩ��У��

//6.ҵ�����

//7.����
	out.clear();
%>

<HTML>
<HEAD>
<META http-equiv="Content-Type" content="text/html; charset=UTF-8">
<TITLE>TRS WCM 5.2 Appraisal��Ϣ</TITLE>
<LINK href="../style/style.css" rel="stylesheet" type="text/css">
<SCRIPT LANGUAGE="JavaScript">
function closeWindow(){
	window.returnValue = true;
	window.close();
}
</SCRIPT>
</HEAD>

<BODY>
<TABLE width="100%" height="100%" border="0" cellpadding="0"
	cellspacing="1" bgcolor="A6A6A6">
	<TR>
		<TD height="25"><SCRIPT src="../js/CWCMDialogHead.js"></SCRIPT> <SCRIPT
			LANGUAGE="JavaScript">
		WCMDialogHead.draw("Appraisal��Ϣ");
	</SCRIPT></TD>
	</TR>
	<TR>
		<TD valign="top">
		<TABLE width="100%" border="0" cellpadding="2" height="100%"
			cellspacing="0" bgcolor="#FFFFFF">
			<TR>
				<TD align="left" valign="top" height="10">
				<SCRIPT src="../js/CTRSButton.js"></SCRIPT> 
				<script>
					//����һ�����а�ť
					var oTRSButtons = new CTRSButtons();
					oTRSButtons.addTRSButton("����", "closeWindow();", "../images/button_return.gif", "����");
					oTRSButtons.draw();
				</script>
				</TD>
			</TR>
			<TR>
				<TD align="left" valign="top">
				<TABLE width="100%" border="0" cellpadding="2" cellspacing="1"
					bgcolor="A6A6A6">
					
					<TR bgcolor="#F6F6F6">
						<TD>PRODUCTIONNAME</TD>
						<TD>&nbsp;<%=PageViewUtil.toHtml(currAppraisal.getPropertyAsString("PRODUCTIONNAME"))%></TD>
					</TR>
					

					<TR bgcolor="#F6F6F6">
						<TD>PRODUCTIONAUTHOR</TD>
						<TD>&nbsp;<%=PageViewUtil.toHtml(currAppraisal.getPropertyAsString("PRODUCTIONAUTHOR"))%></TD>
					</TR>
					

					<TR bgcolor="#F6F6F6">
						<TD>PRODUCTIONTYPE</TD>
						<TD>&nbsp;<%=PageViewUtil.toHtml(currAppraisal.getPropertyAsString("PRODUCTIONTYPE"))%></TD>
					</TR>
					

					<TR bgcolor="#F6F6F6">
						<TD>OWNER</TD>
						<TD>&nbsp;<%=PageViewUtil.toHtml(currAppraisal.getPropertyAsString("OWNER"))%></TD>
					</TR>
					

					<TR bgcolor="#F6F6F6">
						<TD>APPENDIXID</TD>
						<TD>&nbsp;<%=PageViewUtil.toHtml(currAppraisal.getPropertyAsString("APPENDIXID"))%></TD>
					</TR>
					

					<TR bgcolor="#F6F6F6">
						<TD>PRODUCTDATE</TD>
						<TD>&nbsp;<%=PageViewUtil.toHtml(currAppraisal.getPropertyAsString("PRODUCTDATE"))%></TD>
					</TR>
					

					<TR bgcolor="#F6F6F6">
						<TD>AGENT</TD>
						<TD>&nbsp;<%=PageViewUtil.toHtml(currAppraisal.getPropertyAsString("AGENT"))%></TD>
					</TR>
					

					<TR bgcolor="#F6F6F6">
						<TD>INTRODUCTIO</TD>
						<TD>&nbsp;<%=PageViewUtil.toHtml(currAppraisal.getPropertyAsString("INTRODUCTIO"))%></TD>
					</TR>
					

					<TR bgcolor="#F6F6F6">
						<TD>REMARKS</TD>
						<TD>&nbsp;<%=PageViewUtil.toHtml(currAppraisal.getPropertyAsString("REMARKS"))%></TD>
					</TR>
					

					<TR bgcolor="#F6F6F6">
						<TD>AGENTTEL</TD>
						<TD>&nbsp;<%=PageViewUtil.toHtml(currAppraisal.getPropertyAsString("AGENTTEL"))%></TD>
					</TR>
					

				</TABLE>
				</TD>
			</TR>
		</TABLE>
		</TD>
	</TR>
</TABLE>
</BODY>
</HTML>