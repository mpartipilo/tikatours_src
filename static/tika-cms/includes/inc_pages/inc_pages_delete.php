<?php
############################################################################################################################
## Delete a page
############################################################################################################################

function delete_items() {
	global $message,$item_select;

	if(!empty($item_select)){
		$temp_array_delete1 = array();
		foreach($item_select as $i){
                        $sql = "SELECT page_content
                                FROM general_pages
                                WHERE page_id = '$i'";
			$temp_array_delete ['page_id']          = $i;
			$temp_array_delete ['page_content']     = fetch_value($sql);
			$temp_array_delete ['page_deleted']     = date("Y-m-d H:i:s");
                        $temp_array_delete ['page_status']      = 'D';
			insert_row($temp_array_delete,'general_pageshistory');

			$temp_array_delete1['page_status']     = 'D';
			$temp_array_delete1['page_parentid']  = 0;
			$end = "WHERE page_id = '$i'";
			update_row($temp_array_delete1,'general_pages',$end);

			$message = "Selected pages have been moved to trash";
		}
	}else{
		$message = "Please select an item from the list";
	}

}
?>