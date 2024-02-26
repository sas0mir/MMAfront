<template>
    <div :class="containerClass">
      <p class="text-input-label">{{ title }}</p>
      <p class="text-input-input">{{ value }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TextInput',
    props: {
      value: {
        type: String,
        required: true
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
        }
    },
    methods: {
        handleChange(e) {
            this.$emit('handle-change', e.target.value)
        }
    },
    computed: {
        containerClass() {
            if (this.vertical) {
                return `text-input-container vertical`
            }
            return `text-input-container horizontal`
        }
    }
  }
  </script>
  
  <style>
.text-input-container {
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
.text-input-label {
  margin-right: 10px;
  font-family: "Roboto Condensed", sans-serif;
  color: #282828;
}
.text-input-input {
  width: 50%;
  font-family: "Roboto Condensed", sans-serif;
  background-color: inherit;
  border: none;
  border-bottom: 1px solid black;
}
</style>