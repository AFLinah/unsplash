import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_USERS } from '../../graphql.operations';

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
  }
  

}
