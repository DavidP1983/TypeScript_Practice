var formData = {
    email: "",
    title: "",
    text: "",
    checkbox: false,
};
var form = document.querySelectorAll('form');
var checkbox = document.querySelector('[type="checkbox"]');
try {
    if (form.length !== 2) {
        throw new Error("error");
    }
    form.forEach(function (item) {
        sendForm(item);
    });
}
catch (e) {
    if (e instanceof Error) {
        console.log(e.message);
    }
    else if (typeof e === 'string') {
        console.log(e);
    }
}
function sendForm(form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var data = new FormData(form);
        data.forEach(function (value, key) {
            if (checkbox.checked && key === 'checkbox') {
                formData[key] = !!value;
            }
            else {
                formData[key] = value;
            }
        });
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
function isValid(data) {
    return Object.values(data).every(function (item) { return item; });
}
function validateFormData(data) {
    // Если каждое из свойств объекта data правдиво...
    if (isValid(data)) {
        checkFormData(data);
        return true;
    }
    else {
        console.log("Please, complete all fields");
        return false;
    }
}
function isSimalerEmail(email, array) {
    if (typeof email === "string") {
        return array.some(function (item) { return item === email; });
    }
    else {
        return false;
    }
}
function checkFormData(data) {
    var email = data.email;
    var emails = ["example@gmail.com", "example@ex.com", "admin@gmail.com"];
    // Если email совпадает хотя бы с одним из массива
    if (isSimalerEmail(email, emails)) {
        console.log("This email is already exist");
    }
    else {
        console.log("Posting data...");
    }
}
