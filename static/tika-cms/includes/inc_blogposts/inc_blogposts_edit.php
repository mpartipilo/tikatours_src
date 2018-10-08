<?php

############################################################################################################################
## Edit FAQ Item
############################################################################################################################

function edit_item()
{

    global $message,$id,$do,$disable_menu,$valid,$htmladmin, $main_subheading;

    $disable_menu = "true";

    $sql = "SELECT `name`, `url`, `long_description`, `title`, `meta_keywords`, 
    `meta_description`, `date_posted`, `category_id` 
    FROM `blog_post`
     WHERE `id` = '$id'
     LIMIT 1";

    $row = fetch_row($sql);
    @extract($row);

     $main_subheading = 'Editing news post: '.$name;
   $date_posted_obj = new DateTime($date_posted);

   // create category dropdow
   $query = "SELECT `id` AS ind, `label` FROM `blog_category` WHERE `status` = 'A' ORDER BY `label`";
   $category_dd = '<select name="category">';
   $category_dd .= create_item_list($query, $category_id);
   $category_dd .= '</select>';

    ##------------------------------------------------------------------------------------------------------
    
    ##------------------------------------------------------------------------------------------------------
    ## Page functions

	$page_functions = <<< HTML
        <ul class="page-action">
            <li><button type="button" class="btn btn-default" onclick="submitForm('save',1)"><i class="glyphicon glyphicon-floppy-save"></i> Save</button></li>
            <li><button type="button" class="btn btn-default" onclick="submitForm('cancelpagesave',1)"><i class="glyphicon glyphicon-arrow-left"></i> Cancel</button>
            </li>
        </ul>
HTML;
       ##------------------------------------------------------------------------------------------------------
       ## Settings tab content

	$settings_content = <<< HTML
        <table width="100%" border="0" cellspacing="0" cellpadding="8">
            <tr>
                <td width="100">Heading:</td>
                <td colspan="3"><input name="label" type="text" id="label" value="$name" style="width:100%;" /></td>
               
            </tr>
            <tr>
                </td>
                <td width="100">Category:</td>
                <td>$category_dd</td>
            </tr>
             <tr>
                <td width="100">Date Posted:</td>
                <td>
                <input name="date_posted" type="text" id="date_posted" value="{$date_posted_obj->format('d/m/Y H:i:s')}" style="width:250px;" />
                <script>
                        $('#date_posted').datetimepicker({
                            dateFormat:'dd/mm/yy',
                            timeFormat:'hh:mm:ss'
                        });
                </script>

                </td>
                <td width="100">URL:</td>
                <td><input name="url" type="text" id="url" value="$url" style="width:250px;" /></td>
            </tr>
            <tr>
                <td width="100" valign="top">Description:</td>
                <td colspan="3">
                    <textarea name="long_description" id="long_description">$long_description</textarea>
                     <script type="text/javascript">
                    CKEDITOR.replace( 'long_description',
                    {
                            toolbar : 'MyToolbar',
                            forcePasteAsPlainText : true,
                            resize_enabled : false,
                            width:800,
                            height : 600,
                            filebrowserBrowseUrl : jsVars.dataManagerUrl
                    });
                
                                    
                </script>
                </td>
              
            </tr>
    </table>
HTML;

$meta_data = <<< H
<table width="100%" border="0" cellspacing="0" cellpadding="4" >
    <tr>
        <td width="150">Title</td>
        <td><input name="title" type="text" id="title" value="$title" style="width:600px;" /></td>
    </tr>
    <tr>
        <td>Meta Keywords <span class="tooltip" title="These keywords are hidden from the user but useful to some search engines"></span></td>
        <td>
            <textarea name="meta_keywords" style="width:600px; font-family: sans-serif, Verdana, Arial, Helvetica;" rows="5" id="meta_keywords">$meta_keywords</textarea>
        </td>
    </tr>
    <tr>
        <td>Meta Description <span class="tooltip" title="This description is hidden from the user but useful to some search engines and appears in search results"></span></td>
        <td>
            <textarea name="meta_description" style="width:600px; font-family: sans-serif, Verdana, Arial, Helvetica;" rows="5" id="meta_description">$meta_description</textarea>
        </td>
    </tr>
</table>
H;

       ##------------------------------------------------------------------------------------------------------
       ## tab arrays and build tabs

	$temp_array_menutab = array();

    $temp_array_menutab ['Details']     = $settings_content;
	$temp_array_menutab ['Meta Tags'] 	= $meta_data;

	$counter = 0;
	$tablist ="";
	$contentlist="";

	foreach($temp_array_menutab as $key => $value){

		$tablist.= "<li><a href=\"#tabs-".$counter."\">".$key."</a></li>";
		

		$contentlist.=" <div id=\"tabs-".$counter."\">".$value."</div>";

		$counter++;
	}

	$tablist="<div id=\"tabs\"><ul>$tablist</ul><div style=\"padding:10px;\">$contentlist</div></div>";

        $page_contents="<form action=\"$htmladmin/index.php\" method=\"post\" name=\"pageList\" enctype=\"multipart/form-data\">
        <style>
            /* css for timepicker */
            .ui-timepicker-div .ui-widget-header { margin-bottom: 8px; }
            .ui-timepicker-div dl { text-align: left; }
            .ui-timepicker-div dl dt { float: left; clear:left; padding: 0 0 0 5px; }
            .ui-timepicker-div dl dd { margin: 0 10px 10px 45%; }
            .ui-timepicker-div td { font-size: 90%; }
            .ui-tpicker-grid-label { background: none; border: none; margin: 0; padding: 0; }

            .ui-timepicker-rtl{ direction: rtl; }
            .ui-timepicker-rtl dl { text-align: right; padding: 0 5px 0 0; }
            .ui-timepicker-rtl dl dt{ float: right; clear: right; }
            .ui-timepicker-rtl dl dd { margin: 0 45% 10px 10px; }
        </style>
                            $tablist
                            <input type=\"hidden\" name=\"action\" value=\"\" id=\"action\">
                            <input type=\"hidden\" name=\"do\" value=\"blogposts\">
                            <input type=\"hidden\" name=\"id\" value=\"$id\">
                        </form>";
    require "resultPage.php";
    echo $result_page;
    exit();
}

?>
