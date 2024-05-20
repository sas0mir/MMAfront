<template>
    <div :class="containerClass">
      <label for="tinp" class="select-label">{{ title }}</label>
      <select id="tinp" v-on:change="handleChange" :name="title" v-model="value" class="select-input">
        <div v-if="group_by">
            <optgroup v-for="gopt in options" :key="gopt" :label="gopt">
            <option v-for="opt in gopt" :key="opt.id" :value="opt.id">{{ opt.name || opt.title }}</option>
        </optgroup>
        </div>
        <option v-else v-for="opt in options" :key="opt.id" :value="opt.id">{{ opt.name || opt.title }}</option>
        </select>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SelectInput',
    props: {
      prev_value: {
        type: String,
        required: false
      },
      options: {
        type: Object,
        required: true
      },
      group_by: {
        type: String,
        required: false
      },
      title: {
        type: String,
        required: true
      },
      horizontal: {
        type: Boolean,
        required: false
      },
      vertical: {
        type: Boolean,
        required: false
      }
    },
    data() {
        return {
            value: '',
        }
    },
    methods: {
        handleChange(e) {
            console.log('SELECT-CHANGE->', e.target.value, e);
            this.$emit('handle-change', e.target.value)
        }
    },
    computed: {
        containerClass() {
            if (this.vertical) {
                return `select-container vertical`
            }
            return `select-container horizontal`
        }
    }
  }
  </script>
  
  <style>
.select-container {
  min-width: 200px;
  /* max-width: 30%; */
  padding: 5px;
  margin: 10px;
}
.horizontal {
  display: flex;
  flex-direction: row;
  justify-content:center;
}
.vertical {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.select-label {
  margin-right: 10px;
  font-family: "Roboto Condensed", sans-serif;
  color: grey;
}
.select-input {
  /* width: 50%; */
  font-family: "Roboto Condensed", sans-serif;
  font-size: 14pt;
  background-color: inherit;
  border: none;
  border-bottom: 1px solid black;
}
.select-input:focus, .select-input:focus-visible {
  outline: none;
  border-bottom: 2px solid green;
}
</style>
  