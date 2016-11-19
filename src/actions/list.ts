/// <reference path="../../typings/index.d.ts" />

import {IListArguments} from '../cli';
import {IConfiguration, ICommandConfiguration, ITemplateConfiguration, IVariableConfiguration} from '../core';
import {cyan, green, gray, red, yellow, italic} from 'chalk';

export const LIST = [
	'ls',
	'list',
	'l'
];

const generateLog: string = yellow( `ska generate` );
const infoLog: string = italic( 'Info' );
const destinationLog: string = italic( 'Destination' );

export const list: ( configuration: IConfiguration[], args: IListArguments ) => void =
	( configuration, args ) => {
		configuration.forEach( ( configurationElement: IConfiguration ) => {
			configurationElement = <ITemplateConfiguration>configurationElement;
			if( !args.quiet )
				console.log( red( configurationElement.name.toUpperCase() ), "\n" );
			let commands: ICommandConfiguration[] = configurationElement.definition;
			commands.forEach( ( command: ICommandConfiguration ) => {
				if( !args.quiet ){
					let variables: string =
						command.variables
						.map( ( variable: IVariableConfiguration ) => `<${yellow( variable.id )}>` )
						.join( ' ' );
					console.log( `  ${generateLog} ${red(command.command)} ${variables}` );
					console.log( `  ${command.info}` );
					console.log( `  [${command.destination}]` )
					console.log( `` );
				}else{
					console.log( command.command );
				}
				
			});
			
		})
	};