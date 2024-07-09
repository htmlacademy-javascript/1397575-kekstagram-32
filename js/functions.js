// Функция для проверки длины строки.

const checkLengthString = (string, maxLength) => string.length <= maxLength;

checkLengthString('проверяемая строка', 20); // true
checkLengthString('проверяемая строка', 18); // true
checkLengthString('проверяемая строка', 10); // false

// для проверки
// console.log(checkLengthString('проверяемая строка', 20)); // true
// console.log(checkLengthString('проверяемая строка', 18)); // true
// console.log(checkLengthString('проверяемая строка', 10)); // false

// Функция для проверки, является ли строка палиндромом

function isPalindrome (string) {
  const inputString = string.toLowerCase(). replaceAll(' ', '');
  let reverseString = '';

  for (let i = inputString.length - 1; i >= 0; i--) {
    reverseString += inputString[i];
  }

  return reverseString === inputString;
}

isPalindrome('топот'); // true
isPalindrome('ДовОд'); // true
isPalindrome('Кекс'); // false
isPalindrome('Лёша на полке клопа нашёл '); // true

// для проверки
// console.log(isPalindrome('топот')); // true
// console.log(isPalindrome('ДовОд')); // true
// console.log(isPalindrome('Кекс')); // false
// console.log(isPalindrome('Лёша на полке клопа нашёл ')); // true

// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN:

function extractNumber(value) {
  const str = typeof value === 'number' ? value.toString() : value;
  let result = '';
  for (let i = 0; i < str.length; i++) {
    if (!Number.isNaN(parseInt(str[i], 10))) {
      result += str[i];
    }
  }
  return parseInt(result, 10);
}

extractNumber('2023 год'); // 2023
extractNumber('ECMAScript 2022'); // 2022
extractNumber('1 кефир, 0.5 батона'); // 105
extractNumber('агент 007'); // 7
extractNumber('а я томат'); // NaN
extractNumber(2023); // 2023
extractNumber(-1); // 1
extractNumber(1.5); // 15

// для проверки
// console.log(extractNumber('2023 год'));            // 2023
// console.log(extractNumber('ECMAScript 2022'));     // 2022
// console.log(extractNumber('1 кефир, 0.5 батона')); // 105
// console.log(extractNumber('агент 007'));           // 7
// console.log(extractNumber('а я томат'));           // NaN
// console.log(extractNumber(2023)); // 2023
// console.log(extractNumber(-1));   // 1
// console.log(extractNumber(1.5));  // 15

// Делу — время
// функция возвращает время в минутах
const getTimeInMinute = (time) => {
  const [hours, minutes] = time.split(':'); // получаем массив ['часы', 'минуты']
  return Number(hours) * 60 + Number(minutes); // число минут относительно начала дня (0:00)
};

const getTimeWork = (timeDayStart, timeDayEnd, timeMeetingStart, durationMeeting) => {
  const timeMeetingEnd = getTimeInMinute(timeMeetingStart) + durationMeeting;
  return getTimeInMinute(timeMeetingStart) >= getTimeInMinute(timeDayStart) && timeMeetingEnd <= getTimeInMinute(timeDayEnd);
};

getTimeWork('08:00', '17:30', '14:00', 90);
getTimeWork('8:0', '10:0', '8:0', 120);
getTimeWork('08:00', '14:30', '14:00', 90);
getTimeWork('14:00', '17:30', '08:0', 90);
getTimeWork('8:00', '17:30', '08:00', 900);


// console.log(getTimeWork('08:00', '17:30', '14:00', 90)); // true
// console.log(getTimeWork('8:0', '10:0', '8:0', 120)); // true
// console.log(getTimeWork('08:00', '14:30', '14:00', 90)); // false
// console.log(getTimeWork('14:00', '17:30', '08:0', 90)); // false
// console.log(getTimeWork('8:00', '17:30', '08:00', 900)); // false
