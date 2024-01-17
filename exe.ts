// 1.Exe vatiables type

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




// 2.Exe object and array

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





// 3.Exe Type & interface

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
