import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/discover/movie?api_key=07f5d27cb33b67a8693ae27c5a9a8d64&language=en-US'
})

export default instance
