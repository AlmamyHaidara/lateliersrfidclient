import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  imports: [
    CommonModule,
  ],
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
  standalone: true,
})
export class PaginationComponent implements OnInit,OnChanges{
  
  @Input() totalItems: any;
  @Input() currentPage: any;
  @Input() ItemsParPage: any;
  @Output() Pageonclick: EventEmitter<number> = new EventEmitter();

  totalPages = 0;

  pages : number[] = [];

  ngOnInit(): void {
     if(this.totalItems){
       this.totalPages = Math.ceil(this.totalItems/this.ItemsParPage);
       this.pages = Array.from({length: this.totalPages},(_,i)=>i+1)
     }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalItems'] && changes['totalItems'].currentValue !== undefined){
      this.totalPages = Math.ceil(this.totalItems/this.ItemsParPage);
      this.pages = Array.from({length: this.totalPages},(_,i)=>i+1)
    }
  }

  pageClicked(page : number):void{
    if(page > this.totalPages || page < 1) return;
    this.Pageonclick.emit(page);
  }

}
