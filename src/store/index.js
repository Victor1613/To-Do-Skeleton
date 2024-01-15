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
        },
        addBoard(state, newBoard) {
            state.boards.push(newBoard);
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
                const userId = localStorage.getItem('userId');
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
                const userId = localStorage.getItem('userId');
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
                const userId = localStorage.getItem('userId');
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
            return  axios.put('/auth/signup', formData)
                .then((res) => {
                    console.log(res)
                }).catch((err) =>{
                    console.log(err)
                })
        },
    },
});