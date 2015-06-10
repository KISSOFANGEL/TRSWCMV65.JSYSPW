<%@ page language="java"  contentType="text/html;charset=UTF-8" pageEncoding="GBK"%>

<!DOCTYPE html>
<html>
<head>

    <!-- This file has been downloaded from Bootsnipp.com. Enjoy! -->
    <title>��¼ע��</title>
    	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="../style/bootstrap.min.css" rel="stylesheet">
    <link href="../style/validate.css" rel="stylesheet">
    <link href="../style/login.css" rel="stylesheet">
    <link href="../style/sweet-alert.css" rel="stylesheet">
    <script src="../js/jquery-1.9.1.min.js"></script>
    <script src="../js/bootstrap.min.js"></script>
    <script src="../js/Validform_v5.3.2.js"></script>
    <script src="../js/sweet-alert.js"></script>
<%@include file="../include/public_client_addedit_nologin.jsp"%>
  </head>
 <SCRIPT LANGUAGE="JavaScript">
function submitForm(){
	save();
	var frmData = document.frmData;
	WCMAction.doPost(frmData, document.frmAction);	
}
function resetForm(){
	var frm = document.all("frmData");
	frm.reset();
}
function erralert(){
    swal({
     title: "�û������������",
      text: "�û������������",
      type: "Warning",
      showCancelButton: true,
      confirmButtonClass: 'btn-primary',
      confirmButtonText: 'Primary!'
    });
  }
function save() { 
	if ($("#remember").prop("checked")) { 
			var username = $("#username").val(); 
			var password = $("#password").val(); 
			$.cookie("rmbUser", "true", { expires: 7 }); //�洢һ����7�����޵�cookie 
			$.cookie("username", username, { expires: 7 }); 
			$.cookie("password", password, { expires: 7 }); 
		}else{ 
			$.cookie("rmbUser", "false", { expire: -1 }); 
			$.cookie("username", "", { expires: -1 }); 
			$.cookie("password", "", { expires: -1 }); 
		} 
}
</SCRIPT>
<body>
<FORM NAME="frmAction" ID="frmAction" METHOD=POST
	ACTION="../yuser/yuser_addedit_dowith.jsp" style="margin-top:0">
<INPUT TYPE="hidden" NAME="ObjectXML" Value=""></FORM>

<div class="container">
    	<div class="row">
			<div class="col-md-6 col-md-offset-3">
				<div class="panel panel-login">
					<div class="panel-heading">
						<div class="row">
							<div class="col-xs-6">
								<a href="#" class="active" id="login-form-link">��¼</a>
							</div>
							<div class="col-xs-6">
								<a href="#" id="register-form-link">ע��</a>
							</div>
						</div>
						<hr>
					</div>
					<div class="panel-body">
						<div class="row">
							<div class="col-lg-12">
								<form id="login-form" method="post" role="form" nSubmit="return false;"  style="display: block;">
									<div class="form-group">
										<input type="text" name="username" id="loginusername" tabindex="1" class="form-control" placeholder="�û���" value="" datatype="s3-30" erromsg="�û����������3-30���֣�"nullmsg="����д�û�����">
									</div>
									<div class="form-group">
										<input type="password" name="password" id="loginpassword" tabindex="2" class="form-control" placeholder="����">
									</div>
									<div class="form-group text-center">
										<input type="checkbox" tabindex="3" class="" name="remember" id="remember">
										<label for="remember">��ס����</label>
									</div>
									<div class="form-group">
										<div class="row">
											<div class="col-sm-6 col-sm-offset-3">
												<input type="button" name="login-submit" id="login-submit" tabindex="4" class="form-control btn btn-login" value="��¼">
											</div>
										</div>
									</div>
									<div class="form-group">
										<div class="row">
											<div class="col-lg-12">
												<div class="text-center">
<!-- 													<a href="http://phpoll.com/recover" tabindex="5" class="forgot-password">Forgot Password?</a>
 -->												</div>
											</div>
										</div>
									</div>
								</form>
								<form id="register-form" name="frmData" method="post" role="form" style="display: none;">
									<div class="form-group">
										<input type="text" name="username" id="username" tabindex="1" class="form-control" placeholder="�û���" value="" datatype="s3-30" erromsg="�û����������3-30���֣�"nullmsg="����д�û�����"ajaxurl="validateusername.jsp">
									</div>
<!-- 									<div class="form-group">
										<input type="email" name="email" id="email" tabindex="1" class="form-control" placeholder="Email Address" value="">
									</div> -->
									<div class="form-group">
										<input type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="����" datatype="*6-16" nullmsg="���������룡" errormsg="���뷶Χ��6~16λ֮�䣡">
									</div>
									<div class="form-group">
										<input type="password" id="confirm-password" tabindex="2" class="form-control" placeholder="���ٴ���������" datatype="*" recheck="password" nullmsg="��������һ�����룡" errormsg="������������˺����벻һ�£�">
									</div>
									<div class="form-group">
										<div class="row">
											<div class="col-sm-6 col-sm-offset-3">
												<input type="button" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-register" value="����ע��">
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
<script type="text/javascript">
$(function() {

    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

});

</script>
  <script>
  $(function(){

	  
 	$("#register-form").Validform({
		tiptype:3,
		btnSubmit:"#register-submit",
		beforeSubmit:function(curform){
		//����֤�ɹ��󣬱��ύǰִ�еĺ�����curform�����ǵ�ǰ������
		//������ȷreturn false�Ļ����������ύ;	
	submitForm();
	return false;
		}
	});
 	$("#login-form").Validform({
		tiptype:3,
		btnSubmit:"#login-submit",
		callback:function(form){
			var check=true;
			if(check){
				$.ajax({
					type:"post",
					asnyc:false,
					url:"login_dowith.jsp",
					dataType:"json",
					data:"username="+$("#loginusername").val()+"&password="+$("#loginpassword").val(),
					success:function(data){
					if(data.status==1){
					location.href="../appraisal/guest_appraisal_list.jsp";
					//erralert();
					}
					else{alert("�û������������");}
					}
				});
			}
			
			return false;
		}
/* 		callback:function(form){
			$.ajax({
				type:"post",
				url:"login_dowith.jsp",
				dataType:"json",
				data:"username="+$("#loginusername").val()+"&password="+$("#loginpassword").val(),
				success:function(data){
				if(data.status==1){
				location.href="../appraisal/guest_appraisal_list.jsp";
				//erralert();
				}
				else{alert("�û������������");}
				}
			});
		} */
		
	
		
	});
 	
	  //ӛס�ܴa
	  if ($.cookie("rmbUser") == "true") {
	        $("#remember").attr("checked", true);
	        $("#loginusername").val($.cookie("username"));
	        $("#loginpassword").val($.cookie("password"));
	        }
  });
  
  
  </script>
</body>
</html>
