// // random 1 số ngẫu nhiên từ min tới max
// function randomIntFromInterval(min, max) { // min and max included 
// 	return Math.floor(Math.random() * (max - min + 1) + min);
// }

// // random array số ngẫu nhiên không trùng nhau
// for (var a = [], i = 0; i < 10; ++i) a[i] = i;
// function shuffle(array) {
// 	var tmp, current, top = array.length;
// 	if (top) while (--top) {
// 		current = Math.floor(Math.random() * (top + 1));
// 		tmp = array[current];
// 		array[current] = array[top];
// 		array[top] = tmp;
// 	}
// 	return array;
// }
// a = shuffle(a);


// randomArray = (length, max) => [...new Array(length)]
// 	.map(() => Math.round(Math.random() * max));


// // If you need it with random unique values from 0...length range: (thay đổi length ở for)
// const randomRange = length => {
// 	const results = []
// 	const possibleValues = Array.from({ length }, (value, i) => i)
// 	for (let i = 0; i < length; i += 1) {
// 		const possibleValuesRange = length - (length - possibleValues.length)
// 		const randomNumber = Math.floor(Math.random() * possibleValuesRange)
// 		const normalizedRandomNumber = randomNumber !== possibleValuesRange ? randomNumber : possibleValuesRange
// 		const [nextNumber] = possibleValues.splice(normalizedRandomNumber, 1)
// 		results.push(nextNumber)
// 	}
// 	return results
// }

// randomRange(5) // [3, 0, 1, 4, 2]

// const thoiGianBatDau = '2020-07-09 01:42 UTC+7'
// const thoiGianKetThuc = '2020-07-19 01:42 UTC+7'

// console.log(new Date(thoiGianBatDau))
// console.log(new Date(thoiGianKetThuc))


// //#region nested array object
// var answers = [
//   [{
//     "code": "Q01"
//   }, {
//     "code": "Q02"
//   }],
//   [{
//     "code": "Q03",
//     "answer": "d",
//     "star": "on"
//   }, {
//     "code": "Q04",
//     "answer": "d",
//     "star": "on"
//   }],
//   [{
//     "code": "Q05"
//   }, {
//     "code": "Q06"
//   }],
//   [{
//     "code": "Q07"
//   }, {
//     "code": "Q08"
//   }],
//   [{
//     "code": "Q09"
//   }, {
//     "code": "Q10"
//   }],
//   [{
//     "code": "Q11"
//   }, {
//     "code": "Q12"
//   }],
//   [{
//     "code": "Q13"
//   }, {
//     "code": "Q14"
//   }],
//   [{
//     "code": "Q15"
//   }, {
//     "code": "Q16"
//   }]
// ]

// var merged = []

// for (let i = 0; i < answers.length; i++) {
//   const item = answers[i];
//   // console.log(item, item.length);
//   // console.log(item.length);
//   if (item.length > 0) {
//     for (const iterator of item) {
//       merged.push(iterator)
//     }
//   }
// }

// console.log(merged)
// //#endregion