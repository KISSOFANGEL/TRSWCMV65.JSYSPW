<%--
/** Title:			purchase_show.jsp
 *  Description:
 *		Purchase����ʾҳ��
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
 *		see purchase_show.xml
 *
 */
--%>

<%@ page contentType="text/html;charset=UTF-8" pageEncoding="GBK"
	errorPage="../include/error.jsp"%>
<!------- WCM IMPORTS BEGIN ------------>
<%@ page import="com.trs.jsyspw.Purchase" %>
<%@ page import="com.trs.jsyspw.Purchases" %>
<!------- WCM IMPORTS END ------------>

<!--- ҳ��״̬�趨����¼У�顢������ȡ��������public_server.jsp�� --->
<%@include file="../include/public_server_nologin.jsp"%>
<%!boolean IS_DEBUG = false;%>
<%
//4.��ʼ������ȡ���ݣ�
	int nPurchaseId = currRequestHelper.getInt("PurchaseId", 0);
	Purchase currPurchase = Purchase.findById(nPurchaseId);
	if(currPurchase == null){
		throw new WCMException(ExceptionNumber.ERR_PARAM_INVALID, "��������û���ҵ�IDΪ["+nPurchaseId+"]��Purchase��");
	}

//5.Ȩ��У��

//6.ҵ�����

//7.����
	out.clear();
%>

<HTML>
<HEAD>
<META http-equiv="Content-Type" content="text/html; charset=UTF-8">
<TITLE>TRS WCM 5.2 Purchase��Ϣ</TITLE>
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
		WCMDialogHead.draw("Purchase��Ϣ");
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
						<TD>PURTITLE</TD>
						<TD>&nbsp;<%=PageViewUtil.toHtml(currPurchase.getPropertyAsString("PURTITLE"))%></TD>
					</TR>
					

					<TR bgcolor="#F6F6F6">
						<TD>PURNUM</TD>
						<TD>&nbsp;<%=PageViewUtil.toHtml(currPurchase.getPropertyAsString("PURNUM"))%></TD>
					</TR>
					

					<TR bgcolor="#F6F6F6">
						<TD>PURTYPE</TD>
						<TD>&nbsp;<%=PageViewUtil.toHtml(currPurchase.getPropertyAsString("PURTYPE"))%></TD>
					</TR>
					

					<TR bgcolor="#F6F6F6">
						<TD>PURPRICE</TD>
						<TD>&nbsp;<%=PageViewUtil.toHtml(currPurchase.getPropertyAsString("PURPRICE"))%></TD>
					</TR>
					

					<TR bgcolor="#F6F6F6">
						<TD>PURDESC</TD>
						<TD>&nbsp;<%=PageViewUtil.toHtml(currPurchase.getPropertyAsString("PURDESC"))%></TD>
					</TR>
					

					<TR bgcolor="#F6F6F6">
						<TD>PUROVERTIME</TD>
						<TD>&nbsp;<%=PageViewUtil.toHtml(currPurchase.getPropertyAsString("PUROVERTIME"))%></TD>
					</TR>
					

					<TR bgcolor="#F6F6F6">
						<TD>CONTACT</TD>
						<TD>&nbsp;<%=PageViewUtil.toHtml(currPurchase.getPropertyAsString("CONTACT"))%></TD>
					</TR>
					

					<TR bgcolor="#F6F6F6">
						<TD>CONTACTPHONE</TD>
						<TD>&nbsp;<%=PageViewUtil.toHtml(currPurchase.getPropertyAsString("CONTACTPHONE"))%></TD>
					</TR>
					

					<TR bgcolor="#F6F6F6">
						<TD>EMAIL</TD>
						<TD>&nbsp;<%=PageViewUtil.toHtml(currPurchase.getPropertyAsString("EMAIL"))%></TD>
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