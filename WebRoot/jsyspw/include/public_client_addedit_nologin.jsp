<SCRIPT LANGUAGE="JavaScript" src="../js/CTRSHashtable.js"></script>
<SCRIPT LANGUAGE="JavaScript" src="../js/CTRSRequestParam.js"></script>

<!--Form 数据有效性的校验 BEGIN-->
<SCRIPT LANGUAGE="JavaScript" src="../js/TRSBase.js"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript" src="../js/CTRSString.js"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript" src="../js/CTRSValidator.js"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript" src="../js/CTRSValidator_res_default.js"></SCRIPT>
<!--Form 数据有效性的校验 END-->

<SCRIPT LANGUAGE="JavaScript" src="../js/CWCMObjHelper.js"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript" src="../js/CWCMObj.js"></SCRIPT>

<SCRIPT LANGUAGE="JavaScript" src="../js/CWCMAction.js"></SCRIPT>

<SCRIPT LANGUAGE="JavaScript" src="../js/CTRSAction.js"></script>

<SCRIPT LANGUAGE="JavaScript" src="../js/CTRSButton.js"></script>

<SCRIPT LANGUAGE="JavaScript" src="../js/CTRSBitsValue.js"></SCRIPT>

<SCRIPT LANGUAGE="JavaScript" src="../js/CWCMDialogHead.js"></SCRIPT>

<SCRIPT LANGUAGE="JavaScript">
function unlockObj(_nObjId, _nObjType){
	var oTRSAction = new CTRSAction("../include/object_unlock.jsp");
	oTRSAction.setParameter("ObjId", _nObjId);
	oTRSAction.setParameter("ObjType", _nObjType);
	oTRSAction.doXMLHttpAction();
	return;
}

function unlock(_nObjId, _nObjType){
	if(_nObjId>0) {
		unlockObj(_nObjId, _nObjType);
	}
}
</SCRIPT>