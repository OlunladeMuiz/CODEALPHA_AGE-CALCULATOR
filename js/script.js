// DOM selection
const form = document.getElementById('age-form');
const input = document.getElementById('birthdate');
const result = document.getElementById('age-result');

function validateInput(dateValue) {
  if (!dateValue) {
    return { valid: false, message: "Please select your date of birth." };
  }
  const birthDate = new Date(dateValue);
  if (isNaN(birthDate.getTime())) {
    return { valid: false, message: "Invalid date selected." };
  }
  const today = new Date();
  if (birthDate > today) {
    return { valid: false, message: "Birth date cannot be in the future." };
  }
  return { valid: true, birthDate };
}

function calculateAge(birthDate) {
  const today = new Date();
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    const previousMonthDays = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();
    days += previousMonthDays;
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }
  return { years, months, days };
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  result.classList.remove("error", "success");

  const validation = validateInput(input.value);
  if (!validation.valid) {
    result.textContent = validation.message;
    result.classList.add("error");
    return;
  }

  const age = calculateAge(validation.birthDate);
  result.textContent = `You are ${age.years} years, ${age.months} months, and ${age.days} days old.`;
  result.classList.add("success");
});

