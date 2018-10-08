<?php

$styles_ext  .= '<link href="'.$htmladmin.'/css/elfinder/main.min.css" rel="stylesheet">';
$styles_ext  .= '<link href="'.$htmladmin.'/css/elfinder/theme.css" rel="stylesheet">';
$scripts_ext .= '<script src="'.$htmladmin.'/js/elfinder/elfinder.min.js"></script>';

$page_contents = '<div id="elfinder"></div>';

$temp_photo = (isset($_GET['NetZone']) && $_GET['NetZone']) ? sanitize_one($_GET['NetZone'], 'sqlsafe') : '';
$ck_call    = (isset($_GET['CKEditorFuncNum'])) ? sanitize_one($_GET['CKEditorFuncNum'], 'sqlsafe') : '';

if($temp_photo || $ck_call || $ck_call == '0')
{
	$template = "templates/fullwidth.html";
}

$scripts_onload = <<< JS
$(document).ready(function(){
	var elf = $('#elfinder').elfinder({
		url:'requests/service/connector',
		height:550,
		resizable:false,
		validName:'/^[^\s]$/',
		getFileCallback:function(imgData, file)
		{
			
			var url = imgData.url;

			var photoCall = '{$temp_photo}',
			    ckCall    = '{$ck_call}';
			
			if(photoCall)
			{
				var setValOf = window.opener.document.getElementById(photoCall);

				if(typeof setValOf != 'undefined')
				{
					setValOf.value = url;

					// console.log(set-parent);

					var jSetValOf = window.opener.$(setValOf);

					jSetValOf.parent('div.set-bg').removeClass('n').css('background-image', 'url('+url+')');
					

					if(typeof window.opener.setNewPhoto === 'function')
					{
						window.opener.setNewPhoto();
					}
					window.close();
				}
			}

			if(window.opener.CKEDITOR)
			{
							
				if(ckCall)
				{
					window.opener.CKEDITOR.tools.callFunction(ckCall, url);
	                window.close();
                }
			}

		},
	}).elfinder('instance');
});

JS;

?>