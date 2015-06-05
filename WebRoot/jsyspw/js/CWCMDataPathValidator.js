/** Title:			CWCMDataPathValidator.js
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
TRSValidator.addValidators("channel_name",  "CWCMDataPathValidator",  "../js/CWCMDataPathValidator.js");    
</Script>

...
<input type="text" value="" pattern="channel_name"  elname="频道名称" not_null=1 min_len='2' max_len='20' SiteId=2 ChannelId=0>
...
 */

function CWCMDataPathValidator(){
	this.validate				= CWCMDataPathValidator_validate;
	this.isDataPathExists	= CWCMDataPathValidator_isDataPathExists;
}

CWCMDataPathValidator.inherits(CStringValidator);

function CWCMDataPathValidator_validate(){
	//1. Super Validate
	if(!this.superMethod("validate")){		
		return false;
	}

	//2. Validate Element Args
	if(!this.oElement.FolderType){
		//CTRSAction_alert("没有定义SiteId");
		this.sErrorInfo += "没有定义FolderType";
		return false;
	}
	if(!this.oElement.ChannelId && this.oElement.FolderId != 0){
		//CTRSAction_alert("没有定义ChannelId");
		this.sErrorInfo += "没有定义FolderId";
		return false;
	}
	if(!this.oElement.DataPath){
		//CTRSAction_alert("没有定义ChannelId");
		this.sErrorInfo += "没有定义DataPath";
		return false;
	}

	//3. Special Validate
	return !this.isDataPathExists(this.oElement.FolderType, this.oElement.FolderId, this.oElement.value);

}

function CWCMDataPathValidator_isDataPathExists(_nFolderType, _nFolderId, _sDataPath){
	var sURL	 = "../channel/channel_get_by_datapath.jsp";
	var oTRSAction = new CTRSAction(sURL);
	oTRSAction.setParameter("FolderType", _nFolderType);
	oTRSAction.setParameter("FolderId", _nFolderId);
	oTRSAction.setParameter("DataPath", _sDataPath);
	var sResult = oTRSAction.doXMLHttpAction();
	CTRSAction_alert(sResult);
	if(sResult==null || sResult=="") {
		return false;
	} else {
		this.sErrorInfo += sResult;
		return false;
	}
}