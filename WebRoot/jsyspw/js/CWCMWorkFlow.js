/////////Line Object Begin/////////
function CWCMFlowLine_setStatus(_status, _desc){
	this.status = _status;
	this.desc = _desc;
}

function CWCMFlowLine(_start, _end, _status, _desc){
	this.start = _start;
	this.end = _end;
	this.status = _status;
	this.statusDesc = _desc;
	//fangxiang@2002-03-27:连线默认通知方式是短消息(2)
	this.notifyType = 1;
	this.updated = false;
	this.branchID = 0;
	this.nodeID = 0;

	this.setStatus = CWCMFlowLine_setStatus;
}
////////Line Object End/////////

////////CWCMFlowPoint Object Begin/////////
function CWCMFlowPoint(_x, _y){
	this.x = _x;
	this.y = _y;
}
////////CWCMFlowPoint Object End/////////

////////Node Object Begin/////////
function CWCMFlowNode_setPoint(_x, _y){
	this.updated = true;
	this.center.x = _x;
	this.center.y = _y;
}

function CWCMFlowNode_getPoint(){
	return this.center;
}

function CWCMFlowNode_setName(_name){
	this.name = _name;
}

function CWCMFlowNode_addUser(_userName, _userId){
	this.users.push(new CWCMFlowUser(_userName, _userId));
}

function CWCMFlowNode_findUserByID(_id){
	for(var i = 0; i < this.users.length; i++){
		if(this.users[i].userID == _id){
			return this.users[i];
		}
	}
	return null;
}

function CWCMFlowNode_findGroupByID(_id){
	for(var i = 0; i < this.groups.length; i++){
		if(this.groups[i].groupID == _id){
			return this.groups[i];
		}
	}
	return null;
}

function CWCMFlowNode_addGroup(_groupName, _groupId){
	this.groups.push(new CWCMFlowGroup(_groupName, _groupId));
}

function CWCMFlowNode_findLineByEnd(_end){
	for(var i = 0; i < this.lines.length; i++){
		if(this.lines[i].end == _end) return this.lines[i];
	}
	return null;
}

function CWCMFlowNode_addLine(_line){
	this.updated = true;
	this.lines.push(_line);
}

function CWCMFlowNode_removeLine(_end){
	for(var i = 0; i < this.lines.length; i++){
		if(this.lines[i].end == _end){
			this.lines.splice(i, 1);
			break;
		}
	}
	return null;
}

function CWCMFlowNode(_id, _name, _user,_desc){
	this.name = _name;
	this.desc = _desc;
	this.id = _id;
	
	this.lines = new Array();
	this.users = new Array();
	this.groups = new Array();
	this.cruser = _user;
	this.center = new CWCMFlowPoint(0, 0);
	this.updated = false;
	this.actions = 3;
	this.flowID = 0;
	this.together = 0;

	//caohui 2003-6-11
	//增加记录事件的XML属性
	this.eventXML = "<WCMFLOWNODEEVENTS Version=\"5.1\" />";

	this.setPoint		= CWCMFlowNode_setPoint;
	this.getPoint		= CWCMFlowNode_getPoint;
	this.setName		= CWCMFlowNode_setName;
	this.addUser		= CWCMFlowNode_addUser;
	this.findUserByID	= CWCMFlowNode_findUserByID;
	this.addGroup		= CWCMFlowNode_addGroup;
	this.findGroupByID	= CWCMFlowNode_findGroupByID;
	this.addLine		= CWCMFlowNode_addLine;
	this.findLineByEnd	= CWCMFlowNode_findLineByEnd;
	this.removeLine		= CWCMFlowNode_removeLine;
}
////////Node Object End/////////

////////CWCMFlowGroup Object Begin/////////
function CWCMFlowGroup(_groupName, _groupID){
	this.groupName = _groupName;
	this.groupID = _groupID;
}
////////CWCMFlowGroup Object End/////////

////////CWCMFlowUser Object Begin/////////
function CWCMFlowUser(_userName, _userID){
	this.userName = _userName;
	this.userID = _userID;
}
////////CWCMFlowUser Object End/////////

////////Flow Object Begin/////////
function CWCMFlow_addNode(_node){
	this.nodes.push(_node);
}

