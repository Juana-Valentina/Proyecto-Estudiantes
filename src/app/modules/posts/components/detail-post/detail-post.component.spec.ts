import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPostComponent } from './detail-post.component';

fdescribe('DetailPostComponent', () => {
  let component: DetailPostComponent;
  let fixture: ComponentFixture<DetailPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
