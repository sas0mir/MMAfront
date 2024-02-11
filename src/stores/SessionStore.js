import { defineStore } from 'pinia'

export const useSessionStore = defineStore('sessionStore', {
    state: () => ({ userData: null, sessionStarted: new Date()}),
    getters: {
        getUserData: (state) => state.userData
    },
    actions: {
        setUserData(data) {
            console.log('ACTION-SET-USER->', data);
            this.userData = data
            this.sessionStarted = new Date()
        }
    }
})