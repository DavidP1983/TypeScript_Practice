import "reflect-metadata";

interface ICuboid {
    width: number;
    length: number;
    height: number;
    calcArea: (multiply?: number) => number;
    calcVolume: (multiply?: number) => number;
}


@containerCreatedData(new Date())
class ShippingContainer implements ICuboid {
    @IsInt()
    @Min(1)
    width: number;

    @IsInt()
    @Min(1)
    length: number;

    @IsInt()
    @Min(1)
    @Max(8)
    height: number;
    // lastCalculation: any;


    constructor(width: number, length: number, height: number) {
        this.width = width;
        this.length = length;
        this.height = height;

        const prArr = [{ property: "width", value: this.width }, { property: "length", value: this.length }, { property: "height", value: this.height }];
        prArr.forEach((item) => {
            validateData(this, item.property, item.value);
        });
    }

    @checkMethodCalc()
    calcArea(multiply?: number): number {
        return this.width * this.length * (multiply ? multiply : 1);
    }

    @checkMethodCalc()
    calcVolume(multiply?: number) {
        return this.width * this.length * this.height * (multiply ? multiply : 1);
    }
}

// type ShippingContainerData = {
//     lastCalculation: string;
//     createdAt: Date;
// };

// const container = new ShippingContainer(10, 100, 7) as ICuboid & ShippingContainerData;

const container = new ShippingContainer(10, 100, 10);
console.log(container);
container.width = 0;
container.height = 5;

// console.log(container.calcArea());
// console.log(container);
// console.log(container.calcVolume());
// console.log(container);

propertyValidation(container);


// Method's decarator
function checkMethodCalc() {
    return (target: Object, propertyKey: string | symbol, description: PropertyDescriptor): PropertyDescriptor | void => {
        let symbol = Symbol('lastCalculation');
        const oldMethod = description.value;

        description.value = function (this: any) {
            this[symbol] = `Последний подсчет ${propertyKey.toString()} был ${this.createdAt}`;
            return oldMethod.apply(this);
        }

    }

}

// Class's decarator
function containerCreatedData(data: Date) {
    return function <T extends { new(...args: any[]): {} }>(target: T) {
        return class extends target {
            createdAt = data.toDateString();
        }
    }
}

// Property decarator
function IsInt() {
    return function (target: any, propertyKey: string | symbol) {
        Reflect.defineMetadata("IsInt", true, target, propertyKey);

    }
}


function Min(limit: number) {
    return function (target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata("Min", limit, target, propertyKey);
    }
}



function Max(limit: number) {
    return function (target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata("Max", limit, target, propertyKey);
    }
}



// Constructor property validation
function validateData(target: Object, propertyKey: string, val: any) {

    if (Reflect.getMetadata("IsInt", target, propertyKey) && (!Number.isInteger(val) || val !== parseInt(val))) {
        throw new Error(`Св-во - ${propertyKey} не целое число`);
    }

    if (Reflect.hasMetadata("Min", target, propertyKey) && val < Reflect.getMetadata("Min", target, propertyKey)) {
        throw new Error(`Св-во - ${propertyKey} должно быть больше ${Reflect.getMetadata("Min", target, propertyKey)}`);
    }

    if (Reflect.hasMetadata("Max", target, propertyKey) && val > Reflect.getMetadata("Max", target, propertyKey)) {
        throw new Error(`Св-во - ${propertyKey} должно быть меньше ${Reflect.getMetadata("Max", target, propertyKey)}`);
    }
}

// Property validation
function propertyValidation(obj: unknown) {
    if (typeof obj === "object" && obj && !Array.isArray(obj)) {
        for (let keys in obj) {
            validateData(obj, keys, obj[keys as keyof typeof obj]);
        }
    }
}


