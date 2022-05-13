import { Component, OnInit } from '@angular/core';
import {ImageService} from "../../shared/image.service";
import {map} from "rxjs";
import {AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  form: FormGroup;

  constructor(private service:ImageService, private fb: FormBuilder) { }


imageList : any[];
rowIndexArray : any[];



  ngOnInit(): void {
    this.showImages(this.service.getAll());
    this.form = this.fb.group({
      title: [null],
      category: [null]
    });
  }

  showImages(collection: AngularFirestoreCollection){
   collection.snapshotChanges().pipe(
     map(changes =>
       changes.map(c =>
         ({ ...c.payload.doc.data() })
       )
     )
   ).subscribe(data => {
     this.imageList = data;
     this.rowIndexArray = Array.from(Array(Math.ceil(this.imageList.length / 3)).keys());
   });
  }

  showSearch(form){
    console.log(form.value.category);
    this.showImages(this.service.getQuery(form.value.category));
  }

}
interface Category {
  value: string;
  viewValue: string;
}
