package com.trs.jsyspw.login;

import java.util.HashMap;
import java.util.Map;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.Action;
import com.trs.infra.common.WCMException;
import com.trs.infra.persistent.WCMFilter;
import com.trs.jsyspw.YUsers;

public class LoginActtion {
	private Logger log = Logger.getLogger(LoginActtion.class);
	private String param;
	private String username;
	private String password;

	private Map responsejson;
	
	public String validateUserName() {
		try {
			WCMFilter wf = new WCMFilter("", "username='" + param + "'", "",
					"count(1) cnt");
			YUsers yusers = YUsers.openWCMObjs(null, wf);
			Map<String, String> map = new HashMap<String, String>();
			String result = yusers.size() == 0 ? "用户名可以使用" : "用户名已被占用！";
			map.put("info", result);
			if (yusers.size() == 0)
				map.put("status", "y");
			else {
				map.put("status", "n");
			}
			this.setResponsejson(map);
			return Action.SUCCESS;
		} catch (WCMException e) {
			log.error("打开YUSERS集合失败");
			e.printStackTrace();
			return Action.ERROR;
		}

	}
	public String loginDowith() {
		try {
			if(username==null||"".equals(username)){log.error("用户名不能为空");return Action.ERROR;}
			if(password==null||"".equals(password)){log.error("密码不允许为空");return Action.ERROR;}
			WCMFilter wf = new WCMFilter("", "username='" + username + "' and password='"+password+"'", "",
					"username");
			YUsers yusers = YUsers.openWCMObjs(null, wf);
			Map<String, String> map = new HashMap<String, String>();
			if (yusers.size() == 0){
				map.put("status", "0");
				map.put("message", "用户名或密码不正确！");
			}
			else {
				Map<String, Object> session = ServletActionContext.getContext().getSession();
				session.put("currusername",username );
				map.put("status", "1");
				map.put("message", "登录成功！");
			}
			this.setResponsejson(map);
			return Action.SUCCESS;
		} catch (WCMException e) {
			log.error("打开YUSERS集合失败");
			e.printStackTrace();
			return Action.ERROR;
		}
		
	}

	public Map getResponsejson() {
		return responsejson;
	}

	public void setResponsejson(Map responsejson) {
		this.responsejson = responsejson;
	}

	public String getParam() {
		return param;
	}

	public void setParam(String param) {
		this.param = param;
	}

	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}
