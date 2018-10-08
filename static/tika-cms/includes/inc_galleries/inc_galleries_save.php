<?php

############################################################################################################################
## Save slideshow
############################################################################################################################

function save_item() {
    global $message,$id,$imggrp_id,$do,$disable_menu,$htmladmin, $rootfull, $rootadmin, $root;

    $imgslide_path    = $_REQUEST['imgslide_path'];
    $caption_heading  = $_REQUEST['caption_heading'];
    $imgslide_caption = $_REQUEST['imgslide_caption'];
    $button_label     = $_REQUEST['button_label'];
    $button_url       = $_REQUEST['button_url'];
    $imgslide_rank    = $_REQUEST['imgslide_rank'];
    $imgslide_alt     = $_REQUEST['imgslide_alt'];
    $imggrp_name      = $_REQUEST['imggrp_name'];
    $youtube_id       = $_REQUEST['youtube_id'];

    if(count($imgslide_path) > 0)
    {

        include_once("$rootadmin/classes/class_imageresizer.php");
        include_once("$rootadmin/classes/class_filenames.php");
        
        $resizer_class = new images();
        $file = new filenames();

        $thumb_dir = "$root/thumbs";

        if($_REQUEST['is_gallery'])
        {

            if(!is_dir($thumb_dir)) mkdir($thumb_dir);
            $gallery_dir = "$thumb_dir/galleries";
            if(!is_dir($gallery_dir)) mkdir($gallery_dir);
            $gallery_dir = "$gallery_dir/g{$id}/";
            if(!is_dir($gallery_dir)) mkdir($gallery_dir);

            delete_files($gallery_dir);

            if(count($imgslide_path)>0){
                for ($z=0; $z < count($imgslide_path); $z++) { 
                   $file->path = $imgslide_path[$z];
                   if(file_exists("$rootfull{$imgslide_path[$z]}")) $resizer_class->resizer($gallery_dir,"$rootfull{$imgslide_path[$z]}",220,220);

                }
            }
        }
    }

    $sql = "DELETE FROM images_slides WHERE imggrp_id = '$id'";

    run_query($sql);

    for($i=0;$i<count($imgslide_path);$i++)
    {
        $temp_array_save['imgslide_path']          = $imgslide_path[$i];
        $temp_array_save['caption_heading']        = $caption_heading[$i];
        $temp_array_save['imgslide_caption']       = $imgslide_caption[$i];
        $temp_array_save['imgslide_rank']          = $imgslide_rank[$i];
        $temp_array_save['imgslide_alt']           = $imgslide_alt[$i];
        $temp_array_save['button_label']           = $button_label[$i];
        $temp_array_save['button_url']             = $button_url[$i];
        $temp_array_save['youtube_id']             = $youtube_id[$i];
        $temp_array_save['imggrp_id']              = $id;

        insert_row($temp_array_save, 'images_slides');
    }

    $temp_array_slide['imggrp_id']       = $id;
    $temp_array_slide['imggrp_name']     = $imggrp_name;
    $temp_array_slide['is_gallery']      = ($_REQUEST['is_gallery']) ? 1 : 0;
    $temp_array_slide['add_to_gallery_index'] = ($_REQUEST['add_to_gallery_index']) ? '1' : '0';
    $end                                 = "WHERE imggrp_id = '$id'";

    update_row($temp_array_slide,'images_groups', $end);
    
    $message                         = "Slideshow has been saved";

}
?>