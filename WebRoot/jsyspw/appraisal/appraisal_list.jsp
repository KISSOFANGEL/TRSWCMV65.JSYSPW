<%--
/** Title:			appraisal_list.jsp
 *  Description:
 *		Appraisal列表页面
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
<!--- 页面状态设定、登录校验、参数获取，都放在public_server.jsp中 --->
<%@include file="../include/public_server.jsp"%>
<%!boolean IS_DEBUG = false;%>
<%
//4.初始化（获取数据）
	String sOrderField	= CMyString.showNull(currRequestHelper.getOrderField());
	String sOrderType	= CMyString.showNull(currRequestHelper.getOrderType());

//5.权限校验

//6.业务代码
	String sSelectFields = "PRODUCTIONNAME,PRODUCTIONAUTHOR,PRODUCTIONTYPE,OWNER,PRODUCTDATE,AGENT,AGENTTEL,PICURL";
	WCMFilter filter = new WCMFilter("", currRequestHelper.getWhereSQL(),
	currRequestHelper.getOrderSQL(), sSelectFields);
	
	/**
	  *TODO 改为以下方式
	  *IChannelService currChannelService = (IChannelService)DreamFactory.createObjectById("IChannelService");
	  *Appraisals currAppraisals = currChannelService.getAppraisals(currChannel, filter);
	**/
	Appraisals currAppraisals = Appraisals.openWCMObjs(loginUser, filter);

	CPager currPager = new CPager(currRequestHelper.getInt("PageItemCount", 20));
	currPager.setItemCount( currAppraisals.size() );	
	currPager.setCurrentPageIndex( currRequestHelper.getInt("PageIndex", 1) );

//7.结束
	out.clear();
%>
<%-- /*Server Coding End*/ --%>
<HTML>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>TRS WCM 5.2::::::Appraisal列表页面</title>
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
				<TD width="235">Appraisal列表</TD>
				<TD class="navigation_channel_td"><A href="#"
					class="navigation_channel_link">主页</A><SPAN
					class="navigation_channel">&gt;</SPAN><A href="#"
					class="navigation_channel_link">Appraisal列表</A></TD>
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
								//oTRSButtons.addTRSButton("新建", "addNew();", "../images/button_new.gif", "新建Appraisal");
								oTRSButtons.addTRSButton("删除", "deleteAppraisal(getAppraisalIds());", "../images/button_delete.gif", "删除选定的Appraisal");
								oTRSButtons.addTRSButton("刷新", "CTRSAction_refreshMe();", "../images/button_refresh.gif", "刷新当前页面");
								oTRSButtons.draw();	
							</script>
						</TD>
						<%-- <TD width="250" nowrap>
							<form name="frmSearch" onsubmit="CTRSAction_doSearch(this);return false;">
								&nbsp; <input type="text" name="SearchValue" size=10 value="<%=PageViewUtil.toHtmlValue(currRequestHelper.getSearchValue())%>">
								<select name="SearchKey">
									<option value="PRODUCTIONNAME,PRODUCTIONAUTHOR,PRODUCTIONTYPE,OWNER,APPENDIXID,PRODUCTDATE,AGENT,INTRODUCTIO,REMARKS,AGENTTEL">全部</option>
									
									<option value="PRODUCTIONNAME">作品名称</option>
									

									<option value="PRODUCTIONAUTHOR">作品作者</option>
									

									<option value="PRODUCTIONTYPE">作品类别</option>
									

									<option value="OWNER">所有人姓名</option>
									

									<option value="APPENDIXID">附件id</option>
									

									<option value="PRODUCTDATE">作品日期</option>
									

									<option value="AGENT">送鉴人</option>
									

									<option value="INTRODUCTIO">艺术品简介</option>
									

									<option value="REMARKS">备注</option>
									

									<option value="AGENTTEL">送鉴人电话</option>
									

								</select> 
								<input type="submit" value="检索">
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
							href="javascript:TRSHTMLElement.selectAllByName('AppraisalIds');">全选</a></TD>
							<TD bgcolor="#BEE2FF">艺术品图片</TD>
						
						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("PRODUCTIONNAME", "作品名称", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("PRODUCTIONAUTHOR", "作品作者", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("PRODUCTIONTYPE", "作品类别", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("OWNER", "所有人姓名", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("PRODUCTDATE", "作品日期", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("AGENT", "送鉴人", sOrderField, sOrderType)%></TD>
						

						<TD bgcolor="#BEE2FF"><%=PageViewUtil.getHeadTitle("AGENTTEL", "送鉴人电话", sOrderField, sOrderType)%></TD>
						

					
					</TR>
		<%
			Appraisal currAppraisal = null;
			for(int i=currPager.getFirstItemIndex(); i<=currPager.getLastItemIndex(); i++)
			{//begin for
				try{
					currAppraisal = (Appraisal)currAppraisals.getAt(i-1);
				} catch(Exception ex){
					throw new WCMException("获取第["+i+"]篇Appraisal失败！", ex);
				}
				if(currAppraisal == null){
					throw new WCMException("没有找到第["+i+"]篇Appraisal！");
				}

				try{
		%>
					<TR class="list_tr" onclick="TRSHTMLTr.onSelectedTR(this);">
						<TD width="40" NOWRAP><INPUT TYPE="checkbox" NAME="AppraisalIds"
							VALUE="<%=currAppraisal.getId()%>"><%=i%></TD>
						<%-- <TD align=center><A target="_blank"
							href="appraisal_show.jsp?AppraisalId=<%=currAppraisal.getId()%>">查看</A></TD>
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
					throw new WCMException("获取第["+i+"]篇Appraisal的属性失败！", ex);
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
		//参数校验
		if(_sAppraisalIds == null || _sAppraisalIds.length <= 0){
			alert("请选择需要删除的Appraisal!");
			return;
		}
		if(!CTRSAction_confirm("您确定需要删除这些Appraisal吗?"))
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
//6.资源释放
	currAppraisals.clear();
%>