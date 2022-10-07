import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DrugcheckPage } from './drugcheck.page';

describe('DrugcheckPage', () => {
  let component: DrugcheckPage;
  let fixture: ComponentFixture<DrugcheckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugcheckPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DrugcheckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
