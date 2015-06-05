//响应grpuser_list.jsp和user_list.jsp中用到的下拉框操作
function doOperation_def(_operType, _nGroupId){
	var sOperName = "";
	switch(_operType) {
		case 1 : 
			sOperName = "指定为组管理员";
			break;
		case 2 : 
			sOperName = "取消组管理员身份";
			break;
		case 3 : 
			sOperName = "开通";
			break;
		case 4 : 
			sOperName = "停用";
			break;
		default :
			sOperName = "操作";
	}
	var sValues = TRSHTMLElement.getElementValueByName("UserIds");
	if(sValues==null || sValues.length==0){
		CTRSAction_alert("请选择要"+sOperName+"的用户！");
		return;
	}
	
	if(_operType==1 ){
		if(!CTRSAction_confirm("是否确认将选中的用户指定为组管理员？"))
		return;	
		var sResult = WCMUser.onCheckStatus(sValues, "30");
		if(sResult == null) {
			CTRSAction_alert("参数错误！");
			return;
		}
		if(sResult.length > 0) {
			CTRSAction_alert("指定的用户必须均为已开通用户，请重新指定用户！");
			return;
		}
	}
	if(_operType==2 ){
		if(!CTRSAction_confirm("是否确认将选中的用户取消组管理员身份？"))
		return;	
	}
	if(_operType==3 ){
		if(!CTRSAction_confirm("是否确认开通选中的用户？"))
		return;	
	}

	if(_operType==4 ){
		if(!CTRSAction_confirm("是否确认停用选中的用户？"))
		return;	
	}
	var oTRSAction = new CTRSAction("../auth/user_manage.jsp");
	oTRSAction.setParameter("UserIds",  sValues);
	oTRSAction.setParameter("GroupId",  _nGroupId);
	oTRSAction.setParameter("OperType", _operType);
	var bResult = oTRSAction.doDialogAction(500, 300);
	
	if(bResult) {
		CTRSAction_refreshMe();
	}
	return;
}

//在上面的doOperation时同步控制提交按钮，如果是错误的选择，就disable提交按钮
function controlButton_def(_obj){
	var obj = _obj;
	if(obj==null || obj.value==null){
		return;
	}
	if(obj.value>0){
		document.all("submitOper").disabled = false;
		return;
	}else{
		document.all("submitOper").disabled = true;
		return;
	}
}

//创建一个新的用户，可在组织中创建，也可在用户管理中创建
function onCreateUser_def(_nGroupId){
	var oTRSAction = new CTRSAction("../auth/user_addedit.jsp");
	oTRSAction.setParameter("GroupId",  _nGroupId);
	oTRSAction.setParameter("UserId", 0);
	var bResult = oTRSAction.doDialogAction(500, 500);
	if(bResult){
		window.top.refreshMain();
		return;
	}
}

//添加或修改一个组织
function onAddEditGroup_def(_nGroupId, _nParentId){
	var oTRSAction = new CTRSAction("../auth/group_addedit.jsp");
	oTRSAction.setParameter("GroupId",  _nGroupId);
	oTRSAction.setParameter("ParentId", _nParentId);
	var arResult = oTRSAction.doDialogAction(500, 350);
	if(arResult && arResult[0]){
		if(window.top.refreshNavItem)
			window.top.refreshNavItem(arResult[3], "../auth/group_nav.jsp", arResult[1]);
		if(window.top.gotoMain) {
			window.top.gotoMain("../auth/grpuser_list.jsp?GroupId="+arResult[2]);
		}
	}
}

//删除组织
function onDeleteGroup_def(_sElementName){
	var sValues = TRSHTMLElement.getElementValueByName(_sElementName);
	if(sValues==null || sValues.length==0){
		CTRSAction_alert("请选择删除的组织！");
		return;
	}
	if(!CTRSAction_confirm("是否确认删除选中的组织？")){
		return;	
	}
	var oTRSAction = new CTRSAction("../auth/group_delete.jsp");
	oTRSAction.setParameter("GroupIds",  sValues);
	var arResult = oTRSAction.doDialogAction(500, 300);
	if(arResult){
		if(window.top.refreshNavItem)
			window.top.refreshNavItem(arResult[3], "../auth/group_nav.jsp", "0");
		if(window.top.gotoMain)
			window.top.gotoMain("../auth/group_list.jsp");
	}
}

//删除组织
function onDeleteSingleGroup_def(_nGroupId){
	if(!CTRSAction_confirm("是否确认删除当前组织？")){
		return;	
	}
	var oTRSAction = new CTRSAction("../auth/group_delete.jsp");
	oTRSAction.setParameter("GroupIds",  _nGroupId);
	var arResult = oTRSAction.doDialogAction(500, 300);
	if(arResult && arResult[0]){
		if(window.top.refreshNavItem)
			window.top.refreshNavItem(arResult[3], "../auth/group_nav.jsp", arResult[1]);
		if(window.top.gotoMain) {
			if(arResult[2] == "0")
				window.top.gotoMain("../auth/group_list.jsp");
			else 
				window.top.gotoMain("../auth/grpuser_list.jsp?GroupId="+arResult[2]);
		}
	}
}

//查看用户组权限
function onViewGroupRight_def(_groupId){		
/*
	var oTRSAction = new CTRSAction("../auth/userright_list.jsp");	
	oTRSAction.setParameter("OperId",_groupId);
	oTRSAction.setParameter("OperType",201);
	oTRSAction.setParameter("Flag",1);
	oTRSAction.doOpenWinAction(600, 500);
*/
	var rightViewWin = window.open("../WCMV6/auth/operator/right_view.jsp?OperId=" + _groupId + "&OperType=" + 201, "right_view");
	if(rightViewWin){
		rightViewWin.focus();
	}
}

//设置用户组权限
function onSetGroupRight_def(_groupId){
/*
	var oTRSAction = new CTRSAction("../auth/right_set_by_operator.jsp");	
	oTRSAction.setParameter("OperId",_groupId);
	oTRSAction.setParameter("OperType",201);	
	oTRSAction.doOpenWinAction(800, 600);	
*/
	var rightSetWin = window.open("../WCMV6/auth/operator/right_edit.jsp?OperId=" + _groupId + "&OperType=" + 201, "right_set");
	if(rightSetWin){
		rightSetWin.focus();
	}
}

function CWCMGroup(){
	this.doOperation = doOperation_def;
	this.controlButton = controlButton_def;
	this.onCreateUser  = onCreateUser_def;
	this.onAddEditGroup= onAddEditGroup_def;
	this.onDeleteGroup = onDeleteGroup_def;
	this.onDeleteSingleGroup = onDeleteSingleGroup_def;
	this.onViewGroupRight = onViewGroupRight_def;
	this.onSetGroupRight = onSetGroupRight_def;
}

var WCMGroup = new CWCMGroup();