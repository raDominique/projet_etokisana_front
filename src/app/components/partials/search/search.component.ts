import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../../services/search.service';
import { MatFormFieldModule, MatHint } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatIconModule,MatFormFieldModule,MatInputModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  @Input()
  url!:string;
  @Input()
  searchTerm:string = '';


  @Input()
  isNewEntry !: boolean;

  @Output() isEmpty = new EventEmitter<boolean>();
  @Output() updatedSearchTerm = new EventEmitter <string> ();

  constructor(
    activatedRoute:ActivatedRoute, 
    private router:Router,
    private searchService : SearchService){
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm) this.searchTerm = params.searchTerm;
    });
  }
  ngOnInit() : void {
  }

  search(term : string) : void{
    if(term.length > 2){
        this.searchTerm = term ;
        this.isEmpty.emit(false);
        this.updatedSearchTerm.emit(this.searchTerm);
    }else{
      this.isEmpty.emit(true);
    }
  }
}
