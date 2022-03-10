displayHistory();

function displayHistory() {
    Http.Get('/history/all')
        .then(response => response.json())
        .then((response) => {
            document.querySelector('.history').innerHTML = '';
            response.history.forEach(el => {
                document.querySelector('.history').innerHTML += `
                <div class="historyBlock" data-id="${el.id}">
                    <div class="history-content">
                        <span class="history__year">${el.yearDate}</span>
                        <span class="history__title">${el.title ? el.title : 'TBD'}</span>
                        <p class="history__content">${el.content}</p>
                        <p class="history__subContent">${el.subContent ? el.subContent : 'TDB'}</p>
                    </div>
                    <div class="history__edit">
                        <input type="text" class="history__input history__input_yearDate input_base input_base" value='${el.yearDate}'>
                        <input type="text" class="history__input history__input_title input_base input_base" value='${el.title ? el.title : ''}'>
                        <textarea class="history__input history__input_content input_base input_base min-h-7">${el.content}</textarea>
                        <textarea class="history__input history__input_subContent input_base input_base min-h-7">${el.subContent ? el.subContent : ''}</textarea>
                    </div>
                    <div style="display: flex;">
                        <button class="history__btn btn mr-1">Редактировать</button>
                        <button class="history__btn-submit btn">submit</button>
                    </div>
                </div>
                `;
                
            });
        });
    };

document.addEventListener('click', function (event) {
    event.preventDefault();
    const ele = event.target;
    if (ele.matches('.history__btn')) {
        showEdit(ele.parentNode.parentNode);
    } else if (ele.matches('.history__btn-submit')) {
        // deleteUser(ele);
        console.log('WTF X2');
        sendEdit(ele.parentNode.parentNode);
    } 
}, false)

const showEdit = el => {
    el.querySelector('.history__edit').classList.toggle('history__edit_active');
    el.querySelector('.history-content').classList.toggle('history-content_active');
    el.querySelector('.history__btn-submit').classList.toggle('history__btn-submit_active');
    el.querySelector('.history__btn').classList.toggle('history__btn-active');
    el.querySelector('.history__btn').innerHTML = el.querySelector('.history__btn').classList.contains('history__btn-active') ? 'Отменить редактирование' : 'редактирование';
};

const sendEdit = el => {
    const data = {
        id: document.querySelector('.historyBlock').dataset.id,
        yearDate: document.querySelector('.history__input_yearDate').value,
        title: document.querySelector('.history__input_title').value,
        content: document.querySelector('.history__input_content').value,
        subContent: document.querySelector('.history__input_subContent').value,
    };

    Http.Put('/history/update', data)
    .then(() => {
        displayHistory();
        el.querySelector('.history__edit').classList.toggle('history__edit_active');
        el.querySelector('.history-content').classList.toggle('history-content_active');
        el.querySelector('.history__btn-submit').classList.toggle('history__btn-submit_active');
    })
};