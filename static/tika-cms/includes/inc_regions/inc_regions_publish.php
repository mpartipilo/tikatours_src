<?php

############################################################################################################################
## Publish FAQ
############################################################################################################################

function publish_items() {

	global $message,$item_select,$htmladmin,$tbl_name;

	if(!empty($item_select))
	{
		$ids = implode(', ', $item_select);
		
	 	$query = "UPDATE $tbl_name SET status = 'A' WHERE id IN ($ids)";
	 	run_query($query);
		$message = "Selected items have been published.";
	}
	else
	{

		$message = "Please select an from the list";

	}

}


?>
