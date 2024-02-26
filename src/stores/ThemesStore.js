import { defineStore } from "pinia";

export const useThemesStore = defineStore("themesStore", {
    state: () => ({
        themes: [],
        selected: {}
    }),
    getters: {
        getThemes: (state) => {
            console.log('TS-GET-THEMES->', state);
            return state.themes
        }
    },
    actions: {
        setThemes(data) {
            console.log('TS-SET-THEMES->', data);
            this.themes = data;
            this.selected = data[0]
        },
        setSelected(theme) {
            this.selected = theme
        }
    }
})