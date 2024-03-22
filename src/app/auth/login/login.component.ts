import { Component } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';

import { Apollo } from 'apollo-angular';
import { USER_LOGIN } from '../../graphql.operations';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  auth_token: string = '';

  constructor(private apollo: Apollo, private router: Router) { }
  onSubmit() {
    this.apollo.mutate({
      mutation: USER_LOGIN,
      variables: {
        username: this.username,
        password: this.password,
      }
    }).subscribe(
      (response: any) => {
        //Access token
        this.auth_token = response.data.tokenAuth.token.token;
        console.log(`Authentication token ${this.auth_token}`);

        //Save token to local storage
        localStorage.setItem('accessToken', this.auth_token);

        //Redirect to homepage
        this.router.navigate(['/home']);
      },
      error => {
        console.log('Error logging user:', error);
      }
    );
  }

  // resetForm() {
  //   this.username = '';
  //   this.password = '';
  // }
}
