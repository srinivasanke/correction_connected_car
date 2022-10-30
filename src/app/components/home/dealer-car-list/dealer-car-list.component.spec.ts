import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DealerCarListComponent } from './dealer-car-list.component';
import { RouterTestingModule } from '@angular/router/testing';
describe('DealerCarListComponent', () => {
  let component: DealerCarListComponent;
  let fixture: ComponentFixture<DealerCarListComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
     declarations: [ DealerCarListComponent ],
     
     providers: [
    ],
     imports: [

       RouterTestingModule
     ]
   })
   
   .compileComponents();

 });
 let spy: any;
  beforeEach(async () => {
    fixture = TestBed.createComponent(DealerCarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    });

  it('should test title in a h2 tag',() => {
    const fixture = TestBed.createComponent(DealerCarListComponent);
    const compiled = fixture.debugElement.nativeElement;
  expect(compiled.querySelector('h2').textContent).toContain('DEALER DASHBOARD');
 });

 it('should test click button', () => {
  spyOn(component, 'openCarRegister');

  let button = fixture.debugElement.nativeElement.querySelector('button');
  button.click();
  // tick();
  expect(component.openCarRegister).toHaveBeenCalled();

});

it('should test the table ', (done) => {
  fixture.whenStable().then(() => {
    let tableRows = fixture.nativeElement.querySelectorAll('table');
    expect(tableRows).toBeTruthy();
    done();
  });
});


it('should trigger a keypress event on an element', () => {
  const keypress = new KeyboardEvent('keypress', {
    key:'any', 
    cancelable: true
  });
const filter = fixture.nativeElement.querySelector('input');
  filter.dispatchEvent(keypress);
  expect(filter).toBeTruthy();
});

it('should test the pagination ', (done) => {
  fixture.whenStable().then(() => {
  let pageination = fixture.nativeElement.querySelectorAll('mat-paginator');
    expect(pageination).toBeTruthy();
    done();
  });
});

it('openCarRegister method should be called', () => {
  var spy = spyOn(component, "openCarRegister").and.callThrough();
  expect(component).toBeDefined();
  expect(spy);
  expect(component.openCarRegister()).toBeTruthy; 
});

it('should change filterBy and dataSource.filter', () => {
  const event = { target: { value: 'hello' } } as any;
  component.applyFilter(event);
  expect(component.dataSource.filter).toBe('hello');
});


});
