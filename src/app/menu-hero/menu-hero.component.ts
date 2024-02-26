import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-menu-hero',
  templateUrl: './menu-hero.component.html',
  styleUrls: ['./menu-hero.component.css']
})
export class MenuHeroComponent {
  @ViewChild('widgetsContent', { read: ElementRef }) 
  public widgetsContent!: ElementRef<any>;

  showLeftArrow: boolean = false;
  showRightArrow: boolean = true;

  categories: string[] = [
    'Editorial', 'Unsplash+', 'Cool Tones', 'Wallpapers', 'Nature', '3D Renders',
    'Travel', 'Architecture & Interiors', 'Textures & Patterns', 'Street Photography',
    'Film', 'Archival', 'Experimental', 'Animals', 'Fashion & Beauty', 'People',
    'Spirituality', 'Business & Work', 'Food & Drink', 'Health & Wellness', 'Sports',
    'Current Events'
  ];
  selectedCategory: string | null = null;

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 200), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 200), behavior: 'smooth' });
  }

}
