import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {PostService} from './services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
    // Web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyCs_h3amVh80cC8YJzylgEQkAVE_yaMAwY",
      authDomain: "book-demo-3e090.firebaseapp.com",
      databaseURL: "https://book-demo-3e090.firebaseio.com",
      projectId: "book-demo-3e090",
      storageBucket: "book-demo-3e090.appspot.com",
      messagingSenderId: "337816522846",
      appId: "1:337816522846:web:253f267cf1a1a064cf64cf",
      measurementId: "G-HKKHTK9XHV"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }

}
