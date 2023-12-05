import {isLoggedIn, logIn, signUp} from "./core/auth.mjs";
import message, {Levels} from "./util/message.mjs";

index();

function index() {
    if (isLoggedIn()) {
        window.history.pushState({}, null, "./app.html");
        location.reload();
        return;
    }

    const app = document.getElementById('app');

    mountLoginLogic(app);
    mountSignupLogic(app);
}

function mountLoginLogic(app) {
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    const loginBtn = document.getElementById('loginButton');

    loginBtn.addEventListener('click', evt => {
        evt.preventDefault();

        const result = logIn(loginEmail.value, loginPassword.value);

        if (result) {
            window.history.pushState({}, null, "./app.html");
            location.reload();
            return;
        }

        message(Levels.WARN, 'Invalid credentials!', app);
    });
}

function mountSignupLogic(app) {
    const signupName = document.getElementById('signupName');
    const signupEmail = document.getElementById('signupEmail');
    const signupPassword = document.getElementById('signupPassword');
    const signupBtn = document.getElementById('signupButton');

    signupBtn.addEventListener('click', evt => {
        evt.preventDefault();

        const name = signupName.value;
        const email = signupEmail.value;
        const password = signupPassword.value;

        if (name.length === 0 || email.length === 0 || password.length === 0) {
            message(Levels.WARN, 'All fields must be filled.', app)
            return;
        }

        const result = signUp(name, email, password);
        console.log(`Signup: ${result}`);

        if (result) {
            window.history.pushState({}, null, "./app.html");
            location.reload();
            return;
        }

        message(Levels.ERROR, 'Account already in use!', app);
    })
}