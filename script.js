document.addEventListener('DOMContentLoaded', function() {
    const leftNav = document.getElementById('leftNav');
  
    leftNav.addEventListener('mouseover', function() {
        // leftNav.style.backgroundColor = 'white';
        leftNav.classList.add('col-md-2');
        leftNav.classList.remove('col-md-1');
    //   console.log('Mouse over leftNav');
    });
    leftNav.addEventListener('mouseout', function() {
        // leftNav.style.backgroundColor = 'transparent';
        leftNav.classList.add('col-md-1');
        leftNav.classList.remove('col-md-2');
    //   console.log('Mouse out leftNav');
    });
  });