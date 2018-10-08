<?php
###############################################################################################################################
## Fetch Website Settings
###############################################################################################################################
function fetchSettings()
{
    $sql = "SELECT gs.*
    FROM general_settings gs";
    return fetch_row($sql);
}

function fetchImportantPages()
{
    $sql = "SELECT ip.imppage_name AS name, gp.page_url AS url
    FROM general_pages gp, general_importantpages ip
    WHERE ip.page_id = gp.page_id
    AND gp.page_url != ''
    AND ip.is_mobile = '0'";
    $result = fetch_all($sql);
    $return_arr = array();
    foreach($result as $key => $array)
    {
        $this_importantpage_url     = $array['url'];
        $this_importantpage_name    = strtolower(str_replace(' ','',$array['name']));
        $return_arr['imppage_'.$this_importantpage_name] = $this_importantpage_url;
    }
    return $return_arr;
}
$settings_arr = array_merge(fetchSettings(), fetchImportantPages());

include "$incdir/formatSettings.php";


###############################################################################################################################
## Fetch Page Information
###############################################################################################################################

function get_content($pg_id, $mod_id)
{

    $output = '';
    $content_id = fetch_value("SELECT `id` FROM `content` WHERE `page_id` = '{$pg_id}' AND `module_id` = '{$mod_id}' LIMIT 1");
    if($content_id)
    {
      
        $rows = fetch_all("SELECT `id` FROM `content_row` WHERE `content_id` = '$content_id' ORDER BY `rank`");
        if(count($rows) > 0)
        {
            foreach ($rows as $row)
            {
                $columns = fetch_all("SELECT `content`, `css_class` FROM `content_column` WHERE `content_row_id` = '{$row['id']}' ORDER BY `rank`");

                if(count($columns) > 0)
                {
                    $output .= '<div class="row content-row">';
                    
                    foreach ($columns as $column)
                    {
                        $output .= '<div class="'.$column['css_class'].'">'.$column['content'].'</div>';
                    }
               
                    $output .= '</div>';
                }
            }
        }
    }
    return $output;
}

function fetchPageInfo($page)
{
    global $settings_arr, $tmpldir;
    $sql = "SELECT gp.*,
    (SELECT GROUP_CONCAT(`mod_id`) FROM `module_pages` WHERE `page_id` = gp.`page_id`) AS mod_ids_csv
    FROM general_pages gp
    WHERE page_url = '$page' AND page_status = 'A' AND (`page_mobile` = '' OR `page_mobile` IS NULL)";
    $page_arr = fetch_row($sql);

    if(empty($page_arr))
    {
        $page_arr = fetchPageInfo($settings_arr['imppage_404']);
        $page_arr['page_content'] = get_content($page_arr['page_id'], 1);
        header("HTTP/1.1 404 Not Found");
    }
    else
    {
        // build page content
        $page_arr['page_content'] = get_content($page_arr['page_id'], 1);
    }
    return $page_arr;
}

if ($page=='')
{
    $page = $settings_arr['imppage_home'];
}

$page_arr = array();
$page_arr = fetchPageInfo($page);

include "$incdir/formatTags.php";

###############################################################################################################################
## Page Insert Tags
###############################################################################################################################

$formatted_arr                 = array_merge($page_arr, $settings_arr);
$tags_arr                      = array();

