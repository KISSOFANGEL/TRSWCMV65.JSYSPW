<%--
/** Title:			yuser_show.jsp
 *  Description:
 *		YUser����ʾҳ��
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
 *		see yuser_show.xml
 *
 */
--%>

<%@ page contentType="text/html;charset=UTF-8" pageEncoding="GBK"
	errorPage="../include/error.jsp"%>
<!------- WCM IMPORTS BEGIN ------------>
<%@ page import="com.trs.jsyspw.YUser" %>
<%@ page import="com.trs.jsyspw.YUsers" %>
<!------- WCM IMPORTS END ------------>

<!--- ҳ��״̬�趨����¼У�顢������ȡ��������public_server.jsp�� --->
<%@include file="../include/public_server.jsp"%>
<%!boolean IS_DEBUG = false;%>
<%
//4.��ʼ������ȡ���ݣ�
	int nYUserId = currRequestHelper.getInt("YUserId", 0);
	YUser currYUser = YUser.findById(nYUserId);
	if(currYUser == null){
		throw new WCMException(ExceptionNumber.ERR_PARAM_INVALID, "��������û���ҵ�IDΪ["+nYUserId+"]��YUser��");
	}

//5.Ȩ��У��

//6.ҵ�����

//7.����
	out.clear();
%>

<HTML>
<HEAD>
<META http-equiv="Content-Type" content="text/html; charset=UTF-8">
<TITLE>TRS WCM 5.2 YUser��Ϣ</TITLE>
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
		WCMDialogHead.draw("YUser��Ϣ");
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
						<TD>USERNAME</TD>
						<TD>&nbsp;<%=PageViewUtil.toHtml(currYUser.getPropertyAsString("USERNAME"))%></TD>
					</TR>
					

					<TR bgcolor="#F6F6F6">
						<TD>PASSWORD</TD>
						<TD>&nbsp;<%=PageViewUtil.toHtml(currYUser.getPropertyAsString("PASSWORD"))%></TD>
					</TR>
					

					<TR bgcolor="#F6F6F6">
						<TD>NICKNAME</TD>
						<TD>&nbsp;<%=PageViewUtil.toHtml(currYUser.getPropertyAsString("NICKNAME"))%></TD>
					</TR>
					

					<TR bgcolor="#F6F6F6">
						<TD>SEX</TD>
						<TD>&nbsp;<%=PageViewUtil.toHtml(currYUser.getPropertyAsString("SEX"))%></TD>
					</TR>
					

					<TR bgcolor="#F6F6F6">
						<TD>SATATUS</TD>
						<TD>&nbsp;<%=PageViewUtil.toHtml(currYUser.getPropertyAsString("SATATUS"))%></TD>
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