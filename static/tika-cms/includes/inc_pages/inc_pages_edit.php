<?php
############################################################################################################################
## Edit page
############################################################################################################################
function edit_item() 
{

    global $htmladmin,$message,$id,$page_slidegroup,$do,$disable_menu,$valid, $pages_maximum, $pages_generations, $scripts_onload,

            $page_url,
            $page_label,
            $page_heading,
            $page_subheading,
            $page_title,
            $page_mkeyw,
            $page_mdescr,
            $page_mcache,
            $page_mrobots,
            $page_seokeyw,
            $page_imagepath,
            $imggrp_id,
            $tmpl_id,
            $page_menu,
            $page_footer,
            $page_footer_menu_placement,
            $page_slideshow_thumbs,
            $page_linkname,
            $page_introduction,
            $page_parentid,
            $page_accesslevel, $page_quicklinksnippet, $page_breadcrumb_menu,
            $page_sitemap_title, $page_sitemap_menu, $main_subheading, $main_heading, $htmlroot, $action;

    $disable_menu = "true";

    $sql = "SELECT *
            FROM general_pages
            WHERE page_id = '$id'";

    $row = fetch_row($sql);
    
    $page_url                   = $row['page_url'];
    $page_label                 = $row['page_label'];
    $page_breadcrumb_menu       = $row['page_breadcrumb_menu'];
    $page_heading               = $row['page_heading'];
    $current_page               = $row['current_page'];
    $page_title                 = $row['page_title'];
    $page_mkeyw                 = $row['page_mkeyw'];
    $page_mdescr                = $row['page_mdescr'];
    $page_mcache                = $row['page_mcache'];
    $page_mrobots               = $row['page_mrobots'];
    $page_seokeyw               = $row['page_seokeyw'];
    $page_imagepath             = $row['page_imagepath'];
    $imggrp_id                  = $row['imggrp_id'];
    $imggrp_id_footer           = $row['imggrp_id_gallery'];
    $tmpl_id                    = $row['tmpl_id'];
    $page_menu                  = $row['page_menu'];
    $page_footer                = $row['page_footer'];
    $page_footer_menu_placement = $row['page_footer_menu_placement'];
    $page_linkname              = $row['page_linkname'];
    $page_quicklink_heading     = $row['page_quicklink_heading'];
    $page_quicklinksnippet      = $row['page_quicklinksnippet'];
    $page_quicklink_image       = $row['page_quicklink_image'];
    $page_quicklink_button      = $row['page_quicklink_button'];
    $page_introduction          = $row['page_introduction'];
    $page_parentid              = $row['page_parentid'];
    $page_accesslevel           = $row['page_accesslevel'];
    $page_cmslock_url           = $row['page_cmslock_url'];
    $page_catchphrase           = $row['page_catchphrase'];
    $page_sitemap_title         = $row['page_sitemap_title'];
    $page_sitemap_menu          = $row['page_sitemap_menu'];
    $country_id                 = $row['country_id'];
    $category_id                = $row['category_id'];
    
    $page_mobile_id             = $row['page_mobile_id'];
    $page_timebase_publishing   = $row['page_timebase_publishing'];

    $page_publish_date          = ($row['page_publish_date']    != '0000-00-00')   ? mkformatted_date($row['page_publish_date'], 'd/m/Y') : '';
    $page_hide_date             = ($row['page_hide_date']       != '0000-00-00')   ? mkformatted_date($row['page_hide_date'], 'd/m/Y'): '';

    $page_publish_time          = ($row['page_publish_time']    != '00:00:00')     ? $row['page_publish_time'] : '';
    $page_hide_time             = ($row['page_hide_time']       != '00:00:00')     ? $row['page_hide_time'] : '';


    $ptbpY = ($page_timebase_publishing == 'Y') ? ' checked="checked"' : '';
    $class = ($page_timebase_publishing == 'Y') ? '' : 'class="hidden"';
    $use_gb_checked = ($use_grey_bg == 1) ? ' checked="checked"' : '';

    $setPublishTime = ($page_publish_time) ? $page_publish_time : '00:00:00';

    $setHideTime = ($page_hide_time) ? $page_hide_time : '00:00:00';

    $publish_time_arr = getTimeArray($setPublishTime);
    $hide_time_arr = getTimeArray($setHideTime);

    $footer_columns = array(1,2,3);

    $ex_meg = (preg_match('/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/',$page_url)) ? ' <i class="glyphicon glyphicon-arrow-left" style="margin:3px 0 0 10px"></i> please edit' : '';

    $main_subheading = 'Editing page: '.$page_label.'<a href="'.$htmlroot.'/'.$page_url.'" target="_blank">('.$htmlroot.'/'.$page_url.'</a>'.$ex_meg.')';
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
    ## Modules

    $sql = "SELECT *
            FROM modules WHERE mod_showincms = 'Y' AND (mod_mobile = '' OR mod_mobile IS NULL)";
    $result = run_query($sql);
    $modules = "";

    while($row = mysql_fetch_assoc($result)) {

        $mod_id		= $row['mod_id'];
        $mod_name	= $row['mod_name'];

        $sql = "SELECT modpages_rank
                        FROM module_pages
                        WHERE page_id = '$id' AND mod_id = '$mod_id'";
        $mp_rank = fetch_value($sql);

        $sel = "";
        if ($mp_rank != "") {
            $sel = "checked";
        }

        $modules .= "<input type=\"hidden\" name=\"mod_id[]\" value=\"$mod_id\" $sel>
                    <input name=\"mp_rank[]\" type=\"text\" class=\"input-text\" style=\"width:35px;margin-bottom:5px;\" value=\"$mp_rank\"> $mod_name<br/>";

    }
    $modules_content = <<< HTML
                    Select the modules you would like included on this page by entering a rank number for each (Leave those you don't want)<br/><br/>
            $modules
HTML;
    ##------------------------------------------------------------------------------------------------------
    ## Slideshows


    $sql = "SELECT *
            FROM images_groups";
    $result = run_query($sql);
    $slide1 = "<select id=\"ab\" name=\"imggrp_id\" style=\"width:200px\"><option value=\"NULL\" $sel>Please Select Slideshow</option>";
    $slide3 = "<select name=\"page_pictures_id\"><option value=\"NULL\" $sel>Please Select Slideshow</option>";
    while($row = mysql_fetch_assoc($result)) {

        $slidegroup_id		= $row['imggrp_id'];
        $slidegroup_name	= $row['imggrp_name'];

        $sel1 = ($slidegroup_id == $imggrp_id) ? 'selected' : '';
        $sel3 = ($slidegroup_id == $page_pictures_id) ? 'selected' : '';
        $slide1 .= "<option value=\"$slidegroup_id\" $sel1>$slidegroup_name</option>";
        $slide3 .= "<option value=\"$slidegroup_id\" $sel3>$slidegroup_name</option>";
    }
    $slide1 .= "</select>";
    $slide3 .= "</select>";
    
    $sql = "SELECT *
            FROM images_groups";
    $result = run_query($sql);
    $slide2 = "<select name=\"image_gallery_grp\" style=\"width:200px\"><option value=\"NULL\" $sel>Select Gallery Group</option>";
    while($row = mysql_fetch_assoc($result)) {

        $slidegroup_id		= $row['imggrp_id'];
        $slidegroup_name	= $row['imggrp_name'];

        $sel = "";
        if ($slidegroup_id == $imggrp_id_footer) {
            $sel = "selected";
        }
        $slide2 .= "<option value=\"$slidegroup_id\" $sel>$slidegroup_name</option>";
    }
    $slide2 .= "</select>";

//List of countries--------------------------------------------

    $sql = "SELECT `name`,`id` FROM `country` WHERE `status` = 'A' ORDER BY `rank`";
    $country_arr = fetch_all($sql);
    $country_dd = '';

    if(!empty($country_arr))
    {
        $country_dd = '<select name="country" style="width:200px;"><option value="">Select Country (if applicable)</option>';

        foreach ($country_arr as $country) {

            if($country['id'] == $country_id){$sel = 'selected';}else{$sel = '';}
            $country_dd .= '<option '.$sel.' value="'.$country['id'].'">'.$country['name'].'</option>';
        }

        $country_dd .= '</select>';
    }

//List of tour categories--------------------------------------------

    $sql = "SELECT `name`,`id` FROM `tour_category` WHERE `status` = 'A' AND `parent_id` = 0 ORDER BY `rank`";
    $cat_arr = fetch_all($sql);
    $cat_dd = '';

    if(!empty($cat_arr))
    {
        $cat_dd = '<select name="category_id" style="width:200px;"><option value="">Select Tour Category (if applicable)</option>';

        foreach ($cat_arr as $cat) {

            if($cat['id'] == $category_id){$sel = 'selected';}else{$sel = '';}
            $cat_dd .= '<option '.$sel.' value="'.$cat['id'].'">'.$cat['name'].'</option>';
        }

        $cat_dd .= '</select>';
    }


    ##------------------------------------------------------------------------------------------------------
    ## Templates


    $sql = "SELECT *
                FROM templates_normal
                WHERE tmpl_showincms = 'Y'
                AND (tmpl_mobile = '' OR tmpl_mobile IS NULL) ";
    $result = run_query($sql);
    $templatelist = "<select name=\"tmpl_id\" style=\"width:200px\">";
    while($row = mysql_fetch_assoc($result)) {

        $temptmpl_id		= $row['tmpl_id'];
        $temptmpl_name		= $row['tmpl_name'];

        $sel = "";
        if ($tmpl_id == $temptmpl_id) {
            $sel = "selected";
        }
        $templatelist .= "<option value=\"$temptmpl_id\" $sel>$temptmpl_name</option>";
    }
    $templatelist .= "</select>";


    $mobile_page = '<select name="mobile_page" id="mobile_page" style="width:205px">';
    $mobile_page .='<option value="">Select Mobile Page</option>';
    $mobile_page .= page_list(true, 0, $page_mobile_id, 'page_mobile_id');
    $mobile_page .= '</select>';

    $max_coulmns_dd = generate_num_dd(1, MAX_COLUMNS);
    
    // $scripts_ext .= "<script src=\"$htmladmin/js/script.js\" async onload=\"app.init({baseUrl:'$htmladmin'})\"></script>";

    ##------------------------------------------------------------------------------------------------------
    ## Content tabs

    $content_rows = fetch_all("SELECT cr.`id`, cr.`rank`
        FROM `content` c
        LEFT JOIN `content_row` cr
        ON(c.`id` = cr.`content_id`)
        WHERE c.`page_id` = '{$id}' 
        AND c.`module_id` = '1'
        ORDER BY cr.`rank`
    ");
    $content_view = '';
    if (count($content_rows) > 0) 
    {
        foreach ($content_rows as $inx => $content_row)
        {
$content_view .= <<< H

        <div class="row sortable-item clear" id="row-{$inx}">
H;

            $rank = $inx+1;
            $row_columns = fetch_all("SELECT `content`, `css_class`, `rank` FROM `content_column` WHERE `content_row_id` = '{$content_row['id']}' ORDER BY `rank`");

            foreach ($row_columns as $cindx => $row_column)
            {
                $content_view .= <<< H

                <div class="{$row_column['css_class']} res-col sortable-item" id="col-{$inx}-{$cindx}">
                    <ul class="action">
                        <li><input type="checkbox" class="col-merge" value="1"><li/>
                        <li><a href="#" title="drag to change the rank" class="move-col"><i class="glyphicon glyphicon-move"></i></a><li/>
                        <li><a href="#" data-to-remove=".res-col" title="click to remove section"  class="remove-col"><i class="glyphicon glyphicon-remove"></i></a><li/>
                    </ul>
                    <div class="editable-column-content" title="Click to edit this content section.">
                        <textarea id="content-{$inx}-{$cindx}" name="content-{$inx}-text[]">{$row_column['content']}</textarea>
                    </div>
                    <input type="hidden" value="{$row_column['rank']}" class="col-rank" name="content-{$inx}-rank[]">
                    <input type="hidden" value="{$row_column['css_class']}" name="content-{$inx}-class[]" class="col-cls">
                </div>

H;
            }

            

           $content_view .= <<< H
            <input type="hidden" value="{$inx}" name="row-index[]">
            <input type="hidden" value="{$content_row['rank']}" name="row-rank[]" class="row-rank">
            <div class="clear"></div>
            <ul class="roww action">
                <li><a href="#" title="add new column to this row" class="add-col"><i class="glyphicon glyphicon-plus-sign"></i></a><li/>
                <li><a href="#" title="drag to change the rank" class="move-col"><i class="glyphicon glyphicon-move"></i></a><li/>
                <li><a href="#" title="click to remove row" data-to-remove=".row"  class="remove-col"><i class="glyphicon glyphicon-remove"></i></a><li/>
            </ul>
        </div>

H;
        }
    }

    $main_content = <<< HTML
        <h2>Heading</h2>
        <p>
            <input name="page_heading" type="text" id="page_heading" style="width:600px;" value="$page_heading">
        </p>       
        <p>Add new row with &nbsp;<select name="column-num" id="column-num" class="column-num">
            {$max_coulmns_dd}
        </select> &nbsp;columns. <button type="button" class="add-row">Go</button></p>

        <div id="grid-holder">
            
            <script type="text/html" id="row-template">
                    <div class="row sortable-item clear" id="row-<%= rowIndex %>">
                        <%
                            var colCls = 'col-xs-12';
                            var maxCols = app.config.maxCols;
                           if(numColumns > 1)  colCls = colCls+' col-sm-'+(maxCols/2);
                            if(numColumns > 1) colCls = colCls+' col-md-'+(maxCols/numColumns);
                        %>
                        <%  for (var i=1; i <= numColumns; i++){ i = (colIndex) ? colIndex : i %>
                            <div class="<%= colCls %> res-col sortable-item" id="col-<%= rowIndex %>-<%= i %>">
                                <ul class="action">
                                    <li><input type="checkbox" class="col-merge" value="1"><li/>
                                    <li><a href="#" title="drag to change the rank" class="move-col"><i class="glyphicon glyphicon-move"></i></a><li/>
                                    <li><a href="#" title="click to remove section" data-to-remove=".res-col"  class="remove-col"><i class="glyphicon glyphicon-remove"></i></a><li/>
                                </ul>
                                <div class="editable-column-content" title="Click to edit this content section.">
                                    <textarea id="content-<%= rowIndex %>-<%= i %>" name="content-<%= rowIndex %>-text[]">Column <%= i %></textarea>
                                </div>
                                <input type="hidden" value="<%= i %>" class="col-rank" name="content-<%= rowIndex %>-rank[]">
                                <input type="hidden" value="<%= colCls %>" name="content-<%= rowIndex %>-class[]" class="col-cls">
                                
                            </div>
                        <% }%>

                        <input type="hidden" value="<%= rowIndex %>" name="row-index[]">
                        <input type="hidden" value="<%= rowIndex + 1 %>" name="row-rank[]" class="row-rank">
                        <div class="clear"></div>
                        <ul class="roww action">
                            <li><a href="#" title="add new column to this row" class="add-col"><i class="glyphicon glyphicon-plus-sign"></i></a><li/>
                            <li><a href="#" title="drag to change the rank" class="move-col"><i class="glyphicon glyphicon-move"></i></a><li/>
                            <li><a href="#" title="click to remove row" data-to-remove=".row"  class="remove-col"><i class="glyphicon glyphicon-remove"></i></a><li/>
                        </ul>
                    </div>
            </script>
            {$content_view}
        </div>

        
HTML;

    ##------------------------------------------------------------------------------------------------------
    ## Meta tags tab content

    $meta_content = <<< HTML
                        <table width="100%" border="0" cellspacing="0" cellpadding="4" >
                            <tr>
                                <td width="150">Title</td>
                                <td><input name="page_title" type="text" id="page_title" value="$page_title" style="width:600px;" /></td>
                            </tr>
                            <tr>
                                <td>Meta Description <span class="tooltip" title="This description is hidden from the user but useful to some search engines and appears in search results"></span></td>
                                <td>
                                    <textarea name="page_mdescr" style="width:600px; font-family: sans-serif, Verdana, Arial, Helvetica;" rows="5" id="page_mdescr">$page_mdescr</textarea>
                                </td>
                            </tr>
                        </table>
HTML;
    //Making the list of Parent
    function generateParentList($list,$parent_id = 0,$disabled = ""){
        global $generation, $pages_generations, $id, $page_parentid;
        if($parent_id==0){
            $list .= <<< HTML
                    <option value="0" $selected>This is the parent</option>
HTML;
        }
        $sql = "SELECT page_id, page_parentid, page_url, page_title, page_label
                FROM general_pages
                WHERE page_parentid = '$parent_id'
                AND page_status = 'A'
                AND (page_mobile IS NULL OR page_mobile = '')
                ORDER BY page_rank ASC";
        $result = run_query($sql);

        $generation++;
        $indentation = '';
        for($i=1;$i<$generation;$i++){ $indentation .= '......'; }

        while($row = mysql_fetch_assoc($result)) {
            // Set all of this page's values
            $result_page_id             = $row['page_id'];
            $result_page_parentid       = $row['page_parentid'];
            $result_page_url            = $row['page_url'];
            $result_page_title          = $row['page_title'];
            $result_page_label          = $row['page_label'];
            ## if this page's label is empty, then set it to be the page's title
            if($result_page_label==''){ $result_page_label = $result_page_title; }
            ## if this page's label is STILL empty, then set it to be the page's url
            if($result_page_label==''){ $result_page_label = $result_page_url;   }

            // Figure out whether or not to disable this page from being selected
            if( ($generation        >= ($pages_generations)   ) ||            ## if this page's generation exceeds the generation limit in the CMS settings
                ($result_page_id    == $id                      ) ||            ## if this page is the page that is currently being edited
                ($disabled          != ''                       )               ## if this page's parent is the page that is currently being edited
            ){
                $disabled = "disabled=\"disabled\"";                            ## disable the page from being selected
            }else{
                $disabled = "";                                                 ## the page can be selected
            }

            // Figured out whether or not to initially select this page on CMS-page-load
            if($page_parentid == $result_page_id){                              ## if the page's id matches the parent id of the page being edited
                $selected = "selected=\"selected\"";                            ## make this page initially selected on CMS-page-load
                $boldstart = "<b>";
                $boldend = "</b>";
            }else{
                $selected = "";                                                 ## do not initially select this page
                $boldstart = "";
                $boldend = "";
            }

            // Add this page to the dropdown menu
            $list .= <<< HTML
                    <option value="$result_page_id" $disabled $selected>$indentation$result_page_label</option>
HTML;
            // Get all of the children of this page.
            // put the $disabled parameter to make sure that if this page can not be selected, then all of its childeren should not be able to be selected.
            $list = generateParentList($list,$result_page_id,$disabled);
            // Reset the disabled variable to 'enabled' (effectively) so that all of the siblings of this page CAN be selected
            $disabled = '';
        }
        $generation--;
        return $list;
    }


    if($id != 1){
        $parentlist ="<select name=\"page_parentid\" style=\"width:200px\">";
        $parentlist = generateParentList($parentlist);
        $parentlist .= "</select>";
    }else{
        $parentlist = 'Sorry, this page can not be a child.';
    }
    
    $sql = "SELECT cmsset_value FROM cms_settings WHERE cmsset_name='pages_generations' LIMIT 1";
    $pagegenerations = fetch_value($sql);
    if($pagegenerations>1){
        $parentlist = <<< HTML
        <tr>
            <td width="100">Parent of this page</td>
            <td>$parentlist</td>
        </tr>
HTML;
    }else{
        $parentlist = '';
    }



    ##------------------------------------------------------------------------------------------------------
    ## Settings tab content
    
    
    if($page_slideshow_thumbs == 'Y'){
        $c = 'checked="checked"';
    }
    
    if($page_slideshow_thumbs == 'N'){
        $cc = 'checked="checked"';
    }
    
    if($page_parentid == 0){
        
        $radios = <<< HTML
          <tr style="width:100px;">
            <td style="width:40px;">Children Pages<span class="tooltip" title="Select yes if want to display all children pages of this pages."></span></td>
            <td style="width:10px;">
                <label for="yes">Yes</label>
                <input name="thumbnails" type="radio" $c value="Y" id="yes" />
            </td>    
            <td >  
                <label for="no">No</label>
                <input name="thumbnails" type="radio" $cc value="N" id="no" />
            </td>
        </tr>
        
HTML;
        
    }
    
    if($page_cmslock_url == 'Y'){
        $url = <<< HTML
        <tr>
            <td></td>
            <td><input name="page_url" type="hidden" id="page_url" value="$page_url"  /> <span id="page_url_msg"></span></td>
        </tr>  
HTML;
    }else{
        $url = <<< HTML
        <tr>
            <td width="200">URL</td>
            <td><input name="page_url" type="text" id="page_url" value="$page_url" style="width:200px;" /> <span id="page_url_msg"></span></td>
        </tr>   
HTML;
    }
    $settings_content = <<< HTML
                        <table width="100%" border="0" cellspacing="0" cellpadding="4">
                            $url

                            <tr>
                                <td width="200">CMS Page Label</td>
                                <td><input name="page_label" type="text" id="page_label" value="$page_label" style="width:200px;"/></td>
                            </tr>
                            
                            <tr>
                                <td width="200">Menu <span class="tooltip" title="Leave empty if you do not want it to appear on the main menu"></span></td>
                                <td><input name="page_menu" type="text" id="page_menu" value="$page_menu" style="width:200px;" /></td>
                            </tr>
                            <tr>
                                <td width="200">Footer Menu <span class="tooltip" title="Leave empty if you do not want it to appear on the footer menu"></span></td>
                                <td><input name="page_footer" type="text" id="page_footer" value="$page_footer" style="width:200px;" /></td>
                            </tr>
                            <tr>
                                <td width="200">Slideshow</td>
                                <td>$slide1</td>
                            </tr>
                             <tr>
                                <td width="200">Gallery</td>
                                <td>$slide2</td>
                            </tr>
                            $parentlist
                            <tr>
                                <td width="100">Template</td>
                                <td>$templatelist</td>
                            </tr>
                            <tr>
                                <td width="100">Country</td>
                                <td>$country_dd</td>
                            </tr>
                            <tr>
                                <td width="100">Tour Main Category</td>
                                <td>$cat_dd</td>
                            </tr>
                            <tr>
                                <td width="100">Use time-based publishing?</td>
                                <td><input name="page_timebase_publishing" type="checkbox" style="margin-left:0;" id="page_timebase_publishing" value="Y"$ptbpY></td>
                            </tr>

                            <tr id="publish" $class>
                                <td width="100">Publish Date</td>
                                <td><input name="page_publish_date" type="text" style="width:200px;" id="page_publish_date" value="$page_publish_date"></td>

                                <td width="100">Publish Time</td>
                                <td><input name="page_publish_time" type="text" style="width:200px;" id="page_publish_time" value="$page_publish_time"></td>
                            </tr>
                            <tr id="hide" $class>
                               <td width="100">Hide Date</td>
                                <td><input name="page_hide_date" type="text" style="width:200px;" id="page_hide_date" value="$page_hide_date"></td>

                                <td width="100">Hide Time</td>
                                <td><input name="page_hide_time" type="text" style="width:200px;" id="page_hide_time" value="$page_hide_time"></td>
                            </tr>
                           
                        </table>

                          <script>
                            $(function(){
                                $('#page_publish_date, #page_hide_date').datepicker({
                                    dateFormat:'dd/mm/yy'
                                });

                                $('#page_publish_time').timepicker({
                                    hour:{$publish_time_arr[0]},
                                    minute:{$publish_time_arr[1]},
                                    second:{$publish_time_arr[2]},
                                    showSecond: true,
                                    timeFormat: 'hh:mm:ss',
                                    showTime:false
                                });

                                $('#page_hide_time').timepicker({
                                    hour:{$hide_time_arr[0]},
                                    minute:{$hide_time_arr[1]},
                                    second:{$hide_time_arr[2]},
                                    showSecond: true,
                                    timeFormat: 'hh:mm:ss',
                                    showTime:false
                                });
                            });

                            $('#page_timebase_publishing').on('click', function(){
                                if($(this).is(":checked")){
                                    $('#publish, #hide').removeClass('hidden');
                                }else{
                                     $('#publish, #hide').addClass('hidden');
                                }
                            });
                        </script>
HTML;

    ##------------------------------------------------------------------------------------------------------
    ## Privacy tab content

        ##------------------------------------------------------------------------------------------------------
        ## Access Level List - Public or Private


        $accesslevellist = "<select name=\"page_accesslevel\">";
        $selected = ($page_accesslevel == 'public')?'selected="selected"':'';
        $accesslevellist .= "<option value=\"public\" $selected>Public</option>";
        $selected = ($page_accesslevel == 'private')?'selected="selected"':'';
        $accesslevellist .= "<option value=\"private\" $selected>Private</option>";
        $accesslevellist .= "</select>";

        $privacy_content = <<< HTML
                            <table width="100%" border="0" cellspacing="0" cellpadding="4">
                                <tr>
                                    <td width="100">Access Level <span class="tooltip" title="Set this option to 'Private' if you wanted restricted access only to viewers with a login."></span></td>
                                    <td>$accesslevellist</td>
                                </tr>
                            </table>
HTML;
        ##------------------------------------------------------------------------------------------------------
        ## Cache List - Public, Private, No-Cache, No-Store

        $cachelist = "<select name=\"page_mcache\">";
        $selected = ($page_mcache == 1)?'selected="selected"':'';
        $cachelist .= "<option value=\"1\" $selected>Public - may be cached in public shared caches</option>";
        $selected = ($page_mcache == 2)?'selected="selected"':'';
        $cachelist .= "<option value=\"2\" $selected>Private - may only be cached in private cache</option>";
        $selected = ($page_mcache == 3)?'selected="selected"':'';
        $cachelist .= "<option value=\"3\" $selected>Do not cache</option>";
        $selected = ($page_mcache == 4)?'selected="selected"':'';
        $cachelist .= "<option value=\"4\" $selected>Do not store - may be cached but not stored</option>";
        $cachelist .= "</select>";

        ##------------------------------------------------------------------------------------------------------
        ## Robot List - Index, Follow, No-Index, No-Follow, None, No-archive
//# RENAME ROBOTS
//        switch ($page_arr['page_mrobots']) {
//            case 1:     $page_arr['page_mrobots'] = "all";               break;
//            case 2:     $page_arr['page_mrobots'] = "none";              break;
//            case 3:     $page_arr['page_mrobots'] = "noindex, follow";   break;
//            case 4:     $page_arr['page_mrobots'] = "index, nofollow";   break;
//            case 5:     $page_arr['page_mrobots'] = "noarchive";         break;
//        }
   // robots list

        $accesslevellist = "<select name=\"page_accesslevel\">";
        $selected = ($page_accesslevel == 'public')?'selected="selected"':'';
        $accesslevellist .= "<option value=\"public\" $selected>Public</option>";
        $selected = ($page_accesslevel == 'private')?'selected="selected"':'';
        $accesslevellist .= "<option value=\"private\" $selected>Private</option>";
        $accesslevellist .= "</select>";

        $robotslist = '';

        $checked = ($page_mrobots == 1 || $page_mrobots == '')? ' checked="checked"':'';
        $robotslist .= <<< H
        <div title="Use this if you want to let search engines do their normal job.">
            <label class="checkbox-inline">
            <input type="radio" id="robots_indexfollow" value="1" style="margin:2px 0 0 8px;vertical-align:text-top;" name="page_mrobots"{$checked}> Index and Follow (Default)
            </label>
        </div>
H;
$checked = ($page_mrobots == 2)? ' checked="checked"':'';
        $robotslist .= <<< H
        <div title="This is for sections of a site that shouldn't be indexed and shouldn't have links followed.">
            <label class="checkbox-inline">
            <input type="radio" id="robots_noindexnofollow" value="2" style="margin:2px 0 0 8px;vertical-align:text-top;" name="page_mrobots"{$checked}> Do not Index or Follow
            </label>
        </div>
H;
$checked = ($page_mrobots == 3)? ' checked="checked"':'';
        $robotslist .= <<< H
        <div title="Search engine robots can follow any links on this page but will not include this page.">
            <label class="checkbox-inline">
            <input type="radio" id="robots_noindexfollow" value="3" style="margin:2px 0 0 8px;vertical-align:text-top;" name="page_mrobots"{$checked}> Follow, but do not Index
            </label>
        </div>
H;
$checked = ($page_mrobots == 4)? ' checked="checked"':'';
        $robotslist .= <<< H
        <div title="Search engine robots should include this page but not follow any links on this page.">
            <label class="checkbox-inline">
            <input type="radio" id="robots_indexnofollow" value="4" style="margin:2px 0 0 8px;vertical-align:text-top;" name="page_mrobots"{$checked}> Index but do not Follow
            </label>
        </div>
H;
$checked = ($page_mrobots == 5)? ' checked="checked"':'';
        $robotslist .= <<< H
        <div title="Useful if the content changes frequently: headlines, auctions, etc. The search engine still archives the information, but won't show it in the results.">
            <label class="checkbox-inline">
            <input type="radio" id="robots_noarchive" value="5" style="margin:2px 0 0 8px;vertical-align:text-top;" name="page_mrobots"{$checked}> Do not archive
            </label>
        </div>
H;

        $privacy_content = <<< HTML
                            <table width="100%">
                                <tr>
                                    <td colspan="2">Edit the following settings with caution. If in doubt, leave them in their default values</td>
                                </tr>
                                <tr>
                                    <td colspan="2"><p>&nbsp;</p></td>
                                </tr>
                                <tr>
                                   
                                    <td valign="top">Robots <span data-toggle="tooltip" data-placement="right" title="Restrict search engines from archiving this page, following links on this page etc. Hover over the selections to the right to see what they mean."></span></td>
                                   <td>$robotslist</td>
                                </tr>
                            </table>
HTML;

    ##------------------------------------------------------------------------------------------------------
    ## Quick Links tab content

    $pagelist="";
    $sql = "SELECT page_id
            FROM general_quicklinks
            WHERE quick_page_id = '$id'";
    $page_linkto_array = fetch_all($sql);
    $page_linkto_array = array_extract($page_linkto_array, 'page_id');

    $sql = "SELECT *
            FROM general_pages
            WHERE page_id != '$id'
            AND page_status = 'A'
            ORDER BY page_rank";

    $result = run_query($sql);
    while($row_temp = mysql_fetch_assoc($result)) {
        $page_id       = $row_temp['page_id'];
        $page_label    = $row_temp['page_label'];
        $page_heading  = $row_temp['page_heading'];
        $page_linkname = $row_temp['page_linkname'];
        $page_title    = $row_temp['page_title'];

        if($page_label=='') {
            $page_label = $page_heading;
        }
        if($page_label=='') {
            $page_label = $page_title;
        }

       $checked = in_array($page_id, $page_linkto_array) ? 'checked="checked"' : '';
       $pagelist .= "<li><label class=\"checkbox-inline\"><input type=\"checkbox\" name=\"quicklink_id[]\" value=\"$page_id\" $checked> <span>$page_label</span></label></li>";
       
    }

    $link_content = <<< HTML
                    Choose other pages to add in the quicklinks section (max. 4)<br>
                    <br>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                            <td valign="top">
                            <ul class="list-grid">
                                 $pagelist
                            </ul>
                           
                            </td>
                        </tr>
                    </table>
HTML;

    ##------------------------------------------------------------------------------------------------------
    ## Snippets tab content

    $pagelist="";
    $sql = "SELECT snippet_page_linkto
                FROM general_snippets
                WHERE snippet_page_id = '$id'";
    $page_linkto_array = fetch_all($sql);
    $page_linkto_array = array_extract($page_linkto_array, 'snippet_page_linkto');
    $sql = "SELECT *
                FROM general_pages
                WHERE page_status='A' AND page_parentid = '1' ORDER BY page_rank";

    $result = run_query($sql);
    while($row = mysql_fetch_assoc($result)) {
        $ipage_id       = $row['page_id'];
        $ipage_url      = $row['page_url'];
        $ipage_label    = $row['page_label'];
        $ipage_linkname = $row['page_linkname'];
        $ipage_title    = $row['page_title'];

        if(in_array($ipage_id, $page_linkto_array)) {
            $pagelist.="<input type=\"checkbox\" name=\"esid[]\" value=\"$ipage_id\" checked> $ipage_title <br>";
        }else {
            $pagelist.="<input type=\"checkbox\" name=\"esid[]\" value=\"$ipage_id\"> $ipage_title <br>";
        }
        if($ipage_id==1) {
            $sql = "SELECT *
                        FROM general_pages
                        WHERE page_id != '$id' AND page_parentid != '1' AND page_status = 'A'
                        ORDER BY page_rank";
        }else {
            $sql = "SELECT *
                        FROM general_pages
                        WHERE page_id != '$id' AND page_parentid = '$ipage_id' AND page_parentid != '1' AND page_status = 'A'
                        ORDER BY page_rank";
        }

        $result = run_query($sql);
        while($row_temp = mysql_fetch_assoc($result)) {
            $ipage_id               = $row_temp['page_id'];
            $ipage_url              = $row_temp['page_url'];
            $ipage_label            = $row_temp['page_label'];
            $ipage_linkname         = $row_temp['page_linkname'];
            $ipage_title 		= $row_temp['page_title'];

            if(in_array($ipage_id, $page_linkto_array)) {
                $pagelist.="&nbsp; &nbsp; &nbsp; &nbsp;<input type=\"checkbox\" name=\"esid[]\" value=\"$ipage_id\" checked> $ipage_title <br>";
            }else {
                $pagelist.="&nbsp; &nbsp; &nbsp; &nbsp;<input type=\"checkbox\" name=\"esid[]\" value=\"$ipage_id\"> $ipage_title <br>";
            }
        }
    }
    $link_snippets="Choose other pages to add in the snippets section<br><br>
                    <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">
                        <tr>
                            <td valign=\"top\">$pagelist</td>
                        </tr>
                    </table>";

    


 $link_snippets = <<< HTML
            <table width="100%" cellpadding="6" cellspacing="0" border="0">
                <tr>
                    <td valign="top"><label for="page_quicklink_heading">Quicklink Heading:</label></td>
                    <td valign="top"><input type="text" name="page_quicklink_heading" id="page_quicklink_heading" value="$page_quicklink_heading" style="width:400px;"></td>
                </tr>
                <tr>
                    <td valign="top"><label for="page_quicklinksnippet">Quicklink Text (max 280 char.):</label></td>
                    <td valign="top">
                        <textarea type="text" maxlength="280" name="page_quicklinksnippet" id="page_quicklinksnippet" style="width:400px;height:100px;">$page_quicklinksnippet</textarea>
                    </td>
                </tr>
                <tr>
                    <td valign="top"><label for="page_quicklink_image">Quicklink Image (1700px X 500px):</label></td>
                    <td valign="top">
                        <input name="page_quicklink_image" type="text" id="page_quicklink_image" value="$page_quicklink_image" style="margin-right:5px;width:282px;float:left;" />
                        <input type="button" onclick="openFileBrowser('page_quicklink_image')" style="padding:1px 5px;" value="Browse">
                        <input type="button" value="clear" onclick="clearValue('page_quicklink_image')"><br>
                    </td>
                </tr>
            </table>

HTML;

    ##------------------------------------------------------------------------------------------------------
    ## tab arrays and build tabs

    $temp_array_menutab = array();

    $temp_array_menutab['Content']        = $main_content;
    $temp_array_menutab['Modules']        = $modules_content;
    $temp_array_menutab['Meta Tags']      = $meta_content;
    // $temp_array_menutab['Quicklinks']     = $link_content;
    // $temp_array_menutab['Quicklink Info'] = $link_snippets;
    $temp_array_menutab['Privacy / SEO']  = $privacy_content;
    $temp_array_menutab['Settings']       = $settings_content;

    $counter = 0;
    $tablist ="";
    $contentlist="";

    foreach($temp_array_menutab as $key => $value) {
        $tablist.= "<li><a href=\"#tabs-".$counter."\">".$key."</a></li>";
        $contentlist.=" <div id=\"tabs-".$counter."\">".$value."</div>";
        $counter++;
    }

    $tablist="<div id=\"tabs\"><ul>".$tablist."</ul>".$contentlist."</div>";

    ##------------------------------------------------------------------------------------------------------
    ## produce the page

    $page_contents = <<< HTML
            <form action="$htmladmin/index.php" method="post" name="pageList" enctype="multipart/form-data">
            $tablist
                <input type="hidden" name="action" value="" id="action">
                <input type="hidden" name="do" value="$do">
                <input type="hidden" name="id" value="$id">
                <input type="hidden" name="lpage_id" value="$lpage_id">
            </form>
HTML;

    require "resultPage.php";
    echo $result_page;
    exit();
}
?>