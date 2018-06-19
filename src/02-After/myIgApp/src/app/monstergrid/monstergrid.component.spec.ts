import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxExcelExporterService } from 'igniteui-angular/services';

import { MonsterGridComponent } from './monstergrid.component';

import {
  IgxGridModule,
  IgxAvatarModule,
  IgxBadgeModule,
  IgxButtonModule,
  IgxIconModule,
  IgxInputGroupModule,
  IgxProgressBarModule,
  IgxRippleModule,
  IgxSwitchModule,
  IgxToggleModule,
  IgxCheckboxModule
} from 'igniteui-angular/main';
describe('MonsterGridComponent', () => {
  let component: MonsterGridComponent;
  let fixture: ComponentFixture<MonsterGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonsterGridComponent ],
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        IgxGridModule,
        IgxAvatarModule,
        IgxBadgeModule,
        IgxButtonModule,
        IgxIconModule,
        IgxInputGroupModule,
        IgxProgressBarModule,
        IgxRippleModule,
        IgxSwitchModule,
        IgxToggleModule,
        IgxCheckboxModule
      ],
      providers: [IgxExcelExporterService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsterGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
