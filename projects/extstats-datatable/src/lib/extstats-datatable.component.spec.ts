import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtstatsDatatableComponent } from './extstats-datatable.component';

describe('ExtstatsDatatableComponent', () => {
  let component: ExtstatsDatatableComponent;
  let fixture: ComponentFixture<ExtstatsDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtstatsDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtstatsDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
