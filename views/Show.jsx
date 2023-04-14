<div>
  <h1>{props.log.title}</h1>
  <p>{props.log.entry}</p>
  <p>Ship is broken: {props.log.shipIsBroken ? 'Yes' : 'No'}</p>
  <p>Created on: {props.log.createdAt}</p>
  <a href="/">Back to Index</a>
</div>