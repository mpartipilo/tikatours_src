<?php

############################################################################################################################
## Add a new slideshow
############################################################################################################################

function new_item() {
	global $message,$id;

	$temp_array_new['imggrp_name'] = 'New Slideshow';;
	$id = insert_row($temp_array_new,'images_groups');
	$message = "New slideshow has been added and ready to edit";

        @include('inc_galleries_edit.php');
	edit_item();
}
?>
