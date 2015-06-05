var MENU_ITEM_DOCUMENT = [
{"ItemText" : "编辑",	"ItemId" : "editDoc",		"ItemAction" : "rmDocumentEdit(m_objSrcEl.AddEditPage);",		"ItemParent" : null, "RightIndex" : 3},
{"ItemText" : "删除",	"ItemId" : "deleteDoc",		"ItemAction" : "rmDocumentDelete(m_objSrcEl.DeletePage);",	"ItemParent" : null, "RightIndex" : 2},
{"ItemText" : "发布",	"ItemId" : "publishDoc",	"ItemAction" : "rmDocumentPublish(m_objSrcEl.PublishPage)",	"ItemParent" : null, "RightIndex" : 1}
];

var documentMenu	= new ContextMenu("DocumentMenu", MENU_ITEM_DOCUMENT);

var m_arContextMenu = new Array();
m_arContextMenu[0] = documentMenu;