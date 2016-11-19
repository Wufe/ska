export interface IActionArguments{
	action: string;
}

export interface IGenerateArguments extends IActionArguments{
	name?: string;
	variables?: string[];
}

export type IArguments = IActionArguments | IGenerateArguments;