import axios from 'axios'

const baseurl = 'http://127.0.0.1:8000/api/'

const menu = {
    state: () => ({
        token: '',
        response: '',
        responseWithToken: '',
    }),
    mutations: {
        setTokenVal(state, value) {
            state.token = value
        },
        setRespVal(state, value) {
            state.response = value
        },
        setTWTVal(state, value) {
            state.responseWithToken = value
        }
    },
    actions: {
        reqToken ({commit}) {
            axios({
                method: 'POST', 
                url: baseurl + 'sanctum/token',
                data: {
                    uname: 'admin',
                    pword: '12345678',
                }
            })
              .then(function (response) {
                commit('setTokenVal', response.data)
                commit('setRespVal', response.status)
                localStorage.setItem('token', response.data)
            })
             .catch(function (error) {
                console.log(error.message)
            });
        },
        sendRequestwithToken({commit}) {
            axios({
                method: 'GET',
                url: baseurl + 'customer/checkCoupon/GO2018', 
                headers: {
                    Accepted: 'appication/json', 
                    'Content-Type': 'application/json', 
                    'Authorization': 'Bearer ' + localStorage.getItem('token') ?? 'lol',
                }
            })
              .then(function (response) {
                commit('setTWTVal', response.data, 'TWTtoken')
                commit('setRespVal', response.status, 'response')
            })
             .catch(function (error) {
                console.log(error.message)
            });
        }
    },
    getters: {
        
    },
}

export default menu
