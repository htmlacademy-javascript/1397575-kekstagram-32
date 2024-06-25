// Функция для проверки длины строки.

function checkLengthString (string, maxLength) {
  return string.length <= maxLength;
}

checkLengthString('проверяемая строка', 20); // true
checkLengthString('проверяемая строка', 18); // true
checkLengthString('проверяемая строка', 10); // false

// Функция для проверки, является ли строка палиндромом

function isPalindrome (string) {
  const firstString = string.toLowerCase(). replaceAll(' ', '');
  let secondString = '';

  for (let i = firstString.length - 1; i >= 0; i--) {
    secondString += firstString[i];
  }

  return secondString === firstString;
}

isPalindrome('топот'); // true
isPalindrome('ДовОд'); // true
isPalindrome('Кекс'); // false
isPalindrome('Лёша на полке клопа нашёл '); // true
