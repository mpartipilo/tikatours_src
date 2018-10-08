<?php

function get_social_links($sql, $use_alt = false)
{
	global $rootfull, $htmlroot, $page;
	$social_links = fetch_all($sql);

	$html = '';
	if(count($social_links) > 0)
	{
		$html .= '<ul class="social-links">';
		$all_widgets = '';
		foreach ($social_links as $social_link)
		{	$active = (($htmlroot.'/'.$page) === $social_link['url']) ? ' class="'.$social_link['element_class'].' active"' : ' class="'.$social_link['element_class'].'"';
			$target = ($social_link['is_external']) ? ' target="_blank"' : '';
			$placement = ' data-placement="'.$social_link['placement'].'"';

			$elm = '<i class="'.$social_link['icon_cls'].'"></i>';
			
			if($social_link['has_widget'])
			{
				$has_widget = 'data-widget="'.$social_link['id'].'"';
				$this_widget = '<div id="widget-'.$social_link['id'].'" class="widget">'.$social_link['widget_blob'].'<a href="'.$social_link['url'].'" class="btn">'.$social_link['title'].'</a></div>';
				$all_widgets .= $this_widget;
			}
			else
			{
				$has_widget = '';
			}

			$html .= '<li'.$active.$placement.'><a '.$has_widget.' title="'.$social_link['title'].'"'.$target.' href="'.$social_link['url'].'">'.$elm.'</a></li>';
		}
		$html .= '</ul>';
	}

	return array('html' => $html, 'widgets' => $all_widgets);
}

$sql = "SELECT `id`, `url`, `title`, `icon_path`, `icon_alt`, `second_icon_path`, widget_blob, `placement`, `has_widget`, `is_external`, `element_class`,
		`use_icon`, `icon_cls`
		FROM `social_links`
		WHERE `is_active` = '1'
		AND `placement` = 'L'
		AND (`url` != '' OR `has_widget` = '1')
		ORDER BY `rank` ASC";

$social_data = get_social_links($sql);
$tags_arr['social'] = $social_data['html'];

$tags_arr['widgets'] = <<<H

<div class="widget-wrap">
	<div class="container">
		<div class="row">
			<div class="col-xs-12 text-center">
				<a href="/" class="logo hidden-xs">
                    <img src="/graphics/logo.png" alt="Hans Herzog logo">
                </a>
                {$social_data['widgets']}
                <div><a href="#" id="close-widget">close</a></div>
			</div>
		</div>
	</div>
</div>

H;

?>