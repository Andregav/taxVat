import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaxesPageComponent } from './taxes-page.component';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, DebugElement } from "@angular/core";
import {FormsModule } from '@angular/forms';

describe('TaxesPageComponent', () => {
  let component: TaxesPageComponent;
  let fixture: ComponentFixture<TaxesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
       imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ TaxesPageComponent ]
    })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxesPageComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.amounts.valid).toBeFalsy();
  });

  it('should vat and gross values calculated if add net value', () => {

    //Act
    component.net = 5;
    component.rate = 20;
    component.calcNet();
    fixture.detectChanges();

    //Assert
    expect(component.vat).toBe(1);
    expect(component.gross).toBe(6);
  });

  it('should net and gross values calculated if add vat value', () => {

    //Act
    fixture.detectChanges();
    component.vat = 1;
    component.rate = 20;
    component.calcVat();

    //Assert
    expect(component.net).toBe(5);
    expect(component.gross).toBe(6);
  });

  it('should net and vat values calculated if add gross value', () => {

    //Act
    component.gross = 12;
    component.rate = 20;
    component.calcGross();
    fixture.detectChanges();

    //Assert
    expect(component.net).toBe(10);
    expect(component.vat).toBe(2);
  });

  it('should radio button for VAT changed', () => {

    //Act
    component.selectValue("VAT");
    fixture.detectChanges();

    //Assert
    expect(component.vatAmount?.enabled).toBeTruthy();
  });

});
