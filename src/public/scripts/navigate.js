const links = document.querySelectorAll('.navigation__list-link');

const isActive = el =>  el.classList.contains('navigation__list-link_active');

const getDataLink = el => el.dataset.link;

const dataLink = [...links].map(getDataLink);


links.forEach((el, i) => {
    el.addEventListener('click', () => {
        if (!isActive(el)) {
            window.location.href = dataLink[i]
        }
    })
})