<template>
    <div class="breadcrumbs">
        <span v-for="(crumb, index) in bc" :key="index">
            <nuxt-link class="crumb" :to="crumb.link" v-if="!crumb.thisPost">
                {{ crumb.text }}
            </nuxt-link>
            <span class="crumb" v-else>
                {{ crumb.text }}
            </span>
        </span>
    </div>
</template>

<script>
    export default {
        name: 'Breadcrumbs',
        props: {
            bc: {
                type: Array,
                required: true
            }
        }
    }
</script>