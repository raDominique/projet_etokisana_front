import { AbstractControl, ValidatorFn } from "@angular/forms"

export function FileEmpyValidators (fileName: string) :ValidatorFn {
    return (control : AbstractControl): { [key: string] : any } | null => {
        const file = control.value as File;
        if (file) {
            fileName = file.name;
            if(!fileName){
                return { 'emptyFile' : true };
            }
        }
        return null;
    };
}