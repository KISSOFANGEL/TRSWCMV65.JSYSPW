var MENU_ITEM_SYSTEM = new Array(
	//{"ItemText" : "站点管理", "ItemId" : "sitemanage",		"ItemAction" : "siteManage()",				"ItemParent" : null, "RightIndex" : 0},
	//{"ItemText" : "文档管理", "ItemId" : "docmanage",		"ItemAction" : "documentManage()",			"ItemParent" : null, "RightIndex" : 1},
	//{"ItemText" : "发布管理", "ItemId" : "pubmanage",		"ItemAction" : "publishManage()",			"ItemParent" : null, "RightIndex" : 2},
	//{"ItemText" : "", "ItemId" : "SP1", "ItemAction" : null},
	{"ItemText" : "新建文档", "ItemId" : "createdoc",		"ItemAction" : "WCMDocument.addNew(0)",	"ItemParent" : null, "RightIndex" : null},
	{"ItemText" : "", "ItemId" : "SP1", "ItemAction" : null},
	{"ItemText" : "新建站点", "ItemId" : "createsite",		"ItemAction" : "onAddSite()",	"ItemParent" : null, "RightIndex" : "ISADMIN"},
	{"ItemText" : "导入站点", "ItemId" : "importsite",		"ItemAction" : "onImportSite()",	"ItemParent" : null, "RightIndex" : "ISADMIN"},
	{"ItemText" : "站点回收站", "ItemId" : "siterecycle",		"ItemAction" : "gotoRecycleBin()",	"ItemParent" : null, "RightIndex" : "ISADMIN"},
	{"ItemText" : "", "ItemId" : "SP2", "ItemAction" : null},
	{"ItemText" : "频道定位", "ItemId" : "locatechannel",		"ItemAction" : "searchAndLocate()",	"ItemParent" : null, "RightIndex" : null},
	{"ItemText" : "智能建站", "ItemId" : "intellicreate",		"ItemAction" : "createSiteIntell()",	"ItemParent" : null, "RightIndex" : "ISADMIN"},
	{"ItemText" : "", "ItemId" : "SP3", "ItemAction" : null},
	{"ItemText" : "刷新", "ItemId" : "refreshtree",			"ItemAction" : "ChannelTree_refreshMe()",	"ItemParent" : null, "RightIndex" : null}
);

var MENU_ITEM_SITE = new Array(
	//{"ItemText" : "站点管理", "ItemId" : "sitemanage",		"ItemAction" : "WCMChannel.rmChangeTab(103, m_objSrcEl.ObjId, 0)",	"ItemParent" : null, "RightIndex" : null},
	//{"ItemText" : "文档管理", "ItemId" : "docmanage",		"ItemAction" : "WCMChannel.rmChangeTab(103, m_objSrcEl.ObjId, 1)",	"ItemParent" : null, "RightIndex" : 30},
	//{"ItemText" : "发布管理", "ItemId" : "pubmanage",		"ItemAction" : "WCMChannel.rmChangeTab(103, m_objSrcEl.ObjId, 2)",	"ItemParent" : null, "RightIndex" : null},
	//{"ItemText" : "", "ItemId" : "SP1", "ItemAction" : null},
	{"ItemText" : "预览站点", "ItemId" : "preview",			"ItemAction" : "WCMChannel.sitePreview(m_objSrcEl.ObjId)", "ItemParent" : null, "RightIndex" : 3},
	{"ItemText" : "快速发布", "ItemId" : "quickpub",		"ItemAction" : "siteQuickPublish(m_objSrcEl.ObjId)",		"ItemParent" : null, "RightIndex" : 5},
	{"ItemText" : "高级发布", "ItemId" : "propub",			"ItemAction" : "siteProPublish(m_objSrcEl.ObjId)",			"ItemParent" : null, "RightIndex" : 4},
	{"ItemText" : "发布历史", "ItemId" : "pubinfo",			"ItemAction" : "rmPublishInfo(m_objSrcEl.ObjId, 103)",			"ItemParent" : null, "RightIndex" : 5},
	{"ItemText" : "发布属性", "ItemId" : "pubproperty",		"ItemAction" : "editSitePublishSetting(m_objSrcEl.ObjId)",	"ItemParent" : null, "RightIndex" : 1},
	{"ItemText" : "模板列表", "ItemId" : "templatemanage",	"ItemAction" : "templateManage(103, m_objSrcEl.ObjId)",	"ItemParent" : null, "RightIndex" : 66},
	{"ItemText" : "", "ItemId" : "SP2", "ItemAction" : null},
	{"ItemText" : "文档列表", "ItemId" : "documentlist",	"ItemAction" : "gotoSiteDocList(m_objSrcEl.ObjId)",					"ItemParent" : null, "RightIndex" : 30},
	{"ItemText" : "", "ItemId" : "SP3", "ItemAction" : null},
	{"ItemText" : "修改站点",  "ItemId" : "editsite",		"ItemAction" : "editSite(m_objSrcEl.ObjId)",				"ItemParent" : null, "RightIndex" : 1},
	{"ItemText" : "新建频道", "ItemId" : "createchannel",	"ItemAction" : "addChannelInSite(m_objSrcEl.ObjId)",		"ItemParent" : null, "RightIndex" : 11},
	{"ItemText" : "删除站点",  "ItemId" : "deletesite",		"ItemAction" : "deleteSite(m_objSrcEl.ObjId)",				"ItemParent" : null, "RightIndex" : 2},
	{"ItemText" : "", "ItemId" : "SP4", "ItemAction" : null},
	{"ItemText" : "设置权限", "ItemId" : "setright",		"ItemAction" : "WCMChannel.setSiteRight(m_objSrcEl.ObjId)","ItemParent" : null, "RightIndex" : 1},
	{"ItemText" : "站点角色", "ItemId" : "mansiterole",		"ItemAction" : "WCMChannel.manSiteRoles(m_objSrcEl.ObjId)","ItemParent" : null, "RightIndex" : 6}
);

