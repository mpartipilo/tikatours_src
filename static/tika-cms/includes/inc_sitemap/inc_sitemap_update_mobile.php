<?php

$sitemap_xml = '';
$addedurls = array();

    // Get Pages from database
    $sql = "SELECT gp.page_id, gp.page_url, UNIX_TIMESTAMP(gp.page_dateupdated) AS page_dateupdated, gpm.page_url AS desktop_url
	    FROM general_pages gp
        INNER JOIN general_pages gpm
        ON (gp.page_desktop_id = gpm.page_id)
	    WHERE gp.page_status = 'A'
        AND gp.page_mobile = 'M'
        AND gp.page_url != ''
        ORDER BY gp.page_rank";
    $pages_arr = fetch_all($sql);
    if(count($pages_arr)){
	
	// Add each page to XML structure
	foreach($pages_arr as $key => $array){
        $url = ($array['page_url'] === 'home') ? '' : $array['page_url'];
        $desktop_url = $array['desktop_url'];
        if($desktop_url)
        {
            $desktop_url = ($array['desktop_url'] === 'home') ? '' : $array['desktop_url'];
            $canonical = '<xhtml:link rel="canonical" href="'.$htmlroot.'/'.$desktop_url.'" />';
        }
	    $loc 	= htmlentities("$mobile_url/{$url}", ENT_QUOTES, 'UTF-8');
	    $lastmod 	= date('c',$array['page_dateupdated']);
	    
	    if(!count($addedurls) || @!in_array($loc,$addedurls)){
		$addedurls[] = $loc;
	    
		$sitemap_xml = <<< XML
$sitemap_xml
<url>
    <loc>$loc</loc>
    <mobile:mobile/>
    $canonical
    <lastmod>$lastmod</lastmod>
</url>
XML;
		
	    }
	}
	
    }


// Finalize XML Structure

    $sitemap_xml = <<< XML
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
    $sitemap_xml
</urlset>
XML;




// Save XML to file

    // Update Sitemap Status
    $sql = "UPDATE general_settings
	    SET set_sitemapstatus = 'S'";
    run_query($sql);


    $xmlfile = fopen('../../m/Sitemap.xml','w');
    fwrite($xmlfile,$sitemap_xml);
    fclose($xmlfile);


// Save to robots.txt if not already in there

    // Get robots.txt file
    $robotstxt_path = "../../m/robots.txt";
    $robotstxt = fopen($robotstxt_path,'w');
    $robotstxt_contents = @fread($robotstxt,filesize($robotstxt_path));
    $robotstxt_contents .= <<< TXT
Sitemap: $mobile_url/Sitemap.xml 
TXT;

    fwrite($robotstxt,$robotstxt_contents);
    fclose($robotstxt);



// Sending XML to Google

   	    
    // file_get_contents("http://www.google.com/webmasters/tools/ping?sitemap=$mobile_url/Sitemap.xml");
	   

?>