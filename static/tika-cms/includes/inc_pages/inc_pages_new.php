<?php
############################################################################################################################
## Add a new page
############################################################################################################################

function new_item() {
	global $message,$id,$pages_maximum;

            $temp_array_new['page_url']     = date("Y-m-d H:i:s");
            $temp_array_new['page_status']  = 'H';
            $temp_array_new['page_parentid']  = '0';
            $id = insert_row($temp_array_new,'general_pages');
            $message = "New page has been added and ready to edit";

            @include('inc_pages_edit.php');
            edit_item();
        
}
?>