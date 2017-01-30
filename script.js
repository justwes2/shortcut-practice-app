$(document).keydown(function(e) {
  e.preventDefault();
  if (e.metaKey && e.which === 191) {
    console.log('toggle comment');
  }
  if (e.metaKey && e.which === 221) {
    console.log('indent');
  }
  if (e.metaKey && e.which === 219) {
    console.log('outdent');
  }
  if (e.metaKey && e.shiftKey && e.which === 68) {
    console.log('duplicate line');
  }
  if (e.metaKey && e.which === 220) {
    console.log('toggle tree view');
  }
});
