
function setDocPosition(_nDocId){
	var sURL = '../document/document_position_set.jsp?';
	sURL += "DocumentId=" +_nDocId;
	sURL += "&ChannelId=" +m_nCurrChannelId;
	
	TRSDialogCotainer.register(DIALOG_DOC_SET_POSITION, '设置文档顺序', sURL, '300px', '150px');

	TRSDialogCotainer.display(DIALOG_DOC_SET_POSITION);	
}

//实现Dialog要求的方法
function notifyParentOnFinishedImpl(_sOperationName, _args){
	if(_args == null || _args.length<=0){
		return;
	}

	switch(_sOperationName){
	case DIALOG_DOC_SET_POSITION :
		var oTRSAction = new CTRSAction("../document/document_position_set_dowith.jsp");
		oTRSAction.setParameter("ChannelId", m_nCurrChannelId);
		oTRSAction.setParameter("DocumentId", _args[0]);
		oTRSAction.setParameter("DocOrder", _args[1]);
		
		oTRSAction.doAction();
		break;	
	default:
		TRSDialogCotainer.close(_sOperationName);
		break;
	}
}


//注册页面使用的Dialog
var DIALOG_DOC_SET_POSITION = "SetPositionDialog";