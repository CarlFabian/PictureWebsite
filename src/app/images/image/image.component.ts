import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";
import {ImageService} from "../../shared/image.service";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  imgSrc : string = 'assets/placeholder.jpg';
  selectedImage: any;
  isSubmitted: boolean;

  form: FormGroup;

  constructor(private storage:AngularFireStorage,private service:ImageService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [null],
      category: [null],
      imageUrl: [null]
    });
  }

  showPreview(event:any){
    if(event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else{
      this.imgSrc = 'assets/placeholder.jpg';
      this.selectedImage = null;
    }
  }
  onSubmit(form){
    console.log(form);
  this.isSubmitted = true;
  if(this.form.valid){
    var filepath = `${form.value.category}/${form.value.title}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filepath);
    this.storage.upload(filepath, this.selectedImage).snapshotChanges().pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe((url)=>{
          form.value['imageUrl']=url;
          this.service.create(form);
          this.resetForm();
        })
      })
    ).subscribe();
  }
  }

  get formControls(){
    return this.form['controls'];
  }

  resetForm(){
    this.form.reset();
    this.form.setValue({
      title:'',
      imageUrl:'',
      category:''
    });
    this.imgSrc='/assets/placeholder.jpg';
    this.isSubmitted= false;
    this.selectedImage=null;
  }
}
