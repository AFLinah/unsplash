import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuValue: boolean = false;
  menu_icon: string = 'bi bi-list'

  openMenu(){
    this.menuValue = !this.menuValue;
    this.menu_icon = this.menuValue ? 'bi bi-x':'bi bi-list';
  }

  closeMenu(){
    this.menuValue = false;
    this.menu_icon = 'bi bi-list';
  }

  constructor(private router: Router){ }

  onSignUp(){
    // console.log('Redirection vers la page de création de compte');
    this.router.navigate(['/signup']); 
  }
}
