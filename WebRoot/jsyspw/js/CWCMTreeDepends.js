//中文
function importScriptSrc(_src){
	document.write("<script src=\""+_src+"\"><\/script>");
}

try{
	CWCMObjHelper;
}catch(ex){
	importScriptSrc("../js/CWCMObj.js");
	importScriptSrc("../js/CWCMObjHelper.js");	
}

try{
	CTRSTree;
}catch(ex){	
	importScriptSrc("../js/CTRSTree_res_default.js");
	importScriptSrc("../js/CTRSTree.js");
}

try{
	CTRSAction;
}catch(ex){
	importScriptSrc("../js/CTRSHashtable.js");
	importScriptSrc("../js/CTRSRequestParam.js");
	importScriptSrc("../js/CTRSAction.js");	
}

try{
	CWCMConstants;
}catch(ex){
	importScriptSrc("../common/CWCMConstants.jsp");	
}
