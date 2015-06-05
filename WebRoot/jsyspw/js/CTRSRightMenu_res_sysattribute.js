var MENU_ITEM_ATTRIBUTE = [
{"ItemText" : "设置权限", "ItemId" : "setright",		"ItemAction" : "setAttrRight()","ItemParent" : null, "RightIndex" : 1}
];

var attributeMenu	= new ContextMenu("AttributeMenu", MENU_ITEM_ATTRIBUTE);

var m_arContextMenu = new Array();
m_arContextMenu[0] = attributeMenu;