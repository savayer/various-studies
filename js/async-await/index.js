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
        } catch (e) {
            console.error(e)
        }
    }

    fetchAsync()
}

async_func.onclick = () => {
    async function f() { //Здесь нужно думать о вызове функции async, как о промисе.
        return 1;
        // return Promise.resolve(1); // the same
    }

    /* function f() { // the same
        return new Promise(r => r(111))
    } */

    f().then(alert);
}


get_fullname_github_user.onclick = () => {

    class HttpError extends Error {
        constructor(response) {
            super(`${response.status} for ${response.url}`);
            this.name = 'HttpError';
            this.response = response;
        }
    }

    /* function loadJson(url) {
        return fetch(url)
            .then(response => {
                if (response.status == 200) {
                    return response.json();
                } else {
                    throw new HttpError(response);
                }
            })
    } */

    async function loadJson(url) {
        const response = await fetch(url)
        if (response.status == 200) {
            return response.json();
        }

        throw new HttpError(response)
    }

    async function demoGithubUser() {
        let name = prompt("Введите логин", "acrossoffwest");

        try {
            const user = await loadJson(`https://api.github.com/users/${name}`)
            alert(`Полное имя: ${user.name}.`);
        } catch (err) {
            if (err instanceof HttpError && err.response.status == 404) {
                alert("Такого пользователя не существует, пожалуйста, повторите ввод.");
                return demoGithubUser();
            } else {
                throw err;
            }
        }
    }

    demoGithubUser();

}

/**************************************** */

/* async function wait() {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return 10;
} */

function wait() {
    return new Promise(r => {
        new Promise(rr => setTimeout(rr, 1000)).then(() => r(10))
    })
}

function f() {
    // ...что здесь написать?
    // чтобы вызвать wait() и дождаться результата "10" от async–функции
    // не забывайте, здесь нельзя использовать "await"
    wait().then(data => console.log(data))
}

f();