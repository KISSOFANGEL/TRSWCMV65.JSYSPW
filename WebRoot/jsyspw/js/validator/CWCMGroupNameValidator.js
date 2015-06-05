/** Title:			CWCMGroupNameValidator.js
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
TRSValidator.addValidators("site_name",  "CWCMGroupNameValidator",  "../js/CWCMGroupNameValidator.js");    
</Script>

...
<input type="text" value="" pattern="site_name"  elname="频道名称" not_null=1 min_len='2' max_len='20' SiteId=2 SiteId=0>
...
 */

function CWCMGroupNameValidator(){
	this.validate = CWCMGroupNameValidator_validate;
	this.isNameExists = CWCMGroupNameValidator_isNameExists;
}

CWCMGroupNameValidator.inherits(CStringValidator);

function CWCMGroupNameValidator_validate(){
	//1. Super Validate
	if(!this.superMethod("validate")){
		return false;
	}

	//2. Validate Element Args
	if(!this.oElement.GroupId && this.oElement.GroupId != 0){
		this.sErrorInfo += "没有定义GroupId";
		return false;
	}
	if(!this.oElement.ParentId && this.oElement.ParentId != 0){
		this.sErrorInfo += "没有定义ParentId";
		return false;
	}	

	//3. Special Validate
	return !this.isNameExists(this.oElement.value, this.oElement.GroupId, this.oElement.ParentId);

}

function CWCMGroupNameValidator_isNameExists(_strGroupName, _nGroupId, _nParentId){
	var sURL	 = "../auth/group_get_by_name.jsp";
	var oTRSAction = new CTRSAction(sURL);
	oTRSAction.setParameter("GroupName", _strGroupName);
	oTRSAction.setParameter("ParentId", _nParentId);
	var strXML = oTRSAction.doXMLHttpAction();
	var bExists = false;
	if(strXML.indexOf("WCMGROUP")>=0){
		var oWCMObj = WCMObjHelper.parseXMLStrToObj(strXML);
		bExists = (oWCMObj.getProperty("GROUPID") != _nGroupId);
	}
	if(bExists){
		this.sErrorInfo += "用户组["+_strGroupName+"]已经存在！";
	}
	return bExists;
}