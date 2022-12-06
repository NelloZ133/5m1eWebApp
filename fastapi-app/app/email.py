import smtplib
import os
from os.path import basename
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from email.mime.text import MIMEText
from typing import Union
from dotenv import dotenv_values

config = dotenv_values(".env")

smtp_server = config['EMAIL_HOST']
smtp_port= config['EMAIL_PORT']
smtp_username = config['EMAIL_USERNAME']
smpt_password = config['EMAIL_PASSWORD']
sender_email = '5M1E_Notification'

def send_mail(reciever: Union[str,list], subject: str, content: str, attachments: list[str]) -> None:
    print('In send_mail function')
    # Create message container - the correct MIME type is multipart/alternative.
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = sender_email
    if isinstance(reciever, str):
        msg['To'] = reciever
    else:
        msg['To'] =  ", ".join(reciever)

    part1 = MIMEText(content, 'html')
    msg.attach(part1)

    for f in attachments:
        f =f.rsplit('/', 1)[-1]
        f = os.path.join('uploaded_files', f)
        if not os.path.exists(f):
            continue
        with open(f, "rb") as fil:
            part = MIMEApplication(
                fil.read(),
                Name=basename(f)
            )
        part['Content-Disposition'] = 'attachment; filename="%s"' % basename(f)
        msg.attach(part)
    print('complete preparing')
    with smtplib.SMTP(smtp_server, int(smtp_port)) as server:
        print('sendding email with content as ', content)
        if len(smtp_username) > 0:
            server.login(smtp_username, smpt_password)
            print('server login')
        server.sendmail(sender_email, reciever, msg.as_string())
        print('email sent')
