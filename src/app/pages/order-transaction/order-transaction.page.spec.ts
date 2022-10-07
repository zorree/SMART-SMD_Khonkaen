import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderTransactionPage } from './order-transaction.page';

describe('OrderTransactionPage', () => {
  let component: OrderTransactionPage;
  let fixture: ComponentFixture<OrderTransactionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTransactionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderTransactionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
