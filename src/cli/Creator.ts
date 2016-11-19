/// <reference path="../../typings/index.d.ts" />

import {ArgumentParser, SubParser, SubparserOptions} from 'argparse';

const commands = require( './commands.yml' );
const pack = require( '../../package.json' );

export default class Creator{

	constructor(){}

	createArgumentParser(): ArgumentParser{
		let argumentParser: ArgumentParser = new ArgumentParser({
			version: pack.version,
			description: pack.description,
			addHelp: true
		});
		let rootProperties: any = commands;
		this.addSubparser( argumentParser, rootProperties );
		return argumentParser;
	}

	addSubparser( rootParser: ArgumentParser, properties: any ): void{
		let {title, dest, commands}: {
			title?: string;
			dest?: string;
			commands?: any[];
		} = properties;
		let subparser: SubParser = rootParser.addSubparsers({
			title,
			dest
		});
		if( commands ){
			commands.forEach( ( command: any ) => {
				this.addCommand( subparser, command );
			});
		}
	}

	addCommand( subparser: SubParser, command: any ): void{
		let {id, args, sub}: {
				id?: any;
				args?: any[];
				sub?: any;
			} = command;
			delete command.args;
			delete command.sub;
			delete command.id;
			let parser: ArgumentParser = subparser.addParser( id, command );
			if( args ){
				args.forEach( ( arg: any ) => {
					this.addArgument( parser, arg );
				});
			}
			if( sub )
				this.addSubparser( parser, sub );
	}

	addArgument( parser: ArgumentParser, argument: any ){
		let {id}: {
			id?: any;
		} = argument;
		delete argument.id;
		parser.addArgument( id, argument );
	}

}