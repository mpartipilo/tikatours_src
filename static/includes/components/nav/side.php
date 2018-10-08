<?php
    
function get_sub_navigation_recursive($pg_id, $sel = '')
{
   $sql = "SELECT page_id, page_url, page_menu, page_title, page_parentid
            FROM general_pages
            WHERE page_parentid = '{$pg_id}'
            AND (`page_mobile` = '' OR `page_mobile` IS NULL)
            AND page_menu != ''
            AND page_status='A'
            ORDER BY page_rank ASC";

    $pages  = fetch_all($sql);
    $html = '';
    $ul   = '<ul>%s</ul>';

    if(count($pages) > 0)
    {
        foreach ($pages as $page)
        {
            $page_id_new = $page['page_id'];
            $label = (($page['page_menu']) ? $page['page_menu'] : '');
            $opt_attr = array();
            if($page_id_new == $sel) $opt_attr['class'] = 'active';
            
            $child_list = get_sub_navigation_recursive($page_id_new, $sel);
            $html .= createElement($opt_attr, 'li', createElement(array('href'=> '/'.$page['page_url'], 'title' => $page['page_title']), 'a', $label).$child_list)."\n";    
        }

       return sprintf($ul, $html);
    }

    return $html;
}

$has_side_nav   = false;
$ex_content_cls = $tags_arr['ex_content_cls']  = $tags_arr['nav-sub'] = '';
$nav_sub        = get_sub_navigation_recursive($absparent_id, $page_id);

if($nav_sub)
{
    $has_side_nav               = true;
    $tags_arr['nav-sub']        = '<aside class="col-xs-12 hidden-xs hidden-sm aside'.(($template_id == 1) ? ' col-md-3' : '').'"><h2>'.$abs_page_heading.'</h2><nav class="side-nav">'.$nav_sub.'</nav></aside>';
    $tags_arr['ex_content_cls'] = '  col-md-9';
}


?>