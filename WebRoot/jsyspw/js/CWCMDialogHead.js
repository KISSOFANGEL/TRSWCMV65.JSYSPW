function CWCMDialogHead_draw(_sTitle, _bNoHelp,_sParameters){
	_bNoHelp = true;
	var sHTML = ""
		+"<TABLE width=\"100%\" height=\"30\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">" 
		+"<!--~--- ROW1 ---~-->" 
		+"<TR>" 
		+"  <TD height=\"25\">" 
		+"  <!--~== TABLE2 ==~-->" 
		+"  <TABLE width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" background=\"../images/window_general_them_title_bg.jpg\">" 
		+"  <!--~--- ROW2 ---~-->" 
		+"  <TR>" 
		+"      <TD width=\"20\" align=center><IMG src=\"../images/bite-yellow.gif\" width=\"10\" height=\"10\"></TD>" 
		+"    " 
		+"  <TD class=\"windowname\">"+_sTitle+"</TD>" 
		+"" 
		+"      <TD width=\"20\"><IMG src=\"../images/window_general_them_middle.jpg\" width=\"20\" height=\"25\"></TD>" 
		+"		<TD width=\"60\" valign=\"bottom\" align=center background=\"../images/window_general_them_hinder_.jpg\">" 
		+"			 <!--~== TABLE3 ==~-->" 
		+"			 <TABLE width=\"52\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">" 
		+"			 <!--~--- ROW3 ---~-->" 
		+"			 <TR>" 
		+"				<TD width=\"50\">" + (_bNoHelp?"&nbsp;":"<A href=\"#\" class=\"top_white_link\" onClick=\"goforHelp();\">帮助</A>") + "</TD>" 
		+"			 </TR>" 
		+"			 <!--~- END ROW3 -~-->" 
		+"			 </TABLE>" 
		+"			 <!--~ END TABLE3 ~-->" 
		+"		</TD>" 
		+"  </TR>" 
		+"  <!--~- END ROW2 -~-->" 
		+"  </TABLE>" 
		+"  <!--~ END TABLE2 ~-->" 
		+"  </TD>" 
		+"</TR>" 
		+"<!--~- END ROW1 -~-->" 
		+"<!--~--- ROW4 ---~-->" 
		+"<TR>" 
		+"    <TD height=\"6\"><IMG src=\"../images/window_general_them_bottom.jpg\" width=\"100%\" height=\"6\"></TD>" 
		+"</TR>" 
		+"<!--~- END ROW4 -~-->" 
		+"</TABLE>" ;
	document.write(sHTML);
}
function CWCMDialogHead(){

//Define Methods
	this.draw	= CWCMDialogHead_draw;
	
}

function importScriptSrc(_src){
	document.write("<script src=\""+_src+"\"><\/script>");
}

function goforHelp(){
	
	var sUrl;
	sUrl = window.location.href;
	var oTRSAction = new CTRSAction("../help/wcmhelp_list.jsp");
	oTRSAction.setParameter("JspUrl", sUrl);
	oTRSAction.doOpenWinAction(800, 700);
}

var WCMDialogHead = new CWCMDialogHead();
try{
	CTRSAction;
	}catch(ex){
		importScriptSrc("../js/CTRSHashtable.js");
		importScriptSrc("../js/CTRSRequestParam.js");
		importScriptSrc("../js/CTRSAction.js");	
	}