var TYPE_WCMOBJ_USER	= 204;
var TYPE_WCMOBJ_GROUP	= 201;
var TYPE_WCMOBJ_ROLE	= 203;

var WCMOBJ_PROPERTIES_NODE_NAME = "PROPERTIES";

function CNewWCMRightHelper(){
//定义属性
	this.arRightDef	= [];	
	this.arRight		= [];
	this.bUpdate		= false;
	this.Order			= 0;

//定义方法
	this.draw			= CNewWCMRightHelper_draw; //生成权限的交互页面
	this.addRightDef	= CNewWCMRightHelper_addRightDef; //添加权限的定义
	this.addRight		= CNewWCMRightHelper_addRight; //添加权限
	this.selectAll		= CNewWCMRightHelper_selectAll;
	this.removeAt		= CNewWCMRightHelper_removeAt;
	this.removeAll		= CNewWCMRightHelper_removeAll;
	this.putOperator	= CNewWCMRightHelper_putOperator;

	this.getIdArray		= CNewWCMRightHelper_getIdArray;
	this.getNameArray	= CNewWCMRightHelper_getNameArray;
	this.getIndexArray	= CNewWCMRightHelper_getIndexArray;
	this.toXMLInfo		= CNewWCMRightHelper_toXMLInfo;

	this.setRightStatus	= CNewWCMRightHelper_setRightStatus;
	this.compare		= CNewWCMRightHelper_compare;
	this.sort			= CNewWCMRightHelper_sortFunction;
	this.selectCol		= CNewWCMRightHelper_selectCol;
}

function getParentElementByTagName(_element, _sTagName){
	if(_element == null)
		return null;

	var parent = _element.parentElement;
	if(parent == null)
		return null;
	var sTagName = parent.tagName;
	if(sTagName == null || sTagName == "BODY")
		return null;

	if(sTagName == _sTagName)
		return parent;

	return getParentElementByTagName(parent, _sTagName);
}

function CNewWCMRightHelper_getColSelectAllStatus(_oParentTable, _nBeginRowIndex, _nCellIndex){
	var oRows			= _oParentTable.rows;
	for(var i=_nBeginRowIndex; i<oRows.length; i++){
		var oCell		= oRows[i].cells[_nCellIndex];
		var arEls		= oCell.getElementsByTagName("INPUT");
		if(arEls == null || arEls.length<=0){
			CTRSAction_alert("数据有误："+oCell.outerHTML);
			return;
		}

		if(!arEls[0].checked)
			return true;
	}
	return false;
}

function CNewWCMRightHelper_selectCol(_elEventTD, _nRightIndex){
	var nCellIndex		= _elEventTD.cellIndex;
	var oParentTR		= getParentElementByTagName(_elEventTD, "TR");
	var nTRIndex		= oParentTR.rowIndex;
	var oParentTable	= getParentElementByTagName(oParentTR, "TABLE");
	
	var bChecked		= CNewWCMRightHelper_getColSelectAllStatus(oParentTable, nTRIndex+1, nCellIndex);
	var oRows			= oParentTable.rows;
	var nRightNo		= 0;
	for(var i=nTRIndex+1; i<oRows.length; i++, nRightNo++){
		var oCell		= oRows[i].cells[nCellIndex];
		var arEls		= oCell.getElementsByTagName("INPUT");
		if(arEls == null || arEls.length<=0){
			CTRSAction_alert("数据有误："+oCell.outerHTML);
			return;
		}

		arEls[0].checked = bChecked;

		NewWCMRightHelper.setRightStatus(nRightNo, _nRightIndex, arEls[0].checked);
	}
}


function CWCMRight(_nOprType, _nOprId, _sName, _sValue, _nRightId){
//定义对象的属性
	this.nRightId			= _nRightId || 0;
	this.nOprType			= _nOprType;
	this.nOprId				= _nOprId;
	this.sName				= _sName;

	var nLen = _sValue.length;
	this.arValue			= new Array();
	for(var i=nLen; i>0; i--){
		this.arValue[nLen-i] = _sValue.charAt(i-1);
	}
	//this.arValue			= (_sValue == null?[]:_sValue.split(""));	
	

	this.oWCMObj			= new CWCMObj();
	this.oWCMObj.setProperty("OPRTYPE", this.nOprType);
	this.oWCMObj.setProperty("OPRID", this.nOprId);
	this.oWCMObj.setProperty("RIGHTVALUE", _sValue);
	this.oWCMObj.setProperty("RIGHTID", this.nRightId);

//定义对象的方法
	this.isHasRight			= CWCMRight_isHasRight;
	this.getKey				= CWCMRight_getKey;
	this.toXML				= CWCMRight_toXML;
	this.getOperatorType	= function(){
		return this.nOprType;
	};
	this.getOperatorId	= function(){
		return this.nOprId;
	};

	this.setRightStatus	= CWCMRight_setRightStatus;
	
}


