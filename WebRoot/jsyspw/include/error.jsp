<%@ page contentType="text/html;charset=UTF-8" pageEncoding="GBK"
	isErrorPage="true"%>
<!------- WCM IMPORTS BEGIN ------------>
<%@ page import="com.trs.infra.util.CMyString"%>
<%@ page import="com.trs.infra.util.CMyException"%>
<%@ page import="com.trs.infra.util.ExceptionNumber"%>
<%@ page import="com.trs.infra.support.config.ConfigServer"%>
<!------- WCM IMPORTS END ------------>

<%
	response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1
	response.setHeader("Pragma", "no-cache"); //HTTP 1.0
	response.setDateHeader("Expires", -1);
	//prevents caching at the proxy server
	response.setDateHeader("max-age", 0);
	response.setStatus(200);
	response.setHeader("TRSException", "true"); //HTTP 1.0
 
%>

<%
//why@2002-04-27: [1]����վ���Ŀ¼����  [2]���Ӳ����д���
int nErrNo; //������
String sErrType, sErrMsg, sErrDetail; //�������ͣ�������Ϣ����ϸ��Ϣ
String sRootPath = "/wcm"; //վ���Ŀ¼ //why@2002-04-27:��Ҫ��ϵͳ�����ж�ȡ

if (exception instanceof CMyException) {
	CMyException myException = (CMyException) exception;
	nErrNo = myException.getErrNo();
	sErrType = myException.getErrNoMsg();
	sErrMsg = myException.getMyMessage();
	sErrDetail = myException.getStackTraceText();
} else {
	nErrNo = ExceptionNumber.ERR_UNKNOWN;
	sErrType = "δ֪";
	sErrMsg = "δ֪����";
	sErrDetail = CMyException.getStackTraceText(exception);
}
//���쳣��Ϣ�������̨
System.out.println(sErrDetail);
sErrDetail = CMyString.transDisplay(sErrDetail);
//caohui@2003-01-14:����ͬ�쳣�ı��ַ�ʽ
String sUrl = null;
boolean bNotLogin = false;
if (nErrNo == ExceptionNumber.ERR_USER_NOTLOGIN) {//�����û���¼��ʱ������
	response.setStatus(401);
	bNotLogin = true;
	//sUrl = "../include/not_login.htm";
	//request.getRequestDispatcher(sUrl).forward(request,response);
}
String sShowDetailInfo = ConfigServer.getServer().getSysConfigValue("SHOW_ERROR_DETAILINFO", "false");
sErrDetail = "true".equalsIgnoreCase(sShowDetailInfo) ? sErrDetail : "ϵͳ���ִ���";
out.clear();
%>
<HTML>
<HEAD>
<META http-equiv="Content-Type" content="text/html; charset=UTF-8">
<TITLE>TRS WCM 5.2ϵͳ��ʾ��Ϣ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::</TITLE>
<LINK href="../../style/style.css" rel="stylesheet" type="text/css">
<SCRIPT LANGUAGE="JavaScript" src="../../js/CTRSHashtable.js"></script>
<SCRIPT LANGUAGE="JavaScript" src="../../js/CTRSRequestParam.js"></script>
<SCRIPT LANGUAGE="JavaScript" src="../../js/CTRSAction.js"></script>
<SCRIPT src="../../js/CWCMDialogHead.js"></SCRIPT>
<SCRIPT src="../js/com.trs.wcm/FloatPanel.js"></SCRIPT>

