import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckpointService {
  uri!: string;
  api_url!: string;

  constructor() { 
    this.getUri()
  }
  
  getUri() {
    const mode = environment.mode;
    if (mode === "dev"){
      this.uri = environment.dev.GRAPHQL_SERVER
      this.api_url = environment.dev.API_URL
    } else {
      this.uri = environment.prod.GRAPHQL_SERVER
      this.api_url = environment.prod.API_URL
    }
  }




}
