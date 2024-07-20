const content = document.getElementById('content');
const scrollbar = document.querySelector('.scrollbar');
const thumb = document.querySelector('.scrollbar__thumb');
const thumbHeight = 60;

let maxThumbTop = scrollbar.clientHeight - thumbHeight;
let lastScrollTop = 0;

// Функция для обновления позиции "thumb"
function updateThumbPosition() {
    const isScrollable = content.scrollHeight > content.clientHeight;
    if (!isScrollable) {
        thumb.style.top = '0px';
        scrollbar.style.display = 'none'; // Скрываем скроллбар
        return;
    } else {
        scrollbar.style.display = 'block'; // Показываем скроллбар
    }

    const contentHeight = content.scrollHeight - content.clientHeight;
    const scrollFraction = content.scrollTop / contentHeight;
    const thumbTop = scrollFraction * maxThumbTop;
    thumb.style.top = `${thumbTop}px`;

    // Определение направления скролла
    if (content.scrollTop > lastScrollTop) {
        thumb.classList.add('scrollbar__thumb--scrolling-down');
        thumb.classList.remove('scrollbar__thumb--scrolling-up');
    } else if (content.scrollTop < lastScrollTop) {
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

    lastScrollTop = content.scrollTop;
}

// Обновление положения "thumb" при прокрутке и изменении размеров окна
content.addEventListener('scroll', updateThumbPosition);
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
    const isScrollable = content.scrollHeight > content.clientHeight;
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
        content.scrollTop = scrollFraction * (content.scrollHeight - content.clientHeight);

        // Обновляем состояние "thumb" при перетаскивании
        if (content.scrollTop > lastScrollTop) {
            thumb.classList.add('scrollbar__thumb--scrolling-down');
            thumb.classList.remove('scrollbar__thumb--scrolling-up');
        } else if (content.scrollTop < lastScrollTop) {
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

        lastScrollTop = content.scrollTop;
    }
});
