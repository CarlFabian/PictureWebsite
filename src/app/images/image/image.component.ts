import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";
import {ImageService} from "../../shared/image.service";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  imgSrc : string;
  selectedImage: any;
  isSubmitted: boolean;

  formTemplate = new FormGroup({
    title : new FormControl('',Validators.required),
    category : new FormControl(''),
    imageUrl : new FormControl('',Validators.required),
  })

  constructor(private storage:AngularFireStorage,private service:ImageService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  showPreview(event:any){
    if(event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else{
      this.imgSrc = '/assets/placeholder.jpg';
      this.selectedImage = null;
    }
  }
  onSubmit(formValue){
  this.isSubmitted = true;
  if(this.formTemplate.valid){
    var filepath = `${formValue.category}/${formValue.title}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filepath);
    this.storage.upload(filepath, this.selectedImage).snapshotChanges().pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe((url)=>{
          formValue['imageUrl']=url;
          this.service.create(formValue);
          this.resetForm();
        })
      })
    ).subscribe();
  }
  }

  get formControls(){
    return this.formTemplate['controls'];
  }

  resetForm(){
    this.formTemplate.reset();
    this.formTemplate.setValue({
      title:'',
      imageUrl:'',
      category:'Politics'
    });
    this.imgSrc='/assets/placeholder.jpg';
    this.isSubmitted= false;
    this.selectedImage=null;
  }
}
