var snakeGame = (function () {
    // Add event listener to document body for pressing arrow keys
    document.body.onkeyup = changeDirection;

    // Define class Position
    function Position(x, y) {
        this.x = x;
        this.y = y;
    }

    // Define possible directions and current (initial) direction as objects of type Position
    var directions = [new Position(1, 0), new Position(-1, 0), new Position(0, 1), new Position(0, -1)];
    var currentDirection = directions[0];

    // Define event function onkeyup and change current direction according to the pressed arrow key
    function changeDirection(event) {
        var keyCode = event.keyCode;
        if (keyCode == 37) {
            if (currentDirection != directions[0]) {
                currentDirection = directions[1];
            }
        }
        if (keyCode == 38) {
            if (currentDirection != directions[2]) {
                currentDirection = directions[3];
            }
        }
        if (keyCode == 39) {
            if (currentDirection != directions[1]) {
                currentDirection = directions[0];
            }
        }
        if (keyCode == 40) {
            if (currentDirection != directions[3]) {
                currentDirection = directions[2];
            }
        }
    }

    // Run the game
    function moveSnake() {
        // Define initial positions of food, snake and snake head
        var food = new Position(generateNumber(0, 24), generateNumber(0, 24));
        snake = [new Position(0, 0), new Position(1, 0), new Position(2, 0)];
        var snakeHead = new Position(3, 0);
        // Start the game
        var interval = setInterval(function () {
            // Check for game over
            var newSnakeHead = new Position(snakeHead.x + currentDirection.x, snakeHead.y + currentDirection.y);
            if (newSnakeHead.x >= 25 || newSnakeHead.x < 0 || newSnakeHead.y >= 25 || newSnakeHead.y < 0) {
                // Game is over
                clearInterval(interval);
                addToLocalStorage(snake);
                displayTopScores();
            }
            for (var count = 0; count < snake.length; count++) {
                if (snake[count].x == newSnakeHead.x && snake[count].y == newSnakeHead.y) {
                    // Game is over
                    clearInterval(interval);
                    addToLocalStorage(snake);
                    displayTopScores();
                }
            }

            // Move the snake
            snake.push(snakeHead);
            snakeHead = newSnakeHead;
            // Check is the food eaten
            if (snakeHead.x == food.x && snakeHead.y == food.y) {
                food = new Position(generateNumber(0, 24), generateNumber(0, 24));
            }
            else {
                snake.shift();
            }

            // Draw the game
            drawField();
            drawElement(food, 'red');
            for (var count = 0; count < snake.length; count++) {
                drawElement(snake[count], 'blue');
            }

            drawElement(snakeHead, 'green');
        }, 500);
    }

    // Generate random number in the interval [downLimit, upperLimit]
    function generateNumber(downLimit, upperLimit) {
        var number = 0;
        if (downLimit === 0) {
            number = Math.floor(Math.random() * (parseInt(upperLimit) + 1));
        }
        else if (downLimit === 1) {
            number = Math.floor((Math.random() * parseInt(upperLimit)) + 1);
        }
        else {
            number = downLimit + Math.floor(Math.random() * (parseInt(upperLimit) + 1));
        }

        return number;
    }

    // Create white field with blue borders
    function drawField() {
        var ctx = document.getElementsByTagName('canvas')[0].getContext('2d');
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'blue';
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.strokeRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    // Create colerad element field with white borders
    function drawElement(element, color) {
        var ctx = document.getElementsByTagName('canvas')[0].getContext('2d');
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'white';
        ctx.fillStyle = color;
        ctx.fillRect(element.x * 20, element.y * 20, 20, 20);
        ctx.strokeRect(element.x * 20, element.y * 20, 20, 20);
    }

    // Calculate the scores, ask for username and add it to local storage
    function addToLocalStorage(snake) {
        var score = snake.length + 1;
        var username = prompt('Your score (sec): ' + score + '\r\nPlease enter username');
        localStorage.setItem(username ? username : '[anonymous]', score);
        if (localStorage.length > 5) {
            var worstScorePlayer = localStorage.key(0);
            var worstScore = Number(localStorage.getItem(worstScorePlayer));
            for (var count = 1; count < localStorage.length; count++) {
                var key = localStorage.key(count);
                var value = Number(localStorage.getItem(key));
                if (value < worstScore) {
                    worstScore = value;
                    worstScorePlayer = key;
                }
            }

            localStorage.removeItem(worstScorePlayer);
        }
    }

    // Sort the results and show them
    function displayTopScores() {
        var topScores = sortTopScores();
        var table = generateTable(topScores);
        var div = document.createElement('div');
        div.id = 'list';
        div.appendChild(table);
        document.body.appendChild(div);
    }

    // Get the results from local storage and sort them
    function sortTopScores() {
        var topScores = [];
        if (localStorage.length && localStorage.length > 0) {
            for (var count = 0; count < localStorage.length; count++) {
                var key = localStorage.key(count);
                var value = Number(localStorage.getItem(key));
                topScores.push({ key: key, value: value });
            }

            topScores.sort(function (x, y) {
                return x.value - y.value;
            });
        }

        return topScores;
    }

    // Create a table with the sorted results
    function generateTable(topScores) {
        var table = document.createElement('table');
        table.style.margin = 'auto';
        if (topScores.length > 0) {
            generateRow(table, 'TOP RESULTS');
        }

        for (var count = 0; count < topScores.length; count++) {
            generateRow(table, topScores[count].key + ' ' + topScores[count].value);
        }

        return table;
    }

    // Create a row of the table
    function generateRow(table, text) {
        var row = document.createElement('tr');
        var data = document.createElement('td');
        data.innerHTML = text;
        row.appendChild(data);
        table.appendChild(row);
    }

    return {
        moveSnake: moveSnake
    };
})();