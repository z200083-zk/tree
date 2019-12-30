import axios from 'axios'

const http = axios.create({
    baseURL: 'http://127.0.0.1:20083'
});

export const getIsRegister = (name) => {
    return http.get(`/getData/name=${name}`)
}
export const loginUser = (data) => {
    return http.post('/login', data)
}
export const registerUser = ({ userName, password, email }) => {
    return http.post('/register', { userName, password, email })
}
export const getMusic = (id) => {
    return http.get(`/song/url?id=${id}`)
}
export const getMusicUrl = (id) => {
    return http.get(`/album?id=${id}`)
}