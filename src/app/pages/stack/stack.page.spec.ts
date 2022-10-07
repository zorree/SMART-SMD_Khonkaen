import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StackPage } from './stack.page';

describe('StackPage', () => {
  let component: StackPage;
  let fixture: ComponentFixture<StackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
