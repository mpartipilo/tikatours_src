<?php

############################################################################################################################
## Save Testimonial Item
############################################################################################################################

function save_item()
{

    global $message,$id,$do,$disable_menu, $root, $rootfull, $rootadmin,$tbl_name;

    $update_arr              = array();
    
    $update_arr['name']              = $_POST['name'];
    $update_arr['flag_path']         = $_POST['flag_path'];
    $update_arr['btn_text']          = $_POST['btn_text'];
    $update_arr['btn_url']           = $_POST['btn_url'];
    $update_arr['latitude']          = $_POST['latitude'];
    $update_arr['longitude']         = $_POST['longitude'];
    $update_arr['formatted_address'] = $_POST['address'];

    $end="WHERE id = '$id'";
    update_row($update_arr,$tbl_name, $end);

    //Save highlights-------------

    $sql = "DELETE FROM country_highlights WHERE country_id = '$id'";
    run_query($sql);

	$rank      = $_POST['hlrank'];
	$highlight = $_POST['hl'];

    for($i=0;$i<count($highlight);$i++)
    {
        $temp_array_save['rank']          = $rank[$i];
        $temp_array_save['highlight']     = $highlight[$i];
        $temp_array_save['country_id']    = $id;

        insert_row($temp_array_save, 'country_highlights');
    }

    $message = "Country has been saved";
}

?>
