<%--
/** Title:			appraisal_addedit_dowith.jsp
 *  Description:
 *		����Appraisal������޸�ҳ��
 *  Copyright: 		www.trs.com.cn
 *  Company: 		TRS Info. Ltd.
 *  Author:			wangjiang
 *  Created:		2015-05-28 17:09:15
 *  Vesion:			1.0
 *  Last EditTime:	2015-05-28 / 2015-05-28
 *	Update Logs:
 *		wangjiang@2015-05-28 �������ļ�
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

<!--- ҳ��״̬�趨����¼У�顢������ȡ��������public_server.jsp�� --->
<%@include file="../include/public_server_nologin.jsp"%>
<%!boolean IS_DEBUG = false;%>
<%
//4.��ʼ��(��ȡ����)
	int nAppraisalId = currRequestHelper.getInt("AppraisalId", 0);
	Appraisal currAppraisal = null;
	if(nAppraisalId > 0){
		currAppraisal = Appraisal.findById(nAppraisalId);
		if(currAppraisal == null){
			throw new WCMException(ExceptionNumber.ERR_OBJ_NOTFOUND, "û���ҵ�ָ��IDΪ["+nAppraisalId+"]��Appraisal��");
		}
	}else{//nAppraisalId==0 create a new group
		currAppraisal = Appraisal.createNewInstance();
	}
	
//5.Ȩ��У��
	if(nAppraisalId > 0){
		if(!currAppraisal.canEdit(loginUser)){
			throw new WCMException(ExceptionNumber.ERR_OBJ_NOTLOCKED, "Appraisal���û�["+currAppraisal.getLockerUserName()+"]������");
		}
	}

//6.ҵ�����
	try{
		currAppraisal = (Appraisal)WCMObjHelper.toWCMObj(currRequestHelper.getString("ObjectXML"), loginUser, nAppraisalId, Appraisal.class);
	} catch(Exception ex){
		throw new WCMException(ExceptionNumber.ERR_PROPERTY_VALUE_INVALID, "����Appraisalʱ������ֵ����ȷ��ʧ����ֹ��", ex);
	}
	/**
		TODO �����Ϊ��Service��������
	IAppraisalService currAppraisalService = (IAppraisalService)DreamFactory.createObjectById("IAppraisalService");
	currAppraisalService.save(currAppraisal);
		**/
		if(session.getAttribute("picurl")!=null){
	currAppraisal.setPicurl(session.getAttribute("picurl")+"");
	}
	currAppraisal.save(loginUser);

//7.����
	out.clear();
%>

<HTML>
<HEAD>
<META http-equiv="Content-Type" content="text/html; charset=UTF-8">
<TITLE>TRS WCM 5.2 ��������޸�Appraisal</TITLE>
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