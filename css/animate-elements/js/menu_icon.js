const menu = document.getElementById('toggle_menu')
menu.classList.add('load')

menu.addEventListener('mouseover', e => {
    menu.classList.add('mouseover')
    menu.classList.remove('mouseout')
})

menu.addEventListener('mouseout', e => {
    menu.classList.add('mouseout')
    menu.classList.remove('mouseover')
})