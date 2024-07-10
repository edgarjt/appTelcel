import { Injectable } from '@angular/core';

import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';


@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  messagingFirebase: firebase.messaging.Messaging;


  constructor() {
    firebase.initializeApp(environment.firebaseConfig);
    this.messagingFirebase = firebase.messaging();
  }

  requestPermission = () => {
    return new Promise(async (resolve, reject) => {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const tokenfirebase = await this.messagingFirebase.getToken();
        resolve(tokenfirebase);
      } else {
        reject();
      }
    });
  }

  private messagingObservable = new Observable(observer => {
    this.messagingFirebase.onMessage(payload => {
      observer.next(payload);
    });
  });

  receiveMessage() {
    return this.messagingObservable;
  }
}
