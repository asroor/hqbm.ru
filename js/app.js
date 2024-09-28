const accordionBody = document.querySelector('.accordion-body');
const accordionBtn = document.querySelector('.accordion-btn');
function togleAccording() {
	if (accordionBody.classList.contains('open')) {
		accordionBody.classList.remove('open');
		accordionBody.style.maxHeight = '0';
		accordionBtn.style.transform = 'rotate(0deg)'
	} else {
		accordionBody.classList.add('open');
		accordionBody.style.maxHeight = accordionBody.scrollHeight + 'px';
		accordionBtn.style.transform = 'rotate(-45deg)'
	}
}

const productModal = document.querySelectorAll('.modal-body');
const modalContent = document.querySelector('.modal-container');
const body = document.querySelector('body');
const closeBtn = document.querySelectorAll('.close-btn')
function openModal(num) {
	productModal.forEach(item => {
		item.style.display = 'none';
	})
	productModal.forEach(item => {
		let productNum = item.getAttribute('product-num');
		modalContent.classList.add('show');
		body.style.overflow = 'hidden';
		if (num == productNum) {
			item.style.display = 'block';
		}
	});
}

closeBtn.forEach(item => {
	item.addEventListener('click', () => {
		modalContent.classList.remove('show');
		body.style.overflow = 'auto';
	});
})