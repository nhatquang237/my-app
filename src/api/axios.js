import axios from "axios";

export default axios.create({
    baseURL: 'http://localhost:3001'
})

// Note to check: What export default really do in this context?
