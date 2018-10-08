<?php

############################################################################################################################
## New FAQ Item
############################################################################################################################

function new_item()
{
	global $message,$id,$htmladmin;

	$temp_array_new['name']  = 'Untitled';
	$temp_array_new['status'] = 'H';
	$temp_array_new['date_created'] = date('Y-m-d H:i:s');
	
	$id = insert_row($temp_array_new,'blog_post');
	$message = "New item has been added and ready to edit";
        
    @include('inc_blogposts_edit.php');
	edit_item();
}

?>
