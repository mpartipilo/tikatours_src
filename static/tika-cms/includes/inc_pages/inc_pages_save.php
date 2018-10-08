<?php
## ----------------------------------------------------------------------------------------------------------------------
## Save page

function save_item (){

	global $id,$message;
        
		
		$page_label                 = $_REQUEST['page_label'];
		$page_heading               = $_REQUEST['page_heading'];
		$current_page               = $_REQUEST['current_page'];
		$page_title                 = $_REQUEST['page_title'];
		$page_mkeyw                 = $_REQUEST['page_mkeyw'];
		$page_mdescr                = $_REQUEST['page_mdescr'];
		$page_seokeyw               = $_REQUEST['page_seokeyw'];
		$page_imagepath             = $_REQUEST['page_imagepath'];
		$page_menu                  = $_REQUEST['page_menu'];
		$page_breadcrumb_menu       = $_REQUEST['page_breadcrumb_menu'];
		$page_footer                = $_REQUEST['page_footer'];
		$page_footer_menu_placement = $_REQUEST['page_footer_menu_placement'];
		$page_parentid              = $_REQUEST['page_parentid'];
		$imggrp_id                  = $_REQUEST['imggrp_id'];
		$imggrp_id_footer           = $_REQUEST['imggrp_id_footer'];
		$tmpl_id                    = $_REQUEST['tmpl_id'];
		$page_accesslevel           = $_REQUEST['page_accesslevel'];
		$mp_rank                    = $_REQUEST['mp_rank'];
		$mod_id                     = $_REQUEST['mod_id'];
		$page_introduction          = $_REQUEST['page_introduction'];
		$page_linkname              = $_REQUEST['page_linkname'];
		$page_quicklink_image       = $_REQUEST['page_quicklink_image'];
		$page_quicklink_heading     = $_REQUEST['page_quicklink_heading'];
		$page_quicklink_button      = $_REQUEST['page_quicklink_button'];
		$page_quicklinksnippet      = $_REQUEST['page_quicklinksnippet'];
		$quicklink_id               = $_REQUEST['quicklink_id'];
		$esid                       = $_REQUEST['esid'];
		$page_mcache                = $_REQUEST['page_mcache'];
		$page_mrobots               = $_REQUEST['page_mrobots'];
		$page_url                   = $_REQUEST['page_url'];
		$page_pictures_id           = $_REQUEST['page_pictures_id'];
		$page_video_id              = $_REQUEST['page_video_id'];
		$image_gallery_grp          = $_REQUEST['image_gallery_grp'];
		$page_sitemap_menu          = $_REQUEST['page_sitemap_menu'];
		$page_sitemap_title         = $_REQUEST['page_sitemap_title'];
		$country_id                 = $_REQUEST['country'];
		$category_id                = $_REQUEST['category_id'];

		$page_url              = (trim($page_url)=='' ? $page_label : $page_url);
		$page_url              = prepare_item_url($page_url);

        //Saving Quicklinks

        $sql = "DELETE
                FROM general_quicklinks
                WHERE quick_page_id = '$id'";

        run_query($sql);
        if(!empty($quicklink_id)){
            foreach ($quicklink_id as $i){
                $temp_quick_array = array();
                $temp_quick_array['quick_page_id']      = $id;
                $temp_quick_array['page_id']  = $i;
                insert_row($temp_quick_array, 'general_quicklinks');
            }
        }


		$temp_array_save['page_url']                   = $page_url;
		$temp_array_save['page_label']                 = $page_label;
		$temp_array_save['page_linkname']              = $page_linkname;
		$temp_array_save['page_heading']               = $page_heading;
		$temp_array_save['current_page']               = $current_page;
		$temp_array_save['page_title']                 = $page_title;
		$temp_array_save['page_mkeyw']                 = $page_mkeyw;
		$temp_array_save['page_mdescr']                = $page_mdescr;
		$temp_array_save['page_seokeyw']               = $page_seokeyw;
		$temp_array_save['page_menu']                  = $page_menu;
		$temp_array_save['page_breadcrumb_menu']       = $page_breadcrumb_menu;
		$temp_array_save['page_footer']                = $page_footer;
		$temp_array_save['page_footer_menu_placement'] = $page_footer_menu_placement;
		$temp_array_save['page_introduction']          = $page_introduction;
		$temp_array_save['page_dateupdated']           = date("Y-m-d H:i:s");
		$temp_array_save['page_imagepath']             = $page_imagepath;
		$temp_array_save['page_parentid']              = $page_parentid;
		$temp_array_save['imggrp_id']                  = $imggrp_id;
		$temp_array_save['imggrp_id_footer']           = $imggrp_id_footer;
		$temp_array_save['tmpl_id']                    = $tmpl_id;
		$temp_array_save['page_accesslevel']           = $page_accesslevel;
		$temp_array_save['page_mcache']                = $page_mcache;
		$temp_array_save['page_mrobots']               = $page_mrobots;
		$temp_array_save['page_quicklink_image']       = $page_quicklink_image;
		$temp_array_save['page_quicklink_heading']     = $page_quicklink_heading;
		$temp_array_save['page_quicklink_button']      = $page_quicklink_button;
		$temp_array_save['page_quicklinksnippet']      = $page_quicklinksnippet;
		$temp_array_save['imggrp_id_gallery']          = $image_gallery_grp;
		$temp_array_save['page_sitemap_title']         = $page_sitemap_title;
		$temp_array_save['page_sitemap_menu']          = $page_sitemap_menu;
		$temp_array_save['country_id']                 = $country_id;
		$temp_array_save['category_id']                = $category_id;
		$temp_array_save['page_mobile']                = NULL;
		$temp_array_save['page_desktop_id']            = NULL;
		$temp_array_save['page_mobile_id']             = $_REQUEST['mobile_page'];
		$temp_array_save['page_timebase_publishing']  = ($_REQUEST['page_timebase_publishing'] == 'Y') ? 'Y' : 'N';
		$temp_array_save['page_publish_date']          = ($_REQUEST['page_publish_date']) ? mkformatted_date($_REQUEST['page_publish_date'], 'Y-m-d', '/') : '0000-00-00';
		$temp_array_save['page_hide_date']             = ($_REQUEST['page_hide_date']) ? mkformatted_date($_REQUEST['page_hide_date'], 'Y-m-d', '/'): '0000-00-00';
		$temp_array_save['page_publish_time']          = ($_REQUEST['page_publish_time']) ? $_REQUEST['page_publish_time'] : '00:00:00';
		$temp_array_save['page_hide_time']             = ($_REQUEST['page_hide_time']) ? $_REQUEST['page_hide_time'] : '00:00:00';

	$end = "WHERE page_id='$id'";
	update_row($temp_array_save,'general_pages',$end);



	### save page responsive content ###
	// Check if content record exist for this page
	$content_id = fetch_value("SELECT `id` FROM `content` WHERE `page_id` = '$id' AND `module_id` = '1' LIMIT 1");
	if(!$content_id)
	{
		$content_id = insert_row(array('page_id' => $id, 'module_id' => 1), 'content');
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


	$sql = "DELETE mp.*
                FROM module_pages mp
		LEFT JOIN modules m ON m.mod_id = mp.mod_id
                WHERE mp.page_id = '$id'
		AND m.mod_showincms='Y'";
	run_query($sql);

	for($i=0;$i<=count($mod_id);$i++){

		if($mp_rank[$i] >0){

			$temp_array_modules['page_id'] = $id;
			$temp_array_modules['modpages_rank'] = $mp_rank[$i];
			$temp_array_modules['mod_id'] = $mod_id[$i];
			insert_row($temp_array_modules,'module_pages');
		}
	}
	

	$message = "Page has been saved";
}
?>