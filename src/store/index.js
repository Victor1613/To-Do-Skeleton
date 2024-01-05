import {createStore} from "vuex";
import axios from "@/utils/axois.js";

export default createStore({
    state(){
        return{
            tasks: [],
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
                    console.log(res)
                }).catch((err)=>{
                    console.log(err)
                })

        },

        getTasks({commit}) {
            return axios.get('boards/27/tasks')
                .then((res) => {
                    console.log(res)
                    commit('settasks', res.data)
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

        // getBoards(formData, ){
        //     return axios.get(`/api/v1/user/${bord_id}/boards`)
        //         .then((res) =>{
        //             console.log(res)
        //
        //         }).catch((err) =>{
        //             console.log(err)
        //         })
        // },
        //
        // getUserId(){
        //     return axios.get()
        //         .then((res)=>{
        //
        //         }).catch((err) =>{
        //             console.log(err)
        //         })
        // }

    },
});