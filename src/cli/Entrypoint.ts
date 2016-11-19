/// <reference path="../../typings/index.d.ts" />

import {ArgumentParser} from 'argparse';
import {Creator} from '.';
import {Configuration} from '../core';

import {red as Red} from 'chalk';

interface Arguments{
	action: string;
}

interface GenerateArguments extends Arguments{
	name?: string;
	variables?: string[];
}

export default class Entrypoint{

	argumentParser: ArgumentParser;
	args: GenerateArguments;

	constructor(){}

	setup(): void{
		let creator: Creator = new Creator();
		this.argumentParser = creator.createArgumentParser();
	}

	parseArgs(): void{
		this.args = this.argumentParser.parseArgs();
	}

	getConfiguration(): void{
		let configuration: Configuration = new Configuration();
		configuration.get();
	}

	run(){
		try{
			this.setup();
			this.parseArgs();
			this.getConfiguration();
		}catch( error ){
			console.error( Red( error.message ) );
		}
	}

}