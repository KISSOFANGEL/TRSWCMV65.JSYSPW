//定义具有Drag属性的HTML元素可以拖动

var g_bMouseDown	=	false;
var g_bMouseMoved	=	false;
var x,y;
//保存拖动时的目的区域
var g_zoneTarget = null;
var g_srcElement = null;
var g_dragElement = null;
var g_dropElement = null;

function DivMouse_OnMouseMove(){
	if (event.button==1 && g_bMouseDown){
		g_srcElement.style.left = window.event.x - m_cxOffset + 'px';
		g_srcElement.style.top = window.event.y - m_cyOffset + 'px';

		g_bMouseMoved = true;
	}
}

var m_cxOffset = 0;			// x offset of mouse from left of drag part
var m_cyOffset = 0;			// y offset of mouse from top of drag part

function Document_OnMouseDown(){
	if (!document.all)return;

	if(!window.event.ctrlKey || window.event.button == 2){
		return;
	}

	var objTag = getDragElement(event.srcElement);
	g_dragElement = objTag;
	//CTRSAction_alert(objTag.outerHTML);
	if (objTag != null)
	{
		g_bMouseDown = true;

		m_cxOffset = window.event.clientX - GetAbsoluteLeft(window.event.srcElement);
		m_cyOffset = window.event.clientY - GetAbsoluteTop(window.event.srcElement);
		//设置拖动的元素
		g_srcElement = objTag.cloneNode(true);
		g_srcElement.style.filter = 'alpha(opacity=50)';
		//设置拖动元素与起始元素一样的大小和坐标
		g_srcElement.style.position = 'absolute';		
		g_srcElement.style.left = window.event.x - m_cxOffset + 'px';
		g_srcElement.style.top = window.event.y - m_cyOffset + 'px';
		g_srcElement.style.width = event.srcElement.style.width;
		//为了醒目，设置拖动元素的边框
		g_srcElement.style.border = 1;
		g_srcElement.style.borderStyle = "dotted";
		g_srcElement.style.borderColor = "red";
		//将临时拖动的元素插入到页面中		
		document.body.insertAdjacentElement('beforeEnd', g_srcElement);

		divMouse.setCapture();
	}
}

function Drag_getParentElement(_srcElement, _sTagName){
	if(_srcElement == null || _srcElement.tagName == "BODY"){
		return null;
	}
	
	if(_srcElement.tagName.toUpperCase() == _sTagName.toUpperCase()){
		return _srcElement;
	}else{
		return Drag_getParentElement(_srcElement.parentElement, _sTagName);
	}
}

function Drag_isAfter(_srcElement, _dstElement){
	var srcTR = Drag_getParentElement(_srcElement, "TR");
	if(srcTR == null)
		return true;
	

	var dstTR = Drag_getParentElement(_dstElement, "TR");
	if(dstTR == null)
		return true;
	
	return (srcTR.rowIndex>dstTR.rowIndex);
}

function DivMouse_OnMouseUp(){
	//校验有效性
	if(!g_bMouseDown || !g_bMouseMoved){
		divMouse.releaseCapture();
		if(g_bMouseDown){
			g_srcElement.click();
			releasSrcElement();
		}
		g_bMouseDown	=	false;
		g_bMouseMoved	=	false;		
		return;
	}

	g_zoneTarget = GetZoneFromPoint(window.event.x, window.event.y);
	//CTRSAction_alert(g_zoneTarget.outerHTML);
	//获取放置的元素
	var objDst = getDropElement(g_zoneTarget);
	g_dropElement = objDst;
	if(objDst != null){
		var bAfter = Drag_isAfter(g_dragElement, g_dropElement);
		DragAndDrop_End(g_dragElement, g_dropElement, bAfter);
		//CTRSAction_confirm("您确定要将此文档["+g_srcElement.innerText+"]放置到元素["+objDst.outerHTML+"]上吗？");
	}

	divMouse.releaseCapture();
	g_bMouseDown	=	false;
	g_bMouseMoved	=	false;
	
	releasSrcElement();
}

function releasSrcElement(){
	g_srcElement.style.display = "none";

	g_srcElement.style.position = '';
	g_srcElement.removeNode(true);
	g_srcElement = null;
}

//通过指定的元素获取Drop元素
function getDropElement(_objZone)
{
	while ((_objZone.DROP == null) && (_objZone.tagName != 'BODY'))
	{
		_objZone = _objZone.parentElement;
	}
	if(_objZone.DROP)return _objZone;
	else return null;	
}

//通过指定的元素获取需要拖动的元素
function getDragElement(_objZone)
{
	while ((_objZone.DRAG == null) && (_objZone.tagName != 'BODY'))
	{
		_objZone = _objZone.parentElement;
	}
	if(_objZone.DRAG)return _objZone;
	else return null;	
}

//根据x和y的坐标获取HTML元素
function GetZoneFromPoint(x, y)
{	
	//将拖动的元素暂时隐去
	var prtDragZIndexOld = g_srcElement.style.zIndex;
	g_srcElement.style.zIndex = -1;
	//g_srcElement.children(0).style.zIndex = -1;
		
	var zone = document.elementFromPoint(x, y);

	if(!zone)return null;
	g_srcElement.style.zIndex = prtDragZIndexOld;

	//校验有效性,暂时不检测	
	return zone;
}

//UTIL JS
// Gets real Top value with respect to client area
function GetAbsoluteTop(elem)
{
	var topPosition = 0;

	while (elem)
	{
		if (elem.tagName == 'BODY')
		{
			break;
		}
		topPosition += elem.offsetTop;
		elem = elem.offsetParent;
	}
	return topPosition;
}

// Get real Left value with respect to client area
function GetAbsoluteLeft(elem)
{
	var leftPosition = 0;
		
	while (elem)
	{
		if (elem.tagName == 'BODY')
		{
			break;
		}
		leftPosition += elem.offsetLeft;
		elem = elem.offsetParent;
	}
	return leftPosition;
}

function DragAndDrop_End(_srcElement, _dstElement){
	CTRSAction_alert("Please Implement Method DragAndDrop_End(_srcElement, _dstElement, _bAfter)!");
}

document.body.onmousedown = Document_OnMouseDown;

document.write('<DIV ID="divMouse" STYLE="display:none" onmousemove="DivMouse_OnMouseMove();" onmouseup="DivMouse_OnMouseUp();"></DIV>');
