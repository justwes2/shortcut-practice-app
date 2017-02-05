class Cut {
  constructor(name, combo) {
    this.name = name;
    this.combo = combo;
    this.score = 0;
    this.priority = 8;
    this.max = 0;
  }
}

const cuts = [new Cut('indent', 'cmd+]'),
              new Cut('outdent', 'cmd+['),
              new Cut('toggle comment', 'cmd+/'),
              new Cut('toggle tree view', 'cmd+\\'),
              new Cut('select current word', 'cmd+d'),
              new Cut('select current line', 'cmd+l'),
              new Cut('duplicate line', 'cmd+shift+d'),
              new Cut('move line up', 'cmd+ctrl+arrowup'),
              new Cut('move line down', 'cmd+ctrl+arrowdown')];

const mods = ['meta', 'shift', 'ctrl', 'alt'];
const prompt = $('#prompt');
const answer = $('#answer');
const maxScore = cuts.length * 3;

let totalScore = 0;
let totalPriority = 72;
let target;
let lastTarget;

getTarget();

function getTarget() {
  if (totalScore === maxScore) {
    prompt.html('Yay!').addClass('right');
    $(document).off();
    return;
  }
  getMaxes();
  let random = Math.random();
  for (let i in cuts) {
    if (random < cuts[i].max) {
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
    let input = getInput(e);
    if (input === target.combo) {
      right();
    } else {
      wrong();
    }
    updateScore();
  }
});

function getInput(e) {
  var input = '';
  mods.forEach((mod) => {
    if (e[mod+'Key']) {
      if (mod === 'meta') {
        mod = 'cmd';
      }
      input += mod+'+';
    }
  });
  input += e.key.toLowerCase();
  return input;
}

function right() {
  if (!prompt.hasClass('wrong')) {
    target.score += 1;
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
  target.score = 0;
  target.priority = 8;
}

function getMaxes() {
  let step = 0;
  cuts.forEach((cut) => {
    let ratio = cut.priority / totalPriority;
    cut.max = step + ratio;
    step += ratio;
  });
}

function needsHearing(e) {
  if ([16, 17, 18, 91, 93].indexOf(e.which) !== -1 ||
      (e.metaKey && e.key === 'r') ||
      (e.metaKey && e.altKey && e.key === 'j')) {
    return false;
  }
  return true;
}

function updateScore() {
  totalScore = 0;
  totalPriority = 72;
  cuts.forEach((cut) => {
    totalScore += cut.score;
    totalPriority += cut.priority;
  });
  let width = Math.round(100 * (totalScore / maxScore));
  $('#liquid').css('width', width+'%');
}
