import axios from '../api/axios'

const signUpUrl = '/signup'
const checkUrl = '/verification'
const loginUrl = '/login'
const authenticateUrl = '/authenticate'

// Function to send updated data back to backend to save in database
export async function addUser(newUser) {
  try {
    const response = await axios.post(signUpUrl, newUser);
    return response
  } catch (error) {
    throw error;
  }
}


export async function checkEmail(email) {
  try {
    // Check if email existed in database
    const response = await axios.post(checkUrl, {'username': email});
    return response.data
  } catch (error) {
    throw error;
  }
}

export async function authenticate(email) {
  try {
    // Check if email existed in database
    const response = await axios.post(authenticateUrl, {'email': email});
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

