<template>
  <div id="posts">    
    <div class="background-slides"></div>
    <div class="container" style="min-height:100vh;padding:0">

      <header class="header">
        <h1>
          <nuxt-link to="/">
            Web Journal
          </nuxt-link>
        </h1>
        <div class="search_wrapper ml-auto">
          <input type="text" class="search-text" v-model="search">
          <div class="search_results" v-show="showSearchResults"> 
            
            <div v-if="searching.length === 0" class="search_results__result">
              <span style="color: #555">No results</span>
            </div>

            <div v-else class="search_results__result" v-for="(item, index) in searching" :key="index">                          
              <nuxt-link :to="`/posts/${item.id}-${item.attributes.slug}`" class="search_results__link">
                {{ item.attributes.postTitle }}
              </nuxt-link>              
            </div>
          </div>
        </div>
      </header>

      <div class="posts-wrapper">
        <div class="posts-content">
          <div class="content-header">              
            <Breadcrumbs :bc="breadcrumbs" />          

            <div class="filter-icon">
              <div class="filter-img-wrapper open-filter" @click="openFilter = !openFilter">
                <img src="@/assets/img/filter.svg" class="filter-img" title="Filter" alt="filter">
              </div>              
            </div>
            <transition name="slide-fade">
              <div class="filter-wrapper" v-show="openFilter">        
                <label v-for="(tag, tag_id) in tags" :key="tag_id" class="filter-label">
                  <input type="checkbox" v-model="checkedTags" :value="tag.id">
                  <span class="filter-checkmark"></span>            
                  {{ tag.name }}
                </label>
              </div>
            </transition>
          </div>              

          <masonry
            :cols="{default: 3, 992: 2, 500: 1}"
            :gutter="30"
            >           
          
            <div class="post" v-for="(post, index) in changeCheckedTags" :key="index">
              <nuxt-link :to="`/posts/${post.id}-${post.attributes.slug}`">
                <img :src="post.attributes.image" :alt="post.attributes.postTitle">
              </nuxt-link>
              <div class="post-meta">
                <div class="title">
                  <nuxt-link :to="`/posts/${post.id}-${post.attributes.slug}`">
                    {{ post.attributes.postTitle }}
                  </nuxt-link>                  
                </div>
                <div class="introtext"> {{ post.attributes.introtext }}... </div>
              </div>
            </div>
          </masonry>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import Breadcrumbs from '@/components/breadcrumbs'

  export default {
    name: 'posts',
    data () {
      return {
        breadcrumbs: [],
        tags: [],
        search: '',
        showSearchResults: false,
        openFilter: false,
        checkedTags: []        
      }
    },
    computed: {
      searching () {
        let s = this.search.toLowerCase()
        this.emptySearchCondition(s)
        return this.posts.filter(post => Object.values(post.attributes).some(m => m.toString().toLowerCase().includes(s)));        
      },
      changeCheckedTags() {
        if (this.checkedTags.length > 0) {        
          let filteredPosts = [];
          this.posts.forEach(post => {
            // если встречается хоть один пост с выбранным тэгом, записываем его в массив, который будет разобран в v-for
            if ( post.attributes.tags.some(tag => this.checkedTags.includes(tag.tag_id)) ) {
              filteredPosts.push(post);
            }
          })
          return filteredPosts
        } else return this.posts
      }
    },
    methods: {
      emptySearchCondition (s) {
        this.showSearchResults = s ?  true : false
      },
    },
    metaInfo: {
      title: 'Web Journal Blog',
      meta: [
        { vmid: 'description', property: 'description', content: 'Savayer Web Journal Blog, a little bit of delirium' }        
      ],
    },
    async asyncData({$axios}) {
      let tags = []
      let breadcrumbs = []
      let posts = await $axios.$get(`${process.env.VUE_APP_SITE_URL}/api/articles/all`)

      posts.reverse().forEach(post => {
        post.attributes.tags.forEach(tag => {
          if (!tags.map(tagName => tagName.name).includes( tag.name )) {
            tags.push({ id: tag.tag_id, name: tag.name });
          }
        })
      })
      breadcrumbs.push(
        { text: 'Главная', link: '/', thisPost: false },
        { text: 'Блог', link: '/posts', thisPost: true }            
      )

      return { posts, tags, breadcrumbs }
    },
    components: {
      Breadcrumbs
    }
  }
</script>
