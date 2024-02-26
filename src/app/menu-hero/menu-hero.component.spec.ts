import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuHeroComponent } from './menu-hero.component';

describe('MenuHeroComponent', () => {
  let component: MenuHeroComponent;
  let fixture: ComponentFixture<MenuHeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuHeroComponent]
    });
    fixture = TestBed.createComponent(MenuHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
