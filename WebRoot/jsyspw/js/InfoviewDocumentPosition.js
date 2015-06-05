//注册页面使用的Dialog
var DIALOG_DOC_SET_POSITION = "SetPositionDialog";
var m_oDialog = null;
function setDocPosition(_nDocId){
	var sURL = '../document/infoview_document_position_set.jsp?';
	sURL += "DocumentId=" +_nDocId;
	sURL += "&ChannelId=" + m_nCurrChannelId;
	
	m_oDialog = TRSDialogContainer.register(DIALOG_DOC_SET_POSITION, '设置文档顺序', sURL, '300px', '120px', true, true);
	TRSDialogContainer.display(DIALOG_DOC_SET_POSITION);
	
	if(m_oDialog != null) {
		m_oDialog.onFinished = function(_args){
			var oTRSAction = new CTRSAction("../document/document_position_set_dowith.jsp");
//			var oTRSAction = new CTRSAction("../document/infoview_document_position_set_dowith.jsp");
			oTRSAction.setParameter("ChannelId", m_nCurrChannelId);
			oTRSAction.setParameter("DocumentId", _args[0]);
			oTRSAction.setParameter("DocOrder", _args[1]);
			
			oTRSAction.doAction();
		}
	}
}

//实现Dialog要求的方法
/*
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
		TRSDialogContainer.close(_sOperationName);
		break;
	}
}//*/
