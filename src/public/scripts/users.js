/******************************************************************************
 *                          Fetch and display users
 ******************************************************************************/

displayUsers();


function displayUsers() {
    Http.Get('/users/all')
        .then(response => response.json())
        .then((response) => {
            const allUsers = response.users;
            // Empty the anchor
            const allUsersAnchor = document.getElementById('all-users-anchor');
            allUsersAnchor.innerHTML = '';
            // Append users to anchor
            allUsers.forEach((user) => {
                allUsersAnchor.innerHTML += getUserDisplayEle(user);
            });
        });
};


function getUserDisplayEle(user) {
    return `<div class="user-display-ele">

        <div class="normal-view">
            <div>login: ${user.login}</div>
            <button class="edit-user-btn" data-user-id="${user.id}">
                Edit
            </button>
            <button class="delete-user-btn" data-user-id="${user.id}">
                Delete
            </button>
        </div>
        
        <div class="edit-view">
            <div style = '
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;'
            >
                Login: <input class="login-edit-input" value="${user.login}">
            </div>
            <div>
                Password: <input class="password-edit-input">
            </div>
            <button class="submit-edit-btn" data-user-id="${user.id}">
                Submit
            </button>
            <button class="cancel-edit-btn" data-user-id="${user.id}">
                Cancel
            </button>
        </div>
    </div>`;
}


/******************************************************************************
 *                        Add, Edit, and Delete Users
 ******************************************************************************/

document.addEventListener('click', function (event) {
    event.preventDefault();
    const ele = event.target;
    if (ele.matches('#add-user-btn')) {
        addUser();
    } else if (ele.matches('.edit-user-btn')) {
        showEditView(ele.parentNode.parentNode);
    } else if (ele.matches('.cancel-edit-btn')) {
        cancelEdit(ele.parentNode.parentNode);
    } else if (ele.matches('.submit-edit-btn')) {
        submitEdit(ele);
    } else if (ele.matches('.delete-user-btn')) {
        deleteUser(ele);
    } else if (ele.matches('#logout-btn')) {
        logoutUser();
    }
}, false)


function addUser() {
    const loginInput = document.getElementById('name-input');
    const passwordInput = document.getElementById('email-input');
    const data = {
        user: {
            login: loginInput.value,
            password: passwordInput.value
        },
    };
    Http.Post('/users/add', data)
        .then(() => {
            displayUsers();
        })
}


function showEditView(userEle) {
    const normalView = userEle.getElementsByClassName('normal-view')[0];
    const editView = userEle.getElementsByClassName('edit-view')[0];
    normalView.style.display = 'none';
    editView.style.display = 'block';
}


function cancelEdit(userEle) {
    const normalView = userEle.getElementsByClassName('normal-view')[0];
    const editView = userEle.getElementsByClassName('edit-view')[0];
    normalView.style.display = 'block';
    editView.style.display = 'none';
}


function submitEdit(ele) {
    const userEle = ele.parentNode.parentNode;
    const login = userEle.getElementsByClassName('login-edit-input')[0];
    const password = userEle.getElementsByClassName('password-edit-input')[0];
    const id = ele.getAttribute('data-user-id');
    const data = {
        user: {
            login: login.value,
            password: password.value,
            id: Number(id)
        }
    };
	Http.Put('/users/update', data)
        .then(() => {
            displayUsers();
        })
}


function deleteUser(ele) {
    const id = ele.getAttribute('data-user-id');
	Http.Delete('/users/delete/' + id)
        .then(() => {
            displayUsers();
        })
}

/******************************************************************************
 *                        Add, Edit, and Delete Users
 ******************************************************************************/

function logoutUser() {
    Http.Get('/auth/logout')
        .then(() => {
            window.location.href = '/';
        })
}
