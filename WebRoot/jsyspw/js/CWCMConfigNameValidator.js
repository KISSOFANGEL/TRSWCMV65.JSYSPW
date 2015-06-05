/** Title:			CWCMConfigNameValidator.js
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
TRSValidator.addValidators("site_name",  "CWCMConfigNameValidator",  "../js/CWCMConfigNameValidator.js");    
</Script>

...
<input type="text" value="" pattern="site_name"  elname="频道名称" not_null=1 min_len='2' max_len='20' SiteId=2 SiteId=0>
...
 */

function CWCMConfigNameValidator(){
	this.validate = CWCMConfigNameValidator_validate;
	this.isNameExists = CWCMConfigNameValidator_isNameExists;
}

CWCMConfigNameValidator.inherits(CStringValidator);

function CWCMConfigNameValidator_validate(){
	//1. Super Validate
	if(!this.superMethod("validate")){		
		return false;
	}

	//2. Validate Element Args
	if(!this.oElement.ConfigId && this.oElement.ConfigId != 0){
		this.sErrorInfo += "没有定义ConfigId";
		return false;
	}	

	//3. Special Validate
	return !this.isNameExists(this.oElement.value, this.oElement.ConfigId);

}

function CWCMConfigNameValidator_isNameExists(_strConfigName, _nConfigId){
	var sURL	 = "../config/config_get_by_name.jsp";
	var oTRSAction = new CTRSAction(sURL);
	oTRSAction.setParameter("ConfigName", _strConfigName);
	var strXML = oTRSAction.doXMLHttpAction();
	var bExists = false;
	if(strXML.indexOf("WCMCONFIG")>=0){
		var oWCMObj = WCMObjHelper.parseXMLStrToObj(strXML);
		bExists = (oWCMObj.getProperty("ConfigId") != _nConfigId);
	}
	if(bExists){
		this.sErrorInfo += "用户新增统配置["+_strConfigName+"]已经存在！";
	}
	return bExists;
}