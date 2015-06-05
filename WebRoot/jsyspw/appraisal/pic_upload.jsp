
<%@ page contentType="text/html;charset=UTF-8" pageEncoding="GBK"
	errorPage="../include/error.jsp"%>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html>
<head>


<title>My JSP 'upload.jsp' starting page</title>

<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
			<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
				<meta http-equiv="description" content="This is my page">

					<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
					<link rel="stylesheet" href="../images/zalki_hover_img.css"
						type="text/css" media="screen">
						<script language="JavaScript" src="../js/jquery-1.9.1.min.js"></script>
						<script language="JavaScript" src="../js/jquery.easing.1.3.js"></script>
						<script src="../js/jquery.zalki_hover_img.min-0.2.js"
							type="text/javascript"></script>
						<script type="text/javascript">
							$(window).load(function() {
								$('.main_box').ZalkiHoverImg();
							});
						</script>
						<script type="text/javascript">
							function submitform() {
								var val = $("#uplfile").val();

								if (val != null && val != "") {
									$("[name='uploadform']").submit();

								} else {
									alert("请选择文件");
								}
							}
							function cancel() {

								window.close();
							}
						</script>
</head>



<style>
a {
	text-decoration: none;
	text-align: center;
	line-height: 40px;
	font-weight: bold;
	display: inline-block;
	background: #a1532d;
	position: relative;
	overflow: hidden;
	cursor: pointer;
	color: white;
	width: 78px;
	height: 40px;
}

a:hover {
	cursor: pointer;
}

a input {
	position: absolute;
	right: 0;
	top: 0;
	font-size: 100px;
	opacity: 0;
	filter: alpha(opacity =     0);
}

.picture {
	width: 98px;
	height: 98px;
	border: 1px solid #d4d4d4;
	position: absolute;
	left: 97px;
	top: 0px;
}
.firsttr{height:90px;}
.wid250{width:200px;}
.wid80{width:80px;vertical-align: bottom;}
.wid100{width:100;vertical-align: bottom;}
</style>
<body>

		<form name="uploadform" method="post" action="pic_upload_dowith.jsp"
			enctype="multipart/form-data">
			<table border="0" align="left" cellpadding="0" cellspacing="0">
				<tr class="firsttr">
				
					<td class="wid250"><div class="picture"></div>
					</td>
					<td class="wid80"><a href="#">浏览... <input type="file"
							id="uplfile" name="file" /> </a>
					</td>
					<td class="wid100" ><input name="upload"
						type="button" value="开始上传" onclick="submitform()"
						style="cursor:pointer;  border-top:#afc4ce 1px solid;border-left:#afc4ce 1px solid;border-right:#d8e2e4 1px solid;border-bottom:#d8e2e4 1px solid; width:80px; height:27px; line-height:27px;" />
					</td>
				</tr>
			</table>
		</form>
	
</body>
</html>
