<?php
## ----------------------------------------------------------------------------------------------------------------------
## NetZone 1.0
## inc_settings.php
##
## Author: Ton Jo Immanuel, Tomahawk Brand Management Ltd.
## Date: 19 April 2010
##
## Manage Settings
##
##
## ----------------------------------------------------------------------------------------------------------------------

function do_main(){

    global $message,$valid,$htmladmin,$scripts_onload,$main_heading;

    $action     = $_REQUEST['action'];
    $main_heading = 'General Settings';
    switch ($action) {

        case 'save':

            $return = save_item();
            break;

    }
    
    if ($message != "") {

        $page_contents .= <<< HTML
          <div class="alert alert-warning page">
             <i class="glyphicon glyphicon-info-sign"></i>
              <strong>$message</strong>
          </div>
HTML;
    }
    $sql = "SELECT * FROM general_settings";
    $row = fetch_row($sql);

    $set_id             = $row['set_id'];
    $set_company        = $row['set_company'];
    $set_email          = $row['set_email'];
    $set_analytics      = $row['set_analytics'];
    $set_startyear      = $row['set_startyear'];
    $slideshow_speed    = $row['slideshow_speed'];
    $set_phone          = $row['set_phone'];
    $set_address        = $row['set_address'];
    $overlay_heading    = $row['overlay_heading'];
    $overlay_subheading = $row['overlay_subheading'];
    $overlay_intro      = $row['overlay_intro'];
    $overlay_btn_text   = $row['overlay_btn_text'];
    $overlay_btn_url    = $row['overlay_btn_url'];


    ##------------------------------------------------------------------------------------------------------
    ## Page functions

$page_functions = <<< HTML
        <ul class="page-action">
            <li><button type="button" class="btn btn-default" onclick="submitForm('save',1)"><i class="glyphicon glyphicon-floppy-save"></i> Save</button></li>
            </li>
        </ul>
HTML;

// Social Icons

 $social_icons = fetch_all("SELECT `id`, `label`, `url`, `widget_blob`, `has_widget` FROM `social_links` WHERE `is_active` = '1' ORDER BY `rank`");

    if(count($social_icons) > 0)
    {
        $links = '';
        foreach ($social_icons as $index => $social_icon)
        {
            $index++;

            if($social_icon['has_widget'])
            {
                $input = '<textarea style="width:700px;height:150px;" name="social-item[]" >'.$social_icon['widget_blob'].'</textarea>';
            }
            else
            {
                $input = '<input type="text" style="width:700px" name="social-item[]" value="'.$social_icon['url'].'" id="social-item-'.$index.'">';
            }
           $links .= <<< H
            <tr>
                <td width="150" valign="top"><label for="social-item-$index">{$social_icon['label']}</label></td>
                <td>
                    <input type="hidden" name="social-item-id[]" value="{$social_icon['id']}">
                    <input type="hidden" name="social-item-has-wdge[]" value="{$social_icon['has_widget']}">
                    $input
                </td>
            </tr>
H;
        }
    
    $social_links = <<< H
    
<table width="100%" border="0" cellspacing="0" cellpadding="4">
    $links
</table>

H;

}
else
{
    $social_links = '';
}


   ##------------------------------------------------------------------------------------------------------
  ## Important Pages

        $sql = "SELECT imppage_name, imppage_id, page_id,is_mobile
                FROM general_importantpages
        WHERE imppage_showincms = 'Y'
        ORDER BY is_mobile DESC";

        $imppages_arr = fetch_all($sql);

        $imppages_list = '<table cellspacing="0" cellpadding="5" border="0">';
        foreach($imppages_arr as $key => $array)
        {
            $imppage_name = ucwords($array['imppage_name']);
            $page_id      = $array['page_id'];
            $imppage_id   = $array['imppage_id'];
            $is_mobile   =  ($array['is_mobile']) ? true : false;

            $pages_select = page_list($is_mobile, 0, $page_id);
            $imppages_list .= <<< HTML
                <tr>
                    <td>$imppage_name <input type="hidden" name="imppage_id[]" value="$imppage_id"/></td>
                    <td>
                        <select name="page_id[]">
                            $pages_select
                        </select>
                    </td>
                </tr>
HTML;
        }
        $imppages_list .= <<< HTML
            </table>
HTML;

    $sql = "SELECT imggrp_id, imggrp_name
        FROM images_groups";
    $list = '';
    foreach(fetch_all($sql) as $key => $array){
    $name = $array['imggrp_name'];
    $id = $array['imggrp_id'];
    $selected = ($id==$set_defaultslideshow) ? 'selected="selected"' : '';
    $list .= "<option value=\"$id\" $selected>$name</option>";
    }
    $defaultslideshow = <<< HTML
    <select name="set_defaultslideshow">
    $list
    </select>
HTML;

    $sql = "SELECT imggrp_id, imggrp_name
        FROM images_groups";
    $list = '';
    foreach(fetch_all($sql) as $key => $array){
    $name = $array['imggrp_name'];
    $id = $array['imggrp_id'];
    $selected = ($id==$set_gallery) ? 'selected="selected"' : '';
    $list .= "<option value=\"$id\" $selected>$name</option>";
    }
    $gallery = <<< HTML
    <select name="set_gallery">
    $list
    </select>
HTML;

   ##------------------------------------------------------------------------------------------------------
   ## Details Content
        $companydetails_content = <<< HTML
            <script type="text/javascript">
                function openFileBrowser(w) {
                var winl = (screen.width - 1000) / 2;
                var wint = (screen.height - 600) / 2;
                var mypage = jsVars.dataManagerUrl+"&NetZone="+w+"&lang=en";

                var myname = "imageSelector";
                winprops = 'status=yes,height=600,width=1000,top='+wint+',left='+winl+',scrollbars=auto,resizable'
                win = window.open(mypage, myname, winprops)
                if (parseInt(navigator.appVersion) >= 4) { win.window.focus(); }
                }
                function SetUrl(p,w,h) {
                var p;
                var w;
                var h;
                document.getElementById(w).value=p;
                }
                        </script>
                        <table width="100%" border="0" cellspacing="0" cellpadding="4">
                            <tr>
                                <td width="150"><label for="set_company">Company name</label></td>
                                <td colspan="3"><input name="set_company" id="set_company" type="text" value="$set_company" style="width:300px;" /></td>
                            </tr>
                            <tr>
                                <td width="150"><label for="set_phone">Phone Number</label></td>
                                <td colspan="3"><input name="set_phone" type="text" value="$set_phone" style="width:150px;" id="set_phone" /></td>
                            </tr>
                            <tr>
                                <td width="150"><label for="set_startyear">Start year</label></td>
                                <td colspan="3"><input name="set_startyear" type="text" value="$set_startyear" style="width:150px;" id="set_startyear" /></td>
                            </tr>
                            <tr>
                                <td width="150" valign="top"><label for="set_email">Email(s)</label> <span title="Separate multiple email addresses with a semicolon ( ; )" data-placement="right" data-toggle="tooltip"></span></td>
                                <td colspan="3">
                                    <textarea name="set_email" style="width:300px;min-height:120px;">$set_email</textarea>
                                </td>
                            </tr>
                            <tr>
                                <td width="150" valign="top"><label for="set_address">Address</td>
                                <td colspan="3">
                                    <textarea name="set_address" style="width:300px;min-height:120px;">$set_address</textarea>
                                </td>
                            </tr>

                        </table>
            
HTML;




    ##------------------------------------------------------------------------------------------------------
    ## Important pages Content
        $importantpages_content = <<< HTML
                        <table width="100%" border="0" cellspacing="0" cellpadding="4">
                            <tr>
                                <td colspan="4">$imppages_list</td>
                            </tr>
            </table>
HTML;
    ##------------------------------------------------------------------------------------------------------
    ## Developer Content
        $developer_content = <<< HTML
            <table width="100%" border="0" cellspacing="0" cellpadding="4">
                <tr>
                    <td style="vertical-align:top;">Analytics code</td>
                    <td colspan="3">
                        <textarea name="set_analytics" style="width:790px; height:100px;">$set_analytics</textarea>
                        <span style="vertical-align:top;" class="tooltip" title="This field is strictly for the developer only and should be updated with caution."></span>
                    </td>
                </tr>
            </table>
HTML;

 ##------------------------------------------------------------------------------------------------------
    ## Overlay Content
        $overlay_content = <<< HTML
            <table width="100%" border="0" cellspacing="0" cellpadding="4">
                <tr>
                    <td width="150"><label for="overlay_heading">Overlay Heading</label></td>
                    <td colspan="3"><input name="overlay_heading" id="overlay_heading" type="text" value="$overlay_heading" style="width:300px;" /></td>
                </tr>
                <tr>
                    <td width="150"><label for="overlay_subheading">Overlay Sub Heading</label></td>
                    <td colspan="3"><input name="overlay_subheading" type="text" value="$overlay_subheading" style="width:300px;" id="overlay_subheading" /></td>
                </tr>
                <tr>
                    <td width="150"><label for="overlay_btn_text">Overlay Button Text</label></td>
                    <td colspan="3"><input name="overlay_btn_text" type="text" value="$overlay_btn_text" style="width:300px;" id="overlay_btn_text" /></td>
                </tr>
                <tr>
                    <td width="150"><label for="overlay_btn_url">Overlay Button URL</label></td>
                    <td colspan="3"><input name="overlay_btn_url" type="text" value="$overlay_btn_url" style="width:300px;" id="overlay_btn_url" /></td>
                </tr>
                <tr>
                    <td width="150" valign="top"><label for="overlay_intro">Overlay Introduction (max 400 char.)</td>
                    <td colspan="3">
                        <textarea name="overlay_intro" maxlength="400" style="width:300px;height:250px;">$overlay_intro</textarea>
                    </td>
                </tr>
            </table>
HTML;


       ##------------------------------------------------------------------------------------------------------
       ## tab arrays and build tabs

    $temp_array_menutab = array();
    
    $temp_array_menutab ['Company Details']                           = $companydetails_content;
    if(count($social_icons) > 0) $temp_array_menutab ['Social Links'] = $social_links;
    $temp_array_menutab ['Homepage Overlay']                          = $overlay_content;
    $temp_array_menutab ['Important Pages']                           = $importantpages_content;
    $temp_array_menutab ['Developer Settings']                        = $developer_content;

    $counter = 0;
    $tablist ="";
    $contentlist="";

    foreach($temp_array_menutab as $key => $value){

        $tablist.= "<li><a href=\"#tabs-".$counter."\">".$key."</a></li>";
        $contentlist.=" <div id=\"tabs-".$counter."\">".$value."</div>";
        $counter++;
    }

    $tablist="<div id=\"tabs\"><ul>".$tablist."</ul><div style=\"padding:10px;\">".$contentlist."</div></div>";

        $page_contents = <<< HTML
                        <form action="$htmladmin/index.php" method="post" name="pageList" enctype="multipart/form-data">
                            $tablist
                            <input type="hidden" name="action" value="" id="action">
                            <input type="hidden" name="do" value="settings">
                            <input type="hidden" name="id" value="$id">
                            <input type="hidden" name="set_id" value="$set_id">
                        </form>
HTML;
    require "resultPage.php";
    echo $result_page;
    exit();
}
function save_item(){

    global $message,$id,$do,$disable_menu;

    $set_id                                = $_REQUEST['set_id'];
    $temp_array_save['set_company']        = $_REQUEST['set_company'];
    $temp_array_save['set_startyear']      = $_REQUEST['set_startyear'];
    $temp_array_save['set_email']          = $_REQUEST['set_email'];
    $temp_array_save['set_analytics']      = $_REQUEST['set_analytics'];
    $temp_array_save['slideshow_speed']    = $_REQUEST['slideshow_speed'];
    $temp_array_save['set_phone']          = $_REQUEST['set_phone'];
    $temp_array_save['set_address']        = $_REQUEST['set_address'];
    $temp_array_save['overlay_heading']    = $_REQUEST['overlay_heading'];
    $temp_array_save['overlay_subheading'] = $_REQUEST['overlay_subheading'];
    $temp_array_save['overlay_intro']      = $_REQUEST['overlay_intro'];
    $temp_array_save['overlay_btn_text']   = $_REQUEST['overlay_btn_text'];
    $temp_array_save['overlay_btn_url']    = $_REQUEST['overlay_btn_url'];

    if(update_row($temp_array_save, 'general_settings', "WHERE set_id = '1'")){
        $message = "Settings have been saved";
    };

    // save social urls

    $url_ids    = $_POST['social-item-id'];
    $urls       = $_POST['social-item'];
    $has_widget = $_POST['social-item-has-wdge'];

    if(count($url_ids) > 0)
    {
        for ($i=0; $i < count($url_ids); $i++)
        { 
            $url_save_arr = array();
            if($has_widget[$i]) $url_save_arr['widget_blob'] = $urls[$i];
            else $url_save_arr['url'] = $urls[$i];

            update_row($url_save_arr, 'social_links', "WHERE id = '{$url_ids[$i]}'");
        }
    }

    $imppage_id = $_REQUEST['imppage_id'];
    $page_id = $_REQUEST['page_id'];
    $i = 0;
    foreach($imppage_id as $key => $value){
        $end = "WHERE imppage_id = '$value'";
        $temp_array_save = '';
        $temp_array_save['page_id']     = $page_id[$i];
        update_row($temp_array_save, 'general_importantpages', $end);
        $i++;
    }


}

?>