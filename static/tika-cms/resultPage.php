<?php

## ----------------------------------------------------------------------------------------------------------------------
## NetZone 1.0
## index.php
##
## Author: Sam Walsh, Ton Jo Immanuel, Tomahawk Brand Management Ltd.
## Date: 19 May 2010
##
## Result Page
## - Goes through the array ($result_page_arr) that holds all of the pages 'tags' and then replaces the template file
##   with all of these tags whenever it finds ==[tagname]==
##
##
## ----------------------------------------------------------------------------------------------------------------------

global $main_menu, $rootadmin, $root, $htmladmin, $main_heading, $main_subheading;

if ($template == "") {
    $template = "templates/general.html";
}

$result_page = file_get_contents("$template");


$result_page_arr = array();
if ($valid == 1) {
    $main_menu = build_menu();
    $s_user_fname = USER_FNAME;
$s_user_lname = USER_LNAME;
$s_user_email = USER_EMAIL;
    $result_page_arr['user_loggedin'] = <<< HTML
    <div style="color:#fff;">
       <i class="glyphicon glyphicon-user"></i> User logged in: <strong>$s_user_fname $s_user_lname</strong> <a href="$htmladmin/index.php?do=logout" style="color:#fff;text-decoration:none"><strong>
       <span class="label label-success" style="padding:0.5em 0.8em 0.6em;margin-left:6px;font-size:13px;"><i class="fa fa-sign-out fa-fw"></i> Logout</span></strong></a>
    </div>
HTML;
}else{
$result_page_arr['user_loggedin'] = '';
}
$result_page_arr['jsVars'] = json_encode(array('baseUrl' => $htmladmin, 'dataManagerUrl' => "{$htmladmin}/index.php?do=files"));

$result_page_arr['root']            = $htmladmin;
$result_page_arr['a_imageurl']      = $imgdir ;
$result_page_arr['a_page_title']    = $page_title ;
$result_page_arr['page_heading']    = $page_heading ;
$result_page_arr['a_page_contents'] = $page_contents ;
$result_page_arr['a_main_menu']     = $main_menu ;
$result_page_arr['a_basedir']       = BASEDIR ;
$result_page_arr['a_page_updated']  = $page_updated ;
$result_page_arr['onload']          = $onload ;
$result_page_arr['onunload']        = $onunload ;
$result_page_arr['google_map_code'] = $google_map_code ;
$result_page_arr['submenu']         = $submenu ;
$result_page_arr['message']         = $message ;
$result_page_arr['data_disabled']   = ($disable_menu) ? ' disabled="disabled"' : '';
$result_page_arr['page_functions']  = $page_functions ;
$result_page_arr['main_heading']    = ($main_heading) ? '<h1 class="main-h1">'.$main_heading.'</h1>' : '';
$result_page_arr['main_subheading'] = ($main_subheading) ? '<h2 class="main-h2">'.$main_subheading.'</h2>' : '';
$result_page_arr['content_cls']     = ($result_page_arr['main_subheading']) ? ' xl' : '';
$year                               = date('Y');

$copyright = <<< HTML
Netzone CMS &copy; Copyright 2009 - $year. Tomahawk Brand Management Limited. 
HTML;
$result_page_arr['copyright']      = $copyright ;
$result_page_arr['script_page']    = $script_page ;
$result_page_arr['scripts-onload'] = $scripts_onload;
$result_page_arr['styles-int']     = $styles_int;
$result_page_arr['styles-ext']     = $styles_ext;
$result_page_arr['scripts-ext']    = $scripts_ext;
$result_page_arr['tab-content']    = $tab_content;

foreach($result_page_arr as $key => $value) 
{

    $result_page = str_replace('=='.$key.'==', $value, $result_page);       ## (template tag, tag value, result page)
}

