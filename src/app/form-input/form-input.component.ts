import { Component, OnInit } from '@angular/core';

import { DataService } from '../_services/data.service';

@Component({
	selector: 'app-form-input',
	templateUrl: './form-input.component.html',
	styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements OnInit {

	base_amount: number = 100;
	interest_rate: number = 12;
	interest_rate_type: string = "yearly";
	calculation_period: number = 5;
	calculation_period_type: string = "years";
	compound_interval: string = "yearly";
	resultArray: Array<{}> = [];
	compoundedTimes: object = {
		"monthly": 12,
		"quarterly": 4,
		"halfyearly": 2,
		"yearly": 1
	};
	currencyCode: string = "USD";

	constructor(private dataService: DataService) { }

	ngOnInit() {

	}


	doCalculation(event) {
		// debugger;
		// console.log(this);
		let t = this.getCalculationPeriod(this.calculation_period, this.calculation_period_type);
		let n = this.compoundedTimes[this.compound_interval];
		let r = this.getInterestRate(this.interest_rate_type, this.interest_rate);

		let principal_amount = this.roundOf(this.base_amount);
		let interest_gained = 0;
		let total_interest_gained = 0;
		this.resultArray = [];
		let compound_times = '';
		for (let i = 1; i <= this.calculation_period; i++) {
			let amount = principal_amount * (1 + (r / n)) ** (n * t);

			interest_gained = amount - principal_amount;
			total_interest_gained = total_interest_gained + interest_gained;

			compound_times = this.getCompoundedTimes(amount);
			let row = {
				"id": i,
				"opening_balance": this.roundOf(principal_amount),
				"interest": this.roundOf(interest_gained),
				"total_interest": this.roundOf(total_interest_gained),
				"total_balance": this.roundOf(amount),
				"compound_times": compound_times + 'x'
			};
			this.resultArray.push(row);

			principal_amount = amount;

		}
		console.log(this.resultArray);
		this.dataService.currencyCode= this.currencyCode;
		this.dataService.setResult(this.resultArray);

	}

	getCalculationPeriod(period, type) {
		period = 1; // 1-month/year
		if (type == 'months') {
			return period / 12;
		}
		return period;
	}

	/**
	 * 
	 * @param type 
	 * @param rate 
	 */
	getInterestRate(type, rate) {
		if (type == 'monthly') {
			rate = Number(rate * 12);
		}
		return rate / 100;
	}

	roundOf(n, digits = 2) {
		n = n * Math.pow(10, digits);
		n = Math.round(n);
		n = n / Math.pow(10, digits);
		return n.toFixed(digits);
	}

	getCompoundedTimes(amount) {
		let times = (amount / this.base_amount);
		return times = this.roundOf(times, 1);
	}

}
