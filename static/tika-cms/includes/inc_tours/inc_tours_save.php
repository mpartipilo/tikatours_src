<?php

############################################################################################################################
## Save Testimonial Item
############################################################################################################################

function save_item()
{

    global $message,$id,$do,$disable_menu, $root, $rootfull, $rootadmin,$tbl_name;

	$update_arr                     = array();
	$update_arr['name']             = $_POST['name'];
	$update_arr['heading']          = $_POST['heading'];
	$update_arr['short_descr']      = $_POST['short_descr'];
	$update_arr['url']              = prepare_item_url($_POST['url']);
	$update_arr['image_path']       = $_POST['image_path'];
	$update_arr['inclusions']       = $_POST['inclusions'];
	$update_arr['itinerary']        = $_POST['itinerary'];
	$update_arr['duration']         = $_POST['duration'];
	$update_arr['price_from']       = $_POST['price_from'];
	$update_arr['title']            = $_POST['title'];
	$update_arr['meta_descr']       = $_POST['meta_descr'];
	$update_arr['long_descr']       = $_POST['long_descr'];
	$update_arr['slideshow_id']     = $_POST['slideshow_id'];
	$update_arr['gallery_id']       = $_POST['gallery_id'];
	$update_arr['country_id']       = $_POST['country_id'];
	$update_arr['main_category_id'] = $_POST['main_category_id'];
	$update_arr['sub_category_id']  = $_POST['sub_category_id'];
	$update_arr['is_featured']      = $_POST['is_featured'];

    $end="WHERE id = '$id'";
    update_row($update_arr,$tbl_name, $end);

    $message = "Tour has been saved";
}

?>
