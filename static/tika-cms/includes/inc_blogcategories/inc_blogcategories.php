<?php
## ----------------------------------------------------------------------------------------------------------------------
## NetZone 1.0
## inc_faq.php
##
## Author: Ton Jo Immanuel, Tomahawk Brand Management Ltd.
## Date: 19 April 2010
##
## Manage FAQ
##
##
## ----------------------------------------------------------------------------------------------------------------------

function do_main(){

    global $message,$valid,$item_select,$testm_id,$testm_rank,$htmladmin, $main_heading;

    $action      = ($_GET['view']) ? $_GET['view'] : $_REQUEST['action'];
    $item_select = $_REQUEST['item_select'];
    $testm_id    = $_REQUEST['testm_id'];
    $main_heading = 'News Categories';
    switch ($action) {

        case 'publish':
            @include('inc_blogcategories_publish.php');
            $return = publish_items();
            break;

        case 'hide':
            @include('inc_blogcategories_hide.php');
            $return = hide_items();
            break;

        case 'new':
            @include('inc_blogcategories_new.php');
            $return = new_item();
            break;

        case 'delete':
            @include('inc_blogcategories_delete.php');
            $return = delete_items();
            break;

        case 'edit':
            @include('inc_blogcategories_edit.php');
            $return = edit_item();
            break;

        case 'save':
            @include('inc_blogcategories_save.php');
            $return = save_item();
            break;
         case 'trash':
            @include('inc_blogcategories_viewtrash.php');
             $return = view_trash();
        break;
        case 'saverank':
            @include('inc_blogcategories_saverank.php');
            $return = save_ranking();
            break;
    }

    $c = 0;
    $active_pages ="";
    $page_contents = "";
    $sql = "SELECT `id`, `label`, `status`, `rank`
    FROM `blog_category`
    WHERE `status` != 'D'
    ORDER BY `status`, `rank`";

    $result = run_query($sql);
    while($row = mysql_fetch_assoc($result)) {
        extract($row);
       
        if ($c%2 == 1 ? $bgc = "#FFFFFF": $bgc = "#F6F8FD");
        $c++;

        $label = ($label) ? $label : 'Untitled';
        $editlink="<a href=\"$htmladmin/index.php?do=blogcategories&action=edit&id=$id\">$label</a>";
        $item_select="<label class=\"custom-check\"><input type=\"checkbox\" name=\"item_select[]\" class =\"checkall\" value=\"$id\"><span></span></label>";
        if ($status == "A") { $status = '<span class="label label-success">Published</span>'; }
        if ($status == "H") { $status = '<span class="label label-warning">Hidden</span>'; }


        $active_pages .= <<< HTML
            <tr>
                <td width="20" align="center">$item_select</td>
                <td width="50">
                    <input type="hidden" name="testm_id[]" value="$id">
                    <input type="text" name="testm_rank[]" value="$rank" style="color:#999999; width:30px;text-align:center;">
                </td>
                <td width="700">$editlink</td>
                <td width="100">$status</td>
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
    ############################################################################################################################
    ## Get the page functions
    ############################################################################################################################

    $page_functions = <<< HTML

    <ul class="page-action">
            <li class="pull-right">
                <a href="$htmladmin/index.php?do=blogcategories&view=trash" class="btn btn-default">
                    <i class="glyphicon glyphicon-trash"></i> View trash
                </a>
            </li>
            <li><button type="button" class="btn btn-default" onclick="submitForm('new',1)"><i class="glyphicon glyphicon-plus-sign"></i> New</button></li>
            <li><button type="button" class="btn btn-default" onclick="submitForm('delete')"><i class="glyphicon glyphicon-trash"></i> Move to trash</button></li>
            <li><button type="button" class="btn btn-default" onclick="submitForm('publish')"><i class="glyphicon glyphicon-eye-open"></i> Publish</button></li>
            <li><button type="button" class="btn btn-default" onclick="submitForm('hide')"><i class="glyphicon glyphicon-eye-close"></i> Hide</button></li>
            <li><button type="button" class="btn btn-default" onclick="submitForm('saverank', 1)"><i class="glyphicon glyphicon-sort-by-order"></i> Save Rank</button></li>
        </ul>
                     
HTML;
					 

					 
    $page_contents.= <<< HTML
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
                    <th  width="50" align="left">RANK</th>
                    <th  width="700" align="left">Label</th>
                    <th  width="100" align="left">STATUS</th>
                </tr>
            </thead>
            <tbody>
                $active_pages
            </tbody>
        </table>
        <input type="hidden" name="action" value="" id="action">
        <input type="hidden" name="do" value="blogcategories">
    </form>
HTML;

    require "resultPage.php";
    echo $result_page;
    exit();
}




?>