const data = {
  price: 10,
  quantity: 1
}
let target, total, salePrice

class Dep {
  constructor () {
    this.storage = []
  }
  depend () {
    if (target && !this.storage.includes(target)) {
      this.storage.push(target)
    }
  }
  notify () {
    this.storage.forEach(run => run())
  }
}

Object.keys(data).forEach(key => {
  let localValue = data[key]
  const dep = new Dep()

  Object.defineProperty(data, key, {
    get () {
      dep.depend()
      return localValue
    },
    set (v) {
      localValue = v
      dep.notify()
    }
  })
})

function watcher(func) {
  target = func
  target()
  target = null
}

watcher(() => {
  total = data.price * data.quantity
})

watcher(() => {
  salePrice = data.price * 0.85
})