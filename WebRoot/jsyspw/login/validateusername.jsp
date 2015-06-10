<%@page import="org.json.JSONObject"%>
<%@page import="org.json.JSONArray"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.Map"%>
<%@page import="com.trs.jsyspw.YUsers"%>
<%@page import="com.trs.infra.persistent.WCMFilter"%>
<%@ page language="java"  contentType="text/html;charset=UTF-8" pageEncoding="GBK"%>
<%
try {
	String username = request.getParameter("param");
	if(username==null||"".equals(username))return;
	WCMFilter wf = new WCMFilter("", "username='" + username + "'", "",
			"count(1) cnt");
	YUsers yusers = YUsers.openWCMObjs(null, wf);
	  JSONObject jo = new JSONObject();
	String result = yusers.size() == 0 ? "用户名可以使用" : "用户名已被占用！";
	jo.put("info", result);
	if (yusers.size() == 0)
		jo.put("status", "y");
	else {
		jo.put("status", "n");
	}
	out.print(jo.toString());
} catch (Exception e) {
	e.printStackTrace();
}


%>
