document.addEventListener('DOMContentLoaded', async () => {
    await seedUsers();

    const loginForm = document.querySelector('form.needs-validation');
    if (!loginForm) return;

    const emailInput = loginForm.querySelector('input[type="email"]');
    const passwordInput = loginForm.querySelector('input[type="password"]');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        event.stopPropagation();

        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const user = checkUserCredentials(email, password);
        console.log(email, password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify({
                email: user.email,
                nombre: user.nombre,
                apellido: user.apellido,
                loginTime: new Date().toISOString()
            }));
            
            alert('¡Inicio de sesión exitoso!');
            window.location.href = 'Index.html';
        } else {
            alert('Login unsuccessful');
            emailInput.classList.add('is-invalid');
            passwordInput.classList.add('is-invalid');
        }

        loginForm.classList.add('was-validated');
    });
});

function checkUserCredentials(email, password) {
    const usersJson = localStorage.getItem('users');
    if (!usersJson) return null;

    const users = JSON.parse(usersJson);
    return users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
}

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
