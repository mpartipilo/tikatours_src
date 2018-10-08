<?php

############################################################################################################################
## Save Testimonial Item
############################################################################################################################

function save_item()
{

    global $message,$id,$do,$disable_menu, $root, $rootfull, $rootadmin,$tbl_name;

	$update_arr                = array();
	$update_arr['name']        = $_POST['name'];
	$update_arr['sub_heading'] = $_POST['sub_heading'];

    $end="WHERE id = '$id'";
    update_row($update_arr,$tbl_name, $end);

    $message = "Main category has been saved";
}

?>
