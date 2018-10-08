<?php

###############################################################################################################################
## Make the Quicklinks
###############################################################################################################################

$quicklinks_view       = '';
$quicklinks_nav_footer = '';
$attached_quicklinks = fetch_value("SELECT GROUP_CONCAT(`page_id`) FROM `general_quicklinks` WHERE `quick_page_id` = '$page_id'");

if($attached_quicklinks)
{
    $quicklinks = fetch_all("SELECT gp.page_url, gp.page_title, gp.page_quicklink_heading, gp.page_quicklink_button, gp.page_quicklink_image, gp.page_quicklinksnippet
        FROM general_pages gp
        WHERE gp.page_id 
        IN($attached_quicklinks)
        AND gp.page_status = 'A'
        ORDER BY gp.page_rank
        LIMIT 5
    ");

    if(count($quicklinks) > 0)
    {

        $quicklinks_view .= '<div class="container-fluid"><div class="row">';
        $index = 0;
        foreach ($quicklinks as $quicklink)
        {
            $index++;
            if($quicklink['page_quicklink_image'] && $quicklink['page_quicklinksnippet']){
                
                if(count($quicklinks) == 5)
                {
                    if($index == 4 || $index == 5)
                    {
                        $col_md = 'col-md-6';
                    }
                    else
                    {
                        $col_md = 'col-md-4';
                    }
                }
                else
                {
                    if($index == 4)
                    {
                        $col_md = 'col-md-12';
                    }
                    else
                    {
                        $col_md = 'col-md-4';
                    }
                }
                

                $quicklinks_view .= <<< H

                    <div class="col-xs-12 col-sm-6 {$col_md} qlink">
                        <div class="qlink-img" style="background-image:url('{$quicklink['page_quicklink_image']}');"></div>
                        <div class="qlink-text">
                            <div class="inner">
                                <h2 class="text-center qlink-head"><a title="{$quicklink['page_title']}" href="{$quicklink['page_url']}">{$quicklink['page_quicklink_heading']}</a></h2>
                                <p class="text-center">{$quicklink['page_quicklinksnippet']}</p>
                                <div class="text-center">
                                    <a class="btn" href="/{$quicklink['page_url']}"><i class="fa fa-angle-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
H;
            }
        }   
            
        $quicklinks_view .= '</div></div>';
            
    }

}

if($page == 'home'){
    $tags_arr['quicklinks'] = '';
    $tags_arr['quicklinks_home'] = $quicklinks_view;
}else{
    $tags_arr['quicklinks'] = $quicklinks_view;
    $tags_arr['quicklinks_home'] = '';
}

?>