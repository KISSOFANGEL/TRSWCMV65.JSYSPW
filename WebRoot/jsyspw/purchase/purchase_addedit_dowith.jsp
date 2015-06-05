<%--
/** Title:			purchase_addedit_dowith.jsp
 *  Description:
 *		处理Purchase的添加修改页面
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
 *		see purchase_addedit_dowith.xml
 *
 */
--%>

<%@ page contentType="text/html;charset=UTF-8" pageEncoding="GBK" errorPage="../include/error.jsp"%>
<!------- WCM IMPORTS BEGIN ------------>
<%@ page import="com.trs.jsyspw.Purchase" %>
<%@ page import="com.trs.cms.content.WCMObjHelper" %>
<!------- WCM IMPORTS END ------------>

<!--- 页面状态设定、登录校验、参数获取，都放在public_server.jsp中 --->
<%@include file="../include/public_server_nologin.jsp"%>
<%!boolean IS_DEBUG = false;%>
<%
//4.初始化(获取数据)
	int nPurchaseId = currRequestHelper.getInt("PurchaseId", 0);
	Purchase currPurchase = null;
	if(nPurchaseId > 0){
		currPurchase = Purchase.findById(nPurchaseId);
		if(currPurchase == null){
			throw new WCMException(ExceptionNumber.ERR_OBJ_NOTFOUND, "没有找到指定ID为["+nPurchaseId+"]的Purchase！");
		}
	}else{//nPurchaseId==0 create a new group
		currPurchase = Purchase.createNewInstance();
	}
	
//5.权限校验
	if(nPurchaseId > 0){
		if(!currPurchase.canEdit(loginUser)){
			throw new WCMException(ExceptionNumber.ERR_OBJ_NOTLOCKED, "Purchase被用户["+currPurchase.getLockerUserName()+"]锁定！");
		}
	}

//6.业务代码
	try{
		currPurchase = (Purchase)WCMObjHelper.toWCMObj(currRequestHelper.getString("ObjectXML"), loginUser, nPurchaseId, Purchase.class);
	} catch(Exception ex){
		throw new WCMException(ExceptionNumber.ERR_PROPERTY_VALUE_INVALID, "保存Purchase时因属性值不正确而失败中止！", ex);
	}
	/**
		TODO 建议改为向Service发出请求
	IPurchaseService currPurchaseService = (IPurchaseService)DreamFactory.createObjectById("IPurchaseService");
	currPurchaseService.save(currPurchase);
		**/
	currPurchase.save(loginUser);

//7.结束
	out.clear();
%>

<HTML>
<HEAD>
<META http-equiv="Content-Type" content="text/html; charset=UTF-8">
<TITLE>TRS WCM 5.2 处理添加修改Purchase</TITLE>
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