<%--
/** Title:			purchase_list.jsp
 *  Description:
 *		Purchase�б�ҳ��
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
 *		see purchase_list.xml
 *
 */
--%>

<%@ page contentType="text/html;charset=UTF-8" pageEncoding="GBK"
	errorPage="../include/error.jsp"%>
<!------- WCM IMPORTS BEGIN ------------>
<%@ page import="com.trs.jsyspw.Purchase" %>
<%@ page import="com.trs.jsyspw.Purchases" %>
<%@ page import="com.trs.infra.persistent.WCMFilter"%>
<%@ page import="com.trs.infra.util.CMyString"%>
<%@ page import="com.trs.infra.util.CPager"%>
<%@ page import="com.trs.presentation.util.PageHelper"%>
<%@ page import="com.trs.presentation.util.PageViewUtil"%>
<!------- WCM IMPORTS END ------------>
<!--- ҳ��״̬�趨����¼У�顢������ȡ��������public_server.jsp�� --->
<%@include file="../include/public_server_nologin.jsp"%>
<%!boolean IS_DEBUG = false;%>
<%
//4.��ʼ������ȡ���ݣ�
	String sOrderField	= CMyString.showNull(currRequestHelper.getOrderField());
	String sOrderType	= CMyString.showNull(currRequestHelper.getOrderType());

//5.Ȩ��У��

//6.ҵ�����
	String sSelectFields = "PURTITLE,PURNUM,PURTYPE,PURPRICE,PURDESC,PUROVERTIME,CONTACT,CONTACTPHONE,EMAIL";
	WCMFilter filter = new WCMFilter("", currRequestHelper.getWhereSQL(),
	currRequestHelper.getOrderSQL(), sSelectFields);
	
	/**
	  *TODO ��Ϊ���·�ʽ
	  *IChannelService currChannelService = (IChannelService)DreamFactory.createObjectById("IChannelService");
	  *Purchases currPurchases = currChannelService.getPurchases(currChannel, filter);
	**/
	Purchases currPurchases = Purchases.openWCMObjs(loginUser, filter);

	CPager currPager = new CPager(currRequestHelper.getInt("PageItemCount", 20));
	currPager.setItemCount( currPurchases.size() );	
	currPager.setCurrentPageIndex( currRequestHelper.getInt("PageIndex", 1) );

//7.����
	out.clear();
