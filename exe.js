// 1.Exe vatiables type
var currRate = "1.05";
var fetchCurr = function (response) {
    try {
        var data = JSON.parse(response);
        return data;
    }
    catch (e) {
        throw (e);
    }
};
function transferEurToUsd(available, amount, commission) {
    if (available) {
        var res = fetchCurr(currRate) * amount * commission;
        console.log(res);
        // Или запись в элемент на странице вместо консоли
    }
    else {
        console.log("Сейчас обмен недоступен");
    }
}
transferEurToUsd(true, 500, 1.05);
// 2.Exe object and array
var electricityUserData = {
    readings: 95,
    units: "kWt",
    mode: "double",
};
var waterUserData = {
    readings: 3,
    units: "m3",
};
var elRate = 0.45;
var wRate = 2;
var monthPayments = [0, 0]; // [electricity, water]
var calculatePayments = function (_a, wData, elRate, wRate) {
    var readings = _a.readings, mode = _a.mode;
    if (mode === "double" && readings < 50) {
        monthPayments[0] = readings * elRate * 0.7;
    }
    else {
        monthPayments[0] = readings * elRate;
    }
    monthPayments[1] = wData.readings * wRate;
};
calculatePayments(electricityUserData, waterUserData, elRate, wRate);
var sendInvoice = function (_a, _b, waterUserData) {
    var electricity = _a[0], water = _a[1];
    var readings = _b.readings, units = _b.units;
    var text = "    Hello!\n    This month you used ".concat(readings, " ").concat(units, " of electricity\n    It will cost: ").concat(electricity, "\u20AC\n    \n    This month you used ").concat(waterUserData.readings, " ").concat(waterUserData.units, " of water\n    It will cost: ").concat(water, "\u20AC");
    return text;
};
console.log(sendInvoice(monthPayments, electricityUserData, waterUserData));
// главный объект со всеми данными, должен подходить под формат TotalWarehouse
var totalData = {
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
function printReport(data) {
    var emptyValue = Object.entries(data)
        .filter(function (item) { return item[1] === 'empty'; })
        .map(function (item) { return item[0]; });
    if (emptyValue.length > 0) {
        return "We need this items: ".concat(emptyValue.join(", "));
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
