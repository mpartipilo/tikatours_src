<?php

// General footer navigation
$nav_footer_arr = fetch_all("
	SELECT page_url, page_footer, page_title
	FROM general_pages
	WHERE page_status = 'A'
	AND page_footer != ''
	ORDER BY page_rank ASC
");

$nav_footer  = '';
if(count($nav_footer_arr) > 0)
{
	foreach ($nav_footer_arr as $nav_footer_link)
	{
		$nav_footer_link_url = ($nav_footer_link['page_url'] === 'home') ?'' : $nav_footer_link['page_url'];
		$nav_footer_links .= '<li><a href="/'.$nav_footer_link_url.'" title="'.$nav_footer_link['page_title'].'">'.$nav_footer_link['page_footer'].'</a></li>';
	}


$nav_footer .= <<< H

<div class="row">
	<div class="col-xs-12">
	    <ul class="footer-nav">
	 		$nav_footer_links
	    </ul>
	</div>
</div>
H;

}

$tags_arr['footer-nav'] = $nav_footer;

?>