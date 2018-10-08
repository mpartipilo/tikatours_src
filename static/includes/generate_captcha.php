<?php
    session_start();
    require_once '../functions/func_all.php';
    
    
    // generate random number and store in session
    $config = array();

    $config['min_len']            = 8;
    $config['max_len']            = 8;
    $config['make_alpha_numeric'] = TRUE;

    $randomnr            = create_rand_chars($config);
    $_SESSION['captcha'] = hash('sha512', sha1(md5($randomnr)));
    

    // Init variables 
    $image_width  = 210;
    $image_height = 60;
    $font         = realpath('../assets/fonts/heuristica/regular/Heuristica-Regular.ttf');
    $font_size    = 24;
    $angle        = 2;
    //generate image
    $im                  = imagecreatetruecolor($image_width, $image_height);
    
    //colors:
    $white               = imagecolorallocate($im, 248, 243, 223);
    $grey                = imagecolorallocate($im, 128, 128, 128);
    $gold                = imagecolorallocate($im, 200, 147, 75);
    $black               = imagecolorallocate($im, 0, 0, 0);
    
    imagefilledrectangle($im, 0, 0, $image_width, $image_height, $white);

    // center text in image
    $text_box    = imagettfbbox($font_size,($angle+15),$font,$randomnr);
    
    $text_width  = $text_box[2]-$text_box[0];
    $text_height = $text_box[3]-$text_box[1];
    
    $x           = ($image_width/2) - (($text_width/2) -3);
    $y           = ($image_height/2) - (($text_height/2) -3);
    
    //draw text && create image:
    imagettftext($im, $font_size,$angle, $x, $y, $gold, $font, $randomnr);
    imagettftext($im, $font_size,$angle, ($x-6), ($y-5), $black, $font, $randomnr);
 
    // avoid browser caching
    header('Expires: Wed, 1 Jan 1997 00:00:00 GMT');
    header('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT');
    header('Cache-Control: no-store, no-cache, must-revalidate');
    header('Cache-Control: post-check=0, pre-check=0', false);
    header('Pragma: no-cache');
 
    //send image to browser
    header ("Content-type: image/jpeg");
    imagejpeg($im);
    imagedestroy($im);
    exit();
?>