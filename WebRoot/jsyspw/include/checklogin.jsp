<%@ page import="java.util.ArrayList,java.util.List,java.util.Enumeration" %>
<%-- ------- WCM IMPORTS BEGIN ---------- --%>
<%@ page import="com.trs.cms.auth.domain.AuthServer" %>
<%@ page import="com.trs.cms.content.CMSObj" %>
<%@ page import="com.trs.infra.persistent.BaseObj" %>
<%@ page import="com.trs.cms.auth.persistent.User" %>
<%@ page import="com.trs.cms.ContextHelper" %>
<%@ page import="com.trs.infra.common.WCMException" %>
<%@ page import="com.trs.presentation.util.LoginHelper" %>
<%@ page import="com.trs.presentation.util.RequestHelper" %>
<%@ page import="com.trs.presentation.util.ResponseHelper" %>
<%@ page import="com.trs.presentation.util.PageViewUtil" %>
<%@ page import="com.trs.infra.util.ExceptionNumber" %>
<%@ page import="com.trs.presentation.locale.LocaleServer" %> 
<%@ page import="com.trs.DreamFactory" %> 
<%@ page import="com.trs.service.ServiceHelper" %> 
<%@ page import="com.trs.cms.auth.persistent.RightValue" %>
<%@ page import="com.trs.cms.auth.domain.IObjectMemberMgr" %>
<%@ page import="com.trs.components.wcm.content.persistent.BaseChannel" %>

<%!boolean IS_WCMV6 = true;%>
<%-- ------- WCM IMPORTS BEGIN ---------- --%>

<%
if(session.getAttribute("currusername")==null)response.sendRedirect("/wcm/jsyspw/login/login.jsp");
%>
