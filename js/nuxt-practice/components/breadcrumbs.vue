<template>
    <div class="breadcrumbs">
        <span v-for="(crumb, index) in bc" :key="index">
            <router-link class="crumb" :to="crumb.link" v-if="!crumb.thisPost">
                {{ crumb.text }}
            </router-link>
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