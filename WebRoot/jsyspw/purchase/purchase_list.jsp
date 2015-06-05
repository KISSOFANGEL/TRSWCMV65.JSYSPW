<%--
/** Title:			purchase_list.jsp
 *  Description:
 *		Purchase列表页面
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
<!--- 页面状态设定、登录校验、参数获取，都放在public_server.jsp中 --->
<%@include file="../include/public_server_nologin.jsp"%>
<%!boolean IS_DEBUG = false;%>
<%
//4.初始化（获取数据）
	String sOrderField	= CMyString.showNull(currRequestHelper.getOrderField());
	String sOrderType	= CMyString.showNull(currRequestHelper.getOrderType());

//5.权限校验

//6.业务代码
	String sSelectFields = "PURTITLE,PURNUM,PURTYPE,PURPRICE,PURDESC,PUROVERTIME,CONTACT,CONTACTPHONE,EMAIL";
	WCMFilter filter = new WCMFilter("", currRequestHelper.getWhereSQL(),
	currRequestHelper.getOrderSQL(), sSelectFields);
	
	/**
	  *TODO 改为以下方式
	  *IChannelService currChannelService = (IChannelService)DreamFactory.createObjectById("IChannelService");
	  *Purchases currPurchases = currChannelService.getPurchases(currChannel, filter);
	**/
	Purchases currPurchases = Purchases.openWCMObjs(loginUser, filter);

	CPager currPager = new CPager(currRequestHelper.getInt("PageItemCount", 20));
	currPager.setItemCount( currPurchases.size() );	
	currPager.setCurrentPageIndex( currRequestHelper.getInt("PageIndex", 1) );

//7.结束
	out.clear();
%>
<%-- /*Server Coding End*/ --%>
<HTML>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>TRS WCM 5.2::::::Purchase列表页面</title>
<LINK href="../style/style.css" rel="stylesheet" type="text/css">
<!--- 列表页的JavaScript引用、隐藏参数输出，都在public_client_list.jsp中 --->
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
				<TD width="235">Purchase列表</TD>
				<TD class="navigation_channel_td"><A href="#"
					class="navigation_channel_link">主页</A><SPAN
					class="navigation_channel">&gt;</SPAN><A href="#"
					class="navigation_channel_link">Purchase列表</A></TD>
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
								//定义一个单行按钮
								var oTRSButtons = new CTRSButtons();
								oTRSButtons.addTRSButton("新建", "addNew();", "../images/button_new.gif", "新建Purchase");
								oTRSButtons.addTRSButton("删除", "deletePurchase(getPurchaseIds());", "../images/button_delete.gif", "删除选定的Purchase");
								oTRSButtons.addTRSButton("刷新", "CTRSAction_refreshMe();", "../images/button_refresh.gif", "刷新当前页面");
								oTRSButtons.draw();	
							</script>
						</TD>
						<TD width="250" nowrap>
							<form name="frmSearch" onsubmit="CTRSAction_doSearch(this);return false;">
								&nbsp; <input type="text" name="SearchValue" size=10 value="<%=PageViewUtil.toHtmlValue(currRequestHelper.getSearchValue())%>">
								<select name="SearchKey">
									<option value="PURTITLE,PURNUM,PURTYPE,PURPRICE,PURDESC,PUROVERTIME,CONTACT,CONTACTPHONE,EMAIL">全部</option>
									
									<option value="PURTITLE">采购标题</option>
									

									<option value="PURNUM">采购数量</option>
									

									<option value="PURTYPE">采购类型</option>
									

									<option value="PURPRICE">采购价格区间</option>
									

									<option value="PURDESC">采购描述</option>
									

									<option value="PUROVERTIME">采购截止日期</option>
									

									<option value="CONTACT">联系人</option>
									

									<option value="CONTACTPHONE">联系人电话</option>
									

									<option value="EMAIL">email</option>
									

								</select> 
								<input type="submit" value="检索">
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
							href="javascript:TRSHTMLElement.selectAllByName('PurchaseIds');">全选</a></TD>
						<TD bgcolor="#BEE2FF">查看</TD>
						
						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("PURTITLE", "采购标题", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("PURNUM", "采购数量", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("PURTYPE", "采购类型", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("PURPRICE", "采购价格区间", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("PURDESC", "采购描述", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("PUROVERTIME", "采购截止日期", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("CONTACT", "联系人", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("CONTACTPHONE", "联系人电话", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("EMAIL", "email", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF">修改</TD>
					</TR>
		<%
			Purchase currPurchase = null;
			for(int i=currPager.getFirstItemIndex(); i<=currPager.getLastItemIndex(); i++)
			{//begin for
				try{
					currPurchase = (Purchase)currPurchases.getAt(i-1);
				} catch(Exception ex){
					throw new WCMException("获取第["+i+"]篇Purchase失败！", ex);
				}
				if(currPurchase == null){
					throw new WCMException("没有找到第["+i+"]篇Purchase！");
				}

				try{
		%>
					<TR class="list_tr" onclick="TRSHTMLTr.onSelectedTR(this);">
						<TD width="40" NOWRAP><INPUT TYPE="checkbox" NAME="PurchaseIds"
							VALUE="<%=currPurchase.getId()%>"><%=i%></TD>
						<TD align=center><A target="_blank"
							href="purchase_show.jsp?PurchaseId=<%=currPurchase.getId()%>">查看</A></TD>
						
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
					throw new WCMException("获取第["+i+"]篇Purchase的属性失败！", ex);
				}
			}//end for	
		%>
				</TABLE>
				</TD>
			</TR>
			<TR>
				<TD class="navigation_page_td" valign="top">
					<%=PageHelper.PagerHtmlGenerator(currPager, currRequestHelper.getInt("PageItemCount", 20), "文档", "篇")%>
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
		//参数校验
		if(_sPurchaseIds == null || _sPurchaseIds.length <= 0){
			alert("请选择需要删除的Purchase!");
			return;
		}
		if(!CTRSAction_confirm("您确定需要删除这些Purchase吗?"))
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
//6.资源释放
	currPurchases.clear();
%>