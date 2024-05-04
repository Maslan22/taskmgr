import React from 'react'

interface UsersStates {
    users: any
}
function Users() {
    const [states, setStates] = React.useState<UsersStates>({
        users: Users
    });
  return (
    <div>{
        states.users.map((user: any) => {
            return(
                <div key={user.id}>
                    <p>{user.firstName}</p>
                    <p>{user.lastName}</p>
                    <p>{user.email}</p>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            )
        })}
    </div>
  )
}

export default Users