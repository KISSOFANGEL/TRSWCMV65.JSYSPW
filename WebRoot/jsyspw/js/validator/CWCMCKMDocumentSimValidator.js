/** Title:			CWCMCKMDocumentSimValidator.js
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
 *	Use:（test/WCMCKMDocumentSimValidator_test.html）
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
//register WCMCKMDocumentSimValidator Validator
TRSValidator.addValidators("sim_search",  "CWCMCKMDocumentSimValidator",  "../js/validator/CWCMCKMDocumentSimValidator.js");    
</Script>

...
<input type="text" value="" pattern="sim_search"  elname="文档内容" not_null=1 DocId=12>
...
 */

function CWCMCKMDocumentSimValidator(){
	this.validate				= CWCMCKMDocumentSimValidator_validate;
	this.isSimContentExists		= CWCMCKMDocumentSimValidator_isSimContentExists;
	this.notDisplayErrorInfo	= true;
}

CWCMCKMDocumentSimValidator.inherits(CStringValidator);

function CWCMCKMDocumentSimValidator_validate(){
	if(document.frmData && document.frmData.DocType && document.frmData.DocType.value>20){
		return true;
	}

	//1. Super Validate
	if(document.frmData.DocType.value == 10 && !this.superMethod("validate")){		
		this.notDisplayErrorInfo = false;
		return false;
	}

	//2. Validate Element Args
	if(!WCMCKMSimSearchConfig || !WCMCKMSimSearchConfig.enable){
		return true;
	}
	if(!this.oElement.DocId){
		this.sErrorInfo += "没有定义DocId";
		return false;
	}

	//3. Special Validate
	return !this.isSimContentExists();

}

function CWCMCKMDocumentSimValidator_isSimContentExists(){
	var args = [];
	args[0] = this.oElement.DocId;
	args[1] = this.oElement.value;

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
	var sURL = "../ckm/document_sim_search.html";
	try{
		var bResult = window.showModalDialog(sURL, args, sFeatures);					
		return bResult;			
	}catch(e){
		alert("您的IE插件已经将对话框拦截！\n"
				+ "请将拦截去掉-->点击退出-->关闭IE，然后重新打开IE登录即可！\n"
				+ "给您造成不便，TRS致以深深的歉意！");		
	}	
	return false;
}