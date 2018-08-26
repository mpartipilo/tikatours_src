<?php
function getRealIpAddr()
{
    if (!empty($_SERVER['HTTP_CLIENT_IP']))   //check ip from share internet
    {
      $ip=$_SERVER['HTTP_CLIENT_IP'];
    }
    elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))   //to check ip is pass from proxy
    {
      $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    else
    {
      $ip=$_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}

#
# Verify captcha
$post_data = http_build_query(
    array(
        'secret' => CAPTCHA_SECRET,
        'response' => $_POST['g-recaptcha-response'],
        'remoteip' => $_SERVER['REMOTE_ADDR']
    )
);
$opts = array('http' =>
    array(
        'method'  => 'POST',
        'header'  => 'Content-type: application/x-www-form-urlencoded',
        'content' => $post_data
    )
);
$context  = stream_context_create($opts);
$response = file_get_contents('https://www.google.com/recaptcha/api/siteverify', false, $context);
$result = json_decode($response);

$form_response = ['success' => $result->success];

header('Content-type: application/json');

if (!$result->success) {
    echo json_encode($form_response);
    return;
}

$link = mysqli_connect("localhost", "root", "", "demo");

if($link === false) {
    $form_response['success'] = false;
    $form_response['error'] = true;
    echo json_encode($form_response);
    return;
}

// Escape user inputs for security
$fname = mysqli_real_escape_string($link, $_REQUEST['fname']);
$lname = mysqli_real_escape_string($link, $_REQUEST['lname']);
$email = mysqli_real_escape_string($link, $_REQUEST['email']);
$mobile = mysqli_real_escape_string($link, $_REQUEST['mobile']);
$comments = mysqli_real_escape_string($link, $_REQUEST['comments']);
$status = "A";
$ip = getRealIpAddr();

$sql = "INSERT INTO enquiry (fname, lname, email, mobile, comments, status, ip, tour_id, is_booking) VALUES ('$fname', '$lname', '$email', '$mobile', '$comments', '$status', '$ip', '$tour_id', '$is_booking')";

// Attempt insert query execution
if (mysqli_query($link, $sql)) {
    $form_response['success'] = true;
    echo json_encode($form_response);
    return;
} else {
    $form_response['success'] = false;
    $form_response['error'] = true;
    echo json_encode($form_response);
    return;
}

// Close connection
mysqli_close($link);

?>