function CWCMFlow_setName(_name){
	this.name = _name;
}

function CWCMFlow_setDesc(_desc){
	this.desc = _desc;
}

function CWCMFlow_getNodes(){
	return this.nodes;
}

function CWCMFlow_findNodeByID(_id){
	for(var i = 0; i < this.nodes.length; i++){
		if(this.nodes[i].id == _id) return this.nodes[i];
	}
	return null;
}

function CWCMFlow_findNodeByName(_name)
{
	for(var i = 0; i < this.nodes.length; i++){
		if(this.nodes[i].name == _name) return this.nodes[i];
	}
	return null;
}

function CWCMFlow_removeNode(_nodeName){
	for(var i = 0; i < this.nodes.length; i++){
		if(this.nodes[i].name == _nodeName){
			this.nodes.splice(i, 1);
			//
			break;
		}
	}
	//remove the lines end with this node
	for(var i = 0; i < this.nodes.length; i++){
		for(var j = 0; j < this.nodes[i].lines.length; j++){
			if(this.nodes[i].lines[j].end == _nodeName){
				this.nodes[i].lines.splice(j, 1);
				break;
			}
		}
	}
}

function CWCMFlow_findUserByID(_nUserId){
	return new CWCMFlowUser("尚未实现", _nUserId);
}

function CWCMFlow_findGroupByID(_nGroupId){
	return new CWCMFlowGroup("尚未实现", _nGroupId);
}

function CWCMFlow_renameNode(_oldNodeName, _newNodeName){
	//rename Node Name
	for(var i = 0; i < this.nodes.length; i++){
		for(var j = 0; j < this.nodes[i].lines.length; j++){
			if(this.nodes[i].lines[j].end == _oldNodeName){
				this.nodes[i].lines[j].end = _newNodeName;
			}else if(this.nodes[i].lines[j].start == _oldNodeName){
				this.nodes[i].lines[j].start = _newNodeName;
			}
		}
	}
}

function CWCMFlow_getUserNamesByIds(_sUserIds){
	var sUserIds = _sUserIds || "";
	if(!sUserIds || sUserIds.length <= 0 || sUserIds.toLowerCase() == "null")
		return;

	var oTRSAction = new CTRSAction("../auth/username_get_by_ids.jsp");
	oTRSAction.setParameter("UserIds", sUserIds);
	var sUserNames = oTRSAction.doXMLHttpAction();
	return TRSString.trim(sUserNames);
}

function CWCMFlow_getGroupNamesByIds(_sGroupIds){
	var sGroupIds = _sGroupIds || "";
	if(!sGroupIds || sGroupIds.length <= 0 || sGroupIds.toLowerCase() == "null")
		return;

	var oTRSAction = new CTRSAction("../auth/grpname_get_by_ids.jsp");
	oTRSAction.setParameter("GroupIds", sGroupIds);
	var sGroupNames = oTRSAction.doXMLHttpAction();
	return TRSString.trim(sGroupNames);
}

