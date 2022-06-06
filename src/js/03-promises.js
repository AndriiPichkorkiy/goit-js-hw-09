import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    // setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    // }, delay);
  });
}

function createPromises() {
  event.preventDefault();
  let {
    delay: { valueAsNumber: delay },
    step: { valueAsNumber: step },
    amount: { valueAsNumber: amount },
  } = form;

  //check if values === '' or 0
  if (!delay || !step || !amount) {
    Notify.warning('pls fill in all filds rigth');
    return;
  }

  // for (let i = 0; i < amount; i += 1) {
  //   const stepDelay = delay + step * i;
  //   createPromise(i + 1, stepDelay)
  //     .then(({ position, delay }) => {
  //       Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
  //     })
  //     .catch(({ position, delay }) => {
  //       Notify.failure(`Rejected promise ${position} in ${delay}ms`);
  //     });
  // }
  const formData = {
    delay,
    step,
    amount,
    currentNumberOfPromise: 0,
  }
  function doOnce(delay) {
    console.log('do once');
    doPromise(delay);
    const idForInterval = setInterval(() => {
      console.log('Interval', step);
      if (formData.currentNumberOfPromise >= formData.amount) return clearInterval(idForInterval);
      doPromise();
    }, step);
  }
  
  function doPromise() {
    createPromise(
      formData.currentNumberOfPromise + 1,
      formData.step * formData.currentNumberOfPromise,
    )
      .then(onPromiseSuccess)
      .catch(onPromiseError);
    formData.currentNumberOfPromise += 1;
  }
  setTimeout(doOnce, delay);
}

function onPromiseSuccess({ position, delay }) {
  Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
}

function onPromiseError({ position, delay }) {
  Notify.failure(`Rejected promise ${position} in ${delay}ms`);
}

form.addEventListener('submit', createPromises);
