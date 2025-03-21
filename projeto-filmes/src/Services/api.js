import axios from 'axios';

//BASE DA URL: https://api.themoviedb.org/3/
//URL:https://api.themoviedb.org/3/movie/550?api_key=c9b359a8a23e20dceea61099b3a94bd1

const api = axios.create({baseURL:'https://api.themoviedb.org/3/'})

export default api;