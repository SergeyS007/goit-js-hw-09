const form = document.querySelector('.form');
const body = document.querySelector('body');

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;
  let a = Number(form.elements.amount.value);
  let b = Number(form.elements.delay.value);
  let c = Number(form.elements.step.value);

  for (let i = 1; i <= a; i += 1) {
    createPromise(i, b)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        body.insertAdjacentHTML(
          'beforeend',
          `<p>✅ Fulfilled promise ${position} in ${delay}ms</p>`
        );
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        body.insertAdjacentHTML(
          'beforeend',
          `<p>❌ Rejected promise  ${position} in ${delay}ms</p>`
        );
      });
    b += c;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
