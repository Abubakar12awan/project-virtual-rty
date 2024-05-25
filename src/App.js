



import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
  const [clothImage, setClothImage] = useState(null);
  const [personImage, setPersonImage] = useState(null);
  const [resultImage, setResultImage] = useState('');

  const [clothImagePreview, setClothImagePreview] = useState(null);
  const [personImagePreview, setPersonImagePreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image1', clothImage);
    formData.append('image2', personImage);

    try {
      const response = await axios.post('http://127.0.0.1:8000/process-images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Convert Base64 response to data URL and set it as the result image
      const base64Image = response.data.image_rgb;
      const dataUrl = `data:image/jpeg;base64,${base64Image}`;
      setResultImage(dataUrl);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const handleClothImageChange = (e) => {
    const file = e.target.files[0];
    setClothImage(file);
    setClothImagePreview(URL.createObjectURL(file));
  };

  const handlePersonImageChange = (e) => {
    const file = e.target.files[0];
    setPersonImage(file);
    setPersonImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className="image-upload-container">
      <form className="image-upload-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="clothImage" className="form-label">Person Image:</label>
          <input type="file" id="clothImage" onChange={handleClothImageChange} />
          {clothImagePreview && (
            <img
              src={clothImagePreview}
              alt="Cloth Preview"
              className="image-preview"
            />
          )}
        </div>

        <div className="form-group">
          <label htmlFor="personImage" className="form-label">Cloth Image:</label>
          <input type="file" id="personImage" onChange={handlePersonImageChange} />
          {personImagePreview && (
            <img
              src={personImagePreview}
              alt="Person Preview"
              className="image-preview"
            />
          )}
        </div>

        <button type="submit" className="upload-button">Click to get Virtual Try On</button>
      </form>

      {resultImage && (
        <div className="result-image-container">
          <h3>Processed Result:</h3>
          <img src={resultImage} alt="Result" className="result-image" />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;




// import './App.css';
// import React, { useState } from 'react';
// import axios from 'axios';

// function ImageUpload() {
//   const [clothImage, setClothImage] = useState(null);
//   const [personImage, setPersonImage] = useState(null);
//   const [resultImage, setResultImage] = useState('');

//   const [clothImagePreview, setClothImagePreview] = useState(null);
//   const [personImagePreview, setPersonImagePreview] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('image1', clothImage);
//     formData.append('image2', personImage);

//     try {
//       const response = await axios.post('http://127.0.0.1:8000/process-images', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       const base64Image = response.data.image_rgb;
//       const dataUrl = `data:image/jpeg;base64,${base64Image}`;
//       setResultImage(dataUrl);
//     } catch (error) {
//       console.error('Error uploading images:', error);
//     }
//   };

//   const handleClothImageChange = (e) => {
//     const file = e.target.files[0];
//     setClothImage(file);
//     setClothImagePreview(URL.createObjectURL(file));
//   };

//   const handlePersonImageChange = (e) => {
//     const file = e.target.files[0];
//     setPersonImage(file);
//     setPersonImagePreview(URL.createObjectURL(file));
//   };

//   return (
//     <div className="image-upload-container">
//       <h2>Virtual Try-On</h2>
//       <form className="image-upload-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="clothImage" className="form-label upload-label">
//             <span>Upload Cloth Image</span>
//             <input type="file" id="clothImage" onChange={handleClothImageChange} />
//             <img src="https://via.placeholder.com/150" alt="Upload Cloth" className="upload-icon" />
//           </label>
//           {clothImagePreview && (
//             <img
//               src={clothImagePreview}
//               alt="Cloth Preview"
//               className="image-preview"
//             />
//           )}
//         </div>

//         <div className="form-group">
//           <label htmlFor="personImage" className="form-label upload-label">
//             <span>Upload Person Image</span>
//             <input type="file" id="personImage" onChange={handlePersonImageChange} />
//             <img src="https://via.placeholder.com/150" alt="Upload Person" className="upload-icon" />
//           </label>
//           {personImagePreview && (
//             <img
//               src={personImagePreview}
//               alt="Person Preview"
//               className="image-preview"
//             />
//           )}
//         </div>

//         <button type="submit" className="upload-button">Get Virtual Try-On</button>
//       </form>

//       {resultImage && (
//         <div className="result-image-container">
//           <h3>Processed Result</h3>
//           <img src={resultImage} alt="Result" className="result-image" />
//         </div>
//       )}
//     </div>
//   );
// }

// export default ImageUpload;
