// define the class
var TRSDialogCotainer = Class.create();
// static members
TRSDialogCotainer.Version = 1.0;
TRSDialogCotainer.register = function(_sName, _sHeaderName, _sURL, _nWidth, _nHeight, _bAllowFrameScroll){
	if (TRSDialogCotainer.DialogsMap[_sName] != null){
		return TRSDialogCotainer.DialogsMap[_sName];
	}
	
	var aDialog = new TRSDialog(_sName, _sHeaderName, _sURL, _nWidth, _nHeight, _bAllowFrameScroll);
	TRSDialogCotainer.DialogsMap[_sName] = aDialog;

	return aDialog;
}

TRSDialogCotainer.display = function(_sName, _pDlgArgs){
	var aDialog = TRSDialogCotainer.DialogsMap[_sName];
	if (aDialog == null){
		return;
	}

	m_sCurrentOperationName = _sName;
	
	// else
	aDialog.display(_pDlgArgs);
}

TRSDialogCotainer.close = function(_sName){
	var aDialog = TRSDialogCotainer.DialogsMap[_sName];
	if (aDialog == null){
		return;
	}
	
	// else
	aDialog.close();
		
}

TRSDialogCotainer.getAt = function(_sName){
	var aDialog = TRSDialogCotainer.DialogsMap[_sName];
	return aDialog;
}

TRSDialogCotainer._CLASSNAME_LEFT_BOTTOM  = "left_buttom";
TRSDialogCotainer._CLASSNAME_RIGHT_CENTER = "right_center";
TRSDialogCotainer._CLASSNAME_RIGHT_BOTTOM = "right_bottom";
TRSDialogCotainer._CLASSNAME_CENTER       = "justifiedit";

TRSDialogCotainer.DialogsMap = $H();

var TRSDialog = Class.create();

TRSDialogCotainer.FindEvent = function(){
	var evt = window.event;
	if(!evt || evt == 'undefined'){
		evt = TRSDialogCotainer.FindEvent.caller;
		while(evt){
			var arg0=evt.arguments[0];
			if(arg0){
				if(arg0 instanceof Event){ // event 
					evt = arg0;
					break;
				}
			}

			evt = evt.caller;
		}

	}

	return evt;
}

TRSDialogCotainer.wait4Load = function(_sName){
	var aDialog = TRSDialogCotainer.getAt(_sName);
	if (aDialog == null){
		alert('null: ' + _sName);
		return;
	}
	// load it	
	if (aDialog.m_oFrame.document.FRAME_NAME != null ||
		aDialog.m_oFrame.document.FRAME_NAME != 'undefined'){
		try{
			aDialog.m_oFrame.document.FRAME_NAME = _sName;
			//alert('args ' + _pDlgArgs + ', frame: ' + aDialog.m_oFrame + ', framebody:' + aDialog.m_oFrame.document.body);
			if(aDialog.m_oFrame.init){
				aDialog.m_oFrame.init(aDialog.m_pFrameInitArgs);
			}			
		}catch(ex){
			alert(ex.message);
		}
		return;
	}

	//else
	setTimeout('TRSDialogCotainer.wait4Load("' + _sName + '")', 500);
	
}
TRSDialogCotainer.CloserIdPrefix = 'divCloser';
TRSDialogCotainer.HeaderIdPrefix = 'divHeader';
TRSDialogCotainer.DefaultHeaderName = 'TRS Web Dialog';
TRSDialogCotainer.DefaultFrameUrl = 'about:blank';
TRSDialogCotainer.DefaultRegionWidth = '300px';
TRSDialogCotainer.DefaultRegionHeight = '200px';

