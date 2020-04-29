import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class DataService {

	finalResult = [];
	currencyCode: string;

	constructor(private http: HttpClient) { }

	setResult(result) {
		this.finalResult = result;
		console.log('set Result');
		console.log(this.finalResult);
	}

	getResult() {
		return this.finalResult;
	}
}
