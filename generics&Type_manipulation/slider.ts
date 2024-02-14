interface ISlider {
	container?: string;
	numberOfSlides?: number;
	speed?: 300 | 500 | 700;
	direction?: "horizontal" | "vertical";
	dots?: boolean;
	arrows?: boolean;
	animationName?: string;
}

function createSlider({
	container = "",
	numberOfSlides = 1,
	speed = 300,
	direction = "horizontal",
	dots = true,
	arrows = true,
}: ISlider = {}): void {
	console.log(container, numberOfSlides, speed, direction, dots, arrows);
}

createSlider();



// type Modifier = {
// 	[K in keyof ISlider]: K extends "speed" ? number: ISlider[K]
// }
// type CustomSlider = Required<Omit<Modifier, "animationName">>;

type Modifier = {
	[K in keyof ISlider]-?: K extends "speed" ? number: ISlider[K]
}
type CustomSlider = Omit<Modifier, "animationName">;

// Все поля обязательны для заполнения
const customSliderOptions: CustomSlider = {
	container: "id",
	numberOfSlides: 4,
	speed: 1100,
	direction: "horizontal",
	dots: true,
	arrows: true,
};

function createCustomSlider(options: CustomSlider): void {
	if ("container" in options) {
		console.log(options);
	}
}

createCustomSlider(customSliderOptions);