<?php
session_start();   
require_once ('../utility/config.php');
// error_reporting(0);

if(!$c_Connection->Connect()) {

    echo "Database connection failed";
    exit;
}

if($debug)
{
	include_once $classdir.'/firephp/fb.php';
	FB::setEnabled($debug);
}

$action      = sanitize_one($_POST['action'], 'sqlsafe');
$social_id   = sanitize_one($_POST['social_id'], 'sqlsafe');

switch($action)
{
	case 'loadwidget':

		if($social_id)
		{
			$widget = fetch_value("SELECT `widget_blob` FROM `social_links` WHERE `id` = '$social_id'");
		}

		die($widget);
		
    break;

    case 'get-map':
    	get_country_map(sanitize_one($_POST['index'], 'sqlsafe'));
    break;

    case 'get-info':
    	get_region_info(sanitize_one($_POST['index'], 'sqlsafe'));
    break;

}


function get_country_map($hashed_country_id) // MD5 hashed key
{
	$data = array();

	if($hashed_country_id)
	{
		$country = fetch_row("SELECT `id`, `latitude` AS lat, `longitude` AS lng, `formatted_address` AS label, `flag_path` AS icon
		FROM `country`
		WHERE Md5(`id`) = '{$hashed_country_id}'
		AND `status` = 'A'
		LIMIT 1");

		if($country)
		{
			$data = $country;
			$regions = fetch_all("SELECT `id` AS ind, `latitude` AS lat, `longitude` AS lng, `label`
			FROM `region`
			WHERE `status` = 'A'
			AND `latitude` != ''
			AND `longitude` != ''
			AND `country_id` = '{$country['id']}'");

			unset($data['id']);
			$data['regions'] = $regions;


		}
	}

	die(json_encode($data));
}

function get_region_info($region_id) // MD5 hashed key
{
	$data = array();

	if($region_id)
	{
		$data = fetch_row("SELECT `heading` AS title, `short_descr` AS info, `image_path`AS imgSrc FROM `region` WHERE `id` = '{$region_id}' LIMIT 1");
	}

	die(json_encode($data));
}

?>