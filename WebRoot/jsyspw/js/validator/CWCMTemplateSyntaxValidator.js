/** Title:			CWCMTemplateSyntaxValidator.js
 *  Description:
 *		Validate Template Syntax
 *  Copyright: 		www.trs.com.cn
 *  Company: 		TRS Info. Ltd.
 *  Author:			WSW
 *  Created:		2005-9-1
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
 *		
 *	Examples:
 *			
 *	Use:（test/WCMTemplateSyntaxValidator_test.html）
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
TRSValidator.addValidators("channel_name",  "CWCMTemplateSyntaxValidator",  "../js/CWCMTemplateSyntaxValidator.js");    
</Script>

...
<input type="text" value="" pattern="channel_name"  elname="频道名称" not_null=1 min_len='2' max_len='20' SiteId=2 ChannelId=0>
...
 */

function CWCMTemplateSyntaxValidator(){
	this.validate = CWCMTemplateSyntaxValidator_validate;
	this.isValidSyntax = CWCMTemplateSyntaxValidator_isValidSyntax;
	this.notDisplayErrorInfo = true;
}

CWCMTemplateSyntaxValidator.inherits(CStringValidator);

function CWCMTemplateSyntaxValidator_validate(){
	//1. Super Validate
	//if(!this.superMethod("validate")){
	//	return false;
	//}

	//2. Validate Content Syntax
	if(this.oElement.name == "TEMPTEXT"){
		if(!this.validateNotNull(this.oElement.value)) {
			CTRSAction_alert("请输入 [" + this.oElement.elname + "] ！");
			return false;
		}
		return !this.isValidSyntax(this.oElement);
	}

}

function CWCMTemplateSyntaxValidator_isValidSyntax(_oEl){
	//1.verify parameters
	var nWidth	= 700;
	var nHeight = 300;

	var nLeft	= (window.screen.availWidth - nWidth)/2;
	var nTop	= (window.screen.availHeight - nHeight)/2;

	//2.Construct parameters for dialog
	var sFeatures		= "dialogHeight: "+nHeight+"px; dialogWidth: "+nWidth+"px; "
						+ "dialogTop: "+nTop+"; dialogLeft: "+nLeft+"; "
						+ "center: Yes; scroll:Yes;help: No; resizable: No; status: No;";
	//3.display Dialog
	var sURL = "../tools/template_check.htm";
	try{
		var bResult = window.showModalDialog(sURL, _oEl, sFeatures);
		return bResult;
	}catch(e){
		alert("您的IE插件已经将对话框拦截！\n"
				+ "请将拦截去掉-->点击退出-->关闭IE，然后重新打开IE登录即可！\n"
				+ "给您造成不便，TRS致以深深的歉意！");		
	}	
	return false;
}