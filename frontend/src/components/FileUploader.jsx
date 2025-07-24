const FileUploader = ({ onUpload }) => {
  const handleChange = (e) => {
    if (e.target.files.length) {
      onUpload(e.target.files);
      e.target.value = "";
    }
  };

  return (
    <div className="border p-4 sm:p-6 rounded-md bg-white shadow-md">
      <label className="block text-sm font-semibold mb-2 text-gray-700">
        Upload Files (.pdf, .docx, .html, .txt)
      </label>
      <input
        type="file"
        multiple
        accept=".pdf,.docx,.html,.txt"
        onChange={handleChange}
        className="block w-full text-sm text-gray-600
          file:mr-4 file:py-2 file:px-4
          file:rounded file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
    </div>
  );
};

export default FileUploader;
