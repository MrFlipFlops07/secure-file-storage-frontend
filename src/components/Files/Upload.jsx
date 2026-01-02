import { useState } from "react";
import axios from "axios";
import { getUploadUrl } from "../../services/api";

function Upload() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      // 1. Get pre-signed URL
      const uploadUrl = await getUploadUrl(file.name, file.type);

      // 2. Upload file directly to S3
      await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      alert("File uploaded successfully");
    } catch (err) {
      alert("Upload failed");
    }
  };

  return (
    <div>
      <h3>Upload File</h3>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default Upload;