<?php

############################################################################################################################
## Save user
############################################################################################################################

function save_item(){

    global $message,$id,$do,$disable_menu,$htmladmin;

    $temp_array_save['user_fname']	= $_REQUEST['user_fname'];
    $temp_array_save['user_lname']	= $_REQUEST['user_lname'];
    
    $temp_array_save['user_email']      = $_REQUEST['user_email'];

    // save social links

    $social_links  = $_POST['social-link'];
    $links_name     = $_POST['link-name'];
    $link_label    = $_POST['link-label'];

    if(count($links_name) > 0)
    {
        $new_array = array();
        for ($i=0; $i < count($links_name); $i++)
        { 
            $new_array[$links_name[$i]]['value'] = $social_links[$i];
            $new_array[$links_name[$i]]['label'] = $link_label[$i];
        }
    }

    $temp_array_save['social_links']      = serialize($new_array);


    if($id != USER_ID && ACCESS_USERACCESSLEVEL == 'Y'){
        $temp_array_save['access_id']      = $_REQUEST['access_id'];
    }

    if($_REQUEST['user_pass']!="********" && ACCESS_USERPASSWORDS == 'Y'){
        $temp_array_save['user_pass']	= sha1($_REQUEST['user_pass']);
    }
    if($_REQUEST['user_pass']!=""){
        $end="WHERE user_id = $id";
        update_row($temp_array_save, 'cms_users', $end);
        $message = "User details saved";
    }else{
        $message = "The password you entered is invalid, please enter it again";
    }
    
}
?>
