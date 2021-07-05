/* Список нерешенных багов:
	- после очистки остаются старые числа вместо нулей
	- нету поля с инфой о последнем заказе lastOrder


/* ОФОРМЛЕНИЕ СТРАНИЦЫ, АНИМАЦИИ И Т,Д, */

const textLogo = document.querySelector('.text_logo'); // AP_SOLUTION
const orderNumber = document.querySelector('.order_numb'); // Номер заказа инпут

/* КАЛЬКУЛЯЦИЯ - ПОЛЯ, СЕЛЕКТЫ, КНОПКИ И ТЕХ.ПЕРЕМЕННЫЕ */

const paymentMethod = document.querySelector('.payment_method'); // Способ оплаты
const moneyToPay = document.querySelector('.money_to_pay'); // Денег нужно сдать
const moneyInner = document.querySelector('.money_inner'); // Оставил клиент включая чай и разменку
const change = document.querySelector('.change'); // Разменка
const tip = document.querySelector('.tip'); // Чай
const totalOrders = document.querySelector('.total_orders'); // Всего заказов
const submitBtn = document.querySelector('.submit_btn'); // Кнопка отправки данных
const clearBtn = document.querySelector('.clear_btn'); // clearBtn он и в Индии clearBtn
const cancelBtn = document.querySelector('.cancel_btn'); // Показывает последний заказ

/* ВЫВОД ИНФОРМАЦИИ */

const outputs = document.querySelectorAll('.output_input');
const cashDaily = outputs[0]; // Промежуточный подсчет наличных
const cardDaily = outputs[1]; // Промежуточный подсчет оплаченых картой
const paidDaily = outputs[2]; // Промежуточный подсчет портмоне, оплаченые на сайте
const tipDaily = outputs[3]; // Всего чаевых
const changeDaily = outputs[4]; // Всего взято денег на сдачу


window.addEventListener('DOMContentLoaded', () => {

	// Достаём данные из localStorage

		let totalCashLS = +localStorage.getItem('TOTALCASH'); 
		let totalCardLS = +localStorage.getItem('TOTALCARD');
		let totalPaidLS = +localStorage.getItem('TOTALPAID');
		let totalTipLS = +localStorage.getItem('TOTALTIP');
		let totalChangeLS = +localStorage.getItem('TOTALCHANGE');
		let totalOrdersLS = +localStorage.getItem('TotalOrders');

		orderNumber.value = totalOrdersLS + 1;

	// Вывод на output текущих сумм из localStorage

	cashDaily.value = totalCashLS.toFixed(2);
	cardDaily.value = totalCardLS.toFixed(2);
	paidDaily.value = totalPaidLS.toFixed(2);
	tipDaily.value = totalTipLS.toFixed(2);
	changeDaily.value = totalChangeLS.toFixed(2);
	totalOrders.value = totalOrdersLS;

	// Этот блок автоматизирует заполнение полей. Костылями, но работает.

	moneyToPay.oninput = () => {
		moneyInner.value = moneyToPay.value;
	}
	moneyInner.oninput = () => {
		tip.value = (moneyInner.value - moneyToPay.value - change.value).toFixed(2);
	}
	change.oninput = () => {
		tip.value = (moneyInner.value - moneyToPay.value - change.value).toFixed(2);
	}

	// Жизнь после нажатия на submitButton

	submitBtn.addEventListener('click', () => {

		//console.log(totalChangeLS); // Чекпоинт, раскомментирую если что

		// Добро пожаловать в легаси код. Определяем метод оплаты:

		switch(paymentMethod.value) {
			case 'Наличными':
				totalCashLS += +moneyToPay.value; // Прием данных, добавляем к сумме
				cashDaily.value = totalCashLS.toFixed(2); // выводим на output
				localStorage.setItem('TOTALCASH', totalCashLS); // перезаписываем в localStorage
			break
			case 'Картой': // Ничего нового, всё так же
				totalCardLS += +moneyToPay.value;
				cardDaily.value = totalCardLS.toFixed(2);
				localStorage.setItem('TOTALCARD', totalCardLS);
			break
			case 'Оплачено': // Ты не поверишь...
				totalPaidLS += +moneyToPay.value;
				paidDaily.value = totalPaidLS.toFixed(2);
				localStorage.setItem('TOTALPAID', totalPaidLS);
			break
		}

		localStorage.setItem('LASTTOPAY', moneyToPay.value);
		localStorage.setItem('LASTINNER', moneyInner.value);
		localStorage.setItem('LASTCHANGE', change.value);
		localStorage.setItem('LASTTIP', tip.value);

		// Суммируем чаевые 

		totalTipLS += +tip.value;
		localStorage.setItem('TOTALTIP', totalTipLS);
		tipDaily.value = totalTipLS.toFixed(2);

		// И разменку

		totalChangeLS += +change.value;
		localStorage.setItem('TOTALCHANGE', totalChangeLS);
		changeDaily.value = totalChangeLS.toFixed(2);
		
		// Всего заказов

		if(moneyToPay.value != '') {
			totalOrdersLS++;
			totalOrders.value = totalOrdersLS;
			localStorage.setItem('TotalOrders', +totalOrdersLS);
		}
		orderNumber.value = totalOrdersLS + 1;
	});

	// Алла-я-в-бар по-программистски

	clearBtn.addEventListener('click', () => {
		let clearConfirm = confirm('Удалить всю историю?');

		if(clearConfirm) {
			console.log('pressed');
			localStorage.clear();
			alert('Данные удалены. Перезагрузите страницу')
		}
	});

	cancelBtn.addEventListener('click', () => {
		orderNumber.value = totalOrdersLS;
		moneyToPay.value = localStorage.getItem('LASTTOPAY');
		moneyInner.value = localStorage.getItem('LASTINNER');
		change.value = localStorage.getItem('LASTCHANGE');
		tip.value = localStorage.getItem('LASTTIP');

	})
});