function CWCMFlow_toXML(){
	//work flow header
	var xmlDoc = new ActiveXObject("MSXML2.DOMDocument");
	//
	var xmlWorkFlow = xmlDoc.createElement("WCMFLOW");
	//flow property
	var xmlProp = xmlDoc.createElement("PROPERTIES");
	//flow name
	var flowName = xmlDoc.createElement("FLOWNAME");
	var flowNameData = xmlDoc.createCDATASection(this.name);
	flowName.appendChild(flowNameData);
	xmlProp.appendChild(flowName);
	//flow desc
	var flowDesc = xmlDoc.createElement("FLOWDESC");
	var flowDescData = xmlDoc.createCDATASection(this.desc);
	flowDesc.appendChild(flowDescData);
	xmlProp.appendChild(flowDesc);
	//flow id
	var flowID = xmlDoc.createElement("FLOWID");
	flowID.text = this.id;
	xmlProp.appendChild(flowID);
	//flow create user
	var flowCrUser = xmlDoc.createElement("CRUSER");
	var flowCrUserData = xmlDoc.createCDATASection(this.cruser);
	flowCrUser.appendChild(flowCrUserData);
	xmlProp.appendChild(flowCrUser);
	//OwnerType and OwnerId
	var flowOwnerType = xmlDoc.createElement("OWNERTYPE");
	flowOwnerType.text = this.ownerType;
	xmlProp.appendChild(flowOwnerType);
	var flowOwnerId = xmlDoc.createElement("OWNERID");
	flowOwnerId.text = this.ownerId;
	xmlProp.appendChild(flowOwnerId);
	
	//startNode
	var startNode = xmlDoc.createElement("SNAME");
	var startNodeData = xmlDoc.createCDATASection(this.startNode);
	startNode.appendChild(startNodeData);
	xmlProp.appendChild(startNode);
	//endNode
	var endNode = xmlDoc.createElement("ENAME");
	var endNodeData = xmlDoc.createCDATASection(this.endNode);
	//WHY:: 2002-2-19
	endNode.appendChild(endNodeData);
	xmlProp.appendChild(endNode);
	//
	xmlWorkFlow.appendChild(xmlProp);
	xmlDoc.appendChild(xmlWorkFlow);
	//all nodes
	var xmlNodes = xmlDoc.createElement("WCMFLOWNODES");
	for(var nodeIndex = 0; nodeIndex < this.nodes.length; nodeIndex++){
		var xmlNode = xmlDoc.createElement("WCMFLOWNODE");
		var xmlNodeProp = xmlDoc.createElement("PROPERTIES")
		//name
		var nodeName = xmlDoc.createElement("NODENAME");
		var nodeNameData = xmlDoc.createCDATASection(this.nodes[nodeIndex].name);
		nodeName.appendChild(nodeNameData);
		xmlNodeProp.appendChild(nodeName);
		//desc
		var nodeDesc = xmlDoc.createElement("NODEDESC");
		var nodeDescData = xmlDoc.createCDATASection(this.nodes[nodeIndex].desc);
		nodeDesc.appendChild(nodeDescData);
		xmlNodeProp.appendChild(nodeDesc);
		//id
		var nodeID = xmlDoc.createElement("NODEID");
		nodeID.text = this.nodes[nodeIndex].id;
		xmlNodeProp.appendChild(nodeID);
		//flow id
		var nodeFlowID = xmlDoc.createElement("FLOWID");
		nodeFlowID.text = this.id;
		xmlNodeProp.appendChild(nodeFlowID);
		//node create user
		var nodeCrUser = xmlDoc.createElement("CRUSER");
		var nodeCrUserData = xmlDoc.createCDATASection(this.nodes[nodeIndex].cruser);
		nodeCrUser.appendChild(nodeCrUserData);
		xmlNodeProp.appendChild(nodeCrUser);
		
		//node together property
		//FX:: 2002-06-06:Add Together Property for CWCMFlowNode
		var nodeTogether = xmlDoc.createElement("TOGETHER");
		nodeTogether.text = this.nodes[nodeIndex].together;
		xmlNodeProp.appendChild(nodeTogether);
		//node center X
		var nodeCenterX = xmlDoc.createElement("CENTERX");
		nodeCenterX.text = this.nodes[nodeIndex].center.x;
		xmlNodeProp.appendChild(nodeCenterX);
		//node center Y
		var nodeCenterY = xmlDoc.createElement("CENTERY");
		nodeCenterY.text = this.nodes[nodeIndex].center.y;
		xmlNodeProp.appendChild(nodeCenterY);
		//node actions
		var nodeActions = xmlDoc.createElement("ACTIONS");
		nodeActions.text = this.nodes[nodeIndex].actions;
		xmlNodeProp.appendChild(nodeActions);
		//node updated
		//var nodeUpdated = xmlDoc.createElement("UPDATE");
		//nodeUpdated.text = this.nodes[nodeIndex].updated == true ? "1" : "0";
		//xmlNodeProp.appendChild(nodeUpdated);
		//insert node properties
		xmlNode.appendChild(xmlNodeProp);
		//users
		if(this.nodes[nodeIndex].users.length > 0){
			var nodeUsers = xmlDoc.createElement("WCMUSERS");
			for(var userIndex = 0; userIndex < this.nodes[nodeIndex].users.length; userIndex++){
				var nodeUser = xmlDoc.createElement("WCMUSER");
				var userProp = xmlDoc.createElement("PROPERTIES");
				var userId = xmlDoc.createElement("USERID");
				userId.text = this.nodes[nodeIndex].users[userIndex].userID;
				userProp.appendChild(userId);
				nodeUser.appendChild(userProp);
				nodeUsers.appendChild(nodeUser);
			}
			xmlNode.appendChild(nodeUsers);
		}
		//groups
		if(this.nodes[nodeIndex].groups.length > 0){
			var nodeGroups = xmlDoc.createElement("WCMGROUPS");
			for(var groupIndex = 0; groupIndex < this.nodes[nodeIndex].groups.length; groupIndex++){
				var nodeGroup = xmlDoc.createElement("WCMGROUP");
				var grpProp = xmlDoc.createElement("PROPERTIES");
				var groupId = xmlDoc.createElement("GROUPID");
				groupId.text = this.nodes[nodeIndex].groups[groupIndex].groupID;
				grpProp.appendChild(groupId);
				nodeGroup.appendChild(grpProp);
				nodeGroups.appendChild(nodeGroup);
			}
			xmlNode.appendChild(nodeGroups);
		}
		//branch
		var xmlBranchs = xmlDoc.createElement("WCMFLOWBRANCHS");
		for(var lineIndex = 0; lineIndex < this.nodes[nodeIndex].lines.length; lineIndex++){
			var thisLine = this.nodes[nodeIndex].lines[lineIndex];
			if(thisLine.end != ""){
				var nodeLine = xmlDoc.createElement("WCMFLOWBRANCH");
				var nodeProperties = xmlDoc.createElement("PROPERTIES");
				//status
				var lineStatus = xmlDoc.createElement("STATUS");
				lineStatus.text = thisLine.status;
				nodeProperties.appendChild(lineStatus);
				//next node name
				var lineNode = xmlDoc.createElement("NEXTNAME");
				var lineNodeData = xmlDoc.createCDATASection(thisLine.end);
				lineNode.appendChild(lineNodeData);
				nodeProperties.appendChild(lineNode);
				//notify 
				var lineNotifies = xmlDoc.createElement("NOTIFY");
				lineNotifies.text = transformNotify(thisLine.notifyType);
				nodeProperties.appendChild(lineNotifies);
				//Branch ID
				var lineBranchID = xmlDoc.createElement("BRANCHID");
				lineBranchID.text = thisLine.branchID;
				nodeProperties.appendChild(lineBranchID);
				//NODE ID
				var lineNodeID = xmlDoc.createElement("NODEID");
				lineNodeID.text = thisLine.nodeID;
				nodeProperties.appendChild(lineNodeID);
				//
				nodeLine.appendChild(nodeProperties);
				xmlBranchs.appendChild(nodeLine);
			}
		}
		if(xmlBranchs.hasChildNodes) xmlNode.appendChild(xmlBranchs);

		//添加事件节点 caohui@2003-6-14		
		//CTRSAction_alert(this.nodes[nodeIndex].eventXML);
		var xmlDocEvents = new ActiveXObject("MSXML2.DOMDocument");
		xmlDocEvents.loadXML(this.nodes[nodeIndex].eventXML);
		xmlNode.appendChild(xmlDocEvents.documentElement);

		xmlNodes.appendChild(xmlNode);
	}
	if(xmlNodes.hasChildNodes) xmlWorkFlow.appendChild(xmlNodes);
	//moniter User
	var xmlMonUsers = xmlDoc.createElement("MONUSERS");
	for(var userIndex = 0; userIndex < this.monUsers.length; userIndex++){
		var xmlMonUser = xmlDoc.createElement("USERID");
		xmlMonUser.text = this.monUsers[userIndex];
		xmlMonUsers.appendChild(xmlMonUser);
	}
	if(xmlMonUsers.hasChildNodes) xmlWorkFlow.appendChild(xmlMonUsers);
	
	return xmlDoc.xml;
}//END: toXML

