<?php

############################################################################################################################
## Edit FAQ Item
############################################################################################################################

function edit_item()
{

    global $message,$id,$do,$disable_menu,$valid,$htmladmin, $main_subheading, $main_heading, $htmlroot;
    // $ex_meg = (preg_match('/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/',$page_url)) ? ' <i class="glyphicon glyphicon-arrow-left" style="margin:3px 0 0 10px"></i> please edit' : '';

   
    $disable_menu = "true";

    $sql = "SELECT `label`, `url`, `title`, `meta_keywords`, `meta_description` FROM `blog_category` WHERE `id` = '$id' LIMIT 1";

    $row = fetch_row($sql);
    @extract($row);

   $main_subheading = 'Editing news category: '.$label;

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
                <td width="100">Label:</td>
                <td><input name="label" type="text" id="label" value="$label" style="width:250px;" /></td>
                <td width="100">URL:</td>
                <td><input name="url" type="text" id="url" value="$url" style="width:250px;" /></td>
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
                            $tablist
                            <input type=\"hidden\" name=\"action\" value=\"\" id=\"action\">
                            <input type=\"hidden\" name=\"do\" value=\"blogcategories\">
                            <input type=\"hidden\" name=\"id\" value=\"$id\">
                        </form>";
    require "resultPage.php";
    echo $result_page;
    exit();
}

?>
