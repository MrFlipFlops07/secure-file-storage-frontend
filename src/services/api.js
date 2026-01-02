import axios from "axios";

const API_BASE_URL = "PASTE_API_GATEWAY_URL";

export const getUploadUrl = async (fileName, fileType) => {
  const response = await axios.post(`${API_BASE_URL}/upload-url`, {
    fileName,
    fileType,
  });
  return response.data.uploadUrl;
};

export const listFiles = async () => {
  const response = await axios.get(`${API_BASE_URL}/files`);
  return response.data.files;
};

export const getDownloadUrl = async (fileName) => {
  const response = await axios.post(`${API_BASE_URL}/download-url`, {
    fileName,
  });
  return response.data.downloadUrl;
};