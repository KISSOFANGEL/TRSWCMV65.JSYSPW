<%--
/** Title:			appraisal_addedit_dowith.jsp
 *  Description:
 *		处理Appraisal的添加修改页面
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
 *		see appraisal_addedit_dowith.xml
 *
 */
--%>

<%@ page contentType="text/html;charset=UTF-8" pageEncoding="GBK" errorPage="../include/error.jsp"%>
<!------- WCM IMPORTS BEGIN ------------>
<%@ page import="com.trs.jsyspw.Appraisal" %>
<%@ page import="com.trs.cms.content.WCMObjHelper" %>
<!------- WCM IMPORTS END ------------>

<!--- 页面状态设定、登录校验、参数获取，都放在public_server.jsp中 --->
<%@include file="../include/public_server_nologin.jsp"%>
<%!boolean IS_DEBUG = false;%>
<%
//4.初始化(获取数据)
	int nAppraisalId = currRequestHelper.getInt("AppraisalId", 0);
	Appraisal currAppraisal = null;
	if(nAppraisalId > 0){
		currAppraisal = Appraisal.findById(nAppraisalId);
		if(currAppraisal == null){
			throw new WCMException(ExceptionNumber.ERR_OBJ_NOTFOUND, "没有找到指定ID为["+nAppraisalId+"]的Appraisal！");
		}
	}else{//nAppraisalId==0 create a new group
		currAppraisal = Appraisal.createNewInstance();
	}
	
//5.权限校验
	if(nAppraisalId > 0){
		if(!currAppraisal.canEdit(loginUser)){
			throw new WCMException(ExceptionNumber.ERR_OBJ_NOTLOCKED, "Appraisal被用户["+currAppraisal.getLockerUserName()+"]锁定！");
		}
	}

//6.业务代码
	try{
		currAppraisal = (Appraisal)WCMObjHelper.toWCMObj(currRequestHelper.getString("ObjectXML"), loginUser, nAppraisalId, Appraisal.class);
	} catch(Exception ex){
		throw new WCMException(ExceptionNumber.ERR_PROPERTY_VALUE_INVALID, "保存Appraisal时因属性值不正确而失败中止！", ex);
	}
	/**
		TODO 建议改为向Service发出请求
	IAppraisalService currAppraisalService = (IAppraisalService)DreamFactory.createObjectById("IAppraisalService");
	currAppraisalService.save(currAppraisal);
		**/
		if(session.getAttribute("picurl")!=null){
	currAppraisal.setPicurl(session.getAttribute("picurl")+"");
	}
	currAppraisal.save(loginUser);

//7.结束
	out.clear();
%>

<HTML>
<HEAD>
<META http-equiv="Content-Type" content="text/html; charset=UTF-8">
<TITLE>TRS WCM 5.2 处理添加修改Appraisal</TITLE>
<LINK href="../style/style.css" rel="stylesheet" type="text/css">
<%@include file="../include/public_client_addedit.jsp"%>
</HEAD>

<BODY>
<SCRIPT LANGUAGE="JavaScript">
if(window.opener){
	window.opener.CTRSAction_refreshMe();
	window.opener.focus();
	window.close();
}else{
	window.returnValue = true;
	window.close();
}

</SCRIPT>
</BODY>
</HTML>