// Простой скрипт для табов инфраструктуры
(function() {
    'use strict';
    
    // Ждем загрузки DOM
    function ready(fn) {
        if (document.readyState != 'loading'){
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }
    
    ready(function() {
        console.log('Simple infrastructure script loaded');
        
        // Находим все элементы
        var districtBtn = document.querySelector('button[data-tab="district"]');
        var dormitoryBtn = document.querySelector('button[data-tab="dormitory"]');
        var districtContent = document.getElementById('district-content');
        var dormitoryContent = document.getElementById('dormitory-content');
        
        if (!districtBtn || !dormitoryBtn || !districtContent || !dormitoryContent) {
            console.error('Required elements not found');
            return;
        }
        
        // Функция переключения
        function switchToDistrict() {
            console.log('Switching to district');
            districtBtn.classList.add('active');
            dormitoryBtn.classList.remove('active');
            districtContent.style.display = 'block';
            dormitoryContent.style.display = 'none';
            districtContent.classList.add('active');
            dormitoryContent.classList.remove('active');
        }
        
        function switchToDormitory() {
            console.log('Switching to dormitory');
            dormitoryBtn.classList.add('active');
            districtBtn.classList.remove('active');
            dormitoryContent.style.display = 'block';
            districtContent.style.display = 'none';
            dormitoryContent.classList.add('active');
            districtContent.classList.remove('active');
        }
        
        // Привязываем события
        districtBtn.onclick = switchToDistrict;
        dormitoryBtn.onclick = switchToDormitory;
        
        // Устанавливаем начальное состояние
        switchToDistrict();
        
        console.log('Tab handlers attached successfully');
    });
})(); 