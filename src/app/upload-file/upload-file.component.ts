import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {

  gqlUrl: string = 'http://localhost:8000/api/v1/graphql';
  image_file: any;
  fileUploaded: boolean = false;
  fileUrl: string = '';

  @ViewChild('previewImage') previewImage!: ElementRef;
  constructor(private http: HttpClient) {
  }

  onChange(event: any): void {
    this.image_file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage.nativeElement.src = reader.result as string;
    };
    reader.readAsDataURL(this.image_file);
    this.fileUploaded = true;
  }

  cancelSubmit(){
    this.fileUploaded = false;
  }

  handleSubmit(): void {
    const allowedContentTypes = ['image/jpg', 'image/png', 'image/jpeg'];
    // console.log(`file type ${file.type}`);
    const contentType = this.image_file.type.toLowerCase();


    if(allowedContentTypes.includes(contentType)){
      console.log('Fichier autoriser: ', this.image_file);
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
      formData.append('file', this.image_file, this.image_file.name);
      
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
