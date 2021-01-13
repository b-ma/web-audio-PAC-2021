const $pars = document.querySelectorAll('.blink');

Array.from($pars).forEach(function($par) {
  let flag = false;

  $par.addEventListener('click', function() {
    flag = !flag;
    let color;

    if (flag === true) {
      color = 'red';
    } else {
      color = 'black';
    }

    $par.style.color = color;
  });
});

