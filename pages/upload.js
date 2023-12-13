import React, { useState } from 'react';
import uploadVideo from '../lib/youtube';

const UploadPage = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!videoFile || !title || !description) return;
    setLoading(true);
    try {
      await uploadVideo(videoFile, title, description);
      console.log('Video uploaded successfully!');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Upload Video to YouTube</h1>
      <input type="file" onChange={(e) => setVideoFile(e.target.files[0])} />
      <br />
      <input placeholder="Video Title" onChange={(e) => setTitle(e.target.value)} />
      <br />
      <input  placeholder="Video Description" onChange={(e) => setDescription(e.target.value)} />
      <br />
      <button type="primary" loading={loading} onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default UploadPage;
