<?php

############################################################################################################################
## Edit FAQ Item
############################################################################################################################

function edit_item()
{

    global $message,$id,$do,$disable_menu,$valid,$htmladmin, $main_subheading,$tbl_name;

    $disable_menu = "true";

    $sql = "SELECT *
            FROM $tbl_name
            WHERE `id` = '$id'
            LIMIT 1";

    $row = fetch_row($sql);
    @extract($row);

    $main_subheading = 'Editing: '.$name;

    $checked = '';
    if($is_featured == 1)
    {
        $checked = 'checked';
    }

//Get main categories---------------------------
    $sql = "SELECT `id`,`name` FROM `tour_category` WHERE `status` = 'A' AND `parent_id` = 0 ORDER BY `rank`";
    $cat_arr = fetch_all($sql);

    $cat_dd = '';
    if(!empty($cat_arr))
    {
        $cat_dd = '<select style="width:300px;" name="main_category_id" id="main_category_id"><option value="">Select main category</option>';

        foreach ($cat_arr as $cat) {
            
            if($cat['id'] == $main_category_id){$sel = 'selected';}else{$sel = '';}

            $cat_dd .= <<<H

            <option {$sel} value="{$cat['id']}">{$cat['name']}</option>

H;
        }
        $cat_dd .= '</select>';
    }

//Get sub categories---------------------------
    $sql = "SELECT `id`,`name` FROM `tour_category` WHERE `status` = 'A' AND `parent_id` != 0 ORDER BY `rank`";
    $sub_cat_arr = fetch_all($sql);

    $sub_cat_dd = '';
    if(!empty($sub_cat_arr))
    {
        $sub_cat_dd = '<select style="width:300px;" name="sub_category_id" id="sub_category_id"><option value="">Select sub category</option>';

        foreach ($sub_cat_arr as $cat) {
            
            if($cat['id'] == $sub_category_id){$sel = 'selected';}else{$sel = '';}

            $sub_cat_dd .= <<<H

            <option {$sel} value="{$cat['id']}">{$cat['name']}</option>

H;
        }
        $sub_cat_dd .= '</select>';
    }

//List of countries--------------------------------------------

$sql = "SELECT `name`,`id` FROM `country` WHERE `status` = 'A' ORDER BY `rank`";
$country_arr = fetch_all($sql);
$country_dd = '';

if(!empty($country_arr))
{
    $country_dd = '<select name="country_id" style="width:300px;"><option value="">Select country</option>';

    foreach ($country_arr as $country) {

        if($country['id'] == $country_id){$sel = 'selected';}else{$sel = '';}
        $country_dd .= '<option '.$sel.' value="'.$country['id'].'">'.$country['name'].'</option>';
    }

    $country_dd .= '</select>';
}


    ##------------------------------------------------------------------------------------------------------
    ## Slideshows

    $sql = "SELECT * FROM images_groups";
    $result = run_query($sql);

    $slideshow_list = "<select name=\"slideshow_id\" style=\"width:300px;\"><option value=\"NULL\" $sel>Select slideshow</option>";
    while($row = mysql_fetch_assoc($result)) {

        $slidegroup_id      = $row['imggrp_id'];
        $slidegroup_name    = $row['imggrp_name'];

        $sel3 = ($slidegroup_id == $slideshow_id) ? 'selected' : '';
        $slideshow_list .= "<option value=\"$slidegroup_id\" $sel3>$slidegroup_name</option>";
    }

    $slideshow_list .= "</select>";

    ##------------------------------------------------------------------------------------------------------
    ## Galleries

    $sql2 = "SELECT * FROM images_groups WHERE is_gallery = 1";
    $result2 = run_query($sql2);

    $gallery_list = "<select name=\"gallery_id\" style=\"width:300px;\"><option value=\"NULL\" $sel>Select gallery</option>";
    while($row = mysql_fetch_assoc($result2)) {

        $slidegroup_id      = $row['imggrp_id'];
        $slidegroup_name    = $row['imggrp_name'];

        $sel3 = ($slidegroup_id == $gallery_id) ? 'selected' : '';
        $gallery_list .= "<option value=\"$slidegroup_id\" $sel3>$slidegroup_name</option>";
    }

    $gallery_list .= "</select>";


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
                <td width="200">Tour Name:</td>
                <td colspan="3"><input name="name" type="text" id="name" value="$name" style="width:300px;" /></td>
            </tr>
            <tr>
                <td width="200">Main Category:</td>
                <td colspan="3">
                    $cat_dd
                </td>
            </tr>
            <tr>
                <td width="200">Sub Category:</td>
                <td colspan="3">
                    $sub_cat_dd
                </td>
            </tr>
            <tr>
                <td width="200">Slideshow:</td>
                <td colspan="3">
                    $slideshow_list
                </td>
            </tr>
            <tr>
                <td width="200">Gallery:</td>
                <td colspan="3">
                    $gallery_list
                </td>
            </tr>
            <tr>
                <td width="200">Is featured?</td>
                <td colspan="3"><input type="checkbox" $checked name="is_featured" value="1" /></td>
            </tr>
            <tr>
                <td width="200">Country:</td>
                <td colspan="3">
                    $country_dd
                </td>
            </tr>
            <tr>
                <td width="200">Heading:</td>
                <td colspan="3"><input name="heading" type="text" id="heading" value="$heading" style="width:300px;" /></td>
            </tr>
            <tr>
                <td width="200">URL:</td>
                <td colspan="3"><input name="url" type="text" id="url" value="$url" style="width:300px;" /></td>
            </tr>
            <tr>
                <td width="200">Price from:</td>
                <td colspan="3"><input name="price_from" type="text" id="price_from" value="$price_from" style="width:300px;" /></td>
            </tr>
             <tr>
                <td width="200">Duration:</td>
                <td colspan="3"><input name="duration" type="text" id="duration" value="$duration" style="width:300px;" /></td>
            </tr>
            <tr>
                <td width="200" valign="top">Image:</td>
                <td colspan="3">
                    <input name="image_path" type="text" id="image_path" value="$image_path" style="margin-right:5px;width:300px;float:left;" />
                    <input type="button" onclick="openFileBrowser('image_path')" style="padding:1px 5px;" value="Browse">
                    <input type="button" value="clear" onclick="clearValue('image_path')"><br>
                    <div><small>suggested size:H400px X W600px - JPG format</small></div>
                </td>
            </tr>
            <tr>
                <td width="200">Meta Title:</td>
                <td colspan="3"><input name="title" type="text" id="title" value="$title" style="width:300px;" /></td>
            </tr>
            <tr>
                <td width="200" valign="top">Meta Description:</td>
                <td colspan="3"><textarea name="meta_descr" id="meta_descr" style="width:600px;height:100px;">$meta_descr</textarea></td>
            </tr>
            <tr>
                <td width="200" valign="top">Short Description: <br>(max 200 char.)</td>
                <td colspan="3"><textarea maxlength="200" name="short_descr" id="short_descr" style="width:600px;height:100px;">$short_descr</textarea></td>
            </tr>
    </table>
HTML;

$overview_content = <<<HTML
        <table width="100%" border="0" cellspacing="0" cellpadding="8">
            <tr>
                <td width="100" valign="top">Long Description:</td>
                <td colspan="3">
                    <textarea name="long_descr" id="long_descr" style="width:800px;height:200px;">$long_descr</textarea>
                    <script type="text/javascript">
                        CKEDITOR.replace( 'long_descr',
                        {
                                toolbar : 'MyToolbar',
                                forcePasteAsPlainText : true,
                                resize_enabled : false,
                                width:700,
                                height : 600,
                                filebrowserBrowseUrl : jsVars.dataManagerUrl
                        });                   
                    </script>
                </td>
            </tr>
        </table>
HTML;
$inclusions_content = <<<HTML
        <table width="100%" border="0" cellspacing="0" cellpadding="8">
            <tr>
                <td width="100" valign="top">Inclusions:</td>
                <td colspan="3">
                    <textarea name="inclusions" id="inclusions" style="width:800px;height:200px;">$inclusions</textarea>
                    <script type="text/javascript">
                        CKEDITOR.replace( 'inclusions',
                        {
                                toolbar : 'MyToolbar',
                                forcePasteAsPlainText : true,
                                resize_enabled : false,
                                width:700,
                                height : 600,
                                filebrowserBrowseUrl : jsVars.dataManagerUrl
                        });                   
                    </script>
                </td>
            </tr>
        </table>
HTML;
$itinerary_content = <<<HTML
        <table width="100%" border="0" cellspacing="0" cellpadding="8">
            <tr>
                <td width="100" valign="top">Itinerary:</td>
                <td colspan="3">
                    <textarea name="itinerary" id="itinerary" style="width:800px;height:200px;">$itinerary</textarea>
                    <script type="text/javascript">
                        CKEDITOR.replace( 'itinerary',
                        {
                                toolbar : 'MyToolbar',
                                forcePasteAsPlainText : true,
                                resize_enabled : false,
                                width:700,
                                height : 600,
                                filebrowserBrowseUrl : jsVars.dataManagerUrl
                        });                   
                    </script>
                </td>
            </tr>
        </table>
HTML;

       ##------------------------------------------------------------------------------------------------------
       ## tab arrays and build tabs

    $temp_array_menutab                   = array();
    $temp_array_menutab ['Details']       = $settings_content;
    $temp_array_menutab ['Tour Overview'] = $overview_content;
    $temp_array_menutab ['Itinerary']     = $itinerary_content;
    $temp_array_menutab ['Inclusions']    = $inclusions_content;

    $counter     = 0;
    $tablist     ="";
    $contentlist ="";

    foreach($temp_array_menutab as $key => $value){

        $tablist.= "<li><a href=\"#tabs-".$counter."\">".$key."</a></li>";
        $contentlist.=" <div id=\"tabs-".$counter."\">".$value."</div>";
        $counter++;
    }

    $tablist="<div id=\"tabs\"><ul>$tablist</ul><div style=\"padding:10px;\">$contentlist</div></div>";

    $page_contents="<form action=\"$htmladmin/index.php\" method=\"post\" name=\"pageList\" enctype=\"multipart/form-data\">
                            $tablist
                            <input type=\"hidden\" name=\"action\" value=\"\" id=\"action\">
                            <input type=\"hidden\" name=\"do\" value=\"$do\">
                            <input type=\"hidden\" name=\"id\" value=\"$id\">
                    </form>";
    require "resultPage.php";
    echo $result_page;
    exit();
}

?>
