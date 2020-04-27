import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements OnInit {

  base_amount: number;
  interest_rate: number;
  interest_rate_type: string = "yearly";
  calculation_period: number;
  calculation_period_type: string;
  compound_interval: string;
  resultArray: Array<{}> = [];
  compoundedTimes: object = {
    "monthly": 12,
    "quarterly": 4,
    "halfyearly": 2,
    "yearly": 1
  };

  constructor() { }

  ngOnInit() {

  }

  doCalculation() {
    // debugger;
    // console.log(this);

    let t = this.getCalculationPeriod(this.calculation_period, this.calculation_period_type);
    let n = this.compoundedTimes[this.compound_interval];
    let r = this.getInterestRate(this.interest_rate_type, this.interest_rate);

    let principal_amount = this.roundOf(this.base_amount);
    let interest_gained = 0;
    let total_interest_gained = 0;
    this.resultArray = [];
    for (let i = 1; i <= this.calculation_period; i++) {
      let amount = principal_amount * (1 + (r / n)) ** (n * t);

      interest_gained = amount - principal_amount;
      total_interest_gained = total_interest_gained + interest_gained;

      let row = {
        id: i,
        opening_balance: this.roundOf(principal_amount),
        interest: this.roundOf(interest_gained),
        total_interest: this.roundOf(total_interest_gained),
        total_balance: this.roundOf(amount)
      };
      this.resultArray.push(row);

      principal_amount = amount;

    }
    console.log(this.resultArray);
  }

  getCalculationPeriod(period, type) {
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

}
