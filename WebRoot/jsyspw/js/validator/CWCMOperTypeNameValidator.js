/** Title:			CWCMOperTypeNameValidator.js
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
TRSValidator.addValidators("site_name",  "CWCMOperTypeNameValidator",  "../js/CWCMOperTypeNameValidator.js");    
</Script>

...
<input type="text" value="" pattern="site_name"  elname="频道名称" not_null=1 min_len='2' max_len='20' SiteId=2 SiteId=0>
...
 */

function CWCMOperTypeNameValidator(){
	this.validate = CWCMOperTypeNameValidator_validate;
	this.isNameExists = CWCMOperTypeNameValidator_isNameExists;
}

CWCMOperTypeNameValidator.inherits(CStringValidator);

function CWCMOperTypeNameValidator_validate(){
	//1. Super Validate
	if(!this.superMethod("validate")){		
		return false;
	}

	//2. Validate Element Args
	if(!this.oElement.OperTypeId && this.oElement.OperTypeId != 0){
		this.sErrorInfo += "没有定义OperTypeId";
		return false;
	}	

	//3. Special Validate
	return !this.isNameExists(this.oElement.value, this.oElement.OperTypeId);

}

function CWCMOperTypeNameValidator_isNameExists(_strOperTypeName, _nOperTypeId){
	var sURL	 = "../stat/opertype_get_by_name.jsp";
	var oTRSAction = new CTRSAction(sURL);
	oTRSAction.setParameter("OperTypeName", _strOperTypeName);
	var strXML = oTRSAction.doXMLHttpAction();
	var bExists = false;
	if(strXML.indexOf("WCMOPERTYPE")>=0){
		var oWCMObj = WCMObjHelper.parseXMLStrToObj(strXML);
		bExists = (oWCMObj.getProperty("OPERTYPEID") != _nOperTypeId);
	}
	if(bExists){
		this.sErrorInfo += "操作类型["+_strOperTypeName+"]已经存在！";
	}
	return bExists;
}