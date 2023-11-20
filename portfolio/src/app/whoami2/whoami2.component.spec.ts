import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Whoami2Component } from './whoami2.component';

describe('Whoami2Component', () => {
  let component: Whoami2Component;
  let fixture: ComponentFixture<Whoami2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Whoami2Component]
    });
    fixture = TestBed.createComponent(Whoami2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
