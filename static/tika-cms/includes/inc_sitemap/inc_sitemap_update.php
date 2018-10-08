<?php

$sitemap_xml = '';
$addedurls = array();

// General Sitemap

// Change Sitemap Status
$sql = "UPDATE general_settings SET set_sitemapstatus = 'F'";
run_query($sql);
    
// Get Pages from database
$sql = "SELECT gp.page_id, gp.page_url, UNIX_TIMESTAMP(gp.page_dateupdated) AS page_dateupdated
FROM general_pages gp
WHERE gp.page_status = 'A'
AND gp.page_url != ''
ORDER BY gp.page_rank";

$pages_arr = fetch_all($sql);

    if(count($pages_arr)){
    
    // Add each page to XML structure
    foreach($pages_arr as $key => $array){

        $url = ($array['page_url'] === 'home') ? '' : $array['page_url'];
        $loc = htmlentities("$htmlroot/{$url}", ENT_QUOTES, 'UTF-8');
        $lastmod = date('c',$array['page_dateupdated']);
        
        if(!count($addedurls) || @!in_array($loc,$addedurls)){
        $addedurls[] = $loc;
        
        $sitemap_xml .= <<< XML
<url>
    <loc>$loc</loc>
    <lastmod>$lastmod</lastmod>
</url>
XML;
        
        }
    }
    
    }

//Get the tours and add to sitemap
$sql2 = "SELECT `url`,`main_category_id`,`sub_category_id`
        FROM `tour` 
        WHERE `status` = 'A'";

$tour_arr = fetch_all($sql2);
// $tour_page = fetch_value("SELECT p.`page_url` FROM `general_pages` p LEFT JOIN `general_importantpages` ip ON (p.`page_id` = ip.`page_id`) WHERE ip.`imppage_id` = 3");
    
    foreach ($tour_arr as $tour) {

        $main_id      = $tour['main_category_id'];
        $sub_id       = $tour['sub_category_id'];
        
        $main_cat_url = fetch_value("SELECT `page_url` FROM `general_pages` WHERE `category_id` = '$main_id' LIMIT 1");
        $sub_cat_url  = fetch_value("SELECT `url` FROM `tour_category` WHERE `id` = '$sub_id' LIMIT 1");
        $tour_url     = $tour['url'];
        
        $full_url     = $main_cat_url.'/'.$sub_cat_url.'/'.$tour_url;

        $loc = htmlentities("$htmlroot/{$full_url}", ENT_QUOTES, 'UTF-8');
        $sitemap_xml .= <<< XML
<url>
    <loc>$loc</loc>
</url>
XML;
    }

        $sitemap_xml = <<< XML
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
    $sitemap_xml
</urlset>
XML;



// Save XML to file

    // Update Sitemap Status
$sql = "UPDATE general_settings SET set_sitemapstatus = 'S'";
run_query($sql);


$xmlfile = fopen('../../sitemap.xml','w');
fwrite($xmlfile,$sitemap_xml);
fclose($xmlfile);


// Save to robots.txt if not already in there

    // Get robots.txt file
    $robotstxt_path = "../../robots.txt";
    $robotstxt = fopen($robotstxt_path,'w');
    $robotstxt_contents = @fread($robotstxt,filesize($robotstxt_path));
    $robotstxt_contents .= <<< TXT
Sitemap: $htmlroot/sitemap.xml 
TXT;

    fwrite($robotstxt,$robotstxt_contents);
    fclose($robotstxt);

// Sending XML to Google
file_get_contents("http://www.google.com/webmasters/tools/ping?sitemap=$htmlroot/sitemap.xml");     

// Update Sitemap Status
$sql = "UPDATE general_settings SET set_sitemapstatus = 'U'";
run_query($sql);
        
// Update Sitemap Status
$sql = "UPDATE general_settings SET set_sitemapstatus = 'I'";
run_query($sql);
    
// Log update time
$sql = "UPDATE general_settings SET set_sitemapupdated = now()";
run_query($sql);

?>