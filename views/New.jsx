const React = require('react');

function New() {
  return (
    <div>
      <h1>New Entry</h1>
      <form action="/logs" method="POST">
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" required />
        <br />
        <label htmlFor="entry">Entry:</label>
        <textarea id="entry" name="entry" required></textarea>
        <br />
        <label htmlFor="shipIsBroken">Ship is broken:</label>
        <input type="checkbox" id="shipIsBroken" name="shipIsBroken" />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

module.exports = New;