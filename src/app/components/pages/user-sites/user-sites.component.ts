import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextareaComponent } from '../../partials/textarea/textarea.component';
import { SiteService } from 'src/app/services/site.service';
import { Router, RouterLink } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Site } from 'src/app/shared/models/Sites';
import { GoogleMapsModule, MapMarkerClusterer} from '@angular/google-maps';
import { NgFor, NgIf } from '@angular/common';
import * as l from 'leaflet' ;
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-user-sites',
  standalone: true,
  imports: [
    HeaderComponent,
    DefaultButtonComponent,
    TextInputComponent,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    MatTableModule,
    // RouterLink,
    MatIconModule,
    // NgIf
  ],
  templateUrl: './user-sites.component.html',
  styleUrl: './user-sites.component.css'
})
export class UserSitesComponent implements OnInit{
  display:any
  
  isSubmitted = false;
  update:boolean = false;
  addSiteForm!: FormGroup;
  newSite:any;
  currentUser:any;
  sites:any[]=[];
  latitude:number=0;
  longitude:number=0;
  siteId!:string;
  displayedColumns: string[] = ['Nom du Site','Adresse', 'Latitude', 'Longitude','Action'];
  map:any;
  position: any
  marker:any = null;
  center: google.maps.LatLngLiteral = {
    lat: -19.0000000,
    lng: 47.0000000
  };
  siteToUpdate:any;

  constructor(
    private router:Router,
    private siteService:SiteService,
    private formBuilder:FormBuilder,
    private userService:UserService,
  ){
    this.currentUser = this.userService.getUserFromLocalStorage();
    this.userService.getUserById(this.currentUser._id).subscribe(fulluser=>{

      console.log(fulluser.userId);
      this.siteService.getSiteByUserId(fulluser.userId).subscribe(mesSite =>{
        console.log(mesSite)
        if (mesSite) {
          this.sites=mesSite;        
        }
      // this.siteService.getAll().subscribe(mesSites =>{
      //   this.sites = mesSites
      })
    })
  }

  ngOnInit() : void{
    // this.configMap()

    this.addSiteForm = this.formBuilder.group({
      siteName:[''],
      siteAddress:['',Validators.required],
      siteLat:['',Validators.required],
      siteLng:['',Validators.required],
    })
  }
  get fc(){
    return this.addSiteForm.controls;
  }
  // configMap(){
  //   this.map = l.map('map',{
  //     center : [-18.8093810000000 ,47.5607130000000],
  //     zoom : 6
  //   }).setView([-18.8093810000000 ,47.5607130000000]);
    
  //   l.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
  //     attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  //     maxZoom: 19,
  //   }).addTo(this.map)
  //   // let marker :any  = null
  //   this.map.on('click', (event:any)=>{
  //     if(this.marker !==null){
  //       this.map.removeLayer(this.marker);
  //     }
  //     this.marker = l.marker([event.latlng.lat,event.latlng.lng]).addTo(this.map);
  //     this.latitude=event.latlng.lat;
  //     this.longitude=event.latlng.lng;
  //     const fv = this.addSiteForm.value;
  //     this.addSiteForm.setValue({
  //       "siteName": fv.siteName,
  //       "siteAddress":fv.siteAddress,
  //       "siteLat":event.latlng.lat,
  //       "siteLng":event.latlng.lng,
  //     });
  //   })
  // }
  
  submit(){
    this.isSubmitted =true;
    if (this.addSiteForm.invalid){ 
        console.log(this.addSiteForm.getError);
        alert("Veuillez remplir correctement les champs obligatoires!");
        return;
      }
    
    const fv = this.addSiteForm.value;
    console.log(fv.userName);
    this.newSite = {
      siteName        :fv.siteName,
      siteAddress     :fv.siteAddress,
      siteLat         :fv.siteLat,
      siteLng         :fv.siteLng,
      siteUserID      :this.currentUser.userId,
    };
    if (!this.siteId) {
      this.siteService.addSite(this.newSite).subscribe(serverSite => {
        console.log(serverSite);
        alert("Ajout d'un site avec succès!");
        this.router.navigateByUrl("/user-site");
        location.reload();
      })      
    }else{
      this.siteService.update(this.newSite,this.siteId).subscribe(serverSite =>{
        console.log(serverSite)
        alert("Site mis à jour !");
        window.location.reload();
      })
    }
  }
  deleteSite(siteId:string){
    this.siteService.deleteSite(siteId).subscribe(vide =>{
      console.log(vide)
      alert("site supprimé");
      window.location.reload();
    });
  }
  setDataToModify(siteId:string){
    this.update = true;
    this.siteId = siteId;
    console.log(this.siteId)
    this.siteService.getSiteById(siteId).subscribe(siteToModify=>{
      this.siteToUpdate = siteToModify
      this.addSiteForm = this.formBuilder.group({
        siteName:[siteToModify.siteName],
        siteAddress:[siteToModify.siteAddress],
        siteLat : [siteToModify.siteLat],
        siteLng : [siteToModify.siteLng]
      })
      if (siteToModify) {
        this.latitude = siteToModify.siteLat;
        this.longitude = siteToModify.siteLng;

          if(this.marker){
            this.map.removeLayer(this.marker);
          }
          this.marker = l.marker([siteToModify.siteLat,siteToModify.siteLng]).addTo(this.map);
      }
    })
  }
  refreshMapMarker(){
    const fv = this.addSiteForm.value;
    console.log(this.marker)
    // if (this.marker !== null) {
    //   this.map.removeLayer(this.marker)
    // }
    // this.marker = l.marker([fv.siteLat,fv.siteLng]).addTo(this.map);
    // this.map.setView([fv.siteLat,fv.siteLng],2000)
    this.position = {lat : fv.siteLat,
      lng : fv.siteLng,
    }
    this.center = {
      lat: fv.siteLat,
      lng: fv.siteLng
  };
  }
  /*------------------------------------------
   --------------------------------------------
   moveMap()
   --------------------------------------------
   --------------------------------------------*/
   moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.position = (event.latLng.toJSON());
      this.latitude = event.latLng.lat();
      this.longitude = event.latLng.lng();
      const fv = this.addSiteForm.value;
      this.addSiteForm.setValue({
        "siteName": fv.siteName,
        "siteAddress":fv.siteAddress,
        "siteLat":event.latLng.lat(),
        "siteLng":event.latLng.lng(),
      });

    }

    }
    VoirMonStock(id:string){
      this.router.navigateByUrl("stock/"+id);
    }

    /*------------------------------------------
    --------------------------------------------
    move()
    --------------------------------------------
    --------------------------------------------*/
    // move(event: google.maps.MapMouseEvent) {
    //     if (event.latLng != null) this.display = event.latLng.toJSON();
    // }

  backButton(){
    this.router.navigateByUrl("/client-area")
  }
}
