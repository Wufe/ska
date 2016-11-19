/// <reference path="../../../../typings/index.d.ts" />

import {Action} from '../actions';
import {Reducer} from 'redux';

const {{#lowercase}}{{name}}{{/lowercase}}Reducer: ( state: any, action: any ) => any =
	function( state = app, action ){

		let {payload} = action;

		switch( action.type ){
			default:
				return state;
		}
	};

export default {{#lowercase}}{{name}}{{/lowercase}}Reducer;