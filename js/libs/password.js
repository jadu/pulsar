// eslint-disable-next-line
;(function($) {
    'use strict';

    var Password = function ($object, options) {
        var defaults = {
            shortPass: 'The password is too short',
            badPass: 'Weak; try combining letters & numbers',
            goodPass: 'Medium; try using special charecters',
            strongPass: 'Strong password',
            containsUsername: 'The password contains the username',
            enterPass: 'Type your password',
            showCriteria: false,
            criteriaPosition: 'up',
            showPercent: false,
            showText: false,
            animate: false,
            animateSpeed: 'fast',
            username: false,
            usernamePartialMatch: false,
            minimumLength: 6
        };

        options = $.extend({}, defaults, options);

        /**
         * Returns strings based on the score given.
         *
         * @param int score Score base.
         * @return string
         */
        function scoreText(score) {
            if (score === -1) {
                return options.shortPass;
            }
            if (score === -2) {
                return options.containsUsername;
            }

            score = score < 0 ? 0 : score;

            if (score < 34) {
                return options.badPass;
            }
            if (score < 68) {
                return options.goodPass;
            }

            return options.strongPass;
        }

        /**
         * Returns a value between -2 and 100 to score
         * the user's password.
         *
         * @param  string password The password to be checked.
         * @param  string username The username set (if options.username).
         * @return int
         */
        function calculateScore(password, username) {
            var score = 0;

            // password < options.minimumLength
            if (password.length < options.minimumLength) {
                return -1;
            }

            if (options.username) {
                // password === username
                if (password.toLowerCase() === username.toLowerCase()) {
                    return -2;
                }
                // password contains username (and usernamePartialMatch is set to true)
                if (options.usernamePartialMatch && username.length) {
                    var user = new RegExp(username.toLowerCase());
                    if (password.toLowerCase().match(user)) {
                        return -2;
                    }
                }
            }

            // password length
            score += password.length * 4;
            score += checkRepetition(1, password).length - password.length;
            score += checkRepetition(2, password).length - password.length;
            score += checkRepetition(3, password).length - password.length;
            score += checkRepetition(4, password).length - password.length;

            // password has 3 numbers
            if (password.match(/(.*[0-9].*[0-9].*[0-9])/)) {
                score += 5;
            }

            // password has at least 2 sybols
            var symbols = '.*[!,@,#,$,%,^,&,*,?,_,~]';
            symbols = new RegExp('(' + symbols + symbols + ')');
            if (password.match(symbols)) {
                score += 5;
            }

            // password has Upper and Lower chars
            if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
                score += 10;
            }

            // password has number and chars
            if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) {
                score += 15;
            }

            // password has number and symbol
            if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([0-9])/)) {
                score += 15;
            }

            // password has char and symbol
            if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([a-zA-Z])/)) {
                score += 15;
            }

            // password is just numbers or chars
            if (password.match(/^\w+$/) || password.match(/^\d+$/)) {
                score -= 10;
            }

            if (score > 100) {
                score = 100;
            }

            if (score < 0) {
                score = 0;
            }

            return score;
        }

        /**
         * Checks for repetition of characters in
         * a string
         *
         * @param int rLen Repetition length.
         * @param string str The string to be checked.
         * @return string
         */
        function checkRepetition(rLen, str) {
            var res = "",
                repeated = false;

            for (var i = 0; i < str.length; i++) {
                repeated = true;
                for (var j = 0; j < rLen && (j + i + rLen) < str.length; j++) {
                    repeated = repeated && (str.charAt(j + i) === str.charAt(j + i + rLen));
                }
                if (j < rLen) {
                    repeated = false;
                }
                if (repeated) {
                    i += rLen - 1;
                    repeated = false;
                } else {
                    res += str.charAt(i);
                }
            }
            return res;
        }

        /**
         * Initializes the plugin creating and binding the
         * required layers and events.
         *
         * @return void
         */
        function init() {
            var shown = true,
                $text = options.showText,
                $criteria = options.showCriteria,
                $percentage = options.showPercent,
                objectID = '#'+$object.attr('id'),
                $graybar = $('<div>').addClass('password__graybar'),
                $colorbar = $('<div>').addClass('password__colorbar'),
                $insert = $('<div>').addClass('password__wrapper form__control').append($graybar.append($colorbar)),
                $criteriaGroup = $('<div>').addClass('password__criteria').html('<ul>' +
                                                                                '<li class="minimumLength">8 characters minimum</li>' +
                                                                                '<li class="uppercase">1 UPPERCASE character</li>' +
                                                                                '<li class="lowercase">1 lowercase character</li>' +
                                                                                '<li class="specialChar">1 Special character</li>' +
                                                                                '<li class="number">1 number</li>' +
                                                                                '<li class="commonPassword">Not a common password</li>' +
                                                                                '</ul>');

            $object.parent().addClass('password__strength--visible');
            if (options.animate) {
                $insert.css('display', 'none');
                shown = false;
                $object.parent().removeClass('password__strength--visible');
            }

            if (options.showPercent) {
                $percentage = $('<span>').addClass('password__percent').text('0%');
                $insert.append($percentage);
            }

            if (options.showText) {
                $text = $('<span>').addClass('password__text').html(options.enterPass);
                $insert.append($text);
            }

            $object.after($insert);

            $object.keyup(function() {
                var username = options.username || '';

                if (username) {
                    username = $(username).val();
                }

                var score = calculateScore($object.val(), username);
                $object.trigger('password.score', [score]);
                var perc = score < 0 ? 0 : score;
                $colorbar.css({
                    backgroundPosition: "0px -" + perc + "px",
                    width: perc + '%'
                });

                if (options.showPercent) {
                    $percentage.html(perc + '%');
                }

                if (options.showText) {
                    var text = scoreText(score);
                    if (!$object.val().length && score <= 0) {
                        text = options.enterPass;
                    }

                    if ($text.html() !== $('<div>').html(text).html()) {
                        $text.html(text);
                        $object.trigger('password.text', [text, score]);
                    }
                }

                detectCriteria($object.val());
            });

            if (options.animate) {
                $object.focus(function() {
                    if (!shown) {
                        $insert.slideDown(options.animateSpeed, function () {
                            shown = true;
                            $object.parent().addClass('password__strength--visible');
                        });
                    }
                });

                $object.blur(function() {
                    if (!$object.val().length && shown) {
                        $insert.slideUp(options.animateSpeed, function () {
                            shown = false;
                            $object.parent().removeClass('password__strength--visible')
                        });
                    }
                });
            }

            // Show Criteria
            if (options.showCriteria) {
                if (options.criteriaPosition === 'up') {
                    $(objectID).before($criteriaGroup);
                } else if (options.criteriaPosition === 'down')  {
                    $(objectID).parent().find('.input-group-btn').before($criteriaGroup);
                }
            }

            return this;
        }

        // Toggle Criteria based on score
        function detectCriteria(password, minimumLength) {
            var objectID = '#'+$object.attr('id');

            // Detect Password Length
            if (password.length >= options.minimumLength) {
                $(objectID).siblings('.password__criteria').find('.minimumLength').addClass('passed');
            } else {
                $(objectID).siblings('.password__criteria').find('.minimumLength').removeClass('passed');
            }

            // Detect Lowercase
            if (password.match(/([a-z])/)) {
                $(objectID).siblings('.password__criteria').find('.lowercase').addClass('passed');
            } else {
                $(objectID).siblings('.password__criteria').find('.lowercase').removeClass('passed');
            }

            // Detect Upperacase
            if (password.match(/([A-Z])/)) {
                $(objectID).siblings('.password__criteria').find('.uppercase').addClass('passed');
            } else {
                $(objectID).siblings('.password__criteria').find('.uppercase').removeClass('passed');
            }

            // Detect Number
            if (password.match(/([0-9])/)) {
                $(objectID).siblings('.password__criteria').find('.number').addClass('passed');
            } else {
                $(objectID).siblings('.password__criteria').find('.number').removeClass('passed');
            }

            // Detect Special Character
            if (password.match(/([ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])/)) {
                $(objectID).siblings('.password__criteria').find('.specialChar').addClass('passed');
            } else {
                $(objectID).siblings('.password__criteria').find('.specialChar').removeClass('passed');
            }

            // Detect Common Passwords
            /*if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/)) {
                $('.password__criteria .specialChar').addClass('passed');
            } else {
                $('.password__criteria .specialChar').removeClass('passed');
            }*/

            return this;
        }

        return init.call(this);
    }

    // Bind to jquery
    $.fn.password = function(options) {
        return this.each(function() {
            new Password($(this), options);
        });
    };
})(jQuery);
