<%--
/** Title:			yuser_list.jsp
 *  Description:
 *		YUser�б�ҳ��
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
 *		see yuser_list.xml
 *
 */
--%>

<%@ page contentType="text/html;charset=UTF-8" pageEncoding="GBK"
	errorPage="../include/error.jsp"%>
<!------- WCM IMPORTS BEGIN ------------>
<%@ page import="com.trs.jsyspw.YUser" %>
<%@ page import="com.trs.jsyspw.YUsers" %>
<%@ page import="com.trs.infra.persistent.WCMFilter"%>
<%@ page import="com.trs.infra.util.CMyString"%>
<%@ page import="com.trs.infra.util.CPager"%>
<%@ page import="com.trs.presentation.util.PageHelper"%>
<%@ page import="com.trs.presentation.util.PageViewUtil"%>
<!------- WCM IMPORTS END ------------>
<!--- ҳ��״̬�趨����¼У�顢������ȡ��������public_server.jsp�� --->
<%@include file="../include/public_server.jsp"%>
<%!boolean IS_DEBUG = false;%>
<%
//4.��ʼ������ȡ���ݣ�
	String sOrderField	= CMyString.showNull(currRequestHelper.getOrderField());
	String sOrderType	= CMyString.showNull(currRequestHelper.getOrderType());

//5.Ȩ��У��

//6.ҵ�����
	String sSelectFields = "USERNAME,NICKNAME,SEX,SATATUS";
	WCMFilter filter = new WCMFilter("", currRequestHelper.getWhereSQL(),
	currRequestHelper.getOrderSQL(), sSelectFields);
	
	/**
	  *TODO ��Ϊ���·�ʽ
	  *IChannelService currChannelService = (IChannelService)DreamFactory.createObjectById("IChannelService");
	  *YUsers currYUsers = currChannelService.getYUsers(currChannel, filter);
	**/
	YUsers currYUsers = YUsers.openWCMObjs(loginUser, filter);

	CPager currPager = new CPager(currRequestHelper.getInt("PageItemCount", 20));
	currPager.setItemCount( currYUsers.size() );	
	currPager.setCurrentPageIndex( currRequestHelper.getInt("PageIndex", 1) );

//7.����
	out.clear();
%>
<%-- /*Server Coding End*/ --%>
<HTML>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>TRS WCM 5.2::::::YUser�б�ҳ��</title>
<LINK href="../style/style.css" rel="stylesheet" type="text/css">
<!--- �б�ҳ��JavaScript���á����ز������������public_client_list.jsp�� --->
<%@include file="../include/public_client_list.jsp"%>
</head>
<BODY topmargin="0" leftmargin="0" style="margin:5px">

