/// <reference path="../../typings/index.d.ts" />

import {readFileSync} from 'fs';
import {join, resolve} from 'path';
import {safeLoad} from 'js-yaml';
import {IConfiguration, isDirectory, isFile} from '.';

const CONFIG_FILENAME = 'ska.yml';

export default class Configuration{

	configuration: IConfiguration;

	get(): IConfiguration{
		if( !this.configuration )
			this.findRootConfiguration();
		return this.configuration;
	}

	private findRootConfiguration(): void{
		let skaConfiguration: any = this.searchConfigurationInPackage();
		if( !skaConfiguration )
			skaConfiguration = this.searchConfigurationInCurrentDirectory();
		if( !skaConfiguration )
			throw new Error( `Cannot find a configuration file.
Either specify its path in package.json, under a 'ska' attribute,
or create a configuration file in the current directory called ${CONFIG_FILENAME}.` );
		try{
			this.configuration = safeLoad( skaConfiguration );
		}catch( error ){
			throw error;
		}
	}

	private searchConfigurationInPackage(): string{
		let packagePath: string = resolve( join( '.', 'package.json' ) );
		let skaConfiguration: string;
		if( isFile( packagePath ) ){
			let packageFile: string = readFileSync( packagePath, 'utf8' );
			try{
				let packageJSON: {
					[key: string]: any
				} = JSON.parse( packageFile );
				if( packageJSON[ 'ska' ] !== undefined ){
					let skaSettings: any = packageJSON[ 'ska' ];
					if( typeof skaSettings == 'object' ){
						skaConfiguration = skaSettings;
					}else if( typeof skaSettings == 'string' ){
						let configurationPath: string = resolve( join ( '.', skaSettings ) );
						if( isFile( configurationPath ) ){
							skaConfiguration = readFileSync( configurationPath, 'utf8' );
						}
					}
				}
			}catch( error ){}
		}
		return skaConfiguration;
	}

	private searchConfigurationInCurrentDirectory(): string{
		let skaConfiguration: string;
		let configurationPath: string = resolve( join ( '.', 'ska.yml' ) );
		if( isFile( configurationPath ) )
			skaConfiguration = readFileSync( configurationPath, 'utf8' );
		return skaConfiguration;
	}

}