import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
// import { FileUploadComponent } from './file-upload/file-upload.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'fileUpload', component: UploadFileComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
