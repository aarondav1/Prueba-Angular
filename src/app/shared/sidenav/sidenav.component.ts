import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service'; 
import { RespuestaApiMenu } from '../interfaces/respuesta-api-menu';
import { SidenavService } from '../services/sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  public sidenavAbierto = false;
  menuData!: RespuestaApiMenu["data"];

  constructor(private authService: AuthService, private router: Router, 
    private sidenavService: SidenavService) { }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.sidenavAbierto = false;
    });
    this.sidenavService.GetMenu().subscribe((respuesta: RespuestaApiMenu) => {
      this.menuData = respuesta.data;
    });
  }

  logout(){
    this.authService.isLoggedIn = false;
    window.location.replace('/login');
  }
}
