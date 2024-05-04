export const Users = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: "johndoe@gmail.com",
        password: "asdfghjkl",
        isAdmin: false
    },

    {
        id: 2,
        firstName: 'Luke',
        lastName: 'Skywalker',
        email: "lukeSkywalker@gmail.com",
        password: "qwertyuiop",
        isAdmin: true
    }
];

export const Events = [
    {
        id: 1,
        name: 'Event 1',
        attendants: 'John Doe,Luke Skywalker',
        description: 'This is a description',
        date: "2021-08-01",
    },

    {
        id: 2,
        name: 'Event 2',
        attendants: 'John Doe,Luke Skywalker',
        description: 'This is another description',
        date: "2021-08-01",
    }
]


export const addUser = ( user: any) => {
    Users.push(user);
}
export const addEvent = ( event: any) => {
    Events.push(event);
}
export const modifyEvent = (event: any) => {
    Events.forEach((e: any) => {
        if(e.id === event.id){
            e = event;
        }
    });
}
