import { defineStore } from "pinia";

export const useThemesStore = defineStore("themesStore", {
    state: () => ({
        loader: false,
        themes: [],
        selected: {}
    }),
    getters: {
        getThemes() {
            return this.themes
        }
    },
    actions: {
        setThemes(data) {
            this.themes = data;
            this.selected = data[0]
        },
        setSelected(theme) {
            this.selected = theme
        }
    }
})