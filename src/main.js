import { createApp } from 'vue'
import App from './App.vue'

import './styles/app.css'
import axios from 'axios'

let axiosInstance = axios.create({
  baseURL: 'https://findfalcone.herokuapp.com/',
  timeout: 1000,
  headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
});

const app = createApp(App)
app.provide('axios', axiosInstance)
app.mount('#app')
