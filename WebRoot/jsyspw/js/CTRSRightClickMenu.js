//Update Logs:
//	2006.04.30	caohui
//		提高右键菜单的显示速度，将右键点击操作屏蔽
//菜单元素对象的定义
	// Contants
	var MENU_DIV_ID = "__ContextMenu__";
	var MENU_SEPARATOR = "" ; // Context menu separator
	var NOT_VALID_RIGHT = "-1";
	var IS_ADMIN = 0;
	var m_objSrcEl = null;
	//保存指定元素的右键菜单
	var m_arContextMenu = new Array();
	var m_arRightIndexes = new Array();
	
	document.write("<div id='"+MENU_DIV_ID+"' style='height:0px; display:none'></div>");

	function ContextMenuSeparator(parentItem){
		this.Text = MENU_SEPARATOR ;
		this.ParentItem		= parentItem;
		if(parentItem != null)parentItem.addChildItem(this);
	}

	// Class that represents an item on the context menu
	function ContextMenuItem(text, id, command, parentItem, rightIndex){
		this.Text			= text ;
		this.Command		= command || "void(0)" ;
		this.Id				= id;
		this.ParentItem		= parentItem;
		this.RightIndex		= rightIndex || NOT_VALID_RIGHT ;	
		this.ChildrenItem	= new Array();

		if(parentItem != null)parentItem.addChildItem(this);
	}

	ContextMenuItem.prototype.addChildItem = ContextMenuItem_addChildItem;

	function ContextMenuItem_addChildItem(_objMenuItem){
		this.ChildrenItem[this.ChildrenItem.length] = _objMenuItem;
	}	

