import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { gql } from 'apollo-angular';

const MUTATION = gql`
  mutation ($file: Upload!) {
    uploadFile(file: $file) 
  }
`;


@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private apollo: Apollo) {}

  uploadFile(file: File): void {
    const formData = new FormData();
    formData.append('file', file);

    this.apollo
      .mutate({
        mutation: MUTATION,
        variables: { file: formData },
        context: {
          useMultipart: true, // Important for file upload
        },
      })
      .subscribe({
        next: (response) => {
          console.log('File upload success:', response);
        },
        error: (error) => {
          console.error('File upload error:', error);
        },
      });
  }
}
