<?php

## ----------------------------------------------------------------------------------------------------------------------
## NetZone 1.0
## inc_slides.php
##
## Author: Ton Jo Immanuel, Tomahawk Brand Management Ltd.
## Date: 16 April 2010
##
## Manage Slideshow
##
##
## ----------------------------------------------------------------------------------------------------------------------
function do_main() {


    global $slidegroup_id,$message,$valid,$item_select,$htmladmin, $main_heading;

    $active_pages = "";

    $slidegroup_id		= $_REQUEST['slidegroup_id'];
    $item_select		= $_REQUEST['item_select'];
    $action			    = $_REQUEST['action'];
    $main_heading       = 'Slideshows & Galleries';

    switch ($action) {
        case 'edit':
            @include('inc_galleries_edit.php');
            $return = edit_item();
            break;

        case 'new':
            @include('inc_galleries_new.php');
            $return = new_item();
            break;

        case 'save':
            @include('inc_galleries_save.php');
            $return = save_item();
            break;

        case 'delete':
            @include('inc_galleries_delete.php');
            $return = delete_item();
            break;
    }

    $c = 0;
    $active_pages ="";
    $page_contents = "";
    $sql = "SELECT *
            FROM images_groups";
    $result = run_query($sql);

    while($row = mysql_fetch_assoc($result)) {

        $slidegroup_id		= $row['imggrp_id'];
        $slidegroup_name	= $row['imggrp_name'];

        $is_gall = ($row['is_gallery'] == '1') ? '<span class="label label-success">Yes</span>' : '<span class="label label-warning">No</span>';
        $is_index = ($row['add_to_gallery_index'] == '1') ? '<span class="label label-success">Yes</span>' : '<span class="label label-warning">No</span>';

        if ($c == 0 ? $bgc = "#FFFFFF": $bgc = "#F6F8FD");

        $c = $c + 1;
        if ($c == 2) {
            $c = 0;
        }

        $editlink="<a href=\"$htmladmin/index.php?do=galleries&action=edit&id=$slidegroup_id\">$slidegroup_name</a>";

        $item_select="<label class=\"custom-check\"><input type=\"checkbox\" name=\"item_select[]\" class =\"checkall\" value=\"$slidegroup_id\"><span></span></label>";

        $active_pages .= <<< HTML
        <tr>
            <td width="20" align="center">$item_select</td>
            <td>$editlink</td>
            <td>$is_gall</td>
            <td>$is_index</td>
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
        <li><button type="button" class="btn btn-default" onclick="submitForm('new',1)"><i class="glyphicon glyphicon-picture"></i> New</button></li>
        <li><button type="button" class="btn btn-default" onclick="submitForm('delete')"><i class="glyphicon glyphicon-remove"></i> Delete</button></li>
    </ul>
HTML;
$page_contents .= <<< HTML
    <form  action="$htmladmin/index.php" method="post" style="margin:0px;" name="pageList">
        <table width="100%" class="bordered">
            <thead>
                <tr>
                    <th width="20"><label class="custom-check"><input type="checkbox" name="all" id="checkall"><span></span></label></th>
                    <th>Slideshows + Galleries</th>
                    <th>Is Gallery?</th>
                    <th>Added to Gallery Index?</th>
                </tr>
            </thead>
            <tbody>
                $active_pages
            </tbody>
        </table>
        <input type="hidden" name="action" value="" id="action">
        <input type="hidden" name="do" value="galleries">
    </form>
HTML;

    require "resultPage.php";
    echo $result_page;
    exit();
}

?>