//ContextMenu的HTML对象
	function ContextMenuHTML(){
		this.AddExtendMenu=AddExtendMenu;
		this.AddItem=AddItem;
		this.GetMenu=GetMenu;
		this.HideAll=HideAll;
		this.I_OnMouseOver=I_OnMouseOver;
		this.I_OnMouseOut=I_OnMouseOut;
		this.I_OnMouseUp=I_OnMouseUp;
		this.P_OnMouseOver=P_OnMouseOver;
		this.P_OnMouseOut=P_OnMouseOut;
		A_TopItem = new Array();
		HTMLstr  = "";
		HTMLstr += "<!-- RightButton PopMenu -->\n";
		HTMLstr += "\n";
		HTMLstr += "<!-- PopMenu Starts -->\n";
		HTMLstr += "<div id='E_TopItem' class='rm_div'>\n";
		// TopItem = right button pop menu
		HTMLstr += "<table class=normal width='100%' border='0' cellspacing='0'>\n";
		HTMLstr += "<!-- Insert A Extend Menu or Item On Here For E_TopItem -->\n";
		HTMLstr += "</table>\n";
		HTMLstr += "</div>\n";
		HTMLstr += "<!-- Insert A Extend_Menu Area on Here For E_TopItem -->";
		HTMLstr += "\n";
		HTMLstr += "<!-- PopMenu Ends -->\n";
	}

	function AddExtendMenu(id,name,parent){
		var TempStr = "";
		if(HTMLstr.indexOf("<!-- Extend Menu Area : E_"+id+" -->") != -1)
		{
			CTRSAction_alert("E_"+id+"already exist!");
			return;
		}
		eval("A_"+parent+".length++");
		eval("A_"+parent+"[A_"+parent+".length-1] = id");  // 将此项注册到父菜单项的ID数组中去
		TempStr += "<!-- Extend Menu Area : E_"+id+" -->\n";
		TempStr += "<div id='E_"+id+"' class='rm_div'>\n";
		TempStr += "<table class=normal width='100%' border='0' cellspacing='0'>\n";
		TempStr += "<!-- Insert A Extend Menu or Item On Here For E_"+id+" -->";
		TempStr += "</table>\n";
		TempStr += "</div>\n";
		TempStr += "<!-- Insert A Extend_Menu Area on Here For E_"+id+" -->";
		TempStr += "<!-- Insert A Extend_Menu Area on Here For E_"+parent+" -->";
		HTMLstr = HTMLstr.replace("<!-- Insert A Extend_Menu Area on Here For E_"+parent+" -->",TempStr);


		eval("A_"+id+" = new Array()");		
		TempStr  = "";
		TempStr += "<!-- Extend Item : P_"+id+" -->\n";
		TempStr += "<tr id='P_"+id+"' class='out'";
		TempStr += " onmouseover='P_OnMouseOver(\""+id+"\",\""+parent+"\")'";
		TempStr += " onmouseout='P_OnMouseOut(\""+id+"\",\""+parent+"\")'";
		TempStr += " onmouseup=window.event.cancelBubble=true;";
		TempStr += " onclick=window.event.cancelBubble=true;";
		TempStr += "><td nowrap>";
		TempStr += "&nbsp;&nbsp;&nbsp;"+name+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td style='font-family: webdings; text-align: right;'>4";
		TempStr += "</td></tr>\n";
		TempStr += "<!-- Insert A Extend Menu or Item On Here For E_"+parent+" -->";
		HTMLstr = HTMLstr.replace("<!-- Insert A Extend Menu or Item On Here For E_"+parent+" -->",TempStr);
	}

	function AddItem(id,name,parent,cmd){
		var TempStr = "";
		var ItemStr = "<!-- ITEM : I_"+id+" -->";
		if(id == "sperator")
		{
			TempStr += ItemStr+"\n";
			TempStr += "<tr style='height: 2px;' class='out' onclick='window.event.cancelBubble=true;' onmouseup='window.event.cancelBubble=true;'><td colspan='2'></td></tr>";
			TempStr += "<tr style='height: 1px;' class='out' onclick='window.event.cancelBubble=true;' onmouseup='window.event.cancelBubble=true;'><td colspan='2' height=1px bgcolor='#848284'></td></tr>";
			TempStr += "<tr style='height: 2px;' class='out' onclick='window.event.cancelBubble=true;' onmouseup='window.event.cancelBubble=true;'><td colspan='2'></td></tr>";
			TempStr += "<!-- Insert A Extend Menu or Item On Here For E_"+parent+" -->";
			HTMLstr = HTMLstr.replace("<!-- Insert A Extend Menu or Item On Here For E_"+parent+" -->",TempStr);
			return;
		}
		if(HTMLstr.indexOf(ItemStr) != -1)
		{
			CTRSAction_alert("I_"+id+"already exist!");
			return;
		}
		TempStr += ItemStr+"\n";
		TempStr += "<tr id='I_"+id+"' class='out'";
		TempStr += " onmouseover='I_OnMouseOver(\""+id+"\",\""+parent+"\")'";
		TempStr += " onmouseout='I_OnMouseOut(\""+id+"\")'";
		TempStr += " onclick='window.event.cancelBubble=true;'";
		TempStr += " onmouseup='I_OnMouseUp(\""+id+"\",\""+parent+"\")'";
		if(cmd != null)
			TempStr += " cmd='"+cmd+"'";
		TempStr += "><td nowrap>";
		TempStr += "&nbsp;&nbsp;&nbsp;"+name+"&nbsp;&nbsp;&nbsp;";
		TempStr += "</td><td></td></tr>\n";
		TempStr += "<!-- Insert A Extend Menu or Item On Here For E_"+parent+" -->";
		HTMLstr = HTMLstr.replace("<!-- Insert A Extend Menu or Item On Here For E_"+parent+" -->",TempStr);
	}

	function GetMenu(){
		return HTMLstr;
	}

