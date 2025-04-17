function showHoroscopeAndAnimal() {
  const monthInput = document.getElementById('month').value.trim().toLowerCase();
  const dateInput = parseInt(document.getElementById('date').value.trim());
  const yearInput = parseInt(document.getElementById('year').value.trim());

  const validMonths = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december"
  ];

  if (!validMonths.includes(monthInput)) {
    alert("Please enter valid month.");
    return;
  }

  if (dateInput < 1 || dateInput > 31) {
    alert("Please enter a valid date.");
    return;
  }

  if (yearInput < 1900 || yearInput > 2100) {
    alert("Please enter a valid year.");
    return;
  }

  // Horoscope logic
  let horoscope = "";
  if ((monthInput === "march" && dateInput >= 21) || (monthInput === "april" && dateInput <= 19)) horoscope = "aries";
  else if ((monthInput === "april" && dateInput >= 20) || (monthInput === "may" && dateInput <= 20)) horoscope = "taurus";
  else if ((monthInput === "may" && dateInput >= 21) || (monthInput === "june" && dateInput <= 20)) horoscope = "gemini";
  else if ((monthInput === "june" && dateInput >= 21) || (monthInput === "july" && dateInput <= 22)) horoscope = "cancer";
  else if ((monthInput === "july" && dateInput >= 23) || (monthInput === "august" && dateInput <= 22)) horoscope = "leo";
  else if ((monthInput === "august" && dateInput >= 23) || (monthInput === "september" && dateInput <= 22)) horoscope = "virgo";
  else if ((monthInput === "september" && dateInput >= 23) || (monthInput === "october" && dateInput <= 22)) horoscope = "libra";
  else if ((monthInput === "october" && dateInput >= 23) || (monthInput === "november" && dateInput <= 21)) horoscope = "scorpio";
  else if ((monthInput === "november" && dateInput >= 22) || (monthInput === "december" && dateInput <= 21)) horoscope = "sagittarius";
  else if ((monthInput === "december" && dateInput >= 22) || (monthInput === "january" && dateInput <= 19)) horoscope = "capricorn";
  else if ((monthInput === "january" && dateInput >= 20) || (monthInput === "february" && dateInput <= 18)) horoscope = "aquarius";
  else if ((monthInput === "february" && dateInput >= 19) || (monthInput === "march" && dateInput <= 20)) horoscope = "pisces";

  // Chinese Zodiac logic
  const animals = [
    "rat", "ox", "tiger", "rabbit", "dragon", "snake",
    "horse", "goat", "monkey", "rooster", "dog", "pig"
  ];
  const baseYear = 1900;
  const animalIndex = (yearInput - baseYear) % 12;
  const animal = animals[animalIndex];

  // Show correct horoscope
const allHoroscopeItems = document.querySelectorAll('.horoscope-item');
const allHoroscopeFortunes = document.querySelectorAll('.horoscope-fortune');

allHoroscopeItems.forEach((item, index) => {
  const name = item.querySelector('span').textContent.trim().toLowerCase();
  const fortune = allHoroscopeFortunes[index];

  if (name === horoscope) {
    item.style.display = 'block';
    fortune.style.display = 'block';
    item.after(fortune);
  } else {
    item.style.display = 'none';
    fortune.style.display = 'none';
  }
});

// Show correct zodiac
const allZodiacItems = document.querySelectorAll('.zodiac-item');
const allZodiacFortunes = document.querySelectorAll('.zodiac-fortune');

allZodiacItems.forEach((item, index) => {
  const name = item.querySelector('span').textContent.trim().toLowerCase();
  const fortune = allZodiacFortunes[index];

  if (name === animal) {
    item.style.display = 'block';
    fortune.style.display = 'block';
    item.after(fortune);
  } else {
    item.style.display = 'none';
    fortune.style.display = 'none';
  }
});

  // Optional scroll behavior
  document.getElementById('horoscope-container').style.height = '750px';
  document.getElementById('zodiac-container').style.height = '750px';   
  document.getElementById('container').scrollIntoView({ behavior: 'smooth' });
}
