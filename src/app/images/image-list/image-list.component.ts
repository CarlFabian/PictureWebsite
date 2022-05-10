import { Component, OnInit } from '@angular/core';
import {ImageService} from "../../shared/image.service";
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
imageList : any[];
rowIndexArray : any[];

  constructor(private firebase:AngularFireDatabase) { }

  ngOnInit(): void {
    const imageDetailListRef = this.firebase.list('imageDetails');
    imageDetailListRef.snapshotChanges().subscribe(
      list =>{
        this.imageList = list.map(item => {return item.payload.val(); });
        this.rowIndexArray = Array.from(Array(Math.ceil(this.imageList.length / 3)).keys());
      }
    );
  }
}
