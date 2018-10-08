<?php

function view_trash()
{

    global $htmladmin, $active_pages, $valid, $page_id, $page_rank, $message, $item_select, $page_slidegroup, $page_title, $page_mkeywords, $page_mdescription,
    $page_heading,$page_url,$scripts_onload;

    $active_pages = "";

############################################################################################################################
## Get the list of general_pages
############################################################################################################################

    if($_POST['action'] === 'restore')
    {
    	$items_to_restore = $_POST['item_select'];
    	if(count($items_to_restore) > 0)
    	{
    		$page_ids = implode(', ', $items_to_restore);
    		$query = "UPDATE general_pages SET page_status = 'H' WHERE page_id IN ($page_ids)";
    		run_query($query);

    		header("Location: $htmladmin");
    		exit();
    	}
    	else
    	{
			$message = 'Plese select an item from list';
    	}
    }
    
    //Making the list of Parent
    function generatePageTable($active_pages,$parent_id = 0){
        global $generation, $id, $htmladmin, $scripts_onload;
        $sql = "SELECT *
                FROM general_pages
                WHERE page_parentid = '$parent_id'
                AND page_status = 'D'
                AND (page_mobile = '' OR page_mobile IS NULL)
                ORDER BY page_rank";
        $result = run_query($sql);

        $generation++;
        $indentation = '';
        for($i=1;$i<$generation;$i++){ $indentation = $indentation + 48; }

        if(mysql_num_rows($result) > 0){
            $functioncount++;
            $active_pages .= <<< HTML
            <ul>
HTML;
        }
        
        while($row = mysql_fetch_assoc($result))
        {
            if ($c%2 == 1 ? $bgc = "#FFFFFF" : $bgc = "#F6F8FD");
            $c++;

            // Set all of this page's values
            $page_id                = $row['page_id'];
            $page_parentid          = $row['page_parentid'];
            $page_title             = $row['page_title'];
            $page_label             = $row['page_label'];
            $page_rank              = $row['page_rank'];
            $page_status            = $row['page_status'];
            $page_url               = $row['page_url'];
            $page_dateupdated       = $row['page_dateupdated'];
            $page_dateupdated_date  = dbDateToNZDate($row['page_dateupdated']);
            $page_dateupdated_time  = dbDateToNZTime($row['page_dateupdated'],true);
            $page_cmslock_delete    = $row['page_cmslock_delete'];
            ## if this page's label is empty, then set it to be the page's title
            if($page_label == ''){ $page_label = $page_title; }
            ## if this page's label is STILL empty, then set it to be the page's url
            if($page_label == ''){ $page_label = $page_url;   }


            $item_select="<label class=\"custom-check\"><input type=\"checkbox\" name=\"item_select[]\" class =\"checkall\" value=\"$page_id\"><span></span></label>";
            if ($page_id == 1 || $page_cmslock_delete=='Y') {
                $item_select="<img src=\"$htmladmin/images/lock.png\" title=\"The homepage is always locked and can not be hidden \">";
            }

            if ($page_status == "D")
            {
                $page_status = '<span class="label label-danger">Deleted</span>';
            }
           
            $editlink="<a href=\"$htmladmin/index.php?do=pages&action=edit&id=$page_id\" title=\"Edit the '$page_label' page\">$page_label</a>";

            // Add this page to the dropdown menu
            $active_pages .= <<< HTML
            <tr>
            <td width="20" align="center">$item_select</td>
            <td style="padding-left:$indentation;">
            <input type="hidden" name="page_id[]" value="$page_id">
            <input type="text" name="page_rank[]" value="$page_rank" title="Page Rank for $page_label" style="color:#999999;margin-left:{$indentation}px;margin-right:15px;text-align:center;width:30px;">
            $editlink
            </td>
            <td width="100" align="center">$page_status</td>
            <td width="200">$page_dateupdated_date &nbsp;$page_dateupdated_time</td>
            </tr>
HTML;

            // Get all of the children of this page.
            // put the $disabled parameter to make sure that if this page can not be selected, then all of its childeren should not be able to be selected.
            $active_pages = generatePageTable($active_pages,$page_id);
            
            // Reset the disabled variable to 'enabled' (effectively) so that all of the siblings of this page CAN be selected
            $disabled = '';
            $active_pages .= <<< HTML
                </li>
HTML;
        }
        $generation--;
        if(mysql_num_rows($result) > 0){
            $active_pages .= <<< HTML
            </ul>
HTML;
        }

        return $active_pages;
    }


$functioncount = 1;
        $active_pages = <<< HTML
            <ul class="sortablerow"><li>
HTML;
$generation = 0;
        $active_pages = generatePageTable($active_pages);
$active_pages .= <<< HTML
            </li></ul>
HTML;






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
            <li><button type="button" class="btn btn-default" onclick="submitForm('restore',1)"><i class="fa fa-history"></i> Restore</button></li>
        </ul>

HTML;

    $page_contents .= <<< HTML
        <form action="$htmladmin/index.php?do=pages&view=trash" method="post" style="margin:0px;" name="pageList" id="pageList">
            <table width="100%" class="bordered">
                <thead>
                    <tr>
                        <th width="20">
                            <label class="custom-check">
                                <input type="checkbox" name="all" id="checkall">
                                <span></span>
                            </label>
                        </th>
                        <th>PAGE</th>
                        <th width="100" align="left" align="center">STATUS</th>
                        <th width="200" align="left">UPDATED</th>
                    </tr>
                </thead>
                <tbody>
                    $active_pages
                </tbody>
            </table>
            <input type="hidden" name="action" value="" id="action">
            <input type="hidden" name="do" value="pages">
        </form>
HTML;

    require "resultPage.php";
    echo $result_page;
    exit();


}


?>