import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import  IMAGE_QUERY from "./schemas";
import { CheckpointService } from '../services/checkpoint.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  images: any[] = [];
  pageInfo: any;
  api_url!: string;

  constructor(private apollo: Apollo, private checkpointService: CheckpointService){
    this.api_url = checkpointService.api_url;
    console.log(this.api_url);
    
  }
  
  async ngOnInit(){
    const response = await this.apollo
      .watchQuery({query: IMAGE_QUERY})
      .valueChanges.subscribe(
        (res: any) => {
          // Get pageInfo so that I can know if there are still remain images
          this.pageInfo = res.data.getImages.pageInfo;

          // Get all Images
          this.images = res.data.getImages.edges;
          console.log(this.images[0].node);
          
        }
      )
  }
}
