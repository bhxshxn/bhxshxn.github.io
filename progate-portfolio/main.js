const ham = document.getElementById('hamburger');
const navul = document.getElementById('nav-ul');

ham.addEventListener('click', () => {
    navul.classList.toggle('show');
});