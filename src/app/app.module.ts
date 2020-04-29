import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule }    from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { FormInputComponent } from './form-input/form-input.component';
import { FormResultComponent } from './form-result/form-result.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FormInputComponent,
		FormResultComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
