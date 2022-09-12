import { serverLocations } from 'src/app/auth/serverLocations';
import { Component, OnInit } from "@angular/core";
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/auth/auth.service";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { AuthLoginInfo } from 'src/app/auth/login-info';
import { Role } from "src/app/core/models/role";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { User } from "src/app/core/models/user";
import { BehaviorSubject,Observable } from 'rxjs';
declare var grecaptcha: any;


@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm: FormGroup;
  submitted = false;
  loading = false;
  error = "";
  hide = true;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  userName : string ='';
  firstName: string='';
  userObj = {};
  login:boolean=false;
  forgot:boolean=false;
  // For OTP countdown
  timeLeft: number = 300;
  interval;
  // Google Captcha Site key
  siteKey: string='6LeiApIfAAAAAOBsKqX0U-EQNu3lk3O9LVByiRAA';
  title = 'captcha';

  private currentUserSubject: BehaviorSubject<User>;
  private loginInfo: AuthLoginInfo;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private app:AppService,
    private tokenStorage: TokenStorageService,
    private serverURL:serverLocations
  ) {
    super();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      otpValue: [""],
      userNameEmailId: [""],
      // recaptchaResponse: [""],
    });
  }
  get f() {
    return this.authForm.controls;
  }
  adminSet() {
    this.authForm.get("username").setValue("admin@software.com");
    this.authForm.get("password").setValue("admin@123");
  }
  employeeSet() {
    this.authForm.get("username").setValue("employee@software.com");
    this.authForm.get("password").setValue("employee@123");
  }
  clientSet() {
    this.authForm.get("username").setValue("client@software.com");
    this.authForm.get("password").setValue("client@123");
  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = "";
     // const response = grecaptcha.getResponse();
    if (this.authForm.invalid) {
      this.error = "Username and Password not valid !";
      return;
    } else {

      this.loginInfo = new AuthLoginInfo(
        this.f.username.value, this.f.password.value,this.f.otpValue.value,this.f.userNameEmailId.value);

      this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {

        if (data) {
              if(data.success){
                 
                this.tokenStorage.saveToken(data.accessToken);
                this.tokenStorage.saveUsername(data.username);
                this.tokenStorage.saveAuthorities(data.roles);
                this.tokenStorage.saveUserId(data.empId);
                this.tokenStorage.saveDefaultRoleId(data.defaultRoleId);
                this.tokenStorage.saveDefaultRole(data.defaultRole);
                this.tokenStorage.saveCustomerCompanyCode(data.companyCode);
                this.tokenStorage.saveImgUrl(data.file);
                this.tokenStorage.saveRoleName(data.roles);
                this.tokenStorage.saveFirstNameLastName(data.firstNameLastName);
                this.tokenStorage.savePharmaciesType(data.pharmaciesType);

                this.loading = false; 
                this.router.navigate(["/instantRates/welcome-page"]); 
                // this.login=true; 
                // this.startTimer();      
              }else{
                 this.submitted = false;
                  this.loading = false;
                  this.error = data.message;
              }
              
            } else {
              this.submitted = false;
              this.loading = false;
              this.error = "Invalid Login";
            }
        
      },
        error => {
            this.submitted = false;
            this.loading = false;
            this.error = "Server Down!!!";
            console.log(error); 
            
        },
         // grecaptcha.reset()
      );

    }
  }

  verifyOtp(){
    this.loginInfo = new AuthLoginInfo(
      this.f.username.value, this.f.password.value,this.f.otpValue.value,this.f.userNameEmailId.value);
    console.log(this.loginInfo);
    this.authService.attemptOtpValidation(this.loginInfo).subscribe(
      data => {        

        if (data) {
              if(data.success){
                  setTimeout(() => {
                this.loading = false; 

               this.router.navigate(["/instantRates/welcome-page"]);
              }, 1000);
              }else{
                  this.submitted = false;
                  this.loading = false;
                  this.error = data.message;
                console.log(data.message); 
              }
              
            } else {
              this.error = "Invalid OTP";
            }
        
      },
        error => {
            this.submitted = false;
            this.loading = false;
            this.error = "Server Down!!!";
            console.log(error); 
            
        }
      );
  }

  resendOtpNo(){
    this.loginInfo = new AuthLoginInfo(
      this.f.username.value, this.f.password.value,this.f.otpValue.value,this.f.userNameEmailId.value);
    console.log(this.loginInfo);
    this.login=true;
    // resetting the time again for 300s
    this.timeLeft=300;
    this.authService.resendOtp(this.loginInfo).subscribe(
      data => {        
       if(data) {
            if(!data.success){
              setTimeout(() => {
                this.submitted = false;
                this.loading = false;
                this.error = data.message;
          }, 1000);
          }
       }
      },
        
      );
  }

  //OTP Countdown
  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else{
        // this.timeLeft = 300;
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  forgotpassword(){
    this.forgot=true;
  }

  forgottPasswordButton(){
    this.loginInfo = new AuthLoginInfo(
      this.f.username.value, this.f.password.value,this.f.otpValue.value,this.f.userNameEmailId.value);
    this.authService.forgotPasswordService(this.loginInfo).subscribe(
      data => {        
       if(data) {
            if(data.success){
              this.error = data.message;
              this.login=false;
              this.forgot = false;
          }else{
            setTimeout(() => {
              this.submitted = false;
              this.loading = false;
              this.error = data.message;

        }, 1000);
          }
       }
      },
        
      );
  }

  backToSignInPage(){
    this.login=false;
    this.forgot=false;
  }

}
