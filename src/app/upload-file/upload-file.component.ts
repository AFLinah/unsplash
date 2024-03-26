import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CheckpointService } from '../services/checkpoint.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {

  gqlUrl: string = "";
  image_file: any;
  fileUploaded: boolean = false;
  fileUrl: string = '';
  showError: string = '';

  @ViewChild('previewImage') previewImage!: ElementRef;
  constructor(private http: HttpClient, private checkpointService: CheckpointService) {
    this.gqlUrl = checkpointService.uri;
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
    this.showError = "";
  }

  async handleSubmit(): Promise<void> {
    const allowedContentTypes = ['image/jpg', 'image/png', 'image/jpeg'];
    const contentType = this.image_file.type.toLowerCase();
    const accessToken = localStorage.getItem('accessToken');
  
    if(allowedContentTypes.includes(contentType)){
      // console.log('Fichier autoriser: ', this.image_file);
      const operations = {
        query: `
          mutation($file: Upload!) {
            uploadFile(file: $file)
          }
        `,
        variables: {
          file: null
        }
      };
  
      const map = {
        file: ["variables.file"]
      };
  
      const formData = new FormData();
      formData.append('operations', JSON.stringify(operations));
      formData.append('map', JSON.stringify(map));
      formData.append('file', this.image_file, this.image_file.name);
  
      // Adding authorization header with token
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization' : `JWT ${accessToken}`
        })
      };
  
      try {
        const response = await this.http.post(this.gqlUrl, formData, httpOptions).toPromise();
        // Handle success response
        // console.log(response);
        this.fileUploaded = false;
      } catch (error) {
        // Handle error
        console.error('An error occurred: ', error);
      }
    } else {
      // console.error('Extension de fichier non autoriser');
      this.showError = "Extension de fichier non autoriser";
    }
  }
}
