<?php

############################################################################################################################
## Save Testimonial Item
############################################################################################################################

function save_item()
{

    global $message,$id,$do,$disable_menu, $root, $rootfull, $rootadmin,$tbl_name;

	$update_arr                 = array();
	$update_arr['name']         = $_POST['name'];
	$update_arr['heading']      = $_POST['heading'];
	$update_arr['label']        = $_POST['label'];
	$update_arr['url']          = prepare_item_url($_POST['url']);
	$update_arr['title']        = $_POST['title'];
	$update_arr['meta_descr']   = $_POST['meta_descr'];
	$update_arr['short_descr']  = $_POST['short_descr'];
	$update_arr['image_path']   = $_POST['image_path'];
	$update_arr['content']      = $_POST['content'];
	$update_arr['country_id']   = $_POST['country_id'];
	$update_arr['slideshow_id'] = $_POST['slideshow_id'];
	$update_arr['gallery_id']   = $_POST['gallery_id'];
    $update_arr['latitude']          = $_POST['latitude'];
    $update_arr['longitude']         = $_POST['longitude'];
    $update_arr['formatted_address'] = $_POST['address'];

    $end="WHERE id = '$id'";
    update_row($update_arr,$tbl_name, $end);



	### save page responsive content ###
	// Check if content record exist for this page
	$content_id = fetch_value("SELECT `id` FROM `content` WHERE `page_id` = '$id' AND `module_id` = '36' LIMIT 1");
	if(!$content_id)
	{
		$content_id = insert_row(array('page_id' => $id, 'module_id' => 36), 'content');
	}

	if($content_id)
	{
		// get all exisitng row belong to this page's content
		$existing_rows = fetch_value("SELECT GROUP_CONCAT(`id`) FROM `content_row` WHERE `content_id` = '$content_id'");

		if($existing_rows)
		{
			// delete all columns
			run_query("DELETE FROM `content_column` WHERE `content_row_id` IN($existing_rows)");

			// delete all rows
			run_query("DELETE FROM `content_row` WHERE `id` IN($existing_rows)");
		}

		// save new content rows and columns
		$rows      = $_POST['row-index'];
		$rows_rank      = $_POST['row-rank'];
		$row_count = count($rows);

		if($row_count > 0)
		{
			for ($i=0; $i < $row_count; $i++)
			{ 
				$row_record               = array();
				$row_record['rank']       = ($rows_rank[$i]);
				$row_record['content_id'] = $content_id;

				$row_id = insert_row($row_record, 'content_row');

				if($row_id)
				{
					
					$columns_rank    = $_POST["content-{$rows[$i]}-rank"];
					$columns_content = $_POST["content-{$rows[$i]}-text"];
					$columns_class   = $_POST["content-{$rows[$i]}-class"];

					$total_row_columns = count($columns_content);
					if($total_row_columns > 0)
					{
						for ($k=0; $k < $total_row_columns; $k++) 
						{ 
							$column_record                   = array();
							
							$column_record['content']        = $columns_content[$k];
							$column_record['css_class']      = $columns_class[$k];
							$column_record['rank']           = $columns_rank[$k];
							$column_record['content_row_id'] = $row_id;

							insert_row($column_record, 'content_column');
						}
					}

				}
			}
		}
		
	}

    $message = "Region has been saved";
}

?>
