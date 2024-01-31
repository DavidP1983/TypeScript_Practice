
// 1. Exercise:
// Given the data, define the interface "User" and use it accordingly.

interface User {
    name: string;
    age: number;
    occupation: string;
}

const users: User[] = [
    {
        name: 'Max Mustermann',
        age: 25,
        occupation: 'Chimney sweep'
    },
    {
        name: 'Kate Müller',
        age: 23,
        occupation: 'Astronaut'
    }
];

function logPerson(user: User) {
    console.log(` - ${user.name}, ${user.age}`);
}






// 2. Exercise:
//     Type "Person" is missing, please define it and use
//     it in persons array and logPerson function in order to fix
//     all the TS errors.



interface User1 {
    name: string;
    age: number;
    occupation: string;
}

interface Admin1 {
    name: string;
    age: number;
    role: string;
}


type Person = User1 | Admin1;

const persons: Person[] = [
    {
        name: 'Max Mustermann',
        age: 25,
        occupation: 'Chimney sweep'
    },
    {
        name: 'Jane Doe',
        age: 32,
        role: 'Administrator'
    },
    {
        name: 'Kate Müller',
        age: 23,
        occupation: 'Astronaut'
    },
    {
        name: 'Bruce Willis',
        age: 64,
        role: 'World saver'
    }
];

function logPerson1(person: Person) {
    console.log(` - ${person.name}, ${person.age}`);
}




// 3. Exercise:
//     Fix type errors in logPerson function.
//     logPerson function should accept both User and Admin
//     and should output relevant information according to
//     the input: occupation for User and role for Admin.


interface User2 {
    name: string;
    age: number;
    occupation: string;
}

interface Admin2 {
    name: string;
    age: number;
    role: string;
}

type Person1 = User2 | Admin2;

const persons1: Person1[] = [
    {
        name: 'Max Mustermann',
        age: 25,
        occupation: 'Chimney sweep'
    },
    {
        name: 'Jane Doe',
        age: 32,
        role: 'Administrator'
    },
    {
        name: 'Kate Müller',
        age: 23,
        occupation: 'Astronaut'
    },
    {
        name: 'Bruce Willis',
        age: 64,
        role: 'World saver'
    }
];

 function logPerson2(person: Person1) {
    let additionalInformation: string;
    if ("role" in person) {
        additionalInformation = person.role;
    } else {
        additionalInformation = person.occupation;
    }
    console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}

// --- or with Type_Guard--- //

// function isRole(role: Person): role is Admin {
//     return (role as Admin).role !== undefined;
// }

// export function logPerson(person: Person) {
//     let additionalInformation: string;
//     if (isRole(person)) {
//         additionalInformation = person.role;
//     } else {
//         additionalInformation = person.occupation;
//     }
//     console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
// }

// persons.forEach(logPerson);




// 4. Exercise:
//     Figure out how to help TypeScript understand types in
//     this situation and apply necessary fixes.
// 


// interface User3 {
//     type: 'user';
//     name: string;
//     age: number;
//     occupation: string;
// }

// interface Admin3 {
//     type: 'admin';
//     name: string;
//     age: number;
//     role: string;
// }

//  type Person2 = User3 | Admin3;


//  function isAdmin(person: Person2): person is Admin3 {
//     return (person as Admin3).type === 'admin';
// }

//  function isUser(person: Person2): person is User3 {
//     return(person as User3).type === 'user';
// }

//  function logPerson3(person: Person2) {
//     let additionalInformation: string = '';
//     if (isAdmin(person)) {
//         additionalInformation = person.role;
//     }
//     else if (isUser(person)) {
//         additionalInformation = person.occupation;
//     }
//         console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
    
// }


// --- or with enum--- //

// enum UseType {
//     USER = 'user',
//     ADMIN = 'admin'
// }

// interface User3 {
//     type: UseType.USER;
//     name: string;
//     age: number;
//     occupation: string;
// }

// interface Admin3 {
//     type: UseType.ADMIN;
//     name: string;
//     age: number;
//     role: string;
// }

// export type Person2 = User3 | Admin3;


// export function isAdmin(person: Person2): person is Admin3 {
//     return (person as Admin3).type === UseType.ADMIN;
// }

// export function isUser(person: Person2): person is User3 {
//     return(person as User3).type === UseType.USER;
// }

// export function logPerson3(person: Person2) {
//     let additionalInformation: string = '';
//     if (isAdmin(person)) {
//         additionalInformation = person.role;
//     }
//     else if (isUser(person)) {
//         additionalInformation = person.occupation;
//     }
//         console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
    
// }


// --- or with swith/case--- //

interface User3 {
    type: 'user';
    name: string;
    age: number;
    occupation: string;
}

interface Admin3 {
    type: 'admin';
    name: string;
    age: number;
    role: string;
}

export type Person3 = User3 | Admin3;

function logPerson3(person: Person3) {
    let additionalInformation: string = '';
    switch(person.type) {
        case "admin": 
            additionalInformation = person.role;
        break;
        case "user":
            additionalInformation = person.occupation;
        break;
        default:
            const smth: never = person;
    }
}


