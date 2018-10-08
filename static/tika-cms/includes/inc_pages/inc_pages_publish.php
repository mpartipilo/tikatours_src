<?php
############################################################################################################################
## Publish general_pages
############################################################################################################################

function publish_items() {
	global $message,$item_select,$pages_maximum;

	if(!empty($item_select)){
            
                $number_of_pages_selected = count($item_select);

                $sql = "SELECT page_id
                        FROM general_pages
                        WHERE page_status = 'A'";
                $pageslist_arr = fetch_all($sql);
                $number_of_active_pages = count($pageslist_arr);

                if(($pages_maximum > $number_of_active_pages+$number_of_pages_selected-1) || ($pages_maximum == '')){
                    foreach($item_select as $i){
			$temp_array_publish ['page_status'] = 'A';
			$end = "WHERE page_id = '$i'";
			update_row($temp_array_publish,'general_pages',$end);

			$message = "Selected pages have been published";
                    }
                }else{
                    $message = "Could not make the selected pages active as it would exceed the maximum number of active pages allowed  <b>(<i>$pages_maximum pages</i>)</b> ";
                }

		
	}else{
		$message = "Please select an item from the list";
	}

}
?>