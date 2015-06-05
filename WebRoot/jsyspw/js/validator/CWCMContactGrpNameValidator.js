/** Title:			CWCMContactGrpNameValidator.js
 *  Description:
 *		Validate Site Name
 *  Copyright: 		www.trs.com.cn
 *  Company: 		TRS Info. Ltd.
 *  Author:			CH
 *  Created:		2005-06-17
 *  Vesion:			1.0
 *  Last EditTime:	
 *	Update Logs:
 *		
 *	Note:
 *		
 *	Depends:
 *		CTRSReqeustParam.js
 *		CTRSHashtable.js
 *		CTRSAction.js
 *		CStringValidator.js
 *		CWCMObjHelper.js
 *		CWCMObj.js
 *
 *	Properties:
 *		SiteId 站点ID
 *		其它属性和String Validator一样
 *	Examples:
 *			
 *	Use:（test/WCMSiteNameValidator_test.html）
 *	
<script src="../js/CTRSHashtable.js"></script>
<script src="../js/CTRSRequestParam.js"></script>
<script src="../js/CTRSAction.js"></script>

<SCRIPT LANGUAGE="JavaScript" src="../js/CWCMObjHelper.js"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript" src="../js/CWCMObj.js"></SCRIPT>



<SCRIPT LANGUAGE="JavaScript" src="../js/TRSBase.js"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript" src="../js/CTRSString.js"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript" src="../js/CTRSValidator.js"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript" src="../js/CTRSValidator_res_default.js"></SCRIPT>
<Script>
//register WCMSiteName Validator
TRSValidator.addValidators("site_name",  "CWCMContactGrpNameValidator",  "../js/CWCMContactGrpNameValidator.js");    
</Script>

...
<input type="text" value="" pattern="site_name"  elname="频道名称" not_null=1 min_len='2' max_len='20' SiteId=2 SiteId=0>
...
 */

function CWCMContactGrpNameValidator(){
	this.validate = CWCMContactGrpNameValidator_validate;
	this.isNameExists = CWCMContactGrpNameValidator_isNameExists;
}

CWCMContactGrpNameValidator.inherits(CStringValidator);

function CWCMContactGrpNameValidator_validate(){
	//1. Super Validate
	if(!this.superMethod("validate")){
		return false;
	}

	//2. Validate Element Args
	if(!this.oElement.ContactGrpId){
		this.sErrorInfo += "没有定义 ContactGrpId";
		return false;
	}	
	if(!this.oElement.ParentGrpId && this.oElement.ParentGrpId != 0){
		this.sErrorInfo += "没有定义ParentGrpId";
		return false;
	}	

	//3. Special Validate
	return !this.isNameExists(this.oElement.value, this.oElement.ParentGrpId, this.oElement.ContactGrpId);

}

function CWCMContactGrpNameValidator_isNameExists(_strContactGrpName, _nParentGrpId, _nContactGrpId){
	var sURL	 = "../person/contactgrp_get_by_name.jsp";
	var oTRSAction = new CTRSAction(sURL);
	oTRSAction.setParameter("ContactGrpName", _strContactGrpName);
	oTRSAction.setParameter("ParentGrpId", _nParentGrpId);
	var strXML = oTRSAction.doXMLHttpAction();
	var bExists = false;
	if(strXML.indexOf("WCMCONTGROUP")>=0){
		var oWCMObj = WCMObjHelper.parseXMLStrToObj(strXML);
		bExists = (oWCMObj.getProperty("GROUPID") != _nContactGrpId);
	}
	if(bExists){
		this.sErrorInfo += "联系人组["+_strContactGrpName+"]已经存在！";
	}
	return bExists;
}