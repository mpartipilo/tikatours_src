<?php

#### File: formatSettings.php
############################################################################################################################
## Format the Settings Array (input:$settings_arr) into useful settings (output:$settings_arr)
############################################################################################################################
global $settings_arr;
    # CALCULATING YEARS
        $startyear = $settings_arr['set_startyear'];
        $thisyear = date('Y');
        if($startyear){
            $runningyears = ($thisyear > $startyear) ? "$startyear - $thisyear" : $thisyear;
        }else{
            $runningyears = $thisyear;
        }
        
    $company = $settings_arr['set_company'];


    # COPYRIGHT
        $settings_arr['copyright'] = '&copy; Copyright '.$thisyear.'.  '.$company.'.';
    $settings_arr['credits'] = <<< HTML
    
Website by <a href="http://www.tomahawk.co.nz/our-work" target="_blank">Tomahawk</a>

HTML;

   
?>