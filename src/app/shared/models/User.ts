
export class User{
    userNickName        !:string;
    userName            !: string;
    userFirstname       !:string;
    userPassword        !: string;
    userEmail           !: string;
    userPhone           : string = "";
    userType            : string="particulier";
    userTotalSolde      : number = 0;
    userValidated       : boolean = false;
    userEmailVerified   : boolean = false;
    userAccess          : string = "Utilisateur";
    userparrainId        : string ="";
    userId              !: string;
    userImage           !: string;
    userAddress         !: string;
    userMainLatitude    !: string;
    userMainLongitude   !: string;
    userDateOfBirth     !: Date;
    identityCardNumber  : string ="";
    identityDocument    : string ="";
    documentType        !: string;
    raisonSocial            : string = "";
    type                    : string = "";
    rcs                     : string = "";
    carteStat               : string = "";
    nif                     : string = "";
    carteFiscal             : string = "";
    logo                    : string = "";
    managerName             : string = "";
    managerEmail            : string = "";
}