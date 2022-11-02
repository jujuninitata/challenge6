const body = document.querySelector('body'),
    sidebar = document.querySelector('.sidebar'),
    toggle = document.querySelector('.toggle'),
    main = document.querySelector('main');

    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('close');
        main.classList.toggle('close');
    });


 