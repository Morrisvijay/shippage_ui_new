import { Component, OnInit ,HostListener} from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { MustMatch } from 'src/app/shared/mustMatch';
import { PasswordStrengthValidator } from 'src/app/shared/passwordPolicy';
import { UsersResultBean } from '../users-result-bean';
import { UsersService } from '../users.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UsersMaster } from '../users-model';

@Component({
  selector: 'app-change-password-pop-up',
  templateUrl: './change-password-pop-up.component.html',
  styleUrls: ['./change-password-pop-up.component.sass']
})
export class ChangePasswordPopUpComponent implements OnInit {
  docForm: FormGroup;
  hideOldPassword = true;
  hideNewPassword = true;
  hideconfirmNewPassword = true;
  oldPwd:boolean = false;
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<ChangePasswordPopUpComponent>,private httpService: HttpServiceService,
    private usersService:UsersService,private tokenStorage: TokenStorageService) { 
      dialogRef.disableClose = true;
    this.docForm = this.fb.group({
        oldChangepassword: ["",[Validators.required]],
        newChangePassword:["",Validators.compose([Validators.required, PasswordStrengthValidator, Validators.minLength(6)])],
        confirmChangePassword:["",[Validators.required]],
    },
    {
     validator: MustMatch('newChangePassword', 'confirmChangePassword')
    });

  }

  ngOnInit(): void {
  }

  updatePassword(){
    // Creating the object
    if(this.docForm.valid){
      const obj = {
        newChangePassword: this.docForm.value.newChangePassword,
        newUserName: this.tokenStorage.getUsername(),
      };
      this.httpService.post<any>(this.usersService.updateChangePasswordUrl,obj).subscribe(data => {
        console.log(data);
        if(data.success){
          this.dialogRef.close();
        }
        },
        );
        
    }
    
  }

  cancel(){
    this.dialogRef.close();
  }
  
  validateOldPassword(event){
    console.log(this.tokenStorage.getUsername());
    console.log(event);
    this.httpService.get<any>(this.usersService.validateOldPasswordUrl+ "?validatePassword=" + event+"&userId="+this.tokenStorage.getUsername()).subscribe((res: any) => {
        if(res.success){
          this.docForm.controls['oldChangepassword'].setErrors(null);
        }else{
          this.docForm.controls['oldChangepassword'].setErrors({ oldPwd: true });
        }
      });
  }

  validateOldPasswordAndNewPassword(event){
    if(event === this.docForm.controls['oldChangepassword'].value){
      this.docForm.controls['newChangePassword'].setErrors({ oldValid: true });
    } else{
      this.docForm.controls['newChangePassword'].setErrors(null);
    }
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }
}
