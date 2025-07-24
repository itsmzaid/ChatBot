const FileUploader = ({ onUpload }) => {
  const handleChange = (e) => {
    onUpload(e.target.files);
  };

  return (
    <div className="border p-4 rounded-md bg-white shadow-sm">
      <label className="block text-sm font-medium mb-2">Upload Files</label>
      <input
        type="file"
        multiple
        accept=".pdf,.docx,.html,.txt"
        onChange={handleChange}
        className="file-input w-full"
      />
    </div>
  );
};

export default FileUploader;
