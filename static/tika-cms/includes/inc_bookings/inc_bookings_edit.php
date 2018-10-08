<?php

## ----------------------------------------------------------------------------------------------------------------------
## Edit page
function edit_item() {
    global $message,$id,$do,$disable_menu,$valid,$htmladmin,$rootadmin,$rootfull, $main_subheading;

    $disable_menu = "true";

    $sql = "SELECT `id`, CONCAT(`fname`, ' ', `lname`) AS name, `email`, `mobile`, `comments`, `tour_id`,
    DATE_FORMAT(`date_of_enquiry`, '%e %M %Y @ %h:%i %p') AS date_enquired
    FROM `enquiry`
    WHERE `id` = '$id'";
    
    $row      = fetch_row($sql);
    
    $id       = str_pad($id, 4, 0, STR_PAD_LEFT);
    $name     = $row['name'];
    $email    = mail_to($row['email']);
    $mobile   = $row['mobile'];
    $comments = $row['comments'];
    $enq_date = $row['date_enquired'];
    $tour_id  = $row['tour_id'];
    $sql2     = "SELECT `name` FROM `tour` WHERE `id` = '$tour_id'";
    $tour_name = fetch_value($sql2);

    $main_subheading = 'Booking from: '.$name;
    ##------------------------------------------------------------------------------------------------------
    ## Page functions

 $page_functions = <<< HTML
        <ul class="page-action">
            <li><button type="button" class="btn btn-default" onclick="submitForm('cancelpagesave',1)"><i class="glyphicon glyphicon-arrow-left"></i> Back</button>
            </li>
        </ul>
HTML;
    
    
    $details_content = <<< HTML
        <table width="100%" border="0" cellspacing="0" cellpadding="10" >
            <tr>
                <td><strong>Booking ID:</strong></td>
                <td>#$id</td>
                <td><strong>Date of Enquiry:</strong></td>
                <td>$enq_date</td>
            </tr>
            <tr>
                <td><strong>Name:</strong></td>
                <td>$name</td>
                <td><strong>Email:</strong></td>
                <td>$email</td>
            </tr>
            <tr>
                <td><strong>Mobile:</strong></td>
                <td>$mobile</td>
                <td><strong>Tour Name:</strong></td>
                <td>$tour_name</td>   
            </tr>
            <tr>
                <td><strong>Comments:</strong></td>
                <td colspan="3">$comments</td>
            </tr>
        </table>
HTML;


    ##------------------------------------------------------------------------------------------------------
    ## tab arrays and build tabs

    $temp_array_menutab = array();

    $temp_array_menutab ['Details'] 	= $details_content;

    $counter = 0;
    $tablist ="";
    $contentlist="";

    foreach($temp_array_menutab as $key => $value) {

        $tablist.= "<li><a href=\"#tabs-$counter\">$key</a></li>";

        $contentlist.=" <div id=\"tabs-$counter\">$value</div>";

        $counter++;
    }

    $tablist="<div id=\"tabs\"><ul>$tablist</ul><div style=\"padding:10px;\">$contentlist</div></div>";

    $page_contents = <<< HTML
                        <form action="$htmladmin/index.php" method="post" name="pageList" enctype="multipart/form-data">
			    $tablist
                            <input type="hidden" name="action" value="" id="action">
                            <input type="hidden" name="do" value="bookings">
                            <input type="hidden" name="id" value="$id">
                            <input type="hidden" name="lpage_id" value="$lpage_id">
                        </form>
HTML;
    require "resultPage.php";
    echo $result_page;
    exit();


}

?>
