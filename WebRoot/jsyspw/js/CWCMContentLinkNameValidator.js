/** Title:			CWCMContentLinkNameValidator.js
 *  Description:
 *		Validate ContentLink Name
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
 *		ContentLinkId 模板ID
 *		其它属性和String Validator一样
 *	Examples:
 *			
 *	Use:（test/WCMContentLinkNameValidator_test.html）
 *	
 */

function CWCMContentLinkNameValidator(){
	this.validate				= CWCMContentLinkNameValidator_validate;
	this.isContentLinkNameExists	= CWCMContentLinkNameValidator_isContentLinkNameExists;
}

CWCMContentLinkNameValidator.inherits(CStringValidator);

function CWCMContentLinkNameValidator_validate(){
	//1. Super Validate
	if(!this.superMethod("validate")){		
		return false;
	}

	//2. Validate Element Args
	/*
	if(!this.oElement.SiteId){
		//CTRSAction_alert("没有定义SiteId");
		this.sErrorInfo += "没有定义SiteId";
		return false;
	}*/

	if(!this.oElement.LinkTypeId){
		//CTRSAction_alert("没有定义SiteId");
		this.sErrorInfo += "没有定义分类Id";
		return false;
	}

	if(!this.oElement.ContentLinkId && this.oElement.ContentLinkId != 0){
		//CTRSAction_alert("没有定义ContentLinkId");
		this.sErrorInfo += "没有定义ContentLinkId";
		return false;
	}	

	//3. Special Validate
	return !this.isContentLinkNameExists(this.oElement.LinkTypeId, this.oElement.value, this.oElement.ContentLinkId);

}

function CWCMContentLinkNameValidator_isContentLinkNameExists(_nLinkTypeId, _sContentLinkName, _nContentLinkId){
	var pattern = /^[\w\u4e00-\u9fa5]*$/;
	if(!pattern.test(_sContentLinkName)){
		this.sErrorInfo = "热词名称只能由汉字、字母、数字、下划线组成！";
		return true;
	}
	var sURL	 = "../contentlink/contentlink_get_by_name.jsp";
	var oTRSAction = new CTRSAction(sURL);
	//oTRSAction.setParameter("SiteId", _nSiteId);
	oTRSAction.setParameter("ContentLinkTypeId", _nLinkTypeId);
	oTRSAction.setParameter("LinkName", _sContentLinkName);
	var sContentLinkXML = oTRSAction.doXMLHttpAction();
	var bExists = false;
	if(sContentLinkXML.indexOf("WCMCONTENTLINK")>=0){
		var oWCMObj = WCMObjHelper.parseXMLStrToObj(sContentLinkXML);
		bExists = (oWCMObj.getProperty("CONTENTLINKID") != _nContentLinkId);
	}
	if(bExists){
		//this.sErrorInfo += "指定的内容超链接名称["+_sContentLinkName+"]在当前站点中已经存在，ID为["+oWCMObj.getProperty("CONTENTLINKID")+"]！\n对应的链接地址为["+oWCMObj.getProperty("LINKURL")+"]！";
		this.sErrorInfo += "指定的热词名称["+_sContentLinkName+"]在当前分类中已经存在，ID为["+oWCMObj.getProperty("CONTENTLINKID")+"]！\n对应的链接地址为["+oWCMObj.getProperty("LINKURL")+"]！";
	}
	return bExists;
}