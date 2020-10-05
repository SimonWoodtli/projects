# PROJECT SPECIFICATION:  Rock Paper Scissors

## Gameplay

<table>
<thead>
  <tr>
    <td>CRITERIA</td>
    <td>MEETS SPECIFICATIONS</td>
  </tr>
</thead>
<tbody>
  <tr>
    <td>The program plays a game of Rock Paper Scissors, following the conventional rules.</td>
    <td>Paper beats rock; rock beats scissors; scissors beat paper.</td>
  </tr>
  <tr>
    <td>The program plays a match consisting of multiple rounds, and tracks players' total score.</td>
    <td>The game displays the results after each round, including each player's score. At the end, the final score is displayed.<br>The number of rounds per game, as well as when to stop, are up to you!</td>
  </tr>
  <tr>
    <td>There are at least four different computer player classes, each implementing a different strategy.</td>
    <td>The game should have (at least) four computer player strategies:
      <ul>
        <li>A player that always plays 'rock'.</li>
        <li>A player that chooses its moves randomly.</li>
        <li>A player that remembers and imitates what the human player did in the previous round.</li>
        <li>A player that cycles through the three moves.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Each player class has a method that returns that player's move, and a method for remembering information about the round.</td>
    <td>The game should call each player's move method once in each round, to get that player's move. After each round, it should call the remembering method to tell each player what the other player's move was.<br>Some computer players don't need to remember anything, so their remembering method should do nothing.</td>
  </tr>
</tbody>
</table>

## Object-Oriented Programming

<table>
<thead>
  <tr>
    <td>CRITERIA</td>
    <td>MEETS SPECIFICATIONS</td>
  </tr>
</thead>
<tbody>
  <tr>
    <td>The code uses classes and objects to store game data, rather than global variables.</td>
    <td>
      <p>The `Game` class should include a method to play a single round, and a method to play a match of several rounds.</p>
      <p>Facts about the current match, such as the players' score, or the number of rounds played, should be stored as instance variables. They shouldn't be stored as global variables.</p>
      <p>It's okay to use global variables for the game moves "rock", "paper", and "scissors".</p>
    </td>
  </tr>
  <tr>
    <td>The code uses subclasses appropriately.</td>
    <td>Each computer player strategy should be a subclass of the Player base class, as should the Human player.</td>
  </tr>
</tbody>
</table>

## Code Style

<table>
<thead>
  <tr>
    <td>CRITERIA</td>
    <td>MEETS SPECIFICATIONS</td>
  </tr>
</thead>
<tbody>
  <tr>
    <td>The code style follows the standard Python style guide.</td>
    <td>
      <p>The pycodestyle tool should report zero errors and zero warnings.</p>
      <p>If the program is called rps.py, the command to test it is pycodestyle rps.py.</p>
    </td>
  </tr>
  <tr>
    <td>The program does not crash or display any error messages.</td>
    <td>
      <p>The code should be thoroughly tested.</p>
      <p>Invalid moves should not make the program crash. (See the next item!)</p>
    </td>
  </tr>
  <tr>
    <td>The program checks the validity of user input.</td>
    <td>
      <p>If the player enters a move that is not valid, the game should give them the chance to retry that move until they enter a valid move.</p>
      <p>The game should not crash, and it should not treat invalid input as a valid move.</p>
      <p><strong>Example:</strong><br>If the player enters "roxk" instead of "rock", the game should let them try again; it should not crash, and it should not assume they meant "rock".</p></td>
  </tr>
</tbody>
</table>