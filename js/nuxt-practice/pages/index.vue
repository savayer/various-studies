<template>
  <div class="wrapper reverse">
    <div class="background-slides"></div> 
    <div :class="isOverlaySkew">
      <div class="overlay__stars"></div>
    </div>
    <span v-if="!show" class="icon-menu custom-icon-menu" @click="show = !show"></span>
    <span v-else class="icon-cancel-circle close" @click="show = !show"></span>
    <section id="block-left">
      <div class="content">
        <h1>WEB JOURNAL</h1>        
      </div>
      
    </section>
    <transition name="slide">
      <section v-if="show" class="sidebar">
        <header>          
          <h3>Добро пожаловать!</h3>        
          <p style="padding: 0 20px">
            Вы, либо мой товарищ, с которым я поделился ссылкой, либо вы - странник, случайно забредший в дебри сети. Сие небольшое SPA служит шпаргалкой, где показываются различного рода записи
          </p>      
          <h3>Последние посты</h3>
        </header>
        
        <div class="posts">
          <div class="post" v-for="post in posts" :key="post.id">
            <router-link :to="`/posts/${post.id}-${post.attributes.slug}`">
              <img :src="post.attributes.image" :alt="post.attributes.postTitle">
            </router-link>
            <router-link :to="`/posts/${post.id}-${post.attributes.slug}`" class="pagetitle">
              {{ post.attributes.postTitle }} 
            </router-link>
            <div class="introtext"> {{ post.attributes.introtext }} </div>
          </div>
        </div>
        <router-link to="posts/" style="text-decoration:none">
          <button class="btn btn-green-content btn-center">
            Все посты
          </button>
        </router-link>
        
      </section>
    </transition>

  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    name: "Home",
    data() {
      return {
        show: false,
        posts: []
      }
    },
    computed: {
      isOverlaySkew() {
        return this.show ? "overlay" : "overlay skew";
      }
    },
    metaInfo: {
      title: 'Web Journal',
      meta: [
        { vmid: 'description', property: 'description', content: 'Savayer Web Journal, a little bit of delirium' }        
      ],
    },
    mounted () {
      axios
        .get(`${process.env.VUE_APP_SITE_URL}/api/articles/all`)
        .then(response => {
          let posts = response.data          
          this.posts = posts.reverse().splice(0,2)
        })
    }
  };
</script>