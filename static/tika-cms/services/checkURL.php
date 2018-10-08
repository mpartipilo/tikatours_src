<?php

require_once ('../../utility/config.php');                              ## System config file


if (!$c_Connection->Connect()) {

    echo "Database connection failed";
    exit;
}


function check_url() {
    global $root;
    if (isset($_POST['page_url'])) {

        $page_url       = $_POST['page_url'];
        $curr_page_url  = $_POST['curr_page_url'];
         $action  = $_POST['action'];

        $and = ($action === 'mobpages') ? " AND page_mobile = 'M'" : " AND (page_mobile IS NULL OR page_mobile != 'M')";
        $valid = true;
        $message = '';

        if($valid && $page_url!=''){
            // Check if url exists
            $sql = "SELECT page_url
                    FROM general_pages
                    WHERE page_url = '$page_url'
                    AND page_url != '$curr_page_url'
                    AND page_status !='D' {$and}";

            $valid = fetch_value($sql) ? false : true;
            $message = !$valid ? 'This page url already exists. Please enter another.' : '';
        }

        if($valid && $page_url!=''){
            // Check if folder exists with the same name as the url
            $valid = is_dir("$root/$page_url") ? false : true;
            $message = !$valid ? 'This URL conflicts with the CMS system. Please enter another.' : '';
        }
        
        

        $json_pre = array(
                'valid'     => $valid,
                'message'   => $message
            );
        $json = json_encode($json_pre);
        return $json;
    }
}

echo check_url();
?>
