import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertTestComponent } from './upsert-test.component';

describe('UpsertTestComponent', () => {
  let component: UpsertTestComponent;
  let fixture: ComponentFixture<UpsertTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
