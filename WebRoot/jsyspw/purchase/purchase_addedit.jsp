<%--
/** Title:			purchase_addedit.jsp
 *  Description:
 *		Purchase������޸�ҳ��
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
 *		see purchase_addedit.xml
 *
 */
--%>

<%@ page contentType="text/html;charset=UTF-8" pageEncoding="GBK"
	errorPage="../include/error.jsp"%>
<!------- WCM IMPORTS BEGIN ------------>
<%@ page import="com.trs.jsyspw.Purchase" %>
<%@ page import="com.trs.jsyspw.Purchases" %>
<%@ page import="com.trs.infra.util.CMyDateTime" %>
<%@ page import="com.trs.presentation.util.PageViewUtil" %>
<!------- WCM IMPORTS END ------------>

<!--- ҳ��״̬�趨����¼У�顢������ȡ��������public_server.jsp�� --->
<%@include file="../include/public_server_nologin.jsp"%>
<%!boolean IS_DEBUG = false;%>

<%
//4.��ʼ��(��ȡ����)
	int nPurchaseId = currRequestHelper.getInt("PurchaseId", 0);
	Purchase currPurchase = null;
	if(nPurchaseId > 0){
		currPurchase = Purchase.findById(nPurchaseId);
		if(currPurchase == null){
			throw new WCMException(ExceptionNumber.ERR_OBJ_NOTFOUND, "��ȡIDΪ["+nPurchaseId+"]��Purchaseʧ�ܣ�");
		}
	}else{//nPurchaseId==0 create a new group
		currPurchase = Purchase.createNewInstance();
	}
//5.Ȩ��У��

//6.ҵ�����
	
//7.����
	out.clear();
%>

<HTML>
<HEAD>
<META http-equiv="Content-Type" content="text/html; charset=UTF-8">
<TITLE>TRS WCM 5.2 ����޸�Purchase</TITLE>
<BASE TARGET="_self">
<LINK href="../style/style.css" rel="stylesheet" type="text/css">
<%@include file="../include/public_client_addedit.jsp"%>
<link href="../images/formvalidstyle.css"  rel="stylesheet" type="text/css"/>
<script type="text/javascript" src="../js/demo/js/jquery-1.9.1.min.js"></script>
<script src="../images/jquery_trs_web.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/demo/js/Validform_v5.3.2_min.js"></script>
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
<script type="text/javascript">
$(function(){
	$(".registerform").Validform({
		tiptype:2,
		callback:function(form){
			//submitForm();
			var check=confirm("��ȷ��Ҫ�ύ����");
			if(true){
				//subForm();()
				submitForm();
			}
			
			return false;
	
		}	});
	
	
})
</script>
<script type="text/javascript" src="../js/CTRSCalendar_Obj.js"></script>
<script type="text/javascript" src="../js/CTRSCalendar.js"></script>
<script type="text/javascript" src="../js/calendar_lang/cn_utf8.js"></script>
<style type="text/css"> @import url("../js/calendar_style/calendar-blue.css"); </style>
</HEAD>

<BODY>
<FORM NAME="frmAction" ID="frmAction" METHOD=POST
	ACTION="./purchase_addedit_dowith.jsp" style="margin-top:0"><%=currRequestHelper.toHTMLHidden()%>