// Page Inserts
$page_mod_ids_csv             = $formatted_arr['mod_ids_csv'];
$page_mod_ids_arr              = ($page_mod_ids_csv) ? explode(',', $page_mod_ids_csv) : array();
$page_title = $tags_arr['title']             = $formatted_arr['page_title'];         ## Metatag Title >> inc_formattemp.php
$tags_arr['mkeyw']             = $formatted_arr['page_mkeyw'];         ## Metatag Keywords
$tags_arr['mdescr']            = $formatted_arr['page_mdescr'];        ## Metatag Description
$tags_arr['mcache']            = $formatted_arr['page_mcache'];        ## Metatag Cache >> inc_formattemp.php
$mrobots                       = $tags_arr['mrobots']     = $formatted_arr['page_mrobots'];       ## Metatag Robots >> inc_formattemp.php
$tags_arr['mauthor']           = 'Tomahawk';                           ## Metatag Author
$tags_arr['seokeyw']           = $formatted_arr['page_seokeyw'];       ## SEO Keywords
$page_heading                  = $formatted_arr['page_heading'];
$page_introduction             = $formatted_arr['page_introduction'];
$tags_arr['page_intro']        = $page_introduction;
$page_menu = $tags_arr['page_menu']         = $formatted_arr['page_menu'];
$tags_arr['heading']           = $page_heading;
$tags_arr['sub-heading']       = '<span>'.$formatted_arr['page_subheading'].'</span>';
$tags_arr['content']           = $formatted_arr['page_content'];       ## Page Content
$tags_arr['catchphrase']       = $formatted_arr['page_catchphrase'];
$page_mobile_id                = $tags_arr['page_mobile_id'] = $formatted_arr['page_mobile_id'];  ## Page Introduction
$mobile_page_url               = ($page_mobile_id) ? fetch_value("SELECT page_url FROM general_pages WHERE page_id='$page_mobile_id' AND page_status='A' AND page_mobile='M'"): '';

$tags_arr['mobile_page_url']   = $mobile_url.'/'.$mobile_page_url;

// Company/Website Inserts
$company                       = $tags_arr['company']              = $formatted_arr['set_company'];        ## Company Name
$tags_arr['copyright']         = $formatted_arr['copyright'];                                                ## e.g. Copyright 2007 - 2010. Company. >> inc_formattemp.php
$tags_arr['credits']           = $formatted_arr['credits'];                                                  ## e.g. Website design by Webdirectionz @ Tomahawk >> inc_formattemp.php
$set_availabilityid            = $tags_arr['set_availabilityid']   = $formatted_arr['set_availabilityid'];   ## Resbook ID
$set_email                     = $tags_arr['set_email']            = $formatted_arr['set_email'];            ## Company email(s)
$set_phone                     = $tags_arr['set_phone']            = $formatted_arr['set_phone'];            ## Company phone
$set_address                   = $tags_arr['set_address']          = nl2br($formatted_arr['set_address']);          ## Company address
$comp_emails                   = get_email_list($set_email);
$primary_email                 = $tags_arr['primary_email'] = $comp_emails->primaryEmail;
$other_emails_arr              = $comp_emails->list;

// Code/Link Inserts
$tags_arr['analytics']         = (getenv('REMOTE_ADDR') != '127.0.0.1') ? $formatted_arr['set_analytics'] : ''; ## Analytics Code (e.g. Google Analytics)
$tags_arr['root']              = $htmlroot;                                                                     ## For use to direct the template to the root of the website for css, js & image files
$tags_arr['fromroot']          = $fromroot;
$tags_arr['404_page']          = file_get_contents("$tmpldir/404.html");

// Code Variables                                                           ## Variables with information about the current page
$page_id                       = $formatted_arr['page_id'];            ## Page Id
$page_url                      = $formatted_arr['page_url'];
$template_id                   = $formatted_arr['tmpl_id'];            ## Template Id
$number_of_module_tags         = fetch_value("SELECT tmpl_nummoduletags FROM templates_normal WHERE tmpl_id = '$template_id' AND (tmpl_mobile = '' OR tmpl_mobile IS NULL)");
$absparent_id                  = getAbsoluteParentId($page_id);        ## Absolute Parent Id
$abs_page_heading              = fetch_value("SELECT page_menu FROM general_pages WHERE page_id = '$absparent_id' AND page_status = 'A' LIMIT 1");
$imggrp_id                     = $formatted_arr['imggrp_id'];          ## Slideshow Id
$main_image                    = $formatted_arr['page_imagepath'];     ## Page Image
$main_cat_id                   = $formatted_arr['category_id'];
$page_country_id               = $formatted_arr['country_id'];

// Important Pages
$page_home             = $formatted_arr['imppage_home'];
$page_404              = $formatted_arr['imppage_404'];
$page_bookings         = $formatted_arr['imppage_bookings'];
$page_widgets          = $formatted_arr['imppage_widgets'];
$page_contact          = $formatted_arr['imppage_contact'];
$tags_arr['contact'] = $page_contact;

$tags_arr['home']  = '';
$tags_arr['ss']  = 'no-ss';
if($page_id == 1)
{
    $tags_arr['home']  = 'home';
}

