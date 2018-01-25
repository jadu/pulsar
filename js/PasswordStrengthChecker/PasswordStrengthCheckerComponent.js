'use strict';

var $ = require('jquery');

function PasswordStrengthChecker(html) {
    this.$html = html;
}

PasswordStrengthChecker.prototype.init = function () {
    var component = this,
        passwordMeter = this.$html.find('#password__meter'),
        passwordMeterToggle = this.$html.find('#password__metertoggle'),
        passwordMeterToggle2 = this.$html.find('#password__metertoggle-2');

    // Initialize Password Strength Meters
    component.Password(passwordMeter, {
         shortPass: 'The password is too short',
         badPass: 'Weak: try combining letters & numbers',
         goodPass: 'Medium: try using special charecters',
         strongPass: 'Strong password',
         enterPass: 'Type your password',
         showCriteria: true,
         criteriaPosition: 'up',
         showPercent: false,
         showText: true,
         animate: true,
         animateSpeed: 'fast',
         username: false,
         usernamePartialMatch: false,
         minimumLength: 8,
         showCommonPasswords: false
    });

    component.Password(passwordMeterToggle, {
         shortPass: 'The password is too short',
         badPass: 'Weak: try combining letters & numbers',
         goodPass: 'Medium: try using special charecters',
         strongPass: 'Strong password',
         enterPass: 'Type your password',
         showCriteria: false,
         criteriaPosition: 'down',
         showPercent: true,
         showText: false,
         animate: true,
         animateSpeed: 'fast',
         username: false,
         usernamePartialMatch: false,
         minimumLength: 8,
         showCommonPasswords: false
    });

    component.Password(passwordMeterToggle2, {
         shortPass: 'The password is too short',
         badPass: 'Weak: try combining letters & numbers',
         goodPass: 'Medium: try using special charecters',
         strongPass: 'Strong password',
         enterPass: 'Type your password',
         showCriteria: true,
         criteriaPosition: 'down',
         showPercent: false,
         showText: false,
         animate: true,
         animateSpeed: 'fast',
         username: false,
         usernamePartialMatch: false,
         minimumLength: 8,
         showCommonPasswords: true,
         commonPasswordsList: 'Admin123$'
    });

    // Bind onClick Events for Hide/Show Text & Eye Icon Toggle
    this.$html.find('#password__icontoggle__btn').on('click', { input : '#password__icontoggle', buttonIcon : '#password__icontoggle__btn i' }, component.togglePasswordVisibility);
    this.$html.find('#password__texttoggle__btn').on('click', { input : '#password__texttoggle', button : '#password__texttoggle__btn' }, component.togglePasswordVisibility);
    this.$html.find('#password__metertoggle__btn').on('click', { input : passwordMeterToggle, buttonIcon : '#password__metertoggle__btn i' }, component.togglePasswordVisibility);
    this.$html.find('#password__metertoggle__btn-2').on('click', { input : passwordMeterToggle2, button : '#password__metertoggle__btn-2' }, component.togglePasswordVisibility);
}

