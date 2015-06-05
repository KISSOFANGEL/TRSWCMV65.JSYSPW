/*==============================================
	Class: CWCMStatHostNameValidator
*===============================================

/*!
	Check if the hostname existsed.
*/

function CWCMStatHostNameValidator(){
	this.validate				= CWCMStatHostNameValidator_validate;
	this.isStatHostNameExists	= CWCMStatHostNameValidator_isStatHostNameExists;
};

CWCMStatHostNameValidator.inherits(CStringValidator);

function CWCMStatHostNameValidator_validate(){
	if(!this.superMethod("validate")){		
		return false;
	}
	
	return !this.isStatHostNameExists(this.oElement.value, this.oElement.StatHostId);
};

function CWCMStatHostNameValidator_isStatHostNameExists(_sStatHostName, _nStatHostId){
	var sURL	 = "../stat/stathost_get_by_name.jsp";
	var oTRSAction = new CTRSAction(sURL);
	oTRSAction.setParameter("StatHostName", _sStatHostName);
	oTRSAction.setParameter("StatHostId", _nStatHostId);
	var sXML = oTRSAction.doXMLHttpAction();
	var bExists = false;

	var report = WCMObjHelper.parseXMLStrToObj(sXML);
	if(report != null){
		this.sErrorInfo += report.getProperty("MESSAGE");
		bExists = true;
	}
	return bExists;
}