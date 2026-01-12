import { ChangeDetectorRef, Component,computed,inject,OnInit,signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../../shared/models/User';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatDatepickerIntl,MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBar, MatSnackBarModule, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import * as nodemailer from 'nodemailer';
import { TextareaComponent } from '../../partials/textarea/textarea.component';
import { PasswordInputComponent } from '../../partials/password-input/password-input.component';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { HeaderComponent } from '../../partials/header/header.component';
import { PasswordMatchValidator } from 'src/app/shared/validators/password_match_validator';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { RadioInputComponent } from '../../partials/radio-input/radio-input.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { InputContainerComponent } from '../../partials/input-container/input-container.component';
import { SiteService } from 'src/app/services/site.service';
import { Site } from 'src/app/shared/models/Sites';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import 'moment/locale/fr';
import { AvatarModule } from 'ngx-avatars';
import { InputValidationComponent } from '../../partials/input-validation/input-validation.component';
import { DateInputComponent } from '../../partials/date-input/date-input.component';
import { timestamp } from 'rxjs';
import { NotificationDialogComponent } from '../../partials/notification-dialog/notification-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import {MatStep, MatStepperModule} from '@angular/material/stepper';
import { CommonService } from 'src/app/services/common.service';
import { HttpEventType } from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification.service';
import { NgxMaterialIntlTelInputComponent} from'ngx-material-intl-tel-input';

const MY_DATE_FORMAT = {
  parse : {
    dateInput : 'DD/MM/YYYY', //this is how your date will be parsed from Input
  },
  display :{
    dateInput: 'DD/MM/YYYY', // this is how yout date get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgxMaterialIntlTelInputComponent,
    // RouterLink,
    FormsModule,
    AvatarModule,
    CommonModule,
    MatIconModule,
    MatRadioModule,
    MatInputModule,
    MatSelectModule,
    HeaderComponent,
    MatButtonModule,
    GoogleMapsModule,
    MatSnackBarModule,
    MatCheckboxModule,
    TextInputComponent,
    MatFormFieldModule, 
    MatDatepickerModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    // DefaultButtonComponent,
    PasswordInputComponent,
    InputContainerComponent,
    // InputValidationComponent,
    DateInputComponent,
    MatProgressBarModule,
    MatDialogModule,
    MatTabsModule,
    MatStepperModule,
    MatStep,
  ],
  providers :[
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    // {provide: DateAdapter, useClass:MomentDateAdapter,deps:[MAT_DATE_LOCALE]},
    // {provide : MAT_DATE_FORMATS, useValue : MY_DATE_FORMAT},

    // Moment can be provided globally to your app by adding `provideMomentDateAdapter`
    // to your app config. We provide it at the component level here, due to limitations
    // of our example generation script.
    provideMomentDateAdapter(),
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  isSubmitDisable : boolean = false;
  isLinear = false;
  readonly dialog = inject(MatDialog);
  display : any;
  type : string = "";


  //snackbar
  simpleSb !: MatSnackBarRef<SimpleSnackBar>;

  //Pour la localisation
  position:any;
  latitude:number = 0;
  longitude:number = 0;
  center: google.maps.LatLngLiteral = {
    lat: -19.0000000,
    lng: 47.0000000
  };
  
  //Pour les formulaires
  registerForm!: FormGroup;
  registerCorporateForm!: FormGroup;
  isSubmitted = false;
  userType!:AbstractControl;
  userPhone = new FormControl();
  readonly dateOfBirth = new FormControl();
  documentType : string = "cin"
  showSellerForm = signal(false);
  user : any;
  identityDocument : any[] = [];
  SuccessRegister :boolean = false;
  parrain1ID : string ="";
  parrain2ID : string ="";
  
  // Upload variables
  fileName:any;
  images : {[key: string]: string} = {};
  progress:{[key:string]:number} = {};


  //Corporate User
  corporateCarteStat : string = "";
  corporateCarteFiscale : string = "";
  contactPhone = new FormControl();
  corporateUser : boolean = false;
  corporateType : string = "";


  private readonly _adapter = inject<DateAdapter<unknown, unknown>>(DateAdapter);
  private readonly _intl = inject(MatDatepickerIntl);
  private readonly _locale = signal(inject<unknown>(MAT_DATE_LOCALE));
  readonly dateFormatString = computed(() => {
    if (this._locale() === 'ja-JP') {
      return 'YYYY/MM/DD';
    } else if (this._locale() === 'fr-FR') {
      return 'DD/MM/YYYY';
    }
    return '';
  });

  constructor(
    private formBuilder     : FormBuilder,
    private userService     : UserService,
    private router          : Router,
    private _snackBar       : MatSnackBar,
    private siteService     : SiteService,
    private commonService   : CommonService,
    private cd              : ChangeDetectorRef,
    private notificationService : NotificationService,
  ){
    this.images['profile'] = "default.jpg";
    this.images['pdpHolder'] = "default.jpg";
    this.images['logo'] = "default.jpg";
    this.images['documentRecto'] = "placeholder_IDCard_Recto.png";
    this.images['documentVerso'] = "placeholder_IDCard_Verso.png";
    this.images['carteFiscaleRecto'] = "placeholder_IDCard_Recto.png";
    this.images['carteFiscaleVerso'] = "placeholder_IDCard_Verso.png";
  
  }
  
  ngOnInit(): void {
    this.french();
    // this.updateCloseButtonLabel('カレンダーを閉じる');

    const pattern:RegExp = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$');
    this.registerForm = this.formBuilder.group({
      userNickName:['',Validators.required],
      userName:['',Validators.required],
      userFirstname:['',Validators.required],
      userEmail:['',[Validators.required,Validators.email]],
      userPassword:['',Validators.required],
      confirmPassword:['',[Validators.required,PasswordMatchValidator]],
      userPhone:[''],
      userAddress : [''],
      userMainLat : [''],
      userMainLng : [''],
      // userDateOfBirth:['',[Validators.required]],
      identityCardNumber:['',[Validators.required]],
      parrain1ID : [''],
      parrain2ID : [''],
    },{
      validators : PasswordMatchValidator("userPassword","confirmPassword"),
    }
  );
    // this.returnUrl= this.activatedRoute.snapshot.queryParams['returnUrl'];
    this.registerCorporateForm = this.formBuilder.group({
      raisonSocial : ['',[Validators.required]],
      type : [''],
      rcs : [''],
      nif : ['',[Validators.required]],
      managerName : [''],
      managerEmail : [''],
      contactName : ['',Validators.required],
      contactPhone : [''],
      contactEmail : ['',Validators.required],
      siegeAddress: [''],
      userPassword:['',Validators.required],
      confirmPassword:['',[Validators.required,PasswordMatchValidator]],
      parrain1ID : [''],
      parrain2ID : [''],
    },{
      validators : PasswordMatchValidator("userPassword","confirmPassword"),
    })
  }
  get formControl(){
    return this.userType as FormControl;
  }
  french() {
    this._locale.set('fr');
    this._adapter.setLocale(this._locale());
    this.updateCloseButtonLabel('Fermer le calendrier');
  }
  updateCloseButtonLabel(label: string) {
    this._intl.closeCalendarLabel = label;
    this._intl.changes.next();
  }
  customeEmailValidator(control:AbstractControl){
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/;
    const value = control.value;
    if (!pattern.test(value) && control.touched)
      return{
        emailError:true
      }
      else return null;
  }
  getError(control:any):string{
    if (control.errors?.required && control.touched)  
      return 'Ce champ est obligatoire';
    else if(control.errors?.emailError && control.touched)
      return 'Please enter valid email address!';
    else return '';
  }

  

  toggleSellerForm(){
    this.showSellerForm.update(value =>!value)
  }
  get fc(){
    return this.registerForm.controls;
  }
  get cfc(){
    return this.registerCorporateForm.controls;
  }

  submittest(){
    const fv = this.registerForm.value;
    console.log(`ID parraint 1 = ${fv.parrain1ID} ; ID parrain 2 = ${fv.parrain2ID}`);
  }

  submitUser(){
    this.isSubmitDisable=true;
    this.isSubmitted =true;
    // console.log("submit = " + this.isSubmitted)
    const generatedID = Math.random().toString(36).slice(2,10)
    // console.log(this.dateOfBirth.value._d);
    if(this.showSellerForm()){ // Formulaire pour Entreprise
      if (!this.registerCorporateForm.valid){ 
          console.log(this.registerCorporateForm.getError);
          this.notificationService.openNotificationDialog(
            false,
            "Formulaire Entreprise incomplet",
            "Veuillez vérifier si tous les champs obligatoires sont remplis",
            null,
            false);
          return;
      }
      if(!this.images['carteFiscaleRecto'] || !this.images['carteFiscaleVerso']){
        this.notificationService.openNotificationDialog(
          false,
          "Formulaire incomplet",
          "Les photos du document d'identification sont obligatoire pour la validation de votre inscription",
          null,
          false);
          this.isSubmitDisable = false;
        return;
      }else{
        this.identityDocument.push(this.images['carteFiscaleRecto']);
        this.identityDocument.push(this.images['carteFiscaleVerso']);
      }
      
      const fv = this.registerCorporateForm.value;
      this.user = {
        userName            : fv.contactName ,         
        userFirstname       : "" ,  
        userPassword        : fv.userPassword ,  
        userEmail           : fv.contactEmail,        
        userPhone           : this.userPhone.value,
        userType            : "Entreprise",  
        userTotalSolde      : 0 ,  
        userValidated       : false ,  
        userAccess          : "Utilisateur" ,
        userEmailVerified   : false,
        userparrainId        : "",
        userDateOfBirth     : "",  
        userMainLat         : this.latitude,
        userMainLng         : this.longitude,
        userAddress         : fv.siegeAddress ,
        userId              : generatedID,
        userImage           : this.images['logo'],  
        identityCardNumber  : fv.nif ,
        identityDocument    : this.identityDocument,
        documentType        : fv.documentType,
        raisonSocial        : fv.raisonSocial,
        type                : this.type,
        rcs                 : fv.rcs,
        carteStat           : "",
        nif                 : fv.nif,
        carteFiscal         : this.identityDocument,
        logo                : this.images['logo'],
        managerName         : fv.managerName,
        managerEmail        : fv.managerEmail,
        parrain1ID          : fv.parrain1ID,
        parrain2ID          : fv.parrain2ID
      }
      if (fv.parrain1ID) {
        const parrain1IdNotif = {
          userId : fv.parrain1ID,
          title : "Demande de parrainage",
          message : `L'utilisateur ${generatedID} vous demande de le parrainer pour la validation de son inscription`,
          state : "new",
        }
        this.notificationService.addNotification(parrain1IdNotif).subscribe(response =>{
          console.log(`notification créer pour ${fv.parrain2ID}`);
          console.log(response);
        })
      }
      if (fv.parrain2ID) {
        const parrain2IdNotif = {
          userId : fv.parrain2ID,
          title : "Demande de parrainage",
          message : `L'utilisateur ${generatedID} vous demande de le parrainer pour la validation de son inscription`,
          state : "new",
        }
      
        this.notificationService.addNotification(parrain2IdNotif).subscribe(response =>{
          console.log(`notification créer pour ${fv.parrain2ID}`);
          console.log(response);
        })
      }
    }
    if(!this.showSellerForm()){ // Formulaire pour Particulier
      if (!this.registerForm.valid && !this.dateOfBirth.value._d){  //Champ obligatoire incomplet
            console.log(this.registerForm.getError);
            this.notificationService.openNotificationDialog(
              false,
              "Formulaire incomplet",
              "Veuillez vérifier si tous les champs obligatoires sont remplis",
              null,
              false);
            // this.openNotificationDialog(
            //   "Formulaire incomplet",
            //   "Veuillez vérifier si tous les champs obligatoires sont remplis",
            //   null,
            //   false);
            return;
      }
      
      if(!this.images['documentRecto'] || !this.images['documentVerso']){ //Les documents d'identificaiton sont incomplets
        this.notificationService.openNotificationDialog(
          false,
              "Formulaire incomplet",
              "Les photos du document d'identification sont obligatoire pour la validation de votre inscription",
              null,
              false);
        // this.openNotificationDialog(
        //   "Formulaire incomplet",
        //   "Les photos du document d'identification sont obligatoire pour la validation de votre inscription",
        //   null,
        //   false);
        return;
      }else{
        this.identityDocument.push(this.images['documentRecto']);
        this.identityDocument.push(this.images['documentVerso']);
      }
      const fv = this.registerForm.value;
      this.user = {
        userNickName        : fv.userNickName,
        userName            : fv.userName ,         
        userFirstname       : fv.userFirstname ,  
        userPassword        : fv.userPassword ,  
        userEmail           : fv.userEmail ,     
        // userPhone           : fv.userPhone.internationalNumber ,  
        userPhone           : this.userPhone.value,    
        userType            : "Particulier",  
        userTotalSolde      : 0 ,  
        userValidated       : false ,  
        userAccess          : "Utilisateur" ,
        userEmailVerified   : false,
        userparrainId        : "",
        userMainLat         : this.latitude,
        userMainLng         : this.longitude,
        userDateOfBirth     : this.dateOfBirth.value._d,  
        userAddress         : fv.userAddress ,
        userId              : generatedID,
        userImage           : this.images['profile'] ,  
        identityCardNumber  : fv.identityCardNumber ,
        identityDocument    : this.identityDocument,
        documentType        : this.documentType,
        raisonSocial        : "",
        type                : "",
        rcs                 : "",
        carteStat           : "",
        nif                 : "",
        carteFiscal         : "",
        logo                : "",
        managerName         : "",
        managerEmail        : "",
        parrain1ID           : fv.parrain1ID,
        parrain2ID           : fv.parrain2ID,
      }
      if (fv.parrain1ID) {
          const parrain1IdNotif = {
            userId : fv.parrain1ID,
            title : "Demande de parrainage",
            message : `L'utilisateur ${generatedID} vous demande de le parrainer pour la validation de son inscription`,
            state : "new",
          }
          this.notificationService.addNotification(parrain1IdNotif).subscribe(response =>{
            console.log(`notification créer pour ${fv.parrain2ID}`);
            console.log(response);
          })
        }
        if (fv.parrain2ID) {
          const parrain2IdNotif = {
            userId : fv.parrain2ID,
            title : "Demande de parrainage",
            message : `L'utilisateur ${generatedID} vous demande de le parrainer pour la validation de son inscription`,
            state : "new",
          }
        
          this.notificationService.addNotification(parrain2IdNotif).subscribe(response =>{
            console.log(`notification créer pour ${fv.parrain2ID}`);
            console.log(response);
          })
        }
    }

    this.userService.getUserByEmail(this.user.userEmail).subscribe(userEmailAlreadyExist =>{
      if (userEmailAlreadyExist) {
        this.simpleSb = this._snackBar.open("Un compte utilise déjà cet email","Se connecter",{duration : 10000});
        this.simpleSb.onAction().subscribe(() =>{
          this.router.navigateByUrl("login");
        })
        return;
      }else{
        this.userService.registerUser(this.user)
        .pipe()
        .subscribe(registeredUser=>{
          console.log(registeredUser);
          this.notificationService.openNotificationDialog(
            false,
            "Inscription envoyée", 
            "Un email vous a été envoyé pour vérification de votre adresse-mail. Une notification vous parviendra dès que votre compte sera opérationnel",
            "login",
            false
          )
        })
        
        if (this.latitude && this.longitude) {
          const mainSite :Site = {
            siteAddress     : this.user.userAddress,
            siteName        : "Domicile",
            siteLat         : this.latitude,
            siteLng         : this.longitude,
            siteUserID      : generatedID,
          };
          this.siteService.addSite(mainSite).subscribe(_=>{});
        }
      }
    })
  }  
  /*------------------------------------------
   moveMap()
   --------------------------------------------*/
   moveMap(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) 
      {
        this.position = (event.latLng.toJSON());
        this.latitude = event.latLng.lat();
        this.longitude = event.latLng.lng();
      }
    }

  onFileImageSelected(event:any, fieldName:string) {
    const file = event.target.files[0];
    if(!file) return;

    if(file){
      this.progress[fieldName] = 0;

      this.commonService.uploadImage(file).subscribe(event=>{
        if (event.type === HttpEventType.UploadProgress && event.total) {
            //calcul du pourcentage
            this.progress[fieldName] = Math.round((100*event.loaded)/event.total);
          }else if(event.type === HttpEventType.Response){
            //Upload terminé
            // this.images[fieldName] = event.body.responseData.url + '?t=' + new Date().getTime();
            this.images[fieldName] = event.body.url;
            this.cd.detectChanges();
          }
      });
    }
  }
  
  openNotificationDialog(title:string , message:string, url : string | null,reload:boolean =false){
      const dialogRef = this.dialog.open(NotificationDialogComponent,{
        data : {
          title,
          message
        }
      })
      dialogRef.afterClosed().subscribe(result=>{
        if (result == true && !url && reload == true) {
          window.location.reload();
          return;
        }
        if(result == true && url && reload == false){
          this.router.navigateByUrl(url);
        }
      })
    }
}
