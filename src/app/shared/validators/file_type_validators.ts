import { AbstractControl, ValidatorFn } from "@angular/forms";

export function FileTypeValidator(allowedTypes: string[]) :ValidatorFn {
    return (control : AbstractControl): { [key: string] : any } | null => {
        const file = control.value as File;
        if (file) {
            const fileExtension = file.name.split('.').pop();
            if(fileExtension && !allowedTypes.includes(fileExtension.toLowerCase())){
                return { 'invalidFileType' : true };
            }
        }
        return null;
    };
}