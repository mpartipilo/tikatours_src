<?php

## ----------------------------------------------------------------------------------------------------------------------
## NetZone 1.0
## inc_slides.php
##
## Author: Ton Jo Immanuel, Tomahawk Brand Management Ltd.
## Date: 16 April 2010
##
## Manage Enquiries
##
##
## ----------------------------------------------------------------------------------------------------------------------
function do_main() {


    global $slidegroup_id,$message,$valid,$item_select,$htmladmin, $main_heading;

    $active_pages = "";

    $slidegroup_id = $_REQUEST['slidegroup_id'];
    $item_select   = $_REQUEST['item_select'];
    $action        = $_REQUEST['action'];
    $main_heading  = 'Bookings';

    switch ($action) {
        case 'edit':
            @include('inc_bookings_edit.php');
            $return = edit_item();
            break;
        case 'delete':
            @include('inc_bookings_delete.php');
            $return = delete_item();
            break;
    }

    $c             = 0;
    $active_pages  = "";
    $page_contents = "";
    $sql           = "SELECT `id`, CONCAT(`fname`, ' ', `lname`) AS name, `email`, `date_of_enquiry`, `tour_id`
                    FROM `enquiry`
                    WHERE `status` != 'D'
                    AND `is_booking` = '1'
                    ORDER BY `date_of_enquiry` DESC";

    $result = run_query($sql);

    while($row = mysql_fetch_assoc($result)) {

        $eid       = $row['id'];
        $ename     = $row['name'];
        $eemail    = mail_to($row['email']);
        $edateobj  = new DateTime($row['date_of_enquiry']);
        $edate     = $edateobj->format('d F Y @ h:i:s');
        $t_id      = $row['tour_id'];
        $tour_name = fetch_value("SELECT `name` FROM `tour` WHERE `id` = '$t_id' LIMIT 1");
        
        if ($c == 0 ? $bgc = "#FFFFFF": $bgc = "#F6F8FD");

        $c++;
        if($c == 2) $c = 0;

        $editlink="<a title=\"View Details\" href=\"$htmladmin/index.php?do=bookings&action=edit&id=$eid\">#".str_pad($eid, 4, 0, STR_PAD_LEFT)."</a>";
        $item_select="<label class=\"custom-check\"><input type=\"checkbox\" name=\"item_select[]\" class =\"checkall\" value=\"$eid\"><span></span></label>";

        $active_pages .= <<< HTML
                    
                <tr>
                    <td width="20">$item_select</td>
                    <td width="90">$editlink</td>
                    <td width="200">$ename</td>
                    <td width="200">$eemail</td>
                    <td width="250">$tour_name</td>
                    <td width="150">$edate</td>
                </tr>
HTML;
    }
   if ($message != "") {

        $page_contents .= <<< HTML
          <div class="alert alert-warning page">
             <i class="glyphicon glyphicon-info-sign"></i>
              <strong>$message</strong>
          </div>
HTML;
    }
$page_functions = <<< HTML
        <ul class="page-action">
            <li><button type="button" class="btn btn-default" onclick="submitForm('delete')"><i class="glyphicon glyphicon-remove"></i> Delete</button></li>
        </ul>
HTML;
    $page_contents .= <<< HTML
        <form action="$htmladmin/index.php" method="post" style="margin:0px;" name="pageList">
            <table width="100%" class="bordered">
                <thead>
                <tr>
                    <th width="20" align="center">
                        <label class="custom-check">
                            <input type="checkbox" name="all" id="checkall">
                            <span></span>
                        </label>
                    </th>
                    <th width="90">BOOKING ID</th>
                    <th width="200">PERSON NAME</th>
                    <th width="200">PERSON EMAIL</th>
                    <th width="250">TOUR NAME</th>
                    <th width="150">ENQUIRY DATE</th>
                </tr>
                </thead>
                <tbody>
                    $active_pages
                </tbody>
            </table>
            <input type="hidden" name="action" value="" id="action">
            <input type="hidden" name="do" value="bookings">
        </form>
HTML;

    require "resultPage.php";
    echo $result_page;
    exit();
}

?>
