<?php
## ----------------------------------------------------------------------------------------------------------------------
## NetZone 1.0
## index.php
##
## Author: Sam Walsh, Ton Jo Immanuel, Tomahawk Brand Management Ltd.
## Date: 19 May 2010
##
## Main Page
## ----------------------------------------------------------------------------------------------------------------------
session_start();

###############################################################################################################################
## Required Files
###############################################################################################################################
$config_type = 'tika-cms';                                                 ## Get the Admin version of the config file (found in the main folder)
require_once ('../utility/config.php');                                 ## System config file (in the main folder)

define('MAX_COLUMNS', 4);
############################################################################################################################
## Get the query string and split the name value pairs
############################################################################################################################

global $do,$session,$action,$disable_menu;

$do           = $_REQUEST['do'];
$session      = $_SESSION['s_user_id'];
$action       = $_REQUEST['action'];
$id           = $_REQUEST['id'];
$disable_menu = $_REQUEST['disable_menu'];
$login_cls = '';
include_once("$incdir_admin/inc_login/inc_login.php");                      ## used to login, logout and check for valid session

############################################################################################################################
## Find out what the &do value is from the query string and "do" what the user wants
############################################################################################################################

$page_contents = "";

$sql = "SELECT *
FROM cms_settings
WHERE cmsset_status = 'A'";
$settings_result = run_query($sql);                                     ## Get all of the CMS settings
while($row = mysql_fetch_assoc($settings_result))
{
    ${$row['cmsset_name']} = $row['cmsset_value'];                ## Convert the settings into variables
}

if($do == 'login')
{
    do_login();                                                         ## >> inc_login.php
    $do = 'dashboard';                                                     ## If the value of do is "login" change it to "pages"

    if ($message != "")
    {
    $page_contents = <<< HTML
    <div class="alert alert-danger"><strong>$message</strong></div>
HTML;
    $login_cls = ' invalid';
    }
}
elseif($do == 'logout')
{
    do_logout();                                                        ## >> inc_login.php
    if($message != "")
    {
    $page_contents = <<< HTML
    <div class="alert alert-success"><strong>$message</strong></div>
HTML;



    }
}
elseif($session != "")
{
    $valid = check_session();                                           ## >> inc_login.php
    if($do==""){$do='dashboard';}
}
else
{
    $valid = 0;                                                         ## user is not logged in
}

if($do != "" && $valid == 1)            ## user has logged in and has a valid login session....
{
    define(USER_ID, $_SESSION['s_user_id']);
    define(USER_FNAME, $_SESSION['s_user_fname']);
    define(USER_LNAME, $_SESSION['s_user_lname']);
    define(USER_EMAIL, $_SESSION['s_user_email']);
    define(ACCESS_ID, $_SESSION['s_access_id']);

    $s_access_id = ACCESS_ID;
    $sql = "SELECT *
    FROM cms_accessgroups
    WHERE access_id = '$s_access_id'";

    $access_arr = fetch_row($sql);

    include_once('access.php');

    require_once("includes/inc_$do/inc_$do.php");                      ## Get the include file from the do variable, load it in
    do_main();                                                          ## and run the main subroutine.
}
else
{
    display_login_screen();                                        ## user is not logged in so give them the login page
}


require "resultPage.php";                                               ## goes through all of the template tags & replaces them with PHP-processed variables
echo $result_page;                                                      ## echo the final page with all of the replaced template-tags

?>