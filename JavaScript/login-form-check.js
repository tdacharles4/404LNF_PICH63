const form = document.getElementById('loginForm')

document.addEventListener('DOMContentLoaded', function () {
    // seedUsers();
})

form.addEventListener('submit', function (e) {
    e.preventDefault()

    //const objectData = Object.fromEntries([...new FormData(form)])
    const data = new FormData(form)
    const arrayData = [...data]
    const objectData = Object.fromEntries(arrayData)

    /*const retrievedData = localStorage.getItem('users')
    const retrievedObject = JSON.parse(retrievedData)*/

    let user = localStorage.getItem(objectData.email)

    if (!user) {
        const feedbackElement = document.getElementById('user-not-found')
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-danger alert-dismissible mt-2" role="alert">`,
            `   <div>Usuario o contraseña incorrectos, intenta de nuevo</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        feedbackElement.append(wrapper)
    }

    else{
        user = JSON.parse(user)
        if(user.password === objectData.password){
            console.log("sí es")
            window.location.href = "index.html"
        }
    }

})

async function seedUsers() {
    if (!localStorage.getItem('users')) {
        try {
            const response = await fetch('data/users.json');
            if (response.ok) {
                const mockUsers = await response.json();
                localStorage.setItem('users', JSON.stringify(mockUsers));
                console.log('LocalStorage seeded with mock users.');
            }
        } catch (error) {
            console.error('Error seeding mock users:', error);
        }
    }
}