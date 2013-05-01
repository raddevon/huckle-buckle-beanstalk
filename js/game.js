// Generate random number for guessing
var number = Math.floor(Math.random()*101);

// Global for previous guess
var previousGuess;

// Global for number of guesses
var numGuesses = 1;

function isNormalInteger(str) {
    return (/^[1-9]\d*$/).test(str);
}

// Checks to see if the guess is within the parameters given
function validGuess(guess) {
    return isNormalInteger(guess) && +guess <= 100 && +guess >= 1;
}

// Compare the guess to the number and previous guess. Place feedback on the page for the player.
function compareGuess(event) {
    event.preventDefault();
    // Grab the guess from the text input field
    var guess = $('#guess').val();

    if (validGuess(guess)) {
        // Turn off any error messages
        $('.error').addClass('off').removeClass('on');

        // Convert guess value to an integer for comparison
        guess = parseInt(guess, 10);
        // Feedback for a correct guess. Show the reset button to start a new game.
        if (guess === number) {
            $('#guess-vs-number').text('You got it! The number was ' + number + '.');
            $('#guess-vs-guess').hide();
            $('#num-guesses').text('You made ' + numGuesses + ' guesses.');
            $('#reset').removeClass('off');
        // Feedback for a low guess
        } else if (number > guess) {
            $('#guess-vs-number').text('Higher than ' + guess);
        // Feedback for a high guess
        } else {
            $('#guess-vs-number').text('Lower than ' + guess);
        }

        // Blank out the guess input field and return focus to it
        $('#guess').val('').focus();
        // Increment number of guesses
        numGuesses++;

        if (previousGuess) {
            // Find distances of the current and previous guesses from the actual number
            var previousDistance = Math.abs(number - previousGuess);
            var currentDistance = Math.abs(number - guess);

            // Feedback for guess versus previous guess comparison
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
        // Set new previous guess
        previousGuess = guess;

        // Display the response
        $('.response').removeClass('off');
    } else {
        // Give error for invalid guess. Blank out the guess field and return focus.
        $('.error').removeClass('off').addClass('on');
        $('#guess').val('').focus();
    }
}

// Bind a click of the reset button to browser reload
$('#guess-form').on('click', '#reset', function(event) {
    event.preventDefault();
    location.reload();
});

// Bind form submission to the compareGuess function
$('#guess-form').submit(compareGuess);

// Bind enter key to the compareGuess function for browsers that don't always interpret an enter press as a form submission.
$('#guess').keypress(function(e) {
    if (e.which == 13) {
    compareGuess();
    }
});