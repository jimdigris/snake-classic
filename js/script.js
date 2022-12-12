'use strict';

(function () {
    class Canvas {                                                                                      // класс для Холстов
        #element = null;                                                                                // холст
        #context = null;                                                                                // контекст

        constructor(parent, id, width, height) {
            this.parent = parent;                                                                       // родительский элемент
            this.id = id;                                                                               // идентификатор
            this.width = width;                                                                         // ширина
            this.height = height;                                                                       // высота
        }

        #createCanvas() {                                                                               // создать холст
            let parent = document.querySelector(`${this.parent}`);                                      // получить родительский элемент
            let element = document.createElement('canvas');                                             // создать элемент холста
            element.setAttribute('id', this.id);                                                        // присвоить id      
            element.setAttribute('width', this.width);                                                  // задать ширину     
            element.setAttribute('height', this.height);                                                // задать высоту     
            parent.prepend(element);                                                                    // добавить в родителя
        }
        #receiveCanvas() { this.#element = document.querySelector(`${this.id}`); }                      // получить холст
        #defineCanvas() { this.#context = this.#element.getContext("2d"); }                             // определить контекст    

        draw() {                                                                                        // отрисовать холст
            this.#createCanvas();                                                                       // создать холст
            this.#receiveCanvas();                                                                      // получить холст
            this.#defineCanvas();                                                                       // определить контекст
            return this.#context;
        }
    }

    class Snake {                                                                                       // класс для Змеи
        speedCount = 0;                                                                                 // счетчик для регулирования скорости

        constructor(size, headColor, bodyColor, x, y, speed, direction) {
            this.size = size;                                                                           // размер однойго блока тела
            this.headColor = headColor;                                                                 // цвет тела
            this.bodyColor = bodyColor;                                                                 // цвет головы
            this.coordinates = [[x, y], [x, y + size], [x, y + size * 2]];                              // координаты частей тела (0 й - голова)                            
            this.speed = speed;                                                                         // скорость движения
            this.direction = direction;                                                                 // направление движения
        }

        draw(eating) {                                                                                  // отрисовать змею
            if (eating) { ctx.shadowBlur = 20; eating = false; } else { ctx.shadowBlur = 4; }           // размытие тени головы (увеличивается если змея ест)           
            ctx.shadowColor = "#6a2957";                                                                // цвет тени
            ctx.fillStyle = this.headColor;                                                             // задать цвет головы
            ctx.fillRect(this.coordinates[0][0], this.coordinates[0][1], this.size, this.size);         // отрисовываем голову

            ctx.shadowBlur = 4;                                                                         // размытие тени тела
            ctx.fillStyle = this.bodyColor;                                                             // задать цвет тела
            for (let i = 1; i < this.coordinates.length; i++) {                                         // отрисовываем тело
                ctx.fillRect(this.coordinates[i][0], this.coordinates[i][1], this.size, this.size);
            }
        }

        determineDirection(event) {                                                                     // определить направление движения
            if (!gameStatus.pressingButton) {                                                           // если кнопка еще не была нажата
                switch (event.code) {
                    case 'KeyW': if (this.direction != 'down') { this.direction = 'up'; } break;
                    case 'KeyS': if (this.direction != 'up') { this.direction = 'down'; } break;
                    case 'KeyA': if (this.direction != 'right') { this.direction = 'left'; } break;
                    case 'KeyD': if (this.direction != 'left') { this.direction = 'right'; } break;
                }
                gameStatus.pressingButton = true;                                                       // отметить что кнопка вв текущем цикле была нажата
            }
        }

        performMovement() {                                                                             // изменение координат при движении
            for (let i = this.coordinates.length - 1; i > 0; i--) {                                     // сменим координаты частей тела
                this.coordinates[i][0] = this.coordinates[i - 1][0];                                    // x
                this.coordinates[i][1] = this.coordinates[i - 1][1];                                    // y
            }

            switch (this.direction) {                                                                   // сменим координаты головы, в зависимости от направления
                case 'up': this.coordinates[0][1] -= this.size; break;                                  // y
                case 'down': this.coordinates[0][1] += this.size; break;                                // y
                case 'left': this.coordinates[0][0] -= this.size; break;                                // x
                case 'right': this.coordinates[0][0] += this.size; break;                               // x
            }
        }

        performCoordinateCorrection() {                                                                 // коррекция координат головы (выход за край слоя)
            if (this.coordinates[0][0] < 0) { this.coordinates[0][0] = canva.width - this.size; }       // выход за левый край
            if (this.coordinates[0][0] >= canva.width) { this.coordinates[0][0] = 0; }                  // выдод за правый край
            if (this.coordinates[0][1] < 0) { this.coordinates[0][1] = canva.height - this.size; }      // выход за верхний край
            if (this.coordinates[0][1] >= canva.height) { this.coordinates[0][1] = 0; }                 // выход за нижний край
        }

        checkingSnakeEatingFood(meal) {                                                                 // змея ест еду
            if ((this.coordinates[0][0] == meal.x) && (this.coordinates[0][1] == meal.y)) {             // если координаты головы и еды совпадают
                this.draw(true);                                                                        // отрисовать змею с увеличением свечения головы
                meal.generateCoordinate();                                                              // сгенерировать координаты новой еды
                this.enlargeBody();                                                                     // увеличить тело змеи 
                increaseNumberPoints();                                                                 // увеличить кол-во очков
                victoryCheck();                                                                         // проверить на победу
            }
        }

        enlargeBody() { this.coordinates.push([0, 0]); }                                                // увеличить тело змеи

        trackCollision() {                                                                              // отследить столкновение головы и тела
            for (let i = 1; i < this.coordinates.length; i++) {                                         // перебор координат тела змеи
                if ((this.coordinates[0][0] == this.coordinates[i][0])                                  // если совпадает с координатами головы
                    && (this.coordinates[0][1] == this.coordinates[i][1])) {
                    gameStatus.condition = 'stop';                                                      // сменить статус игры
                    gameStatus.message = 'Вы проиграли :(';                                             // задать текст сообщение
                    break;
                }
            }
        }
    }

    class Food {                                                                                        // класс для Еды
        x = 0;
        y = 0;

        constructor(size, color) {
            this.size = size;                                                                           // размер
            this.color = color;                                                                         // цвет  
        }

        draw() {                                                                                        // отрисовать еду
            ctx.shadowBlur = 4;                                                                         // размытие тени
            ctx.shadowColor = "#2e4e25";                                                                // цвет тени
            ctx.fillStyle = this.color;                                                                 // задать цвет еды
            ctx.fillRect(this.x, this.y, this.size, this.size);                                         // отрисовать
        }

        generateCoordinate() {                                                                          // сгенерировать координаты еды
            this.x = generate(canva.width);                                                             // генерируем x
            this.y = generate(canva.height);                                                            // генерируем y

            function generate(side) {
                let coordinate = Math.floor(Math.random() * side);                                      // генерация
                let correction = coordinate % snake.size;                                               // сдвиг координаты для коррекции   
                if (correction != 0) { coordinate -= correction; }                                      // коррекция
                return coordinate;
            }

            for (let i = 0; i < snake.coordinates.length; i++) {                                        // перебор координат тела змеи
                if ((snake.coordinates[i][0] == this.x) && (snake.coordinates[i][1] == this.y)) {       // если совпадает с координатами еды
                    this.generateCoordinate();                                                          // новая генерация координат еды
                    break;
                }
            }
        }
    }

    // ! -----------------------------------------------------------

    let canva, ctx, snake, food;                                                                        // элементы игры
    let gameStatus = {                                                                                  // значения игровых параметров
        condition: 'play',                                                                              // запущенна или нет игра
        message: '',                                                                                    // сообщение
        pressingButton: false,                                                                          // была ли нажата кнопка в текущем цикле
        stepElement: document.querySelector('.game__info-step'),                                        // слой с отображение результата
        pointsElement: document.querySelector('.game__info-points'),                                    // слой с отображение результата
        step: 0,                                                                                        // шагов (циклов) игры
        points: 0                                                                                       // очки (собранная еда)
    }

    // ! -----------------------------------------------------------

    document.addEventListener("DOMContentLoaded", () => {                                               // загрузка страницы
        addEventListener("keypress", (event) => { snake.determineDirection(event); });                  // отслеживание нажатие кнопок

        canva = new Canvas('.game', 'canvas', 400, 400);                                                // создать экземпляр холста
        snake = new Snake(20, '#d00077', '#a60561', 140, 240, 10, 'up');                                // создать экземпляр змеи
        food = new Food(20, '#096329');                                                                 // создать экземпляр еды
        ctx = canva.draw();                                                                             // отрисовать холст
        snake.draw();                                                                                   // отрисовать змею
        food.generateCoordinate();                                                                      // сгенерировать координаты еды        
        food.draw();                                                                                    // отрисовать еду        
        executeLifeCycle();                                                                             // выполнить первый жизненный цикл
    });

    // ! -----------------------------------------------------------   

    function executeLifeCycle() {                                                                       // выполнить один жизненный цикл
        if (snake.speedCount++ > snake.speed) {                                                         // регулеровка скорости 
            snake.speedCount = 0;                                                                       // сбросить счетчик холостых циклов
            ctx.clearRect(0, 0, canva.width, canva.height);                                             // очистка холста            
            snake.performMovement();                                                                    // изменение координат змеи
            snake.performCoordinateCorrection();                                                        // коррекция координат змеи
            snake.draw();                                                                               // отрисовка змеи
            food.draw();                                                                                // отрисовка еды

            snake.checkingSnakeEatingFood(food);                                                        // проверка - змея ест еду
            snake.trackCollision();                                                                     // отследить столкновение головы и тела

            gameStatus.pressingButton = false;                                                          // сбросить статус нажатоой кнопки
            increaseNumberSteps();                                                                      // увеличить кол-во пройденных шагов
        }

        if (gameStatus.condition === 'play') { window.requestAnimationFrame(executeLifeCycle); }        // выполнить следующий жизненный цикл 
        else { setTimeout(displayMessage, 500); }                                                       // или отобразим сообщение
    }

    function increaseNumberSteps() {                                                                    // увеличить кол-во пройденных шагов
        gameStatus.step++;                                                                              // увеличить
        gameStatus.stepElement.textContent = gameStatus.step;                                           // отобразить
    }

    function increaseNumberPoints() {                                                                   // увеличить кол-во очков
        gameStatus.points++;                                                                            // увеличить
        gameStatus.pointsElement.textContent = gameStatus.points;                                       // отобразить
    }

    function displayMessage() {                                                                         // отобразить сообщение
        ctx.clearRect(0, 0, canva.width, canva.height);                                                 // очистка холста
        ctx.textAlign = "center";                                                                       // настройки стилей текста
        ctx.fillStyle = food.color;
        ctx.font = "30px Lena";
        ctx.fillText(gameStatus.message, canva.width / 2, canva.height / 2);

        ctx.fillStyle = snake.bodyColor;
        ctx.font = "14px Lena";
        ctx.fillText('чтобы начать заново, нажмите F5', canva.width / 2, canva.height / 2 + 30);
    }

    function victoryCheck() {                                                                           // проверка победы
        let winPoints = (canva.width / snake.size) * (canva.height / snake.size) - 3;                   // необходимое кол-во очков

        if (gameStatus.points == winPoints) {                                                           // если достигнуто
            gameStatus.condition = 'stop';                                                              // остановить игру
            gameStatus.message = 'Вы выиграли! :)';                                                     // отобразить сообщение
        }
    }
})();