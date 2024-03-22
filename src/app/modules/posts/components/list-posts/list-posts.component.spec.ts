import { HttpErrorResponse } from '@angular/common/http';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { apiRouters } from '../../../../core/config/apiRouters';
import { ApiService } from '../../../../services/api.service';
import { HelperService } from '../../../../services/helper.service';
import { PostsModule } from '../../posts.module';
import { ListPostsComponent } from './list-posts.component';
import { Post } from '../../../../shared/interfaces/post';

fdescribe('ListPostsComponent', () => {
  let component: ListPostsComponent;
  let fixture: ComponentFixture<ListPostsComponent>;
  let  apiServiceSpy: jasmine.SpyObj<ApiService>;
  let  helperServiceSpy: jasmine.SpyObj<HelperService>;

  beforeEach(waitForAsync(() => {
    apiServiceSpy = jasmine.createSpyObj<ApiService>('ApiService', ['getOb' , 'getPr' , 'deleteOb' , 'postOb' ]);
    helperServiceSpy = jasmine.createSpyObj<HelperService>('HelperService', ['alert' , 'translateService' ,'spinnerHidder' ,'spinnerShow' ]);

    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot(),
        PostsModule
      ],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: HelperService, useValue: helperServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPostsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component).toBeDefined();
  });

  it('#ngOnInit()', () => {
    spyOn(component ,'getpost');
    component.ngOnInit();
    expect(component.getpost).toHaveBeenCalled()
  });

  it('#getpost()',  function (done) {

    let data: any[] | jasmine.AsymmetricMatcher<any> | jasmine.Spy<jasmine.Func> | { [x: number]: jasmine.ExpectedRecursive<Post>; length: jasmine.ExpectedRecursive<number>; } = [
      // {
      //   "userId": 1,
      //   "id": 1, 
      //   "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      //   "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      // }
    ]
    apiServiceSpy.getOb.and.returnValue(of(data));
    component.getpost()
    component.api.getOb(apiRouters.POST_GET).subscribe({
      next:(resp)=>{
        expect(resp).toBeDefined()
        expect(component.helperService.spinnerHidder).toHaveBeenCalled()
        expect(component.posts).toEqual(data);
        done();
      }
    })


  });

  it('#getpost() Error ', function (done) {
       const errorHttpMock = new HttpErrorResponse({
        error: {
          message: 'NOT_FOUND_INFO'
        },
        status: 504,
        statusText: ''
      });

      apiServiceSpy.getOb.and.returnValue(throwError(() => errorHttpMock));

      component.getpost()

      component.api.getOb(apiRouters.POST_GET).subscribe({
        error:(err)=>{
             expect(component.helperService.spinnerHidder).toHaveBeenCalled();
             expect(component.helperService.alert).toHaveBeenCalled();
             expect(component.helperService.alert).toHaveBeenCalledWith('ERROR' , 'Hubo un error' , 'error');
          done();
        }
      })

    });

  it('#detalles', function () {
    spyOn(component.router , 'navigate')
    let id = 1;
    component.detalles(id)
    expect(component.router.navigate).toHaveBeenCalledWith(['post/detail'], { queryParams: { id } })

  });

}); //final