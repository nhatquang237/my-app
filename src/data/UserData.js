import axios from '../api/axios'

const registerUrl = '/register'
const checkUrl = '/check'
const loginUrl = '/login'

// Function to send updated data back to backend to save in database
export async function addUser(newUser) {
  try {
    const response = await axios.post(registerUrl, newUser);
    return response
  } catch (error) {
    throw error;
  }
}


export async function checkEmail(email) {
  try {
    // Check if email existed in database
    const response = await axios.post(checkUrl, {'email': email});
    return response.data
  } catch (error) {
    throw error;
  }
}


export async function getUser(user) {
  try {
    const response = await axios.post(loginUrl, user);
    return response
  } catch (error) {
    throw error;
  }
}