%>
<%-- /*Server Coding End*/ --%>
<HTML>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>TRS WCM 5.2::::::Purchase�б�ҳ��</title>
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
				<TD width="235">Purchase�б�</TD>
				<TD class="navigation_channel_td"><A href="#"
					class="navigation_channel_link">��ҳ</A><SPAN
					class="navigation_channel">&gt;</SPAN><A href="#"
					class="navigation_channel_link">Purchase�б�</A></TD>
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
								oTRSButtons.addTRSButton("�½�", "addNew();", "../images/button_new.gif", "�½�Purchase");
								oTRSButtons.addTRSButton("ɾ��", "deletePurchase(getPurchaseIds());", "../images/button_delete.gif", "ɾ��ѡ����Purchase");
								oTRSButtons.addTRSButton("ˢ��", "CTRSAction_refreshMe();", "../images/button_refresh.gif", "ˢ�µ�ǰҳ��");
								oTRSButtons.draw();	
							</script>
						</TD>
						<TD width="250" nowrap>
							<form name="frmSearch" onsubmit="CTRSAction_doSearch(this);return false;">
								&nbsp; <input type="text" name="SearchValue" size=10 value="<%=PageViewUtil.toHtmlValue(currRequestHelper.getSearchValue())%>">
								<select name="SearchKey">
									<option value="PURTITLE,PURNUM,PURTYPE,PURPRICE,PURDESC,PUROVERTIME,CONTACT,CONTACTPHONE,EMAIL">ȫ��</option>
									
									<option value="PURTITLE">�ɹ�����</option>
									

									<option value="PURNUM">�ɹ�����</option>
									

									<option value="PURTYPE">�ɹ�����</option>
									

									<option value="PURPRICE">�ɹ��۸�����</option>
									

									<option value="PURDESC">�ɹ�����</option>
									

									<option value="PUROVERTIME">�ɹ���ֹ����</option>
									

									<option value="CONTACT">��ϵ��</option>
									

									<option value="CONTACTPHONE">��ϵ�˵绰</option>
									

									<option value="EMAIL">email</option>
									

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
							href="javascript:TRSHTMLElement.selectAllByName('PurchaseIds');">ȫѡ</a></TD>
						<TD bgcolor="#BEE2FF">�鿴</TD>
						
						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("PURTITLE", "�ɹ�����", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("PURNUM", "�ɹ�����", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("PURTYPE", "�ɹ�����", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("PURPRICE", "�ɹ��۸�����", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("PURDESC", "�ɹ�����", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("PUROVERTIME", "�ɹ���ֹ����", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("CONTACT", "��ϵ��", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("CONTACTPHONE", "��ϵ�˵绰", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("EMAIL", "email", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF">�޸�</TD>
					</TR>
		<%
			Purchase currPurchase = null;
			for(int i=currPager.getFirstItemIndex(); i<=currPager.getLastItemIndex(); i++)
			{//begin for
				try{
					currPurchase = (Purchase)currPurchases.getAt(i-1);
				} catch(Exception ex){
					throw new WCMException("��ȡ��["+i+"]ƪPurchaseʧ�ܣ�", ex);
				}
				if(currPurchase == null){
					throw new WCMException("û���ҵ���["+i+"]ƪPurchase��");
				}

				try{
		%>
					<TR class="list_tr" onclick="TRSHTMLTr.onSelectedTR(this);">
						<TD width="40" NOWRAP><INPUT TYPE="checkbox" NAME="PurchaseIds"
							VALUE="<%=currPurchase.getId()%>"><%=i%></TD>
						<TD align=center><A target="_blank"
							href="purchase_show.jsp?PurchaseId=<%=currPurchase.getId()%>">�鿴</A></TD>
						
						<TD><%=PageViewUtil.toHtml(currPurchase.getPurtitle())%></TD>
						

						<TD><%=currPurchase.getPurnum()%></TD>
						

						<TD><%=currPurchase.getPurtype()%></TD>
						

						<TD><%=currPurchase.getPurpricelow()%></TD>
						

						<TD><%=PageViewUtil.toHtml(currPurchase.getPurdesc())%></TD>
						

						<TD><%=currPurchase.getPurovertime()%></TD>
						

						<TD><%=PageViewUtil.toHtml(currPurchase.getContact())%></TD>
						

						<TD><%=PageViewUtil.toHtml(currPurchase.getContactphone())%></TD>
						

						<TD><%=PageViewUtil.toHtml(currPurchase.getEmail())%></TD>
						

						<TD align="center">&nbsp;<A
							onclick="edit(<%=currPurchase.getId()%>);return false;"
							href="#"><IMG border="0" src="../images/icon_edit.gif"></A></TD>
					</TR>
		<%
				} catch(Exception ex){
					throw new WCMException("��ȡ��["+i+"]ƪPurchase������ʧ�ܣ�", ex);
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
	function getPurchaseIds(){
		return TRSHTMLElement.getElementValueByName('PurchaseIds');
	}

	function addNew(){
		var sURL = "purchase_addedit.jsp";

		var oTRSAction = new CTRSAction(sURL);
		var bResult = oTRSAction.doDialogAction(500, 500);
		if(bResult){
			CTRSAction_refreshMe();
		}
	}

	function edit(_nPurchaseId){	
		var oTRSAction = new CTRSAction("purchase_addedit.jsp");
		oTRSAction.setParameter("PurchaseId", _nPurchaseId);
		var bResult = oTRSAction.doDialogAction(500, 500);
		if(bResult){
			CTRSAction_refreshMe();
		}
	}
	
	function deletePurchase(_sPurchaseIds){
		//����У��
		if(_sPurchaseIds == null || _sPurchaseIds.length <= 0){
			alert("��ѡ����Ҫɾ����Purchase!");
			return;
		}
		if(!CTRSAction_confirm("��ȷ����Ҫɾ����ЩPurchase��?"))
			return;
		
		var oTRSAction = new CTRSAction("purchase_delete.jsp");
		oTRSAction.setParameter("PurchaseIds", _sPurchaseIds);		
		oTRSAction.doDialogAction(500, 200);
		CTRSAction_refreshMe();
	}
</script>
</BODY>
</HTML>
<%
//6.��Դ�ͷ�
	currPurchases.clear();
%>