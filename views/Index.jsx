const React = require('react');

function Index(props) {
  const { logs } = props;

  return (
    <div>
      <h1>Logs Index</h1>
      <ul>
        {logs.map((log) => (
          <li key={log._id}>
            <a href={`/logs/${log._id}`}>{log.title}</a>
            <form action={`/logs/${log._id}?_method=DELETE`} method="POST">
              <button type="submit">Delete</button>
            </form>
            <a href={`/logs/${log._id}/edit`}>Edit</a>
          </li>
        ))}
      </ul>
      <a href="/logs/new">Create New Log</a>
    </div>
  );
}

module.exports = Index;
