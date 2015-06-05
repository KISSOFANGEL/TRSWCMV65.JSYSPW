<%@ page contentType="text/html;charset=UTF-8" pageEncoding="GBK"%>
<%@page import="com.jspsmart.upload.File"%>
<%@page import="com.trs.infra.support.file.FilesMan"%>
<%@page import="com.jspsmart.upload.SmartUpload"%>

<!--- 页面状态设定、登录校验、参数获取，都放在public_server.jsp中 --->
<%@include file="../include/public_server_nologin.jsp"%>
<%   
	String fileName =null ;
	String sSaveFile="";
	
	
    //新建一个SmartUpload对象   
    SmartUpload su = new SmartUpload();   
  
    //上传初始化   
    su.initialize(pageContext);   
  
    // 设定上传限制   
    //1.限制每个上传文件的最大长度。   
    su.setMaxFileSize(10000000);   
  
    //2.限制总上传数据的长度。   
    su.setTotalMaxFileSize(20000000);    
  
    //3.设定允许上传的文件（通过扩展名限制）,仅允许doc,txt文件。   
    //su.setAllowedFilesList("doc,txt,xls,docx,jpg,rar,mid,waw,mp3,gif,xml");   
    su.setAllowedFilesList("png,jpg,gif");   
       
    boolean sign = true;   
    //4.设定禁止上传的文件（通过扩展名限制）,禁止上传带有exe,bat,jsp,htm,html扩展名的文件和没有扩展名的文件。   
    try {   
        su.setDeniedFilesList("exe,bat,jsp,htm,html,php");   
        
        //上传文件   
        su.upload();   
        //将上传文件保存到syetemtemp目录   
        FilesMan	aFilesMan	= FilesMan.getFilesMan();
        String stempPath = aFilesMan.getPathConfigValue(FilesMan.FLAG_SYSTEMTEMP, FilesMan.PATH_LOCAL);     
        su.save(stempPath);  
       
        File file = su.getFiles().getFile(0);
        if (file==null||file.isMissing()) return;
    	// 将文件另存到pub目录
    	sSaveFile = aFilesMan.getNextFilePathName(FilesMan.FLAG_WEBFILE , file.getFileExt());
    	file.saveAs(sSaveFile);

    } catch (Exception e) {
    	e.printStackTrace();
    	
        out.println("上传失败（请检查文件大小和类型）！");
        sign = false;  
    }  
    
    if(sign==true)  
    {   
	int uploadIndex = (sSaveFile).indexOf("webpic"); 
	String imgpath = sSaveFile.substring(uploadIndex,sSaveFile.length());
	imgpath = imgpath.replace("\\", "/");
	fileName = imgpath;
 	StringBuffer meg = new StringBuffer();
 	//meg.append("<form name='uploadform' method='post' action='pic_upload_dowith.jsp' ENCTYPE='multipart/form-data'><table border='0' align='left' cellpadding='0' cellspacing='0'><tr class='firsttr'><td class='wid250'>");
 	meg.append("<div id='container'><div style='height:40px;width:40px;float:left;margin-left: 90px;' class='main_box user_style1' data-hipop='one-horizontal'><img src='/"+imgpath+"'width='100' height='100' /><a href='#' onclick='delLogo()' class='popup'></a> </div></div>");
	//meg.append("</td><td class='wid80'><a href='#'>浏览... <input type='file' id='uplfile' name='MyFile' /></a></td><td class='wid100'><input name='upload' type='button' value='开始上传' onclick='submitform()' style='cursor:pointer;  border-top:#afc4ce 1px solid;border-left:#afc4ce 1px solid;border-right:#d8e2e4 1px solid;border-bottom:#d8e2e4 1px solid; width:80px; height:27px; line-height:27px;' /></td></tr></table></form>");
	out.println(meg);
    } 
   session.setAttribute("picurl",fileName);
%>
	<link rel="stylesheet" href="../images/zalki_hover_img.css" type="text/css" media="screen" >
	  <script language="JavaScript" src="../js/jquery-1.9.1.min.js"></script>
	  <script language="JavaScript" src="../js/jquery.easing.1.3.js"></script>
	  <script src="../js/jquery.zalki_hover_img.min-0.2.js" type="text/javascript"></script>
	
<script type="text/javascript">

$(window).load(function(){
$('.main_box').ZalkiHoverImg();
});

</script>
<script type="text/javascript">
function cancel(){
	
	window.close();
}
function delLogo(){
$("#container").empty();
$("#container").load("pic_upload.jsp");
}
</script>