//中文
function getParentElement(_elSelf, _sTagName){
	var elTemp = _elSelf;
	for(var i=0; i<10; i++){
		if(elTemp == null)return null;
		if(elTemp.tagName == _sTagName)return elTemp;		

		elTemp = elTemp.parentElement;
	}
	return null;
}

function CWCMNavigation_setContentDisplay(_elItemTR, _bDisplay){
	if(!_elItemTR || _elItemTR.tagName != "TR")
		return;
	
	var elNavTable = getParentElement(_elItemTR, "TABLE");
	if(elNavTable.rows.length <= _elItemTR.rowIndex+1)
		return;	
	
	elNavTable.rows[_elItemTR.rowIndex+1].style.display = (_bDisplay?"inline":"none");
}

function CWCMNavigation_openItem(_nItemIndex, _bDisplayDebugInfo){
	if(_nItemIndex>this.nItemCount){
		//CTRSAction_alert("Index Invalid!["+_nItemIndex+"]");
		return;
	}

	var elNavItemTr = document.all("idItemTr"+_nItemIndex);
	if(_bDisplayDebugInfo){
		alert(_nItemIndex);
		alert(elNavItemTr.innerHTML);
	}
	if(elNavItemTr == null){
		CTRSAction_alert("Not Define Navigation Item!["+"idItemTr"+_nItemIndex+"]");
		return;
	}

	try{
		TRSRequestParam.setParameter("NavItem", _nItemIndex);
	}catch(e){}

	this.onClickItem(elNavItemTr, _nItemIndex-1);	
}

function CWCMNavigation_onClickItem(_elItemTR, _nItemIndex){
	var aFrame;
	try{
		aFrame = document.all("NavFrames", _nItemIndex).contentWindow;
	}catch(e){return;}
	if(aFrame == null){
		CTRSAction_alert("Required Frames is not defined in this page!");
		return;
	}

	if(aFrame.location.href == "about:blank"){
		aFrame.location.href = _elItemTR.FrameUrl;
	}

	CWCMNavigation_setContentDisplay(this.elPreClickItem, false);
	CWCMNavigation_setContentDisplay(_elItemTR, true);
	this.elPreClickItem = _elItemTR;
	this.nItemIndex = _nItemIndex || 0;
}

function CWCMNavigation_drawItem(_sItemName, _sUrl){
	this.nItemCount++;
	var sHTML = ""
			+"<TR id=\"idItemTr"+this.nItemCount+"\" FrameUrl=\""+_sUrl+"\" style=\"cursor:hand;\" onclick=\"WCMNavigation.onClickItem(this, "+(this.nItemCount-1)+");\" class=\"navigation_tr\">" 
			+"  <TD height=\"26\" background=\"../images/tdbg.jpg\">" 
			+"  <!--~== TABLE2 ==~-->" 
			+"  <TABLE width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">" 
			+"  <!--~--- ROW2 ---~-->" 
			+"  <TR>" 
			+"      <TD width=\"24\"><IMG src=\"../images/icon_down.gif\" width=\"24\" height=\"24\"></TD>" 
			+"    " 
			+"          <TD>"+_sItemName+"</TD>" 
			+"" 
			+"      <TD width=\"15\" valign=\"top\"><IMG src=\"../images/td_right.gif\" width=\"15\" height=\"14\"></TD>" 
			+"  </TR>" 
			+"  <!--~- END ROW2 -~-->" 
			+"  </TABLE>" 
			+"  <!--~ END TABLE2 ~-->" 
			+"  </TD>" 
			+"</TR>";
	document.write(sHTML);
}

function CWCMNavigation_refreshItem(_nItemIndex, _sUrl, _sLocatePath){
	var nItemIndex = ((_nItemIndex-1) || 0);
	var aFrame;
	try{
		aFrame = document.all("NavFrames", nItemIndex).contentWindow;
	}catch(e){return;}
	if(aFrame == null){
		CTRSAction_alert("Required Frames is not defined in this page!");
		return;
	}

	var sLocation = aFrame.location.href;
	if(sLocation == "about:blank"){
		sLocation = _sUrl || sLocation;
	}

	var sParams = "";
	var dtNow = new Date();
	var sRandomParam = "Random=" + (dtNow.getHours() + "" + dtNow.getMinutes() + "" + dtNow.getSeconds());
	if(sLocation.indexOf("?") < 0)
		sLocation += "?" + sRandomParam;
	else{
		var sAddress = sLocation.substring(0, sLocation.indexOf("?"));
		sParams = sLocation.substring(sLocation.indexOf("?") + 1);
		sLocation = sAddress + "?" + sRandomParam;
	}

	var sLocatePath = _sLocatePath || "";
	if(sLocatePath != null && sLocatePath.length > 0){
		if(sParams.length > 0 && sParams.indexOf("LocatePath=") > 0){
			var arParams = sParams.split("&");
			for(var i=0; i<arParams.length; i++){
				if(arParams[i].indexOf("LocatePath=")>=0)
					arParams[i] = "LocatePath=" + sLocatePath;
			}
			sLocation += "&" + TRSArray.toString(arParams, "&");
		} else {
			if(sParams.length > 0)
				sLocation += "&" + sParams + "&LocatePath=" + sLocatePath;
			else
				sLocation += "&LocatePath=" + sLocatePath;
		}
	} else {
		sLocation += "&" + sParams;
	}

	aFrame.location.replace(sLocation);
}

function CWCMNavigation_getCurrItemIndex(){
	return this.nItemIndex;
}

function CWCMNavigation(){
	this.elPreClickItem = null;
	this.nItemCount		= 0;
	this.nItemIndex		= 0;
}

CWCMNavigation.prototype.drawItem		= CWCMNavigation_drawItem;
CWCMNavigation.prototype.onClickItem	= CWCMNavigation_onClickItem;
CWCMNavigation.prototype.openItem		= CWCMNavigation_openItem;
CWCMNavigation.prototype.refreshItem	= CWCMNavigation_refreshItem;
CWCMNavigation.prototype.getCurrItemIndex	= CWCMNavigation_getCurrItemIndex;
//CWCMNavigation.prototype.getPreClickItem= CWCMNavigation_getPreClickItem;
//CWCMNavigation.prototype.setPreClickItem= CWCMNavigation_setPreClickItem;

var WCMNavigation = new CWCMNavigation();