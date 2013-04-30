var number = Math.floor(Math.random()*101);
var previousGuess;
var numGuesses = 1;

function isNormalInteger(str) {
    return (/^[1-9]\d*$/).test(str);
}

function validGuess(guess) {
    return isNormalInteger(guess) && +guess <= 100 && +guess >= 1;
}

function compareGuess(event) {
    event.preventDefault();
    var guess = $('#guess').val();
    if (validGuess(guess)) {
        $('.error').addClass('off').removeClass('on');
        guess = parseInt(guess, 10);
        if (guess === number) {
            $('#guess-vs-number').text('You got it! The number was ' + number + '.');
            $('#guess-vs-guess').hide();
            $('#num-guesses').text('You made ' + numGuesses + ' guesses.');
            $('#reset').removeClass('off');
        } else if (number > guess) {
            $('#guess-vs-number').text('Higher than ' + guess);
        } else {
            $('#guess-vs-number').text('Lower than ' + guess);
        }

        $('#guess').val('').focus();
        numGuesses++;

        if (previousGuess) {
            var previousDistance = Math.abs(number - previousGuess);
            var currentDistance = Math.abs(number - guess);

            if (guess === previousGuess) {
                $('#guess-vs-guess').text("Same guess!");
            } else if (currentDistance < previousDistance){
                $('#guess-vs-guess').text("Getting warmer...");
            } else if (currentDistance > previousDistance) {
                $('#guess-vs-guess').text("Getting colder...");
            } else {
                $('#guess-vs-guess').text("Same distance...");
            }
        }
        previousGuess = guess;
        $('.response').removeClass('off');
    } else {
        $('.error').removeClass('off').addClass('on');
    }
}

$('#guess-form').on('click', '#reset', function(event) {
    event.preventDefault();
    location.reload();
});
$('#guess-form').submit(compareGuess);
$('#guess').keypress(function(e) {
    if (e.which == 13) {
    compareGuess();
    }
});