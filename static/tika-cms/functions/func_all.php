<?php
@include("$funcdir_admin/func_server.php");
@include("$funcdir_admin/func_truncate.php");

//framework
function pa ($default = "list") {
	if (isset($_REQUEST["pa"])) {
		return $_REQUEST["pa"];
	} else {
		return $default;
	}
}

function arrayToSQLIn($array) {
	$bar = "";
	foreach ($array as $value) {
		if ($bar != "") $bar .= ",";
		$bar .= quoteSQL($value,false);
	}
	return $bar;
}

//session
function isLoggedIn() {
	if (isset($_SESSION['session_user_id']) && ($_SESSION['session_user_id'] != "" && $_SESSION['session_user_id'] != 0)){
		return $_SESSION["session_realname"];
	}
	return false;
}

function loginRequired () {
	if (!isLoggedIn()){
		if (!strstr($_SERVER['PHP_SELF'],"login.php")) {

			$_SESSION["wherewasi"] = "http://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] ;
			header('Location: login.php');
		}
	}
}

function adminRequired() {
	if (!$_SESSION["admin"]) {
		header('Location: login.php');
	}
}

function sticky($variable) {
	if (isset($_REQUEST[$variable])) {
		$_SESSION[$variable] = $_REQUEST[$variable];
	}
	return $_SESSION[$variable];
}

//database
function quoteSQL($foo,$null =true) {
	if ($foo =="" && $null) {
		return "null";
	} else {
		return "'" . mysql_escape_string($foo) . "'";
	}
}

function run_query($sql) {
	$result = @mysql_query($sql);
	if ($result) {
		return $result;
	} else {
		$GLOBALS["error"] = "Lookup failed: " . mysql_error() . $sql;
		return false;
	}
}

function fetch_row($sql) {

	$result = run_query($sql);
	if ($result) {
		return mysql_fetch_assoc($result);
	}
	return false;
}

function mysql_quick_call($sql) {
	$result = run_query($sql);
	if ($result) {
		$row = mysql_fetch_row($result);
		return $row[0];
	}
	return false;

}

function fetch_all($q){
	$r = run_query($q);
	$arr = array();
	while ($row = mysql_fetch_assoc($r))
		$arr[] = $row;
		return $arr;
}


//############################ array ############################################

//Input array must be 2-dimensional and second dimension must be associative

//$val represents the key in the 2nd dimension that needs to be extracted

//optional $key will create an associative array with that key will be also extracted from the 2nd dimension of original array

function array_extract($arr, $val, $key = NULL)
{
	$new = array();
	if ($key){
            foreach ($arr as $item)
                if(isset($item[$key]) && isset($item[$val])){
                    $new[$item[$key]] = $item[$val];
                }
        }else{
		foreach ($arr as $item){
			$new[] = $item[$val];
                }
	}

	return $new;

}


function array_depth($array) {
    $max_depth = 1;

    foreach ($array as $value) {
        if (is_array($value)) {
            $depth = array_depth($value) + 1;

            if ($depth > $max_depth) {
                $max_depth = $depth;
            }
        }
    }

    return $max_depth;
}

function fetch_value($q) {
	$r = run_query($q);
	if (mysql_num_rows($r) == 1)
		return mysql_result($r, 0);
	else
		return false;

}


function fetch_assoc($q) {

	$r = run_query($q);
	if (mysql_num_rows($r) == 1)
		return mysql_fetch_assoc($r);
	else
		return false;

}

//Prepares string to be used in MySQL query

function for_query($str){
	//trim
	$str = trim($str);
	//strip slashes if magic quotes is on
	if (get_magic_quotes_gpc())
		$str = stripslashes($str);
	//escape and wrap in quotes only if string is not numeric
	if (!is_int($str))
		$str = "'" . mysql_real_escape_string($str) . "'";
	return $str;

}

function insert_row($arr, $table){
	$q = "INSERT INTO $table (" . implode(', ', array_keys($arr)) . ")
		    	VALUES (" . implode(', ', array_map('for_query', $arr)) . ")";

	$r = run_query($q);
		if (mysql_affected_rows() == 1)
			return mysql_insert_id();
		else
			return false;
}