var MENU_ITEM_CHANNEL_NORMAL = new Array(
	//{"ItemText" : "站点管理", "ItemId" : "sitemanage",		"ItemAction" : "WCMChannel.rmChangeTab(101, m_objSrcEl.ObjId, 0)",	"ItemParent" : null, "RightIndex" : null},
	//{"ItemText" : "文档管理", "ItemId" : "docmanage",		"ItemAction" : "WCMChannel.rmChangeTab(101, m_objSrcEl.ObjId, 1)",	"ItemParent" : null, "RightIndex" : 30},
	//{"ItemText" : "发布管理", "ItemId" : "pubmanage",		"ItemAction" : "WCMChannel.rmChangeTab(101, m_objSrcEl.ObjId, 2)",	"ItemParent" : null, "RightIndex" : null},
	//{"ItemText" : "", "ItemId" : "SP1", "ItemAction" : null},
	{"ItemText" : "新建文档",	"ItemId" : "createdoc",		"ItemAction" : "WCMDocument.addNew(m_objSrcEl.ObjId);",	"ItemParent" : null, "RightIndex" : 31},
	{"ItemText" : "文档列表",	"ItemId" : "documentlist",	"ItemAction" : "gotoChannelDocList(m_objSrcEl.ObjId);",	"ItemParent" : null, "RightIndex" : 30},
	{"ItemText" : "", "ItemId" : "SP2", "ItemAction" : null},
	{"ItemText" : "预览频道",	"ItemId" : "preview",		"ItemAction" : "WCMChannel.channelPreview(m_objSrcEl.ObjId);",	"ItemParent" : null, "RightIndex" : 15},
	{"ItemText" : "快速发布",	"ItemId" : "quickpub",		"ItemAction" : "channelQuickPublish(m_objSrcEl.ObjId);",		"ItemParent" : null, "RightIndex" : 17},
	{"ItemText" : "高级发布",	"ItemId" : "propub",		"ItemAction" : "channelProPublish(m_objSrcEl.ObjId);",			"ItemParent" : null, "RightIndex" : 16},
	{"ItemText" : "发布历史", "ItemId" : "pubinfo",			"ItemAction" : "rmPublishInfo(m_objSrcEl.ObjId, 101)",			"ItemParent" : null, "RightIndex" : 17},
	{"ItemText" : "发布属性",	"ItemId" : "pubproperty",	"ItemAction" : "editChannelPublishSetting(m_objSrcEl.ObjId);",	"ItemParent" : null, "RightIndex" : 13},
	{"ItemText" : "模板列表",	"ItemId" : "templatemanage","ItemAction" : "templateManage(101, m_objSrcEl.ObjId)",			"ItemParent" : null, "RightIndex" : 66},
	{"ItemText" : "", "ItemId" : "SP3", "ItemAction" : null},
	{"ItemText" : "修改频道",	"ItemId" : "editchannel",	"ItemAction" : "editChannel(m_objSrcEl);",							"ItemParent" : null, "RightIndex" : 13},
	{"ItemText" : "新建频道",	"ItemId" : "createchannel", "ItemAction" : "addChannelInChannel(m_objSrcEl.ObjId);",		"ItemParent" : null, "RightIndex" : 11},
	{"ItemText" : "删除频道",	"ItemId" : "deletechannel",	"ItemAction" : "deleteChannel(m_objSrcEl.ObjId);",				"ItemParent" : null, "RightIndex" : 12},
	//{"ItemText" : "移动频道",	"ItemId" : "movesite",		"ItemAction" : "moveChannel(m_objSrcEl.ObjId);",				"ItemParent" : null, "RightIndex" : 12},
	{"ItemText" : "", "ItemId" : "SP4", "ItemAction" : null},
	{"ItemText" : "设置权限",	"ItemId" : "setright",		"ItemAction" : "WCMChannel.setChannelRight(m_objSrcEl.ObjId);", "ItemParent" : null, "RightIndex" : 13}
);

