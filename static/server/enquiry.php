<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die();
}

require("tourdata.php");

$captcha_secret = "6Lf5wHIUAAAAAF0UTlUi5gbQm_IYHn9noIPjJwLq";

$db_host      = 'mysql05.webhosting.nl';
$db_user      = 'tikatoursufywxjz';
$db_password  = 'AcoveDopu|73';
$db_name      = 'tikatoursocahhvm';

$company_email   = 'info@tikatours.com';

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
        'secret' => $captcha_secret,
        'response' => $_POST['captcha'],
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
    $form_response['message'] = "captcha verification failed";
    echo json_encode($form_response);
    return;
}

$link = mysqli_connect($db_host, $db_user, $db_password, $db_name);

if($link === false) {
    $form_response['success'] = false;
    $form_response['error'] = true;
    $form_response['message'] = "database connection failed";
    echo json_encode($form_response);
    return;
}

// Escape user inputs for security
$is_booking = (isset($_POST['tname']) && !empty($_POST['tname']));

if ($is_booking)
{
    $tour_id = "'" . mysqli_real_escape_string($link, strip_tags(trim($_REQUEST['tname']))) . "'";
}
else
{
    $tour_id = "NULL";
}

$fname = mysqli_real_escape_string($link, strip_tags(trim($_REQUEST['fname'])));
$lname = mysqli_real_escape_string($link, strip_tags(trim($_REQUEST['lname'])));
$email = mysqli_real_escape_string($link, strip_tags(trim($_REQUEST['email'])));
$mobile = mysqli_real_escape_string($link, strip_tags(trim($_REQUEST['mobile'])));
$comments = mysqli_real_escape_string($link, strip_tags(trim($_REQUEST['comments'])));
$status = "A";
$ip = getRealIpAddr();

$is_booking = $is_booking ? "1" : "0";

$sql = "INSERT INTO enquiry (fname, lname, email, mobile, comments, status, ip, tour_id, is_booking) VALUES ('$fname', '$lname', '$email', '$mobile', '$comments', '$status', '$ip', $tour_id, '$is_booking')";

$new_enquiry = 0;

// Attempt insert query execution
if ($insert_result = mysqli_query($link, $sql)) {
    $new_enquiry = mysqli_insert_id($con);
    $form_response['success'] = true;
    echo json_encode($form_response);
} else {
    $form_response['success'] = false;
    $form_response['error'] = true;
    $form_response['message'] = "error inserting enquiry entry";
    echo json_encode($form_response);
}

mysqli_free_result($insert_result);

if ($new_enquiry == 0) {
    return;
}

// Send email

// get new enquiry details from database
$contact_details_result = mysqli_query($link, "SELECT `fname`, `lname`, `email`, `mobile`,`comments`, `tour_id`,
DATE_FORMAT(`date_of_enquiry`, '%e %M %Y @ %h:%i %p') AS date_enquired
    FROM `enquiry` 
    WHERE `id` = '$new_enquiry'
    LIMIT 1
");

$contact_details =  mysqli_fetch_assoc($contact_details_result);
mysqli_free_result($contact_details_result);

$t_id = $contact_details['tour_id'];
//Get tour name
$tour_name = $tours[$t_id];
$contact_details['tour_name'] = $tour_name;


// get email template file
$etemplate_path = "email_template.php";
if(file_exists($etemplate_path))
{
    // read email tempalte file
    $email_template = file_get_contents($etemplate_path);
    
    // email tempalte tags
    $email_template_tags = array();
    $email_template_tags['subjectemail']   = 'You have received a new booking enquiry via your website';
    //merge email template tags along with data from database
    $email_template_tags = array_merge($email_template_tags, $contact_details);

    // replace tags with value
    foreach ($email_template_tags as $tag => $value)
    {
        $email_template = str_replace("<% $tag %>", $value, $email_template);
    }

    // Initiate php mailer class to send email
    require_once "classes/class_phpmailer.php";

    // Send Email
    $mail = new PHPMailer();
    $mail->IsHTML();
    $mail->AddReplyTo($email_template_tags['email']);
    $mail->AddAddress($company_email);
    if(count($comp_emails->list) > 0)
    {
        foreach ($comp_emails->list as $email)
        {
            $mail->AddCC($email);
        }
    }
    $mail->SetFrom($email_template_tags['email']);
    $mail->FromName = "{$email_template_tags['fname']} {$email_template_tags['lname']}";
    $mail->Subject  = $email_template_tags['subjectemail'];
    $mail->msgHTML($email_template);

    // if email is sent, redirect user to success page
    $mail->Send();
}

?>