<INPUT TYPE="hidden" NAME="ObjectXML" Value=""></FORM>
<TABLE width="100%" height="100%" border="0" cellpadding="0"
	cellspacing="0">
	<TR>
		<TD height="25"><SCRIPT src="../js/CWCMDialogHead.js"></SCRIPT> <SCRIPT
			LANGUAGE="JavaScript">
		WCMDialogHead.draw("���/�޸�Purchase");
	</SCRIPT></TD>
	</TR>
	<TR>
		<TD align="center" valign="top" class="tanchu_content_td">

		<FORM NAME="frmData" ID="frmData" onSubmit="return false;" class="registerform"><INPUT
			TYPE="hidden" name="PurchaseId" value="<%=nPurchaseId%>">
		<TABLE width="100%" border="0" cellspacing="0" cellpadding="10">
			<TR>
				<TD class="tanchu_content">
				<fieldset style="padding:5px"><legend><b>[��������]</b></legend>
					<TABLE width="100%" border="0" cellspacing="2" cellpadding="0">
						<!-- ��ע���ڴ��޸���Ӧ�ֶ�����addeditҳ����ֶ���������ö������ݱ��ֶ������Ӧ -->
						
						<TR>
							<TD width="60" align="left">�ɹ����⣺</TD>
							<TD><INPUT name="PURTITLE" type="text" style="width:250px" nullmsg="���������"  datatype="s"  value="<%=PageViewUtil.toHtml(currPurchase.getPurtitle())%>"></TD>
							<td><div class="Validform_checktip"></div></td>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">�ɹ�������</TD>
							<TD><INPUT name="PURNUM" type="text" style="width:100px" nullmsg="������������"  datatype="n1-5"  value="<%=currPurchase.getPurnum()%>"></TD>
							<td><div class="Validform_checktip"></div></td>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR> 
						

						<TR>
							<TD width="60" align="left">�ɹ����ͣ�</TD>
							<TD><select   datatype="s" nullmsg="��ѡ��ɹ����ͣ�" errormsg="��ѡ��ɹ����ͣ�" name="PURTYPE" style="width:170px" id="formselect">
							  <option value="">��ѡ��ɹ����ͣ�</option>
							  <option value="1">�鷨</option>
							  </select></TD>
							    <td><div class="Validform_checktip"></div></td>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">�ɹ��۸����䣺</TD>
							<TD><INPUT name="PURPRICE" type="text" style="width:100px"  datatype="n" nullmsg="����������ͼ۸�" errormsg="����������ͼ۸�"  value="<%=currPurchase.getPurpricelow()%>">-
							<INPUT name="PURPRICEHIGH" type="text" style="width:100px"  datatype="n" nullmsg="����������߼۸�" errormsg="����������߼۸�"  value="<%=currPurchase.getPurpricelow()%>">
							</TD>
							 <td><div class="Validform_checktip"></div></td>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">�ɹ�������</TD>
							<TD>
							<textarea cols="60" rows="8" name="PURDESC" type="text" datatype="*" nullmsg="����������"  style="width:250px" elname="�ɹ���������" pattern="string" not_null="1" value="<%=PageViewUtil.toHtml(currPurchase.getPurdesc())%>"></textarea></TD>
							 <td><div class="Validform_checktip"></div></td>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">�ɹ���ֹ���ڣ�</TD>
							<TD><SCRIPT LANGUAGE="JavaScript">
<!--
TRSCalendar.drawWithoutTime("PUROVERTIME", "<%=(currPurchase.getPurovertime() != null ? currPurchase.getPurovertime().toString("yyyy-MM-dd") : com.trs.infra.util.CMyDateTime.now().toString("yyyy-MM-dd"))%>");
//-->
</SCRIPT></TD>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">��ϵ�ˣ�</TD>
							<TD><INPUT name="CONTACT" type="text" style="width:250px" datatype="s2-18"  nullmsg="��������ϵ������" value="<%=PageViewUtil.toHtml(currPurchase.getContact())%>"></TD>
							 <td><div class="Validform_checktip"></div></td>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">��ϵ�˵绰��</TD>
							<TD><INPUT name="CONTACTPHONE" type="text" style="width:250px"  datatype="m" nullmsg="�������ֻ�" errormsg="��������ȷ���ֻ����룡"  value="<%=PageViewUtil.toHtml(currPurchase.getContactphone())%>"></TD>
							<td><div class="Validform_checktip"></div></td>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">email��</TD>
							<TD><INPUT name="EMAIL" type="text" style="width:250px"  datatype="e" nullmsg="����������" errormsg="��������ȷ�����䣡"  value="<%=PageViewUtil.toHtml(currPurchase.getEmail())%>"></TD>
							<td><div class="Validform_checktip"></div></td>
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
			 <input type="submit"  value="" style="width:139px; height:38px;border: none; cursor: pointer;" value="�ύ"/>
				</TD>
			</TR>
		</TABLE>
		</FORM>
		</TD>
	</TR>
</TABLE>
</BODY>
</HTML>