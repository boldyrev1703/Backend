displayContacts();

const contactsContent = document.querySelectorAll('.contacts__content');
var someResponseData;
function displayContacts() {
    Http.Get('/contacts/all')
        .then(response => response.json())
        .then((response) => {
            contactsContent.forEach((el, i) => {
                el.querySelector('.contacts__body').innerHTML = response.contacts[i].content; 
            });
        });
};

contactsContent.forEach((el, i) => {
    el.querySelector('.contacts__btn').addEventListener('click', () => {
        el.querySelector('.edit').classList.toggle('edit_active');
        el.querySelector('.contacts__btn').innerHTML = el.querySelector('.edit').classList.contains('edit_active') ? 'отменить редактирование' : 'редактировать';
        el.querySelector('.contacts__input').value = el.querySelector('.contacts__body').innerHTML;

        el.querySelector('.contacts__btn-edit').addEventListener('click', () => {
            const data = {
                id: i+1,
                content: el.querySelector('.contacts__input').value
            };

            Http.Put('/contacts/update', data)
            .then(() => {
                displayContacts();
            })
        })
    })
});