var MENU_ITEM_EVENT = [
{"ItemText" : "查看", "ItemId" : "view",   "ItemAction" : "showEvent(m_objSrcEl.EventId)",		"ItemParent" : null, "RightIndex" : 0},
{"ItemText" : "修改", "ItemId" : "edit",   "ItemAction" : "addeditEvent(m_objSrcEl.EventId)",	"ItemParent" : null, "RightIndex" : 1},
{"ItemText" : "共享", "ItemId" : "share",  "ItemAction" : "shareEvent(m_objSrcEl.EventId)",		"ItemParent" : null, "RightIndex" : 2},
{"ItemText" : "删除", "ItemId" : "deleteEvent", "ItemAction" : "deleteEvent(m_objSrcEl.EventId)",	"ItemParent" : null, "RightIndex" : 3},
{"ItemText" : "取消", "ItemId" : "cancelShare", "ItemAction" : "cancelShare(m_objSrcEl.EventId)",	"ItemParent" : null, "RightIndex" : 4}
];

var eventMenu	= new ContextMenu("EventMenu", MENU_ITEM_EVENT);

var m_arContextMenu = new Array();
m_arContextMenu[0] = eventMenu;