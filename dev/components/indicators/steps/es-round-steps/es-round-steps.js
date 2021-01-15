import './es-round-steps.scss';

const progress = document.getElementById('progress');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const steps = document.querySelectorAll('.circle');

let currentStep = 1;

next.addEventListener('click', () => {
  currentStep++;
  if (currentStep > steps.length) {
    currentStep = steps.length;
  }
  updateProgress();
});

prev.addEventListener('click', () => {
  currentStep--;
  if (currentStep < 1) {
    currentStep = 1;
  }
  updateProgress();
});

function updateProgress() {
  steps.forEach((step, idx) => {
    if (idx < currentStep) {
      step.classList.add('active');
    } else {
      step.classList.remove('active');
    }
  });
  const activeSteps = document.querySelectorAll('.active');
  progress.style.width =
    ((activeSteps.length - 1) / (steps.length - 1)) * 100 + '%';

  if (currentStep === 1) {
    prev.disabled = true;
  } else if (currentStep === steps.length) {
    next.disabled = true;
  } else {
    prev.disabled = false;
    next.disabled = false;
  }
}
