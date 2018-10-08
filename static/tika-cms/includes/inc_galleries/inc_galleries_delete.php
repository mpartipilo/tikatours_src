<?php

############################################################################################################################
## Delete slideshows
############################################################################################################################

function delete_item() {
    global $message,$item_select;

    if(!empty($item_select)) {
        foreach($item_select as $i) {
            $temp_array_delete['imggrp_id'] = '0';
            $end = "WHERE imggrp_id = '$i'";
            update_row($temp_array_delete, 'general_pages', $end);
            $sql = "DELETE
                    FROM images_groups
                    WHERE imggrp_id = '$i'";
            run_query($sql);
            
            $sql = "DELETE
                    FROM images_slides
                    WHERE imggrp_id = '$i'";
            run_query($sql);
            $message = "Selected slideshows have been deleted";
        }
    }else {
        $message = "Please select a slideshow from the list";
    }
}

?>
