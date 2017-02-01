var mods = ['meta', 'shift', 'ctrl', 'alt'];

class Shortcut {
  constructor(name, combo) {
    this.name = name;
    this.combo = combo;
    this.score = 0;
  }
}

var shortcuts = [new Shortcut('indent', 'cmd+]'),
                 new Shortcut('outdent', 'cmd+['),
                 new Shortcut('toggle comment', 'cmd+/'),
                 new Shortcut('toggle tree view', 'cmd+\\'),
                 new Shortcut('select current word', 'cmd+d'),
                 new Shortcut('select current line', 'cmd+l'),
                 new Shortcut('duplicate line', 'cmd+shift+d'),
                 new Shortcut('move line up', 'cmd+ctrl+arrowup'),
                 new Shortcut('move line down', 'cmd+ctrl+arrowdown')];

var score;
var maxScore = shortcuts.length * 3;
var prompt = $('#prompt');
var answer = $('#answer');
var target;
var i;

getTarget();

function getTarget() {
  if (score === maxScore) {
    prompt.html('Yay!').addClass('right');
    $(document).off();
    return;
  }
  var j = Math.floor(Math.random()*shortcuts.length);
  target = shortcuts[j];
  if (j === i || target.score >= 3) {
    return getTarget();
  }
  prompt.html(target.name);
  i = j;
}

$(document).keydown(function(e) {
  if (needsHearing(e)) {
    e.preventDefault();
    var input = getInput(e);
    if (input === target.combo) {
      if (prompt.hasClass('wrong')) {
        corrected();
      } else {
        right();
      }
    } else {
      wrong();
    }
    updateScore();
  }
});

function needsHearing(e) {
  if ([16, 17, 18, 91, 93].indexOf(e.which) !== -1 ||
      (e.metaKey && e.key === 'r') ||
      (e.metaKey && e.altKey && e.key === 'j')) {
    return false;
  }
  return true;
}

function getInput(e) {
  var input = '';
  for (var i = 0; i < mods.length; i++) {
    var mod = mods[i];
    if (e[mod+'Key']) {
      if (mod === 'meta') {
        mod = 'cmd';
      }
      input += mod+'+';
    }
  }
  input += e.key.toLowerCase();
  return input;
}

function right() {
  prompt.attr('class', 'right');
  target.score += 1;
  setTimeout(function() {
    prompt.attr('class', '');
    answer.html('');
    getTarget();
  }, 1000);
}

function wrong() {
  prompt.attr('class', 'wrong');
  answer.html(target.combo);
  target.score = 0;
}

function corrected() {
  prompt.attr('class', 'right');
  setTimeout(function() {
    prompt.attr('class', '');
    answer.html('');
    getTarget();
  }, 1000);
}

function updateScore() {
  score = 0;
  for (var k = 0; k < shortcuts.length; k++) {
    score += shortcuts[k].score;
  }
  var width = Math.round(100 * (score / maxScore));
  $('#liquid').css('width', width+'%');
}