function update_row($arr, $table, $end){
		$str = '';
		foreach ($arr as $key => $val)
			$str .= $key . ' = ' . for_query($val) . ', ';
		$str = substr($str, 0, -2);
		$q = "UPDATE $table SET $str $end";
		/*if($table=='general_faq'){
					print_r($q);
		die();
		}*/
		$r = run_query($q);
		if (mysql_affected_rows() == 1)
			return true;
		else
			return false;
}


//display
function optionValue($value,$selectedValue) {
	if ($value == $selectedValue) {
		return "value=\"$value\" SELECTED ";
	} else {
		return "value=\"$value\"";
	}
}
function radioValue($value,$selectedValue) {
	if ($value == $selectedValue) {
		return "value=\"$value\" CHECKED ";
	} else {
		return "value=\"$value\"";
	}
}

function boolColourView($value,$true,$false) {
	if ($value) {
		return "<span \"style=color:green\">$true</span>";
	} else {
		return "<span \"style=color:red\">$false</span>";
	}
}

function alt($a,$b) {
	global $alt;
	if ($alt == $a) {
		$alt = $b;
	} else {
		$alt = $a;
	}
	return $alt;
}

//date
function nzDateToDBDate($nzDate, $nzTime = "00:00:00") {
	$myArray = explode("/",$nzDate);
	if (count($myArray) != 3) {
		return "null";
	}
	$pm = (bool)strpos($nzTime,"p");
	$am = (bool)strpos($nzTime,"a");
	$time = ereg_replace("[apm]","",$nzTime);
	list ($hour, $min, $sec) = explode (":", $time);
	if (!isset($min)) {
		$min = 0;
	}
	if (!isset($sec)) {
		$sec = 0;
	}
	if (!is_numeric($hour) || !is_numeric($min) || !is_numeric($sec)) {
		return "null";
	}
	if ($pm && $hour < 12) {
		$hour += 12;
	}
	if ($am && $hour == 12) {
		$hour = 0;
	}
	return $myArray[2] . "-" . $myArray[1] . "-" . $myArray[0] . " " . $hour . ":" . $min . ":" . $sec;
}


function dbDateToNZDate($dbDate) {
	$dbDate = substr($dbDate,0,10);
	$myArray = explode("-",$dbDate);
	if (count($myArray) != 3) {
		return "";
	} else {
		return $myArray[2] . "/" . $myArray[1] . "/" . $myArray[0];
	}
}

function dbDateToNZTime($dbDate, $sec = false) {
	if ($sec) {
		$dbDate = substr($dbDate,11);
	} else {
		$dbDate = substr($dbDate,11,5);
	}
	return $dbDate;
}


function validDate($dateString) {
	list ($day, $month, $year) = explode ("[/.-]", $dateString);
	if (!is_numeric($day) || !is_numeric($month) || !is_numeric($year)) {
		return false;
	}
	if (checkdate($month,$day,$year)) {
		return true;
	} else {
		return false;
	}
}

