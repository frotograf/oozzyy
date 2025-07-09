// Play sound on load
const audio = new Audio('start.mp3');
window.onload = () => audio.play();

// Step management
const form = document.getElementById('birthForm');
const choice = document.getElementById('choice');
const questionDiv = document.getElementById('question');
const output = document.getElementById('output');
let mode = '';

form.addEventListener('submit', e => {
  e.preventDefault();
  form.classList.add('hidden');
  choice.classList.remove('hidden');
});

document.getElementById('divineBtn').onclick = () => {
  mode = 'divination';
  choice.classList.add('hidden');
  questionDiv.classList.remove('hidden');
};
document.getElementById('tarotBtn').onclick = () => {
  mode = 'tarot';
  choice.classList.add('hidden');
  questionDiv.classList.remove('hidden');
};

document.getElementById('askBtn').onclick = async () => {
  const dob = document.getElementById('dob').value;
  const city = document.getElementById('city').value;
  const country = document.getElementById('country').value;
  const time = document.getElementById('time').value || '00:00';
  const question = document.getElementById('userQuestion').value;

  output.textContent = 'Meddling with space magma..';

  const res = await fetch(`/api/${mode}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ dob, city, country, time, question })
});
if (!res.ok) {
  // if server returns 500 or anything non-200, grab the raw text
  const text = await res.text();
  output.textContent = `Error from server:\n${text}`;
  return;
}
const data = await res.json();
output.textContent = data.result;

};
