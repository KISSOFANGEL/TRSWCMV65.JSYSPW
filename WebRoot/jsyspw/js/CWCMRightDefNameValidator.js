/** Title:			CWCMRightDefNameValidator.js
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
 *	Use:（test/WCMRightDefNameValidator_test.html）
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
//register WCMRightDefName Validator
TRSValidator.addValidators("site_name",  "CWCMRightDefNameValidator",  "../js/CWCMRightDefNameValidator.js");    
</Script>

...
<input type="text" value="" pattern="site_name"  elname="频道名称" not_null=1 min_len='2' max_len='20' SiteId=2 SiteId=0>
...
 */

function CWCMRightDefNameValidator(){
	this.validate				= CWCMRightDefNameValidator_validate;
	this.isRightDefNameExists	= CWCMRightDefNameValidator_isRightDefNameExists;
}

CWCMRightDefNameValidator.inherits(CStringValidator);

function CWCMRightDefNameValidator_validate(){
	//1. Super Validate
	if(!this.superMethod("validate")){		
		return false;
	}

	//2. Validate Element Args
	if(!this.oElement.RightDefId && this.oElement.RightDefId != 0){
		this.sErrorInfo += "没有定义RightDefId";
		return false;
	}

	if(!this.oElement.ObjType && this.oElement.ObjType != 0){
		this.sErrorInfo += "没有定义ObjType";
		return false;
	}	

	//3. Special Validate
	return !this.isRightDefNameExists(this.oElement.value, this.oElement.RightDefId, this.oElement.ObjType);

}

function CWCMRightDefNameValidator_isRightDefNameExists(_sRightDefName, _nRightDefId, _nObjType){
	var sURL	 = "../auth/rightdef_get_by_name_index.jsp";
	var oTRSAction = new CTRSAction(sURL);
	oTRSAction.setParameter("ObjType", _nObjType);
	oTRSAction.setParameter("RightName", _sRightDefName);
	var sObjXML = oTRSAction.doXMLHttpAction();
	var bExists = false;
	if(sObjXML.indexOf("WCMRIGHTDEF")>=0){
		var oWCMObj = WCMObjHelper.parseXMLStrToObj(sObjXML);
		bExists = (oWCMObj.getProperty("RightDefId") != _nRightDefId);
	}
	if(bExists){
		this.sErrorInfo += "当前对象类型下的权限名称["+_sRightDefName+"]已存在！";
	}
	return bExists;
}