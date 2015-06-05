<%--
/** Title:			appraisal_list.jsp
 *  Description:
 *		Appraisal�б�ҳ��
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
 *		see appraisal_list.xml
 *
 */
--%>

<%@ page contentType="text/html;charset=UTF-8" pageEncoding="GBK"
	errorPage="../include/error.jsp"%>
<!------- WCM IMPORTS BEGIN ------------>
<%@ page import="com.trs.jsyspw.Appraisal" %>
<%@ page import="com.trs.jsyspw.Appraisals" %>
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
	String sSelectFields = "PRODUCTIONNAME,PRODUCTIONAUTHOR,PRODUCTIONTYPE,OWNER,PRODUCTDATE,AGENT,AGENTTEL,PICURL";
	WCMFilter filter = new WCMFilter("", currRequestHelper.getWhereSQL(),
	currRequestHelper.getOrderSQL(), sSelectFields);
	
	/**
	  *TODO ��Ϊ���·�ʽ
	  *IChannelService currChannelService = (IChannelService)DreamFactory.createObjectById("IChannelService");
	  *Appraisals currAppraisals = currChannelService.getAppraisals(currChannel, filter);
	**/
	Appraisals currAppraisals = Appraisals.openWCMObjs(loginUser, filter);

	CPager currPager = new CPager(currRequestHelper.getInt("PageItemCount", 20));
	currPager.setItemCount( currAppraisals.size() );	
	currPager.setCurrentPageIndex( currRequestHelper.getInt("PageIndex", 1) );

//7.����
	out.clear();
