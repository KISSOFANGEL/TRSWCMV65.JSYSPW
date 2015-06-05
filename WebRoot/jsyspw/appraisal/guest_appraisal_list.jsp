<%@ page contentType="text/html;charset=UTF-8" pageEncoding="GBK"
	errorPage="../include/error.jsp"%>
<!------- WCM IMPORTS BEGIN ------------>
<%@ page import="com.trs.jsyspw.Appraisal" %>
<%@ page import="com.trs.jsyspw.Appraisals" %>
<%@ page import="com.trs.infra.persistent.WCMFilter"%>
<%@ page import="com.trs.infra.util.CMyString"%>
<%@ page import="com.trs.infra.util.CPager"%>
<%@ page import="com.trs.presentation.util.PageHelper"%>
<%@ page import="com.trs.presentation.util.PageViewUtil"%>
<%@include file="../include/public_server_nologin.jsp"%>
<%
//4.��ʼ������ȡ���ݣ�
	
//5.Ȩ��У��

//6.ҵ�����
	String sSelectFields = "PRODUCTIONNAME,PRODUCTIONAUTHOR,PRODUCTIONTYPE,OWNER,PRODUCTDATE,AGENT,AGENTTEL,PICURL,CRTIME";
	WCMFilter filter = new WCMFilter("", currRequestHelper.getWhereSQL(),
	currRequestHelper.getOrderSQL(), sSelectFields);
	
	/**
	  *TODO ��Ϊ���·�ʽ
	  *IChannelService currChannelService = (IChannelService)DreamFactory.createObjectById("IChannelService");
	  *Appraisals currAppraisals = currChannelService.getAppraisals(currChannel, filter);
	**/
	Appraisals currAppraisals = Appraisals.openWCMObjs(loginUser, filter);

	CPager currPager = new CPager(currRequestHelper.getInt("PageItemCount", 10));
	currPager.setItemCount( currAppraisals.size() );	
	currPager.setCurrentPageIndex( currRequestHelper.getInt("PageIndex", 1) );
 
//7.����
	out.clear();
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>ϵͳ��Ϣ</title>
      <link rel="stylesheet" href="../style/amazeui/css/amazeui.min.css"/>
 	 <link rel="stylesheet" href="../style/amazeui/assets/css/admin.css">
 	 <link rel="stylesheet" href="../style/jquery.paginate.css">
     <script src="../js/jquery-1.9.1.min.js"></script>
     <script src="../js/jquery.paginate.js"></script>
     </head>
  <body>
  <div class="am-cf am-padding">
      <div class="am-fl am-cf"><strong class="am-text-primary am-text-lg">�ҵ�����Ʒ</strong> / <small>Collection</small></div>
    </div>

    <div class="am-g">
      <div class="am-u-md-6 am-cf">
        <div class="am-fl am-cf">
          <div class="am-btn-toolbar am-fl">
            <div class="am-btn-group am-btn-group-xs">
            </div>        
          </div>
        </div>
      </div>
      <div class="am-u-md-3 am-cf">
        <div class="am-fr">
          <!-- div class="am-input-group am-input-group-sm">
            <input type="text" class="am-form-field">
                <span class="am-input-group-btn">
                  <button class="am-btn am-btn-default" type="button">����</button>
                </span>
          </div-->
        </div>
      </div>
    </div>
    <div class="am-g">
      <div class="am-u-sm-12">
          <table class="am-table am-table-striped am-table-hover table-main" id="htmlcon">
        <tr><th>����Ʒ����ͼ</th><th>����Ʒ����</th><th>����</th><th>����Ʒʱ��</th><th>�ͼ�ʱ��</th></tr>
       <% Appraisal currAppraisal = null;
			for(int i=currPager.getFirstItemIndex(); i<=currPager.getLastItemIndex(); i++)
			{//begin for
				try{
					currAppraisal = (Appraisal)currAppraisals.getAt(i-1);
				} catch(Exception ex){
					throw new WCMException("��ȡ��["+i+"]ƪAppraisalʧ�ܣ�", ex);
				}
				if(currAppraisal == null){
					throw new WCMException("û���ҵ���["+i+"]ƪAppraisal��");
				}

				try{
		%>
					<tr>
						<td><img width="80" height="80" src="/<%=PageViewUtil.toHtml(currAppraisal.getPicurl())%>"/></td>
						<td><%=PageViewUtil.toHtml(currAppraisal.getProductionname())%></td>
						<td><%=PageViewUtil.toHtml(currAppraisal.getProductionauthor())%></td>
						<td><%=PageViewUtil.toHtml(currAppraisal.getProductDate())%></td>
						<td><%=PageViewUtil.toHtml(currAppraisal.getCrTime(), "yyyy-MM-dd HH:mm:ss")%></td>
						</tr>
		<%
				} catch(Exception ex){
					throw new WCMException("��ȡ��["+i+"]ƪAppraisal������ʧ�ܣ�", ex);
				}
			}//end for	
		%>
        </table>
          <div class="am-cf">
<span id="totalcounts"></span>
  <div class="am-fr"  id="pagination" >
  
  </div>
</div>
          
   
      </div>

    </div>
 


  </body>
  <script>
  $(function(){
	
	$("#pagination").paginate({
		count 		: <%=currPager.getItemCount()%>,
		start 		: 1,
		display     :<%=currPager.getPageSize()%>,
		border					: false,
		text_color  			: '#79B5E3',
		background_color    	: 'none',	
		text_hover_color  		: '#2573AF',
		background_hover_color	: 'none', 
		images		: false,
		onChange: function (page) {
			loadcont(page);
        },
		mouse		: 'press'
	});

});
  </script>
</html>
    