var systemMenu	= new ContextMenu("SystemMenu", MENU_ITEM_SYSTEM);
var siteMenu	= new ContextMenu("SiteMenu", MENU_ITEM_SITE);
var normalChannelMenu = new ContextMenu("ChannelMenu", MENU_ITEM_CHANNEL_NORMAL);
var toppicChannelMenu = new ContextMenu("TopPicChannelMenu", MENU_ITEM_CHANNEL_TOPPIC);
var linkChannelMenu = new ContextMenu("LinkChannelMenu", MENU_ITEM_CHANNEL_LINK);
var sureformChannelMenu = new ContextMenu("SureformChannelMenu", MENU_ITEM_CHANNEL_SUREFORM);

var m_arContextMenu = new Array();
m_arContextMenu[0] = systemMenu;
m_arContextMenu[1] = siteMenu;
m_arContextMenu[2] = normalChannelMenu;
m_arContextMenu[3] = toppicChannelMenu;
m_arContextMenu[4] = linkChannelMenu;
m_arContextMenu[5] = sureformChannelMenu;

var m_arRightIndexes = new Array();
m_arRightIndexes[0] = systemMenu.arRightIndexes;
m_arRightIndexes[1] = siteMenu.arRightIndexes;
m_arRightIndexes[2] = normalChannelMenu.arRightIndexes;
m_arRightIndexes[3] = toppicChannelMenu.arRightIndexes;
m_arRightIndexes[4] = linkChannelMenu.arRightIndexes;
m_arRightIndexes[5] = sureformChannelMenu.arRightIndexes;