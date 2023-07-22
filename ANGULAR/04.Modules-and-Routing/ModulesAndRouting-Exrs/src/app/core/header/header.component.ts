import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor( private userSerive: UserService, private router: Router) {
  }


  get isLogged(): boolean{
    return this.userSerive.isLogged;
  }


  logout(){
    this.userSerive.logout();
    this.router.navigate(['/'])
  }

}
