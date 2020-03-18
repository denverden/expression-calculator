function calculation(str) {
	//разбиваем строку на массив
	str.trim().split(' ').length == 1 ? arr = str.trim().split('') : arr = str.trim().split(' ');

	//вычисляем, с каждой итерацией упрощаем
	let i = 1;
	while(i < arr.length) {
		if (arr[i] == '+' && arr[i + 2] != '*' && arr[i + 2] != '/') {
            arr[i + 1] = +arr[i - 1] + +arr[i + 1];
            arr.splice(i - 1, 2); 
            i = 1;
        } else if (arr[i] == '-' && arr[i + 2] != '*' && arr[i + 2] != '/' ) {
            arr[i + 1] = +arr[i - 1] - +arr[i + 1];
            arr.splice(i - 1, 2); 
            i = 1;
        } else if (arr[i] == '*') {
            arr[i + 1] = +arr[i - 1] * +arr[i + 1];
            arr.splice(i - 1, 2); 
            i = 1; 
        } else if (arr[i] == '/' && +arr[i + 1] != 0) {
            arr[i + 1] = +arr[i - 1] / +arr[i + 1];
            arr.splice(i - 1, 2); 
            i = 1; 
        } else if (arr[i] == '/' && +arr[i + 1] == 0) {
            throw new Error("TypeError: Division by zero.");
        } else i += 2;
	}
	return arr[0];
}

function expressionCalculator(expr) {
	//Желательно было бы взять проверку скобок из задачи JS: Brackets, для этой задачи достаточно совпадения количества скобок
    if(expr.split('(').length == expr.split(')').length) {
		//раскрываем скобки, стремимся к простому выражению
		while(expr.match(/\([^\(\)]+\)/g) !== null) {
			//расскрываем нижний уровень скобок, вычисляем значение, заменяем выражение в скобках на результат. Повторяем пока не расскроем все скобки.
			expr.match(/\([^\(\)]+\)/g).map(el => expr = expr.replace(el, String(calculation(el.replace(/[\(\)]/g, '')))));
		}
		return calculation(expr);
	} else throw new Error('ExpressionError: Brackets must be paired');
}

module.exports = {
    expressionCalculator
}