function validTime($nzTime) {
	$pm = (bool)strpos($nzTime,"p");
	$am = (bool)strpos($nzTime,"a");
	$time = ereg_replace("[apm]","",$nzTime);
	list ($hour, $min, $sec) = explode ("[:. ]", $time);
	if (!isset($min)) {
		$min = 0;
	}
	if (!isset($sec)) {
		$sec = 0;
	}
	if (!is_numeric($hour) || !is_numeric($min) || !is_numeric($sec)) {
		return false;
	}
	if ($pm && $hour < 12) {
		$hour += 12;
	}
	if ($am && $hour == 12) {
		$hour = 0;
	}
	if ($hour > 23 || $min > 59 || $sec > 59) {
		return false;
	}
	return true;

}
function str_truncate($text, $length = 100, $ending = '...', $bywords = true, $html = true) {
    if ($html) {
        // if the plain text is shorter than the maximum length, return the whole text
        if (strlen(preg_replace('/<.*?>/', '', $text)) <= $length) {
            return $text;
        }
        // splits all html-tags to scanable lines
        preg_match_all('/(<.+?>)?([^<>]*)/s', $text, $lines, PREG_SET_ORDER);
        $total_length = strlen($ending);
        $open_tags = array();
        $truncate = '';
        foreach ($lines as $line_matchings) {
            // if there is any html-tag in this line, handle it and add it (uncounted) to the output
            if (!empty($line_matchings[1])) {
                // if it's an "empty element" with or without xhtml-conform closing slash
                if (preg_match('/^<(\s*.+?\/\s*|\s*(img|br|input|hr|area|base|basefont|col|frame|isindex|link|meta|param)(\s.+?)?)>$/is', $line_matchings[1])) {
                    // do nothing
                    // if tag is a closing tag
                }elseif (preg_match('/^<\s*\/([^\s]+?)\s*>$/s', $line_matchings[1], $tag_matchings)) {

                    // delete tag from $open_tags list
                    $pos = array_search($tag_matchings[1], $open_tags);
                    if ($pos !== false) {
                        unset($open_tags[$pos]);
                    }
                    // if tag is an opening tag
                }elseif (preg_match('/^<\s*([^\s>!]+).*?>$/s', $line_matchings[1], $tag_matchings)) {
                    // add tag to the beginning of $open_tags list
                    array_unshift($open_tags, strtolower($tag_matchings[1]));
                }
                // add html-tag to $truncate'd text
                $truncate .= $line_matchings[1];
            }
            // calculate the length of the plain text part of the line; handle entities as one character
            $content_length = strlen(preg_replace('/&[0-9a-z]{2,8};|&#[0-9]{1,7};|[0-9a-f]{1,6};/i', ' ', $line_matchings[2]));
            if ($total_length+$content_length> $length) {
                // the number of characters which are left
                $left = $length - $total_length;
                $entities_length = 0;
                // search for html entities
                if (preg_match_all('/&[0-9a-z]{2,8};|&#[0-9]{1,7};|[0-9a-f]{1,6};/i', $line_matchings[2], $entities, PREG_OFFSET_CAPTURE)) {
                    // calculate the real length of all entities in the legal range
                    foreach ($entities[0] as $entity) {
                        if ($entity[1]+1-$entities_length <= $left) {
                            $left--;
                            $entities_length += strlen($entity[0]);
                        } else {
                            // no more characters left
                            break;
                        }
                    }
                }
                $truncate .= substr($line_matchings[2], 0, $left+$entities_length);
                // maximum lenght is reached, so get off the loop
                break;
            } else {
                $truncate .= $line_matchings[2];
                $total_length += $content_length;
            }
            // if the maximum length is reached, get off the loop
            if($total_length>= $length) {
                break;
            }
        }
    } else {
        if (strlen($text) <= $length) {
            return $text;
        } else {
            $truncate = substr($text, 0, $length - strlen($ending));
        }
    }
    // if the words shouldn't be cut in the middle...
    if ($bywords) {
        // ...search the last occurance of a space...
        $spacepos = strrpos($truncate, ' ');
        if (isset($spacepos)) {
            // ...and cut the text in this position
            $truncate = substr($truncate, 0, $spacepos);
        }
    }
    // add the defined ending to the text
    $truncate .= $ending;
    if($html) {
        // close all unclosed html-tags
        foreach ($open_tags as $tag) {
            $truncate .= '</' . $tag . '>';
        }
    }
    return $truncate;
}


    function leading_zeros($value, $places){
        if(is_numeric($value)){
            for($x = 1; $x <= $places; $x++){
                $ceiling = pow(10, $x);
                if($value < $ceiling){
                    $zeros = $places - $x;
                    for($y = 1; $y <= $zeros; $y++){
                        $leading .= "0";
                    }
                $x = $places + 1;
                }
            }
            $output = $leading . $value;
        }
        else{
            $output = $value;
        }
        return $output;
    }
//useful
function zeroIfBlank($foo) {
	if ($foo == "") {
		$foo = 0;
	}
	return $foo;
}

function validateEmail($email)
{
	if (eregi("^([_a-z0-9-]+)(\.[_a-z0-9-]+)*@([a-z0-9-]+)(\.[a-z0-9-]+)*(\.[a-z]{2,4})$", $email)) {
		return true;
	} else {
		return false;
	}
}

function page() {
	return substr($_SERVER['PHP_SELF'],strrpos($_SERVER['PHP_SELF'],"/")+1);
}

function returnToBR ($foo) {
	return ereg_replace("\n","<br>",$foo);
}

