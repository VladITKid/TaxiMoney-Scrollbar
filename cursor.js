// Создание блока для визуальных эффектов
const createCursorClickEffect = document.createElement('div');
createCursorClickEffect.className = 'cursor-click-effect';
document.body.appendChild(createCursorClickEffect);

const btnsEffectMoney = document.querySelectorAll('.btn--effect-money');
const btnsEffectScrews = document.querySelectorAll('.btn--effect-screws');
const btnsEffectWheel = document.querySelectorAll('.btn--effect-wheel');
const btnsEffectSpeedometer = document.querySelectorAll('.btn--effect-speedometer');

document.addEventListener('DOMContentLoaded', () => {
    const cursorClickEffect = document.querySelector('.cursor-click-effect');
    const cursorClickEffectTimeout = 1000; // Таймаут для анимации визуального эффекта
    let animationTimeout; // Переменная для хранения таймаута анимации

    // Функция для обновления позиции блока эффектов относительно положения поинтера
    function updateCursorPosition(e) {
        const cursorPosition = { x: e.clientX, y: e.clientY };
        cursorClickEffect.style.left = `${cursorPosition.x}px`;
        cursorClickEffect.style.top = `${cursorPosition.y}px`;
    }

    // Функция состояний визуального эффекта
    function changeCursorState(effectName, action) {
        // Удаляем все возможные классы эффектов
        const effects = ['money', 'screws', 'wheel', 'speedometer'];
        effects.forEach(effect => {
            cursorClickEffect.classList.remove(`cursor-click-effect--active-${effect}`);
        });

        if (action === 'activation') {
            cursorClickEffect.classList.remove('cursor-click-effect--inactive');
            cursorClickEffect.classList.add(`cursor-click-effect--active-${effectName}`);
        } else if (action === 'deactivation') {
            cursorClickEffect.classList.add('cursor-click-effect--inactive');
        }
    }

    // Основная функция
    function cursorClickEffectAnimation(effectName) {
        return function (e) {
            // Останавливаем текущую анимацию и сбрасываем таймаут
            clearTimeout(animationTimeout);

            // Обновляем позицию на месте клика
            updateCursorPosition(e);
            changeCursorState(effectName, 'activation');

            // Устанавливаем новый таймаут для сброса анимации
            animationTimeout = setTimeout(() => {
                changeCursorState(effectName, 'deactivation');
            }, cursorClickEffectTimeout);
        };
    }

    // Функция-шаблон применения Основной функции
    function addCursorClickEffect(elementName, effectName) {
        elementName.forEach(
            btn => btn.addEventListener('click', cursorClickEffectAnimation(effectName))
        );
    }

    addCursorClickEffect(btnsEffectMoney, 'money');
    addCursorClickEffect(btnsEffectScrews, 'screws');
    addCursorClickEffect(btnsEffectWheel, 'wheel');
    addCursorClickEffect(btnsEffectSpeedometer, 'speedometer');

    // Инициализация позиции курсора при загрузке
    changeCursorState('', 'deactivation');
});
