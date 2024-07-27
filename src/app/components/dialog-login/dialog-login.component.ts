import { GoogleSigninButtonModule, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-login',
  standalone: true,
  imports: [MatDialogContent, MatDialogTitle, GoogleSigninButtonModule],
  templateUrl: './dialog-login.component.html',
  styleUrl: './dialog-login.component.scss'
})
export class DialogLoginComponent implements OnInit {

  user: any;
  loggedIn: any

  constructor(

  ) { }

  ngOnInit(): void {

  }

}
