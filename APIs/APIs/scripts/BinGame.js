var binGame = (function () {

    var ITEMS_TOTAL = 10;
    var TOP_SCORES_TO_KEEP = 5;
    var BASKET_CLOSED_IMAGE = 'scripts/closed-bin.jpg';
    var BASKET_OPENED_IMAGE = 'scripts/open-bin.jpg';
    var image = 'scripts/can.jpg';
    var startTime = new Date();
    var itemsCount = 0;

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

    // Clear the table with results add the bin and trash elements and start the timer
    function startGame() {
        var field = document.getElementById('field');
        field.removeChild(document.querySelector('table'));
        addBin();
        for (var count = 0; count < ITEMS_TOTAL; count++) {
            addElement();
        }

        startTime = new Date();
    }

    // Set style properties to the bin and add event listener for drop, dragover and dragleave
    function addBin() {
        var bin = document.createElement('img');
        bin.src = BASKET_CLOSED_IMAGE;
        bin.style.position = 'absolute';
        bin.style.top = generateNumber(0, screen.height / 2) + 'px';
        bin.style.left = 0;

        if (bin.addEventListener) {
            bin.addEventListener('drop', drop, false);
        } else {
            bin.attachEvent('ondrop', drop);
        }

        if (bin.addEventListener) {
            bin.addEventListener('dragover', allowDrop, false);
        } else {
            bin.attachEvent('ondragover', allowDrop);
        }

        if (bin.addEventListener) {
            bin.addEventListener('dragleave', restoreState, false);
        } else {
            bin.attachEvent('ondragleave', restoreState);
        }

        var field = document.getElementById('field');
        field.appendChild(bin);
    }

    function addElement() {
        itemsCount++;

        var field = document.getElementById('field');
        var element = generateElement();
        field.appendChild(element);
    }

    // Generate element (trash), set its style properties and event listener for dragstart
    function generateElement() {
        var element = document.createElement('img');
        element.id = 'item' + (itemsCount - 1);
        element.style.width = generateNumber(30, 100) + 'px';
        element.style.height = generateNumber(30, 100) + 'px';
        element.style.position = 'absolute';
        element.style.top = generateNumber(0, screen.height / 2) + 'px';
        element.style.left = generateNumber(screen.width / 4, screen.width / 2) + 'px';
        element.setAttribute('draggable', 'true');
        element.src = image;

        if (element.addEventListener) {
            element.addEventListener('dragstart', drag, false);
        } else {
            element.attachEvent('ondragstart', drag);
        }
        return element;
    }

    // Define event function for the trash elements ondragstart (mark them as dragged)
    function drag(event) {
        if (!event) {
            event = window.event;
        }
        var eventSource = (event.target ? event.target : event.srcElement);
        event.dataTransfer.setData('dragged-item-id', eventSource.id);
    }

    // Define event function for the bin wrapper ondrop (remove element (trash) from trash zone (container))
    // Check for the end of the game
    function drop(event) {
        executeEvent(event, BASKET_CLOSED_IMAGE);
        var itemId = event.dataTransfer.getData('dragged-item-id');
        var item = document.getElementById(itemId);
        item.parentElement.removeChild(item);
        itemsCount--;
        if (itemsCount === 0) {
            finishGame();
        }
    }

    // Define event function for the bin ondragover (change the image)
    function allowDrop(event) {
        executeEvent(event, BASKET_OPENED_IMAGE);
    }

    // Define event function for the bin dragleave (change the image)
    function restoreState(event) {
        executeEvent(event, BASKET_CLOSED_IMAGE);
    }

    // Execute the event attached to the bin (ondrop, ondragover, dragleave)
    function executeEvent(event, image) {
        if (!event) {
            event = window.event;
        }
        var eventSource = (event.target ? event.target : event.srcElement);
        eventSource.src = image;

        if (event.preventDefault) {
            event.preventDefault();
        }
    }

    // Stop the timer, ask for username, and add it to local storage and show the results
    function finishGame() {
        var endTime = new Date();
        var milliseconds = endTime.getTime() - startTime.getTime();
        var score = milliseconds / 1000;
        var username = prompt('Your score (sec): ' + score + '\r\nPlease enter username');
        localStorage.setItem(username ? username : '[anonymous]', score);

        if (localStorage.length > TOP_SCORES_TO_KEEP) {
            var worstScore = 0;
            var worstScorePlayer;
            for (var count = 0; count < localStorage.length; count++) {
                var key = localStorage.key(count);
                var value = Number(localStorage.getItem(key));
                if (value > worstScore) {
                    worstScore = value;
                    worstScorePlayer = key;
                }
            }

            localStorage.removeItem(worstScorePlayer);
        }

        loadTable();
    }

    // Remove all elements from the field (the bin) and desplay the table with results
    function loadTable() {
        var field = document.getElementById('field');
        while (field.firstChild) {
            field.removeChild(field.firstChild);
        }

        displayTopScores();
    }

    // Sort the results and show them
    function displayTopScores() {

        var topScores = sortTopScores();
        var table = generateTable(topScores);
        var field = document.getElementById('field');
        field.appendChild(table);
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

    // Create a table with the sorted results and a button to start new game
    function generateTable(topScores) {
        var table = document.createElement('table');
        table.style.margin = 'auto';

        if (topScores.length > 0) {
            generateRow(table, 'TOP RESULTS');
        }

        for (var count = 0; count < topScores.length; count++) {
            generateRow(table, topScores[count].key + ' ' + topScores[count].value);
        }

        var startButton = document.createElement('button');
        startButton.innerHTML = 'Start Game';
        if (startButton.addEventListener) {
            startButton.addEventListener('click', startGame, false);
        } else {
            startButton.attachEvent('onclick', startGame);
        }

        table.appendChild(startButton);

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
        loadTable: loadTable
    };
})();