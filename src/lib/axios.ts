import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: `https://rpt.behums.ac.ir/itrpt/api`,
    baseURL: `${process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASEURL : ''}/api`,
    withCredentials: true
});

console.log(process.env.NEXT_PUBLIC_BASEURL);

export function addToken(token: string) {
    if (token) {
        localStorage.addItem('token', token);
        axiosInstance.defaults.headers.common.Authorization = token;
    }
}

export default axiosInstance;
