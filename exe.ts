// --- 1.Exe vatiables type --- //

const currRate: string = "1.05";

const fetchCurr = (response : string): number => {
    try {
        const data: number = JSON.parse(response);
        return data;    
    }catch(e) {
        throw(e)
    }
};

function transferEurToUsd(available : Boolean, amount : number, commission : number): void {
	if (available) {
		let res: number = fetchCurr(currRate) * amount * commission;
		 console.log(res);
		// Или запись в элемент на странице вместо консоли
	} else {
		console.log("Сейчас обмен недоступен");
	}
}

transferEurToUsd(true, 500, 1.05);







// --- 2.Exe object and array --- //

const electricityUserData = {
	readings: 95,
	units: "kWt",
	mode: "double",
};

const waterUserData = {
	readings: 3,
	units: "m3",
};

const elRate : number = 0.45;
const wRate : number = 2;

const monthPayments :number[] = [0, 0]; // [electricity, water]

const calculatePayments = (
    {readings, mode} :{readings: number, mode: string}, 
    wData:{readings : number}, 
    elRate :number, 
    wRate :number)
    : void => {
	if (mode === "double" && readings < 50) {
		 monthPayments[0] = readings * elRate * 0.7;
	} else {
		 monthPayments[0] = readings * elRate;
	}

	 monthPayments[1] = wData.readings * wRate;
};

calculatePayments(electricityUserData, waterUserData, elRate, wRate);


const sendInvoice = (
    [electricity, water] : number[], 
    {readings, units}: {readings : number, units : string},
     waterUserData:{readings: number, units: string}) 
     : string => {
	const text = `    Hello!
    This month you used ${readings} ${units} of electricity
    It will cost: ${electricity}€
    
    This month you used ${waterUserData.readings} ${waterUserData.units} of water
    It will cost: ${water}€`;

	return text;
};

console.log(sendInvoice(monthPayments, electricityUserData, waterUserData));








// --- 3.Exe Type & interface --- //

// структура данных склада с одеждой
type TPropValues = "empty" | number;
 
interface IClothesWarehouse {
	jackets: TPropValues;
	hats: TPropValues;
	socks: TPropValues;
	pants: TPropValues;
}

// структура данных склада с канцтоварами

interface IStationeryWarehouse {
	scissors: TPropValues;
	paper: "empty" | boolean;
}

// структура данных склада с бытовой техникой

interface IAppliancesWarehouse {
	dishwashers: TPropValues;
	cookers: TPropValues;
	mixers: TPropValues;
}

// общая структура данных, наследуюет все данные из трех выше
// + добавляет свои

interface ITotalWarehouse extends IClothesWarehouse, IStationeryWarehouse, IAppliancesWarehouse {
	deficit: boolean;
	date: Date;
}

// главный объект со всеми данными, должен подходить под формат TotalWarehouse

const totalData : ITotalWarehouse = {
	jackets: 5,
	hats: "empty",
	socks: "empty",
	pants: 15,
	scissors: 15,
	paper: true,
	dishwashers: 3,
	cookers: "empty",
	mixers: 14,
    deficit: true,
    date: new Date()
};

// Реализуйте функцию, которая принимает в себя главный объект totalData нужного формата
// и возвращает всегда строку
// Функция должна отфильтровать данные из объекта и оставить только те названия товаров, у которых значение "empty"
// и поместить их в эту строку. Если таких товаров нет - возвращается другая строка (см ниже)

// С данным объектом totalData строка будет выглядеть:
// "We need this items: hats, socks, cookers"
// Товары через запятую, в конце её не должно быть. Пробел после двоеточия, в конце строки его нет.

function printReport(data: ITotalWarehouse): string {
    const emptyValue: string[] = Object.entries(data)
                                .filter((item) => item[1] === 'empty')
                                .map((item) => item[0]);
    if(emptyValue.length > 0) {
        return `We need this items: ${emptyValue.join(", ")}`;
    }
	// или
	return "Everything fine";
}

// function printReport(data: ITotalWarehouse): string {
//     const emptyValue: string = Object.entries(data)
//                                 .filter((item) => item[1] === 'empty')
//                                 .reduce((res, item) => `${res} ${item[0]},`,"");
//     if(emptyValue.trim().length) {
//         return `We need this items:${emptyValue.slice(0, -1)}`;
//     }
// 	// или
// 	return "Everything fine";
// }

console.log(printReport(totalData));




// Given the data, define the interface "User" and use it accordingly.

 interface User {
    name: string;
    age: number;
    occupation: string;
}

 const users: User[] = [
    {
        name: 'Max Mustermann',
        age: 25,
        occupation: 'Chimney sweep'
    },
    {
        name: 'Kate Müller',
        age: 23,
        occupation: 'Astronaut'
    }
];

 function logPerson(user: User) {
    console.log(` - ${user.name}, ${user.age}`);
}

