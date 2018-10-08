<?php

############################################################################################################################
## Save Testimonial Item
############################################################################################################################

function save_item()
{

    global $message,$id,$do,$disable_menu, $root, $rootfull, $rootadmin;

    $update_arr           = array();
    
    $url = ($_POST['url']) ? $_POST['url'] : $_POST['label'];

	$update_arr['label']            = $_POST['label'];
	$update_arr['url']              = prepare_item_url($url);
	$update_arr['title']            = $_POST['title'];
	$update_arr['meta_keywords']    = $_POST['meta_keywords'];
	$update_arr['meta_description'] = $_POST['meta_description'];

    $end="WHERE id = '$id'";
    update_row($update_arr, 'blog_category', $end);

    $message = "Blog Category has been saved";
}

?>
