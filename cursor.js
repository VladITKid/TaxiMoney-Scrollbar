// Создание блока для визуальных эффектов
const createCursorClickEffect = document.createElement('div');
createCursorClickEffect.className = 'cursor-click-effect';
document.body.appendChild(createCursorClickEffect);
const cursorClickEffect = document.querySelector('.cursor-click-effect');
// Создание вспомогательного блока
const createCursorClickEffectPart = document.createElement('div');
createCursorClickEffectPart.className = 'cursor-click-effect-part';
document.body.appendChild(createCursorClickEffectPart);
const cursorClickEffectPart = document.querySelector('.cursor-click-effect-part');

// Время активности визуальных эффектов
const cursorClickEffectTimeout = 1000; // Таймаут для анимации визуального эффекта
let animationTimeout; // Переменная для хранения таймаута анимации

// * Модификаторы кнопок для визуальных эффектов
// Для покупки
const btnsEffectMoney = document.querySelectorAll('.btn--effect-money');
const btnsEffectGems = document.querySelectorAll('.btn--effect-gems');
// Для такси
const btnsEffectWheel = document.querySelectorAll('.btn--effect-wheel');
const btnsEffectScrews = document.querySelectorAll('.btn--effect-screws');
const btnsEffectSpeedometer = document.querySelectorAll('.btn--effect-speedometer');
const btnsEffectSpray = document.querySelectorAll('.btn--effect-spray');
const btnsEffectUp = document.querySelectorAll('.btn--effect-up');
// Для добычи руды
const btnsEffectCracks = document.querySelectorAll('.btn--effect-cracks');
const btnsEffectOre = document.querySelectorAll('.btn--effect-ore');

// Массив с ключевыми словами эффектов
const cursorClickEffectNames = [
    // Для покупки
    'money',
    'gems',
    // Для такси
    'wheel',
    'speedometer',
    'screws',
    'spray',
    'up',
    // Для добычи руды
    'cracks',
    'ore'
]

function cursorClickEffectFunction(blockName) {
    document.addEventListener('DOMContentLoaded', () => {
        // * Функция для обновления позиции блока эффектов относительно положения поинтера
        function updateCursorPosition(e) {
            const cursorPosition = { x: e.clientX, y: e.clientY };
            blockName.style.left = `${cursorPosition.x}px`;
            blockName.style.top = `${cursorPosition.y}px`;
        }
    
        // * Функция состояний визуального эффекта и вспомогательного блока
        function changeCursorState(effectName, action) {
            // Удаляем все возможные классы эффектов
            cursorClickEffectNames.forEach(effect => {
                blockName.classList.remove(`cursor-click-effect--active-${effect}`);
            });
    
            // Условие активации/деактивации
            if (action === 'activation') {
                blockName.classList.remove('cursor-click-effect--inactive');
                blockName.classList.add(`cursor-click-effect--active-${effectName}`);
            } else if (action === 'deactivation') {
                blockName.classList.add('cursor-click-effect--inactive');
            }
        }
    
        // * Основная функция
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
        // Для покупки
        addCursorClickEffect(btnsEffectMoney, cursorClickEffectNames[0]);
        addCursorClickEffect(btnsEffectGems, cursorClickEffectNames[1]);
        // Для такси
        addCursorClickEffect(btnsEffectWheel, cursorClickEffectNames[2]);
        addCursorClickEffect(btnsEffectSpeedometer, cursorClickEffectNames[3]);
        addCursorClickEffect(btnsEffectScrews, cursorClickEffectNames[4]);
        addCursorClickEffect(btnsEffectSpray, cursorClickEffectNames[5]);
        addCursorClickEffect(btnsEffectUp, cursorClickEffectNames[6]);
        // Для добычи руды
        addCursorClickEffect(btnsEffectCracks, cursorClickEffectNames[7]);
        addCursorClickEffect(btnsEffectOre, cursorClickEffectNames[8]);
    
        // Инициализация позиции курсора при загрузке
        changeCursorState('', 'deactivation');
    });
    
};
cursorClickEffectFunction(cursorClickEffect);
cursorClickEffectFunction(cursorClickEffectPart);