import credentials from './credentials';
import * as firebaseAdmin from 'firebase-admin';

class NotificationService {
  constructor() {
    this.Notification = firebaseAdmin;
    this.Notification.initializeApp({
      credential: firebaseAdmin.credential.cert(credentials),
    });
  }

  prepareMessage(data) {
    return {
      data: data.payload,
      notification: {
        title: data.title,
        body: data.body
      },
      token: data.token,
    }
  }

  async sendNotification(msg){
    try {
      const response = await this.Notification.messaging().send(msg)
      return {success: true, error: null};
    } catch(err) {
      return { success: false, error: err };
    }
  }
}

export default new NotificationService();
