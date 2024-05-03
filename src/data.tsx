export const Users = [
    {
        id: 1,
        name: 'John Doe',
        email: "johndoe@gmail.com",
        password: "asdfghjkl",
        isAdmin: false
    },

    {
        id: 1,
        name: 'Luke Skywalker',
        email: "lukeSkywalker@gmail.com",
        password: "qwertyuiop",
        isAdmin: true
    }
];

export const Events = [
    {
        id: 1,
        name: 'Event 1',
        attendants: 'John Doe, Luke Skywalker',
        date: "2021-08-01",
    },

    {
        id: 2,
        name: 'Event 1',
        attendants: 'John Doe, Luke Skywalker',
        date: "2021-08-01",
    }
]


export const addUser = ( user: any) => {
    Users.push(user);
}
