/// <reference path="../../typings/index.d.ts" />

import {IArguments} from '../cli';
import {IConfiguration, ICommandConfiguration, ITemplateConfiguration, IVariableConfiguration} from '../core';
import {green, gray, cyan} from 'chalk';

export const LIST = [
	'ls',
	'list',
	'l'
];

const generateLog: string = gray( `ska generate` );

export const list: ( configuration: IConfiguration[] ) => void =
	( configuration ) => {
		console.log( green( `Available Templates` ) );
		configuration.forEach( ( configurationElement: IConfiguration ) => {
			configurationElement = <ITemplateConfiguration>configurationElement;
			let commands: ICommandConfiguration[] = configurationElement.definition;
			commands.forEach( ( command: ICommandConfiguration ) => {
				let variables: string =
					command.variables
					.map( ( variable: IVariableConfiguration ) => gray( `<${cyan(variable.id)}>` ) )
					.join( ' ' );
				console.log( `${generateLog} ${green(command.command)} ${variables}` );
			});
			
		})
	};