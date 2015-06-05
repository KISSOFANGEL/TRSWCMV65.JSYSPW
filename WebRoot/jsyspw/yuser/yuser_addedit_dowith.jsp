<%--
/** Title:			yuser_addedit_dowith.jsp
 *  Description:
 *		处理YUser的添加修改页面
 *  Copyright: 		www.trs.com.cn
 *  Company: 		TRS Info. Ltd.
 *  Author:			trs wcm
 *  Created:		2015-06-03 14:39:59
 *  Vesion:			1.0
 *  Last EditTime:	2015-06-03 / 2015-06-03
 *	Update Logs:
 *		trs wcm@2015-06-03 产生此文件
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

<!--- 页面状态设定、登录校验、参数获取，都放在public_server.jsp中 --->
<%@include file="../include/public_server_nologin.jsp"%>
<%!boolean IS_DEBUG = false;%>
<%
//4.初始化(获取数据)
	int nYUserId = currRequestHelper.getInt("YUserId", 0);
	YUser currYUser = null;
	if(nYUserId > 0){
		currYUser = YUser.findById(nYUserId);
		if(currYUser == null){
			throw new WCMException(ExceptionNumber.ERR_OBJ_NOTFOUND, "没有找到指定ID为["+nYUserId+"]的YUser！");
		}
	}else{//nYUserId==0 create a new group
		currYUser = YUser.createNewInstance();
	}
	
//5.权限校验
	if(nYUserId > 0){
		if(!currYUser.canEdit(loginUser)){
			throw new WCMException(ExceptionNumber.ERR_OBJ_NOTLOCKED, "YUser被用户["+currYUser.getLockerUserName()+"]锁定！");
		}
	}

//6.业务代码
	try{
		currYUser = (YUser)WCMObjHelper.toWCMObj(currRequestHelper.getString("ObjectXML"), loginUser, nYUserId, YUser.class);
	} catch(Exception ex){
		throw new WCMException(ExceptionNumber.ERR_PROPERTY_VALUE_INVALID, "保存YUser时因属性值不正确而失败中止！", ex);
	}
	/**
		TODO 建议改为向Service发出请求
	IYUserService currYUserService = (IYUserService)DreamFactory.createObjectById("IYUserService");
	currYUserService.save(currYUser);
		**/
	currYUser.save(loginUser);

	RequestDispatcher rd = request.getRequestDispatcher("../login/login.jsp");
	rd.forward(request, response);
//7.结束
	out.clear();
%>

<HTML>
<HEAD>
<META http-equiv="Content-Type" content="text/html; charset=UTF-8">
<TITLE>TRS WCM 5.2 处理添加修改YUser</TITLE>
<LINK href="../style/style.css" rel="stylesheet" type="text/css">
<%@include file="../include/public_client_addedit_nologin.jsp"%>
</HEAD>

<BODY>

</BODY>
</HTML>