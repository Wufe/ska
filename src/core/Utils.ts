/// <reference path="../../typings/index.d.ts" />

import {accessSync, constants, lstatSync} from 'fs';

const fileExists = ( fileName: string ) => {
	try{
        accessSync( fileName, constants.F_OK );
        return true;
    }catch( e ){
        return false;
    }
};

const getNestedValue = ( obj: any, ...keys: string[] ) => {
    if( keys.length === 1 ){
        return obj[ keys[0] ];
    }else{
        let value: any = obj;
        let i: number = 0;
        while( typeof value != 'undefined' && i < keys.length ){
            value = value[ keys[i++] ];
        }
        return value;
    }
};

const isFile = ( fileName: string ) => {
    if( fileExists( fileName ) ){
        return lstatSync( fileName ).isFile();
    }
    return false;
};

const isDirectory = ( fileName: string ) => {
	if( fileExists( fileName ) ){
		return !isFile( fileName );
	}
	return false;
};

const setNestedValue = ( obj: any, value: any, ...keys: string[] ) => {
    let objSubtree: any = obj;
    let finalKey: string;
    while( keys.length > 0 ){
        if( finalKey ){
            objSubtree = objSubtree[ finalKey ];    
        }
        let key: string = keys[0];
        keys = keys.slice(1);
        if( objSubtree[ key ] === undefined || typeof objSubtree[ key ] != "object" ){
            objSubtree[ key ] = {};
        }
        finalKey = key;
    }
    objSubtree[ finalKey ] = value;
    return obj;
};

export {
	fileExists,
    getNestedValue,
	isFile,
	isDirectory,
    setNestedValue
};