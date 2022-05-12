import {Injectable, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {Observable} from "rxjs";
import firebase from "firebase/compat";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
imageDetailList:AngularFireList<any>;

  constructor(private firebase:AngularFireDatabase) {

  }

  getImageDetailList(){
    this.imageDetailList = this.firebase.list('imageDetails');
  }
  getFilteredImageDetailList(){
    this.imageDetailList = this.firebase.list('imageDetails', ref => ref.orderByChild('category').equalTo('Sport'));
  }
  insertImageDetails(imageDetails){
    const imageDetailListRef = this.firebase.list('imageDetails');
    imageDetailListRef.push(imageDetails);
  }
}
