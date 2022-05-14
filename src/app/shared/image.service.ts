import {Injectable, OnInit} from '@angular/core';
import {Observable, Subject, switchMap} from "rxjs";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {where} from "@angular/fire/firestore";
import firebase from "firebase/compat";
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private dbPath = 'imageDetails';
imageDetailRef: AngularFirestoreCollection<any> = null;

  constructor(private db:AngularFirestore) {
    this.imageDetailRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<any> {
    return this.imageDetailRef;
  }

  create(form): any {
    const date = new Date(Date()); //sample date
    return this.imageDetailRef.add({ ...form.value, uploadDate: date});
  }

  getQuery(category: string): AngularFirestoreCollection<any> {
    return this.db.collection(this.dbPath, ref => ref.where('category', '==', category));
  }

}
