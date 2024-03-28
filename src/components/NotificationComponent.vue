<template>
    <Teleport to="body">
  
      <Transition name="slide-fade">
        <div class="notification-container" v-if="show">
            <h4>{{ title }}</h4>
            <p>{{ message }}</p>
        </div>
      </Transition>
  
    </Teleport>
</template>

<script>

  export default {
  components: {},
    name: 'NotificationComponent',
    props: {
      title: {
        type: String,
        required: true
      },
      message: {
        type: Array,
        required: true
      },
      show: {
        type: Boolean,
        required: true
      }
    },
    data() {
        return {}
    },
    methods: {
        closeModal() {
            this.$emit('close-notification', true)
        }
    },
    computed: {
        
    }
  }
  </script>
  
<style>
    .slide-fade-enter-active {
        transition: all 0.3s ease-out;
    }

    .slide-fade-leave-active {
        transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
        transform: translateX(20px);
        opacity: 0;
    }
    .notification-container {
        position: absolute;
        top: 1em;
        right: 1em;
        display: block;
        width: 15vw;
        height:fit-content;
        padding: 1em;
        background-color: rgb(70, 70, 70);
        color: white;
    }
</style>