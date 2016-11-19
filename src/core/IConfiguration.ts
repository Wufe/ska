export interface IIndexConfiguration extends Array<string>{}

export interface ITemplateConfiguration{
	name: string;
	definition: {
		command: string;
		info: string;
		template: string;
		destination: string;
		variables: {
			id: string;
			info: string;
		}[];
	}[];
}

export type IConfiguration = IIndexConfiguration | ITemplateConfiguration;