var MENU_ITEM_CHANNEL_TOPPIC = new Array(
	//{"ItemText" : "站点管理", "ItemId" : "sitemanage",		"ItemAction" : "WCMChannel.rmChangeTab(101, m_objSrcEl.ObjId, 0)",	"ItemParent" : null, "RightIndex" : null},
	//{"ItemText" : "文档管理", "ItemId" : "docmanage",		"ItemAction" : "WCMChannel.rmChangeTab(101, m_objSrcEl.ObjId, 1)",	"ItemParent" : null, "RightIndex" : 30},
	//{"ItemText" : "发布管理", "ItemId" : "pubmanage",		"ItemAction" : "WCMChannel.rmChangeTab(101, m_objSrcEl.ObjId, 2)",	"ItemParent" : null, "RightIndex" : null},
	//{"ItemText" : "", "ItemId" : "SP1", "ItemAction" : null},
	{"ItemText" : "文档列表",	"ItemId" : "documentlist",	"ItemAction" : "gotoChannelDocList(m_objSrcEl.ObjId);",	"ItemParent" : null, "RightIndex" : 30},
	//{"ItemText" : "快速发布",	"ItemId" : "quickpub",		"ItemAction" : "channelQuickPublish(m_objSrcEl.ObjId);",		"ItemParent" : null, "RightIndex" : 17},
	//{"ItemText" : "高级发布",	"ItemId" : "propub",		"ItemAction" : "channelProPublish(m_objSrcEl.ObjId);",			"ItemParent" : null, "RightIndex" : 16},
	//{"ItemText" : "发布历史", "ItemId" : "pubinfo",			"ItemAction" : "rmPublishInfo(m_objSrcEl.ObjId, 101)",			"ItemParent" : null, "RightIndex" : 17},
	{"ItemText" : "", "ItemId" : "SP2", "ItemAction" : null},
	{"ItemText" : "修改频道",	"ItemId" : "editchannel",	"ItemAction" : "editChannel(m_objSrcEl);",							"ItemParent" : null, "RightIndex" : 13},
	//{"ItemText" : "类似创建",	"ItemId" : "similarcreate",	"ItemAction" : "createSimilarChannel(m_objSrcEl.ObjId);",				"ItemParent" : null, "RightIndex" : 11},
	{"ItemText" : "删除频道",	"ItemId" : "deletechannel",	"ItemAction" : "deleteChannel(m_objSrcEl.ObjId);",				"ItemParent" : null, "RightIndex" : 12},
	{"ItemText" : "", "ItemId" : "SP3", "ItemAction" : null},
	{"ItemText" : "设置权限",	"ItemId" : "setright",		"ItemAction" : "WCMChannel.setChannelRight(m_objSrcEl.ObjId);", "ItemParent" : null, "RightIndex" : 13}
);

var MENU_ITEM_CHANNEL_LINK = new Array(
	//{"ItemText" : "站点管理", "ItemId" : "sitemanage",		"ItemAction" : "WCMChannel.rmChangeTab(101, m_objSrcEl.ObjId, 0)",	"ItemParent" : null, "RightIndex" : null},
	//{"ItemText" : "文档管理", "ItemId" : "docmanage",		"ItemAction" : "WCMChannel.rmChangeTab(101, m_objSrcEl.ObjId, 1)",	"ItemParent" : null, "RightIndex" : 30},
	//{"ItemText" : "发布管理", "ItemId" : "pubmanage",		"ItemAction" : "WCMChannel.rmChangeTab(101, m_objSrcEl.ObjId, 2)",	"ItemParent" : null, "RightIndex" : null},
	//{"ItemText" : "", "ItemId" : "SP1", "ItemAction" : null},
	//{"ItemText" : "文档列表",	"ItemId" : "documentlist",	"ItemAction" : "gotoLinkChannelDocList(m_objSrcEl.ObjId);",	"ItemParent" : null, "RightIndex" : 30},
	//{"ItemText" : "", "ItemId" : "SP2", "ItemAction" : null},
	{"ItemText" : "修改频道",	"ItemId" : "editchannel",	"ItemAction" : "editChannel(m_objSrcEl);",							"ItemParent" : null, "RightIndex" : 13},
	//{"ItemText" : "类似创建",	"ItemId" : "similarcreate",	"ItemAction" : "createSimilarChannel(m_objSrcEl.ObjId);",				"ItemParent" : null, "RightIndex" : 11},
	{"ItemText" : "删除频道",	"ItemId" : "deletechannel",	"ItemAction" : "deleteChannel(m_objSrcEl.ObjId);",				"ItemParent" : null, "RightIndex" : 12},
	{"ItemText" : "", "ItemId" : "SP3", "ItemAction" : null},
	{"ItemText" : "设置权限",	"ItemId" : "setright",		"ItemAction" : "WCMChannel.setChannelRight(m_objSrcEl.ObjId);", "ItemParent" : null, "RightIndex" : 13}
);

