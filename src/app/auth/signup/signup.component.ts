import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_USERS , CREATE_USER } from '../../graphql.operations';
// import { ExecutionResult } from 'graphql';
// import { ApolloError } from '@apollo/client';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  users: any[] = [];
  error: any;

  username: string = '';
  email: string = '';
  location: string = '';
  phoneNumber: string = '';
  website: string = '';
  gender: string = '';
  interest: string = '';
  bio: string = '';
  password: string = '';

  // Variables pour stocker les erreurs associées à chaque champ
  usernameError: string | null = null;
  emailError: string | null = null;
  locationError: string | null = null;
  phoneNumberError: string | null = null;
  websiteError: string | null = null;
  genderError: string | null = null;
  interestError: string | null = null;
  bioError: string | null = null;
  passwordError: string | null = null;

  constructor(private apollo: Apollo) { }

    onSubmit() {
      this.apollo.mutate({
        mutation: CREATE_USER,
        variables: {
          username: this.username,
          email: this.email,
          gender: this.gender,
          location: this.location,
          website: this.website,
          bio: this.bio,
          interests: this.interest,
          phoneNumber: this.phoneNumber,
          password: this.password
        }
      }).subscribe(
        ({ data }) => {
          console.log('User created:', data);
          // Traiter la réponse la mutation ici
        },
        error => {
          console.log('Error creating user:', error);
        }
      );
    }

    ngOnInit(): void {
    this.apollo.watchQuery({
      query: GET_USERS
    }).valueChanges.subscribe(({ data, error }: any) => {
      if (data && data.users && data.users.edges) {
        this.users = data.users.edges.map((edge: any) => edge.node);
      }
      this.error = error;
    });
  }
}
