export type IndexConfiguration = string[];

export interface TemplateConfiguration{
	name: string;
	definition: {
		command: string;
		template: string;
		variables: {
			name: string;
			info: string;
		}[];
	}[];
}

export type IConfiguration = IndexConfiguration | TemplateConfiguration;