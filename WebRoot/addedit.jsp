<%@page import="com.trs.infra.common.WCMException"%>
<%@page import="com.trs.components.wcm.content.persistent.Channel"%>
<%@page import="com.trs.infra.persistent.WCMFilter"%>
<%@page import="com.trs.components.wcm.content.persistent.Channels"%>
<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%
Channels chnls = Channels.openWCMObjs(null, new WCMFilter("","parentid=0 and ",""));


%>

<%!
public void tree(Channel chnl) throws WCMException{
System.out.println(chnl.getDesc());
Channels chnls = (Channels)chnl.getAllChildren(null);
for(int i = 0;i<chnls.size();i++){
tree((Channel)chnls.getAt(i));
}
}
%>