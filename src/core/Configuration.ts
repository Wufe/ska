/// <reference path="../../typings/index.d.ts" />

import {readFileSync} from 'fs';
import {join, resolve} from 'path';
import {safeLoad} from 'js-yaml';
import {IConfiguration, ICommandConfiguration, IIndexConfiguration, ITemplateConfiguration, isDirectory, isFile} from '.';

const CONFIG_FILENAME = 'ska.yml';

export default class Configuration{

	configuration: IConfiguration[];

	get(): IConfiguration[]{
		try{
			if( !this.configuration )
				this.configuration = this.parseConfiguration();
			return this.configuration;
		}catch( error ){
			throw new Error( `Cannot find a configuration file.
Either specify its path in package.json, under a 'ska' attribute,
or create a configuration file in the current directory called ${CONFIG_FILENAME}.` );
		}
	}

	private parseConfiguration( configuration?: IConfiguration, cwd: string = '.' ): IConfiguration[]{
		if( !configuration )
			configuration = this.searchConfiguration();
		let returnConfiguration: IConfiguration[] = [];
		if( this.isArray( configuration ) ){
			configuration = <IIndexConfiguration>configuration;
			configuration.forEach( ( configurationPath: string ) => {
				try{
					let configurationWorkingDir: string = resolve( join ( cwd, configurationPath ) )
					let configurationParsed: IConfiguration = this.searchConfiguration( configurationWorkingDir );
					let foundConfigurations: IConfiguration[] = this.parseConfiguration( configurationParsed, configurationWorkingDir );
					returnConfiguration.push( ...foundConfigurations );
				}catch( error ){}
			});
		}else{
			configuration = <ITemplateConfiguration>configuration;
			configuration.definition.map( ( command: ICommandConfiguration ) => {
				command.template = resolve( join( cwd, command.template ) );
				return command;
			});
			returnConfiguration.push( configuration );
		}
		return returnConfiguration;
	}

	private searchConfiguration( directory: string = '.' ): IConfiguration{

		let skaConfiguration: IConfiguration;
		try{
			let packagePath: string = resolve( join( directory, 'package.json' ) );
			if( !isFile( packagePath ) )
				throw new Error( `Package file not found.` );
			let packageJson: { [key:string]: any } = JSON.parse( this.getFileContent( packagePath ) );
			let ska: any = packageJson[ 'ska' ];
			if( !ska )
				throw new Error( `Ska definition not found in package.json.` );
			if( typeof ska == 'object' ){
				skaConfiguration = ska;
			}else if( typeof ska == 'string' ){
				let skaPath: string = resolve( join( directory, ska ) );
				if( !isFile( skaPath ) )
					throw new Error( `Ska definition not found in [${skaPath}].` );
				skaConfiguration = safeLoad( this.getFileContent( skaPath ) );
			}
		}catch( error ){}
		if( !skaConfiguration ){
			let skaPath: string = resolve( join( directory, CONFIG_FILENAME ) );
			if( !isFile( skaPath ) )
				throw new Error( `Ska definition not found in [${skaPath}].` );
			skaConfiguration = safeLoad( this.getFileContent( skaPath ) );
		}
		return skaConfiguration;
	}

	private isArray( obj: any ){
		return obj.constructor === [].constructor;
	}

	private getFileContent( path: string ){
		if( isFile( path ) ){
			return readFileSync( path, 'utf8' );
		}else{
			throw new Error( `File not found [${path}].` );
		}
	}

}