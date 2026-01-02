import { useEffect, useState } from "react";

function FileList({ role, onDownload }) {
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");

  // 🔹 Mock file data (backend-ready)
  useEffect(() => {
    setFiles([
      {
        fileId: "1",
        fileName: "report.pdf",
        fileSize: 200,
        uploadedAt: "2026-01-01",
        tags: ["work", "pdf"],
      },
      {
        fileId: "2",
        fileName: "photo.png",
        fileSize: 1200,
        uploadedAt: "2026-01-02",
        tags: ["image"],
      },
      {
        fileId: "3",
        fileName: "notes.txt",
        fileSize: 50,
        uploadedAt: "2026-01-03",
        tags: ["text", "personal"],
      },
    ]);
  }, []);

  // 🔍 Search filter
  const filteredFiles = files.filter((file) =>
    file.fileName.toLowerCase().includes(search.toLowerCase())
  );

  // ⬆ Sorting logic
  const sortedFiles = [...filteredFiles].sort((a, b) => {
    if (sortBy === "name") return a.fileName.localeCompare(b.fileName);
    if (sortBy === "size") return a.fileSize - b.fileSize;
    if (sortBy === "date")
      return new Date(b.uploadedAt) - new Date(a.uploadedAt);
    return 0;
  });

  return (
    <div>
      <h3>Your Files</h3>

      {/* 🔍 Search */}
      <input
        placeholder="Search files..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      &nbsp;&nbsp;

      {/* ⬆ Sort */}
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="name">Sort by Name</option>
        <option value="date">Sort by Upload Date</option>
        <option value="size">Sort by Size</option>
      </select>

      <br /><br />

      {sortedFiles.length === 0 ? (
        <p>No files found</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Name</th>
              <th>Size (KB)</th>
              <th>Uploaded</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {sortedFiles.map((file) => (
              <tr key={file.fileId}>
                <td>{file.fileName}</td>
                <td>{file.fileSize}</td>
                <td>{file.uploadedAt}</td>
                <td>{file.tags.join(", ")}</td>
                <td>
                  {/* ⬇ Download */}
                  <button
                    onClick={() => {
                      onDownload(file.fileName);
                      alert(`Downloading ${file.fileName}`);
                    }}
                  >
                    Download
                  </button>

                  {/* 🗑 Delete (Admin only) */}
                  {role === "admin" && (
                    <>
                      <br />
                      <button style={{ color: "red" }}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FileList;