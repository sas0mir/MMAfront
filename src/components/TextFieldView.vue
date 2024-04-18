<template>
    <div :class="containerClass">
      <p class="text-input-label">{{ title }}</p>
      <p class="text-input-text">{{ value }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TextFieldView',
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
  padding: 0 1em;
  margin: 1em;
  background-color: #ededed;
  border-radius: 1vw;
}
.horizontal {
  display: flex;
  flex-direction: row;
  justify-content:space-between;
}
.vertical {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.text-input-label {
  margin-right: 10px;
  font-family: "Roboto Condensed", sans-serif;
  color: grey;
}
.text-input-text {
  width: 50%;
  font-family: "Roboto Condensed", sans-serif;
  background-color: inherit;
}
</style>