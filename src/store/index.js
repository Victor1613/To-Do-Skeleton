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
        addBoard(state, newBoard) {
            state.boards.push(newBoard);
        },
        setAccountExists(state, value) {
            state.accountExists = value
        },

        deleteBoard(state, boardId) {
            state.boards = state.boards.filter(board => board.id !== boardId);
        },
          editBoard(state, editedBoard) {
            const index = state.boards.findIndex(board => board.id === editedBoard.id);
            if (index !== -1) {
                state.boards[index] = editedBoard;
            }
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
        async editBoard({ commit, dispatch }, editedBoardData) {
            try {
                const userId = localStorage.getItem('userId');
                const formData = {
                    name: editedBoardData.name,
                    description: editedBoardData.description,
                };
        
                const requestData = {
                    formData: formData,
                };
        
                const response = await axios.put(`/user/${userId}/boards/${editedBoardData.id}`, requestData);

                commit('editBoard', response.data ?? 'undefined');
                await dispatch('getBoards');
        
            } catch (error) {
                console.error('Ошибка в редактировании доски', error);
                throw error;
            }
        },
        async addBoard({ commit, dispatch }, newBoardData) {
            try {
                const userId = localStorage.getItem('userId');
                const formData = {
                    name: newBoardData.name,
                    description: newBoardData.description,
                };
        
                const requestData = {
                    formData: formData,
                };
        
                const response = await axios.post(`/user/${userId}/boards`, requestData);
                commit('addBoard', response.data);
        
                await dispatch('getBoards');
        
            } catch (error) {
                console.error('Ошибка в создании доски', error);
                throw error;
            }
        },
        async addBoardStatus({ commit, dispatch }, newBoardData) {
            try {

                const formData = {
                    name: newBoardData.name,
                };
        
                const requestData = {
                    formData: formData,
                };
        
                const response = await axios.post(`/boards/${newBoardData.id}/statuses`, requestData);
                commit('addBoardStatus', response.data);
        
                await dispatch('getBoards');
        
            } catch (error) {
                console.error('Ошибка в создании доски', error);
                throw error;
            }
        },
        async deleteBoard({ commit, dispatch }, boardId) {
            try {
                const userId = localStorage.getItem('userId');
        
                await axios.delete(`/user/${userId}/boards/${boardId}`);
        
                commit('deleteBoard', boardId);
        
                await dispatch('getBoards');
        
            } catch (error) {
                console.error('Ошибка при удалении доски', error);
                throw error;
            }
        },
        async addTask({ commit, dispatch }, newTaskData) {
            try {
                const boardId = newTaskData.boardId; 
                const formData = {
                    name: newTaskData.title,
                    description: newTaskData.description,
                    plannedCompletionAt: newTaskData.dueDate,
                    statusId: newTaskData.status,
              
                };
        
                const requestData = {
                    formData: formData,
                };
        
                const response = await axios.post(`/boards/${boardId}/tasks`, requestData);
        
                commit('addTask', response.data);
                await dispatch('getTasks', boardId); 
        
            } catch (error) {
                console.error('Error adding task', error);
                throw error;
            }
        },
        async deleteTask({ commit, dispatch }, TaskInfo) {
            try {

                console.log(TaskInfo)

                await axios.delete(`/boards/${TaskInfo.boardId}/tasks/${TaskInfo.id}`);
        
                commit('deleteTask', TaskInfo.boardId);
        
                await dispatch('getBoards');
                await dispatch('getTasks');
        
            } catch (error) {
                console.error('Ошибка при удалении Задачи', error);
                throw error;
            }
        },
        async editTask({ commit, dispatch }, editedTaskData) {
            console.log(editedTaskData)
            try {

                const formData = {
                    name: editedTaskData.title,
                    description: editedTaskData.description,
                    statusId: editedTaskData.task.statusId,
                    plannedCompletionAt: editedTaskData.dueDate,
                };
        
                const requestData = {
                    formData: formData,
                };
        
                const response = await axios.put(`/boards/${editedTaskData.task.boardId}/tasks/${editedTaskData.task.id}`, requestData);

                commit('editBoard', response.data ?? 'undefined');
                await dispatch('getBoards');
                await dispatch('getTasks');
        
            } catch (error) {
                console.error('Ошибка в редактировании доски', error);
                throw error;
            }
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

        signUp({commit}, formData){
            return  axios.put('/auth/signup', formData)
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