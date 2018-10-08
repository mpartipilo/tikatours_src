<?php

############################################################################################################################
## New FAQ Item
############################################################################################################################

function new_item()
{
	global $message,$id,$htmladmin;

	$temp_array_new['label']  = 'Untitled';
	$temp_array_new['status'] = 'H';
	
	$id = insert_row($temp_array_new,'blog_category');
	$message = "New item has been added and ready to edit";
        
    @include('inc_blogcategories_edit.php');
	edit_item();
}

?>
