<?php

$max_pages_generation = fetch_value("SELECT `cmsset_value` FROM `cms_settings` WHERE `cmsset_id` = '2' AND `cmsset_status` = 'A' LIMIT 1");

if(!function_exists('main_navigation'))
{
	$level = 0;
	
	function main_navigation($parent = 0, $current_page = '')
    {

    	global $max_pages, $max_pages_generation, $level, $page_arr;

    	$sql = "SELECT `page_id`, `page_menu`, `page_title`, `page_url`, `page_parentid`,`category_id`";
    	$sql .= "FROM general_pages
    	WHERE page_status = 'A'";
    	$sql .= " AND page_parentid = '$parent'
		AND page_menu != ''
		AND page_id != '1'
		ORDER BY page_rank ASC";

		$pages  = fetch_all($sql);

		$html   = '';

    	if(count($pages) > 0)
    	{
    		$level++;

    		foreach ($pages as $page)
    		{
    			$page_id  = $page['page_id'];
				$active   = ($page['page_url'] === $current_page || $page_arr['page_parentid'] == $page_id) ? ' class="active"' : '';
				$page_url = ($page['page_url'] != 'home') ? $page['page_url'] : '';
				$cat_id   = $page['category_id'];

				$sub_menu = '';
				$sub_menu = main_navigation($page_id, $current_page);

				if($cat_id)
				{
					//page has category attached - grab all its sub categories
					$sql2 = "SELECT `label`,`url`,`title` FROM `tour_category` WHERE `parent_id` = '$cat_id' AND `status` = 'A' ORDER BY `rank`";
					$sub_arr = fetch_all($sql2);
					if(!empty($sub_arr))
					{
						$sub_menu = '<ul>';
						foreach ($sub_arr as $sub) {
							$full_url = '/'.$page_url.'/'.$sub['url'];
							$sub_menu .= '<li><a href="'.$full_url.'" title="'.$sub['title'].'">'.$sub['label'].'</a></li>';
						}
						$sub_menu .= '</ul>';
					}
				}

				if($sub_menu)
	    		{
					$icon  = '<i class="fa fa-bars"></i>';
					$icon2  = '<i class="fa fa-caret-down"></i><i class="fa fa-caret-right"></i>';
				}
				else
				{
					$icon  = '';
					$icon2 = '';
				}

		    	$html .= '<li '.$active.'>'.$icon;
		    	$html .= '<a href="/'.$page_url.'" title="'.$page['page_title'].'">'.$page['page_menu'].$icon2.'</a>';
		    	$html .= $sub_menu;
		    	$html .= '</li>';

    		}
    		
    		$level--;

    		return sprintf('<ul'.(($parent != 0) ? ' class="level-'.$level.'"' : '').'>%s</ul>', $html);

    	}

    	return $html;
    }
}

$tags_arr['nav-main'] = '<nav>'.main_navigation(0, $page).'</nav>';

?>