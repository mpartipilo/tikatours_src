<?php

############################################################################################################################
## Edit FAQ Item
############################################################################################################################

function edit_item()
{

    global $message,$id,$do,$disable_menu,$valid,$htmladmin, $main_subheading,$tbl_name;

    $disable_menu = "true";

    $sql = "SELECT `name`,`flag_path`,`btn_text`,`btn_url`, `latitude`, `longitude`, `formatted_address`
            FROM $tbl_name
            WHERE `id` = '$id'
            LIMIT 1";

    $row = fetch_row($sql);
    @extract($row);

    $main_subheading = 'Editing: '.$name;

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
                <td width="100">Country Name:</td>
                <td colspan="3"><input name="name" type="text" id="name" value="$name" style="width:300px;" /></td>
            </tr>
            <tr>
                <td width="100">Country Flag:</td>
                <td colspan="3">
                    <input name="flag_path" type="text" id="flag_path" value="$flag_path" style="margin-right:5px;width:300px;float:left;" />
                    <input type="button" onclick="openFileBrowser('flag_path')" style="padding:1px 5px;" value="Browse">
                    <input type="button" value="clear" onclick="clearValue('flag_path')"><br>
                    <div><small>suggested size:H45px X W30px - PNG format</small></div>
                </td>
            </tr>
    </table>
HTML;


$sql     = "SELECT `rank`,`highlight` FROM `country_highlights` WHERE `country_id` = $id ORDER BY `rank`";
$hl_arr  = fetch_all($sql);
$hl_list = '';
$count   = 0;

if(!empty($hl_arr))
{
    foreach ($hl_arr as $hl) {
        $count ++;

        $hl_list .= <<<H

            <li id="hl-{$count}" style="background-color:#D9D9D9;padding:7px;margin-bottom:5px;width:900px;">
                <div>
                    <span style="display:inline-block;margin:0 22px 0 27px;">RANK</span>
                </div>
                <i title="remove" class="fa fa-times remove-hl" style="vertical-align:top;font-size:20px;margin-right:10px;cursor:pointer;"></i>
                <input type="text" name="hlrank[]" value="{$hl['rank']}" style="vertical-align:top;color:#999999;width:30px;margin-right:20px;margin-bottom:10px;text-align:center;">
                <textarea name="hl[]" id="ta-{$count}" maxlength="200" >{$hl['highlight']}</textarea>
                <script type="text/javascript">
                    CKEDITOR.replace( 'ta-{$count}', ckSettings);                   
                </script>
            </li>
H;
    }  
}

$highlights_content = <<< HTML
<script>
    var ckSettings =  {
        toolbar : 'justText',
        forcePasteAsPlainText : true,
        resize_enabled : false,
        width:800,
        height : 100,
        filebrowserBrowseUrl : jsVars.dataManagerUrl
    };

</script>
        <table width="100%" border="0" cellspacing="0" cellpadding="8">
            <tr>
                <td>
                    <p>Suggested number (10). Minumum number for 'Reasons to Visit' module (5). Max character length (200).</p>
                </td>
            </tr>
            <tr>
                <td colspan="3" valign="top">
                    <ul class="hl-list" id="hl-list">
                        {$hl_list}
                    </ul>
                </td>
            </tr>
            <tr>
                <td><button class="add-hl">ADD REASON</button></td>
            </tr>
            <tr>
                <td>'Reasons to Visit' button text (if required):</td>
            </tr>
            <tr>
                <td><input name="btn_text" type="text" id="btn_text" value="$btn_text" style="width:300px;" /></td>
            </tr>
            <tr>
                <td>'Reasons to Visit' button url:</td>
            </tr>
            <tr>
                <td><input name="btn_url" type="text" id="btn_url" value="$btn_url" style="width:300px;" /></td>
            </tr>
            <script type="text/javascript">

            $('.add-hl').on('click',function(e){
                e.preventDefault();
                
                var list = $('.hl-list');
                var count = $('.hl-list li').length + 1;

                var newItem = '<li id="hl-'+count+'" style="background-color:#D9D9D9;padding:7px;margin-bottom:5px;width:900px;">\
                <div>\
                    <span style="display:inline-block;margin:0 22px 0 27px;">RANK</span><span style="display:inline-block;">REASON</span>\
                </div>\
                <i title="remove" class="fa fa-times remove-hl" style="vertical-align:top;font-size:20px;margin-right:10px;cursor:pointer;"></i>\
                <input type="text" name="hlrank[]" value="" style="vertical-align:top;color:#999999;width:30px;margin-right:20px;margin-bottom:10px;text-align:center;">\
                <textarea name="hl[]" id="ta-'+count+'" maxlength="200" ></textarea>\
                </li>';

                list.append(newItem);

                CKEDITOR.replace( 'ta-'+count, ckSettings);

                return false;

            });

            $('#hl-list').on('click', '.remove-hl',function(){
                $(this).parent('li').remove();
            });



            </script>
    </table>
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

    $temp_array_menutab = array();
    $temp_array_menutab ['Details']     = $settings_content;
    $temp_array_menutab ['Reasons to Visit']  = $highlights_content;
    $temp_array_menutab ['Map']             = $map_html;

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
                            <input type=\"hidden\" name=\"do\" value=\"$do\">
                            <input type=\"hidden\" name=\"id\" value=\"$id\">
                    </form>";
    require "resultPage.php";
    echo $result_page;
    exit();
}

?>
