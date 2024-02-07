// Создать Generic-интерфейс PlayerData, который подходил бы для создания таких объектов:

interface ComplexData {
    total: number;
    inMenu: number;
}

interface PlayerData<T extends number | string, S extends number | string | ComplexData> {
    game: T;
    hours: S;
    server: string;
}

// Option 2
// interface PlayerData<Game, Hours> {
//     game: Game;
//     hours: Hours;
//     server: string;
// }

const player1: PlayerData<string, number> = {
	game: "CS:GO",
	hours: 300,
	server: "basic",
};

const player2: PlayerData<number, string>= {
	game: 2048,
	hours: "300 h.",
	server: "arcade",
};

const player3: PlayerData<string, {total: number, inMenu: number}> = {
	game: "Chess",
	hours: {
		total: 500,
		inMenu: 50,
	},
	server: "chess",
};

// Option 2
// const player3: PlayerData<string, object> = {
// 	game: "Chess",
// 	hours: {
// 		total: 500,
// 		inMenu: 50,
// 	},
// 	server: "chess",
// };


 
// Массив данных с фигурами содержит объекты, у каждого из которых обязательно есть свойство name
// Каждый объект может еще содержать дополнительные свойства в случайном виде
// Свойство name может иметь только 4 варианта
// Функция calculateAmountOfFigures должна принимать массив с объектами, у которых обязательно должно быть свойство name
// Возвращает она объект-экземпляр AmountOfFigures
// Внутри себя подсчитывает сколько каких фигур было в массиве и записывает результаты в AmountOfFigures
// С текущими данными должно в консоль попадет:
// { squares: 3, circles: 2, triangles: 2, others: 1 }

interface AmountOfFigures {
	squares: number;
	circles: number;
	triangles: number;
	others: number;
}

function calculateAmountOfFigures<T extends ArrObjects<{}>[]>(figure: T): AmountOfFigures {
    const result: AmountOfFigures = {
        squares: 0,
        circles: 0,
        triangles: 0,
        others: 0
    }
    figure.forEach((item) => {
        switch(item.name) {
            case "rect":
                return result.squares++;
            case "circle":
                return result.circles++;
            case "triangle":
                return result.triangles++;
            case "line":
                return result.others++;
            default:
                throw new Error('error');
        }
    });

    return result
}

enum GeometricFigure {
    RECT = 'rect',
    CIRCLE = 'circle',
    TRIANGLE = 'triangle',
    LINE = 'line'
}

interface Data {
    a?: number,
    b?: number,
    l?: number,
    r?: number
}
interface ArrObjects<T extends Data> {
    name: GeometricFigure;
    data?: T
}

const data/* :   ArrObjects<{}>[] */ = [
	{
		name: GeometricFigure.RECT,
		data: { a: 5, b: 10 },
	},
	{
		name: GeometricFigure.RECT,
		data: { a: 6, b: 11 },
	},
	{
		name: GeometricFigure.TRIANGLE,
		data: { a: 5, b: 10, c: 14 },
	},
	{
		name: GeometricFigure.LINE,
		data: { l: 15 },
	},
	{
		name: GeometricFigure.CIRCLE,
		data: { r: 10 },
	},
	{
		name: GeometricFigure.CIRCLE,
		data: { r: 5 },
	},
	{
		name: GeometricFigure.RECT,
		data: { a: 15, b: 7 },
	},
	{
		name: GeometricFigure.TRIANGLE,
	},
];

console.log(calculateAmountOfFigures(data));