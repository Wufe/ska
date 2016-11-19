/// <reference path="../../typings/index.d.ts" />
/// <reference path="../../node_modules/@types/mkdirp/index.d.ts" />

import {IGenerateArguments} from '../cli';
import {IConfiguration, ICommandConfiguration, ITemplateConfiguration, IVariableConfiguration, renderFunctions, isDirectory, isFile} from '../core';
import {readFileSync, writeFileSync} from 'fs';
import {render} from 'mustache';
import {sync as mkdirpSync} from 'mkdirp';
import {join, resolve} from 'path';
import {green, red} from 'chalk';

export const GENERATE = [
	'generate',
	'g',
	'gen',
	'make'
];

const renderCommand: ( command: ICommandConfiguration, args: IGenerateArguments ) => void =
	( command, args ) => {
		if( args.values.length != command.variables.length )
			throw new Error( `Arguments supplied are not enough.` );
		let view: {
			[key:string]: string;
		} = {};
		command.variables.forEach( ( variable: IVariableConfiguration, index: number ) => {
			view[ variable.id ] = args.values[ index ];
		});
		view = Object.assign({}, view, renderFunctions );
		if( !isFile( command.template ) )
			throw new Error( `Cannot find the template [${command.template}].` );
		let template: string = readFileSync( command.template, 'utf8' );
		if( !args.save ){
			console.log( render( template, view ) );
		}else{
			let nameIndex: number = command.variables.findIndex( ( variable: IVariableConfiguration ) => {
				return variable.id == 'name';
			});
			let name: string =  nameIndex > -1 ? args.values[nameIndex] : ( new Date() ).toString();
			let extensionRegexp = /(?:\.([^.]+))?$/;
			let extension = extensionRegexp.exec( command.template )[1];
			if( !extension )
				extension = "";
			name = `${name}.${extension}`;
			let destinationPath: string = resolve( join( '.', command.destination ) ) ;
			if( !isDirectory( destinationPath ) ){
				console.log( `Destination folder does not exist. Creating it..` );
				try{
					mkdirpSync( destinationPath );
					console.log( green( `Directory [${destinationPath}] created.` ) );
				}catch( error ){
					console.log( red( `Cannot create directory [${destinationPath}] created.` ) );
					throw error;
				}
			}
			let filePath: string = resolve( join( destinationPath, name ) );
			if( isFile( filePath ) )
				throw new Error( `The file [${filePath}] already exists.` );
			try{
				writeFileSync( filePath, render( template, view ), {
					encoding: 'utf8'
				});
				console.log( green( `File created [${filePath}].` ) );
			}catch( error ){
				throw error;
			}
			
		}
	};

export const generate: ( configuration: IConfiguration[], args: IGenerateArguments ) => void =
	( configuration, args ) => {
		let commandName: string = args.name;
		let command: ICommandConfiguration;
		configuration.forEach( ( configurationElement: IConfiguration ) => {
			configurationElement = <ITemplateConfiguration>configurationElement;
			let commands: ICommandConfiguration[] = configurationElement.definition;
			let commandIndex: number = commands.findIndex( ( command: ICommandConfiguration ) => {
				return command.command == commandName;
			});
			if( commandIndex > -1 )
				command = commands[ commandIndex ];
		});
		if( !command )
			throw new Error( `Cannot find a template called "${commandName}".` );
		renderCommand( command, args );
	};