import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportStatusPage } from './report-status.page';

describe('ReportStatusPage', () => {
  let component: ReportStatusPage;
  let fixture: ComponentFixture<ReportStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportStatusPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
