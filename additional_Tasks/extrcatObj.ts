

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

 type Person = User | Admin;

 const persons5: Person[] = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
    { type: 'user', name: 'Wilson', age: 23, occupation: 'Ball' },
    { type: 'admin', name: 'Agent Smith', age: 23, role: 'Anti-virus engineer' }
];



 function logPerson(person: Person) {
    console.log(
        ` - ${person.name}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation}`
    );
}


const getObjectKeys = <T extends object>(obj: T) => Object.keys(obj) as (keyof T)[];

 function filterPersons(persons: Person[], personType: User["type"], criteria: Partial<Person>): User[];
 function filterPersons(persons: Person[], personType: Admin["type"], criteria: Partial<Person>): Admin[];

 function filterPersons<T extends Person, S extends User["type"] | Admin["type"]>
 (persons: T[], personType: S, criteria: Partial<Person>): T[] {
    return persons
        .filter((person) => person.type === personType)
        .filter((person) => {
            let criteriaKeys = getObjectKeys(criteria);   /* Object.keys(criteria) as (keyof Person)[]; */
            return criteriaKeys.every((fieldName) => {
                return person[fieldName] === criteria[fieldName];
            });
        });
}

 const usersOfAge23 = filterPersons(persons5, 'user', { age: 23 });
const adminsOfAge23 = filterPersons(persons5, 'admin', { age: 23 });

usersOfAge23.forEach(logPerson);
adminsOfAge23.forEach(logPerson);

//
// export function filterPersons(persons: Person[], personType: User['type'], criteria: Partial<Omit<User, 'type'>>): User[];
// export function filterPersons(persons: Person[], personType: Admin['type'], criteria: Partial<Omit<Admin, 'type'>>): Admin[];
// export function filterPersons(persons: Person[], personType: Person['type'], criteria: Partial<Person>): Person[] {
//     return persons
//         .filter((person) => person.type === personType)
//         .filter((person) => {
//             let criteriaKeys = getObjectKeys(criteria);
//             return criteriaKeys.every((fieldName) => {
//                 return person[fieldName] === criteria[fieldName];
//             });
//         });
// }


