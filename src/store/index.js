import {createStore} from "vuex";
import axios from "@/utils/axois.js";

let userId = localStorage.getItem('userId');

export default createStore({
    state(){
        return{
            tasks: [],
            boards: [],
            accountExists: false,

        }
    },
    getters:{
        tasks(state){
            return state.tasks
        },
        boards(state){
            return state.boards
        },
        accountExists: state => state.accountExists,
    },
    mutations:{
        setTasks(state, tasksData){
            state.tasks = tasksData
        },
        setBoards(state, boardsData){
            state.boards = boardsData
        },
        setAccountExists(state, value) {
            state.accountExists = value
        },

    },

    actions:{


        signIn({commit}, formData){
            return axios.post('/auth/signin', formData)
                .then((res)=>{
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('userId', res.data.userId)

                    console.log(res)
                    console.log(res.data.token)
                    console.log(res.data.userId)

                    commit("setAccountExists", false)
                    // return res
                }).catch((err)=>{
                    console.log(err)
                    if (err.response && err.response.status === 400) {
                        const errorData = err.response.data;
                        if (errorData.type === 'BadRequest' && errorData.cause === 'Неверный логин или пароль') {
                            console.log('Неверный логин или пароль')
                            commit("setAccountExists", true)
                            console.log(this.accountExists)
                        }else {
                            throw err;
                        }
                    } else {
                        throw err;
                    }
                })

        },

        getBoards({commit}){

            console.log(userId);

            return axios.get(`/user/${userId}/boards`, )
                .then((res) =>{
                    console.log(res)

                    commit('setBoards', res.data)
                    console.log('setBoards', res.data)

                }).catch((err) =>{
                    console.log(err)
                })
        },


        getTasks({commit}) {
            let id = localStorage.getItem('id');

            console.log('id', id, '/','userId', userId);

            return axios.get(`/boards/${id}/tasks`)
                .then((res) => {
                    console.log(res)
                    commit('setTasks', res.data)
                }).catch((err) => {
                    console.log(err)
                })
        },


        signUp({commit}, formData) {
            return axios.put('/auth/signup', formData)
                .then((res) => {
                    console.log(res)
                    commit("setAccountExists", false)
                    return res
                }).catch((err) => {
                    console.log(err)
                    if (err.response && err.response.status === 400) {
                        const errorData = err.response.data;
                        if (errorData.type === 'BadRequest' && errorData.cause === 'Почта уже существует') {
                            console.log('такой аккаунт уже есть')
                            commit("setAccountExists", true)
                        }else if (errorData.type === 'BadRequest' && errorData.cause === 'Не соблюдено минимальное кол-во символов поля Имя') {
                            console.log('Не соблюдено минимальное кол-во символов поля Имя')
                            commit("setAccountExists", true)
                        }else {
                            throw err;
                        }
                    } else {
                        throw err;
                    }
                })
        },
    },
});