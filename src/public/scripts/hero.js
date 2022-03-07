displayHero();
var sameVarible;

function displayHero() {
    Http.Get('/hero/all')
        .then(response => response.json())
        .then((response) => {
            sameVarible = response.hero[0];

            document.querySelector('.hero__content').innerHTML = response.hero[0].content
            document.querySelector('.hero__subVontent').innerHTML = response.hero[0].subContent
        });
};

document.querySelector('.hero__btn').addEventListener('click', () => {
    document.querySelectorAll('.hero-content').forEach(el => {
        el.classList.toggle('hero-content_active-edit');
    });

    document.querySelector('.hero-edit').classList.toggle('hero-edit_active');
    document.querySelector('.hero-input-content').value = sameVarible.content;
    document.querySelector('.hero-input-subContent').value = sameVarible.subContent;
    document.querySelector('.hero__btn').innerHTML = document.querySelector('.hero-edit').classList.contains('hero-edit_active') ? 'отменить редактирование' : 'редактировать';
    document.querySelector('.hero__btn-submit').classList.toggle('hero__btn-submit_active');
});

document.querySelector('.hero__btn-submit').addEventListener('click', () => {
    const data = {
        id: 1,
        content: document.querySelector('.hero-input-content').value,
        subContent: document.querySelector('.hero-input-subContent').value
    }
    
    Http.Put('/hero/update', data)
        .then(() => {
            displayHero();
            document.querySelector('.hero__btn-submit').classList.toggle('hero__btn-submit_active');
            document.querySelector('.hero-edit').classList.toggle('hero-edit_active');
            document.querySelectorAll('.hero-content').forEach(el => {
                el.classList.toggle('hero-content_active-edit');
            });
        })
    
});