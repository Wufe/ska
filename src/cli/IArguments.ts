export interface IActionArguments{
	action: string;
}

export interface IGenerateArguments extends IActionArguments{
	name?: string;
	values?: string[];
	save: boolean;
}

export interface IListArguments extends IActionArguments{
	quiet: boolean;
}

export type IArguments = IActionArguments | IGenerateArguments;