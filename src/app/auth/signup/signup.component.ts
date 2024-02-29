import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_USERS , CREATE_USER } from '../../graphql.operations';
import { ExecutionResult } from 'graphql';
import { ApolloError } from '@apollo/client';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  users: any[] = [];
  error: any;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
  this.apollo.watchQuery({
    query: GET_USERS
  }).valueChanges.subscribe(({ data, error }: any) => {
    if (data && data.users && data.users.edges) {
      this.users = data.users.edges.map((edge: any) => edge.node);
    }
    this.error = error;
  });

  this.apollo.mutate({
    mutation: CREATE_USER,
    variables: {
      input: {
        // Remplacez ces valeurs par celles que vous souhaitez créer
        email: '',
        firstName: '',
        gender: '',
        id: '',
        isActive: false,
      }
    }
  }).subscribe((result: ExecutionResult<any>) => {
    // Vérifier si 'data' est défini et a le bon format
    if (result.data && result.data.createUser) {
      // Gérer la réponse de la mutation ici
      console.log('Utilisateur créé : ', result.data.createUser);
    }
  }, (error: ApolloError) => {
    // Gérer les erreurs éventuelles ici
    console.error('Erreur lors de la création de l\'utilisateur : ', error);
  });
}


}
