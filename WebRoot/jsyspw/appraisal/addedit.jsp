<%@ page contentType="text/html;charset=UTF-8" pageEncoding="GBK"%>
<html>
  <head>
    
    <title>提交艺术品鉴定申请</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<link type="text/css" rel="stylesheet" href="./images/trs_web_style.css" />
<link type="text/css" rel="stylesheet" href="./images/yyjd_20150528.css" />
<%@include file="../include/public_client_addedit_nologin.jsp"%>
  </head>
 <SCRIPT LANGUAGE="JavaScript">
function submitForm(){
	var frmData = document.frmData;
	WCMAction.doPost(frmData, document.frmAction);	
}
function resetForm(){
	var frm = document.all("frmData");
	frm.reset();
}
</SCRIPT>
  <body>
<FORM NAME="frmAction" ID="frmAction" METHOD=POST
	ACTION="./appraisal_addedit_dowith.jsp" style="margin-top:0">
<INPUT TYPE="hidden" NAME="ObjectXML" Value=""></FORM>

<FORM NAME="frmData" ID="frmData" class="addform">
<div class="top">
  <img src="images/yyjd01_20150528.jpg" width="1044" height="53" />
</div>
<div class="main">
  <div class="main_title"><img src="images/yyjd02_20150528.jpg" width="430" height="79" /></div>
    <div class="main_con">
     <div class="main_con_top"><img src="images/yyjd03_20150528.jpg" width="989" height="17" /></div>
     <div class="mian_con_con">
        <div class="works"><p>请填写作品信息</p></div>
        <div class="menu1 mt20">
          <div class="name"><span class="red">*</span>上传图片：</div>
          <div class="upbtn">    <iframe src="pic_upload.jsp"frameborder="0" style=" border: 0;float: left;background-color: #FFFFFF;text-align: center;"  width="400" height="120" scrolling="no" ></iframe>
          </div>
          <!-- <div class="browse"><p>浏览...</p></div> -->
        </div>
        <div class="menu2">
          <p><span class="red">*</span><span class="span">作品名称：</span><input type="text" class="apply_company" name="Productionname" datatype="s1-30" erromsg="名称长度请控制在1-30个字！"nullmsg="请填写作品名称！" ></p>
        </div>
        <div class="menu2 ">
          <p><span class="span">作品作者：</span><input type="text" class="apply_company" name="Productionauthor"datatype="s2-16" erromsg="作者长度请控制在2-16个字！"nullmsg="请填写艺术品作者！" ignore="ignore"  ></p>
        </div>
        <div class="menu2 ">
          <p><span class="span">作品日期：</span><input type="text" class="apply_company" name="ProductDate"datatype="s2-16" erromsg="作品日期长度请控制在2-16个字！"nullmsg="请填写作品日期！" ignore="ignore" ></p>
        </div>
        <div class="menu2">
          <p><span class="span">作品类型：</span>
          <select id="t_doDeptName" class="apply_company_xz1" name="Productiontype">
             <option value="TYPE1">书法1</option>
             <option  value="TYPE2">书法2</option>
             <option  value="TYPE3">书法3</option>
             <option value="TYPE4">书法3</option>
             <option value="TYPE5">书法3</option>
		  </select></p>
        </div>
        <div class="menu2">
          <p><span class="red">*</span><span class="span">所有人姓名：</span><input type="text" class="apply_company" name="owner" datatype="s2-16" erromsg="名字长度请控制在2-16个字！"nullmsg="请填写所有者！" ></p>
        </div>
        <div class="menu2">
          <p><span class="red">*</span><span class="span">送鉴人：</span><input type="text" class="apply_company" name="Agent"datatype="s2-16" erromsg="名字长度请控制在2-16个字！"nullmsg="请填写送鉴人！" ></p>
        </div>
        <div class="menu2">
          <p><span class="red">*</span><span class="span">送鉴人电话：</span><input type="text" class="apply_company" name="Agenttel"datatype="s2-16" erromsg="字符长度请控制在2-16个字！"nullmsg="请填写送鉴人电话！" ></p>
        </div>
        <div class="menu2">
          <p><span class="span">艺术品简介：</span><textarea rows="6"  cols="6" class="textarea" name="Introductio" datatype="s2-200" erromsg="字符长度请控制在2-200个字！"nullmsg="请填写艺术品简介！" ignore="ignore" ></textarea></p>
        </div>
        <div class="menu2">
          <p><span class="span">备注：</span><textarea rows="6"cols="6"  class="textarea" name="Remarks"></textarea></p>
        </div>
        <div class="menu3">
           <ul>
          <li>
            <button id="subm" class="coolbg"></button>
          </li>
          <li>
            <input type="reset"   onclick="resetForm()" value="重新填写" class="reset">
          </li>
        </ul>
        </div> 
        <div class="clear"></div>
     </div>
     <div class="mian_con_bottom"><img src="images/yyjd04_20150528.jpg" width="989" height="20" /></div>
    </div> 
</div>
</FORM>
<div class="footer">
  <img src="images/yyjd08_20150528.jpg" width="1010" height="14" />
  <p>江苏省艺术品行业协会 主办 访问统计：<span>2233434</span> 次</p>
  <p>地址：南京市龙蟠里9号 邮编：210029 联系电话：025-87798779 Email:jswhxx@yahoo.cn</p>
  <p>技术支持：北京拓尔思信息技术股份有限公司 苏ICP备05016134</p>
</div>
  </body>
  <script src="../js/jquery-1.9.1.min.js"></script>
  <script src="../js/Validform_v5.3.2.js" charset="UTF-8"></script>
  <script>
  $(function(){
 	$(".addform").Validform({
		tiptype:3,
		btnSubmit:"#subm",
		beforeSubmit:function(curform){
		//在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
		//这里明确return false的话表单将不会提交;	
	submitForm();
	return false;
		}
	});
  });
  </script>
</html>
