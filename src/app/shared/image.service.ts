import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
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

  getQuery(form): AngularFirestoreCollection<any> {
    console.log(form.value.category);
    console.log(form.value.title);
    console.log(form.value.minDate);
    console.log(form.value.maxDate);
    return this.db.collection(this.dbPath, ref => {
      let query: firebase.firestore.Query = ref;

      console.log(query);
      if (form.value.category) {
        query = query.where('category', '==', form.value.category);
      }
      ;
      if (form.value.title) {
        query = query.where('title', '==', form.value.title)
      }
      ;
      if (form.value.minDate) {
        query = query.where('uploadDate', '>', form.value.minDate)
      }
      ;
      if (form.value.maxDate) {
        query = query.where('uploadDate', '<', form.value.maxDate)
      }
      ;
      return query;
    })
  }
}
