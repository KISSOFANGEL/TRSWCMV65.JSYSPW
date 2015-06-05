<%--
/** Title:			yuser_addedit.jsp
 *  Description:
 *		YUser的添加修改页面
 *  Copyright: 		www.trs.com.cn
 *  Company: 		TRS Info. Ltd.
 *  Author:			trs wcm
 *  Created:		2015-06-03 14:39:59
 *  Vesion:			1.0
 *  Last EditTime:	2015-06-03 / 2015-06-03
 *	Update Logs:
 *		trs wcm@2015-06-03 产生此文件
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

<!--- 页面状态设定、登录校验、参数获取，都放在public_server.jsp中 --->
<%@include file="../include/public_server.jsp"%>
<%!boolean IS_DEBUG = false;%>

<%
//4.初始化(获取数据)
	int nYUserId = currRequestHelper.getInt("YUserId", 0);
	YUser currYUser = null;
	if(nYUserId > 0){
		currYUser = YUser.findById(nYUserId);
		if(currYUser == null){
			throw new WCMException(ExceptionNumber.ERR_OBJ_NOTFOUND, "获取ID为["+nYUserId+"]的YUser失败！");
		}
	}else{//nYUserId==0 create a new group
		currYUser = YUser.createNewInstance();
	}
//5.权限校验

//6.业务代码
	
//7.结束
	out.clear();
%>

<HTML>
<HEAD>
<META http-equiv="Content-Type" content="text/html; charset=UTF-8">
<TITLE>TRS WCM 5.2 添加修改YUser</TITLE>
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
		WCMDialogHead.draw("添加/修改YUser");
	</SCRIPT></TD>
	</TR>
	<TR>
		<TD align="center" valign="top" class="tanchu_content_td">

		<FORM NAME="frmData" ID="frmData" onSubmit="return false;"><INPUT
			TYPE="hidden" name="YUserId" value="<%=nYUserId%>">
		<TABLE width="100%" border="0" cellspacing="0" cellpadding="10">
			<TR>
				<TD class="tanchu_content">
				<fieldset style="padding:5px"><legend><b>[基本属性]</b></legend>
					<TABLE width="100%" border="0" cellspacing="2" cellpadding="0">
						<!-- 请注意在此修改相应字段名，addedit页面的字段名必须与该对象数据表字段名相对应 -->
						
						<TR>
							<TD width="60" align="left">用户名：</TD>
							<TD><INPUT name="USERNAME" type="text" style="width:250px" elname="用户名属性" pattern="string" not_null="0" value="<%=PageViewUtil.toHtml(currYUser.getUsername())%>"><span class="font_red">*</span></TD>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">密码：</TD>
							<TD><INPUT name="PASSWORD" type="text" style="width:250px" elname="密码属性" pattern="string" not_null="0" value="<%=PageViewUtil.toHtml(currYUser.getPassword())%>"><span class="font_red">*</span></TD>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">昵称：</TD>
							<TD><INPUT name="NICKNAME" type="text" style="width:250px" elname="昵称属性" pattern="string" not_null="0" value="<%=PageViewUtil.toHtml(currYUser.getNickname())%>"><span class="font_red">*</span></TD>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">性别：</TD>
							<TD><INPUT name="SEX" type="text" style="width:250px" elname="性别属性" pattern="string" not_null="0" value="<%=PageViewUtil.toHtml(currYUser.getSex())%>"><span class="font_red">*</span></TD>
						</TR>
						<TR>
							<TD colspan="2"  height="10">&nbsp;</TD>
						</TR>
						

						<TR>
							<TD width="60" align="left">用户状态0：正常；1：已停用：</TD>
							<TD><INPUT name="SATATUS" type="text" style="width:100px" elname="用户状态0：正常；1：已停用属性" pattern="integer" not_null="0" value="<%=currYUser.getSatatus()%>"><span class="font_red">*</span></TD>
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