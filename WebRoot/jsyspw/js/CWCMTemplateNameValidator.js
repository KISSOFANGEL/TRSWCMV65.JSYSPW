/** Title:			CWCMTemplateNameValidator.js
 *  Description:
 *		Validate Template Name
 *  Copyright: 		www.trs.com.cn
 *  Company: 		TRS Info. Ltd.
 *  Author:			WSW
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
 *		TemplateId 模板ID
 *		其它属性和String Validator一样
 *	Examples:
 *			
 *	Use:（test/WCMTemplateNameValidator_test.html）
 *	
 */

function CWCMTemplateNameValidator(){
	this.validate				= CWCMTemplateNameValidator_validate;
	this.isTemplateNameExists	= CWCMTemplateNameValidator_isTemplateNameExists;
	this.validSystemFileName	= CWCMTemplateNameValidator_validSystemFileName;
}

CWCMTemplateNameValidator.inherits(CStringValidator);

function CWCMTemplateNameValidator_validate(){
	//1. Super Validate
	if(!this.superMethod("validate")){		
		return false;
	}

	//2. Validate Element Args
	if(!this.oElement.SiteId){
		//CTRSAction_alert("没有定义SiteId");
		this.sErrorInfo += "没有定义SiteId";
		return false;
	}
	if(!this.oElement.TemplateId && this.oElement.TemplateId != 0){
		//CTRSAction_alert("没有定义TemplateId");
		this.sErrorInfo += "没有定义TemplateId";
		return false;
	}	
	if(!this.oElement.value) {
		this.sErrorInfo += "没有找到value";
		return false;
	}

	//去掉多余的首尾空格
	this.oElement.value = this.oElement.value.replace(/(^\s*) | (\s*$)/g, "");

	//3. Special Validate
	if(!this.validSystemFileName(this.oElement.value)) {
		return false;
	}
	return !this.isTemplateNameExists(this.oElement.SiteId, this.oElement.value, this.oElement.TemplateId);

}

function CWCMTemplateNameValidator_isTemplateNameExists(_nSiteId, _sTemplateName, _nTemplateId){
	var sURL	 = "../template/template_get_by_name.jsp";
	var oTRSAction = new CTRSAction(sURL);
	oTRSAction.setParameter("FolderType", 103);
	oTRSAction.setParameter("FolderId", _nSiteId);
	oTRSAction.setParameter("TempName", _sTemplateName);
	var sTemplateXML = oTRSAction.doXMLHttpAction();
	var bExists = false;
	if(sTemplateXML.indexOf("WCMTEMPLATE")>=0){
		var oWCMObj = WCMObjHelper.parseXMLStrToObj(sTemplateXML);
		bExists = (oWCMObj.getProperty("TEMPID") != _nTemplateId);
	}
	if(bExists){
		this.sErrorInfo += "指定的模板名称["+_sTemplateName+"]在当前站点中已经存在，ID为["+oWCMObj.getProperty("TEMPID")+"]！\n";
	}
	return bExists;
}

function CWCMTemplateNameValidator_validSystemFileName(_sTemplateName){
	if(_sTemplateName == null) return;

	var strSpecials = /[\\/:*?\"<>|]/g;
	var arResult = _sTemplateName.match(strSpecials);
	if(arResult==null) {
		if(_sTemplateName.toLowerCase() == "nul") {
			this.sErrorInfo += (this.sErrorInfo.length>1?"\n\n":"")+"不能使用[nul]为模板名称！";
			return false;
		}
	} else {
		this.sErrorInfo += (this.sErrorInfo.length>1?"\n\n":"")+"模板名称不能包含以下任何字符之一 [ \\ / : * ? \" < > | ]！";
		return false;
	}
	return true;
}