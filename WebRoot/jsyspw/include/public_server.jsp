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
//1.页面状态设定
	ResponseHelper rspsHelper = new ResponseHelper(response);
	rspsHelper.initCurrentPage(request);
//2.登录校验
	LoginHelper currLoginHelper = new LoginHelper(request, application);
	if(!currLoginHelper.checkLogin()){
		//ge gfc @ 2007-3-2 10:57 加上未登录的标志位
		response.setHeader("TRSNotLogin", "true");
		throw new WCMException(ExceptionNumber.ERR_USER_NOTLOGIN, "用户未登录或登录超时！");
	}
	User loginUser	= currLoginHelper.getLoginUser();
	/*User loginUser	= User.findByName("admin");
	session.setAttribute("WCM52.loginUser", loginUser);
    session.setMaxInactiveInterval(120 * 60);*/

	ContextHelper.clear();
	ContextHelper.initContext(loginUser);

//3.参数获取
	RequestHelper currRequestHelper = new RequestHelper(request, response, application);
	currRequestHelper.doValid();
%>

<%!
	/**
	 * 根据用户、对象和权限值判断用户是否有权限<BR>
	 * 如果有权限，则返回当前的按钮样式；否则返回disable的按钮演示
	 */
	private String getButtonStyle(User _loginUser, CMSObj _currObj, int _nRightIndex, String _currStyle) throws WCMException{
		if (_loginUser == null || _currObj == null){
			return "bt_table_disable";
		}
		if (_currStyle == null || _currStyle.trim().length()==0){
			_currStyle = "bt_table";
		}
		if (AuthServer.hasRight(_loginUser, _currObj, _nRightIndex)){
			return _currStyle;
		}
		
		return _currStyle + "_disable";
	} // END of getButtonStyle

	/**
	 * 根据用户、对象获取权限值
	 * 对象的CrUser具有64位1的权限
	 */
	private String getRightValue(int _nObjType, int _nObjId, User _currUser) throws WCMException {
		CMSObj currObj = (CMSObj)BaseObj.findById(_nObjType, _nObjId);
		if(currObj == null){
			throw new WCMException(ExceptionNumber.ERR_OBJ_NOTFOUND, "没有找到Type为["+_nObjType+"] ID为["+_nObjId+"]的对象！");
		}

		if(_currUser == null) return "";

		String sRightValue = "";
		if(_currUser.equals(currObj.getCrUser()) || _currUser.isAdministrator()){
			//如果是CrUser，则64位权限全部置为1
			sRightValue = "1";
		} else {
			RightValue rightValue = getRightValueByMember(currObj, _currUser);
			if(rightValue != null){
				sRightValue = rightValue.toString().toString();
			}
		}

		return sRightValue;
	}

	public RightValue getRightValueByMember(CMSObj obj, User user) throws WCMException {
		try {
			if (user.isAdministrator()) {
				return RightValue.getAdministratorRightValue();
			}
			RightValue oRightValue;
			if(obj instanceof BaseChannel){
				IObjectMemberMgr oObjectMemberMgr = (IObjectMemberMgr) DreamFactory.createObjectById("IObjectMemberMgr");
				if(oObjectMemberMgr.canOperate(user, obj.getWCMType(), obj.getId())){
					oRightValue = AuthServer.getRightValue(obj, user);
				}else{
					oRightValue = new RightValue();
				}
			}else{
				oRightValue = AuthServer.getRightValue(obj, user);
			}
			return oRightValue;
		} catch (Exception e) {
			throw new WCMException("构造[" + obj + "]权限信息失败!", e);
		}
	}
%>