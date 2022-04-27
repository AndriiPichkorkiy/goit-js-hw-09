import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

function createPromises() {
  event.preventDefault();
  const {
    delay: { value: delay },
    step: { value: step },
    amount: { value: amount },
  } = form;

  setTimeout(() => {
    for (let i = 1; i <= amount; i += 1) {
      const stepDelay = +step * i + +step;
      createPromise(i, stepDelay)
        .then(({ position, delay }) => {
          Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        });
    }
  }, delay);
}

form.addEventListener('submit', createPromises);
