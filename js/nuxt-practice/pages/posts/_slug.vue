<template>
  <div class="single-post">
    <div class="background-slides"></div>
    
    <div class="container" style="min-height: 100vh;padding: 0 0 30px 0;background: #fbfbfb;">    
        <header class="header" style="background: #f8f8f8;">
          <h1>
            <router-link to="/">
              Web Journal
            </router-link>
          </h1>          
        </header>    
        <div class="post-wrapper">
          <Breadcrumbs :bc="breadcrumbs" />

          <h1 class="text-center"> {{ post.postTitle }} </h1>
          <a target="_blank" :href="post.image"><img :src="post.image" class="post-image" :alt="post.postTitle"></a>
          <div class="tags">
            <div class="tags__item " :class="'tags__item--'+(index+1)" v-for="(tag, index) in post.tags" :key="index">
              {{ tag.name }}
            </div>
          </div>
          <div class="content" v-html="post.content"></div>
        </div>
    </div>

  </div>
</template>

<script>
  import Breadcrumbs from '@/components/breadcrumbs'

  export default {
    name: 'single-post',
    data() {
      return {
        id: '',
        breadcrumbs: [],
        post: {}
      }
    },
    metaInfo () {
      const title = this.post.postTitle
      const image = this.post.image      
      const introtext = this.post.introtext + '...'
      return {
        title,
        titleTemplate: '%s | Web Journal',
        meta: [
          { vmid: 'description', property: 'description', content: 'Savayer Web Journal, a little bit of delirium' },
          { vmid: 'og:title', property: 'og:title', content: title },
          { vmid: 'og:image', property: 'og:image', content: image },
          { vmid: 'og:description', property: 'og:description', content: introtext },
        ],
      }      
    },
    async asyncData({$axios, params}) {
      const slug = params.slug
      const id = slug.split('-')[0]
      const breadcrumbs = []
      let post = await $axios.$get(`${process.env.VUE_APP_SITE_URL}/api/article/${id}`)

      post = post.attributes
      breadcrumbs.push(
        { text: 'Главная', link: '/', thisPost: false },
        { text: 'Блог', link: '/posts', thisPost: false },
        { text: post.postTitle, link: '', thisPost: true }
      )
      return { post, breadcrumbs }
    },
    components: {
      Breadcrumbs
    }
  }
</script>
