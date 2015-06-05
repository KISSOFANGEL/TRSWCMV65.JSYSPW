/** Title:			CWCMBookMarkNameValidator.js
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
TRSValidator.addValidators("site_name",  "CWCMBookMarkNameValidator",  "../js/CWCMBookMarkNameValidator.js");    
</Script>

...
<input type="text" value="" pattern="site_name"  elname="频道名称" not_null=1 min_len='2' max_len='20' SiteId=2 SiteId=0>
...
 */

function CWCMBookMarkNameValidator(){
	this.validate = CWCMBookMarkNameValidator_validate;
	this.isNameExists = CWCMBookMarkNameValidator_isNameExists;
}

CWCMBookMarkNameValidator.inherits(CStringValidator);

function CWCMBookMarkNameValidator_validate(){
	//1. Super Validate
	if(!this.superMethod("validate")){		
		return false;
	}

	//2. Validate Element Args
	if(!this.oElement.BookMarkId && this.oElement.BookMarkId != 0){
		this.sErrorInfo += "没有定义BookMarkId";
		return false;
	}
	if(!this.oElement.MarkKindId && this.oElement.MarkKindId != 0){
		this.sErrorInfo += "没有定义MarkKindId";
		return false;
	}

	//3. Special Validate
	return !this.isNameExists(this.oElement.value, this.oElement.BookMarkId, this.oElement.MarkKindId );

}

function CWCMBookMarkNameValidator_isNameExists(_strBookMarkName, _nBookMarkId, _nMarkKindId){
	var sURL	 = "../person/bookmark_get_by_name.jsp";
	var oTRSAction = new CTRSAction(sURL);
	oTRSAction.setParameter("BookMarkName", _strBookMarkName);
	oTRSAction.setParameter("MarkKindId", _nMarkKindId);
	var strXML = oTRSAction.doXMLHttpAction();
	var bExists = false;
	if(strXML.indexOf("WCMBOOKMARK")>=0){
		var oWCMObj = WCMObjHelper.parseXMLStrToObj(strXML);
		bExists = (oWCMObj.getProperty("MARKID") != _nBookMarkId);
	}
	if(bExists){
		this.sErrorInfo += "书签["+_strBookMarkName+"]已经存在！";
	}
	return bExists;
}