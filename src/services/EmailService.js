import sgMail from '@sendgrid/mail';

const EMAIL_API_KEY = process.env.SENDGRID_API_KEY;
const SENDER = process.env.SENDGRID_SENDER;

class EmailService {
  constructor() {
    // this.mailer = sgMail;
    // this.mailer.setApiKey(EMAIL_API_KEY);
    // this.sender = SENDER;
  }

  prepareMessage({
    receivers,
    subject,
    html,
    text,
  }) {
    const msg = {
      from: this.sender,
      to: receivers,
      subject: subject,
    };

    if (text) {
      msg.text = text;
    }

    if (html) {
      msg.html = html;
    }

    return msg;
  }

  async sendEmail(msg) {
    try {
      const response = await this.mailer.send(msg);
      // We can do log to log central here before return the data
      return {success: true, error: null};
    } catch(err) {
      const errorBody = err?.response?.body;
      const errors = errorBody?.errors;
      const message = errors[0]?.message || err.message || '';
      // We can do log to log central here before return the data
      return {success: false, error: message ?? 'Something went wrong. Please try again later.'};
    }
  }
}


export default new EmailService();
