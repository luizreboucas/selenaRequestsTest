import axios from 'axios'
import { useState } from 'react'

function App() {

  const URI = 'https://myselena.org'
  const [user, setUser] = useState({
    username: 'luizreboucas',
    password: 'Luig&1010'
  })
  const [page, setPage] = useState(1)
  const [token, setToken] = useState('')
  const [courses, setCourses] = useState([])
  
  const getToken = async() => {
    try {
      
      const response = await axios.post(`${URI}/wp-json/learnpress/v1/token`, user)
      const validationStatus = await validateToken(response.data.token)
      if(validationStatus === 200){
        setToken(response.data.token)
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  const validateToken = async(token) => {
    try {
      const response = await axios.post(`${URI}/wp-json/learnpress/v1/token/validate`,{},{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      return response.data.data.status 
    } catch (error) {
      return error
    }
  }

  const getCourses = async(currentToken, page) => {
    try {
      const currentCourses = await axios.get(`${URI}/wp-json/learnpress/v1/courses`,{
        params: {
          page 

        },
        headers: {
          Authorization: `Bearer ${currentToken}`
        }
      })
      setCourses(currentCourses.data)
     
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <h1 onClick={getToken} >teste </h1>
      <p onClick={() => getCourses(token, 1)} >Get Courses</p>
    {courses.map((course)=>{
      return (
        <p key={course.id}>{course.name}</p>
      )
    })}
    <span onClick={() =>{
      setPage(page + 1)
      getCourses(token, page)
    }}>+     </span>
    <span onClick={() =>{
      setPage(page - 1)
      getCourses(token, page)
    }}>-</span>
    </div>
  )
}

export default App