console.log('Users:');
users.forEach(logPerson);








// --- 4. Exe Enum & Interface & Unknown & typeof_queries --- //

enum TypesOfMedia {
	VIDEO = 'video',
	AUDIO = 'audio'
}

enum FormatsOfMedia {
	MP4 = '.mp4',
	MOV = ' .mov',
	MKV = '.mkv',
	FLV = '.flv',
	WEBM = '.webM'
}


interface IMedia {
	name: string;
	type: TypesOfMedia;
	format: FormatsOfMedia;
	subtitles?: string;
	// subtitles: string | undefined;
	// marks?: unknown & (string | number)[]; 
	marks?: unknown;
}

function playMedia(
	{ name, type, format, subtitles, marks }: IMedia = {
		name: "example",
		type:  TypesOfMedia.VIDEO,
		format: FormatsOfMedia.MP4,

	}
): string {
	let marksLog: string;
	if(Array.isArray(marks)) {
		marksLog = marks.reduce((acc, prev) =>` ${acc}, ${prev}`);
	}else if(typeof marks === 'string') {
		 marksLog = marks;
	}else {
		 marksLog = "Unsupported type of marks";
	}

	console.log(`Media ${name}${format} is ${type}
    Marks: ${marksLog}
    Subtitles: ${subtitles ?? "none"}`);

	return "Media started";
}

playMedia({
	name: "WoW",
	format: FormatsOfMedia.MOV,
	type: TypesOfMedia.VIDEO,
	subtitles: "hmhmhm hmhmhm doh",
	marks: ["4:30", "5:40"],
});



//--- interface ---//

// const media = {
// 	name: "WoW",
// 	type: TypesOfMedia.VIDEO,
// 	format: FormatsOfMedia.MP4,
// 	subtitles: "hmhmhm hmhmhm doh",
// 	marks: ["4:30", "5:40"],
// }

// function playMedia({name, type, format, subtitles, marks}: IMedia): string {
// 	let marksLog: string;
// 	if(Array.isArray(marks)) {
// 		marksLog = marks.join(', ');
// 	}else if(typeof marks === 'string') {
// 		marksLog = marks;
// 	}else {
// 		marksLog = "Unsupported type of marks";
// 	}
// 	console.log(`Media ${name}${format} is ${type}
//                  Marks: ${marksLog}
//     			 Subtitles: ${subtitles ?? "none"}`);


// 	return "Media started";
// }

// playMedia(media);



//--- Typeof_queries ---//

// const media = {
// 	name: "WoW",
// 	type: TypesOfMedia.VIDEO,
// 	format: FormatsOfMedia.MP4,
// 	subtitles: "hmhmhm hmhmhm doh",
// 	marks: ["4:30", "5:40"],
// }

// function playMedia({name, type, format, subtitles, marks}: typeof media): string {
// 	let marksLog: string;
// 	if(Array.isArray(marks)) {
// 		marksLog = marks.join(', ');
// 	}else if(typeof marks === 'string') {
// 		marksLog = marks;
// 	}else {
// 		marksLog = "Unsupported type of marks";
// 	}
// 	console.log(`Media ${name}${format} is ${type}
//                  Marks: ${marksLog}
//     			 Subtitles: ${subtitles ?? "none"}`);


// 	return "Media started";
// }

// playMedia(media);







// --- 5. Exe Type_Guard & correct_interfaces --- //

type TAnimal = 'cat' | 'dog' | 'bird';

// Request
interface IAnimalInfo {
    animal: TAnimal;
    breed: string;
    sterilized?: string;
}

// Response #1
//  {
//     status: 'available';
//     data: {
//         animal: TAnimal;
//         breed: string;
//         sterilized?: string;
//         location: string;
//         age?: number;
//     }
// }
enum Status {
	Available = "available",
	NotAvailable = "not available"
 }


// DRY
interface AvailableAnimalData extends IAnimalInfo {
	location: string;
	age?: number;
}

interface AvailableResponse {
	status: Status.Available;
	data: AvailableAnimalData
}

// Response #2
// {
//     status: 'not available',
//     data: {
//         message: string,
//         nextUpdateIn: Date
//     }
// }
interface NotAvailableAnimalData {
	message: string;
	nextUpdateIn: Date;
}

interface NotAvailableResponse {
    status: Status.NotAvailable;
    data: NotAvailableAnimalData;
}

type Resalt = AvailableResponse | NotAvailableResponse;

function isAvailable(availableAnimal: Resalt): availableAnimal is AvailableResponse {
	if(availableAnimal.status === Status.Available) {
		return true;
	}else {
		return false;
	}
}


function checkAnimalData(animal: Resalt): string | AvailableAnimalData {
	if (isAvailable(animal)) {
		// Заменить условие!
		return animal.data;
	} else {
		return `${animal.data}, you can try in ${animal.data.nextUpdateIn}`;
	}
}