%>
<%-- /*Server Coding End*/ --%>
<HTML>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>TRS WCM 5.2::::::Appraisal�б�ҳ��</title>
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
				<TD width="235">Appraisal�б�</TD>
				<TD class="navigation_channel_td"><A href="#"
					class="navigation_channel_link">��ҳ</A><SPAN
					class="navigation_channel">&gt;</SPAN><A href="#"
					class="navigation_channel_link">Appraisal�б�</A></TD>
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
								//oTRSButtons.addTRSButton("�½�", "addNew();", "../images/button_new.gif", "�½�Appraisal");
								oTRSButtons.addTRSButton("ɾ��", "deleteAppraisal(getAppraisalIds());", "../images/button_delete.gif", "ɾ��ѡ����Appraisal");
								oTRSButtons.addTRSButton("ˢ��", "CTRSAction_refreshMe();", "../images/button_refresh.gif", "ˢ�µ�ǰҳ��");
								oTRSButtons.draw();	
							</script>
						</TD>
						<%-- <TD width="250" nowrap>
							<form name="frmSearch" onsubmit="CTRSAction_doSearch(this);return false;">
								&nbsp; <input type="text" name="SearchValue" size=10 value="<%=PageViewUtil.toHtmlValue(currRequestHelper.getSearchValue())%>">
								<select name="SearchKey">
									<option value="PRODUCTIONNAME,PRODUCTIONAUTHOR,PRODUCTIONTYPE,OWNER,APPENDIXID,PRODUCTDATE,AGENT,INTRODUCTIO,REMARKS,AGENTTEL">ȫ��</option>
									
									<option value="PRODUCTIONNAME">��Ʒ����</option>
									

									<option value="PRODUCTIONAUTHOR">��Ʒ����</option>
									

									<option value="PRODUCTIONTYPE">��Ʒ���</option>
									

									<option value="OWNER">����������</option>
									

									<option value="APPENDIXID">����id</option>
									

									<option value="PRODUCTDATE">��Ʒ����</option>
									

									<option value="AGENT">�ͼ���</option>
									

									<option value="INTRODUCTIO">����Ʒ���</option>
									

									<option value="REMARKS">��ע</option>
									

									<option value="AGENTTEL">�ͼ��˵绰</option>
									

								</select> 
								<input type="submit" value="����">
							</form>
						</TD>						
						<script>
							document.frmSearch.SearchKey.value = "<%=currRequestHelper.getSearchKey()%>";
						</script> --%>
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
							href="javascript:TRSHTMLElement.selectAllByName('AppraisalIds');">ȫѡ</a></TD>
							<TD bgcolor="#BEE2FF">����ƷͼƬ</TD>
						
						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("PRODUCTIONNAME", "��Ʒ����", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("PRODUCTIONAUTHOR", "��Ʒ����", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("PRODUCTIONTYPE", "��Ʒ���", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("OWNER", "����������", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("PRODUCTDATE", "��Ʒ����", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("AGENT", "�ͼ���", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("AGENTTEL", "�ͼ��˵绰", sOrderField, sOrderType)%></TD>
						

					
					</TR>
		<%
			Appraisal currAppraisal = null;
			for(int i=currPager.getFirstItemIndex(); i<=currPager.getLastItemIndex(); i++)
			{//begin for
				try{
					currAppraisal = (Appraisal)currAppraisals.getAt(i-1);
				} catch(Exception ex){
					throw new WCMException("��ȡ��["+i+"]ƪAppraisalʧ�ܣ�", ex);
				}
				if(currAppraisal == null){
					throw new WCMException("û���ҵ���["+i+"]ƪAppraisal��");
				}

				try{
		%>
					<TR class="list_tr" onclick="TRSHTMLTr.onSelectedTR(this);">
						<TD width="40" NOWRAP><INPUT TYPE="checkbox" NAME="AppraisalIds"
							VALUE="<%=currAppraisal.getId()%>"><%=i%></TD>
						<%-- <TD align=center><A target="_blank"
							href="appraisal_show.jsp?AppraisalId=<%=currAppraisal.getId()%>">�鿴</A></TD>
						 --%>
						 <td><img width="80" height="80" src="/<%=PageViewUtil.toHtml(currAppraisal.getPicurl())%>"/></td>
						<TD><%=PageViewUtil.toHtml(currAppraisal.getProductionname())%></TD>
						

						<TD><%=PageViewUtil.toHtml(currAppraisal.getProductionauthor())%></TD>
						

						<TD><%=PageViewUtil.toHtml(currAppraisal.getProductiontype())%></TD>
						

						<TD><%=PageViewUtil.toHtml(currAppraisal.getOwner())%></TD>
						

						<TD><%=PageViewUtil.toHtml(currAppraisal.getProductDate())%></TD>
						

						<TD><%=PageViewUtil.toHtml(currAppraisal.getAgent())%></TD>
						

						<TD><%=PageViewUtil.toHtml(currAppraisal.getAgentTel())%></TD>
						
					
					</TR>
		<%
				} catch(Exception ex){
					throw new WCMException("��ȡ��["+i+"]ƪAppraisal������ʧ�ܣ�", ex);
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
	function getAppraisalIds(){
		return TRSHTMLElement.getElementValueByName('AppraisalIds');
	}

	function addNew(){
		var sURL = "appraisal_addedit.jsp";

		var oTRSAction = new CTRSAction(sURL);
		var bResult = oTRSAction.doDialogAction(700, 700);
		if(bResult){
			CTRSAction_refreshMe();
		}
	}

	function edit(_nAppraisalId){	
		var oTRSAction = new CTRSAction("appraisal_addedit.jsp");
		oTRSAction.setParameter("AppraisalId", _nAppraisalId);
		var bResult = oTRSAction.doDialogAction(500, 500);
		if(bResult){
			CTRSAction_refreshMe();
		}
	}
	
	function deleteAppraisal(_sAppraisalIds){
		//����У��
		if(_sAppraisalIds == null || _sAppraisalIds.length <= 0){
			alert("��ѡ����Ҫɾ����Appraisal!");
			return;
		}
		if(!CTRSAction_confirm("��ȷ����Ҫɾ����ЩAppraisal��?"))
			return;
		
		var oTRSAction = new CTRSAction("appraisal_delete.jsp");
		oTRSAction.setParameter("AppraisalIds", _sAppraisalIds);		
		oTRSAction.doDialogAction(500, 200);
		CTRSAction_refreshMe();
	}
</script>
</BODY>
</HTML>
<%
//6.��Դ�ͷ�
	currAppraisals.clear();
%>