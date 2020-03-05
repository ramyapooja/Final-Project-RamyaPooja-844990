import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from "@angular/forms";
import { AccountService } from 'src/app/Services/account.service';
import { Seller } from 'src/app/Models/seller';
import { Buyer } from 'src/app/Models/buyer';
import { Router } from '@angular/router';
import { Token } from 'src/app/Models/token';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 userName:string;
 password:string;
 loginForm:FormGroup;
 errmsg:string;
    buyer:Buyer;
    seller:Seller;
    role: any;
    token:Token;
 
submitted=false;
  constructor(private formbuilder:FormBuilder,private service:AccountService,private router:Router) { }

  ngOnInit() {
    this.loginForm=this.formbuilder.group({
      userName:['',Validators.required],
      password:['',Validators.required],
      role:['']
    });
   
  }
  get f()
{
  return this.loginForm.controls;
}
onSubmit()
{
  this.submitted=true;
  this.Validate();
}
public Validate()
{
  let userName=this.loginForm.value['userName'];
  let password=this.loginForm.value['password'];
  let role=this.loginForm.value['role'];
  this.token=new Token();
  // alert(username)
  // alert(role)
  if(role=='buyer')
  {
    this.service.BuyerLogin(userName,password).subscribe(res=>{
      console.log(res);
      this.token=res;

      if(this.token.msg=='Success'){
          this.router.navigateByUrl('/buyer');
      }
      else{
        alert('Invalid Credentials');
      }
    });
  }
if(role=='seller')
{
 
this.service.SellerLogin(userName,password).subscribe(res=>{
  console.log(res)
  this.token=res;
  if(this.token.msg=="Success"){
    this.router.navigateByUrl("/seller")
  }
  else{
    alert('invalid  Credentials');
  }
});

}
if(role=='')
{
if(userName=="Admin" && password=="admin")
{
  this.router.navigateByUrl("/admin");
}
else{
  alert("Invalid credentials");
}
}
}
Navigate()
{
  switch(this.role){
    case "buyer":
      this.router.navigateByUrl("buyer");
      break;
      case "seller":
      this.router.navigateByUrl("seller");
      break;
      case "admin":
      this.router.navigateByUrl("admin");
      break;
      default:
        alert("invalid credentials");

 }
}
}