PasswordStrengthChecker.prototype.Password = function (selectedPassword, options) {
    var defaults = {
        shortPass: 'The password is too short',
        badPass: 'Weak; try combining letters & numbers',
        goodPass: 'Medium; try using special charecters',
        strongPass: 'Strong password',
        containsUsername: 'The password contains the username',
        enterPass: 'Type your password',
        showCriteria: false,
        criteriaPosition: 'up', // up or down
        showPercent: false,
        showText: false, // shows the text tips
        animate: false, // whether or not to animate the progress bar on input blur/focus
        animateSpeed: 'fast', // the above animation speed
        username: false, // select the username field (selector or jQuery instance) for better password checks
        usernamePartialMatch: false, // whether to check for username partials
        minimumLength: 6, // minimum password length (below this threshold, the score is 0)
        showCommonPasswords: false,
        commonPasswordsList: ' ' // expects a list of the blacklisted passwords
    }

    // Fill in missing options with default values
    options = $.extend({}, defaults, options);

    var component = this,
        shown = true,
        showText = options.showText,
        showPercentage = options.showPercent,
        selectedPasswordID = '#'+selectedPassword.attr('id'),
        $graybar = $('<div>').addClass('password__graybar'),
        $colorbar = $('<div>').addClass('password__colorbar'),
        $insert = $('<div>').addClass('password__wrapper form__control').append($graybar.append($colorbar)),
        $criteriaGroup = $('<div>').addClass('password__criteria').html('<ul>' +
                                                                        '<li class="minimumLength"><span>8 characters minimum</span></li>' +
                                                                        '<li class="uppercase"><span>1 UPPERCASE character</span></li>' +
                                                                        '<li class="lowercase"><span>1 lowercase character</span></li>' +
                                                                        '<li class="specialChar"><span>1 Special character</span></li>' +
                                                                        '<li class="number"><span>1 number</span></li>' +
                                                                        '</ul>');

    selectedPassword.parent().addClass('password__strength--visible');
    if (options.animate) {
        $insert.css('display', 'none');
        shown = false;
        selectedPassword.parent().removeClass('password__strength--visible');
    }

    if (options.showPercent) {
        showPercentage = $('<span>').addClass('password__percent').text('0%');
        $insert.append(showPercentage);
    }

    if (options.showText) {
        showText = $('<span>').addClass('password__text').html(options.enterPass);
        $insert.append(showText);
    }

    selectedPassword.after($insert);

    selectedPassword.keyup(function() {
        var username = options.username || '';

        if (username) {
            username = $(username).val();
        }

        var score = component.calculateScore(options, selectedPassword.val());
        selectedPassword.trigger('password.score', [score]);
        var perc = score < 0 ? 0 : score;
        $colorbar.css({
            backgroundPosition: "0px -" + perc + "px",
            width: perc + '%'
        });

        if (options.showPercent) {
            showPercentage.html(perc + '%');
        }

        if (options.showText) {
            var text = component.scoreText(score, options);
            if (!selectedPassword.val().length && score <= 0) {
                text = options.enterPass;
            }

            if (showText.html() !== $('<div>').html(text).html()) {
                showText.html(text);
                selectedPassword.trigger('password.text', [text, score]);
            }
        }

        // Keep input field border radius while typing
        if ($(selectedPasswordID).siblings('.password__wrapper.form__control').is(':visible')) {
            $(selectedPasswordID).css({
                'border-bottom-left-radius': '0',
                'border-bottom-right-radius': '0'
            });
        }

        component.detectCriteria(selectedPassword, options, selectedPassword.val(), options.minimumLength, options.showCommonPasswords, options.commonPasswordsList);
    });

    // On Submit check for unmet Criteria
    selectedPassword.submit(function() {
        if($(selectedPasswordID).siblings('.password__criteria').find('li').not('.passed').length > 0) {
            $(selectedPasswordID).siblings('.password__criteria').find('li').not('.passed').addClass('failed');
            $(selectedPasswordID).addClass('has-error');
        } else {
            $(selectedPasswordID).addClass('has-success');
        }
    });

    // Animate Hidden Password Strength Meter Bar
    if (options.animate) {
        selectedPassword.focus(function() {
            if (!shown) {
                $insert.slideDown(options.animateSpeed, function () {
                    shown = true;
                    selectedPassword.parent().addClass('password__strength--visible');
                    $(selectedPasswordID).css({
                        'border-bottom-left-radius': '0',
                        'border-bottom-right-radius': '0'
                    });
                });
            }
        });

        selectedPassword.blur(function() {
            if (!selectedPassword.val().length && shown) {
                $insert.slideUp(options.animateSpeed, function () {
                    shown = false;
                    selectedPassword.parent().removeClass('password__strength--visible');
                    $(selectedPasswordID).css({
                        'border-bottom-left-radius': '4px',
                        'border-bottom-right-radius': '4px'
                    });
                });
            }
        });
    }

    // Make input boxes flat on the bottom when there is a visible meter bar
    if (shown) {
        $(selectedPasswordID).css({
            'border-bottom-left-radius': '0',
            'border-bottom-right-radius': '0'
        });
    }

    // Show Criteria
    if (options.showCriteria) {
        if (options.criteriaPosition === 'up') {
            $(selectedPasswordID).before($criteriaGroup);
        } else if (options.criteriaPosition === 'down')  {
            $(selectedPasswordID).parent().find('.input-group-btn').before($criteriaGroup);
        }
    }

    // Toggle Common Passwords Criteria Option
    if (options.showCommonPasswords === true) {
        $(selectedPasswordID).siblings('.password__criteria').find('ul').append('<li class="commonPassword"><span>Not a common password</span></li>');
    }
}