function RightToHTML(_nType, _sName){
	switch(_nType){
		case TYPE_WCMOBJ_USER:
			return "用户[<font color=blue>"+_sName+"</font>]";
		case TYPE_WCMOBJ_GROUP:
			return "用户组[<font color=blue>"+_sName+"</font>]";
		case TYPE_WCMOBJ_ROLE:
			return "角色[<font color=blue>"+_sName+"</font>]";
		default:
			return "未知[<font color=blue>"+_sName+"</font>]";
	}
}

function CWCMOperator_toHTML(){
	switch(this.nType){
		case TYPE_WCMOBJ_USER:
			return "用户["+this.sName+"]";
		case TYPE_WCMOBJ_GROUP:
			return "用户组["+this.sName+"]";
		case TYPE_WCMOBJ_ROLE:
			return "角色["+this.sName+"]";
		default:
			return "未知["+this.sName+"]";
	}
}

function CWCMOperator_getKey(){
	return this.nType+"_"+this.nId；
}


function CWCMOperator(_nType, _nId, _sName){
//定义属性
	this.nType	= _nType;
	this.nId		= _nId;
	this.sName	= _sName;

//定义方法
	this.getKey = function(){
		return this.nType+"_"+this.nId;
	};

	this.toHTML = CWCMOperator_toHTML;	
}

function CWCMRight_isHasRight(_nRightIndex){
	if((_nRightIndex+1) > this.arValue.length)
		return false;
	return (this.arValue[_nRightIndex] != 0);	
}

function CWCMRight_getKey(){
	return this.oWCMObj.getProperty("OPRTYPE") + "_" + this.oWCMObj.getProperty("OPRID");
}


function CWCMRight_toXML(){	
	return WCMObjHelper.toXMLString(this.oWCMObj, "WCMRIGHT");
}



function CWCMRight_setRightStatus(_nRightIndex, _bHasRight){
	if(this.arValue.length<(_nRightIndex+1)){
		this.arValue.length = (_nRightIndex+1);
		for(var i=0; i<(_nRightIndex+1); i++){
			if(this.arValue[i] == null || this.arValue[i].length==0){
				this.arValue[i] = 0;
			}
		}
	}
	this.arValue[_nRightIndex] = (_bHasRight?1:0);

	var str = "";
	for(var i=(this.arValue.length-1); i>=0; i--){
		str += this.arValue[i];
	}

	this.oWCMObj.setProperty("RIGHTVALUE", str);
}


function CNewWCMRightHelper_notifyRemove(_elEvent){
}

function CNewWCMRightHelper_onClickRightCheck(_elEvent, _nRightNo, _nRightIndex){
	NewWCMRightHelper.setRightStatus(_nRightNo, _nRightIndex, _elEvent.checked);
}

