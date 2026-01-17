<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $name    = htmlspecialchars($_POST["name"]);
    $email   = htmlspecialchars($_POST["email"]);
    $subject = htmlspecialchars($_POST["subject"]);
    $message = htmlspecialchars($_POST["message"]);

    $to = "md.masum.cse.bd@gmail.com";
    $headers = "From: $email\r\nReply-To: $email\r\n";

    $body = "
    Name: $name\n
    Email: $email\n
    Subject: $subject\n
    Message:\n$message
    ";

    if (mail($to, $subject, $body, $headers)) {
        header("Location: success.html");
    } else {
        header("Location: error.html");
    }
}
