enum TransferStatus {
	Pending = "pending",
	Rejected = "rejected",
	Completed = "completed",
}

enum ErrorMessages {
	NotFound = "Not found: 404",
	NotEnoughSpace = "Not enough space: 507",
	Forbidden = "Forbidden: 403",
}

interface ITransfer {
	path: string;
	data: string[];
	date?: Date;
	start: (p: string, d: string[]) => string;
	stop: (reason: string) => string;
}

interface TransferError {
	message: ErrorMessages;
}

interface ISataus {
    pending: string;
    rejected: string;
    completed: string;
}

const checkStatus = {
    pending: TransferStatus.Pending,
    rejected: TransferStatus.Rejected,
    completed: TransferStatus.Completed

}

// Класс должен имплементировать ITransfer и TransferError
class SingleFileTransfer implements ITransfer, TransferError {
    path!: string;
	data!: string[];
	date?: Date;
    message!: ErrorMessages;
    status!: ISataus

    constructor(status: ISataus) {
        this.status = status;
    }

    start = (p: string, d?: string[]): string => {
        this.path = p;
        return `${this.path}: ${d}`
    }


    stop = (msg: string): string => {
        this.date = new Date()
        return `${msg}, error-time: ${this.date.toLocaleTimeString()}`
    }

    createCustomError = (status: string, url: unknown, errorMsg: ErrorMessages): string => {
        return `Status-${status} is happened due to data:${url},  server-message:${errorMsg}`
    }

    checkTransferStatus(url?: string[]) {
        const msg: string = "Server sending data";
        console.log(this.start(msg, url));

        if(!url) {
           console.log(this.stop("Expected one argument"));
           console.log(this.createCustomError(this.status.rejected, url, ErrorMessages.NotFound));
        }else {

            const req = new Promise<unknown>((resolve, reject): void => {
                setTimeout(() => {
                    console.log(`Status: ${this.status.pending}`);
                    resolve(url);                
                },2000);
            });

            req.then((data) => {
    
                return new Promise<unknown>((resolve, reject) => {
                    setTimeout(() => {
                        if(Array.isArray(data)) {
                            this.data = data;
                            resolve(this.data[0]);
                            // reject();
                        }
                    }, 1000)
                });
            })
            .then((res) => {
                console.log(`status: ${this.status.completed}, Result: ${res}`);
            })
            .catch(() => {
                console.log(this.status.rejected);
                
            });
    
        }
    }



}

const transfer = new SingleFileTransfer(checkStatus);
transfer.checkTransferStatus(["some data"]);



// Место для реализаций

    // Необходимо создать метод checkTransferStatus, проверяющий состояние передачи данных
    // Можно вывести в консоль данные, можно вернуть строку

    // Необходимо создать метод, который будет останавливать передачу данных
    // И возвращать строку с причиной и датой остановки (Дата в любом формате)

    // Необходимо создать метод, который будет возвращать строку, содержащую
    // Статус передачи и любое сообщение об ошибке. На ваш выбор или отталкиваться от приходящего аргумента
    // Метод может показаться странным, но может использоваться для тестов, например