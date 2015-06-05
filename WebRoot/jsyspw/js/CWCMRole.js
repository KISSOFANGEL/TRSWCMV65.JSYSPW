//添加或修改一个角色
function onAddEditRole_def(_nRoleId){
	var oTRSAction = new CTRSAction("../auth/role_addedit.jsp");
	oTRSAction.setParameter("RoleId",  _nRoleId);
	var arResult = oTRSAction.doDialogAction(500, 350);
	if(arResult && arResult[0]){
		if(window.top.refreshNavItem)
			window.top.refreshNavItem(3, "../auto/role_nav.jsp", arResult[1]);
		if(window.top.gotoMain)
			window.top.gotoMain("../auth/roleuser_list.jsp?RoleId="+arResult[2]);
	}
}

//删除角色
function onDeleteRole_def(_sElementName){	
	var sValues = TRSHTMLElement.getElementValueByName(_sElementName);
	if(sValues==null || sValues.length==0){
		CTRSAction_alert("请选择删除的角色！");
		return;
	}
	if(!CTRSAction_confirm("是否确认删除选中的角色？")){
		return;	
	}
	var oTRSAction = new CTRSAction("../auth/role_delete.jsp");
	oTRSAction.setParameter("RoleIds", sValues);
	var arResult = oTRSAction.doDialogAction(500, 300);
	if(arResult){
		if(window.top.refreshNavItem)
			window.top.refreshNavItem(3, "../auto/role_nav.jsp", "0");
		if(window.top.gotoMain)
			window.top.gotoMain("../auth/role_list.jsp");
	}
}
//删除一个角色
function onDeleteSingleRole_def(_nRoleId){	
	if(!CTRSAction_confirm("是否确认删除当前角色？")){
		return;	
	}
	var oTRSAction = new CTRSAction("../auth/role_delete.jsp");
	oTRSAction.setParameter("RoleIds", _nRoleId);
	var arResult = oTRSAction.doDialogAction(500, 300);
	if(arResult){
		if(window.top.refreshNavItem)
			window.top.refreshNavItem(3, "../auto/role_nav.jsp", "0");
		if(window.top.gotoMain)
			window.top.gotoMain("../auth/role_list.jsp");
	}
}

//wenyh@20060424 add,right related methods.
//查看角色权限
function onViewRoleRight_def(_roleId){	
/*	
	var oTRSAction = new CTRSAction("../auth/userright_list.jsp");	
	oTRSAction.setParameter("OperId",_roleId);
	oTRSAction.setParameter("OperType",203);
	oTRSAction.setParameter("Flag",1);
	oTRSAction.doOpenWinAction(600, 500);
*/
	var rightViewWin = window.open("../WCMV6/auth/operator/right_view.jsp?OperId=" + _roleId + "&OperType=" + 203, "right_view");
	if(rightViewWin){
		rightViewWin.focus();
	}

}

//设置角色权限
function onSetRoleRight_def(_roleId){
/*
	var oTRSAction = new CTRSAction("../auth/right_set_by_operator.jsp");	
	oTRSAction.setParameter("OperId",_roleId);
	oTRSAction.setParameter("OperType",203);	
	oTRSAction.doOpenWinAction(800, 600);	
*/
	var rightSetWin = window.open("../WCMV6/auth/operator/right_edit.jsp?OperId=" + _roleId + "&OperType=" + 203, "right_set");
	if(rightSetWin){
		rightSetWin.focus();
	}
}

function CWCMRole(){
	this.onAddEditRole = onAddEditRole_def;
	this.onDeleteRole  = onDeleteRole_def;
	this.onDeleteSingleRole = onDeleteSingleRole_def;
	this.onViewRoleRight = onViewRoleRight_def;
	this.onSetRoleRight = onSetRoleRight_def;
}

var WCMRole = new CWCMRole();