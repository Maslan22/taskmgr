import React, { useEffect } from 'react'
import RootLayout from '../MainLayout';
import Table from '../../Components/Layouts/Table';
import { AxiosDelete, AxiosGet } from '../../Components/crud';
import { useNavigate } from 'react-router-dom';

interface UsersStates {
    users: any
}
function Users() {
    const navigate = useNavigate();
    const [states, setStates] = React.useState<UsersStates>({
        users: []
    });
    const headers = [  
        {
            id: 0,
            name: "No."
        },
        {
            id: 1,
            name: "First Name"
        },
        {
            id: 5,
            name: "Last Name"
        },
        {
            id: 2,
            name: "Email"
        }, 
        {
            id: 4,
            name: "Actions"
        }
    ]
    const deleteUser = async (user: any) => { 
          try {
            const deleteRes = await AxiosDelete(`users/${user}`);
            if (deleteRes) {
              const users = states.users.filter((u: any) => u.id !== user);
              updateStates("users", users);
            } else {
              throw new Error("Something went wrong!");
            }
          } catch (error) {
            console.error(error);
          }
       
    }

    const updateStates = (key: string, value: any) => {
        setStates({
          ...states,
          [key]: value,
        });
      };
      const createClick = () => {
        navigate('/users/create');
      }
    useEffect(() => {
        const getUsers = async () => {
            try { 
                const usersRes = await AxiosGet("users"); 
                if (usersRes.length > 0) {
                  updateStates("users", usersRes); 
                }else{
                  throw new Error("Something went wrong!");
                }
                }catch (error) {
                  console.error(error);
                }
        }
        getUsers();
    },[]);
  return ( 
        <RootLayout>
            <div className='w-4/5 text-center'>
            <Table createClick={createClick} editUrl="/users" deleteHandler={(e: number) => deleteUser(e)} headers={headers} data={states.users.filter((user : any) => {
                delete user.isadmin; 
                return user;
            })}/>
            </div>
        </RootLayout> 
  )
}



export default Users