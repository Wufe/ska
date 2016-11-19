export interface IIndexConfiguration extends Array<string>{}


export interface ITemplateConfiguration{
	name: string;
	definition: ICommandConfiguration[];
}

export interface ICommandConfiguration{
	command: string;
	info: string;
	template: string;
	destination: string;
	variables: IVariableConfiguration[];
}

export interface IVariableConfiguration{
	id: string;
	info: string;
}

export type IConfiguration = IIndexConfiguration | ITemplateConfiguration;