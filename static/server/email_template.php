<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        
        <!-- Facebook sharing information tags -->
        <meta property="og:title" content="<% subjectemail %>">
        
        <title><% subjectemail %></title>
		
	<style type="text/css">
		#outlook a{
			padding:0;
		}
		body{
			width:100% !important;
		}
		.ReadMsgBody{
			width:100%;
		}
		.ExternalClass{
			width:100%;
		}
		body{
			-webkit-text-size-adjust:none;
		}
		body{
			margin:0;
			padding:0;
		}
		img{
			border:0;
			height:auto;
			line-height:100%;
			outline:none;
			text-decoration:none;
		}
		table td{
			border-collapse:collapse;
		}
		#backgroundTable{
			height:100% !important;
			margin:0;
			padding:0;
			width:100% !important;
		}
	/*
	@tab Page
	@section background color
	@tip Set the background color for your email. You may want to choose one that matches your company's branding.
	@theme page
	*/
		body,#backgroundTable{
			/*@editable*/background-color:#fff;
		}
	/*
	@tab Page
	@section email border
	@tip Set the border for your email.
	*/
		#templateContainer{
			/*@editable*/border:1px solid #fff;
		}
	/*
	@tab Page
	@section heading 1
	@tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.
	@style heading 1
	*/
		h1,.h1{
			/*@editable*/color:#447C9D;
			display:block;
			/*@editable*/font-family:Arial;
			/*@editable*/font-size:34px;
			/*@editable*/font-weight:bold;
			/*@editable*/line-height:100%;
			margin-top:0;
			margin-right:0;
			margin-bottom:10px;
			margin-left:0;
			/*@editable*/text-align:left;
		}
	/*
	@tab Page
	@section heading 2
	@tip Set the styling for all second-level headings in your emails.
	@style heading 2
	*/
		h2,.h2{
			/*@editable*/color:#447C9D;
			display:block;
			/*@editable*/font-family:Arial;
			/*@editable*/font-size:30px;
			/*@editable*/font-weight:bold;
			/*@editable*/line-height:100%;
			margin-top:0;
			margin-right:0;
			margin-bottom:10px;
			margin-left:0;
			/*@editable*/text-align:left;
		}
	/*
	@tab Page
	@section heading 3
	@tip Set the styling for all third-level headings in your emails.
	@style heading 3
	*/
		h3,.h3{
			/*@editable*/color:#212121;
			display:block;
			/*@editable*/font-family:Arial;
			/*@editable*/font-size:26px;
			/*@editable*/font-weight:bold;
			/*@editable*/line-height:100%;
			margin-top:0;
			margin-right:0;
			margin-bottom:10px;
			margin-left:0;
			/*@editable*/text-align:left;
		}
	/*
	@tab Page
	@section heading 4
	@tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.
	@style heading 4
	*/
		h4,.h4{
			/*@editable*/color:#447C9D;
			display:block;
			/*@editable*/font-family:Arial;
			/*@editable*/font-size:22px;
			/*@editable*/font-weight:bold;
			/*@editable*/line-height:100%;
			margin-top:0;
			margin-right:0;
			margin-bottom:10px;
			margin-left:0;
			/*@editable*/text-align:left;
		}
	/*
	@tab Header
	@section preheader style
	@tip Set the background color for your email's preheader area.
	@theme page
	*/
		#templatePreheader{
			/*@editable*/background-color:#fff;
		}
	/*
	@tab Header
	@section preheader text
	@tip Set the styling for your email's preheader text. Choose a size and color that is easy to read.
	*/
		.preheaderContent div{
			/*@editable*/color:#505050;
			/*@editable*/font-family:Arial;
			/*@editable*/font-size:10px;
			/*@editable*/line-height:100%;
			/*@editable*/text-align:left;
		}
	/*
	@tab Header
	@section preheader link
	@tip Set the styling for your email's preheader links. Choose a color that helps them stand out from your text.
	*/
		.preheaderContent div a:link,.preheaderContent div a:visited,.preheaderContent div a .yshortcuts {
			/*@editable*/color:#336699;
			/*@editable*/font-weight:normal;
			/*@editable*/text-decoration:underline;
		}
	/*
	@tab Header
	@section header style
	@tip Set the background color and border for your email's header area.
	@theme header
	*/
		#templateHeader{
			/*@editable*/background-color:#FFFFFF;
			/*@editable*/border-bottom:0;
		}
	/*
	@tab Header
	@section header text
	@tip Set the styling for your email's header text. Choose a size and color that is easy to read.
	*/
		.headerContent{
			/*@editable*/color:#202020;
			/*@editable*/font-family:Arial;
			/*@editable*/font-size:34px;
			/*@editable*/font-weight:bold;
			/*@editable*/line-height:100%;
			/*@editable*/padding:0;
			/*@editable*/text-align:center;
			/*@editable*/vertical-align:middle;
		}
	/*
	@tab Header
	@section header link
	@tip Set the styling for your email's header links. Choose a color that helps them stand out from your text.
	*/
		.headerContent a:link,.headerContent a:visited,.headerContent a .yshortcuts {
			/*@editable*/color:#336699;
			/*@editable*/font-weight:normal;
			/*@editable*/text-decoration:underline;
		}
		#headerImage{
			height:auto;
			max-width:600px;
		}
	/*
	@tab Body
	@section body style
	@tip Set the background color for your email's body area.
	*/
		#templateContainer,.bodyContent{
			/*@editable*/background-color:#FFFFFF;
		}
	/*
	@tab Body
	@section body text
	@tip Set the styling for your email's main content text. Choose a size and color that is easy to read.
	@theme main
	*/
		.bodyContent div{
			/*@editable*/color:#505050;
			/*@editable*/font-family:Arial;
			/*@editable*/font-size:12px;
			/*@editable*/line-height:150%;
			/*@editable*/text-align:left;
		}
	/*
	@tab Body
	@section body link
	@tip Set the styling for your email's main content links. Choose a color that helps them stand out from your text.
	*/
		.bodyContent div a:link,.bodyContent div a:visited,.bodyContent div a .yshortcuts {
			/*@editable*/color:#336699;
			/*@editable*/font-weight:normal;
			/*@editable*/text-decoration:underline;
		}
		.bodyContent img{
			display:inline;
			height:auto;
		}
	/*
	@tab Sidebar
	@section sidebar style
	@tip Set the background color and border for your email's sidebar area.
	*/
		#templateSidebar{
			/*@editable*/background-color:#FFFFFF;
			/*@editable*/border-left:0;
		}
	/*
	@tab Sidebar
	@section sidebar text
	@tip Set the styling for your email's sidebar text. Choose a size and color that is easy to read.
	*/
		.sidebarContent div{
			/*@editable*/color:#505050;
			/*@editable*/font-family:Arial;
			/*@editable*/font-size:12px;
			/*@editable*/line-height:150%;
			/*@editable*/text-align:left;
		}
	/*
	@tab Sidebar
	@section sidebar link
	@tip Set the styling for your email's sidebar links. Choose a color that helps them stand out from your text.
	*/
		.sidebarContent div a:link,.sidebarContent div a:visited,.sidebarContent div a .yshortcuts {
			/*@editable*/color:#336699;
			/*@editable*/font-weight:normal;
			/*@editable*/text-decoration:underline;
		}
		.sidebarContent img{
			display:inline;
			height:auto;
		}
	/*
	@tab Columns
	@section left column text
	@tip Set the styling for your email's left column text. Choose a size and color that is easy to read.
	*/
		.leftColumnContent{
			/*@editable*/background-color:#FFFFFF;
		}
	/*
	@tab Columns
	@section left column text
	@tip Set the styling for your email's left column text. Choose a size and color that is easy to read.
	*/
		.leftColumnContent div{
			/*@editable*/color:#505050;
			/*@editable*/font-family:Arial;
			/*@editable*/font-size:12px;
			/*@editable*/line-height:150%;
			/*@editable*/text-align:left;
		}
	/*
	@tab Columns
	@section left column link
	@tip Set the styling for your email's left column links. Choose a color that helps them stand out from your text.
	*/
		.leftColumnContent div a:link,.leftColumnContent div a:visited,.leftColumnContent div a .yshortcuts {
			/*@editable*/color:#336699;
			/*@editable*/font-weight:normal;
			/*@editable*/text-decoration:underline;
		}
		.leftColumnContent img{
			display:inline;
			height:auto;
		}
	/*
	@tab Columns
	@section center column text
	@tip Set the styling for your email's center column text. Choose a size and color that is easy to read.
	*/
		.centerColumnContent{
			/*@editable*/background-color:#FFFFFF;
		}
	/*
	@tab Columns
	@section center column text
	@tip Set the styling for your email's center column text. Choose a size and color that is easy to read.
	*/
		.centerColumnContent div{
			/*@editable*/color:#505050;
			/*@editable*/font-family:Arial;
			/*@editable*/font-size:12px;
			/*@editable*/line-height:150%;
			/*@editable*/text-align:left;
		}
	/*
	@tab Columns
	@section center column link
	@tip Set the styling for your email's center column links. Choose a color that helps them stand out from your text.
	*/
		.centerColumnContent div a:link,.centerColumnContent div a:visited,.centerColumnContent div a .yshortcuts {
			/*@editable*/color:#336699;
			/*@editable*/font-weight:normal;
			/*@editable*/text-decoration:underline;
		}
		.centerColumnContent img{
			display:inline;
			height:auto;
		}
	/*
	@tab Columns
	@section right column text
	@tip Set the styling for your email's right column text. Choose a size and color that is easy to read.
	*/
		.rightColumnContent{
			/*@editable*/background-color:#FFFFFF;
		}
	/*
	@tab Columns
	@section right column text
	@tip Set the styling for your email's right column text. Choose a size and color that is easy to read.
	*/
		.rightColumnContent div{
			/*@editable*/color:#505050;
			/*@editable*/font-family:Arial;
			/*@editable*/font-size:12px;
			/*@editable*/line-height:150%;
			/*@editable*/text-align:left;
		}
	/*
	@tab Columns
	@section right column link
	@tip Set the styling for your email's right column links. Choose a color that helps them stand out from your text.
	*/
		.rightColumnContent div a:link,.rightColumnContent div a:visited,.rightColumnContent div a .yshortcuts {
			/*@editable*/color:#336699;
			/*@editable*/font-weight:normal;
			/*@editable*/text-decoration:underline;
		}
		.rightColumnContent img{
			display:inline;
			height:auto;
		}
	/*
	@tab Footer
	@section footer style
	@tip Set the background color and top border for your email's footer area.
	@theme footer
	*/
		#templateFooter{
			/*@editable*/background-color:#111111;
			/*@editable*/border-top:0;
		}
	/*
	@tab Footer
	@section footer text
	@tip Set the styling for your email's footer text. Choose a size and color that is easy to read.
	@theme footer
	*/
		.footerContent div{
			/*@editable*/color:#3083AB;
			/*@editable*/font-family:Arial;
			/*@editable*/font-size:12px;
			/*@editable*/line-height:125%;
			/*@editable*/text-align:left;
		}
	/*
	@tab Footer
	@section footer link
	@tip Set the styling for your email's footer links. Choose a color that helps them stand out from your text.
	*/
		.footerContent div a:link,.footerContent div a:visited,.footerContent div a .yshortcuts {
			/*@editable*/color:#3083AB;
			/*@editable*/font-weight:normal;
			/*@editable*/text-decoration:underline;
		}
		.footerContent img{
			display:inline;
		}
	/*
	@tab Footer
	@section social bar style
	@tip Set the background color and border for your email's footer social bar.
	@theme footer
	*/
		#social{
			/*@editable*/background-color:#111;
			/*@editable*/border:0;
		}
	/*
	@tab Footer
	@section social bar style
	@tip Set the background color and border for your email's footer social bar.
	*/
		#social div{
			/*@editable*/text-align:center;
		}
	/*
	@tab Footer
	@section utility bar style
	@tip Set the background color and border for your email's footer utility bar.
	@theme footer
	*/
		#utility{
			/*@editable*/background-color:#111;
			/*@editable*/border:0;
		}
	/*
	@tab Footer
	@section utility bar style
	@tip Set the background color and border for your email's footer utility bar.
	*/
		#utility div{
			/*@editable*/text-align:center;
		}
		#monkeyRewards img{
			max-width:190px;
		}

		ul.details{
			width:100%;
			list-style:none;
			margin:0 0 0 5px;
			padding:0 0 0 5px;
		}
		ul.details li{
			display:block;
			width:100%;
			margin-bottom:5px;
			font-size:13px;
		}
		ul.details li strong, 	ul.details li span{
			display:inline-block;
		}
		ul.details li strong{
			width:160px;
			text-align:left;
		}
		ul.details li span{
			width:200px;
		}