<TABLE width="100%" height="100%" border="0" cellpadding="0"
	cellspacing="1" class="list_table">
	<TR>
		<TD height="26" class="head_td">
		<TABLE width="100%" height="26" border="0" cellpadding="0"
			cellspacing="0">
			<TR>
				<TD width="24"><IMG src="../images/bite-blue-open.gif" width="24"
					height="24"></TD>
				<TD width="235">YUser�б�</TD>
				<TD class="navigation_channel_td"><A href="#"
					class="navigation_channel_link">��ҳ</A><SPAN
					class="navigation_channel">&gt;</SPAN><A href="#"
					class="navigation_channel_link">YUser�б�</A></TD>
				<TD width="28">&nbsp;</TD>
			</TR>
		</TABLE>
		</TD>
	</TR>
	<TR>
		<TD valign="top">
		<TABLE width="100%" border="0" cellpadding="2" height="100%"
			cellspacing="0" bgcolor="#FFFFFF">
			<TR>
				<TD height="25">
				<TABLE width="100%" border="0" cellspacing="0" cellpadding="0">
					<TR>
						<TD align="left" valign="top">
							<script>
								//����һ�����а�ť
								var oTRSButtons = new CTRSButtons();
								oTRSButtons.addTRSButton("�½�", "addNew();", "../images/button_new.gif", "�½�YUser");
								oTRSButtons.addTRSButton("ɾ��", "deleteYUser(getYUserIds());", "../images/button_delete.gif", "ɾ��ѡ����YUser");
								oTRSButtons.addTRSButton("ˢ��", "CTRSAction_refreshMe();", "../images/button_refresh.gif", "ˢ�µ�ǰҳ��");
								oTRSButtons.draw();	
							</script>
						</TD>
						<TD width="250" nowrap>
							<form name="frmSearch" onsubmit="CTRSAction_doSearch(this);return false;">
								&nbsp; <input type="text" name="SearchValue" size=10 value="<%=PageViewUtil.toHtmlValue(currRequestHelper.getSearchValue())%>">
								<select name="SearchKey">
									<option value="USERNAME,PASSWORD,NICKNAME,SEX,SATATUS">ȫ��</option>
									
									<option value="USERNAME">�û���</option>
									

									<option value="PASSWORD">����</option>
									

									<option value="NICKNAME">�ǳ�</option>
									

									<option value="SEX">�Ա�</option>
									

									<option value="SATATUS">�û�״̬0��������1����ͣ��</option>
									

								</select> 
								<input type="submit" value="����">
							</form>
						</TD>						
						<script>
							document.frmSearch.SearchKey.value = "<%=currRequestHelper.getSearchKey()%>";
						</script>
					</TR>
				</TABLE>
				</TD>
			</TR>
			<TR>
				<TD align="left" valign="top" height="20">
				<TABLE width="100%" border="0" cellpadding="0" cellspacing="1"
					class="list_table">
					<TR bgcolor="#BEE2FF" class="list_th">
						<TD width="40" height="20" NOWRAP><a
							href="javascript:TRSHTMLElement.selectAllByName('YUserIds');">ȫѡ</a></TD>
						<TD bgcolor="#BEE2FF">�鿴</TD>
						
						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("USERNAME", "�û���", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("NICKNAME", "�ǳ�", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("SEX", "�Ա�", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("SATATUS", "�û�״̬0��������1����ͣ��", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF">�޸�</TD>
					</TR>
		<%
			YUser currYUser = null;
			for(int i=currPager.getFirstItemIndex(); i<=currPager.getLastItemIndex(); i++)
			{//begin for
				try{
					currYUser = (YUser)currYUsers.getAt(i-1);
				} catch(Exception ex){
					throw new WCMException("��ȡ��["+i+"]ƪYUserʧ�ܣ�", ex);
				}
				if(currYUser == null){
					throw new WCMException("û���ҵ���["+i+"]ƪYUser��");
				}

				try{
		%>
					<TR class="list_tr" onclick="TRSHTMLTr.onSelectedTR(this);">
						<TD width="40" NOWRAP><INPUT TYPE="checkbox" NAME="YUserIds"
							VALUE="<%=currYUser.getId()%>"><%=i%></TD>
						<TD align=center><A target="_blank"
							href="yuser_show.jsp?YUserId=<%=currYUser.getId()%>">�鿴</A></TD>
						
						<TD><%=PageViewUtil.toHtml(currYUser.getUsername())%></TD>
						

						<TD><%=PageViewUtil.toHtml(currYUser.getNickname())%></TD>
						

						<TD><%=PageViewUtil.toHtml(currYUser.getSex())%></TD>
						

						<TD><%=currYUser.getSatatus()%></TD>
						

						<TD align="center">&nbsp;<A
							onclick="edit(<%=currYUser.getId()%>);return false;"
							href="#"><IMG border="0" src="../images/icon_edit.gif"></A></TD>
					</TR>
		<%
				} catch(Exception ex){
					throw new WCMException("��ȡ��["+i+"]ƪYUser������ʧ�ܣ�", ex);
				}
			}//end for	
		%>
				</TABLE>
				</TD>
			</TR>
			<TR>
				<TD class="navigation_page_td" valign="top">
					<%=PageHelper.PagerHtmlGenerator(currPager, currRequestHelper.getInt("PageItemCount", 20), "�ĵ�", "ƪ")%>
				</TD>
			</TR>
		</TABLE>
		</TD>
	</TR>
</TABLE>
<script>
	function getYUserIds(){
		return TRSHTMLElement.getElementValueByName('YUserIds');
	}

	function addNew(){
		var sURL = "yuser_addedit.jsp";

		var oTRSAction = new CTRSAction(sURL);
		var bResult = oTRSAction.doDialogAction(500, 500);
		if(bResult){
			CTRSAction_refreshMe();
		}
	}

	function edit(_nYUserId){	
		var oTRSAction = new CTRSAction("yuser_addedit.jsp");
		oTRSAction.setParameter("YUserId", _nYUserId);
		var bResult = oTRSAction.doDialogAction(500, 500);
		if(bResult){
			CTRSAction_refreshMe();
		}
	}
	
	function deleteYUser(_sYUserIds){
		//����У��
		if(_sYUserIds == null || _sYUserIds.length <= 0){
			alert("��ѡ����Ҫɾ����YUser!");
			return;
		}
		if(!CTRSAction_confirm("��ȷ����Ҫɾ����ЩYUser��?"))
			return;
		
		var oTRSAction = new CTRSAction("yuser_delete.jsp");
		oTRSAction.setParameter("YUserIds", _sYUserIds);		
		oTRSAction.doDialogAction(500, 200);
		CTRSAction_refreshMe();
	}
</script>
</BODY>
</HTML>
<%
//6.��Դ�ͷ�
	currYUsers.clear();
%>