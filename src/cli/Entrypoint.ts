/// <reference path="../../typings/index.d.ts" />

import {ArgumentParser} from 'argparse';
import {Creator, IArguments} from '.';
import {Configuration, IConfiguration} from '../core';
import {Dispatcher} from '../actions';

import {red as Red} from 'chalk';

export default class Entrypoint{

	arguments: IArguments;
	configuration: IConfiguration[];

	constructor(){}

	parseArgs(): void{
		let argumentParser: ArgumentParser = ( new Creator() ).createArgumentParser();
		this.arguments = argumentParser.parseArgs();
		//console.log( this.arguments );
	}

	getConfiguration(): void{
		this.configuration = ( new Configuration() ).get();
	}

	dispatch(): void{
		( new Dispatcher( this.configuration, this.arguments ) ).dispatch();
	}

	run(){
		try{
			this.parseArgs();
			this.getConfiguration();
			this.dispatch();
		}catch( error ){
			console.error( Red( error.message ) );
		}
	}

}