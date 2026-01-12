import { AbstractControl } from "@angular/forms"

export const PasswordMatchValidator = (
    passwordControlName:string,
    confirmPasswordControleName:string) =>{
        const validator  = (form:AbstractControl) =>{
            const passordControl = form.get(passwordControlName);
            const confirmPassordControl = form.get(confirmPasswordControleName);
            if (!passordControl || !confirmPassordControl) return;

            if (passordControl.value !== confirmPassordControl.value) {
                confirmPassordControl.setErrors({notMatch:true});
            }else{
                const errors = confirmPassordControl.errors;
                if (!errors) return;

                delete errors.notMatch;
                confirmPassordControl.setErrors(errors);
            }
        }
        return validator;
    }