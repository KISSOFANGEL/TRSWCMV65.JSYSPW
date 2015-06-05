<%--
/** Title:			appraisal_addedit.jsp
 *  Description:
 *		Appraisal������޸�ҳ��
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
 *		see appraisal_addedit.xml
 *
 */
--%>

<%@ page contentType="text/html;charset=UTF-8" pageEncoding="GBK"
	errorPage="../include/error.jsp"%>
<!------- WCM IMPORTS BEGIN ------------>
<%@ page import="com.trs.jsyspw.Appraisal" %>
<%@ page import="com.trs.jsyspw.Appraisals" %>
<%@ page import="com.trs.infra.util.CMyDateTime" %>
<%@ page import="com.trs.presentation.util.PageViewUtil" %>
<!------- WCM IMPORTS END ------------>

<!--- ҳ��״̬�趨����¼У�顢������ȡ��������public_server.jsp�� --->
<%@include file="../include/public_server.jsp"%>
<%!boolean IS_DEBUG = false;%>

<%
//4.��ʼ��(��ȡ����)
	int nAppraisalId = currRequestHelper.getInt("AppraisalId", 0);
	Appraisal currAppraisal = null;
	if(nAppraisalId > 0){
		currAppraisal = Appraisal.findById(nAppraisalId);
		if(currAppraisal == null){
			throw new WCMException(ExceptionNumber.ERR_OBJ_NOTFOUND, "��ȡIDΪ["+nAppraisalId+"]��Appraisalʧ�ܣ�");
		}
	}else{//nAppraisalId==0 create a new group
		currAppraisal = Appraisal.createNewInstance();
	}
//5.Ȩ��У��

//6.ҵ�����
	
//7.����
	out.clear();
%>

<HTML>
<HEAD>
<META http-equiv="Content-Type" content="text/html; charset=UTF-8">
<TITLE>TRS WCM 5.2 ����޸�Appraisal</TITLE>

<LINK href="../style/style.css" rel="stylesheet" type="text/css">
<%@include file="../include/public_client_addedit_nologin.jsp"%>
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
	ACTION="./appraisal_addedit_dowith.jsp" style="margin-top:0"><%=currRequestHelper.toHTMLHidden()%>
<INPUT TYPE="hidden" NAME="ObjectXML" Value=""></FORM>
<TABLE width="100%" height="100%" border="0" cellpadding="0"
	cellspacing="0">
	<TR>
		<TD height="25"><SCRIPT src="../js/CWCMDialogHead.js"></SCRIPT> <SCRIPT
			LANGUAGE="JavaScript">
		WCMDialogHead.draw("���/�޸�Appraisal");
	</SCRIPT></TD>
	</TR>
	<TR>
		<TD align="center" valign="top" class="tanchu_content_td">

		<FORM NAME="frmData" ID="frmData" onSubmit="return false;"><INPUT
			TYPE="hidden" name="AppraisalId" value="<%=nAppraisalId%>">
		<TABLE width="100%" border="0" cellspacing="0" cellpadding="10">
			<TR>
				<TD class="tanchu_content">
				<fieldset style="padding:5px"><legend><b>[��������]</b></legend>
					<TABLE width="100%" border="0" cellspacing="2" cellpadding="0">
						<!-- ��ע���ڴ��޸���Ӧ�ֶ�����addeditҳ����ֶ���������ö������ݱ��ֶ������Ӧ -->
						
						<TR>
							<TD width="60" align="left">��Ʒ���ƣ�</TD>
							<TD><INPUT name="PRODUCTIONNAME" type="text" style="width:250px" elname="��Ʒ��������" pattern="string" not_null="1" value="<%=PageViewUtil.toHtml(currAppraisal.getProductionname())%>"></TD>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">��Ʒ���ߣ�</TD>
							<TD><INPUT name="PRODUCTIONAUTHOR" type="text" style="width:250px" elname="��Ʒ��������" pattern="string" not_null="1" value="<%=PageViewUtil.toHtml(currAppraisal.getProductionauthor())%>"></TD>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">��Ʒ���</TD>
							<TD><INPUT name="PRODUCTIONTYPE" type="text" style="width:250px" elname="��Ʒ�������" pattern="string" not_null="1" value="<%=PageViewUtil.toHtml(currAppraisal.getProductiontype())%>"></TD>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">������������</TD>
							<TD><INPUT name="OWNER" type="text" style="width:250px" elname="��������������" pattern="string" not_null="1" value="<%=PageViewUtil.toHtml(currAppraisal.getOwner())%>"></TD>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">��Ʒ���ڣ�</TD>
							<TD><INPUT name="PRODUCTDATE" type="text" style="width:250px" elname="��Ʒ��������" pattern="string" not_null="0" value="<%=PageViewUtil.toHtml(currAppraisal.getProductDate())%>"><span class="font_red">*</span></TD>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">�ͼ��ˣ�</TD>
							<TD><INPUT name="AGENT" type="text" style="width:250px" elname="�ͼ�������" pattern="string" not_null="0" value="<%=PageViewUtil.toHtml(currAppraisal.getAgent())%>"><span class="font_red">*</span></TD>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">����Ʒ��飺</TD>
							<TD><INPUT name="INTRODUCTIO" type="text" style="width:250px" elname="����Ʒ�������" pattern="string" not_null="0" value="<%=PageViewUtil.toHtml(currAppraisal.getIntroductio())%>"><span class="font_red">*</span></TD>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">��ע��</TD>
							<TD><INPUT name="REMARKS" type="text" style="width:250px" elname="��ע����" pattern="string" not_null="0" value="<%=PageViewUtil.toHtml(currAppraisal.getRemarks())%>"><span class="font_red">*</span></TD>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">�ͼ��˵绰��</TD>
							<TD><INPUT name="AGENTTEL" type="text" style="width:250px" elname="�ͼ��˵绰����" pattern="string" not_null="0" value="<%=PageViewUtil.toHtml(currAppraisal.getAgentTel())%>"><span class="font_red">*</span></TD>
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