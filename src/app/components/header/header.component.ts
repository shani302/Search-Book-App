import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {}

  signIn(): string {
    if(localStorage.getItem("userName") != null){
      return "hello " + localStorage.getItem("userName") + " !";
    }
    return "";
  }

  signOut(): void{
    localStorage.removeItem("lastSearch");
    localStorage.removeItem("lastSearchBooks");
    this.router.navigate([""]);
  }


}





