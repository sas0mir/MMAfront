import { defineStore } from "pinia";

export const useNotificationsStore = defineStore("notificationsStore", {
    state: () => ({
        notifications: [],
        active: []
    }),
    getters: {
        getNotifications: (state) => {
            return state.notifications
        },
        getActiveNotifications: (state) => { return state.active }
    },
    actions: {
        setNotifications(data) {
            if(!this.notifications.length) {
                this.notifications = data;
                this.active.push(data[0]);
            } else {
                for (let notify of data) {
                    this.notifications.push(notify)
                    this.active.push(notify)
                }
            }
        },
        clearActive() {
            this.active = []
        }
    }
})