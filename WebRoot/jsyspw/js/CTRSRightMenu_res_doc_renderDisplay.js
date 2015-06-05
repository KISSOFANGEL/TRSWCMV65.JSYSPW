var systemMenu				= new ContextMenu("SystemMenu", MENU_ITEM_SYSTEM);
var documentMenu			= new ContextMenu("DocumentMenu", MENU_ITEM_DOCUMENT);
var toppicDocMenu			= new ContextMenu("ToppicDocMenu", MENU_ITEM_DOCUMENT_TOPPIC);
var toppicBlankMenu			= new ContextMenu("ToppicBlankMenu", MENU_ITEM_BLANK_TOPPIC);
var systemMenuOnlySearch	= new ContextMenu("SystemMenuEmpty", MENU_ITEM_SYSTEM_ONLYSEARCH);
var documentMenuOnlySearch	= new ContextMenu("DocumentMenuOnlySearch", MENU_ITEM_DOCUMENT_ONLYSEARCH);

var m_arContextMenu = new Array();
m_arContextMenu[0] = systemMenu;
m_arContextMenu[1] = documentMenu;
m_arContextMenu[2] = toppicDocMenu;
m_arContextMenu[3] = toppicBlankMenu;
m_arContextMenu[4] = systemMenuOnlySearch;
m_arContextMenu[5] = documentMenuOnlySearch;

var m_arRightIndexes = new Array();
m_arRightIndexes[0] = systemMenu.arRightIndexes;
m_arRightIndexes[1] = documentMenu.arRightIndexes;
m_arRightIndexes[2] = toppicDocMenu.arRightIndexes;
m_arRightIndexes[3] = toppicBlankMenu.arRightIndexes;
m_arRightIndexes[4] = systemMenuOnlySearch.arRightIndexes;
m_arRightIndexes[5] = documentMenuOnlySearch.arRightIndexes;