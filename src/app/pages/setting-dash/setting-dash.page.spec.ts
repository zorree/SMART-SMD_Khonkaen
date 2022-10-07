import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SettingDashPage } from './setting-dash.page';

describe('SettingDashPage', () => {
  let component: SettingDashPage;
  let fixture: ComponentFixture<SettingDashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingDashPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingDashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
