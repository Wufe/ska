import {IArguments} from '../cli';
import {IConfiguration} from '../core';
import {LIST, list} from '.';

export default class Dispatcher{

	arguments: IArguments;
	configuration: IConfiguration[];

	constructor( configuration: IConfiguration[], args: IArguments ){
		this.arguments = args;
		this.configuration = configuration;
	}

	dispatch(): void{
		if( LIST.indexOf( this.arguments.action ) > -1 ){
			list( this.configuration );
		}
	}

}