function CNewWCMRightHelper_draw(_sRightType, _elDiv){
	var sRightType = _sRightType.toLowerCase();
	var sHTML = ""
			+"<TABLE width=\"98%\" border=\"0\" cellpadding=\"0\" cellspacing=\"1\" bgcolor=\"A6A6A6\">" 
			+"							<TR bgcolor=\"#BEE2FF\" class=\"list_th\">"			
			+"<TD bgcolor=\"#BEE2FF\">全选</TD>"
			+"<TD bgcolor=\"#BEE2FF\"><A href=\"#\" onClick=\"NewWCMRightHelper.sort();init();\">被设置者";

		if (this.Order == 1) sHTML +="▲";
		if (this.Order == -1) sHTML +="▼";
			
		sHTML += "</A></TD>";

	
	//按原顺序显示设置者，并且排序方式不变
	var nOrder = this.Order;
		
	this.Order = 0- this.Order;
	this.sort();
	this.Order = nOrder;

	var arrayofIndexes = new Array();

	//Table Head
	for(var i=0; i<this.arRightDef.length; i++){
		if(this.arRightDef[i] == null)continue;
		
		var arTemp = null;
		if(this.arRightDef[i].constructor == Array){
			arTemp = this.arRightDef[i];
		}else{
			arTemp = [];
			arTemp[0] = this.arRightDef[i];
		}
		
		var bFound = false;
		for(var j=0; j<arTemp.length; j++){
			if(arTemp[j]["Type"] != sRightType)
				continue;
			
			sHTML += "<TD bgcolor=\"#BEE2FF\" title=\""+arTemp[j]["Desc"]+"[点击后可以选择一列]\" "
					+"onclick=\"NewWCMRightHelper.selectCol(this, "+arTemp[j]["Index"]+");\" style=\"cursor:hand\">"
					+ arTemp[j]["Name"] + "</TD>";
			bFound = true;			
		}

		if(bFound)
			arrayofIndexes.push(i);
	}

	
	sHTML += "<TD bgcolor=\"#BEE2FF\">删除</TD>\n"			
	sHTML += "</TR>";


	//Table Body
	var oRight = null, oRightDef, sBgColor;
	for(var i=0; i<this.arRight.length; i++){
		oRight = this.arRight[i];
		sBgColor = ((i+1)%2)==1?"white":"F5F5F5";
		sHTML	+= "<TR style=\"background-color:"+sBgColor+";font-size:9pt;\">\n"
				+"<TD align=center><input type=checkbox onclick=\"NewWCMRightHelper.selectAll("+i+",'"+sRightType+"', this.checked)\">"
				+(i+1)+"</TD>"
				+"<TD align=left>"+RightToHTML(oRight.nOprType, oRight.sName)+"</TD>";			
		
		//所有选项
		for(var j=0; j<arrayofIndexes.length; j++){
			oRightDef = this.arRightDef[arrayofIndexes[j]];
			if(oRightDef == null)continue;

			var arTemp = null;
			if(oRightDef.constructor == Array){
				arTemp = this.arRightDef[arrayofIndexes[j]];
			}else{
				arTemp = [];
				arTemp[0] = oRightDef;
			}

			
			
			var bFound = false;
			for(var nRightDefIndex=0; nRightDefIndex<arTemp.length; nRightDefIndex++){
				var oRightDefTemp = arTemp[nRightDefIndex];
				if(oRightDefTemp["Type"] != sRightType)
					continue;				
				
				nRightIndex = oRightDefTemp["Index"];
				sHTML += "<TD  align=center title=\""+oRightDefTemp["Desc"]+"\">"
					+ "<input type=checkbox onClick=\"CNewWCMRightHelper_onClickRightCheck(this, "+i+", "+nRightIndex+")\" value=\""+nRightIndex+"\" name=\""+_sRightType+"_"+oRight.getKey()+"\" "+(oRight.isHasRight(nRightIndex)?"checked":"")+">" + "</TD>";
			}
		}
		sHTML += "<TD align=center><img alt='删除当前设置信息' src=\"../images/button_delete_small.gif\" onclick=\"NewWCMRightHelper.removeAt("+i+");CNewWCMRightHelper_notifyRemove(this);\" style=\"cursor:hand;\"></TD>";

		sHTML	+= "</TR>\n";		
	}
	
	
	//Table End
	sHTML += "</TABLE>";
			
	if(_elDiv == null)
		document.write(sHTML);
	else
		_elDiv.innerHTML = sHTML;
}

function CNewWCMRightHelper_addRightDef(_nIndex, _sName, _sDesc, _sType){
	var oItem = {};
	oItem["Index"] = _nIndex;
	oItem["Name"]	= _sName;
	oItem["Desc"]	= _sDesc;
	oItem["Type"]	= _sType.toLowerCase();

	if((_nIndex+1) > this.arRightDef.length)
		this.arRightDef.length = (_nIndex+1);	
	
	if(this.arRightDef[_nIndex] == null){
		this.arRightDef[_nIndex] = oItem;
	}else if(this.arRightDef[_nIndex].constructor == Object){
		var arTemp = [];
		arTemp.push(this.arRightDef[_nIndex]);
		arTemp.push(oItem);
		this.arRightDef[_nIndex] = arTemp;
	}else if(this.arRightDef[_nIndex].constructor == Array){
		this.arRightDef[_nIndex].push(oItem);		
	}else{
		alert("RightDef对象类型未知！\n[Index="+_nIndex+"]\n[对象类型："+this.arRightDef[_nIndex].constructor+"]");
	}
}

