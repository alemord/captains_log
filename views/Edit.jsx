const React = require('react');

function Edit(props) {
  const { log } = props;

  return (
    <div>
      <h1>Edit Entry</h1>
      <form action={`/logs/${log._id}`} method="POST">
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" defaultValue={log.title} required />
        <br />
        <label htmlFor="entry">Entry:</label>
        <textarea id="entry" name="entry" defaultValue={log.entry} required></textarea>
        <br />
        <label htmlFor="shipIsBroken">Ship is broken:</label>
        <input type="checkbox" id="shipIsBroken" name="shipIsBroken" defaultChecked={log.shipIsBroken} />
        <br />
        <input type="submit" value="Update" />
      </form>
    </div>
  );
}

module.exports = Edit;
