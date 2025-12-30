function changeTheme() {
    // select the <link> element using ID
    let theme = document.getElementById('theme');

    // toggle between styles1.css and styles2.css
    if (theme.getAttribute('href') == 'css/styles1.css') {
        theme.setAttribute('href', 'css/styles2.css');
        localStorage.setItem('theme', 'css/styles2.css'); // for presistence
    } else {
        theme.setAttribute('href', 'css/styles1.css');
        localStorage.setItem('theme', 'css/styles1.css'); // for presistence
    }

    window.onload = function () {
        let savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.getElementById('theme').setAttribute('href', savedTheme);
        }
    }
}