//==================================================//
//================菜单显示函数=======================//
//=================================================//
	function I_OnMouseOver(id,parent){
		var Item;
		if(parent != "TopItem")
		{
			var ParentItem;
			ParentItem = document.all("P_"+parent);
			ParentItem.className="over";
		}
		Item = document.all("I_"+id);
		Item.className="over";
		HideAll(parent,1);
	}

	function I_OnMouseOut(id){
		var Item;
		Item = document.all("I_"+id);
		Item.className="out";
	}

	function I_OnMouseUp(id,parent,cmd){
		//alert(window.event.button);
		if(window.event.button != 1)return;
		
		var ParentMenu;
		window.event.cancelBubble=true;
		OnClick();
		ParentMenu = document.all("E_"+parent);
		ParentMenu.display="none";
		var Item;
		Item = document.all("I_"+id);
		eval(Item.cmd);
		/*
		if(location == null)
			eval("Do_"+id+"()");
		else
			window.open(location);
		*/
	}

	function P_OnMouseOver(id,parent){
		var Item;
		var Extend;
		var Parent;
		if(parent != "TopItem")
		{
			var ParentItem;
			ParentItem = document.all("P_"+parent);
			ParentItem.className="over";
		}
		HideAll(parent,1);
		Item = document.all("P_"+id);
		Extend = document.all("E_"+id);
		Parent = document.all("E_"+parent);
		Item.className="over";
		Extend.style.display="block";
		Extend.style.posLeft=document.body.scrollLeft+Parent.offsetLeft+Parent.offsetWidth-4;
		if(Extend.style.posLeft+Extend.offsetWidth > document.body.scrollLeft+document.body.clientWidth)
			Extend.style.posLeft=Extend.style.posLeft-Parent.offsetWidth-Extend.offsetWidth+8;
		if(Extend.style.posLeft < 0) Extend.style.posLeft=document.body.scrollLeft+Parent.offsetLeft+Parent.offsetWidth;
		Extend.style.posTop=Parent.offsetTop+Item.offsetTop;
		if(Extend.style.posTop+Extend.offsetHeight > document.body.scrollTop+document.body.clientHeight)
			Extend.style.posTop=document.body.scrollTop+document.body.clientHeight-Extend.offsetHeight;
		if(Extend.style.posTop < 0) Extend.style.posTop=0;
	}

	function P_OnMouseOut(id,parent){
	}

	function HideAll(id,flag){
		var Area;
		var Temp;
		var i;
		if(!flag)
		{
			Temp = eval("window.E_"+id);
			if(Temp != null)
				Temp.style.display="none";
		}
		Area = eval("window.A_"+id);
		if(Area && Area.length)
		{
			for(i=0; i < Area.length; i++)
			{
				HideAll(Area[i],0);
				Temp = eval("window.E_"+Area[i]);
				if(Temp != null)
					Temp.style.display="none";
				Temp = eval("window.P_"+Area[i]);
				if(Temp != null)
					Temp.className="out";
			}
		}
	}

	document.onmouseup=OnMouseUp;
	document.onclick=OnClick;

	function CTRSContextMenu_getSrcElement(){		
		return m_objSrcEl; 
	}

	function OnMouseUp(){
		if(window.event.button == 2)
		{
			var oTemp = getDefineMenuElement(window.event.srcElement);
			if(oTemp == null){
				return;
			}
			m_objSrcEl = oTemp;

			var nMenuIndex = parseInt(m_objSrcEl.MenuIndex);
			if(m_arContextMenu.length < (nMenuIndex+1))
			{
				CTRSAction_alert("MenuIndex定义错误！");
				return;
			}
			if(!m_objSrcEl.RightValue || m_objSrcEl.RightValue == ""){
				//alert("loadRightValue:"+m_objSrcEl.outerHTML);
				//loadRightValue();
				loadObjectRightValue(m_objSrcEl);				
			}

			m_arContextMenu[nMenuIndex].display(m_objSrcEl.RightValue);
			displayContextMenu(); 
		}
	}

	function getDefineMenuElement(_objEl){
		if(_objEl.MenuIndex)return _objEl;
		var i=0;
		var objTemp = _objEl;
		while(i<3){
			objTemp = objTemp.parentElement;
			if(objTemp == null || objTemp.MenuIndex)return objTemp;			
			i++;
		}
	}

	function displayContextMenu(){
		var contextMenuDiv = document.all(MENU_DIV_ID);
		if(contextMenuDiv) contextMenuDiv.style.display = "block";
		var PopMenu;
		PopMenu = document.all("E_TopItem");
		if(PopMenu == null)return;
		HideAll("TopItem",0);
		PopMenu.style.display	=	"block";
		PopMenu.style.posLeft	=	document.body.scrollLeft + window.event.clientX;
		PopMenu.style.posTop	=	document.body.scrollTop  + window.event.clientY;
		if(PopMenu.style.posLeft+PopMenu.offsetWidth > document.body.scrollLeft+document.body.clientWidth)
		PopMenu.style.posLeft	=	document.body.scrollLeft+document.body.clientWidth-PopMenu.offsetWidth;
		if(PopMenu.style.posLeft < 0) 
		PopMenu.style.posLeft	=	0;
		if(PopMenu.style.posTop+PopMenu.offsetHeight > document.body.scrollTop+document.body.clientHeight)
		PopMenu.style.posTop	=	document.body.scrollTop+document.body.clientHeight-PopMenu.offsetHeight;
		if(PopMenu.style.posTop < 0) 
		PopMenu.style.posTop	=	0;
	}

	function OnClick(){
		HideAll("TopItem",0);
	}
