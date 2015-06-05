/** Title:			CStringValidator.js
 *  Description:
 *		Validate String
 *  Copyright: 		www.trs.com.cn
 *  Company: 		TRS Info. Ltd.
 *  Author:			WSW
 *  Created:		2004-11-24
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
 *
 *	Examples:
 *			
 */

function CStringValidator(){
}

CStringValidator.inherits(CBaseValidator);
CStringValidator.registerMethod("validate",					CStringValidator_validate);
CStringValidator.registerMethod("validateStringMaxLength",  CStringValidator_validateStringMaxLength);
CStringValidator.registerMethod("validateStringMinLength",  CStringValidator_validateStringMinLength);
CStringValidator.registerMethod("validateEmail",			CStringValidator_validateEmail);
CStringValidator.registerMethod("validateDBKeyWords",		CStringValidator_validateDBKeyWords);
CStringValidator.registerMethod("validateSpecialCharacters",CStringValidator_validateSpecialCharacters);

function CStringValidator_validate(){
	if(this.oElement == null){
		this.oElement = arguments[0];
	}
	if(!this.superMethod("validate")){
		return false;
	}

	var bPassword = (this.oElement.type == "password");
	if(this.oElement.min_len){
		if(!this.validateStringMinLength(this.oElement, bPassword)){
			return false;
		}
	}
	if(this.oElement.max_len){
		if(!this.validateStringMaxLength(this.oElement, bPassword)){
			return false;
		}
	}
	if(this.oElement.isemail){
		if(!this.validateEmail(this.oElement.value)){
			return false;
		}
	}
	if(this.oElement.checkdbkeywords){
		if(!this.validateDBKeyWords(this.oElement.value)){
			return false;
		}
	}
	
	/*
	if(!this.oElement.special_char) {
		if(this.validateSpecialCharacters(this.oElement.value, this.oElement)){
			return false;
		}
	}
	*/
	return true;
}

function CStringValidator_validateStringMaxLength(_oElement, _bPassword){
	var nMaxLen = _oElement.max_len;
	if(isNaN(nMaxLen))return true;
	var sCode = TRSString.trim(_oElement.value);
	var nLen = TRSString.getStringLength(sCode);
	if(nLen==0)return true;

	if(nLen>parseInt(nMaxLen)){
		if(!_bPassword){
			this.sErrorInfo += (this.sErrorInfo.length>1?"\n\n":"")+"您输入的["+_oElement.elname+"]长度大于最大长度 [" + nMaxLen + "](注：每个汉字长度为2)！";
			return false;
		}
		this.sErrorInfo += (this.sErrorInfo.length>1?"\n\n":"")+"您输入的密码长度大于最大长度 [" + nMaxLen + "]！";
		return false;
	}
	return true; 
}


function CStringValidator_validateStringMinLength(_oElement, _bPassword){
	var nMinLen = _oElement.min_len;
	if(isNaN(nMinLen))return true;
	var sCode = TRSString.trim(_oElement.value);
	var nLen = TRSString.getStringLength(sCode);

	if(nLen<parseInt(nMinLen)){
		if(!_bPassword){
			this.sErrorInfo += (this.sErrorInfo.length>1?"\n\n":"")+"您输入的["+_oElement.elname+"]长度小于最小长度 [" + nMinLen + "]！";
			return false;
		}
		this.sErrorInfo += (this.sErrorInfo.length>1?"\n\n":"")+"您输入的密码长度小于最小长度 [" + nMinLen + "]！";
		return false;
	}
	return true; 
}

function CStringValidator_validateEmail(_sCode){
	if(!TRSString.isEmailAddress(_sCode)){
		this.sErrorInfo += (this.sErrorInfo.length>1?"\n\n":"")+"无效Email地址！";
		return false;
	}
	return true;
}

function CStringValidator_validateDBKeyWords(_sCode){
	var oTRSAction = new CTRSAction("../tools/check_string_is_dbkeywords.jsp");
	oTRSAction.setParameter("StrValue", TRSString.trim(_sCode));
	var sResult = oTRSAction.doXMLHttpAction();
	var bResult = (sResult=="true");
	if(bResult){
		this.sErrorInfo += (this.sErrorInfo.length>1?"\n\n":"")+"字符串 [" + _sCode + "] 属于数据库关键字，不能使用！";
	}
	return !bResult;
}

function CStringValidator_validateSpecialCharacters(_sCode,_oElement) {
	var sName = "字符串";
	if(_oElement != null) {
		sName = "[" + _oElement.elname + "]";
	}
	var sResult = CStringValidator_validateSpecialCharacters_def(_sCode);
	if(sResult==null) {
		return false;
	} else {
		this.sErrorInfo += (this.sErrorInfo.length>1?"\n\n":"")+"您输入的"+sName+"包含禁用的特殊字符 ["+sResult+"]！";
		return true;
	}
}

function CStringValidator_validateSpecialCharacters_def(_sCode) {
	var regExp = /[<>\[\]{}#*%$%&^!~`\"\']/g;
	var sResult = _sCode.match(regExp)
	return sResult;
}