function CNewWCMRightHelper_addRight(_nOperatorType, _nOperatorId, _sOperatorName, _sValue, _nRightId){
	var oRight = new CWCMRight(_nOperatorType, _nOperatorId, _sOperatorName, _sValue, _nRightId);
	this.arRight[this.arRight.length] = oRight;
}

function CNewWCMRightHelper_selectAll(_nRightIndex, _sPrefix , _bChecked){
	TRSHTMLElement.selectAllByName(_sPrefix+"_"+this.arRight[_nRightIndex].getKey(), _bChecked);
}

function CNewWCMRightHelper_removeAt(_nRightIndex){
	TRSArray.splice(this.arRight, _nRightIndex, 1);
}

function CNewWCMRightHelper_removeAll(){
	if(!CTRSAction_confirm("您确认删除全部的设置！"))
		return;

	if(this.arRight.length == 0)
		return;

	this.arRight.length = 0;
	CNewWCMRightHelper_notifyRemove(null);
}


function CNewWCMRightHelper_putOperator(_nType, _nId, _sName){
	for(var i=0; i<this.arRight.length; i++){
		if(this.arRight[i].nOprType == _nType
			&& this.arRight[i].nOprId == _nId){
			return;
		}
	}
	
	this.bUpdate		= true;
	this.addRight(_nType, _nId, _sName, "0");
}

function CNewWCMRightHelper_getIdArray(_nType){
	var arId = [];
	for(var i=0; i<this.arRight.length; i++){
		if(this.arRight[i].getOperatorType() == _nType)
			arId[arId.length] = this.arRight[i].getOperatorId();
	}
	return arId;
}

function CNewWCMRightHelper_getNameArray(_nType){
	var arName = [];
	for(var i=0; i<this.arRight.length; i++){
		if(this.arRight[i].getOperatorType() == _nType)
			arName[arName.length] = this.arRight[i].sName;
	}
	return arName;
}

function CNewWCMRightHelper_getIndexArray(_nType){
	var arIndex = [];
	for(var i=0; i<this.arRight.length; i++){
		if(this.arRight[i].getOperatorType() == _nType)
			arIndex[arIndex.length] = i;
	}
	return arIndex;
}


function CNewWCMRightHelper_toXMLInfo(){
	var sResult = "<WCMRIGHTS>\n";
	
	for(var i=0; i<this.arRight.length; i++){
		sResult += this.arRight[i].toXML() + "\n";
	}

	sResult += "</WCMRIGHTS>";

	return sResult;
}

function CNewWCMRightHelper_setRightStatus(_nRightNo, _nRightIndex, _bHasRight){
	if(this.arRight.length<(_nRightNo+1)){
		CTRSAction_alert("RightNo["+_nRightNo+"]不正确！溢出！");
		return;
	}

	this.arRight[_nRightNo].setRightStatus(_nRightIndex, _bHasRight);
}

function CNewWCMRightHelper_compare(_oRight1,_oRight2){
	var oRight1 = _oRight1 || null;
	var oRight2 = _oRight2 || null;

	if (oRight1 == null && oRight2 == null) return 0;
	if (oRight1 == null) return -1;
	if (oRight2 == null) return 1;
	
	var result= oRight2.nOprType - oRight1.nOprType;
	if (result != 0) return result>0?1:-1;
	
	if (oRight1.sName > oRight2.sName) return 1;
	if (oRight1.sName < oRight2.sName) return -1;
	
	return 0;
	
	
}

function CNewWCMRightHelper_sortFunction(){
	var temp;
	var len = this.arRight.length;
	var k;

	if (this.Order == 0) this.Order =1;
	else this.Order = 0 - this.Order;
	var nOrder = this.Order;


	for (var i=0; i<(len-1);i++ ){
		
		k=i;
		for (var j = i+1;j < len;j++ ){
			if (this.compare(this.arRight[k],this.arRight[j]) == nOrder)
				k = j;
		}
		if (k!=i){
			temp = this.arRight[i];
			this.arRight[i] = this.arRight[k];
			this.arRight[k] = temp;
		}

	}

}


var NewWCMRightHelper = new CNewWCMRightHelper();