import  axios from "axios"



const myAxiosInstance = axios.create(
  {
    baseURL: "http://localhost:8080/api/",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
  }
);

//request intercepter :
myAxiosInstance.interceptors.request.use(
    config => { return config },
    error => { return Promise.reject(error) }
);

// response intercepter :
myAxiosInstance.interceptors.response.use(
    response => { return response },
    error => { return Promise.reject(error) }
);


export default  myAxiosInstance;
