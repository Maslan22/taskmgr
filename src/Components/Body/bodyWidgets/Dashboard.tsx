import { Events } from '../../../data'

const Dashboard = () => {
  return (
    <div>
        {
        Events.map((event: any) => {
            return(
            <div className='mt-3'>
                <h1>{event.id}</h1>
                <p>{event.name}</p>
                <p>{event.attendants}</p>
                <p>{event.date}</p>
            </div>)
        })
    }
    </div>
  )
}

export default Dashboard