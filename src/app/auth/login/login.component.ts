import { Component } from '@angular/core';

import { Apollo } from 'apollo-angular';
import { USER_LOGIN } from '../../graphql.operations';
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

  async onSubmit() {
    const response =  await this.apollo.mutate({
      mutation: USER_LOGIN,
      variables: {
        username: this.username,
        password: this.password,
      }
    }).subscribe({
      next: (v: any) => {
        this.auth_token = v.data.tokenAuth.token.token;
        localStorage.setItem('accessToken', this.auth_token);
        this.router.navigate(['/home']);
        window.location.reload();
      },
      error: (err: Error) => console.log(err),
      complete: () => console.info('complete')
    })
  }

  ngOnInit(): void {
    // Vérifier si le token est présent dans le stockage local
    const access_token = localStorage.getItem('accessToken');

    if (access_token) {
      this.router.navigate(['/home']);
    }
  }
}