function CWCMFlow_fromXML(_xml, _xmlStatus){
	var xmlStatus = new ActiveXObject("Microsoft.XMLDOM");
	xmlStatus.loadXML(_xmlStatus);
	//
	var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
	xmlDoc.loadXML(_xml);
	var xmlWorkFlow = xmlDoc.documentElement;
	//properties:
	var aNodes = xmlWorkFlow.selectNodes("PROPERTIES/FLOWNAME");
	if(aNodes.length > 0) this.name = aNodes[0].text;
	//description:
	aNodes = xmlWorkFlow.selectNodes("PROPERTIES/FLOWDESC");
	if(aNodes.length > 0) this.desc = aNodes[0].text;
	//
	aNodes = xmlWorkFlow.selectNodes("PROPERTIES/FLOWID");
	if(aNodes.length > 0) this.id = aNodes[0].text;
	//
	aNodes = xmlWorkFlow.selectNodes("PROPERTIES/CRUSER");
	if(aNodes.length > 0) this.cruser = aNodes[0].text;
	//
	aNodes = xmlWorkFlow.selectNodes("PROPERTIES/SNAME");
	if(aNodes.length > 0) this.startNode = aNodes[0].text;
	//OwnerType and OwnerId
	aNodes = xmlWorkFlow.selectNodes("PROPERTIES/OWNERTYPE");
	if(aNodes.length > 0) this.ownerType = aNodes[0].text;
	aNodes = xmlWorkFlow.selectNodes("PROPERTIES/OWNERID");
	if(aNodes.length > 0) this.ownerId = aNodes[0].text;
	//written by fangxiang,2002-02-05
	aNodes = xmlWorkFlow.selectNodes("PROPERTIES/ENAME");
	if(aNodes.length > 0) this.endNode = aNodes[0].text;
	//nodes:
	var aNodes = xmlWorkFlow.selectNodes("WCMFLOWNODES/WCMFLOWNODE");
	for(var nodeIndex = 0; nodeIndex < aNodes.length; nodeIndex++){
		var nodeName="",nodeDesc="",nodeID="",nodeCrUser="",nodeCrTime="";
		var nodeCenterX = 0, nodeCenterY = 0,flowID = 0;
		//
		var aNodeProperties = aNodes[nodeIndex].selectNodes("PROPERTIES/NODENAME");
		if(aNodeProperties.length > 0) nodeName = aNodeProperties[0].text;
		//
		aNodeProperties = aNodes[nodeIndex].selectNodes("PROPERTIES/NODEDESC");
		if(aNodeProperties.length > 0) nodeDesc = aNodeProperties[0].text;
		//
		aNodeProperties = aNodes[nodeIndex].selectNodes("PROPERTIES/NODEID");
		if(aNodeProperties.length > 0) nodeID = aNodeProperties[0].text;
		//
		aNodeProperties = aNodes[nodeIndex].selectNodes("PROPERTIES/FLOWID");
		if(aNodeProperties.length > 0) flowID = aNodeProperties[0].text;
		//
		//
		aNodeProperties = aNodes[nodeIndex].selectNodes("PROPERTIES/CRUSER");
		if(aNodeProperties.length > 0) nodeCrUser = aNodeProperties[0].text;
		//
		//
		aNodeProperties = aNodes[nodeIndex].selectNodes("PROPERTIES/CENTERX");
		if(aNodeProperties.length > 0) nodeCenterX = aNodeProperties[0].text;
		//
		aNodeProperties = aNodes[nodeIndex].selectNodes("PROPERTIES/CENTERY")
		if(aNodeProperties.length > 0) nodeCenterY = aNodeProperties[0].text;
		//
		var node = new CWCMFlowNode(nodeID, nodeName, nodeCrUser, nodeDesc);
		node.setPoint(nodeCenterX, nodeCenterY);
		node.flowID = flowID;
		node.cruser = nodeCrUser;
		//FX:: 2002-06-06:Add Together Property for CWCMFlowNode
		aNodeProperties = aNodes[nodeIndex].selectNodes("PROPERTIES/TOGETHER");
		if(aNodeProperties.length > 0) node.together = aNodeProperties[0].text;
		//WHY:: 2002-2-19eve
		aNodeProperties = aNodes[nodeIndex].selectNodes("PROPERTIES/ACTIONS")
		if(aNodeProperties.length > 0) node.actions = aNodeProperties[0].text;
		//user
		var aUsers = aNodes[nodeIndex].selectNodes("WCMUSERS/WCMUSER");
		var sUserIds = "";
		for(var userIndex =  0; userIndex < aUsers.length; userIndex++){
			sUserIds += aUsers[userIndex].text + ",";
			if(sUserIds.length > 0 && userIndex == aUsers.length-1)
				sUserIds = sUserIds.substring(0, sUserIds.length-1);
			//node.addUser(aUsers[userIndex].text);
		}
		var sUserNames = this.getUserNamesByIds(sUserIds);
		if(sUserNames != null && sUserNames.indexOf("<") < 0){
			var arUserIds = sUserIds.split(",");
			var arUserNames = sUserNames.split(",");
			for(var userIdIndex=0; userIdIndex < arUserIds.length; userIdIndex++){
				node.addUser(arUserNames[userIdIndex], arUserIds[userIdIndex]);
			}
		}
		
		//group
		var aGroups = aNodes[nodeIndex].selectNodes("WCMGROUPS/WCMGROUP");
		var sGroupIds = "";
		for(var groupIndex = 0; groupIndex < aGroups.length; groupIndex++){
			sGroupIds += aGroups[groupIndex].text + ",";
			if(sGroupIds.length > 0 && groupIndex == aGroups.length-1)
				sGroupIds = sGroupIds.substring(0, sGroupIds.length-1);
			//node.addGroup(aGroups[groupIndex].text);
		}
		var sGroupNames = this.getGroupNamesByIds(sGroupIds);
		if(sGroupNames != null && sGroupNames.indexOf("<") < 0){
			var arGroupIds = sGroupIds.split(",");
			var arGroupNames = sGroupNames.split(",");
			for(var groupIdIndex=0; groupIdIndex < arGroupIds.length; groupIdIndex++){
				node.addGroup(arGroupNames[groupIdIndex], arGroupIds[groupIdIndex]);
			}
		}
		
		//line
		var aBranchs = aNodes[nodeIndex].selectNodes("WCMFLOWBRANCHS/WCMFLOWBRANCH");
		for(var branchIndex = 0; branchIndex < aBranchs.length; branchIndex++){
			var lineStatus =  0, lineEnd = "" ,lineDesc = "";
			//
			var aBranchProperties = aBranchs[branchIndex].selectNodes("PROPERTIES/STATUS");
			if(aBranchProperties.length > 0){
				var sXMLFind = "WCMSTATUS/PROPERTIES[STATUSID="+aBranchProperties[0].text+"]/SDISP";
				//CTRSAction_alert(sXMLFind);
				var aStatusNames = xmlStatus.documentElement.selectNodes(sXMLFind);
				//CTRSAction_alert("aStatusNames.length:"+aStatusNames.length);
				if(aStatusNames.length > 0){
					lineStatus = aBranchProperties[0].text;
					lineDesc = aStatusNames[0].text;
				}
			}
			//
			aBranchProperties = aBranchs[branchIndex].selectNodes("PROPERTIES/NEXTNAME");
			if(aBranchProperties.length > 0) lineEnd = aBranchProperties[0].text;
			//
			var aLine = new CWCMFlowLine(nodeName, lineEnd, lineStatus, lineDesc);
			//
			aBranchProperties = aBranchs[branchIndex].selectNodes("PROPERTIES/NOTIFY");
			if(aBranchProperties.length > 0) aLine.notifyType = transformNotify(aBranchProperties[0].text);
			//
			aBranchProperties = aBranchs[branchIndex].selectNodes("PROPERTIES/BRANCHID");
			if(aBranchProperties.length > 0) aLine.branchID = aBranchProperties[0].text;
			//
			aBranchProperties = aBranchs[branchIndex].selectNodes("PROPERTIES/NODEID");
			if(aBranchProperties.length > 0) aLine.nodeID = aBranchProperties[0].text;
			//
			node.addLine(aLine);
		}

		//caohui@2003-06-13
		var currEvent = aNodes[nodeIndex].selectSingleNode("WCMFLOWNODEEVENTS")
		if(currEvent!=null){
			node.eventXML = currEvent.xml;
		}else{
			node.eventXML = "<WCMFLOWNODEEVENTS Version=\"5.1\"/>";
		}
		
		this.addNode(node);	
	}
	//monUsers
	var aMonUsers = xmlWorkFlow.selectNodes("MONUSERS/USERID");
	for(var userIndex = 0; userIndex < aMonUsers.length; userIndex++){
		this.monUsers.push(aMonUsers[userIndex].text);
	}
	//
}//END: fromXML

