import React from 'react';

function RunList(props) {

  const runItems = props.runData.map((run, index) =>
    <tr key={run.uid}>
      <td>{run.runInfo.runId}</td>
      <td>{run.productInfo.productName}</td>
      <td>{run.activeStep}</td>
      <td>{run.productInfo.quantity}</td>
      <td><button onClick={(e) => props.setCurrentRun(run.uid, run.activeStep)}>Edit</button></td>
      <td><button onClick={(e) => props.deleteRun(run.uid)}>Delete</button></td>
    </tr>
  )

  return (
    <>
      <h2>Run List:</h2>
      <table>
        <thead>
          <tr>
            <th>Run ID</th>
            <th>Product</th>
            <th>Step</th>
            <th>Batches</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {runItems}
        </tbody>
      </table>
    </>
  )
}

export default RunList;