<?php
############################################################################################################################
## Hide general_pages
############################################################################################################################

function hide_items() {
    global $message,$item_select;
    $temp_array_hide = array();
    if(!empty($item_select)) {
        foreach($item_select as $i) {
            $temp_array_hide['page_status'] = 'H';
            $end = "WHERE page_id = '$i'";
            update_row($temp_array_hide,'general_pages',$end);

            $message = "Selected pages have been hidden";
        }
    }else {
        $message = "Please select an item from the list";
    }

}
?>