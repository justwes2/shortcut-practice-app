// Use this to find keyCodes
$(document).keydown(function(e) {
  console.log(e.which);
});

// Later, wrap everything in this.
$(document).ready(function() {
});

// if (e.altKey) {
//   console.log("alt!");
// }
// if (e.metaKey && e.which === 191) {
//   console.log('toggle comment');
// }
// if (e.metaKey && e.which === 221) {
//   console.log('indent');
// }
// if (e.metaKey && e.which === 219) {
//   console.log('outdent');
// }
// if (e.metaKey && e.shiftKey && e.which === 68) {
//   console.log('duplicate line');
// }
// if (e.metaKey && e.which === 220) {
//   console.log('toggle tree view');
// }

// function shortcut(name, keys) {
//   this.name = name;
//   this.keys = keys;
// }
//
// var duplicateLine = new shortcut('duplicate line', {'meta', 'shift', 68});
//
// $(document).keydown(function(e) {
//   e.preventDefault();
//   for (var key in duplicateLine.keys) {
//     if (typeof(key) === 'string') {
//       if (e[key]
//     } else {
//       if (e.which !== 68) {
//         console.log('false');
//         return;
//       }
//     }
//   }
// });

// var duplicateLine = {
//   metaKey: true,
//   altKey: false,
//   ctrlKey: false,
//   shiftKey: false,
//
// };

// var shortcuts = {
//   'toggle-comment': ['meta', '/'],
//   'duplicate-line': ['shift', 'meta', 'd'],
//   'move-line-up': ['meta', 'ctrl', 'arrowup']
// }