<script language="javascript">
	var oTransitionPage = document.all("TransitionPage");
	if(oTransitionPage && oTransitionPage.style){
		oTransitionPage.style.display = "none";
	}
	// resizing the window
	//var m_nRawHeight = document.body.clientHeight;
	//var m_nAdjustedHeight = 250;
	//window.onload = function(){
		//resizeTo(600, 500);
	//}
	
	function copyToClipboard(){
		var sDetailMsg = document.all("msgForCopy").innerText;
		window.clipboardData.setData("Text", sDetailMsg);
		alert("�Ѿ����Ƶ����а��У�");
	}

	function doDispatch(_sUrl){
		window.top.location.href = _sUrl;
	}

	function gotoNotLoginMsg(){
		var sURL = "../include/not_login.htm";
		if(window.location.href.indexOf("/WCMV6/main3")<0 
			&& window.location.href.indexOf("/WCMV6/")>0){
			sURL = "../../include/not_login.htm";
		}
		//window.location.href = sURL;		
		window.top.location.href = sURL;
	}
		
	<%
		if(bNotLogin){
			out.println("gotoNotLoginMsg();");
		}
	%>
	
	var dialogHeight = window.top.dialogHeight;
	var defaultHeight = "400 px";
	var dialogWidth = window.top.dialogWidth;
	var defaultWidth = "500 px";
	function showDetail( ){
		var objSpan = document.getElementById("id_spanErrDetail");
		if( objSpan==null ) return;

		var bCurrShowed = ( objSpan.style.display=="inline" );
		var sDisplay, sTitle;
		if( bCurrShowed ){
			sDisplay = "none";
			sTitle = "��ʾ��ϸ��Ϣ";
			if(window.top.dialogHeight && window.top.dialogHeight > dialogHeight) {
				window.top.dialogHeight = dialogHeight;
			}
			if(window.top.dialogWidth && window.top.dialogWidth > dialogWidth) {
				window.top.dialogWidth = dialogWidth;
			}

			// resizing the window
			//window.resizeTo(document.body.clientWidth, m_nAdjustedHeight);
		}
		else{
			sDisplay = "inline";
			sTitle = "������ϸ��Ϣ";
			if(window.top.dialogHeight && window.top.dialogHeight < defaultWidth) {
				window.top.dialogHeight = defaultHeight;
			}
			if(window.top.dialogWidth && window.top.dialogWidth < defaultWidth) {
				window.top.dialogWidth = defaultWidth;
			}
			// resizing the window
			//window.resizeTo(document.body.clientWidth, m_nRawHeight);
		}

		objSpan.style.display = sDisplay;  //��ʾ������
		
		//�������ӱ���
		var objLink = document.getElementById("id_linkShowDetail");
		if( objLink!=null ) {
			objLink.innerText = sTitle;
		}
	}	

	function getHeight(){
		var spanHeight = (document.body.clientHeight - document.all.tdinfo.clientHeight) - 120;
		if (spanHeight >= 0) return spanHeight;
		else 	return 1;
	}

	window.onload = function(){
		window.onresize = function(){
			try{
				var oSpan = $('id_spanErrDetail');
				if(!oSpan) return;
				oSpan.style.height = getHeight();
				oSpan.style.width = document.body.clientWidth - 50;
			}catch(error){}
		};
	};
</script>
</HEAD>

<BODY width="100%" height="100%" style="overflow:hidden">
<iframe id="refreshFrame" src="" style="display:none;" width=0 height=0></iframe>

<SCRIPT LANGUAGE="JavaScript">
<!--
	function setSessionActive(){
		window.refreshFrame.location.href = "info.html";
		//alert("end");
	}
	window.setTimeout("setSessionActive();", 100000);
//-->
</SCRIPT>

<TABLE width="100%" height="100%" border="0" cellpadding="0"
	cellspacing="0">
	<!--TR>
		<SCRIPT src="../../js/CWCMDialogHead.js"></SCRIPT>
		<TD height="25"><SCRIPT LANGUAGE="JavaScript">
			WCMDialogHead.draw("ϵͳ��Ϣ",true);
		</SCRIPT></TD>
	</TR-->
	<TR> 
		<TD align="center" valign="top" class="tanchu_content_td">
		<div width="100%" bgcolor="a6a6a6">
		<table width="98%" cellpadding="0" cellspacing="1" bgcolor="gray">
			<tr>
				<td valign="top">
				<TABLE id = tbinfo width="100%" height="100%" bgcolor="#FFFFFF" align="center"
					cellpadding="3" cellspacing="0" bordercolor="red" border="0">
					<TR>
						<TD  width="100%" id=tdinfo align="center" valign="top"><IMG src="../images/error.gif" align="absmiddle" valign="top"><SPAN class="font_redbold style7"> ϵͳ��ʾ��Ϣ:&nbsp;&nbsp;<div id="errorMessage"><%=CMyString.transDisplay(sErrMsg)%></div>
						</SPAN> ��<A id="id_linkShowDetail" href="#"
							class="navigation_page_link" onclick="showDetail();return false;">��ʾ��ϸ��Ϣ</A>��</TD>

					</TR>
					<TR bgcolor="#FFFFFF"> 
						<TD align="center" valign="top" width="80%">
						<div id="id_spanErrDetail"
							STYLE="text-align:left;display:none;overflow:auto;overflow-x:scroll;overflow-y:scroll;">
						<UL>
							<li><font color="#000000"><b>�����ţ�</b></font><span id="errorNumber"><%=nErrNo%></span></li>
							<li><font color="#000000"><b>�������ͣ�</b></font><span id="errorType"><%=sErrType%></span></li>
							<li><font color="#000000"><b>��ϸ��Ϣ��</b></font><br>
							</li>
						</UL>
						<pre id="msgForCopy" name="msgForCopy" style='font-family:Arial'>ϵͳ���ִ���<%//=sErrDetail%></pre>
						</div>
						</TD>
					</TR>
				</TABLE>
				</td>
			</tr>
		</table>
		</div>
		</TD>
	</TR>
	<TR>
		<TD>
		<TABLE width="100%" border="0" align="center" cellpadding="0"
			cellspacing="8">
			<TR>
				<TD>
				<DIV align="center"><INPUT type="button" name="btnCopy"
					onclick="copyToClipboard()" value="���Ƶ����а�" class="inputbutton">&nbsp;&nbsp;&nbsp;
				<INPUT type="button" name="btnClose" onclick="FloatPanel.close(); window.close();"
					value="�رմ���" class="inputbutton"></DIV>
				</TD>
			</TR>
		</TABLE>
		</TD>
	</TR>
</TABLE>

</BODY>
</HTML>
