
interface IStyle {
    [key: string]: unknown;
}

const formData: IStyle = {
    email: "",
    title: "",
    text: "",
    checkbox: false,
};


const form = document.querySelectorAll('form');
const checkbox = document.querySelector('[type="checkbox"]') as HTMLInputElement;




try {
    if(form.length !== 2) {
        throw new Error(`error`);
    }
    form.forEach((item): void => {
        sendForm(item);
    });
} catch (e: unknown) {
    if (e instanceof Error) {
        console.log(e.message);
    } else if (typeof e === 'string') {
        console.log(e);
    }
}

function sendForm(form: HTMLFormElement): void {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const data = new FormData(form); 
        data.forEach((value, key) => {
            if(checkbox.checked && key === 'checkbox') {
                formData[key] = !!value;
            }else {
                formData[key] = value;
            }
        })
        // console.log(formData);
        console.log(validateFormData(formData));
        form.reset();
        formData.checkbox = false;
    });
    
}


// Последовательность действий:
// 1) Происходит submit любой из форм
// 2) Все данные из 4х полей со страницы переходят в свойства объекта formData
// 3) Запускается функция validateFormData с этим объектом, возвращает true/false
// 4) Если на предыдущем этапе true, то запускается функция checkFormData с этим объектом

function isValid(data: IStyle): boolean {
    return Object.values(data).every(item => item);
}

function validateFormData(data: IStyle) {
	// Если каждое из свойств объекта data правдиво...
	if (isValid(data)) {
        checkFormData(data);
		return true;
	} else {
		console.log("Please, complete all fields");
		return false;
	}
}


function isSimalerEmail(email: unknown, array: string[]): boolean {
    if(typeof email === "string") {
       return array.some(item => item === email);
    }else {
        return false;
    }
}

function checkFormData(data: IStyle) {
	const { email } = data;
	const emails = ["example@gmail.com", "example@ex.com", "admin@gmail.com"];

	// Если email совпадает хотя бы с одним из массива
	if (isSimalerEmail(email, emails)) {
		console.log("This email is already exist");
	} else {
		console.log("Posting data...");
	}
}