// constructor and members
TRSDialog.prototype = {
	initialize:	function(_sName, _sHeaderName, _sUrl, _sWidth, _sHeight, _bAllowFrameScroll){
		this.m_oFrame = null;
		this.m_oDisplayRegion = null;

		this.name = _sName;
		this.url = _sUrl || TRSDialogCotainer.DefaultFrameUrl;
		this.width = _sWidth || TRSDialogCotainer.DefaultRegionWidth;
		this.height = _sHeight || TRSDialogCotainer.DefaultRegionHeight;

		this.m_sHeaderName = _sHeaderName || TRSDialogCotainer.DefaultHeaderName;
		this.m_oCloser = null;
		this.m_oEventHandler = null;
		
		this.m_pFrameInitArgs = null;
		this.m_bAllowFrameScroll = _bAllowFrameScroll || false;
	},
	
	getContainer: function(){
		return this.m_oDisplayRegion;
	},

	getFireSetter: function(){
		return	this.m_oFireSetter;
	},

	setHeaderName: function(_sHeaderName){
		this.m_sHeaderName = _sHeaderName || TRSDialogCotainer.DefaultHeaderName;
	},

	toString: function(){
		if (this.m_oDisplayRegion == null){
			return '';
		}

		return this.m_oDisplayRegion.innerHTML;
	},

	display: function(_pDlgArgs) {	
		this._showDisplayRegion();

		this._initFrame(_pDlgArgs);

		this._showHeader();
		this._showCloser();

		this._positionAll();
	},
	
	close: function(){
		this.clear();
		this._hideBoard();	
	},
	
	_initFrame: function(_pDlgArgs){
		if (this.m_oFrame == null){
			this.m_oFrame = window.frames[this.name];			
		}
		
		//Frame
		if (this.m_oFrame != null && this.m_oFrame.document.FRAME_NAME) {			
			//alert('body: ' + this.m_oFrame.document.FRAME_NAME);
			this.m_oFrame.document.FRAME_NAME = this.name;
			if(this.m_oFrame.init){
				this.m_oFrame.init(_pDlgArgs);			
			}
			return;
		}

		this.m_pFrameInitArgs = _pDlgArgs;
		//else
		setTimeout('TRSDialogCotainer.wait4Load("' + this.name + '")', 500);
	},

	_createRegionInnerHTML: function(){
		var sHtml ='<iframe name="' + this.name + '" scrolling="no"';
		sHtml += ' width="'+ this.width +'"';
		sHtml += ' height="'+ this.height +'"';
		sHtml +='  frameborder="0" src="' + this.url + '" allowTransparency="true"></iframe>';
		return sHtml;		
	},

	//----------- private methods here---------------
	_showDisplayRegion: function(){
		if (this.m_oDisplayRegion == null) {
			var el = document.createElement('DIV');
			var sCssTxt = 'display:block;';
			sCssTxt += ' width:'+ this.width + ';';
			sCssTxt += ' height:'+ this.height+ ';';
			el.style.cssText = sCssTxt;

			el.className = 'cb-container';

			el.innerHTML = this._createRegionInnerHTML();

			this.m_oDisplayRegion = document.body.appendChild(el);
		}
		
	},

	_positionAll: function(){
		var _oEvt = TRSDialogCotainer.FindEvent();
		this.m_oEventHandler = _oEvt;

		// position the board
		var selfRef = this;
		this.m_oDisplayRegion.onkeydown = function(){selfRef._anchorKeyDown(); };
		this.m_oDisplayRegion.style.width = this.width;
		this.m_oDisplayRegion.style.height = (parseInt(this.height) + 10) + 'px';
		this.m_oDisplayRegion.style.display = 'block';
		this._placeContainer(this.m_oEventHandler);

		// position the header
 		this.m_oHeader.style.width = (parseInt(this.m_oDisplayRegion.style.width) + 6) + 'px'; 
		this.m_oHeader.style.left = this.m_oDisplayRegion.style.left;
		this.m_oHeader.style.top = (parseInt(this.m_oDisplayRegion.style.top) + 1)+"px";
		this.m_oHeader.style.display = "block";

		// position the closer
		this.m_oCloser.style.left = (parseInt(this.m_oHeader.style.left) 
			+ parseInt(this.m_oHeader.style.width) - parseInt(this.m_oCloser.style.width)- 2) + 'px';
		this.m_oCloser.style.top = (parseInt(this.m_oHeader.style.top))  + "px";
		this.m_oCloser.onclick = function (){selfRef.close(); return false;};
		this.m_oCloser.style.display = "block";
		
	},
 
	_showHeader: function(){
		if (this.m_oHeader == null){
			var header = this._createDiv(TRSDialogCotainer.HeaderIdPrefix);
			header.className = "cb-header";
			header.innerHTML = "&nbsp;" + this.m_sHeaderName;
			this.m_oHeader = document.body.appendChild(header);
		} 
	},

	_showCloser: function(){
		var id = TRSDialogCotainer.CloserIdPrefix + '_' + this.m_oDisplayRegion.id;
		this.m_oCloser = $(id);
		if (this.m_oCloser == null) {
			var el = document.createElement('DIV');
			el.style.cssText = "position:absolute;z-index:7000";
			el.setAttribute("id", id);
			el.style.position = "absolute";
			el.style.width = "16px";
			el.className = "cb-closer";		
			el.innerHTML="<img src=\"../images/x.gif\" height=\"16\" valign=\"middle\">";
			this.m_oCloser = document.body.appendChild(el);
		} 
	},
		
	_createDiv: function(_sIdPrefix){
		var id = TRSDialogCotainer.HeaderIdPrefix + '_' + this.m_oDisplayRegion.id;
		var result = null;
		
		// render
		var el = document.createElement('DIV');
		el.style.cssText = "position:absolute;z-index:6000";
		el.setAttribute("id", id);
		el.style.position = "absolute";
		result = el;

		return result;
	},

	_anchorKeyDown:	function () {
		alert(this.m_oEventHandler.keyCode);
		if (this.m_oEventHandler.keyCode == 27) {	// ESC
			this._hideBoard();
		}
	},
	
	clear: function(){
		//alert('this.m_oFrame:' + this.m_oFrame);
		if (this.m_oFrame == null){
			return;
		}

		// else
		var childrens = $A(this.m_oFrame.document.getElementsByTagName('INPUT'));
		childrens.each(function(child){
			if (child.type && (child.type.toLowerCase() == 'text' || child.type.toLowerCase() == 'password')){
				child.value = '';
			}
		});
		
		childrens = $A(this.m_oDisplayRegion.getElementsByTagName('TEXTAREA'));
		childrens.each(function(child){
			child.value = '';
		});

		if (this.m_oCloser != null){	
			this.m_oCloser.style.display = "none";
			this.m_oCloser = null;
		}
		if (this.m_oHeader != null){	
			this.m_oHeader.style.display = "none";
			this.m_oHeader = null;
		}
	},
	
	_hideBoard:	function () {
		this.m_oDisplayRegion.style.display = "none";
		
		if (this.m_oCloser != null)	
			this.m_oCloser.style.display = "none";
		if (this.m_oHeader != null)	
			this.m_oHeader.style.display = "none";
	},

	_placeContainer:	function (_oEvt) {
		var scroll = this._getScroll();
		var d = this.m_oDisplayRegion;
		d.height = parseInt(d.style.height);
		d.width = parseInt(d.style.width);
		var e = _oEvt;
		
		// left
		if (e.clientX > scroll.width - d.width){
			d.style.left = scroll.width - d.width * 1.2 + scroll.left + "px";
			//alert('over right');//: e.clientX=' + e.clientX + ', scroll.width=' + scroll.width + ', offsetWidth=' + d.width + ', d.width=' + d.style.width);
		}
		else{
			d.style.left = e.clientX - 5 + scroll.left + "px";
			//alert('just center');//: e.clientX=' + e.clientX + ', scroll.width=' + scroll.width + ', offsetWidth=' + offsetWidth + ', d.width=' + d.style.width);
		}
		
		// top
		//alert('e.clientY: ' + e.clientY + ', scroll-top: ' 
			//+ scroll.top + ', scroll.height: ' + scroll.height + ', d.height' + d.height);
		if (e.clientY + d.height < scroll.height) {
			//alert('over top!');
			d.style.top = e.clientY + 15 + scroll.top + "px";
		}
		else if (e.clientY - d.height > 0) {
			//alert('over bottom!');
			d.style.top = e.clientY - d.height - 35 + scroll.top + "px";
		}
		else{
			//alert('jsut middle!');
			d.style.top = e.clientY + 15 + scroll.top + "px";
		}
	},
	
	// returns the scroll left and top for the browser viewport.
	_getScroll:	function () {
		if (document.all && typeof document.body.scrollTop != "undefined") {	// IE model
			var ieBox = document.compatMode != "CSS1Compat";
			var cont = ieBox ? document.body : document.documentElement;
			return {
				left:	cont.scrollLeft,
				top:	cont.scrollTop,
				width:	cont.clientWidth,
				height:	cont.clientHeight
			};
		}
		else {
			return {
				left:	window.pageXOffset,
				top:	window.pageYOffset,
				width:	window.innerWidth,
				height:	window.innerHeight
			};
		}
		
	}
}

var m_sCurrentOperationName = "";

window.notifyParentOnFinished = function(_sOperationName, _args){
	var sOperationName = null;
	if(_sOperationName != null && _sOperationName.length>0)
		sOperationName = _sOperationName;
	else
		sOperationName = m_sCurrentOperationName;

	notifyParentOnFinishedImpl(sOperationName, _args);
}

window.notifyParentOnFinishedImpl = function(_sOperationName, _args){
	alert('please implement the "notifyParentOnFinishedImpl" function!');
}

window.notifyParent2CloseMe = function(_sOperationName){
	if(_sOperationName != null && _sOperationName.length>0)
		TRSDialogCotainer.close(_sOperationName);
	else
		TRSDialogCotainer.close(m_sCurrentOperationName);
}
