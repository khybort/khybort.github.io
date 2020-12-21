<?php
    $msg = '';
    $msgClass = '';
    if (filter_has_var(INPUT_POST, 'submit')) {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $subject = $_POST['subject'];
        $message = $_POST['message'];
        if(!empty($name) && !empty($email) && !empty($subject) && !empty($message)){
            if(filter_var($email, FILTER_VALIDATE_EMAIL) === false){
                $msg = 'Please use valid email';
                $msgClass = 'alert-danger';
            }
            else{
                $toEmail = 'main@killiandebacker.com';
                $fullEmail = 'From: ' . $name . '<br> Email: ' . $email . '<br> Message: ' . $message;

                $headers = "MIME-Version: 1.0" . "\r\n";
                $headers .= "Content-Type:text/html;charset=UTF-8" . "\r\n";
                $headers .= "From: " . $name . "<" . $email . ">" . "\r\n";

                if (mail($toEmail, $subject, $fullEmail, $headers)) {
                    $msg = 'Your email has been sent';
                    $msgClass = 'alert-success';
                    $name = '';
                    $email = '';
                    $subject = '';
                    $message = '';
                } else {
                    $msg = 'Email failed to send';
                    $msgClass = 'alert-danger';
                }
                
            }
        }
        else{
            $msg = 'Please fill all fields.';
            $msgClass = 'alert-danger';
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="contactMain.css">
    <link rel="stylesheet" href="../../Templates/navDefault/navMain.css">
    <title>Contact Me</title>
</head>
<body>
    <nav class="navbar">
        <div class="logo">
            <h4>Contact Me - Killian Debacker</h4>
        </div>
        <ul class="navlinks">
            <li><a href="https://killiandebacker.com">Portfolio Home</a></li>
            <li><a href="../Calc/calcIndex"> Windows Calculator in JS</a></li>
            <li><a href= "../../Killian Debacker Resume.docx" download="Killian Debacker Resume" target="_blank">Resume</a></li>
            <div class="download">
                <a href="../../Killian Debacker Resume.docx" target="_blank"> <img src="../../button.png" alt=""></a>
            </div>
        </ul>
        <div class = "navdropdown">
            <div class="line1"></div>
            <div class="line2"></div>
            <div class="line3"></div>
        </div>
        <script src="../../Templates/navDefault/navMobile.js"></script>
    </nav>
    <h1 id="heading">Contact Me</h1>
    <div class="contact">
        <?php if($msg != ''): ?>
            <div class="alert <?php echo $msgClass; ?>"> 
                <?php echo $msg; ?> 
            </div>
        <?php endif; ?>

        <form method="post" action=" <?php echo $_SERVER['PHP_SELF']; ?> ">

            <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" id="name" name="name" placeholder="Your name.." value="<?php echo isset($_POST['name']) ? $name : ''; ?>">
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input type="text" id="name" name="email" placeholder="Your email.." value="<?php echo isset($_POST['email']) ? $email : ''; ?>">
            </div>

            <div class="form-group">
                <label for="subject">Subject</label>
                <input type="text" id="subject" name="subject" placeholder="Subject.." value="<?php echo isset($_POST['subject']) ? $subject : ''; ?>">
            </div>

            <div class="form-group">
                <label for="message">Message</label>
                <textarea name="message" id="message" cols="30" rows="10" placeholder="Message.."><?php echo isset($_POST['message']) ? $message : ''; ?></textarea>
            </div>

            <button class="button" type="submit" name="submit">Submit</button>
        </form>
    </div>

</body>