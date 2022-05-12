import { Component, OnInit } from '@angular/core';
import {ImageService} from "../../shared/image.service";
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {

  categories: Category[] = [
    {value: 'Sport', viewValue: 'Sport'},
    {value: 'Entertainment', viewValue: 'Nöje'},
    {value: 'Politics', viewValue: 'Politik'},
  ];
imageList : any[];
rowIndexArray : any[];

  constructor(private service:ImageService) { }

  ngOnInit(): void {
    this.service.getImageDetailList();
    this.service.imageDetailList.snapshotChanges().subscribe(
      list =>{
        this.imageList = list.map(item => {return item.payload.val(); });
        this.rowIndexArray = Array.from(Array(Math.ceil(this.imageList.length / 3)).keys());
      }
    );
  }

  getFilteredDetailList(){
    this.service.getFilteredImageDetailList();
    this.service.imageDetailList.snapshotChanges().subscribe(
      list =>{
        this.imageList = list.map(item => {return item.payload.val(); });
        this.rowIndexArray = Array.from(Array(Math.ceil(this.imageList.length / 3)).keys());
      }
    );
  }
}
interface Category {
  value: string;
  viewValue: string;
}
