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

function CWCMStatViewNameValidator(){
	this.validate				= CWCMStatViewNameValidator_validate;
	this.isStatViewNameExists	= CWCMStatViewNameValidator_isStatViewNameExists;
}

CWCMStatViewNameValidator.inherits(CStringValidator);

function CWCMStatViewNameValidator_validate(){
	//1. Super Validate
	if(!this.superMethod("validate")){		
		return false;
	}
	if(!this.oElement.StatViewId && this.oElement.StatViewId != 0){
		//CTRSAction_alert("没有定义ChannelId");
		this.sErrorInfo += "没有定义当前StatViewId";
		return false;
	}

	//3. Special Validate
	return !this.isStatViewNameExists(this.oElement.value, this.oElement.StatViewId);

}

function CWCMStatViewNameValidator_isStatViewNameExists(_sStatViewName, _nStatViewId){
	var sURL	 = "../stat/statview_get_by_name.jsp";
	var oTRSAction = new CTRSAction(sURL);
	oTRSAction.setParameter("StatViewName", _sStatViewName);
	oTRSAction.setParameter("StatViewId", _nStatViewId);
	var sXML = oTRSAction.doXMLHttpAction();
	var bExists = false;

	var report = WCMObjHelper.parseXMLStrToObj(sXML);
	if(report != null){
		this.sErrorInfo += report.getProperty("MESSAGE");
		bExists = true;
	}
	return bExists;
}