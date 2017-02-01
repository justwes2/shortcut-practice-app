# Fission | Shortcut Practice for Atom

### Installation instructions

You can see the app live at ngcarter.github.io/shortcut-practice-app/, or can run it locally by cloning this repository and opening index.html in your browser.

### Technologies used

HTML, CSS, and jQuery (with some vanilla JavaScript mixed in).

### Approach taken

A single jQuery keydown listener is the gatekeeper for all of the relevant keyboard input, but it delegates certain duties to other (declared) functions. In earlier iterations, the shortcuts were represented in a two-dimensional array. Now, there is a Shortcut class and a shortcuts array which includes every instance of that class.

### User stories

- As an aspiring web developer, I should be able to learn Atom shortcuts quickly, so that I can finish my projects more efficiently.
- As someone who simply wants to try the app out, I should be able to dive straight in without wading through sign-up, log-in, or customization.
- As someone who knows very few of these shortcuts, when I get a shortcut wrong, I should be shown the correct answer, given sufficient time to absorb it, and given an opportunity to echo it back.
- As someone who knows most or all of these shortcuts, when I get a shortcut right, I should be able to move on fairly quickly.
- As someone who is not sufficiently motivated by individual correct and incorrect answers, I should see a session-score "energy bar" to ignite my competitive and completionist drives.

### Unsolved problems

Toward the end of the game, getting shortcuts wrong can lead to serious bugs. I think this has something to do with how I (a) prevent mastered shortcuts from repeating, and (b) prevent the same shortcut from repeating twice in a row. My hypothesis is that a conflict between these provisions is leading to strange behavior, but I have yet to get to the bottom of this.

For now, the app is fairly minimalist. The idea is to add more functionality later when I have learned more about OOP, databases, and Rails or Express.

Some features I would like to add in the future ...
- Better colors and typography.
- More shortcuts.
- Shortcuts split into manageable "sets" of shortcuts.
- The ability to switch between these "sets" by clicking tabs to the left of the play area.
- Shortcuts practice for programs other than Atom.
- A persistent database which keeps track of users and their progress.
- Ability to add, remove, and edit shortcuts and sets.
- Ability to restore default shortcuts and sets.
- More sophisticated algorithm for choosing next shortcut to test.
- Ability to (de)prioritize shortcuts if the user is more or less interested in learning them.
