// types/index.ts
export type Qualification = {
	name: string;
	rate: number;
};

export type Teacher = {
	id: string;
	name: string;
	role: string;
	birthDate: string;
	email: string;
	phone: string;
	address: string;
	privateQualifications: Qualification[];
	groupQualifications: Qualification[];
};
