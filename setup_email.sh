#!/bin/bash

# Jenkins Email Configuration Script for Gmail

JENKINS_HOME="/var/jenkins_home"
CONFIG_FILE="$JENKINS_HOME/config.xml"

# Create email configuration XML
cat > /tmp/email_config.xml << 'XMLEOF'
  <hudson.tasks.Mailer plugin="mailer@438.v02c7f0a_d5b_1d">
    <smtpHost>smtp.gmail.com</smtpHost>
    <smtpPort>587</smtpPort>
    <smtpAuthUsername>securetodolist1@gmail.com</smtpAuthUsername>
    <smtpAuthPassword>sweq wftk gzey molk</smtpAuthPassword>
    <smtpUseSSL>false</smtpUseSSL>
    <smtpUseTLS>true</smtpUseTLS>
    <charset>UTF-8</charset>
    <replyToAddress>securetodolist1@gmail.com</replyToAddress>
  </hudson.tasks.Mailer>
XMLEOF

echo "Email configuration created"