function pageLinker($page_size=20,$pages_to_link=10) {
	$link=$_SERVER['PHP_SELF'] . "?". $_SERVER['QUERY_STRING'];
	$link = eregi_replace("&pg=.*&","&",$link);
	$link = eregi_replace("&pg=.*","",$link);

	$total = mysql_quick_call("select found_rows()");
	$pg = (isset($_REQUEST["pg"]) ? $_REQUEST["pg"] : 1);
	$pages = ceil($total / $page_size);

	echo "<br/><center class='paging'>Total Results Found: $total<br/>Page No<br/>";
	$start_page = round($pg - ($pages_to_link /2),0);
	$end_page = round($pg + ($pages_to_link /2),0);

	if ($pg < ($pages_to_link /2)) {
		$end_page += ceil(($pages_to_link /2)-$pg);
	}
	if ($pages - $pg < ($pages_to_link /2)) {
		$start_page -= 	ceil(($pages_to_link /2)-($pages - $pg));
	}

	$end_page = ($end_page >= $pages?$pages:$end_page);
	$start_page = ($start_page <1?1:$start_page);

	for ($i =$start_page;$i <= $end_page;$i++) {
		if ($pg == $i) {
			echo "<b>$i</b> ";
		} else {
			echo "<a href='$link&pg=$i'>$i</a> ";
		}

	}
	echo "</center>";
}
function yn($foo) {
	if (!$foo) {
		return "n";
	}
	if ($foo == "y" || $foo == "Y" || $foo == 1) {
		return "y";
	} else {
		return "n";
	}
}
function controlBreak($cb,&$result,$key) {

	global $cb_array;
	if (!isset($cb_array)) $cb_array = array();
	if (!isset($cb_array[$cb])) $cb_array[$cb] = array();

	if (!isset($cb_array[$cb]["nextrow"])) {
		if (!$cb_array[$cb]["nextrow"] = mysql_fetch_assoc($result)) {
			unset($cb_array[$cb]);
			return false;
		}
	}
	echo $cb_array[$cb]["cb_nextrow"];
	$cb_array[$cb]["lastrow"] = $cb_array[$cb]["currentrow"];
	$cb_array[$cb]["currentrow"] = $cb_array[$cb]["nextrow"];
	if (!$cb_array[$cb]["nextrow"] = mysql_fetch_assoc($result)) {
		$cb_array[$cb]["footer"] = true;
		unset($cb_array[$cb]["nextrow"]);
	} else {
		$cb_array[$cb]["footer"] = ($cb_array[$cb]["currentrow"][$key] != $cb_array[$cb]["nextrow"][$key]);
	}
	$cb_array[$cb]["header"] = ($cb_array[$cb]["currentrow"][$key] != $cb_array[$cb]["lastrow"][$key]);

	return $cb_array[$cb]["currentrow"];
}

function update_var(&$var1,$var2){
	$var1 = ($var2=='') ? $var1 : $var2;
}