function CWCMFlow(_name, _id, _user){
	this.name = _name;
	this.id = _id;
	this.nodes = new Array();
	this.monUsers = new Array();
	this.desc = "";
	this.cruser = _user;
	this.ownerType = 0;
	this.ownerId = 0;
	
	this.startNode = "开始";
	this.endNode = "结束";

	this.addNode		= CWCMFlow_addNode;
	this.removeNode		= CWCMFlow_removeNode;
	this.renameNode		= CWCMFlow_renameNode;
	this.setName		= CWCMFlow_setName;
	this.setDesc		= CWCMFlow_setDesc;
	this.getNodes		= CWCMFlow_getNodes;
	this.findNodeByID	= CWCMFlow_findNodeByID;
	this.findNodeByName	= CWCMFlow_findNodeByName;
	this.findUserByID	= CWCMFlow_findUserByID;
	this.findGroupByID	= CWCMFlow_findGroupByID;
	this.toXML			= CWCMFlow_toXML;
	this.fromXML		= CWCMFlow_fromXML;
	this.getUserNamesByIds = CWCMFlow_getUserNamesByIds;
	this.getGroupNamesByIds = CWCMFlow_getGroupNamesByIds;
}
////////Flow Object End/////////

	/**WCM提醒类别：在线提醒 */
	var REMIND_ONLINE   = 0;
	/**WCM提醒类别：Email提醒 */
	var REMIND_BYEMAIL  = 1;
	/**WCM提醒类别：手机提醒 */
	var REMIND_BYMOBILE = 2;

