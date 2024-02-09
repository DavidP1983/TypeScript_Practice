interface IPhone {
	company: string;
	number: number;
}

type TInitialTypePhone = IPhone["company"];

interface IMobilePhone extends IPhone {
	size: string;
	companyPartner: TInitialTypePhone;
	manufactured: Date;
}

const phones: IMobilePhone[] = [
	{
		company: "Nokia",
		number: 1285637,
		size: "5.5",
		companyPartner: "MobileNokia",
		manufactured: new Date("2022-09-01"),
	},
	{
		company: "Samsung",
		number: 4356637,
		size: "5.0",
		companyPartner: "SamMobile",
		manufactured: new Date("2021-11-05"),
	},
	{
		company: "Apple",
		number: 4552833,
		size: "5.7",
		companyPartner: "no data",
		manufactured: new Date("2022-05-24T12:00:00"),
	},
];

interface IPhonesManufacturedAfterDate extends IMobilePhone {
	initialDate: string;
}

// Реализовать ф-ию, которая будет фильтровать мобильные телефоны по их дате производства

function filterPhonesByDate<T extends IMobilePhone, K extends keyof T>
(phones: T[], key: K, initial: string): IPhonesManufacturedAfterDate[] {
    
    return phones.filter((item) => Date.parse(item[key] as string) >  Date.parse(initial))
                  .map((item) => ({...item, initialDate: initial}))
}

console.log(filterPhonesByDate(phones, "manufactured", "2022-01-01"));
