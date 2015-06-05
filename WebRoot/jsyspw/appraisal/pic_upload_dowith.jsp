<%@ page contentType="text/html;charset=UTF-8" pageEncoding="GBK"%>
<%@page import="com.jspsmart.upload.File"%>
<%@page import="com.trs.infra.support.file.FilesMan"%>
<%@page import="com.jspsmart.upload.SmartUpload"%>

<!--- ҳ��״̬�趨����¼У�顢������ȡ��������public_server.jsp�� --->
<%@include file="../include/public_server_nologin.jsp"%>
<%   
	String fileName =null ;
	String sSaveFile="";
	
	
    //�½�һ��SmartUpload����   
    SmartUpload su = new SmartUpload();   
  
    //�ϴ���ʼ��   
    su.initialize(pageContext);   
  
    // �趨�ϴ�����   
    //1.����ÿ���ϴ��ļ�����󳤶ȡ�   
    su.setMaxFileSize(10000000);   
  
    //2.�������ϴ����ݵĳ��ȡ�   
    su.setTotalMaxFileSize(20000000);    
  
    //3.�趨�����ϴ����ļ���ͨ����չ�����ƣ�,������doc,txt�ļ���   
    //su.setAllowedFilesList("doc,txt,xls,docx,jpg,rar,mid,waw,mp3,gif,xml");   
    su.setAllowedFilesList("png,jpg,gif");   
       
    boolean sign = true;   
    //4.�趨��ֹ�ϴ����ļ���ͨ����չ�����ƣ�,��ֹ�ϴ�����exe,bat,jsp,htm,html��չ�����ļ���û����չ�����ļ���   
    try {   
        su.setDeniedFilesList("exe,bat,jsp,htm,html,php");   
        
        //�ϴ��ļ�   
        su.upload();   
        //���ϴ��ļ����浽syetemtempĿ¼   
        FilesMan	aFilesMan	= FilesMan.getFilesMan();
        String stempPath = aFilesMan.getPathConfigValue(FilesMan.FLAG_SYSTEMTEMP, FilesMan.PATH_LOCAL);     
        su.save(stempPath);  
       
        File file = su.getFiles().getFile(0);
        if (file==null||file.isMissing()) return;
    	// ���ļ���浽pubĿ¼
    	sSaveFile = aFilesMan.getNextFilePathName(FilesMan.FLAG_WEBFILE , file.getFileExt());
    	file.saveAs(sSaveFile);

    } catch (Exception e) {
    	e.printStackTrace();
    	
        out.println("�ϴ�ʧ�ܣ������ļ���С�����ͣ���");
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
	//meg.append("</td><td class='wid80'><a href='#'>���... <input type='file' id='uplfile' name='MyFile' /></a></td><td class='wid100'><input name='upload' type='button' value='��ʼ�ϴ�' onclick='submitform()' style='cursor:pointer;  border-top:#afc4ce 1px solid;border-left:#afc4ce 1px solid;border-right:#d8e2e4 1px solid;border-bottom:#d8e2e4 1px solid; width:80px; height:27px; line-height:27px;' /></td></tr></table></form>");
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