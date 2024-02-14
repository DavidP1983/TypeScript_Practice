

interface IForm {
	login: string;
	password: string;
	// test: string,
}

// type FormProps = keyof IForm;
// type ModifierVaidation = {
// 	[K in keyof FormResponse]: string | boolean;
// }
// type FormValidation = Record<FormProps, ModifierVaidation>


type FormResponse =  {
	isValid: boolean;
	errorMsg?: string;
}


type FormAnotation = {
	[K in keyof IForm]: K extends "login" | "password" ? FormResponse: string;
}


const validationData: FormAnotation = {
	login: { isValid: false, errorMsg: "At least 3 characters"},
	password: { isValid: true },
	// test: "s"
};
