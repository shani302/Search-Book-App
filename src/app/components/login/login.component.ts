import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Credential } from 'src/app/models/credential';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public credential = new Credential();

  constructor(private router: Router) { }

  ngOnInit() {
    localStorage.removeItem("userName");
    localStorage.removeItem("password");
  }

  public login(credential: Credential): void {
    const userName = credential.userName;
    const password = credential.password;
    if (password != "123456") {
      alert("some of the detail isn't correct, please try again");
    }
    if (password === "123456") {
      if (localStorage.getItem(password) === null) {
        localStorage.setItem("userName", userName);
        localStorage.setItem("password", password);
      }
      this.router.navigate(["/search-page"]);
    }
  }

  
}


