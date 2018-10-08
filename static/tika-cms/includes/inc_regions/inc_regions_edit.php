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

    //Get countries
    $sql = "SELECT `id`,`name` FROM `country` WHERE `status` = 'A' ORDER BY `rank`";
    $country_arr = fetch_all($sql);

    $country_dd = '';
    if(!empty($country_arr))
    {
        $country_dd = '<select style="width:300px;" name="country_id" id="country_id"><option value="">Select country</option>';

        foreach ($country_arr as $country) {
            
            if($country['id'] == $country_id){$sel = 'selected';}else{$sel = '';}

            $country_dd .= <<<H

            <option {$sel} value="{$country['id']}">{$country['name']}</option>

H;
        }

        $country_dd .= '</select>';
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
       ## Settings tab content

    $settings_content = <<< HTML
        <table width="100%" border="0" cellspacing="0" cellpadding="8">
            <tr>
                <td width="200">Region Name:</td>
                <td colspan="3"><input name="name" type="text" id="name" value="$name" style="width:300px;" /></td>
            </tr>
            <tr>
                <td width="200">Country:</td>
                <td colspan="3">
                    $country_dd
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
                    <div><small>suggested size:H200px X W300px - JPG format</small></div>
                </td>
            </tr>
            <tr>
                <td width="200" valign="top">Short Description <br>(max 200 char.):</td>
                <td colspan="3"><textarea maxlength="200" name="short_descr" id="short_descr" style="width:600px;height:100px;">$short_descr</textarea></td>
            </tr>
            <tr>
                <td width="200">Meta Title:</td>
                <td colspan="3"><input name="title" type="text" id="title" value="$title" style="width:300px;" /></td>
            </tr>
            <tr>
                <td width="200" valign="top">Meta Description:</td>
                <td colspan="3"><textarea name="meta_descr" id="meta_descr" style="width:600px;height:100px;">$meta_descr</textarea></td>
            </tr>
    </table>
HTML;

$content_content = <<< HTML
        <table width="100%" border="0" cellspacing="0" cellpadding="8">
            <tr>
                <td width="200" valign="top">Page Content:</td>
            </tr>
            <tr>
                <td colspan="3">
                    <textarea name="content" id="content" style="width:900px;height:400px;">$content</textarea>
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
        AND c.`module_id` = '36'
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



// MAP & LOCATION
if($latitude && $longitude)
{
    $marker   = "var markercoords = [$latitude,$longitude];";
   
    $mylatlng = "var myLatLng = new google.maps.LatLng($latitude, $longitude);";
    $hidemap  = 'display:none';
}
else
{
    $marker   = "var markercoords = [-36.848460, 174.763332];";
    $mylatlng = "var myLatLng = new google.maps.LatLng(-36.848460, 174.763332);";
    $hidemap  = 'display:block';
}

$map_html = <<< H

<table style="width:100%;">
    <tbody>
    <tr>
        <td valign="top" style="width:180px;">
            <h3>Physical Address</h3>
            <textarea style="height:75px;resize:none;width:150px" name="address" id="address">$formatted_address</textarea><br>
            <button style="margin-top:8px;" type="button" id="updatecoords">Update pin</button><br><br>
        </td>
        <td valign="top"><h3>Map Location</h3>
            <span style="color:#777;font-size:11px;">
                If the location of the pin below is incorrect, then simply drag and drop it to the correct location
            </span>
            <span style="color:#777;font-size:11px;display:block;margin:2px 0 5px 0;">
                If map canvas is not loaded correctly, Please <a href="#" id="reload-map">click here</a> to reload again.
            </span>
            <input type="hidden" id="latitude" name="latitude" value="$latitude">
            <input type="hidden" id="longitude" name="longitude" value="$longitude">
            <div id="map_overlay1" style="height:305px;line-height:305px;opacity: 0.5;color:#000;position:absolute;z-index:9999;text-align:center;width:750px;font-size:20px;$hidemap">Please enter an address and select 'update pin'</div>
            <div id="map_overlay2" style="background:#fff;filter:alpha(opacity=50);-moz-opacity:0.5;-khtml-opacity: 0.5;height:305px;line-height:305px;opacity: 0.5;color:#000;position:absolute;z-index:999;text-align:center;width:750px;$hidemap"></div>
            <div id="map_canvas" style="border:1px solid #aaa;height:300px;width:746px;position:relative;display:block;visiblility:visible;"></div>
            <script src="http://maps.google.com/maps/api/js"></script>
            <script>
                $(function(){
                    marker = ' ';
                    $('#updatecoords').click(function(e){
                        e.preventDefault();
                        marker.setMap(null);
                        
                        var address = $('#address').val();
                        var form_param = 'action=get-coords&address='+address;
                        
                        $.post('$htmladmin/ajax/ajax_functions.php', form_param ,function(data){
                         
                            if(data)
                            {
                                var latitude = $('#latitude').val(data.lat);
                                var longitude = $('#longitude').val(data.lng);
                                
                                $('#map_overlay1, #map_overlay2').remove();
                                var pos = new google.maps.LatLng(data.lat, data.lng)
                                marker = new google.maps.Marker({
                                    position: pos,
                                    map: map,
                                    title: "$name",
                                    zIndex: 1,
                                    draggable:true
                                });
                                
                                map.setCenter(pos);

                                google.maps.event.addListener(marker, 'dragend', function (event) {
                                    document.getElementById("latitude").value = this.getPosition().lat();
                                    document.getElementById("longitude").value = this.getPosition().lng();
                                });

                               
                                
                                $('textarea#address').val(data.formattedAddress);
                            }

                        },'json');
                        
                        return false;
                    });
                    
                    $marker
                            
                    //maps
                    $mylatlng
                    var mapOptions = {  
                        zoom:      11,  
                        center:    myLatLng,  
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        disableDefaultUI: true,
                        mapTypeControl: false,
                        zoomControl: true,
                        scaleControl: true,
                        panControl: true,
                        scrollwheel:true
                    }



                    $("#map_canvas").empty();
                    var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
            
                    if(markercoords)
                    {
                        var marker = new google.maps.Marker({
                            position: new google.maps.LatLng(markercoords[0], markercoords[1]),
                            map: map,
                            title:"$name",
                            zIndex:1,
                            draggable:true
                        });

                        google.maps.event.addListener(marker, 'dragend', function (event) {

                            document.getElementById("latitude").value = this.getPosition().lat();
                            document.getElementById("longitude").value = this.getPosition().lng();
                        });

                        // google.maps.event.addListener(map, 'idle', function(event){
                        //     var bounds = this.getBounds();
                        //     var ne = bounds.getNorthEast(); // LatLng of the north-east corner
                        //     var sw = bounds.getSouthWest();
                        //     console.info(ne.lat(),',', sw.lng());
                        //     console.info(sw.lat(),',', ne.lng());

                        //     // var nw = new google.maps.LatLng(ne.lat(), sw.lng());
                        //     // var se = new google.maps.LatLng(sw.lat(), ne.lng());
                            
                        // });
                    }
                 
                    
                    $('#reload-map').on('click', function(){
 
                        var center = map.getCenter();
                        google.maps.event.trigger(map, "resize");
                        map.setCenter(center);

                    });

                    $('#tabs ul li a').on('click', function(e){
                        e.preventDefault();
                        if($(this).attr('href') === '#tabs-2')
                        {
                            $('#tabs-2').show();
                            $('#reload-map').trigger('click');
                        }
                    });
                
                });
                
            </script>
        </td>
    </tr>

    </tbody>
</table>

H;

       ##------------------------------------------------------------------------------------------------------
       ## tab arrays and build tabs

    $temp_array_menutab             = array();
    $temp_array_menutab ['Details'] = $settings_content;
    // $temp_array_menutab ['Content'] = $content_content;
    $temp_array_menutab['Responsive Content']        = $main_content;
    $temp_array_menutab['Map']        = $map_html;

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
