export interface IProfileResp {
	intro: IIntro;
	projects: IProject[];
	achievements?: { name: string; details: string; hide?: boolean }[];
	technologies: ITechnology[];
	workExperiences: IWorkExperience[];
	educations: IEducation[];
	interests: string[];
	resumeUrl: {
		sourceLink: string;
		fullVersionLink: string;
	};
}
export interface IIntro {
	name: string;
	nickname: string;
	title?: string;
	summary?: string;
	phone: string;
	email: string;
	github: string;
	linkedin: string;
	location: string;
	website: string;
}

export interface IProject {
	name: string;
	details: string;
	url: string;
	hide: boolean;
}

export interface ITechnology {
	section: string;
	details: string;
}

export interface IWorkExperience {
	position: string;
	company: string;
	location?: string;
	startDate?: string;
	url: string;
	years: string[];
	details: string[];
}

export interface IEducation {
	head: string;
	details: string;
}
