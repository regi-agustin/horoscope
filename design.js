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
  if (yearInput < 1900 || yearInput > 2100){
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

  // Zodiac animal logic
  const animals = [
    "rat", "ox", "tiger", "rabbit", "dragon", "snake",
    "horse", "goat", "monkey", "rooster", "dog", "pig"
  ];
  const baseYear = 1900;
  const animalIndex = (yearInput - baseYear) % 12;
  const animal = animals[animalIndex];

  // Show matched horoscope
  const allHoroscopes = document.querySelectorAll('.horoscope-item');
  allHoroscopes.forEach(item => {
    const name = item.querySelector('span').textContent.toLowerCase();
    item.style.display = (name === horoscope) ? 'inline-block' : 'none';
  });

  // Show matched zodiac animal based on YEAR
  const allZodiacs = document.querySelectorAll('.zodiac-item');
allZodiacs.forEach(item => {
  const yearText = parseInt(item.querySelector('img').getAttribute('year'));
  const name = item.querySelector('span').textContent.toLowerCase();
  item.style.display = (yearText === yearInput || name === animal) ? 'inline-block' : 'none';
});

  document.getElementById('container').scrollIntoView({ behavior: 'smooth' });
}