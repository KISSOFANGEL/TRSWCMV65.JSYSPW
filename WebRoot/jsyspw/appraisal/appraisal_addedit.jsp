<%--
/** Title:			appraisal_addedit.jsp
 *  Description:
 *		Appraisal的添加修改页面
 *  Copyright: 		www.trs.com.cn
 *  Company: 		TRS Info. Ltd.
 *  Author:			wangjiang
 *  Created:		2015-05-28 17:09:15
 *  Vesion:			1.0
 *  Last EditTime:	2015-05-28 / 2015-05-28
 *	Update Logs:
 *		wangjiang@2015-05-28 产生此文件
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

<!--- 页面状态设定、登录校验、参数获取，都放在public_server.jsp中 --->
<%@include file="../include/public_server.jsp"%>
<%!boolean IS_DEBUG = false;%>

<%
//4.初始化(获取数据)
	int nAppraisalId = currRequestHelper.getInt("AppraisalId", 0);
	Appraisal currAppraisal = null;
	if(nAppraisalId > 0){
		currAppraisal = Appraisal.findById(nAppraisalId);
		if(currAppraisal == null){
			throw new WCMException(ExceptionNumber.ERR_OBJ_NOTFOUND, "获取ID为["+nAppraisalId+"]的Appraisal失败！");
		}
	}else{//nAppraisalId==0 create a new group
		currAppraisal = Appraisal.createNewInstance();
	}
//5.权限校验

//6.业务代码
	
//7.结束
	out.clear();
%>

<HTML>
<HEAD>
<META http-equiv="Content-Type" content="text/html; charset=UTF-8">
<TITLE>TRS WCM 5.2 添加修改Appraisal</TITLE>

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
		WCMDialogHead.draw("添加/修改Appraisal");
	</SCRIPT></TD>
	</TR>
	<TR>
		<TD align="center" valign="top" class="tanchu_content_td">

		<FORM NAME="frmData" ID="frmData" onSubmit="return false;"><INPUT
			TYPE="hidden" name="AppraisalId" value="<%=nAppraisalId%>">
		<TABLE width="100%" border="0" cellspacing="0" cellpadding="10">
			<TR>
				<TD class="tanchu_content">
				<fieldset style="padding:5px"><legend><b>[基本属性]</b></legend>
					<TABLE width="100%" border="0" cellspacing="2" cellpadding="0">
						<!-- 请注意在此修改相应字段名，addedit页面的字段名必须与该对象数据表字段名相对应 -->
						
						<TR>
							<TD width="60" align="left">作品名称：</TD>
							<TD><INPUT name="PRODUCTIONNAME" type="text" style="width:250px" elname="作品名称属性" pattern="string" not_null="1" value="<%=PageViewUtil.toHtml(currAppraisal.getProductionname())%>"></TD>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">作品作者：</TD>
							<TD><INPUT name="PRODUCTIONAUTHOR" type="text" style="width:250px" elname="作品作者属性" pattern="string" not_null="1" value="<%=PageViewUtil.toHtml(currAppraisal.getProductionauthor())%>"></TD>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">作品类别：</TD>
							<TD><INPUT name="PRODUCTIONTYPE" type="text" style="width:250px" elname="作品类别属性" pattern="string" not_null="1" value="<%=PageViewUtil.toHtml(currAppraisal.getProductiontype())%>"></TD>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">所有人姓名：</TD>
							<TD><INPUT name="OWNER" type="text" style="width:250px" elname="所有人姓名属性" pattern="string" not_null="1" value="<%=PageViewUtil.toHtml(currAppraisal.getOwner())%>"></TD>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">作品日期：</TD>
							<TD><INPUT name="PRODUCTDATE" type="text" style="width:250px" elname="作品日期属性" pattern="string" not_null="0" value="<%=PageViewUtil.toHtml(currAppraisal.getProductDate())%>"><span class="font_red">*</span></TD>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">送鉴人：</TD>
							<TD><INPUT name="AGENT" type="text" style="width:250px" elname="送鉴人属性" pattern="string" not_null="0" value="<%=PageViewUtil.toHtml(currAppraisal.getAgent())%>"><span class="font_red">*</span></TD>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">艺术品简介：</TD>
							<TD><INPUT name="INTRODUCTIO" type="text" style="width:250px" elname="艺术品简介属性" pattern="string" not_null="0" value="<%=PageViewUtil.toHtml(currAppraisal.getIntroductio())%>"><span class="font_red">*</span></TD>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">备注：</TD>
							<TD><INPUT name="REMARKS" type="text" style="width:250px" elname="备注属性" pattern="string" not_null="0" value="<%=PageViewUtil.toHtml(currAppraisal.getRemarks())%>"><span class="font_red">*</span></TD>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">送鉴人电话：</TD>
							<TD><INPUT name="AGENTTEL" type="text" style="width:250px" elname="送鉴人电话属性" pattern="string" not_null="0" value="<%=PageViewUtil.toHtml(currAppraisal.getAgentTel())%>"><span class="font_red">*</span></TD>
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
						//定义一个TYPE_ROMANTIC_BUTTON按钮
						var oTRSButtons		= new CTRSButtons();						
						oTRSButtons.cellSpacing	= "0";
						oTRSButtons.nType	= TYPE_ROMANTIC_BUTTON;
						oTRSButtons.addTRSButton("确定", "submitForm()");
						oTRSButtons.addTRSButton("重填", "resetForm()");
						oTRSButtons.addTRSButton("取消", "window.close();");					
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