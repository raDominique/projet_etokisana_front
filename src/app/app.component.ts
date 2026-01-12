import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/partials/header/header.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { NgxSpinnerModule } from "ngx-spinner";
import { APP_BASE_HREF } from '@angular/common';
import { AvatarModule} from 'ngx-avatars';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    // HeaderComponent,
    MatIconModule,    
    NgxSpinnerModule,
    AvatarModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[{provide : MAT_DATE_LOCALE,useValue:'fr'},
    {provide:APP_BASE_HREF,useValue:'/'}
  ]
})
export class AppComponent {
  
  constructor(){
    
  }
  title = 'etokisana';
}