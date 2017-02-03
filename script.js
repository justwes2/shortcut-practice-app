var mods = ['meta', 'shift', 'ctrl', 'alt'];

class Cut {
  constructor(name, combo) {
    this.name = name;
    this.combo = combo;
    this.score = 0;
    this.priority = 8;
    this.max = 0;
  }
}

var cuts = [new Cut('indent', 'cmd+]'),
            new Cut('outdent', 'cmd+['),
            new Cut('toggle comment', 'cmd+/'),
            new Cut('toggle tree view', 'cmd+\\'),
            new Cut('select current word', 'cmd+d'),
            new Cut('select current line', 'cmd+l'),
            new Cut('duplicate line', 'cmd+shift+d'),
            new Cut('move line up', 'cmd+ctrl+arrowup'),
            new Cut('move line down', 'cmd+ctrl+arrowdown')];

var totalScore = 0;
var totalPriority = 72;
var maxScore = cuts.length * 3;
var prompt = $('#prompt');
var answer = $('#answer');
var target;
var lastTarget;

getTarget();

function getTarget() {
  if (totalScore === maxScore) {
    prompt.html('Yay!').addClass('right');
    $(document).off();
    return;
  }
  getMaxes();
  var rando = Math.random();
  for (var i = 0; i < cuts.length; i++) {
    if (rando < cuts[i].max) {
      target = cuts[i];
      break;
    }
  }
  if (target === lastTarget) {
    return getTarget();
  }
  prompt.html(target.name);
  lastTarget = target;
}

$(document).keydown(function(e) {
  if (needsHearing(e)) {
    e.preventDefault();
    var input = getInput(e);
    if (input === target.combo) {
      right();
    } else {
      wrong();
    }
    var width = Math.round(100 * (totalScore / maxScore));
    $('#liquid').css('width', width+'%');
  }
});

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
  if (prompt.attr('class') === '') {
    totalScore++;
    target.score++;
    totalPriority -= (target.priority / 2);
    target.priority /= 2;
  }
  prompt.attr('class', 'right');
  setTimeout(function() {
    prompt.attr('class', '');
    answer.html('');
    getTarget();
  }, 1000);
}

function wrong() {
  prompt.attr('class', 'wrong');
  answer.html(target.combo);
  totalScore -= target.score;
  target.score = 0;
  totalPriority += (8 - target.priority);
  target.priority = 8;
}

function getMaxes() {
  var step = 0;
  for (var i = 0; i < cuts.length; i++) {
    var cut = cuts[i];
    var ratio = cut.priority / totalPriority;
    cut.max = step + ratio;
    step += ratio;
  }
}

function needsHearing(e) {
  if ([16, 17, 18, 91, 93].indexOf(e.which) !== -1 ||
      (e.metaKey && e.key === 'r') ||
      (e.metaKey && e.altKey && e.key === 'j')) {
    return false;
  }
  return true;
}


added back prevention of same shortcut twice in a row
combined right() and corrected() functions to avoid repetition and adjusted keydown listener accordingly
