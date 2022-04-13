import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-area',
  templateUrl: './search-area.component.html',
  styleUrls: ['./search-area.component.css']
})
export class SearchAreaComponent implements OnInit{
  categories: Category[] = [
    {value: 'sport-0', viewValue: 'Sport'},
    {value: 'fun-1', viewValue: 'Nöje'},
    {value: 'politics-2', viewValue: 'Politik'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
interface Category {
  value: string;
  viewValue: string;
}

