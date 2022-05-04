import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import {getStorage, ref, getDownloadURL} from "@angular/fire/storage";
import {MatCardSmImage} from "@angular/material/card";


@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.css']

})
export class PicturesComponent {

  pictures: Observable<any[]>;

  constructor(firestore: AngularFirestore) {

    this.pictures = firestore.collection('pictures').valueChanges();
    const storage = getStorage();



    getDownloadURL(ref(storage, 'kungen_med_hund.jpg'))
      .then((url) => {
        // `url` is the download URL for 'kungen_med_hund'

        // Or inserted into an <img> element
        const img = document.getElementById('myimg');
        img.setAttribute('src', url);
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
      });
  }
}


