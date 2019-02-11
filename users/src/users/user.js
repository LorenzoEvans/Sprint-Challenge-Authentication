import React from 'react';
import axios from 'axios';


class Users extends React.Component {
 state = {
  users: []
 }
 render(){
  return(
   <>
   <h2>User-List</h2>
   {this.state.users.map(user => <li key={user.id}>
    {user.username}
   </li>)}
   </>
  )
 }

 async componentDidMount() {
  const endpoint = process.env.REACT_APP_API_URL
  
  try {
   const response = await axios.get(endpoint)
   this.setState({users: response.data})
  }
   catch (error){
    console.error('Error grabbing users from API.')
   }
 }
}

export default Users