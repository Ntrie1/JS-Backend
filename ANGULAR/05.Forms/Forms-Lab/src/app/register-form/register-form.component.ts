import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {

  onSubmit(registerForm: NgForm): void{
    if(registerForm.invalid){
      return;
    }
    console.log(registerForm.value)


  }


  // validatePasswords(registerForm: NgForm): boolean {
  //   const password = registerForm.controls['password'].value;
  //   const rePassword = registerForm.controls['re-password'].value;
  //   return password === rePassword;
  // }




}
