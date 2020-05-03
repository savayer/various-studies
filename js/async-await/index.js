const delay = ms => {
    return new Promise(resolve => setTimeout(() => resolve(), ms))
}

const url = 'https://jsonplaceholder.typicode.com/todos'

fetch_promise.onclick = () => {
    const fetchData = () => {
        console.log('Fetch by promise started..')
        return delay(2000)
            .then(() => fetch(url))
            .then(res => res.json())
    }
    
    fetchData()
        .then(data => {
            console.log(data)
        })
        .catch(e => {
            console.erroe(e)
        })
}

fetch_async.onclick = () => {
    const fetchAsync = async () => {
        console.log('Fetch by async/await started..')
        try {
            await delay(2000)
            const res = await fetch(url)
            const end = await res.json()
            console.log(end)
        } catch(e) {
            console.error(e)
        }
    }
    
    fetchAsync()
}