function CTRSBitsValue_getBit(_nIndex){
	if(_nIndex >= 32){
		return this.nHighValue & Math.pow(2, (_nIndex-32));
	}else{
		return this.nLowValue & Math.pow(2, _nIndex);
	}
}

function CTRSBitsValue_setValue(_nLowValue, _nHighValue){
	this.nLowValue	= _nLowValue	|| 0;
	this.nHighValue = _nHighValue	|| 0;
}

function CTRSBitsValue_setBit(_nIndex, _bValue){
	var nIndex = _nIndex, nValue = this.nLowValue;
	if(_nIndex >= 32){
		nIndex = _nIndex - 32;
		nValue = this.nHighValue;
	}
	
	if(nValue == 0 && !_bValue)return;

	var nTemp;
	if(_bValue){
		nValue = (nValue | Math.pow(2, nIndex));
	}else{//^ &
		nTemp = ~Math.pow(2, nIndex);
		nValue = (nValue & nTemp);
	}

	if(_nIndex > 31){
		this.nHighValue = nValue;
	}else{
		this.nLowValue = nValue;
	}
}

function CTRSBitsValue(_nLowValue, _nHighValue){
//Define Properties
	this.nLowValue	= _nLowValue || 0;
	this.nHighValue = _nHighValue || 0;

//Define Method
	this.setBit		= CTRSBitsValue_setBit;
	this.setValue	= CTRSBitsValue_setValue;
	this.getBit		= CTRSBitsValue_getBit;
}

function transformNotify(_sValue){
	var aBitsValue = new CTRSBitsValue(_sValue);
	if(aBitsValue.getBit(REMIND_ONLINE) && aBitsValue.getBit(REMIND_BYEMAIL))
		return _sValue;
	if(!aBitsValue.getBit(REMIND_ONLINE) && !aBitsValue.getBit(REMIND_BYEMAIL))
		return _sValue;

	if(aBitsValue.getBit(REMIND_ONLINE)){
		aBitsValue.setBit(REMIND_BYEMAIL, true);
		aBitsValue.setBit(REMIND_ONLINE, false);
	}else if(aBitsValue.getBit(REMIND_BYEMAIL)){
		aBitsValue.setBit(REMIND_BYEMAIL, false);
		aBitsValue.setBit(REMIND_ONLINE, true);
	}
	return aBitsValue.nLowValue;
}