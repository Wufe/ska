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
	}

	getConfiguration(): void{
		this.configuration = ( new Configuration() ).get();
		//console.log( JSON.stringify( this.configuration, null, 2 ) );
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