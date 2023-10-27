const leftNav = document.getElementById('leftNav');

leftNav.addEventListener('mouseover', function() {
    leftNav.style.backgroundColor = 'white';
    leftNav.classList.remove('col-1');
    leftNav.classList.add('col-2');
});
