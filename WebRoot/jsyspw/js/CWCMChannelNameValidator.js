/** Title:			CWCMChannelNameValidator.js
 *  Description:
 *		Validate Channel Name
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
 *		ChannelId 频道ID
 *		其它属性和String Validator一样
 *	Examples:
 *			
 *	Use:（test/WCMChannelNameValidator_test.html）
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
//register WCMChannelName Validator
TRSValidator.addValidators("channel_name",  "CWCMChannelNameValidator",  "../js/CWCMChannelNameValidator.js");    
</Script>

...
<input type="text" value="" pattern="channel_name"  elname="频道名称" not_null=1 min_len='2' max_len='20' SiteId=2 ChannelId=0>
...
 */

function CWCMChannelNameValidator(){
	this.validate				= CWCMChannelNameValidator_validate;
	this.isChannelNameExists	= CWCMChannelNameValidator_isChannelNameExists;
}

CWCMChannelNameValidator.inherits(CStringValidator);

function CWCMChannelNameValidator_validate(){
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
	if(!this.oElement.ChannelId && this.oElement.ChannelId != 0){
		//CTRSAction_alert("没有定义ChannelId");
		this.sErrorInfo += "没有定义ChannelId";
		return false;
	}	

	//3. Special Validate
	return !this.isChannelNameExists(this.oElement.SiteId, this.oElement.value, this.oElement.ChannelId);

}

function CWCMChannelNameValidator_isChannelNameExists(_nSiteId, _sChannelName, _nChannelId){
	var sURL	 = "../channel/channel_get_by_name.jsp";

	var oTRSAction = new CTRSAction(sURL);
	oTRSAction.setParameter("SiteId", _nSiteId);
	oTRSAction.setParameter("ChannelName", _sChannelName);

	var sChannelXML = oTRSAction.doXMLHttpAction();

	var bExists = false;
	if(sChannelXML.indexOf("WCMCHANNEL")>=0){
		var oWCMObj = WCMObjHelper.parseXMLStrToObj(sChannelXML);
		bExists = (oWCMObj.getProperty("ChannelId") != _nChannelId);
	}
	if(bExists){
		this.sErrorInfo += "指定的频道名称["+_sChannelName+"]在当前站点中存在！\n所在位置：";
		oTRSAction = new CTRSAction("../channel/channel_nav.jsp");
		oTRSAction.setParameter("ChannelId", oWCMObj.getProperty("ChannelId"));
		var sChannelNav = oTRSAction.doXMLHttpAction();
		this.sErrorInfo += sChannelNav;
	}
	return bExists;
}