//ContextMenu主对象
	function ContextMenu(_id, _arMenuItem){
		this.Id	= _id;
		this.ContextMenuItems = new Object();
		this.TopContextMenuItems = new Array();
		this.arMenuItem = new Array();
		this.arRightIndexes = new Array();

		if(_arMenuItem != null){
			this.arMenuItem = _arMenuItem || this.arMenuItem;
		} else {
			try{MENU_ITEM;}catch(e){
				window.status = "没有指定右键菜单资源文件！";
				return;
			}
			this.arMenuItem = MENU_ITEM || this.arMenuItem;
		}

		for(var i=0; i<this.arMenuItem.length; i++){
			var oItem = this.arMenuItem[i];
			if(oItem == null) continue;
			this.addMenuItem(oItem.ItemText, oItem.ItemId, oItem.ItemAction, oItem.ItemParent, oItem.RightIndex);
		}
	}
	ContextMenu.prototype.addMenuItem		= ContextMenu_addMenuItem;
	ContextMenu.prototype.getMenuItemById	= ContextMenu_getMenuItemById;
	ContextMenu.prototype.toMenuHTML		= ContextMenu_toMenuHTML;
	ContextMenu.prototype.display			= ContextMenu_display;
	
	function ContextMenu_addMenuItem(text, id, command, parentItemId, rightIndex){
		if(id != null && this.ContextMenuItems[id] != null)
		{
			CTRSAction_alert("已经存在相同的ID！["+id+"]");
			return;
		}
		var objP = null;
		if(parentItemId != null)objP = this.ContextMenuItems[parentItemId];
		if(text == ""){//分隔符
			this.ContextMenuItems[id] = new ContextMenuSeparator(objP);
		} else {
			this.ContextMenuItems[id] = new ContextMenuItem(text, id, command, objP, rightIndex);
			if(rightIndex && rightIndex != "ISADMIN")
				this.arRightIndexes[this.arRightIndexes.length] = rightIndex;
		}
		if(objP == null)this.TopContextMenuItems[this.TopContextMenuItems.length] = this.ContextMenuItems[id];
		return this.ContextMenuItems[id];
	}

	function ContextMenu_getMenuItemById(_sItemId){
		return this.ContextMenuItems[_sItemId];
	}

	function ContextMenu_toMenuHTML(_sRightValue){
		var objMenuHTML = new ContextMenuHTML();
		putMenuItemsInMenu(this.TopContextMenuItems, objMenuHTML, _sRightValue);
		return objMenuHTML.GetMenu();
	}

	function ContextMenu_display(_sRightValue){
		var objDiv = document.all(MENU_DIV_ID);
		if(objDiv == null)
		{
			CTRSAction_alert("没有定义菜单Div");
			return;
		}
		objDiv.innerHTML = this.toMenuHTML(_sRightValue);
	}