PasswordStrengthChecker.prototype.scoreText = function(score, options) {

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

 PasswordStrengthChecker.prototype.calculateScore = function(options, password) {
    var component = this,
        score = 0;

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
    score += component.checkRepetition(1, password).length - password.length;
    score += component.checkRepetition(2, password).length - password.length;
    score += component.checkRepetition(3, password).length - password.length;
    score += component.checkRepetition(4, password).length - password.length;

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

//Check for repetition of characters in
PasswordStrengthChecker.prototype.checkRepetition = function(rLen, str) {
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

// Toggle Criteria based on score
PasswordStrengthChecker.prototype.detectCriteria = function($object, options, password, minimumLength, showCommonPasswords, commonPasswordsList) {
    var component = this,
        selectedPasswordID = '#'+$object.attr('id');

    // Clear Password Criteria and Input during checking
    $(selectedPasswordID).siblings('.password__criteria').find('li').not('.passed').removeClass('failed');
    $(selectedPasswordID).removeClass('has-error');
    $(selectedPasswordID).removeClass('has-success');

    // Detect Password Length
    if (password.length >= options.minimumLength) {
        $(selectedPasswordID).siblings('.password__criteria').find('.minimumLength').addClass('passed');

        // Detect Common Password
        if (!component.detectCommonPasswords(commonPasswordsList, password)) {
            $(selectedPasswordID).siblings('.password__criteria').find('.commonPassword').addClass('passed');
        }
    } else {
        $(selectedPasswordID).siblings('.password__criteria').find('.minimumLength').removeClass('passed');
        $(selectedPasswordID).siblings('.password__criteria').find('.commonPassword').removeClass('passed');
    }

    // Detect Lowercase
    if (password.match(/([a-z])/)) {
        $(selectedPasswordID).siblings('.password__criteria').find('.lowercase').addClass('passed');
    } else {
        $(selectedPasswordID).siblings('.password__criteria').find('.lowercase').removeClass('passed');
    }

    // Detect Upperacase
    if (password.match(/([A-Z])/)) {
        $(selectedPasswordID).siblings('.password__criteria').find('.uppercase').addClass('passed');
    } else {
        $(selectedPasswordID).siblings('.password__criteria').find('.uppercase').removeClass('passed');
    }

    // Detect Number
    if (password.match(/([0-9])/)) {
        $(selectedPasswordID).siblings('.password__criteria').find('.number').addClass('passed');
    } else {
        $(selectedPasswordID).siblings('.password__criteria').find('.number').removeClass('passed');
    }

    // Detect Special Character
    if (password.match(/([ !"#$£%&'()*+,-./:;<=>?@[\]^_`{|}~])/)) {
        $(selectedPasswordID).siblings('.password__criteria').find('.specialChar').addClass('passed');
    } else {
        $(selectedPasswordID).siblings('.password__criteria').find('.specialChar').removeClass('passed');
    }
}

// Check Common Passwords
PasswordStrengthChecker.prototype.detectCommonPasswords = function(commonPasswordsList, password) {
    if (!!~commonPasswordsList.indexOf(password)) {
        return true;
    }
}

// Hide/Show Password text
PasswordStrengthChecker.prototype.togglePasswordVisibility = function({data}) {
    var passwordInput = $(data.input),
        passwordButton = $(data.button),
        passwordButtonIcon = $(data.buttonIcon);

    if (passwordInput.attr('type') === 'password') {
        passwordInput.attr('type', 'text');
        passwordButtonIcon.removeClass('icon-eye');
        passwordButtonIcon.addClass('icon-eye-slash');
        passwordButton.text('HIDE');
    } else {
        passwordInput.attr('type', 'password');
        passwordButtonIcon.removeClass('icon-eye-slash');
        passwordButtonIcon.addClass('icon-eye');
        passwordButton.text('SHOW');
    }
}

module.exports = PasswordStrengthChecker;
