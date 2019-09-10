import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { firebaseConfig } from 'src/app/credentials';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'application-blog-with-backend';
  constructor() {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  ngOnInit() {}

}
