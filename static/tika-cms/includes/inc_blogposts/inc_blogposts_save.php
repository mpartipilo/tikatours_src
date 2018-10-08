<?php

############################################################################################################################
## Save Testimonial Item
############################################################################################################################

function save_item()
{

    global $message,$id,$do,$disable_menu, $root, $rootfull, $rootadmin;

    $update_arr           = array();
    
    $date_posted = date_create_from_format('d/m/Y H:i:s', $_POST['date_posted']);


    $url = ($_POST['url']) ? $_POST['url'] : "post-$id";

    $update_arr['name']              = $_POST['label'];
    $update_arr['url']               = prepare_item_url($url);
    $update_arr['long_description']  = $_POST['long_description'];
    $update_arr['title']             = $_POST['title'];
    $update_arr['meta_keywords']     = $_POST['meta_keywords'];
    $update_arr['meta_description']  = $_POST['meta_description'];
    $update_arr['author_id']         = $_SESSION['s_user_id'];
    $update_arr['category_id']       = $_POST['category'];
    $update_arr['date_posted']       = $date_posted->format('Y-m-d H:i:s');

    $end="WHERE id = '$id'";
    update_row($update_arr, 'blog_post', $end);

    $message = "Blog post has been saved";
}

?>