//=================================================================//
//==========ContextMenu到MenuHTML的转换函数=========================//
//=================================================================//
	//将ContextMenu转换成MenuHTML对象
	function putMenuItemsInMenu(_arMenuItem, _objMenuHTML, _sRightValue){
		if(_arMenuItem == null || _arMenuItem.length<=0 || _objMenuHTML==null)return;

		var arTemp = new Array();
		if(IS_ADMIN == 1 || _sRightValue == null ||  _sRightValue=="-1" || _sRightValue.length==0)
		{
			arTemp = _arMenuItem;
		}else{//进行权限过滤
			var nSeparator = 0;
			for(var i=0; i<_arMenuItem.length; i++)
			{				
				if(!checkDecCommand(_arMenuItem[i], _sRightValue))continue;
				if(_arMenuItem[i].Text == MENU_SEPARATOR)nSeparator++;
				else nSeparator = 0;
				if(nSeparator>=2)continue;

				arTemp[arTemp.length] = _arMenuItem[i];
			}
			//如果最后一项是分隔线，就删掉这条线
			if(arTemp[arTemp.length-1] != null && arTemp[arTemp.length-1].Text == MENU_SEPARATOR) arTemp.splice(arTemp.length-1, 1);
			if(arTemp[0] != null && arTemp[0].Text == MENU_SEPARATOR) arTemp.splice(0, 1);
		}
		//转换为MenuHTML对象
		for(var i=0; i<arTemp.length; i++)
		{
			putMenuItemInMenu(arTemp[i], _objMenuHTML, _sRightValue);
		}
	}

	//将ContextMenu转换成MenuHTML对象
	function putMenuItemInMenu(_objMenuItem, _objMenuHTML, _sRightValue){
		if(_objMenuItem == null || _objMenuHTML==null)
		{
			CTRSAction_alert("数据有误！");
			return;
		}

		var sParentId = "TopItem";
		if(_objMenuItem.ParentItem != null)sParentId = _objMenuItem.ParentItem.Id;
		if(_objMenuItem.Text == MENU_SEPARATOR)
		{//分隔符
			_objMenuHTML.AddItem("sperator", "", sParentId, null);
			return;
		}

		if(_objMenuItem.ChildrenItem.length > 0){
			_objMenuHTML.AddExtendMenu(_objMenuItem.Id, _objMenuItem.Text, sParentId, _objMenuItem.Command); 
			//转换子菜单
			putMenuItemsInMenu(_objMenuItem.ChildrenItem, _objMenuHTML, _sRightValue);			
		} else {
			_objMenuHTML.AddItem(_objMenuItem.Id, _objMenuItem.Text, sParentId, _objMenuItem.Command);
		}
	}

//=================================================================//
//==============================权限校验函数=========================//
//=================================================================//

	//检查菜单是否显示
	function checkDecCommand(_objMenuItem, _sRightValue){
		if(_objMenuItem.Text == MENU_SEPARATOR)return true;

		if(_objMenuItem.ChildrenItem.length > 0)
		{
			for(var i=0; i<_objMenuItem.ChildrenItem.length; i++)
			{
				if(checkDecCommand(_objMenuItem.ChildrenItem[i], _sRightValue))
					return true;
			}
			return false;
		}else{
			if(_objMenuItem.RightIndex < 0)return true;
			return hasRight(_sRightValue, _objMenuItem.RightIndex);
		}
	}

	//根据指定的权限索引判断是否
	function hasRight(_sRightValue, _nIndex){
		if(!_sRightValue) return false;
		if(_nIndex == "ISADMIN"){
			if(IS_ADMIN == 1 && _sRightValue == "1") return true;
			return false;
		}
		
		if(_sRightValue == "1") return true;

		var nLength = _sRightValue.length;
		if(nLength <(_nIndex+1))return false;

		if(parseInt(_sRightValue.charAt(nLength - (_nIndex+1)))==1)return true;
		else return false;
	}

	function setRightValue(_oEl, _sRightValue){
		if(!_oEl || !_sRightValue) return;
		_oEl.RightValue = _sRightValue;
		//标记权限值已经被设定上，下次遍历设置权限值将不会再次走到这个Item上
		_oEl.removeAttribute("Name");
	}

	function dowithRightValueSetting(_oEl, _nType){
		var nMenuIndex = parseInt(_oEl.MenuIndex);
		var sRightIndexes;
		try{sRightIndexes = m_arRightIndexes[nMenuIndex].toString();}catch(e){}
		var sRightValue = (IS_ADMIN)?"1":getRightValue(_nType, _oEl.ObjId, sRightIndexes);
		setRightValue(_oEl, sRightValue);
	}


