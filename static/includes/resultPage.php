<?php
#### File: inc_resultPage.php


############################################################################################################################
## Insert the page items into their places (e.g. $page_arr['page-title'] -> ==page_title==)
############################################################################################################################
// Check Template

$sql = "SELECT tmpl_path
        FROM templates_normal
        WHERE tmpl_id = '$template_id'
        AND (`tmpl_mobile` = '' OR `tmpl_mobile` IS NULL)";                                    ## Select the URL for the template for the current page

$result = fetch_value($sql);

if ($result =="")
{                                                          ## If no result...
    $template    = 'index.html';                   ## ...make the template URL = default.html
    $template_id = fetch_value("SELECT tmpl_id FROM templates_normal WHERE tmpl_path = '$template'");
}
else
{  ## If there is a result...
    $template = $result;                          ## ...make the template URL = the URL in the database
}
$result_page = file_get_contents("$tmpldir/$template");                     ## Load the template ready for template tag insertion

foreach($tags_arr as $key => $value)
{
    $result_page = str_replace('=='.$key.'==', $value, $result_page);       ## (template tag, tag value, result page)
}

?>