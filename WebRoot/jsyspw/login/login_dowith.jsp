<%@page import="com.trs.jsyspw.YUser"%>
<%@page import="org.json.JSONObject"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.Map"%>
<%@page import="com.trs.jsyspw.YUsers"%>
<%@page import="com.trs.infra.persistent.WCMFilter"%>
<%@ page language="java"  contentType="text/html;charset=UTF-8" pageEncoding="GBK"%>
<%
String username = request.getParameter("username"); 
String password = request.getParameter("password");
try {
	if(username==null||"".equals(username))return;
	if(password==null||"".equals(password))return;
	WCMFilter wf = new WCMFilter("", "username='" + username + "' and password='"+password+"'", "",
			"username");
	YUsers yusers = YUsers.openWCMObjs(null, wf);
	JSONObject jo = new JSONObject();
	if (yusers.size() == 0){
		jo.put("status", "0");
		jo.put("message", "用户名或密码不正确！");
	}
	else {
		YUser yuser = (YUser)yusers.getAt(0);
		session.setAttribute("currloginyuser",yuser);
		jo.put("status", "1");
		jo.put("message", "登录成功！");
	}
	out.print(jo.toString());
} catch (Exception e) {
	e.printStackTrace();
}

%>
