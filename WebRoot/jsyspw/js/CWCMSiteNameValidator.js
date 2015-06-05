/** Title:			CWCMSiteNameValidator.js
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
TRSValidator.addValidators("site_name",  "CWCMSiteNameValidator",  "../js/CWCMSiteNameValidator.js");    
</Script>

...
<input type="text" value="" pattern="site_name"  elname="频道名称" not_null=1 min_len='2' max_len='20' SiteId=2 SiteId=0>
...
 */

function CWCMSiteNameValidator(){
	this.validate				= CWCMSiteNameValidator_validate;
	this.isSiteNameExists	= CWCMSiteNameValidator_isSiteNameExists;
}

CWCMSiteNameValidator.inherits(CStringValidator);

function CWCMSiteNameValidator_validate(){
	//1. Super Validate
	if(!this.superMethod("validate")){		
		return false;
	}

	//2. Validate Element Args
	if(!this.oElement.SiteId && this.oElement.SiteId != 0){
		this.sErrorInfo += "没有定义SiteId";
		return false;
	}	

	//3. Special Validate
	return !this.isSiteNameExists(this.oElement.value, this.oElement.SiteId);

}

function CWCMSiteNameValidator_isSiteNameExists(_sSiteName, _nSiteId){
	var sURL	 = "../channel/site_get_by_name.jsp";
	var oTRSAction = new CTRSAction(sURL);
	oTRSAction.setParameter("SiteName", _sSiteName);
	var sSiteXML = oTRSAction.doXMLHttpAction();
	var bExists = false;
	if(sSiteXML.indexOf("WCMWEBSITE")>=0){
		var oWCMObj = WCMObjHelper.parseXMLStrToObj(sSiteXML);
		bExists = (oWCMObj.getProperty("SiteId") != _nSiteId);
	}
	if(bExists){
		this.sErrorInfo += "指定的站点名称["+_sSiteName+"]已经存在！\n";
		if(oWCMObj.getProperty("Status")<0) {
			this.sErrorInfo += "该站点在站点回收站中！";
		}
	}
	return bExists;
}