function _xml2array($contents, $get_attributes=1){

    if ( ! $contents ) 
                return array();

    if( ! function_exists('xml_parser_create') ) {
        //print "'xml_parser_create()' function not found!";
        return array();
    }
    
    //Get the XML parser of PHP - PHP must have this module for the parser to work
    $parser = xml_parser_create();
    xml_parser_set_option($parser, XML_OPTION_CASE_FOLDING, 0);
    xml_parser_set_option($parser, XML_OPTION_SKIP_WHITE, 1);
    xml_parse_into_struct($parser, $contents, $xml_values);
    xml_parser_free($parser);

    if( ! $xml_values ) 
                return array();

    //*** Initializations
    $xml_array                     = array();
    $parents                          = array();
    $opened_tags               = array();
    $arr                                    = array();
    
    $current = &$xml_array;
    //*** Go through the tags.
    foreach ($xml_values as $data) {
        //*** Remove existing values, or there will be trouble
        unset($attributes, $value);

        //*** This command will extract these variables into the foreach scope: tag(string), type(string), level(int), attributes(array), value(string).
        extract($data);

        $result = '';
        if ($get_attributes) {
            $result = array();

            //*** Set the attributes too.
            if ( isset($attributes) ) {
                foreach ($attributes as $attr => $val) {
                    if($get_attributes == 1) 
                                $result["${tag}_ATTRIBUTES"][$attr] = $val;
                }
            }
            
            if( isset($value) ) {
                $result["${tag}_VALUE"] = $value;
            }
        } 
        else if( isset($value) ) {
            $result = $value;
        }

        //*** See tag status and do the needed.
        if ( $type == "open" ) {//*** The starting of the tag '<tag>'
            $parent[$level-1] = &$current;

            if ( !is_array($current) || !in_array($tag, array_keys($current)) ) { 
                //*** Insert New tag
                $current[$tag] = $result;
                $current = &$current[$tag];

            } 
            else { //*** There is another element with the same tag name
                if ( isset($current[$tag][0]) ) {
                    array_push($current[$tag], $result);
                } 
                else {
                    $current[$tag] = array($current[$tag], $result);
                }
                
                $last = count($current[$tag]) - 1;
                $current = &$current[$tag][$last];
            }
        } 
        else if ( $type == "complete" ) { //*** Tags that ends in 1 line '<tag />'
            //*** See if the key is already taken.
            if ( ! isset($current[$tag]) ) { //*** New Key
                $current[$tag] = $result;
            } 
            else { //*** If taken, put all things inside an array
                if ( (is_array($current[$tag]) && $get_attributes == 0) || (isset($current[$tag][0]) && is_array($current[$tag][0]) && $get_attributes==1) ) {
                    //*** push the new element into that array.
                    array_push($current[$tag],$result); 
                } 
                else { //*** If it is not an array
                    //*** Make it an array using the existing value and the new value
                    $current[$tag] = array($current[$tag],$result); 
                }
            }
        } 
        else if ( $type == 'close' ) { //*** End of tag '</tag>'
            $current = &$parent[$level-1];
        }
    }

    return($xml_array); 
}
function _buildErrorCodeXML($errCode, $errMsg) {
                $dataArr['Error'] = array('_ATTRIBUTES'=>array('Code'=>$errCode), '_DATA'=>"$errMsg");
                return _array2XML($dataArr);
}


function _buildSuccessXML($successCode, $message) {
                $dataArr['Success'] = array('_ATTRIBUTES'=>array('Code'=>$successCode), '_DATA'=>"$message");
                return _array2XML($dataArr);
}



function _array2XML($arr){
	global $htmlroot;
                $_nameSpace = "$htmlroot";
                
                $_xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\n"; // or "ISO-8859-1" encoding          
                $_xml .= "<string xmlns=\"$_nameSpace/\">\n";
                $_xml .= _array2XMLNode($arr);
                $_xml .= "</string>";

                return $_xml;
}

function _array2XMLNode($arr, $parentKey=''){
                if ( ! is_array($arr) )
                                return;

                foreach ($arr as $fieldname=>$fieldvalue) {
                                $fieldname = _xmlSafeStr(trim($fieldname));
                                
                                $openKey = $parentKey? $parentKey : $fieldname;
                                $openTag = "<$openKey>";
                                $closeTag = "</$openKey>";
                                
                                if ( is_array($fieldvalue) ) {
                                                if ( array_keys($fieldvalue)===array('_ATTRIBUTES', '_DATA') ) {
                                                                $attribStr = '';
                                                                foreach ($fieldvalue['_ATTRIBUTES'] as $k=>$v) {
                                                                                $k = _xmlSafeStr($k);
                                                                                $v = _xmlSafeStr($v);
                                                                                $attribStr .= " $k=\"$v\"";
                                                                }
                                                                
                                                                $openKey = $openKey.$attribStr;
                                                                $openTag = "<$openKey>";
                                                                
                                                                if ( ! is_array($fieldvalue['_DATA']) )
                                                                                $data = _xmlSafeStr($fieldvalue['_DATA']);         
                                                                else if ( _is_sequential_array($fieldvalue['_DATA']) ) {
                                                                                $data = _array2XMLNode($fieldvalue['_DATA'], $openKey);
                                                                                $openTag = $closeTag = '';
                                                                }
                                                                else 
                                                                                $data = _array2XMLNode($fieldvalue['_DATA']);
                                                }
                                                else if ( _is_sequential_array($fieldvalue) ) {
                                                                $data = _array2XMLNode($fieldvalue, $openKey);
                                                                $openTag = $closeTag = '';
                                                }
                                                else
                                                                $data = _array2XMLNode($fieldvalue);
                                }
                                else
                                                $data = _xmlSafeStr($fieldvalue);
                                
                                $_xml .= $openTag.$data.$closeTag;
                }
                
                return $_xml;
}
function _xmlSafeStr($print_friendly_string){
                //return htmlentities($print_friendly_string, ENT_QUOTES); // all characters which have HTML character entity equivalents are translated into these entities
                if ( is_string($print_friendly_string) )
                                //return htmlspecialchars($print_friendly_string, ENT_QUOTES); // only convert &, ', ", <, >
                                return preg_replace("/&amp;(#[0-9]+|[a-z]+);/i", "&$1;", htmlspecialchars($print_friendly_string, ENT_QUOTES)); // only convert &, ', ", <, > (but exclude BINARY data type which is the format of &#[0-9]+|[a-z]+
                else
                                return $print_friendly_string;
}

