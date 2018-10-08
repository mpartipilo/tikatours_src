<?php

############################################################################################################################
## Save page positions
############################################################################################################################

function save_rank ($page_id,$page_rank) {
    global $message;
    
    for($i=0;$i<=count($page_id);$i++) {
        $temp_array_positions ['page_rank'] = $page_rank[$i];
        $wherepageid = $page_id[$i];
        $end = "WHERE page_id = '$wherepageid'";
        update_row($temp_array_positions,'general_pages',$end);
    }
    
    $message = "Page ranking has been saved";
}

?>
