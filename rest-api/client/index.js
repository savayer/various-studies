import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'


Vue.component('loader', {
    template: `
    <div style="display: flex;justify-content: center;align-items: center">
        <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>`
})

new Vue({
    el: '#app',
    data() {
        return {
            loading: false,
            form: {
                name: '',
                value: ''
            },
            contacts: []
        }
    },
    computed: {
        canCreate() {
            return this.form.value.trim() && this.form.name.trim()
        }
    },
    methods: {
        async createContact() {
            const { ...contact } = this.form
            
            const newContact = await request('/api/contacts', 'POST', contact)

            this.contacts.push(newContact)
            this.form.name = this.form.value = ''
        },
        async markContact(id) {
            const contact = this.contacts.find(el => el.id === id)
            contact.marked = true
            const response = await request(`/api/contacts/${id}`, 'PUT', contact)
            
            contact.marked = response.marked
        },
        async removeContact(id) {
            /* const contactIndex = this.contacts.findIndex(el => el.id === id)
            this.contacts.splice(contactIndex, 1) */
            const response = await request(`/api/contacts/${id}`, 'DELETE') 
            if (response.mes === 'ok') {
                this.contacts = this.contacts.filter(el => el.id !== id)
            }
        }
    },
    async mounted() {
        this.loading = true
        this.contacts = await request('/api/contacts')
        this.loading = false
    }
})

async function request(url, method = 'GET', data = null) {
    try {
        const headers = {}
        let body

        if (data) {
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        })
        return response.json()
    } catch (e) {
        console.warn('Error:', e.message)
    }
}