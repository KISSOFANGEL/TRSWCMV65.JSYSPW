<%--
/** Title:			yuser_addedit_dowith.jsp
 *  Description:
 *		����YUser������޸�ҳ��
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
 *		see yuser_addedit_dowith.xml
 *
 */
--%>

<%@ page contentType="text/html;charset=UTF-8" pageEncoding="GBK" errorPage="../include/error.jsp"%>
<!------- WCM IMPORTS BEGIN ------------>
<%@ page import="com.trs.jsyspw.YUser" %>
<%@ page import="com.trs.cms.content.WCMObjHelper" %>
<!------- WCM IMPORTS END ------------>

<!--- ҳ��״̬�趨����¼У�顢������ȡ��������public_server.jsp�� --->
<%@include file="../include/public_server_nologin.jsp"%>
<%!boolean IS_DEBUG = false;%>
<%
//4.��ʼ��(��ȡ����)
	int nYUserId = currRequestHelper.getInt("YUserId", 0);
	YUser currYUser = null;
	if(nYUserId > 0){
		currYUser = YUser.findById(nYUserId);
		if(currYUser == null){
			throw new WCMException(ExceptionNumber.ERR_OBJ_NOTFOUND, "û���ҵ�ָ��IDΪ["+nYUserId+"]��YUser��");
		}
	}else{//nYUserId==0 create a new group
		currYUser = YUser.createNewInstance();
	}
	
//5.Ȩ��У��
	if(nYUserId > 0){
		if(!currYUser.canEdit(loginUser)){
			throw new WCMException(ExceptionNumber.ERR_OBJ_NOTLOCKED, "YUser���û�["+currYUser.getLockerUserName()+"]������");
		}
	}

//6.ҵ�����
	try{
		currYUser = (YUser)WCMObjHelper.toWCMObj(currRequestHelper.getString("ObjectXML"), loginUser, nYUserId, YUser.class);
	} catch(Exception ex){
		throw new WCMException(ExceptionNumber.ERR_PROPERTY_VALUE_INVALID, "����YUserʱ������ֵ����ȷ��ʧ����ֹ��", ex);
	}
	/**
		TODO �����Ϊ��Service��������
	IYUserService currYUserService = (IYUserService)DreamFactory.createObjectById("IYUserService");
	currYUserService.save(currYUser);
		**/
	currYUser.save(loginUser);

	RequestDispatcher rd = request.getRequestDispatcher("../login/login.jsp");
	rd.forward(request, response);
//7.����
	out.clear();
%>

<HTML>
<HEAD>
<META http-equiv="Content-Type" content="text/html; charset=UTF-8">
<TITLE>TRS WCM 5.2 ��������޸�YUser</TITLE>
<LINK href="../style/style.css" rel="stylesheet" type="text/css">
<%@include file="../include/public_client_addedit_nologin.jsp"%>
</HEAD>

<BODY>

</BODY>
</HTML>