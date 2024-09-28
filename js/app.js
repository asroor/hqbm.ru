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