var MENU_ITEM_CHANNEL_SUREFORM = new Array(
	//{"ItemText" : "站点管理", "ItemId" : "sitemanage",		"ItemAction" : "WCMChannel.rmChangeTab(101, m_objSrcEl.ObjId, 0)",	"ItemParent" : null, "RightIndex" : null},
	//{"ItemText" : "文档管理", "ItemId" : "docmanage",		"ItemAction" : "WCMChannel.rmChangeTab(101, m_objSrcEl.ObjId, 1)",	"ItemParent" : null, "RightIndex" : 30},
	//{"ItemText" : "发布管理", "ItemId" : "pubmanage",		"ItemAction" : "WCMChannel.rmChangeTab(101, m_objSrcEl.ObjId, 2)",	"ItemParent" : null, "RightIndex" : null},
	//{"ItemText" : "", "ItemId" : "SP1", "ItemAction" : null},
	{"ItemText" : "新建文档",	"ItemId" : "createdoc",		"ItemAction" : "createSureform(m_objSrcEl.ObjId);",	"ItemParent" : null, "RightIndex" : 31},
	{"ItemText" : "文档列表",	"ItemId" : "documentlist",	"ItemAction" : "gotoSureformList(m_objSrcEl.ObjId);",	"ItemParent" : null, "RightIndex" : 30},
	{"ItemText" : "", "ItemId" : "SP2", "ItemAction" : null},
	{"ItemText" : "预览频道",	"ItemId" : "preview",		"ItemAction" : "WCMChannel.channelPreview(m_objSrcEl.ObjId);",	"ItemParent" : null, "RightIndex" : 15},
	{"ItemText" : "快速发布",	"ItemId" : "quickpub",		"ItemAction" : "channelQuickPublish(m_objSrcEl.ObjId);",		"ItemParent" : null, "RightIndex" : 17},
	{"ItemText" : "高级发布",	"ItemId" : "propub",		"ItemAction" : "channelProPublish(m_objSrcEl.ObjId);",			"ItemParent" : null, "RightIndex" : 16},
	{"ItemText" : "发布历史", "ItemId" : "pubinfo",			"ItemAction" : "rmPublishInfo(m_objSrcEl.ObjId, 101)",			"ItemParent" : null, "RightIndex" : 17},
	{"ItemText" : "发布属性",	"ItemId" : "pubproperty",	"ItemAction" : "editChannelPublishSetting(m_objSrcEl.ObjId);",	"ItemParent" : null, "RightIndex" : 13},
	{"ItemText" : "模板列表",	"ItemId" : "templatemanage","ItemAction" : "templateManage(101, m_objSrcEl.ObjId)",			"ItemParent" : null, "RightIndex" : 66},
	{"ItemText" : "", "ItemId" : "SP3", "ItemAction" : null},
	{"ItemText" : "修改频道",	"ItemId" : "editchannel",	"ItemAction" : "editChannel(m_objSrcEl);",							"ItemParent" : null, "RightIndex" : 13},
	//{"ItemText" : "类似创建",	"ItemId" : "similarcreate",	"ItemAction" : "createSimilarChannel(m_objSrcEl.ObjId);",				"ItemParent" : null, "RightIndex" : 11},
	{"ItemText" : "删除频道",	"ItemId" : "deletechannel",	"ItemAction" : "deleteChannel(m_objSrcEl.ObjId);",				"ItemParent" : null, "RightIndex" : 12},
	{"ItemText" : "", "ItemId" : "SP4", "ItemAction" : null},
	{"ItemText" : "设置权限",	"ItemId" : "setright",		"ItemAction" : "WCMChannel.setChannelRight(m_objSrcEl.ObjId);", "ItemParent" : null, "RightIndex" : 13}
);

document.write("<script type='text/javascript' language='javascript'  src='../js/CTRSRightMenu_res_extends.jsp'></script>");

document.write("<script type='text/javascript' language='javascript'  src='../js/CTRSRightMenu_res_nav_renderDisplay.js'></script>");
