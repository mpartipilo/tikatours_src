<?php
function is_firefox() {
	$agent = $_SERVER["HTTP_USER_AGENT"];
	if (!empty($agent) && preg_match("/firefox/si", $agent)) return true;
	return false;
}
?>