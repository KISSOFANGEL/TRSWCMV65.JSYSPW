<% response.setContentType("image/gif");%><%@ page import="com.trs.infra.support.file.FilesMan" %><%@ page import="com.trs.infra.util.CMyFile" %><%@ page import="com.trs.infra.common.WCMException" %><%@ page import="com.trs.infra.util.ExceptionNumber" %><%@ page import="com.trs.presentation.util.LoginHelper" %><%@ page import="com.trs.presentation.util.RequestHelper" %><%@ page import="com.trs.cms.auth.persistent.User" %><%@ page import="com.trs.cms.ContextHelper" %><%
	LoginHelper currLoginHelper = new LoginHelper(request, application);
	if(!currLoginHelper.checkLogin()){
		throw new WCMException(ExceptionNumber.ERR_USER_NOTLOGIN, "�û�δ��¼���¼��ʱ��");
	}

//3.������ȡ
	RequestHelper currRequestHelper = new RequestHelper(request, response, application);
	currRequestHelper.doValid();

	String sFileName = currRequestHelper.getString("FileName");
	if(sFileName == null || sFileName.trim().length()==0)
		throw new WCMException(ExceptionNumber.ERR_PARAM_INVALID, "�����ļ���Ϊ�գ�");		
	

//5.Ȩ��У��
	//TODO
//6.ҵ�����
	//String sFilePath = "";
	//String sSrcFile	 = "";
	try{
		java.io.File f = new java.io.File(sFileName);
		if(f.exists()){
			sFileName = f.getAbsolutePath();
		}else{
			FilesMan currFilesMan = FilesMan.getFilesMan();
			sFileName = currFilesMan.mapFilePath(sFileName, FilesMan.PATH_LOCAL) + sFileName;
		}
	}catch(Exception ex){
		
	}
	
//8.���
	response.reset();//wenyh@2007-07-23 reset the reponse first.
	response.setContentType("image/gif");
	response.setHeader("Content-Disposition", "filename=\"" + CMyFile.extractFileName(sFileName) + "\"");
	
	
	// ��ָ���ļ�������Ϣ 
	java.io.FileInputStream fileInputStream = null; 
	java.io.OutputStream os = null;
	try{
		fileInputStream = new java.io.FileInputStream( sFileName );
		// д������Ϣ 
		byte buffer[] = new byte[65000];
		int i; 
		os = response.getOutputStream();
		while( (i=fileInputStream.read(buffer, 0, 65000))>0 ) { 
			os.write(buffer, 0, i);
		} 
		os.flush();
	}catch(Exception ex){
		throw new WCMException(ExceptionNumber.ERR_WCMEXCEPTION, "д�ļ�ʧ��", ex);
	}finally{
		if(fileInputStream!=null){
			try{
				fileInputStream.close(); 
				fileInputStream = null;
			}catch(Exception e){
				//Ignore.
			}
		}
		if(os != null){
			try{
				os.close();
				os = null;
			}catch(Exception e){
				//Ignore.
			}
		}
		//wenyh@2007-08-23 17:30 ȥ��out.clear(),����Ҫ
		//out.clear();
	}
%>