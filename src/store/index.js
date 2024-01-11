import {createStore} from "vuex";
import axios from "@/utils/axois.js";

let userId = localStorage.getItem('userId');

export default createStore({
    state(){
        return{
            tasks: [],
            boards: [],
        }
    },
    getters:{
        tasks(state){
            return state.tasks
        },
        boards(state){
            return state.boards
        }
    },
    mutations:{
        setTasks(state, tasksData){
            state.tasks = tasksData
        },
        setBoards(state, boardsData){
            state.boards = boardsData
        }
    },

    actions:{
        signIn(_, formData){
            return axios.post('/auth/signin', formData)
                .then((res)=>{
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('userId', res.data.userId)

                    console.log(res)
                    console.log(res.data.token)
                    console.log(res.data.userId)

                }).catch((err)=>{
                    console.log(err)
                })

        },

        getBoards({commit}){
            let userId = localStorage.getItem('userId');
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


        // openBoard(_, formData){
        //     return axios.get(`/user/${userId}/boards`)
        //         .then((res) => {
        //             localStorage.setItem('id', res.data.array.id)
        //
        //             console.log(res)
        //             console.log(res.data.array.id)
        //         }).catch((err) =>{
        //             console.log(err)
        //         })
        // },

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

        signUp(_, formData){
            return  axios.post('auth/signup', formData)
                .then((res) => {
                    console.log(res)
                }).catch((err) =>{
                    console.log(err)
                })
        },



    },
});