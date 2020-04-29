import { Component, OnInit } from '@angular/core';

import { DataService } from '../_services/data.service';
import { $ } from 'protractor';

@Component({
	selector: 'app-form-result',
	templateUrl: './form-result.component.html',
	styleUrls: ['./form-result.component.scss']
})
export class FormResultComponent implements OnInit {

	showResult: any;
	constructor(public dataService: DataService) {
		console.log('constructor');
		console.log(dataService.finalResult);
	}

	ngOnInit() {
		this.renderResult();
	}

	renderResult() {
		console.log('render Result');
		this.showResult = this.dataService.getResult();

	}

	printPage() {
		// let data = document.getElementById('result-container').outerHTML;

		// let mywindow = window.open('', 'PRINT', 'height=400,width=600');
		// mywindow.document.write(data);
		window.print();
	}

}
