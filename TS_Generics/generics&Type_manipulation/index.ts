
// interface IClasses {
// 	name: string;
// 	startsAt: string;
// 	duration: number;
// 	// willStartsAt?: string;
// }

// interface FutureClasses extends IClasses {
// 	willStartsAt: string;
// }

// interface CurrentClients {
// 	name: string;
// 	age: string | number;
// 	gender: string;
// 	timeLeft: string;
// }

// interface ExClients extends CurrentClients {
// 	makeCallFor: Date;
// }


// type ModifierIClasses = Omit<FutureClasses, "startsAt">;
// type ModifierCurrentClients = Omit<ExClients, "timeLeft">;
// type ModifierFutureClients = Omit<ExClients, "age" | "gender" | "timeLeft">;

// interface DescribeFitnessClub {
// 	clubName: string;
// 	location: string;
// 	classes: IClasses[];
// 	futureClasses: ModifierIClasses[];
// 	currClients: CurrentClients[];
// 	exClients: ModifierCurrentClients[];
// 	futureClients: ModifierFutureClients[];
// }




//1
type Props = "name" | "startsAt" | "duration";
type  DescribeClasses = {
	[K in Props]: K extends "duration"? number: string;
}

type FutureClasses = {
	willStartsAt: string;
}
type DescribeFutureClasses = Omit<DescribeClasses, "startsAt"> & FutureClasses;


//2
type Props2 = "name" | "age" | "gender" | "timeLeft";
type  DescribeCurrClients = {
	[K in Props2]: K extends "age"? number | string: string;
}
type ExClients = {
	makeCallFor: Date;
}
type DescribExClients = Omit<DescribeCurrClients, "timeLeft"> & ExClients;
type DescribeFutureClients = Omit<DescribExClients, "age" | "gender">;





interface DescribeFitnessClub {
	clubName: string;
	location: string;
	classes: DescribeClasses[];
	futureClasses: DescribeFutureClasses[];
	currClients: DescribeCurrClients[];
	exClients: DescribExClients[];
	futureClients: DescribeFutureClients[];
}


const fitnessClubCenter: DescribeFitnessClub = {
	clubName: "Fitness club Center",
	location: "central ave. 45, 5th floor",
	classes: [
		{
			name: "yoga",
			startsAt: "8:00 AM",
			duration: 60,
		},
		{
			name: "trx",
			startsAt: "11:00 AM",
			duration: 45,
		},
		{
			name: "swimming",
			startsAt: "3:00 PM",
			duration: 70,
		},
	],
	futureClasses: [
		{
			name: "boxing",
			willStartsAt: "6:00 PM",
			duration: 40,
		},
		{
			name: "breath training",
			willStartsAt: "8:00 PM",
			duration: 30,
		},
	],
	currClients: [
		{
			name: "John Smith",
			age: "-",
			gender: "male",
			timeLeft: "1 month",
		},
		{
			name: "Alise Smith",
			age: 35,
			gender: "female",
			timeLeft: "3 month",
		},
		{
			name: "Ann Sonne",
			age: 24,
			gender: "female",
			timeLeft: "5 month",
		},
	],
	exClients: [
		{
			name: "Tom Smooth",
			age: 50,
			gender: "male",
			makeCallFor: new Date("2023-08-12"),
		},
	],
	futureClients: [
		{
			name: "Maria",
			makeCallFor: new Date("2023-07-10"),
		},
	],
};
