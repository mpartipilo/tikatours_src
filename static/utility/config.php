<?php
# Explanation:

############################################################################################################################
## File Management & Database Passwords
############################################################################################################################
## Localhost settings

date_default_timezone_set ('Pacific/Auckland');

if(strstr($_SERVER['HTTP_HOST'],'localhost') || strstr($_SERVER['HTTP_HOST'],'192.168.36.108'))
{
    $online         = 'N';                                  ## Online?   Yes='Y'   No='N'
    
    ## DIRECTORIES
    $fromroot     = '/resbook';                      ## This is the folder within localhost(/www AKA htdocs) (e.g. 'http://localhost/cookiecutter/index.php' would be '/cookiecutter')

    // CLIENTSIDE PERSPECTIVE
    $htmlrootfull = "http://".$_SERVER['HTTP_HOST'];
    $htmlroot     = "$htmlrootfull$fromroot";
    $httpsroot    = "http://".$_SERVER['HTTP_HOST'].$fromroot;
    $htmladmin    = "$htmlroot/admin";
    $httpsadmin   = "https://".$_SERVER['HTTP_HOST'].$fromroot.'/admin';


    // SERVERSIDE PERSPECTIVE
    $rootfull  = "/Applications/XAMPP/xamppfiles/htdocs";
    $root      = "$rootfull$fromroot";
    $rootadmin = "$root/admin";
    
    ## DATABASE
    $db_host   = 'localhost';
    $db_user   = 'root';
    $db_pwd    = '';
    $db_name   = 'resbook';
    $debug     = TRUE;
    $mobile_url   = '';
}
## Server settings
else
{
    $online       = 'Y';                                  ## Online?   Yes='Y'   No='N'
    
    ## DIRECTORIES
    $fromroot     = '';  ## Use this when a website is being tested (e.g. 'http://www.website.com/testarea/index.php' would be '/testarea')

    // CLIENTSIDE PERSPECTIVE

    $htmlrootfull = "http://www.tikatours.com";
    $htmlroot     = "$htmlrootfull$fromroot";
    $htmladmin    = "$htmlroot/tika-cms";
    $httpsadmin   = "https://".$_SERVER['HTTP_HOST'].$fromroot.'/tika-cms';

    // SERVERSIDE PERSPECTIVE

    $rootfull     = "/home/tikatolnjxnf05/public_html";
    $root         = "$rootfull$fromroot";
    $rootadmin    = "$root/tika-cms";

    ## DATABASE
    $db_host      = 'mysql05.webhosting.nl';
    $db_user      = 'tikatoursufywxjz';
    $db_pwd       = 'AcoveDopu|73';
    $db_name      = 'tikatoursocahhvm';

    $debug        = TRUE;
    $mobile_url   = '';
}


############################################################################################################################
## Directories
############################################################################################################################

## Image Directory
$imgurl          = "$root/library";
$imgurl_admin    = "$rootadmin/library";
$imgurl_html     = "$htmlroot/images";

## Template Directory
$tmpldir         = "$root/templates";
$tmpldir_admin   = "$rootadmin/templates";
$tmpldir_html    = "$htmlroot/templates";

## Modules Directory
$moddir          = "$root/modules";
$moddir_html     = "$htmlroot/modules";
$moddir_admin    = "$rootadmin/modules";

## Includes Directory
$incdir          = "$root/includes";
$incdir_admin    = "$rootadmin/includes";

## functions Directory
$funcdir         = "$root/functions";
$funcdir_admin   = "$rootadmin/functions";

## Utility Directory
$utildir         = "$root/utility";
$utildir_admin   = "$rootadmin/utility";

## Assets Directory
$assetsdir       = "$root/assets";
$assetsdir_admin = "$rootadmin/assets";

## Services Directory
$classdir        = "$root/classes";
$classdir_admin  = "$rootadmin/classes";

## AJAX Directory
$ajaxdir         = "$root/ajax";
$ajaxdir_admin   = "$rootadmin/ajax";
$ajaxdir_html    = "$htmlroot/ajax";

## Creating the Database Connections
@include_once("CConnection.php");

include_once($funcdir.'/func_all.php');

## To use another directory just add the prefix of the directory variable (in this case 'funcdir')
$c_Connection = new CConnection();
$c_Connection->Configure($db_host, $db_name, $db_user, $db_pwd);


############################################################################################################################
## Script Processing
############################################################################################################################

## Error Reporting?
$error_reporting  = 'Y';
## Notice Reporting?
$notice_reporting = 'N';

if(strtolower($error_reporting)=='y')
{
    if(strtolower($notice_reporting)=='y')
    {
        ini_set('error_reporting', E_ALL);
    }
    else
    {
        ini_set('error_reporting', E_ALL & ~E_NOTICE);
    }
    ini_set('display_errors', 1);
}
else
{
    ini_set('display_errors', 1);
}

############################################################################################################################
## Website specific settings
############################################################################################################################

$availability_setcount = 10;
$demo_mode             = true;

?>