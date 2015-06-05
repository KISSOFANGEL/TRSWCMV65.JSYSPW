<%--
/** Title:			purchase_addedit.jsp
 *  Description:
 *		Purchase的添加修改页面
 *  Copyright: 		www.trs.com.cn
 *  Company: 		TRS Info. Ltd.
 *  Author:			wangjiang
 *  Created:		2014-10-31 10:46:29
 *  Vesion:			1.0
 *  Last EditTime:	2014-10-31 / 2014-10-31
 *	Update Logs:
 *		wangjiang@2014-10-31 产生此文件
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

<!--- 页面状态设定、登录校验、参数获取，都放在public_server.jsp中 --->
<%@include file="../include/public_server_nologin.jsp"%>
<%!boolean IS_DEBUG = false;%>

<%
//4.初始化(获取数据)
	int nPurchaseId = currRequestHelper.getInt("PurchaseId", 0);
	Purchase currPurchase = null;
	if(nPurchaseId > 0){
		currPurchase = Purchase.findById(nPurchaseId);
		if(currPurchase == null){
			throw new WCMException(ExceptionNumber.ERR_OBJ_NOTFOUND, "获取ID为["+nPurchaseId+"]的Purchase失败！");
		}
	}else{//nPurchaseId==0 create a new group
		currPurchase = Purchase.createNewInstance();
	}
//5.权限校验

//6.业务代码
	
//7.结束
	out.clear();
%>

<HTML>
<HEAD>
<META http-equiv="Content-Type" content="text/html; charset=UTF-8">
<TITLE>TRS WCM 5.2 添加修改Purchase</TITLE>
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
			var check=confirm("您确定要提交表单吗？");
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
		WCMDialogHead.draw("添加/修改Purchase");
	</SCRIPT></TD>
	</TR>
	<TR>
		<TD align="center" valign="top" class="tanchu_content_td">

		<FORM NAME="frmData" ID="frmData" onSubmit="return false;" class="registerform"><INPUT
			TYPE="hidden" name="PurchaseId" value="<%=nPurchaseId%>">
		<TABLE width="100%" border="0" cellspacing="0" cellpadding="10">
			<TR>
				<TD class="tanchu_content">
				<fieldset style="padding:5px"><legend><b>[基本属性]</b></legend>
					<TABLE width="100%" border="0" cellspacing="2" cellpadding="0">
						<!-- 请注意在此修改相应字段名，addedit页面的字段名必须与该对象数据表字段名相对应 -->
						
						<TR>
							<TD width="60" align="left">采购标题：</TD>
							<TD><INPUT name="PURTITLE" type="text" style="width:250px" nullmsg="请输入标题"  datatype="s"  value="<%=PageViewUtil.toHtml(currPurchase.getPurtitle())%>"></TD>
							<td><div class="Validform_checktip"></div></td>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">采购数量：</TD>
							<TD><INPUT name="PURNUM" type="text" style="width:100px" nullmsg="请输入求购数量"  datatype="n1-5"  value="<%=currPurchase.getPurnum()%>"></TD>
							<td><div class="Validform_checktip"></div></td>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR> 
						

						<TR>
							<TD width="60" align="left">采购类型：</TD>
							<TD><select   datatype="s" nullmsg="请选择采购类型！" errormsg="请选择采购类型！" name="PURTYPE" style="width:170px" id="formselect">
							  <option value="">请选择采购类型！</option>
							  <option value="1">书法</option>
							  </select></TD>
							    <td><div class="Validform_checktip"></div></td>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">采购价格区间：</TD>
							<TD><INPUT name="PURPRICE" type="text" style="width:100px"  datatype="n" nullmsg="请输入求购最低价格" errormsg="请输入求购最低价格"  value="<%=currPurchase.getPurpricelow()%>">-
							<INPUT name="PURPRICEHIGH" type="text" style="width:100px"  datatype="n" nullmsg="请输入求购最高价格" errormsg="请输入求购最高价格"  value="<%=currPurchase.getPurpricelow()%>">
							</TD>
							 <td><div class="Validform_checktip"></div></td>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">采购描述：</TD>
							<TD>
							<textarea cols="60" rows="8" name="PURDESC" type="text" datatype="*" nullmsg="请输入内容"  style="width:250px" elname="采购描述属性" pattern="string" not_null="1" value="<%=PageViewUtil.toHtml(currPurchase.getPurdesc())%>"></textarea></TD>
							 <td><div class="Validform_checktip"></div></td>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">采购截止日期：</TD>
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
							<TD width="60" align="left">联系人：</TD>
							<TD><INPUT name="CONTACT" type="text" style="width:250px" datatype="s2-18"  nullmsg="请输入联系人姓名" value="<%=PageViewUtil.toHtml(currPurchase.getContact())%>"></TD>
							 <td><div class="Validform_checktip"></div></td>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">联系人电话：</TD>
							<TD><INPUT name="CONTACTPHONE" type="text" style="width:250px"  datatype="m" nullmsg="请输入手机" errormsg="请输入正确的手机号码！"  value="<%=PageViewUtil.toHtml(currPurchase.getContactphone())%>"></TD>
							<td><div class="Validform_checktip"></div></td>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">email：</TD>
							<TD><INPUT name="EMAIL" type="text" style="width:250px"  datatype="e" nullmsg="请输入邮箱" errormsg="请输入正确的邮箱！"  value="<%=PageViewUtil.toHtml(currPurchase.getEmail())%>"></TD>
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
			 <input type="submit"  value="" style="width:139px; height:38px;border: none; cursor: pointer;" value="提交"/>
				</TD>
			</TR>
		</TABLE>
		</FORM>
		</TD>
	</TR>
</TABLE>
</BODY>
</HTML>