function _is_sequential_array($array) {
                if ( !is_array($array) || empty($array) )
                                return false;

                $keys = array_keys($array);
                return array_keys($keys) === $keys;
}

function webCurlPost($portal_api_url, $xml_data){
                // this function is to POST to post to an HTTP post. Check that CURL_POSTFIELDS paramaters are correct.
                
               $_urlInfoArr = parse_url($portal_api_url);
                $page = $_urlInfoArr['path'];
                
//                $header = array();
//                $header[] = "POST ".$page." HTTP/1.0 \r\n";
//                $header[] = "MIME-Version: 1.0";
//                $header[] = "Content-type: text/xml;charset=\"utf-8\""; //"Content-type: multipart/mixed";
//                $header[] = "Accept: text/xml";
//		$header[] = "Expect: ";
//                $header[] = "Cache-Control: no-cache";
//                $header[] = "Pragma: no-cache";
//                $header[] = "SOAPAction: \"run\"";
//                $header[] = "Content-length: ".strlen($xml_data);
                //$header[] = "Authorization: Basic " . base64_encode($credentials);
                
                //////////////////////////////
                $ch=curl_init($portal_api_url);
                curl_setopt($ch,CURLOPT_VERBOSE,0);
                curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,false);
                curl_setopt($ch,CURLOPT_SSL_VERIFYHOST,1);
                curl_setopt($ch,CURLOPT_POST,0);
                curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
                curl_setopt($ch,CURLOPT_NOPROGRESS,0);
                //curl_setopt($ch,CURLOPT_HTTPHEADER,$header);
		curl_setopt($ch,CURLOPT_HEADER,0);
                curl_setopt($ch,CURLOPT_POSTFIELDS,"ResBookRQXml=".$xml_data);
                $webCurlRS=curl_exec($ch); 
                //*** Close connection
                curl_close($ch);                
                //*** log the data sent in a file
                //fwrite($fetchBookings_Data_fp, "RQ:\n$strPostVars\n\nRS:\n$rtnStr\n==========\n\n\n");
                return $webCurlRS;
                /////////////////////////?////
}
function preprint_r(&$print){
	echo '<pre>';
	print_r($print);
	echo '</pre>';
}

if( !function_exists('mkformatted_date') ){
	function mkformatted_date($date, $format,$seprator='-'){
		$date_arr = explode($seprator, $date);
		switch($seprator){
			case '-':
				$d = date($format, mktime(0,0,0,$date_arr[1],$date_arr[2],$date_arr[0]));
			break;
			case '/':
				$d = date($format, mktime(0,0,0,$date_arr[1],$date_arr[0],$date_arr[2]));
			break;
		}
	    return $d;
	}
}

function createElement($attributes = array('class'=>'element-class'),$element='div', $html = ''){
	
	$tag = '';
	$attrs = '';
	$self_closing_elements = array( 'area', 'base', 'basefont', 'br', 'col', 'frame', 'hr', 'img', 'input', 'link', 'meta', 'param' );
	
	if( @is_array($attributes) ){
		ksort($attributes);
		foreach($attributes as $key => $value){
			$attrs .= ' '.$key.'="'.$value.'"';
		}
	}
	if($element){
		$tag = "<$element$attrs>";
		if( !@in_array($element, $self_closing_elements) ){
			$tag .= "$html</$element>";
		}
			
	}
	return $tag;
}

function getTimeArray($time= '00:00:00'){
	$arr = array();
	if($time){
		$arr = explode(':', $time);
	}
	return $arr;
}

if ( ! function_exists('mail_to'))
{
	function mail_to($email)
	{
		if($email)
		{
			return '<a href="mailtio:'.$email.'">'.$email.'</a>';
		}

		return FALSE;
	}
}

?>