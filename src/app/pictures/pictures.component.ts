import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.css']

})
export class PicturesComponent {
  pictures: Observable<any[]>;
  constructor(firestore: AngularFirestore) {
    this.pictures = firestore.collection('pictures').valueChanges();
  }
}
