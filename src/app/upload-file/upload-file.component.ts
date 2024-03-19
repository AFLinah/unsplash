import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {

  gqlUrl: string = 'http://localhost:8000/api/v1/graphql';

  constructor(private http: HttpClient) {}

  upload(event: any): void {

    const allowedContentTypes = ['image/jpg', 'image/png', 'image/jpeg'];

    const file = event.target.files[0];
    // console.log(`file type ${file.type}`);
    const contentType = file.type.toLowerCase();


    if(allowedContentTypes.includes(contentType)){
      console.log('Fichier autoriser: ', file);
      const operations = {
        query: `
          mutation($file: Upload!) {
            uploadFile(file: $file){
              fileName
              baseUrl
              blurhashCode
            }
          }
        `,
        variables: {
          file: null
        }
      };
  
      const map = {
        file: ["variables.file"]
      };
  
      // const file = event.target.files[0];
      const formData = new FormData();
      formData.append('operations', JSON.stringify(operations));
      formData.append('map', JSON.stringify(map));
      formData.append('file', file, file.name);
      
      // console.log('Fichier: ', file);
      this.http.post(this.gqlUrl, formData).subscribe({
        next: (response) => {
          // Handle success response
        },
        error: (error) => {
          // Handle error
        }
      });
    } else {
      console.error('Extension de fichier non autoriser');
    }

    

  }

}
