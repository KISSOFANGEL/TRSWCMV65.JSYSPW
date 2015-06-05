<%--
/** Title:			purchase_addedit_dowith.jsp
 *  Description:
 *		����Purchase������޸�ҳ��
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
 *		see purchase_addedit_dowith.xml
 *
 */
--%>

<%@ page contentType="text/html;charset=UTF-8" pageEncoding="GBK" errorPage="../include/error.jsp"%>
<!------- WCM IMPORTS BEGIN ------------>
<%@ page import="com.trs.jsyspw.Purchase" %>
<%@ page import="com.trs.cms.content.WCMObjHelper" %>
<!------- WCM IMPORTS END ------------>

<!--- ҳ��״̬�趨����¼У�顢������ȡ��������public_server.jsp�� --->
<%@include file="../include/public_server_nologin.jsp"%>
<%!boolean IS_DEBUG = false;%>
<%
//4.��ʼ��(��ȡ����)
	int nPurchaseId = currRequestHelper.getInt("PurchaseId", 0);
	Purchase currPurchase = null;
	if(nPurchaseId > 0){
		currPurchase = Purchase.findById(nPurchaseId);
		if(currPurchase == null){
			throw new WCMException(ExceptionNumber.ERR_OBJ_NOTFOUND, "û���ҵ�ָ��IDΪ["+nPurchaseId+"]��Purchase��");
		}
	}else{//nPurchaseId==0 create a new group
		currPurchase = Purchase.createNewInstance();
	}
	
//5.Ȩ��У��
	if(nPurchaseId > 0){
		if(!currPurchase.canEdit(loginUser)){
			throw new WCMException(ExceptionNumber.ERR_OBJ_NOTLOCKED, "Purchase���û�["+currPurchase.getLockerUserName()+"]������");
		}
	}

//6.ҵ�����
	try{
		currPurchase = (Purchase)WCMObjHelper.toWCMObj(currRequestHelper.getString("ObjectXML"), loginUser, nPurchaseId, Purchase.class);
	} catch(Exception ex){
		throw new WCMException(ExceptionNumber.ERR_PROPERTY_VALUE_INVALID, "����Purchaseʱ������ֵ����ȷ��ʧ����ֹ��", ex);
	}
	/**
		TODO �����Ϊ��Service��������
	IPurchaseService currPurchaseService = (IPurchaseService)DreamFactory.createObjectById("IPurchaseService");
	currPurchaseService.save(currPurchase);
		**/
	currPurchase.save(loginUser);

//7.����
	out.clear();
%>

<HTML>
<HEAD>
<META http-equiv="Content-Type" content="text/html; charset=UTF-8">
<TITLE>TRS WCM 5.2 ��������޸�Purchase</TITLE>
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