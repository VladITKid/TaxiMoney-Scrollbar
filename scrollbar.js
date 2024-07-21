// todo: Добавить разметку кастомного скроллбара
// Создаём элементы
const scrollbarElem = document.createElement('div');
const thumbElem = document.createElement('div');
const thumbLightsElem = document.createElement('span');

// Устанавливаем классы
scrollbarElem.className = 'scrollbar';
thumbElem.className = 'scrollbar__thumb';
thumbLightsElem.className = 'scrollbar__thumb-lights';

// Строим структуру
thumbElem.appendChild(thumbLightsElem);
scrollbarElem.appendChild(thumbElem);

// Вставляем в body
document.body.appendChild(scrollbarElem);

// todo: Оживить кастомнный скроллбар
const wrapper = document.querySelector('.wrapper');
const scrollbar = document.querySelector('.scrollbar');
const thumb = document.querySelector('.scrollbar__thumb');
const thumbHeight = 60;

let maxThumbTop = scrollbar.clientHeight - thumbHeight;
let lastScrollTop = 0;

// Функция для обновления позиции "thumb"
function updateThumbPosition() {
    const isScrollable = wrapper.scrollHeight > wrapper.clientHeight;
    if (!isScrollable) {
        thumb.style.top = '0px';
        scrollbar.style.display = 'none'; // Скрываем скроллбар
        return;
    } else {
        scrollbar.style.display = 'block'; // Показываем скроллбар
    }

    const wrapperHeight = wrapper.scrollHeight - wrapper.clientHeight;
    const scrollFraction = wrapper.scrollTop / wrapperHeight;
    const thumbTop = scrollFraction * maxThumbTop;
    thumb.style.top = `${thumbTop}px`;

    // Определение направления скролла
    if (wrapper.scrollTop > lastScrollTop) {
        thumb.classList.add('scrollbar__thumb--scrolling-down');
        thumb.classList.remove('scrollbar__thumb--scrolling-up');
    } else if (wrapper.scrollTop < lastScrollTop) {
        thumb.classList.add('scrollbar__thumb--scrolling-up');
        thumb.classList.remove('scrollbar__thumb--scrolling-down');
    }

    // Добавление класса при скролле
    thumb.classList.add('scrollbar__thumb--scrolling');

    // Удаление класса через 100мс после скролла
    clearTimeout(thumb.removeScrollingClassTimeout);
    thumb.removeScrollingClassTimeout = setTimeout(() => {
        thumb.classList.remove('scrollbar__thumb--scrolling');
    }, 100);

    lastScrollTop = wrapper.scrollTop;
}

// Обновление положения "thumb" при прокрутке и изменении размеров окна
wrapper.addEventListener('scroll', updateThumbPosition);
window.addEventListener('resize', () => {
    maxThumbTop = scrollbar.clientHeight - thumbHeight; // Пересчитываем границы
    updateThumbPosition();
});

// Начальная установка позиции
updateThumbPosition();

// Перетаскивание "thumb"
let isDragging = false;
let startY, startTop;

thumb.addEventListener('mousedown', (e) => {
    const isScrollable = wrapper.scrollHeight > wrapper.clientHeight;
    if (!isScrollable) return;

    isDragging = true;
    startY = e.clientY;
    startTop = parseInt(window.getComputedStyle(thumb).top, 10);
    document.body.style.userSelect = 'none'; // Отключаем выделение текста
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.userSelect = ''; // Включаем выделение текста
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const deltaY = e.clientY - startY;
        let newTop = startTop + deltaY;

        // Ограничение положения "thumb" в пределах скроллбара
        if (newTop < 0) newTop = 0;
        if (newTop > maxThumbTop) newTop = maxThumbTop;

        thumb.style.top = `${newTop}px`;

        const scrollFraction = newTop / maxThumbTop;
        wrapper.scrollTop = scrollFraction * (wrapper.scrollHeight - wrapper.clientHeight);

        // Обновляем состояние "thumb" при перетаскивании
        if (wrapper.scrollTop > lastScrollTop) {
            thumb.classList.add('scrollbar__thumb--scrolling-down');
            thumb.classList.remove('scrollbar__thumb--scrolling-up');
        } else if (wrapper.scrollTop < lastScrollTop) {
            thumb.classList.add('scrollbar__thumb--scrolling-up');
            thumb.classList.remove('scrollbar__thumb--scrolling-down');
        }

        lastScrollTop = wrapper.scrollTop;
    }
});
