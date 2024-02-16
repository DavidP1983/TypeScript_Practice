
// Exercise:

//     Implement swap which receives 2 persons and returns them in
//     the reverse order. The function itself is already
//     there, actually. We just need to provide it with proper types.
//     Also this function shouldn't necessarily be limited to just
//     Person types, lets type it so that it works with any two types
//     specified.




interface User {
    type: 'user';
    name: string;
    age: number;
    occupation: string;
}

interface Admin {
    type: 'admin';
    name: string;
    age: number;
    role: string;
}

const admins: Admin[] = [
    {
        type: 'admin',
        name: 'Will Bruces',
        age: 30,
        role: 'Overseer'
    },
    {
        type: 'admin',
        name: 'Steve',
        age: 40,
        role: 'Steve'
    }
];

const users: User[] = [
    {
        type: 'user',
        name: 'Moses',
        age: 70,
        occupation: 'Desert guide'
    },
    {
        type: 'user',
        name: 'Superman',
        age: 28,
        occupation: 'Ordinary person'
    }
];



type Person = User | Admin;

// type UserOrAdmin<T extends "admin" | "user" | number | string> = T extends "user" ? User : T extends "admin" ? Admin : T extends number ? number: string;
// export function swap<T extends UserOrAdmin<Person["type"]> | string | number, S extends UserOrAdmin<Person["type"]> | string | number>(v1: T, v2: S)
// :[S, T]{
//     return [v2, v1];
// }

// export function swap<T extends any,  S extends any>(v1: T, v2: S)
// :[S, T]{
//     return [v2, v1];
// }

// export function swap<T,  S>(v1: T, v2: S)
// :[S, T]{
//     return [v2, v1];
// }



type UserOrAdmin<T extends "admin" | "user" | any> = T extends "user" ? User : T extends "admin" ? Admin : any;
export function swap<T extends UserOrAdmin<Person["type"]> | any, S extends UserOrAdmin<Person["type"]> | any>(v1: T, v2: S):[S, T]{
    return [v2, v1];
}



function logUser(user: User) {
    const pos = users.indexOf(user) + 1;
    console.log(` - #${pos} User: ${user.name}, ${user.age}, ${user.occupation}`);
}

function logAdmin(admin: Admin) {
    const pos = admins.indexOf(admin) + 1;
    console.log(` - #${pos} Admin: ${admin.name}, ${admin.age}, ${admin.role}`);
}


function test1() {
    console.log('test1:');
    const [secondUser, firstAdmin] = swap(admins[0], users[1]);
    logUser(secondUser);
    logAdmin(firstAdmin);
}

function test2() {
    console.log('test2:');
    const [secondAdmin, firstUser] = swap(users[0], admins[1]);
    logAdmin(secondAdmin);
    logUser(firstUser);
}

function test3() {
    console.log('test3:');
    const [secondUser, firstUser] = swap(users[0], users[1]);
    logUser(secondUser);
    logUser(firstUser);
}

function test4() {
    console.log('test4:');
    const [firstAdmin, secondAdmin] = swap(admins[1], admins[0]);
    logAdmin(firstAdmin);
    logAdmin(secondAdmin);
}

function test5() {
    console.log('test5:');
    const [stringValue, numericValue] = swap(123, 'Hello World');
    console.log(` - String: ${stringValue}`);
    console.log(` - Numeric: ${numericValue}`);
}

[test1, test2, test3, test4, test5].forEach((test) => test());
