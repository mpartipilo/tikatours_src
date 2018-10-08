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

    //Get main categories
    $sql = "SELECT `id`,`name` FROM $tbl_name WHERE `status` = 'A' AND `parent_id` = 0 ORDER BY `rank`";
    $cat_arr = fetch_all($sql);

    $cat_dd = '';
    if(!empty($cat_arr))
    {
        $cat_dd = '<select style="width:300px;" name="parent_id" id="parent_id"><option value="">Select main category</option>';

        foreach ($cat_arr as $cat) {
            
            if($cat['id'] == $parent_id){$sel = 'selected';}else{$sel = '';}

            $cat_dd .= <<<H

            <option {$sel} value="{$cat['id']}">{$cat['name']}</option>

H;
        }

        $cat_dd .= '</select>';
    }

    

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
    ## Slideshows

    $sql = "SELECT * FROM images_groups";
    $result = run_query($sql);

    $slideshow_list = "<select name=\"slideshow_id\" style=\"width:300px;\"><option value=\"NULL\" $sel>Select Slideshow</option>";
    while($row = mysql_fetch_assoc($result)) {

        $slidegroup_id      = $row['imggrp_id'];
        $slidegroup_name    = $row['imggrp_name'];

        $sel3 = ($slidegroup_id == $slideshow_id) ? 'selected' : '';
        $slideshow_list .= "<option value=\"$slidegroup_id\" $sel3>$slidegroup_name</option>";
    }

    $slideshow_list .= "</select>";

       ##------------------------------------------------------------------------------------------------------
       ## Settings tab content

    $settings_content = <<< HTML
        <table width="100%" border="0" cellspacing="0" cellpadding="8">
            <tr>
                <td width="200">Sub Category Name:</td>
                <td colspan="3"><input name="name" type="text" id="name" value="$name" style="width:300px;" /></td>
            </tr>
            <tr>
                <td width="200">Main Category:</td>
                <td colspan="3">
                    $cat_dd
                </td>
            </tr>
            <tr>
                <td width="200">Slideshow:</td>
                <td colspan="3">
                    $slideshow_list
                </td>
            </tr>
            <tr>
                <td width="200">Heading:</td>
                <td colspan="3"><input name="heading" type="text" id="heading" value="$heading" style="width:300px;" /></td>
            </tr>
            <tr>
                <td width="200">Label:</td>
                <td colspan="3"><input name="label" type="text" id="label" value="$label" style="width:300px;" /></td>
            </tr>
            <tr>
                <td width="200">URL:</td>
                <td colspan="3"><input name="url" type="text" id="url" value="$url" style="width:300px;" /></td>
            </tr>
            <tr>
                <td width="200" valign="top">Image:</td>
                <td colspan="3">
                    <input name="image_path" type="text" id="image_path" value="$image_path" style="margin-right:5px;width:300px;float:left;" />
                    <input type="button" onclick="openFileBrowser('image_path')" style="padding:1px 5px;" value="Browse">
                    <input type="button" value="clear" onclick="clearValue('image_path')"><br>
                    <div><small>suggested size:H200px X W700px - JPG format</small></div>
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
                <td width="200" valign="top">Short Description <br>(max 200 char.):</td>
                <td colspan="3"><textarea maxlength="200" name="short_descr" id="short_descr" style="width:600px;height:100px;">$short_descr</textarea></td>
            </tr>
            <tr>
                <td width="200" valign="top">Page Content:</td>
                <td colspan="3">
                    <textarea name="content" id="content" style="width:800px;height:200px;">$content</textarea>
                    <script type="text/javascript">
                        CKEDITOR.replace( 'content',
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


$max_coulmns_dd = generate_num_dd(1, MAX_COLUMNS);


    ##------------------------------------------------------------------------------------------------------
    ## Content tabs

    $content_rows = fetch_all("SELECT cr.`id`, cr.`rank`
        FROM `content` c
        LEFT JOIN `content_row` cr
        ON(c.`id` = cr.`content_id`)
        WHERE c.`page_id` = '{$id}' 
        AND c.`module_id` = '100'
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
       ## tab arrays and build tabs

    $temp_array_menutab             = array();
    $temp_array_menutab ['Details'] = $settings_content;
    $temp_array_menutab['Responsive Content']        = $main_content;

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
