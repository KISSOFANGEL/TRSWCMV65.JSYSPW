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
//1.ҳ��״̬�趨
	ResponseHelper rspsHelper = new ResponseHelper(response);
	rspsHelper.initCurrentPage(request);
//2.��¼У��
	LoginHelper currLoginHelper = new LoginHelper(request, application);
	if(!currLoginHelper.checkLogin()){
		//ge gfc @ 2007-3-2 10:57 ����δ��¼�ı�־λ
		response.setHeader("TRSNotLogin", "true");
		throw new WCMException(ExceptionNumber.ERR_USER_NOTLOGIN, "�û�δ��¼���¼��ʱ��");
	}
	User loginUser	= currLoginHelper.getLoginUser();
	/*User loginUser	= User.findByName("admin");
	session.setAttribute("WCM52.loginUser", loginUser);
    session.setMaxInactiveInterval(120 * 60);*/

	ContextHelper.clear();
	ContextHelper.initContext(loginUser);

//3.������ȡ
	RequestHelper currRequestHelper = new RequestHelper(request, response, application);
	currRequestHelper.doValid();
%>

<%!
	/**
	 * �����û��������Ȩ��ֵ�ж��û��Ƿ���Ȩ��<BR>
	 * �����Ȩ�ޣ��򷵻ص�ǰ�İ�ť��ʽ�����򷵻�disable�İ�ť��ʾ
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
	 * �����û��������ȡȨ��ֵ
	 * �����CrUser����64λ1��Ȩ��
	 */
	private String getRightValue(int _nObjType, int _nObjId, User _currUser) throws WCMException {
		CMSObj currObj = (CMSObj)BaseObj.findById(_nObjType, _nObjId);
		if(currObj == null){
			throw new WCMException(ExceptionNumber.ERR_OBJ_NOTFOUND, "û���ҵ�TypeΪ["+_nObjType+"] IDΪ["+_nObjId+"]�Ķ���");
		}

		if(_currUser == null) return "";

		String sRightValue = "";
		if(_currUser.equals(currObj.getCrUser()) || _currUser.isAdministrator()){
			//�����CrUser����64λȨ��ȫ����Ϊ1
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
			throw new WCMException("����[" + obj + "]Ȩ����Ϣʧ��!", e);
		}
	}
%>