function loadObjectRightValue(_oSrcElement){
	var sRightValue = "0";
	if(IS_ADMIN){
		sRightValue = "1";
	}else if(_oSrcElement.ObjId){
		var nMenuIndex = parseInt(_oSrcElement.MenuIndex);
		var sRightIndexes;
		try{sRightIndexes = m_arRightIndexes[nMenuIndex].toString();}catch(e){}		
		
		var oTRSAction = new CTRSAction("../tools/cmsobj_rightvalue_get.jsp");
		oTRSAction.setParameter("ObjType", _oSrcElement.Name=="spSubNode"?101:103);
		oTRSAction.setParameter("ObjId", _oSrcElement.ObjId);
		oTRSAction.setParameter("RightIndexes", sRightIndexes);

		sRightValue = oTRSAction.doXMLHttpAction();
		
		//sRightValue = sRightValue.replace('\n', '');		
	}

	_oSrcElement.RightValue = sRightValue;
}

	function batchSetRightValue(_arEls, _nType){
		if(!_arEls || !_arEls.length) return;

		if(IS_ADMIN){
			var sRightValue = "1";
			for(var j=0; j<_arEls.length; j++){
				var oEl = _arEls[i];
				if(!oEl || !oEl.Name) continue;
				setRightValue(oEl, sRightValue);
			}
			return;
		}

		var sIds = "";
		var sRightIndexes = "";
		for(var i=0; i<_arEls.length; i++){
			var oEl = _arEls[i];
			if(!oEl) continue;
			if(sRightIndexes == "") 
				try{sRightIndexes = m_arRightIndexes[parseInt(oEl.MenuIndex)].toString();}catch(e){}
			sIds += ((sIds.length > 0)?",":"") + oEl.ObjId;
		}
		var arRightObj = batchGetRightValue(_nType, sIds, sRightIndexes);
		if(!arRightObj) return;
		for(var i=0; i<arRightObj.length; i++){
			var oRightObj = arRightObj[i];
			if(!oRightObj) continue;
			for(var j=0; j<_arEls.length; j++){
				var oEl = _arEls[i];
				if(!oEl || !oEl.Name) continue;
				if(oRightObj.getProperty("OBJID") == oEl.ObjId){
					setRightValue(oEl, oRightObj.getProperty("RIGHTVALUE"));
					break;
				}
			}
		}
	}

	function loadRightValue(){
		//第一步，载入站点的权限
		var arRoots = document.getElementsByTagName("SPAN");
		if(arRoots&& arRoots.length){
			var arTemp = new Array();
			for(var i=0; i<arRoots.length; i++){
				var oEl = arRoots[i];
				if(!oEl || oEl.Name != "spRootNode") continue;
				arTemp[arTemp.length] = oEl;
			}
			if(arTemp.length > 0)
				batchSetRightValue(arTemp, 103);
		} else {
			dowithRightValueSetting(arRoots, 103);
		}
		//第二步，载入频道的权限
		var arEls = document.getElementsByTagName("SPAN");
		if(arEls && arEls.length){
			for(var i=0; i<m_arRightIndexes.length; i++){
				var sRightIndexes = m_arRightIndexes[i];
				var arTemp = new Array();
				for(var j=0; j<arEls.length; j++){
					var oEl = arEls[j];
					if(!oEl || oEl.Name == "spRootNode" || oEl.Name != "spSubNode" || oEl.MenuIndex != i) continue;
					arTemp[arTemp.length] = oEl;
				}
				if(arTemp.length > 0)
					batchSetRightValue(arTemp, 101);
			}
		} else {
			if(arEls && arEls.Name == "spSubNode"){
				dowithRightValueSetting(arEls, 101);
			}
		}
	}