</style></head>
    <body>
    	<center>
        	<table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="backgroundTable">
            	<tr>
                	<td align="center" valign="top">
                        <!-- // End Template Preheader \\ -->
                    	<table border="0" cellpadding="0" cellspacing="0" width="600" id="templateContainer">
                        	<tr>
                            	<td align="center" valign="top">
                                    <!-- // Begin Template Header \\ -->
                                	<table border="0" cellpadding="0" cellspacing="0" width="600" id="templateHeader">
                                        <tr>
                                            <td class="headerContent">
                                            	<!-- // End Module: Standard Header Image \\ -->
                                            
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- // End Template Header \\ -->
                                </td>
                            </tr>
                        	<tr>
                            	<td align="center" valign="top" colspan="2">
                                    <!-- // Begin Template Body \\ -->
                                	<table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateBody">
                                    	<tr style="display:table;">
                                        	<td valign="top" colspan="2">
                                            	<table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                	<tr>
                                                    	<td valign="top">
                                                        	<table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                            	<tr>
                                                                	<td valign="top" class="bodyContent">
                                                        
                                                                        <!-- // Begin Module: Standard Content \\ -->
                                                                        <table border="0" cellpadding="20" cellspacing="0" width="100%">
                                                                            <tr>
                                                                                <td valign="top">
						                                                            <div>
						                                                                <h3 class="h3"><% subjectemail %>:</h3>
						                                                            </div>
						                                                            <div>
						                                                            	<table border="0" cellpadding="5" cellspacing="0" width="100%">
						                                                            		<tr>
						                                                            			<td width="160"><strong>First Name:</strong></td>
						                                                            			<td width="200"><% fname %></td>
						                                                            			<td>&nbsp;</td>
						                                                            			<td>&nbsp;</td>
						                                                            		</tr>
						                                                            		<tr>
						                                                            			<td width="160"><strong>Last Name:</strong></td>
						                                                            			<td width="200"><% lname %></td>
						                                                            			<td>&nbsp;</td>
						                                                            			<td>&nbsp;</td>
						                                                            		</tr>
						                                   									<tr>
						                                                            			<td width="160"><strong>Tour Name:</strong></td>
						                                                            			<td width="200"><% tour_name %></td>
						                                                            			<td>&nbsp;</td>
						                                                            			<td>&nbsp;</td>
						                                                            		</tr>
						                                                            		<tr>
						                                                            			<td><strong>Email:</strong></td>
						                                                            			<td><a href="mailto:<% email %>"><% email %></a></td>
						                                                            			<td>&nbsp;</td>
						                                                            			<td>&nbsp;</td>
						                                                            		</tr>
						                                                            		<tr>
						                                                            			<td><strong>Phone/Mobile:</strong></td>
						                                                            			<td><% mobile %></td>
						                                                            			<td>&nbsp;</td>
						                                                            			<td>&nbsp;</td>
						                                                            		</tr>
						                                                            		<tr>
						                                                            			<td><strong>Message:</strong></td>
						                                                            			<td><% comments %></td>
						                                                            			<td>&nbsp;</td>
						                                                            			<td>&nbsp;</td>
						                                                            		</tr>
						                                                            		<tr>
						                                                            			<td><strong>Date Enquired:</strong></td>
						                                                            			<td><% date_enquired %></td>
						                                                            			<td>&nbsp;</td>
						                                                            			<td>&nbsp;</td>
						                                                            		</tr>
						                                                    
						                                                            	</table>
						                                                            </div>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                        <!-- // End Module: Standard Content \\ -->
                                                                        
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>                                                
                                            </td>
                          
                                        </tr>
                                    </table>
                                    <!-- // End Template Body \\ -->
                                </td>
                            </tr>
                        </table>
                        <br>
                    </td>
                </tr>
            </table>
        </center>
    </body>
</html>