import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Percents, Items } from './../../shared/types/taxes';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-taxes-page',
  templateUrl: './taxes-page.component.html',
  styleUrls: ['./taxes-page.component.scss']
})
export class TaxesPageComponent implements OnInit {

	public bg = './assets/img/main/mainBg.jpg';
	
	public percents: Percents[] = [
		{
      		value: '5',
      		label: '5% (01.07.2020 - 31.12.2020)'
    	},
    	{
      		value: '10',
      		label: '10%'
    	},
    	{
      		value: '13',
      		label: '13%'
    	},
    	{
      		value: '20',
      		label: '20%'
    	}
    ];

	public items: Items[] = [
		{
      		title: 'Price without VAT',
      		label: 'Net',
      		value: 0
    	},
    	{
      		title: 'Value-Added Tax',
      		label: 'VAT',
      		value: 0
    	},
    	{
      		title: 'Price incl. VAT',
      		label: 'Gross',
      		value: 0
    	}
	];

	public vat: number = 0;
	public net: number = 0;
	public gross: number = 0;
	public rate: number = 20;

	form = this.fb.group({
    	NET: new FormControl({value: '', disabled: false}, [Validators.required, Validators.min(1)]),
    	VAT: new FormControl({value: '', disabled: true}, [Validators.required, Validators.min(1)]),
    	GROSS: new FormControl({value: '', disabled: true}, [Validators.required, Validators.min(1)])
  	});

	get amounts() {
  		return this.form as FormGroup;
	}
	get netAmount() {
  		return this.form.get("NET");
	}
	get vatAmount() {
  		return this.form.get("VAT");
	}
	get grossAmount() {
  		return this.form.get("GROSS");
	}

  	constructor(
  		public fb: FormBuilder
  	) {}

  	ngOnInit(): void {
  	}

  	//---select radio button and make the input available for data entry---
  	selectValue(el: string): void {
  		this.amounts.disable();

  		let item = this.form.get(el);
  		item?.enable();
	}
	//---select radio button and make the input available for data entry---


	//---values are calculated after choosing a rate---
	selectRate(el: any): void{
		this.rate = Number(el.value);

		switch (true) {
			case this.netAmount?.enabled:
				this.calcNet();
				break;

			case this.vatAmount?.enabled:
				this.calcVat();
				break;

			case this.grossAmount?.enabled:
				this.calcGross();
				break;
		}
	}
	//---values are calculated after choosing a rate---

	//---values are calculated depending on the input field selection---
	calcValue(el: any): void {
		switch (el.target.dataset.label) {
			case 'NET':
				this.net = Number(el.target.value);
				this.calcNet();
				break;

			case 'VAT':
				this.vat = Number(el.target.value);	
				this.calcVat();
				break;

			case 'GROSS':
				this.gross = Number(el.target.value);
				this.calcGross();
				break;
		}
	}
	//---values are calculated depending on the input field selection---

	//---values of gross and vat value are calculated after net value added---
	calcNet(){
		this.gross = this.net * (1 + (this.rate / 100));
		this.vat = this.gross - this.net;
		this.vatAmount?.setValue(this.vat.toFixed(2));
		this.grossAmount?.setValue(this.gross.toFixed(2));
	}
	//---values of gross and vat value are calculated after net value added---


	//---values of gross and net value are calculated after net value added---
	calcVat(){
		this.net = (this.vat * 100) / this.rate;
		this.gross = (this.vat * (100 + this.rate)) / this.rate;
		this.netAmount?.setValue(this.net.toFixed(2));
		this.grossAmount?.setValue(this.gross.toFixed(2));
	}
	//---values of gross and net value are calculated after net value added---


	//---values of vat and net value are calculated after gross value added---
	calcGross(){
		this.net = this.gross / (1 + (this.rate / 100));
		this.vat = this.gross - this.net;
		this.netAmount?.setValue(this.net.toFixed(2));
		this.vatAmount?.setValue(this.vat.toFixed(2));
	}
	//---values of vat and net value are calculated after gross value added---

	//---unable to enter characters other than numbers---
	keyPressNumbersWithDecimal(event: any) {
    	var charCode = (event.which) ? event.which : event.keyCode;
    	if (charCode != 46 && charCode > 31
      		&& (charCode < 48 || charCode > 57)) {
      			event.preventDefault();
      			return false;
    	}
    	return true;
  	}  
  	//---unable to enter characters other than numbers---	
}
