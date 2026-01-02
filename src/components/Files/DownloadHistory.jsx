function DownloadHistory({ history }) {
    return (
      <div>
        <h3>Download History</h3>
  
        {history.length === 0 ? (
          <p>No downloads yet</p>
        ) : (
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Downloaded By</th>
                <th>Time</th>
              </tr>
            </thead>
  
            <tbody>
              {history.map((item, index) => (
                <tr key={index}>
                  <td>{item.fileName}</td>
                  <td>{item.user}</td>
                  <td>{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
  
  export default DownloadHistory;