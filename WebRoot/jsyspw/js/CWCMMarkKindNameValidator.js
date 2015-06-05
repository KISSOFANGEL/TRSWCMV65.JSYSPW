/** Title:			CWCMMarkKindNameValidator.js
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
TRSValidator.addValidators("site_name",  "CWCMMarkKindNameValidator",  "../js/CWCMMarkKindNameValidator.js");    
</Script>

...
<input type="text" value="" pattern="site_name"  elname="频道名称" not_null=1 min_len='2' max_len='20' SiteId=2 SiteId=0>
...
 */

function CWCMMarkKindNameValidator(){
	this.validate = CWCMMarkKindNameValidator_validate;
	this.isNameExists = CWCMMarkKindNameValidator_isNameExists;
}

CWCMMarkKindNameValidator.inherits(CStringValidator);

function CWCMMarkKindNameValidator_validate(){
	//1. Super Validate
	if(!this.superMethod("validate")){		
		return false;
	}

	//2. Validate Element Args
	if(!this.oElement.MarkKindId && this.oElement.MarkKindId != 0){
		this.sErrorInfo += "没有定义MarkKindId";
		return false;
	}	
	if(!this.oElement.ParentId && this.oElement.ParentId != 0){
		this.sErrorInfo += "没有定义ParentId";
		return false;
	}	

	//3. Special Validate
	return !this.isNameExists(this.oElement.value, this.oElement.MarkKindId, this.oElement.ParentId );

}

function CWCMMarkKindNameValidator_isNameExists(_strMarkKindName, _nMarkKindId, _nParentId){
	var sURL	 = "../person/markkind_get_by_name.jsp";
	var oTRSAction = new CTRSAction(sURL);
	oTRSAction.setParameter("MarkKindName", _strMarkKindName);
	oTRSAction.setParameter("ParentId", _nParentId);
	var strXML = oTRSAction.doXMLHttpAction();
	var bExists = false;
	if(strXML.indexOf("WCMMARKKIND")>=0){
		var oWCMObj = WCMObjHelper.parseXMLStrToObj(strXML);
		bExists = (oWCMObj.getProperty("KindId") != _nMarkKindId);
	}
	if(bExists){
		this.sErrorInfo += "书签文件夹["+_strMarkKindName+"]已经存在！";
	}
	return bExists;
}