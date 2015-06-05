var systemMenu		= new ContextMenu("SystemMenu", MENU_ITEM_SYSTEM);
var documentMenu	= new ContextMenu("DocumentMenu", MENU_ITEM_DOCUMENT);

var m_arContextMenu = new Array();
m_arContextMenu[0] = systemMenu;
m_arContextMenu[1] = documentMenu;

var m_arRightIndexes = new Array();
m_arRightIndexes[0] = systemMenu.arRightIndexes;
m_arRightIndexes[1] = documentMenu.arRightIndexes;