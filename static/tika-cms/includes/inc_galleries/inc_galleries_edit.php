<?php
## ----------------------------------------------------------------------------------------------------------------------
## Edit page
function edit_item() {
    global $message,$id,$do,$disable_menu,$valid,$htmladmin,$rootadmin,$rootfull, $main_subheading;

    $disable_menu = "true";

      $sql = "SELECT *
      FROM images_groups
      WHERE imggrp_id= '$id'";

      $row                  = fetch_row($sql);
      $imggrp_id            = $row['imggrp_id'];
      $imggrp_name          = $row['imggrp_name'];
      $is_gallery           = $row['is_gallery'];
      $default_caption      = $row['default_caption'];
      $add_to_gallery_index = $row['add_to_gallery_index'];

    
    $main_subheading = 'Editing slideshow: '.$imggrp_name;

    ##------------------------------------------------------------------------------------------------------
    ## Page functions

    $page_functions = <<< HTML
        <ul class="page-action">
            <li><button type="button" class="btn btn-default" onclick="submitForm('save',1)"><i class="glyphicon glyphicon-floppy-save"></i> Save</button></li>
            <li><button type="button" class="btn btn-default" onclick="submitForm('cancelpagesave',1)"><i class="glyphicon glyphicon-arrow-left"></i> Cancel</button>
            </li>
        </ul>
HTML;

    $cchecked = ($is_carousel) ? ' checked="checked"' : '';
    $gchecked = ($is_gallery) ? ' checked="checked"' : '';
    $add_gall_check = ($add_to_gallery_index) ? ' checked="checked"' : '';


    $details_content = <<< HTML
                        <table width="100%" border="0" cellspacing="0" cellpadding="4" >
                            <tr>
                                <td>Name</td>
                                <td><input name="imggrp_name" class="textbox" type="text" id="slidegroup_name" value="$imggrp_name" style="width:300px;" /></td>
                            </tr>
                            <tr>
                                <td>Is Gallery?</td>
                                <td><input name="is_gallery" type="checkbox" value="1" $gchecked></td>
                            </tr>
                             <tr>
                                <td>Add to Gallery Index?</td>
                                <td><input name="add_to_gallery_index" type="checkbox" value="1" $add_gall_check></td>
                            </tr>
                        </table>
HTML;


    ##------------------------------------------------------------------------------------------------------
    ## Photos
    

    $sql = "SELECT *
                FROM images_slides
                WHERE imggrp_id = '$imggrp_id'
                ORDER BY imgslide_rank";
    $result = fetch_all($sql);
    $photocount = 1;
    $photolist="";

     $photolist .= '<ul class="slides">';
    if(!empty($result)) {


        foreach ($result as $row)
        {

         $imgslide_id            = $row['imgslide_id'];
         $imgslide_path          = $row['imgslide_path'];
         $caption_heading        = $row['caption_heading'];
         $imgslide_caption       = $row['imgslide_caption'];
         $imgslide_alt           = $row['imgslide_alt'];
         $button_label           = $row['button_label'];
         $button_url             = $row['button_url'];
         $imgslide_rank          = $row['imgslide_rank'];
         $youtube_id          = $row['youtube_id'];

            // Get new dimensions
            $width = 150;
            $height = 150;
            list($width_orig, $height_orig) = getimagesize("$rootfull$imgslide_path");
            if($height_orig!=0 && $width_orig !=0) {
                $ratio_orig = $width_orig/$height_orig;
                if ($width/$height > $ratio_orig) {
                    $width = $height*$ratio_orig;
                } else {
                    $height = $width/$ratio_orig;
                }
                $photolist .= <<< HTML
                        
               <li id="photo_$photocount">
                    <div class="to-left">
                        <div class="img-wrap">
                            <img src="$imgslide_path" alt="Slide Image $photocount">
                            <input type="hidden" value="$imgslide_path" name="imgslide_path[]">
                        </div>
                    </div>
                    <div class="to-left padded">
                        <ul>
                            <li>
                                <label for="caption-heading-$photocount">Caption heading:</label>
                                <input type="text" id="caption-heading-$photocount" name="caption_heading[]" value="$caption_heading" class="input-xxlrg">
                            </li>
                            <li>
                                <label style="vertical-align:top;" for="imgslide-caption-$photocount">Image caption:</label>
                                <textarea type="text" id="imgslide-caption-$photocount" style="width:580px;" name="imgslide_caption[]">$imgslide_caption</textarea>
                            </li>
                            <li>
                                <label for="imgslide-alt-$photocount">Image alt text:</label>
                                <input type="text" id="imgslide-alt-$photocount" name="imgslide_alt[]" value="$imgslide_alt" class="input-xxlrg">
                            </li>
                            <li>
                                <label for="button-label-$photocount">Button text:</label>
                                <input type="text" id="button-label-$photocount" name="button_label[]" value="$button_label" class="input-xxlrg">
                            </li>
                            <li>
                                <label for="button-url-$photocount">Button url:</label>
                                <input type="text" id="button-url-$photocount" name="button_url[]" value="$button_url" class="input-xxlrg">
                            </li>
                            <li>
                                <label for="youtube-id-$photocount">You tube ID:</label>
                                <input type="text" id="youtube-id-$photocount" name="youtube_id[]" value="$youtube_id" class="input-xxlrg">
                            </li>
                            <li>
                                <label for="rank-$photocount">Rank:</label>
                                <input type="text" id="rank-$photocount" name="imgslide_rank[]" value="$imgslide_rank" class="input-small">
                                <a href="javascript:;" onClick="removePhoto($photocount);">remove</a>
                            </li>
                        </ul>
                    </div>
                    <div class="clearfix clear"></div>
               </li>
HTML;
            $photocount = $photocount + 1;
            }
            
        }
       
    }
    $photolist .= '</ul>';
    $photocount = $photocount - 1;
    
$photo_content = <<< HTML
                        <p><strong>Recommended size: 1800x1200px</strong></p>
                        <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                                <td><div style="margin-bottom:10px;"><a href="javascript:;" onClick="addPhoto();" class="btn btn-primary" style="color:#fff"><i class="glyphicon glyphicon-plus-sign" style="vertical-align:text-top;margin:0px 4px 0 0"></i> add new slide</a></div>$photolist
                                    <div id="newPhotos"></div>
                                    <input type="hidden" value="$photocount" id="lineValue" />
                                    <input type="hidden" id="tempPhoto" name="tempPhoto" value="">
                                </td>
                            </tr>
                        </table>

                        <script type="text/javascript">


                        function unSelectVal(elm)
                        {
                            var jElm = $(elm);
                            if(jElm.length)
                            {
                                jElm.on('change', function(){
                                    var self = $(this),
                                    targetElm = $(self.data('set-default-of')),
                                    opts = targetElm.find('option');

                                    opts.attr('selected', false);
                                    opts.first().attr('selected', true);
                                });
                            }
                        }

                        unSelectVal('.trigger-default');

                            function removePhoto(id) {
                                var id;
                                id = "photo_" + id;
                                $('#'+id).remove();
                            }

                            function addPhoto() {

                                var winl = (screen.width - 1000) / 2;
                                var wint = (screen.height - 700) / 2;
                                var mypage = jsVars.dataManagerUrl+"&NetZone=tempPhoto";
                                var myname = "imageSelector";
                                winprops = 'status=yes,height=700,width=1000,top='+wint+',left='+winl+',scrollbars=auto,resizable'
                                win = window.open(mypage, myname, winprops)
                                if (parseInt(navigator.appVersion) >= 4) { win.window.focus(); }
                            }

                            function SetUrl(p,w,h) {
                                var p;
                                var w;
                                var h;
                                document.getElementById('tempPhoto').value=p;
                                setNewPhoto();
                            }
                            function setNewPhoto() {
                                var ni = $('.slides');
                                var numi = parseInt(ni.find('[id^="photo_"]').size(), 10);
                                console.log(numi);
                                var num = (document.getElementById('lineValue').value -1)+ 2;
                                numi.value = num;
                                var newdiv = document.createElement('div');
				
				
                                var divIdName = 'photo_'+num;
                                newdiv.setAttribute('id',divIdName);
                                newdiv.setAttribute('style','float:left; width:160px; height:180px; margin-right:10px; margin-bottom:10px;');
                                var newPhotoUrl = document.getElementById('tempPhoto').value;

var newSlide = '<li id="photo_'+num+'">\
<div class="to-left">\
    <div class="img-wrap">\
        <img src="'+newPhotoUrl+'" alt="Slide Image '+num+'">\
        <input type="hidden" value="'+document.getElementById('tempPhoto').value + '" name="imgslide_path[]">\
    </div>\
</div>\
<div class="to-left padded">\
    <ul>\
        <li>\
            <label for="caption-heading-'+num+'">Caption heading:</label>\
            <input type="text" id="caption-heading-'+num+'" name="caption_heading[]" value="" class="input-xxlrg">\
        </li>\
        <li>\
            <label style="vertical-align:top;" for="imgslide-caption-'+num+'">Image caption:</label>\
            <textarea type="text" id="imgslide-caption-'+num+'" style="width:580px;" name="imgslide_caption[]"></textarea>\
        </li>\
        <li>\
            <label for="imgslide-alt-'+num+'">Image alt text:</label>\
            <input type="text" id="imgslide-alt-'+num+'" name="imgslide_alt[]" value="" class="input-xxlrg">\
        </li>\
        <li>\
            <label for="button-label-'+num+'">Button text:</label>\
            <input type="text" id="button-label-'+num+'" name="button_label[]" value="" class="input-xxlrg">\
        </li>\
        <li>\
            <label for="button-url-'+num+'">Button url:</label>\
            <input type="text" id="button-url-'+num+'" name="button_url[]" value="" class="input-xxlrg">\
        </li>\
        <li>\
            <label for="youtube-id-'+num+'">You tube ID:</label>\
            <input type="text" id="youtube-id-'+num+'" name="youtube_id[]" value="" class="input-xxlrg">\
        </li>\
        <li>\
            <label for="rank-'+num+'">Rank:</label>\
            <input type="text" id="rank-'+num+'" name="imgslide_rank[]" value="" class="input-small">\
            <a href="javascript:;" onClick="removePhoto('+num+');">remove</a>\
        </li>\
    </ul>\
</div>\
<div class="clearfix clear"></div>\
</li>';

                              

                              ni.append(newSlide);

                              unSelectVal('.trigger-default');
                            }
                        </script>
HTML;

    ##------------------------------------------------------------------------------------------------------
    ## tab arrays and build tabs

    $temp_array_menutab = array();

    $temp_array_menutab ['Settings'] 	= $details_content;
    $temp_array_menutab ['Photos']      = $photo_content;

    $counter = 0;
    $tablist ="";
    $contentlist="";

    foreach($temp_array_menutab as $key => $value) {

        $tablist.= "<li><a href=\"#tabs-$counter\">$key</a></li>";

        $contentlist.=" <div id=\"tabs-$counter\">$value</div>";

        $counter++;
    }

    $tablist="<div id=\"tabs\"><ul>$tablist</ul><div style=\"padding:10px;\">$contentlist</div></div>";

    $page_contents = <<< HTML
                        <form action="$htmladmin/index.php" method="post" name="pageList" enctype="multipart/form-data">
			    $tablist
                            <input type="hidden" name="action" value="" id="action">
                            <input type="hidden" name="do" value="galleries">
                            <input type="hidden" name="id" value="$id">
                            <input type="hidden" name="lpage_id" value="$lpage_id">
                        </form>
HTML;
    require "resultPage.php";
    echo $result_page;
    exit();


}

?>