var modifiers = ['meta', 'shift', 'ctrl', 'alt']

var shortcuts = [
  ['toggle comment', 'meta /'],
  ['duplicate line', 'meta shift d'],
  ['move line up', 'meta ctrl arrowup'],
  ['move line down', 'meta ctrl arrowdown'],
  ['indent', 'meta ]'],
  ['outdent', 'meta ['],
  ['toggle tree view', 'meta \\']
];

var attempt = '';
var target = '';

function setTarget() {
  var i = Math.floor(Math.random()*shortcuts.length);
  attempt = '';
  target = shortcuts[i][1];
  console.log(shortcuts[i][0]);
}

setTarget();

$(document).keydown(function(e) {
  if (e.metaKey && e.key === 'r') {
    return;
  }
  e.preventDefault();
  if ([16, 17, 18, 91, 93].indexOf(e.which) !== -1) {
    return;
  }
  for (var i = 0; i < modifiers.length; i++) {
    if (e[modifiers[i]+'Key']) {
      attempt += modifiers[i]+' ';
    }
  }
  attempt += e.key.toLowerCase();
  if (attempt === target) {
    console.log('Yay!');
    setTarget();
  } else {
    attempt = '';
    console.log('Nope. Try again.');
  }
});
