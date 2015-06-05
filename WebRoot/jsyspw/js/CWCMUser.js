//删除用户 0:不彻底 1:彻底
function onDeleteUserPermanent_def(_sElementName, _nType){
	var string1 = "";
	var string2 = "";
	if(_nType==1) {
		string1 = "请您首先选择进行彻底删除的用户！";
		string2 = "您将要对用户进行彻底删除操作，被删除的用户将不可恢复！是否确认删除？";
	}
	else {
		string1 = "请您首先选择删除的用户！";
		string2 = "您将要对用户进行删除操作，是否确认删除？";
	}
	var sValues = TRSHTMLElement.getElementValueByName(_sElementName);
	if(sValues==null || sValues.length==0){
		CTRSAction_alert(string1);
		return;
	}
	var oTRSAction = new CTRSAction("../auth/user_delete.jsp");
	oTRSAction.setParameter("UserIds",  sValues);
	oTRSAction.setParameter("Type",  _nType);
	if(CTRSAction_confirm(string2)){
		var bResult = oTRSAction.doDialogAction(500, 300);
		if(bResult)	CTRSAction_refreshMe();
	}
	return;
}

//还原用户
function onRestoreUser_def(_sElementName){
	var sValues = TRSHTMLElement.getElementValueByName(_sElementName);
	if(sValues==null || sValues.length==0){
		CTRSAction_alert("请您首先选择进行恢复操作的用户！");
		return;
	}
	var oTRSAction = new CTRSAction("../auth/user_restore.jsp");
	oTRSAction.setParameter("UserIds",  sValues);
	if(CTRSAction_confirm("您将要对用户进行恢复操作，是否确认还原？")){
		var bResult = oTRSAction.doDialogAction(500, 300);
		if(bResult)	CTRSAction_refreshMe();
	}
	return;
}

//修改一个用户
function onEditUser_def(_userId){
	var oTRSAction = new CTRSAction("../auth/user_addedit.jsp");
	oTRSAction.setParameter("UserId", _userId);
	var bResult = oTRSAction.doDialogAction(500, 500);
	if(bResult){
		window.top.refreshMain();
		return;
	}
}

//浏览用户
function onShowUser_def(_userId){
	var oTRSAction = new CTRSAction("../auth/user_show.jsp");
	oTRSAction.setParameter("UserId", _userId);
	oTRSAction.doOpenWinAction(500, 350);
}

//重置用户密码
function onResetPassword_def(_userId){
	if(_userId == null || _userId.length <= 0){
		CTRSAction_alert("请选择要重置密码的用户");
		return;
	}
	
	if(!CTRSAction_confirm("是否设置该用户密码为系统默认密码？"))	return;
	
	var oTRSAction = new CTRSAction("../auth/user_resetpassword.jsp");
	oTRSAction.setParameter("UserId", _userId);
	var bResult = oTRSAction.doDialogAction(500, 400);
	if(bResult){
		window.top.refreshMain();
		return;
	}
}

//验证用户状态
function onCheckStatus_def(_strUserIds, _strStatuses, _nAllowDeleted) {
	if(_strUserIds == null || _strStatuses == null) {
		return;
	}
	var nAllowDeleted = (_nAllowDeleted == null)?0:_nAllowDeleted;
	var oTRSAction = new CTRSAction("../auth/user_statuscheck.jsp");
	oTRSAction.setParameter("UserIds", _strUserIds);
	oTRSAction.setParameter("AllowStatuses", _strStatuses);
	oTRSAction.setParameter("AllowDeleted", nAllowDeleted);
	var sResult = oTRSAction.doXMLHttpAction();
	return sResult;
}

//查看用户权限
function onViewUserRight_def(_userId){	
/*	
	var oTRSAction = new CTRSAction("../auth/userright_list.jsp");	
	oTRSAction.setParameter("OperId",_userId);
	oTRSAction.setParameter("OperType",204);
	oTRSAction.setParameter("Flag",1);
	oTRSAction.doOpenWinAction(600, 500);
*/
	var rightViewWin = window.open("../WCMV6/auth/operator/right_view.jsp?OperId=" + _userId + "&OperType=" + 204, "right_view");
	if(rightViewWin){
		rightViewWin.focus();
	}
}

//设置用户权限
function onSetUserRight_def(_userId){
/*
	var oTRSAction = new CTRSAction("../auth/right_set_by_operator.jsp");	
	oTRSAction.setParameter("OperId",_userId);
	oTRSAction.setParameter("OperType",204);	
	oTRSAction.doOpenWinAction(1000, 600);	
*/
	var rightSetWin = window.open("../WCMV6/auth/operator/right_edit.jsp?OperId=" + _userId + "&OperType=" + 204, "right_set");
	if(rightSetWin){
		rightSetWin.focus();
	}
}

function CWCMUser(){
	this.onEditUser = onEditUser_def;
	this.onShowUser = onShowUser_def;
	this.onDeleteUserPermanent = onDeleteUserPermanent_def;
	this.onRestoreUser = onRestoreUser_def;
	this.onResetPassword = onResetPassword_def;
	this.onCheckStatus = onCheckStatus_def;
	this.onViewUserRight = onViewUserRight_def;
	this.onSetUserRight = onSetUserRight_def;
}

var WCMUser = new CWCMUser();