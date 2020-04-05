import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphSummaryComponent } from './graph-summary.component';

describe('GraphSummaryComponent', () => {
  let component: GraphSummaryComponent;
  let fixture: ComponentFixture<GraphSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