$asset_files = array();

// js vars 
$jsVars = array(
    'globals' => array(
        'baseUrl'=> $tags_arr['root'],
        'slideshowSpeed' => (($formatted_arr['slideshow_speed']) ? $formatted_arr['slideshow_speed'] : '5000')
    ),
);

// Initializing Empty Tags                                              ## Tags made for later use
$tags_arr['scripts-load-top']   = '';
$tags_arr['style-int']          = '';                                   ## Position held for internal styles
$tags_arr['style-ext']          = '';                                   ## Position held for external styles
$tags_arr['script-ext']         = '';                                   ## Position held for external scripts
$tags_arr['script-onload']      = '';                                   ## Position held for onload scripts
$tags_arr['scripts-googleload'] = '';
$tags_arr['module']             = '';
$tags_arr['body-class']         = '';
$tags_arr['maps-script']        = '';
$tags_arr['cat-list']           = '';
$tags_arr['tour-list']          = '';
$tags_arr['gallery-index']      = '';
$tags_arr['home-gallery']       = '';
$tags_arr['sub-nav']            = '';
$tags_arr['breadcrumbs']        = '';
$tags_arr['has-bc'] = '';
$tags_arr['video'] = '';

$ex_meta_taga_arr = array(
    '1' => 'all',
    '2' => 'none',
    '3' => 'noindex, follow',
    '4' => 'index, nofollow',
    '5' => 'noarchive',
);

$tags_arr['ex_meta_taga'] = <<< H
<meta name="robots" content="{$ex_meta_taga_arr[$mrobots]}">
\t<meta name="googlebot" content="{$ex_meta_taga_arr[$mrobots]}">
H;


if(!fetch_value("SELECT tmpl_id FROM templates_normal WHERE tmpl_id = '$template_id' AND (`tmpl_mobile` = '' OR `tmpl_mobile` IS NULL)"))
{
    $template_id = fetch_value("SELECT tmpl_id FROM templates_normal WHERE (`tmpl_mobile` = '' OR `tmpl_mobile` IS NULL) LIMIT 1");
    $number_of_module_tags = fetch_value("SELECT tmpl_nummoduletags FROM templates_normal WHERE tmpl_id = '$template_id' AND (`tmpl_mobile` = '' OR `tmpl_mobile` IS NULL)");
}

// set default body class for active templates
include ("$classdir/mobile_detect.php"); ## Mobile Detection
$detect = new Mobile_Detect;

$tags_arr['phone']   = ($set_phone) ? '<a href="tel:'.$set_phone.'">'.$set_phone.'</a>' : '';
$tags_arr['phone-icon'] = ($set_phone) ? '<a class="visible-xs" href="tel:'.$set_phone.'"><i class="fa fa-phone"></i></a>' : '';
$tags_arr['phone-text'] = ($set_phone) ? '<span> or call '.$set_phone.'</span>' : '';
$tags_arr['email']   = ($primary_email) ? '<a href="mailto:'.$primary_email.'">'.$primary_email.'</a>' : '';
$tags_arr['address'] = ($set_address) ? '<address>'.$set_address.'</address>' : '';

// $other_emails = '';
// $array = json_decode(json_encode($other_emails_arr), true);

$tags_arr['map_canvas_view'] = '';

if($page_country_id)
{
    $country_name = fetch_value("SELECT `name` FROM `country` WHERE `id` = '$page_country_id'");

    $tags_arr['map_canvas_view'] = <<< H
    <div id="map-upper" data-toggle="#map-canvas">
        <p><i class="fa fa-map-marker"></i></p>
        <p class="xxl">Where in the World is {$country_name}?</p>
        <p>Click to see map <i class="fa fa-angle-double-down"></i></p>
    </div>
H;
    $tags_arr['map_canvas_view'] .= '<div id="map-canvas"><h3>Loading...</h3></div>';
    

    $jsVars['globals']['location'] = md5($page_country_id);

    $tags_arr['scripts-load-top'] .= '<script src="http://maps.google.com/maps/api/js?sensor=false"></script>';
    $tags_arr['scripts-load-top'] .= '<script src="/assets/js/libs/richmarker.min.js"></script>';
}

?>