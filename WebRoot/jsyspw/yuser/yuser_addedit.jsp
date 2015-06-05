<%--
/** Title:			yuser_addedit.jsp
 *  Description:
 *		YUser������޸�ҳ��
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
 *		see yuser_addedit.xml
 *
 */
--%>

<%@ page contentType="text/html;charset=UTF-8" pageEncoding="GBK"
	errorPage="../include/error.jsp"%>
<!------- WCM IMPORTS BEGIN ------------>
<%@ page import="com.trs.jsyspw.YUser" %>
<%@ page import="com.trs.jsyspw.YUsers" %>
<%@ page import="com.trs.infra.util.CMyDateTime" %>
<%@ page import="com.trs.presentation.util.PageViewUtil" %>
<!------- WCM IMPORTS END ------------>

<!--- ҳ��״̬�趨����¼У�顢������ȡ��������public_server.jsp�� --->
<%@include file="../include/public_server.jsp"%>
<%!boolean IS_DEBUG = false;%>

<%
//4.��ʼ��(��ȡ����)
	int nYUserId = currRequestHelper.getInt("YUserId", 0);
	YUser currYUser = null;
	if(nYUserId > 0){
		currYUser = YUser.findById(nYUserId);
		if(currYUser == null){
			throw new WCMException(ExceptionNumber.ERR_OBJ_NOTFOUND, "��ȡIDΪ["+nYUserId+"]��YUserʧ�ܣ�");
		}
	}else{//nYUserId==0 create a new group
		currYUser = YUser.createNewInstance();
	}
//5.Ȩ��У��

//6.ҵ�����
	
//7.����
	out.clear();
%>

<HTML>
<HEAD>
<META http-equiv="Content-Type" content="text/html; charset=UTF-8">
<TITLE>TRS WCM 5.2 ����޸�YUser</TITLE>
<BASE TARGET="_self">
<LINK href="../style/style.css" rel="stylesheet" type="text/css">
<%@include file="../include/public_client_addedit.jsp"%>
<SCRIPT LANGUAGE="JavaScript">
function submitForm(){
	var frmData = document.frmData;
	WCMAction.doPost(frmData, document.frmAction);	
}

function resetForm(){
	var frm = document.all("frmData");
	frm.reset();
}
</SCRIPT>

</HEAD>

<BODY>
<FORM NAME="frmAction" ID="frmAction" METHOD=POST
	ACTION="./yuser_addedit_dowith.jsp" style="margin-top:0"><%=currRequestHelper.toHTMLHidden()%>
<INPUT TYPE="hidden" NAME="ObjectXML" Value=""></FORM>
<TABLE width="100%" height="100%" border="0" cellpadding="0"
	cellspacing="0">
	<TR>
		<TD height="25"><SCRIPT src="../js/CWCMDialogHead.js"></SCRIPT> <SCRIPT
			LANGUAGE="JavaScript">
		WCMDialogHead.draw("���/�޸�YUser");
	</SCRIPT></TD>
	</TR>
	<TR>
		<TD align="center" valign="top" class="tanchu_content_td">

		<FORM NAME="frmData" ID="frmData" onSubmit="return false;"><INPUT
			TYPE="hidden" name="YUserId" value="<%=nYUserId%>">
		<TABLE width="100%" border="0" cellspacing="0" cellpadding="10">
			<TR>
				<TD class="tanchu_content">
				<fieldset style="padding:5px"><legend><b>[��������]</b></legend>
					<TABLE width="100%" border="0" cellspacing="2" cellpadding="0">
						<!-- ��ע���ڴ��޸���Ӧ�ֶ�����addeditҳ����ֶ���������ö������ݱ��ֶ������Ӧ -->
						
						<TR>
							<TD width="60" align="left">�û�����</TD>
							<TD><INPUT name="USERNAME" type="text" style="width:250px" elname="�û�������" pattern="string" not_null="0" value="<%=PageViewUtil.toHtml(currYUser.getUsername())%>"><span class="font_red">*</span></TD>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">���룺</TD>
							<TD><INPUT name="PASSWORD" type="text" style="width:250px" elname="��������" pattern="string" not_null="0" value="<%=PageViewUtil.toHtml(currYUser.getPassword())%>"><span class="font_red">*</span></TD>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">�ǳƣ�</TD>
							<TD><INPUT name="NICKNAME" type="text" style="width:250px" elname="�ǳ�����" pattern="string" not_null="0" value="<%=PageViewUtil.toHtml(currYUser.getNickname())%>"><span class="font_red">*</span></TD>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">�Ա�</TD>
							<TD><INPUT name="SEX" type="text" style="width:250px" elname="�Ա�����" pattern="string" not_null="0" value="<%=PageViewUtil.toHtml(currYUser.getSex())%>"><span class="font_red">*</span></TD>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">�û�״̬0��������1����ͣ�ã�</TD>
							<TD><INPUT name="SATATUS" type="text" style="width:100px" elname="�û�״̬0��������1����ͣ������" pattern="integer" not_null="0" value="<%=currYUser.getSatatus()%>"><span class="font_red">*</span></TD>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

					</TABLE>
				</fieldset>
				</TD>
			</TR>
			<TR>
				<TD align="center">
				<script src="../js/CTRSButton.js"></script> 
					<script>
						//����һ��TYPE_ROMANTIC_BUTTON��ť
						var oTRSButtons		= new CTRSButtons();
						
						oTRSButtons.cellSpacing	= "0";
						oTRSButtons.nType	= TYPE_ROMANTIC_BUTTON;

						oTRSButtons.addTRSButton("ȷ��", "submitForm()");
						oTRSButtons.addTRSButton("����", "resetForm()");
						oTRSButtons.addTRSButton("ȡ��", "window.close();");
						
						oTRSButtons.draw();	
					</script>
				</TD>
			</TR>
		</TABLE>
		</FORM>
		</TD>
	</TR>
</TABLE>
</BODY>
</HTML>