/** Title:			CWCMExtendedFieldNameValidator.js
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
TRSValidator.addValidators("site_name",  "CWCMExtendedFieldNameValidator",  "../js/CWCMExtendedFieldNameValidator.js");    
</Script>

...
<input type="text" value="" pattern="site_name"  elname="频道名称" not_null=1 min_len='2' max_len='20' SiteId=2 SiteId=0>
...
 */

function CWCMExtendedFieldNameValidator(){
	this.validate = CWCMExtendedFieldNameValidator_validate;
	this.isNameExists = CWCMExtendedFieldNameValidator_isNameExists;
}

CWCMExtendedFieldNameValidator.inherits(CStringValidator);

function CWCMExtendedFieldNameValidator_validate(){
	//1. Super Validate
	if(!this.superMethod("validate")){
		return false;
	}

	//2. Validate Element Args
	if(!this.oElement.extendedfieldid && this.oElement.extendedfieldid != 0){
		this.sErrorInfo += "没有定义extendedfieldid";
		return false;
	}
	if(!this.oElement.FolderType && this.oElement.FolderType != 0){
		this.sErrorInfo += "没有定义FolderType";
		return false;
	}
	if(!this.oElement.FolderId && this.oElement.FolderId != 0){
		this.sErrorInfo += "没有定义FolderId";
		return false;
	}

	//3. Special Validate
	return !this.isNameExists(this.oElement.value, this.oElement.extendedfieldid, this.oElement.FolderType, this.oElement.FolderId);
}

function CWCMExtendedFieldNameValidator_isNameExists(_strExtendedFieldName, _nExtendedFieldId, _nFolderType, _nFolderId){
	if(CWCMExtendedFieldNameValidator_isDefaultFields(_strExtendedFieldName)) {
		this.sErrorInfo += "扩展字段["+_strExtendedFieldName+"]是系统保留字段！";
		return true;
	}

	var sURL	 = "../channel/extendedfield_get_by_name.jsp";
	var oTRSAction = new CTRSAction(sURL);
	oTRSAction.setParameter("ExtendedFieldName", _strExtendedFieldName);
	oTRSAction.setParameter("FolderType", _nFolderType);
	oTRSAction.setParameter("FolderId", _nFolderId);
	var strXML = oTRSAction.doXMLHttpAction();
	var bExists = false;
	if(strXML.indexOf("WCMCONTENTEXTFIELD")>=0){
		var oWCMObj = WCMObjHelper.parseXMLStrToObj(strXML);
		bExists = (oWCMObj.getProperty("CONTENTEXTFIELDID") != _nExtendedFieldId);
	}
	if(bExists){
		this.sErrorInfo += "扩展字段["+_strExtendedFieldName+"]在本站点/频道中已经存在！";
	}
	return bExists;
}

function CWCMExtendedFieldNameValidator_isDefaultFields(_strExtendedFieldName) {
	var arDefaultFields = new Array("DOCID","DOCCHANNEL","DOCVERSION","DOCTYPE","DOCTITLE","DOCSOURCE","DOCSECURITY","DOCSTATUS","DOCKIND","DOCCONTENT","DOCHTMLCON","DOCABSTRACT","DOCKEYWORDS","DOCRELWORDS","DOCPEOPLE","DOCPLACE","DOCAUTHOR","DOCEDITOR","DOCOUTUPID","DOCVALID","DOCPUBURL","DOCPUBTIME","DOCRELTIME","CRUSER","CRTIME","DOCWORDSCOUNT","DOCPRO","RIGHTDEFINED","TITLECOLOR","TEMPLATEID","SCHEDULE","DOCNO","DOCFLAG","EDITOR","ATTRIBUTE","HitsCount","DOCPUBHTMLCON","SubDocTitle","ATTACHPIC","DOCLINK","DOCFILENAME","DOCFROMVERSION");
	for(var i=0; i<arDefaultFields.length; i++) {
		if(_strExtendedFieldName.toUpperCase() == arDefaultFields[i]) {
			return true;
		}
	}
	return false;
}