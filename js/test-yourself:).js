const test1 = ({}).prototype === ({}).__proto__

function someFunc() {}
const test2 = someFunc.prototype === someFunc.__proto__

function earth() {}
function sun() {}
const test3 = earth.__proto__ === sun.__proto__
const test4 = earth.prototype === sun.prototype

let Component = props => {
    return `<div>Test Component</div>`
}
const test5 = Component.prototype === Object.prototype

const age = 18
const test6 = age.prototype === Number.prototype
const test7 = age.__proto__ === Number.prototype

class Tester {}
const test8 = Tester.__proto__ === Function.prototype

function MilkyWay() {}
//const test9 = MilkyWay.__proto__ === ???

const param = 100
//const test10 = param.__proto__ === ???