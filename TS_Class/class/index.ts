interface Queue<T> {
	enqueue(item: T): void; // поставить в очередь
	dequeue(): T | undefined; // исключить из очереди
	peek(): T | undefined | null; // посмотреть первый элемент
	isEmpty(): boolean; // проверка на "пустоту" сущности
	length(): number; // проверка на длину
}

// Реализация очереди через массив
// Класс ArrayQueue должен имплементировать интерфейс Queue
// Класс может работать с любым типом данных, то есть помещать любые данные в массив  <-- Важно


class ArrayQueue<T> implements Queue<T> {
    private queue: T[] = [];

    enqueue(item: T): void {
            this.queue.push(item);
            return console.log(this.queue);
    }
    dequeue(): T | undefined {
            if(this.isEmpty()) {
                return this.queue.shift() as T; // delete first element and return type as typeof T(number | string)
            }else {
                throw new Error("Queue Underflow");
            }
          
    }
    peek(): T | null | undefined {
            if(this.isEmpty()) {
                return this.queue[0];
            }else {
                return null;
            }
            
    }
    isEmpty(): boolean {
        return this.length() ? true : false;
        // if(this instanceof ArrayQueue) {
        //     return true
        // }else {
        //     throw new Error("Method not implemented.");
        // }
    }
    length(): number {
       return this.queue.length;
           
    }
 
	// Создать приватное свойство queue, которое по умолчанию массив и содержит массив любого типа
	// Подсказка по методам:
	// при добавлении в очередь можно выполнить метод push
	// при удалении - shift, так как нужно удалить первый элемент.
	// Обратите внимание на возвращаемое значение
	// isEmpty может использоваться в других методах
}

// Стэк - это еще одна структура данных. Проще всего её представить как стопку листов на столе
// Последний, который вы положите сверху, вы и первым потом возьмете.
// Чуть подробнее можно найти в википедии или на других сайтах по поиску "Стэк структура данных"
// Класс Stack содержит другие методы, так что ничего имплементировать не нужно
// Класс может работать с любым типом данных, то есть помещать любые данные в массив и содержит массив любого типа  <-- Важно

class Stack<T> {
    private stack: T[] = [];
    private limit: number;
	// Создать приватное свойство stack, которое по умолчанию массив и содержит массив любого типа
	// Создать приватное свойство limit, которое будет типом number

	// Здесь мы установим лимит на стопку листов.
	// При переполнении стэка программа зависает, а очень высокая стопка листов падает
	// Так что лимит всегда должен быть
	constructor(limit: number = Number.MAX_VALUE) {
		this.limit = limit;
	}

	push(value: T) {
        if(this.length() > this.limit) {
            throw new Error("Process as Infinity");
        }else {
            this.stack.push(value);
            return console.log(this.stack);
        }
		// Добавляет элемент в стэк
		// Если стэк переполнен - выбрасывает ошибку (throw new Error)
	}

	pop() {
        if(this.isEmpty()) {
            return this.stack.pop() as T;
        }else {
            throw new Error("Stack isEmpty");
        }
		// Удаляет последний элемент массива
		// Если в стеке пусто - выбрасывает ошибку (throw new Error)
		// При удалении элемента возвращает его
		// Простыми словами: вы берете верхний лист в стопке и используете его
		// Если на столе нет листов - получается ошибка, брать нечего
	}

	length(): number {
        console.log(this.stack.length);
        return this.stack.length;
		// Возвращает кол-во элементов в стэке
	}

	isEmpty(): boolean {
        return this.length() ? true : false; 
		// Проверяет стэк на "пустоту"
	}

	top() {
        if(this.isEmpty()) {
           return this.stack.slice(-1)[0] as T;
        }else {
           return null;
        }
		// Возвращает последний (верхний) элемент стэка, но не удаляет его
		// Вы просто читаете, что написано на верхнем листе
		// Если стэк пуст - вернется null
	}
}

// Для тестов

const arrTest1 = new ArrayQueue<number>();
arrTest1.enqueue(5);
arrTest1.enqueue(10);
console.log(arrTest1.peek());
console.log(arrTest1.dequeue());
console.log(arrTest1.length());

const arrTest2 = new ArrayQueue<string>();
arrTest2.enqueue("5");
arrTest2.enqueue("10");
console.log(arrTest2.peek());
console.log(arrTest2.dequeue());
console.log(arrTest2.length());

const stackTest1 = new Stack<number>(10);
stackTest1.push(20);
stackTest1.push(50);
console.log(stackTest1.top());
console.log(stackTest1.pop());
console.log(stackTest1.length());

const stackTest2 = new Stack<string>(10);
stackTest2.push("20");
stackTest2.push("50");
console.log(stackTest2.top());
console.log(stackTest2.pop());
console.log(stackTest2.length());
