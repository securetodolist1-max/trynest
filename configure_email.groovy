import hudson.tasks.Mailer
import jenkins.model.Jenkins

try {
  def jenkins = Jenkins.getInstance()
  def mailerDescriptor = jenkins.getDescriptor(hudson.tasks.Mailer.class)
  
  mailerDescriptor.setSmtpHost("smtp.gmail.com")
  mailerDescriptor.setSmtpPort(587)
  mailerDescriptor.setSmtpAuthUsername("securetodolist1@gmail.com")
  mailerDescriptor.setSmtpAuthPassword("sweq wftk gzey molk")
  mailerDescriptor.setSmtpUseTLS(true)
  mailerDescriptor.setSmtpUseSSL(false)
  mailerDescriptor.setCharset("UTF-8")
  mailerDescriptor.setReplyToAddress("securetodolist1@gmail.com")
  
  mailerDescriptor.save()
  jenkins.save()
  
  println("Email configuration applied successfully!")
  println("SMTP Host: smtp.gmail.com")
  println("SMTP Port: 587")
  println("Username: securetodolist1@gmail.com")
  println("TLS Enabled: true")
  
} catch (Exception e) {
  println("Error: " + e.getMessage())
  e.printStackTrace()
}
