const accordionBody = document.querySelector('.accordion-body');
const accordionBtn = document.querySelector('.accordion-btn');
const addBasketBtn = document.querySelectorAll('button.add-basket');
const productModal = document.querySelectorAll('.modal-body');
const modalContent = document.querySelector('.modal-container');
const body = document.querySelector('body');
const closeBtn = document.querySelectorAll('.close-btn')
const basketModalContainer = document.querySelector('.basket-modal-container');


//========== Функция переключает состояние аккордеона ==============
function togleAccording() {
	if (accordionBody.classList.contains('open')) {
		accordionBody.classList.remove('open'); // Закрыть аккордеон
		accordionBody.style.maxHeight = '0'; // Установить высоту 0 для скрытия
		accordionBtn.style.transform = 'rotate(0deg)'; // Повернуть кнопку обратно
	} else {
		accordionBody.classList.add('open'); // Открыть аккордеон
		accordionBody.style.maxHeight = accordionBody.scrollHeight + 'px'; // Установить максимальную высоту для показа содержимого
		accordionBtn.style.transform = 'rotate(-45deg)'; // Повернуть кнопку на -45 градусов
	}
}

// ==========Функция открывает модальное окно по номеру продукта ============
function openModal(num) {
	productModal.forEach(item => {
		item.style.display = 'none'; // Скрыть все модальные окна
	})
	productModal.forEach(item => {
		let productNum = item.getAttribute('product-num'); // Получить номер продукта
		modalContent.classList.add('show'); // Показать контент модального окна
		body.style.overflow = 'hidden'; // Отключить прокрутку страницы
		if (num == productNum) {
			item.style.display = 'block'; // Показать нужное модальное окно
		}
	});
}

// ============ По клику на кнопку добавления в корзину открывается модальное окно корзины ====================
addBasketBtn.forEach((item) => {
	item.addEventListener('click', () => {
		modalContent.classList.remove('show'); // Скрыть текущее модальное окно
		basketModalContainer.classList.add('show'); // Показать модальное окно корзины
	});
})


// =========== По клику на кнопку закрытия скрываются все модальные окна и возвращается прокрутка страницы ===========
closeBtn.forEach(item => {
	item.addEventListener('click', () => {
		modalContent.classList.remove('show'); // Скрыть контент модального окна
		basketModalContainer.classList.remove('show'); // Скрыть модальное окно корзины
		body.style.overflow = 'auto'; // Включить прокрутку страницы
	});
})
