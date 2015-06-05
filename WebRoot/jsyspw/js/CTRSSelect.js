/** Title:			CTRSSelect.js
 *  Description:
 *		可支持输入的下拉框列表
 *  Copyright: 		www.trs.com.cn
 *  Company: 		TRS Info. Ltd.
 *  Author:			WSW
 *  Created:		2005-9-20
 *  Vesion:			1.0
 *  Last EditTime:	2005-9-20
 *	Update Logs:
 *		WSW@2005-9-20 Created File
 *	Note:
 *
 *	Depends:
 *
 */

var theArray = new Array();

function CTRSSelect(objId, objHandler, sParamName, _bDisplayDesc){
	var objSelect = document.getElementById(objId);
	if(objSelect == null){
		alert("没有找到指定ID["+objId+"]的Select！");
		return;
	}	

	this.comObj = document.all[objId];
	this.comObj.selectedIndex = objSelect.selectedIndex;
	this.getValue = CTRSSelect_getValue;
	this.doResize = CTRSSelect_doResize;
	this.doChange = CTRSSelect_doChange;
	this.loseFocus = CTRSSelect_loseFocus;
	this.doSelectIdx = CTRSSelect_doSelectIdx;
	this.focus = CTRSSelect_focus;

	this.getLeftPostion = CTRSSelect_getLeftPostion;
	this.getTopPostion = CTRSSelect_getTopPostion;
	
	this.bDisplayDesc = _bDisplayDesc;
	this.setValue		= CTRSelect_setValue;
	this.getDesc		= CTRSSelect_getDesc;

	var strMsg="";

	//------------------------------------------------------------------------------------------------------
	// create the text object
	//------------------------------------------------------------------------------------------------------
	var txtObjIdName = sParamName;

	if (document.all[txtObjIdName] != null)
	{
		strMsg="The following id: '" + txtObjIdName +"' is used internally by the Combo Box!\r\n"+
		"Use of this id in your page may cause malfunction. Please use another id for your controls.";
		CTRSAction_alert(strMsg);
	}
	if(this.bDisplayDesc){
		var txtInner = "<INPUT type='text' id='" + txtObjIdName + "_1' name='" + txtObjIdName +
		"_1' onblur='" + objHandler + ".loseFocus()' " + 
		" style='display: none;position: absolute' value='' ignore=1>";

		this.comObj.insertAdjacentHTML("afterEnd", txtInner);
		this.txtObj = document.all[txtObjIdName+"_1"];
		

		var txtValueElement = "<INPUT type='hidden' id=" + txtObjIdName + " name=" + txtObjIdName +
		" value='' >";
		this.comObj.insertAdjacentHTML("afterEnd", txtValueElement);
		this.valueObj = document.all[txtObjIdName];

	}else{
		var txtInner = "<INPUT type='text' id=" + txtObjIdName + " name=" + txtObjIdName +
		" onblur='" + objHandler + ".loseFocus()' " + 
		" style='display: none;position: absolute' value='' >";

		this.comObj.insertAdjacentHTML("afterEnd", txtInner);
		this.txtObj = document.all[txtObjIdName];
	}

	
	//------------------------------------------------------------------------------------------------------
	// end
	//------------------------------------------------------------------------------------------------------

	this.beResizing = false;
	this.doResize();
	theArray[theArray.length] = this;

	if(objSelect.selectedIndex >= 0){
		this.doSelectIdx(objSelect.selectedIndex);
	}
}

function CTRSSelect_getValue(){
	if(this.bDisplayDesc){
		return this.valueObj.value;
	}

	return this.txtObj.value;
}

function CTRSSelect_getDesc(){
	return this.txtObj.value;
}

function CTRSSelect_doResize(){
	if (!this.beResizing){
		this.beResizing = true;
		this.txtObj.style.display="none";
		this.comObj.style.position="static";
		this.txtObj.style.posLeft = this.getLeftPostion(this.comObj);
		this.txtObj.style.posTop = this.getTopPostion(this.comObj) + 1;
		this.txtObj.style.posWidth = this.comObj.offsetWidth - 16;
		this.txtObj.style.posHeight = this.comObj.offsetHeight;
		this.comObj.style.position ="absolute";
		this.comObj.style.posLeft = this.txtObj.style.posLeft;
		this.comObj.style.posTop = this.txtObj.style.posTop;
		this.offWidth = this.comObj.offsetWidth;
		var strRect = "rect(0 "+(this.comObj.offsetWidth)+" "+ this.comObj.offsetHeight + 
		" "+(this.txtObj.style.posWidth - 2 )+")";

		this.comObj.style.clip = strRect;
		this.txtObj.style.display="";
		this.beResizing = false;
	}
}

function CTRSSelect_doChange(){
	var idx = this.comObj.selectedIndex;
	var opt = this.comObj.options[idx];
	this.setValue(opt);
	//this.txtObj.value = opt.text;	

	this.txtObj.focus();
	this.txtObj.select();
	this.comObj.selectedIndex=-1;
}

function CTRSSelect_loseFocus(){
	var theComObj = this.comObj;
	var theTxtObj = this.txtObj;
	var i;
	theComObj.selectedIndex = -1;

	if (theTxtObj.value == ""){
		return;
	}

	var optLen = theComObj.options.length;
	for (i=0;i<optLen;i++){
		//var comVal = theComObj.options[i].text;
		var comVal = theComObj.options[i].value;
		var txtVal = theTxtObj.value;

		if (comVal == txtVal){
			theComObj.selectedIndex = i;
			return;
		}
	}
}

function CTRSSelect_doSelectIdx(i){
	var optLen = this.comObj.options.length;

	if ((i >=0) && (i < optLen)){
		this.comObj.selectedIndex = i;
		//this.txtObj.value = this.comObj.options[i].text;
		//this.txtObj.value = this.comObj.options[i].value;
		this.setValue(this.comObj.options[i]);
		return;
	}

	this.txtObj.value = "";
	if(this.valueObj != null){
		this.valueObj.value = "";
	}
}

function CTRSSelect_focus(){
	this.txtObj.focus();
}

function CTRSSelect_getLeftPostion( theObj ){
	var pos = 0;
	while ( theObj != null ){
		pos += theObj.offsetLeft;
		//get the Object which contain theObj.
		theObj = theObj.offsetParent;
	}
	return pos;
}

function CTRSSelect_getTopPostion( theObj ){
	var pos = 0; 
	while ( theObj != null )
	{
		pos += theObj.offsetTop;
		//get the Object which contain theObj.
		theObj = theObj.offsetParent;
	}
	return pos;
}

function CTRSelect_setValue( _elOption ){
	if(this.bDisplayDesc){
		this.txtObj.value = _elOption.text;
		this.valueObj.value = _elOption.value;
	}else{
		this.txtObj.value = _elOption.value;
	}
}