function build_menu()
{

    global $do,$disable_menu,$htmladmin,$rootadmin,$root;
    $main_menu = "";


    $menu_pages = array(
        array(
            'group_label' => 'General',
            'items' => array(
                array(
                    'label' => 'Dashboard',
                    'uri' => 'dashboard',
                    'icon_cls' => 'fa fa-dashboard'
                ),
                array(
                    'label' => 'Pages',
                    'uri' => 'pages',
                    'icon_cls' => 'glyphicon glyphicon-list-alt'
                ),
                array(
                    'label' => 'Slideshows & Galleries',
                    'uri' => 'galleries',
                    'icon_cls' => 'glyphicon glyphicon-picture'
                ),
                array(
                    'label' => 'General Enquiries',
                    'uri' => 'enquiries',
                    'icon_cls' => 'glyphicon glyphicon-envelope'
                ),
                array(
                    'label' => 'Bookings',
                    'uri' => 'bookings',
                    'icon_cls' => 'glyphicon glyphicon-envelope'
                ),
                array(
                    'label' => 'File Manager',
                    'uri' => 'files',
                    'icon_cls' => 'glyphicon glyphicon-folder-close'
                ),
            ),
        ),
        array(
            'group_label' => 'Locations',
            'items' => array(
                array(
                    'label' => 'Countries',
                    'uri' => 'countries',
                    'icon_cls' => 'fa fa-flag'
                ),
                array(
                    'label' => 'Regions',
                    'uri' => 'regions',
                    'icon_cls' => 'fa fa-flag'
                ),
            ),
        ),
        array(
            'group_label' => 'Blog',
            'items' => array(
                array(
                    'label' => 'Blog Categories',
                    'uri' => 'blogcategories',
                    'icon_cls' => 'fa fa-rss-square'
                ),
                array(
                    'label' => 'Blog Posts',
                    'uri' => 'blogposts',
                    'icon_cls' => 'fa fa-rss-square'
                ),
            ),
        ),
        array(
            'group_label' => 'Tours',
            'items' => array(
                array(
                    'label' => 'Tour Main Categories',
                    'uri' => 'tourcategories',
                    'icon_cls' => 'fa  fa-list-alt'
                ),
                array(
                    'label' => 'Tour Sub Categories',
                    'uri' => 'toursubcategories',
                    'icon_cls' => 'fa  fa-list-alt'
                ),
                array(
                    'label' => 'Tours',
                    'uri' => 'tours',
                    'icon_cls' => 'fa fa-group'
                ),
            ),
        ),
    ); // end of menu
    

    $menu_pages['last'] = array(
        'group_label' => 'General Settings',
        'items' => array(),
    );

    if(ACCESS_SETTINGS == 'Y')
    {
        $menu_pages['last']['items'][] = array(
            'label' => 'Settings',
            'uri' => 'settings',
            'icon_cls' => 'glyphicon glyphicon-cog'
        );

        $menu_pages['last']['items'][] = array(
            'label' => 'Redirects',
            'uri' => 'redirects',
            'icon_cls' => 'fa fa-mail-forward'
        );
    }
   
    if(ACCESS_USERS == 'Y')
    {
        $menu_pages['last']['items'][] = array(
            'label' => 'Users',
            'uri' => 'users',
            'icon_cls' => 'glyphicon glyphicon-user'
        );
    }
    if(ACCESS_ACCESSGROUPS == 'Y')
    {
        $menu_pages['last']['items'][] = array(
            'label' => 'Usergroups',
            'uri' => 'accessgroups',
            'icon_cls' => 'fa fa-group'
        );
    }
    if(ACCESS_CMSSETTINGS == 'Y')
    {
        $menu_pages['last']['items'][] = array(
            'label' => 'CMS Settings',
            'uri' => 'cmssettings',
            'icon_cls' => 'glyphicon glyphicon-wrench'
        );
    }
   
    $menu_pages['last']['items'][] = array(
        'label' => 'Sitemap Generator',
        'uri' => 'sitemap',
        'icon_cls' => 'fa fa-sitemap'
    );

  
    $counter = 1;
    
    $menu_view = '<ul class="main-navigator">';
    foreach ($menu_pages as $menu) 
    {
        
        
        
        $menu_view .= '<li><span>'.$menu['group_label'].'</span>';
        $menu_view .= '<ul class="nav nav-pills nav-stacked navi">';
        foreach ($menu['items'] as $menu_item)
        {
            $menu_link = $htmladmin."/index.php?do=".$menu_item['uri'];
        
            $is_disabled = ($disable_menu == "true" || $menu_disable == 1) ? ' disabled' : '';
            $is_active   = ($menu_item['uri'] == $do) ? ' active' : '';
            $href        = ($disable_menu == "true" || $menu_disable == 1) ? '' : ' href="'.$htmladmin.'/index.php?do='.$menu_item['uri'].'"';
            $icon = ($menu_item['icon_cls']) ? ' <i class="'.$menu_item['icon_cls'].'"></i> ' : '';

            $menu_view .= '<li class="'.$is_disabled.$is_active.'"><a'.$href.'>'.$icon.$menu_item['label'].'</a></li>';
        }
        $menu_view .= '</ul>';
        $menu_view .= '</li>';
        $menu_view .= '<li class="nav-divider"></li>';

    }//end foreach

    $menu_view .= '</ul>';

    return $menu_view;
}

?>