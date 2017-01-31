var mods = ['meta', 'shift', 'ctrl', 'alt']

var cuts = [
  ['indent', 'cmd+]'],
  ['outdent', 'cmd+['],
  ['toggle comment', 'cmd+/'],
  ['toggle tree view', 'cmd+\\'],
  ['select current word', 'cmd+d'],
  ['select current line', 'cmd+l'],
  ['duplicate line', 'cmd+shift+d'],
  ['move line up', 'cmd+ctrl+arrowup'],
  ['move line down', 'cmd+ctrl+arrowdown']
];

var indexes = [];

function fillIndexes() {
  for (var i = 0; i < cuts.length; i++) {
    indexes.push(i);
  }
}

var target;
var lastIndex;
a = $('#answer');
p = $('#prompt');

getTarget();

$(document).keydown(function(e) {
  if (needsHearing(e)) {
    e.preventDefault();
    var input = getInput(e);
    if (input === target) {
      handleRight();
    } else {
      handleWrong();
    }
  }
});

function getTarget() {
  var index = Math.floor(Math.random()*cuts.length);
  if (index === lastIndex) {
    return getTarget();
  }
  p.html(cuts[index][0]);
  target = cuts[index][1];
  lastIndex = index;
}

function needsHearing(e) {
  if ([16, 17, 18, 91, 93].indexOf(e.which) !== -1) {
    return false;
  } else if (e.metaKey && e.key === 'r') {
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

function handleRight() {
  p.attr('class', 'right');
  setTimeout(function() {
    p.attr('class', '');
    a.html('');
    getTarget();
  }, 1000);
}

function handleWrong() {
  p.attr('class', 'wrong');
  a.html(target);
}
