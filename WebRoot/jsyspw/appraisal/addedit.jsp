<%@ page contentType="text/html;charset=UTF-8" pageEncoding="GBK"%>
<html>
  <head>
    
    <title>�ύ����Ʒ��������</title>
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
        <div class="works"><p>����д��Ʒ��Ϣ</p></div>
        <div class="menu1 mt20">
          <div class="name"><span class="red">*</span>�ϴ�ͼƬ��</div>
          <div class="upbtn">    <iframe src="pic_upload.jsp"frameborder="0" style=" border: 0;float: left;background-color: #FFFFFF;text-align: center;"  width="400" height="120" scrolling="no" ></iframe>
          </div>
          <!-- <div class="browse"><p>���...</p></div> -->
        </div>
        <div class="menu2">
          <p><span class="red">*</span><span class="span">��Ʒ���ƣ�</span><input type="text" class="apply_company" name="Productionname" datatype="s1-30" erromsg="���Ƴ����������1-30���֣�"nullmsg="����д��Ʒ���ƣ�" ></p>
        </div>
        <div class="menu2 ">
          <p><span class="span">��Ʒ���ߣ�</span><input type="text" class="apply_company" name="Productionauthor"datatype="s2-16" erromsg="���߳����������2-16���֣�"nullmsg="����д����Ʒ���ߣ�" ignore="ignore"  ></p>
        </div>
        <div class="menu2 ">
          <p><span class="span">��Ʒ���ڣ�</span><input type="text" class="apply_company" name="ProductDate"datatype="s2-16" erromsg="��Ʒ���ڳ����������2-16���֣�"nullmsg="����д��Ʒ���ڣ�" ignore="ignore" ></p>
        </div>
        <div class="menu2">
          <p><span class="span">��Ʒ���ͣ�</span>
          <select id="t_doDeptName" class="apply_company_xz1" name="Productiontype">
             <option value="TYPE1">�鷨1</option>
             <option  value="TYPE2">�鷨2</option>
             <option  value="TYPE3">�鷨3</option>
             <option value="TYPE4">�鷨3</option>
             <option value="TYPE5">�鷨3</option>
		  </select></p>
        </div>
        <div class="menu2">
          <p><span class="red">*</span><span class="span">������������</span><input type="text" class="apply_company" name="owner" datatype="s2-16" erromsg="���ֳ����������2-16���֣�"nullmsg="����д�����ߣ�" ></p>
        </div>
        <div class="menu2">
          <p><span class="red">*</span><span class="span">�ͼ��ˣ�</span><input type="text" class="apply_company" name="Agent"datatype="s2-16" erromsg="���ֳ����������2-16���֣�"nullmsg="����д�ͼ��ˣ�" ></p>
        </div>
        <div class="menu2">
          <p><span class="red">*</span><span class="span">�ͼ��˵绰��</span><input type="text" class="apply_company" name="Agenttel"datatype="s2-16" erromsg="�ַ������������2-16���֣�"nullmsg="����д�ͼ��˵绰��" ></p>
        </div>
        <div class="menu2">
          <p><span class="span">����Ʒ��飺</span><textarea rows="6"  cols="6" class="textarea" name="Introductio" datatype="s2-200" erromsg="�ַ������������2-200���֣�"nullmsg="����д����Ʒ��飡" ignore="ignore" ></textarea></p>
        </div>
        <div class="menu2">
          <p><span class="span">��ע��</span><textarea rows="6"cols="6"  class="textarea" name="Remarks"></textarea></p>
        </div>
        <div class="menu3">
           <ul>
          <li>
            <button id="subm" class="coolbg"></button>
          </li>
          <li>
            <input type="reset"   onclick="resetForm()" value="������д" class="reset">
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
  <p>����ʡ����Ʒ��ҵЭ�� ���� ����ͳ�ƣ�<span>2233434</span> ��</p>
  <p>��ַ���Ͼ��������9�� �ʱࣺ210029 ��ϵ�绰��025-87798779 Email:jswhxx@yahoo.cn</p>
  <p>����֧�֣������ض�˼��Ϣ�����ɷ����޹�˾ ��ICP��05016134</p>
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
		//����֤�ɹ��󣬱��ύǰִ�еĺ�����curform�����ǵ�ǰ������
		//������ȷreturn false�Ļ����������ύ;	
	submitForm();
	return false;
		}
	});
  });
  </script>
</html>
