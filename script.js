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

fillIndexes();

function fillIndexes() {
  for (var i = 0; i < cuts.length; i++) {
    indexes.push(i);
  }
}

var target;
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
  var i = Math.floor(Math.random()*indexes.length);
  var j = indexes[i];
  indexes.splice(i, 1);
  if (indexes.length === 0) {
    fillIndexes();
  }
  p.html(cuts[j][0]);
  target = cuts[j][1];
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
