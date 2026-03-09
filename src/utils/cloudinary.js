import { Cloudinary } from '@cloudinary/url-gen';

// Cloudinary configuration
const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'dlrcuejfd'
  }
});

// Your Cloudinary configuration
export const CLOUDINARY_CONFIG = {
  cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'dlrcuejfd',
  apiKey: process.env.REACT_APP_CLOUDINARY_API_KEY,
  apiSecret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
  folders: {
    images: 'home/images', // Changed to home/images folder
    videos: 'home/videos'  // Added for videos if needed
  }
};

// Get images from Cloudinary folder using REST API
export const getImagesFromCloudinary = async () => {
  try {
    const apiUrl = `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/list/${CLOUDINARY_CONFIG.folders.images}.json`;
    console.log('Fetching from:', apiUrl);
    
    const response = await fetch(apiUrl);
    
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Cloudinary images response:', data);
    console.log('Data type:', typeof data);
    console.log('Data keys:', Object.keys(data || {}));
    console.log('Data.resources:', data?.resources);
    console.log('Resources type:', typeof data?.resources);
    console.log('Is array?:', Array.isArray(data?.resources));
    
    // Check if data has resources and it's an array
    if (data && data.resources && Array.isArray(data.resources)) {
      console.log('Processing', data.resources.length, 'images');
      return data.resources.map(img => 
        `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/${img.public_id}.${img.format}`
      );
    } else {
      console.warn('No images found or invalid response format');
      console.warn('Full data:', data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching images from Cloudinary:", error);
    throw error;
  }
};

// Get videos from Cloudinary folder using REST API
export const getVideosFromCloudinary = async () => {
  try {
    const response = await fetch(
      `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/video/list/${CLOUDINARY_CONFIG.folders.videos}.json`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Cloudinary videos response:', data);
    
    // Check if data has resources and it's an array
    if (data && data.resources && Array.isArray(data.resources)) {
      return data.resources.map(video => 
        `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/video/upload/${video.public_id}.${video.format}`
      );
    } else {
      console.warn('No videos found or invalid response format');
      return [];
    }
  } catch (error) {
    console.error("Error fetching videos from Cloudinary:", error);
    throw error;
  }
};

// Upload image to Cloudinary
export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ml_default'); // Create this preset in Cloudinary dashboard
  formData.append('folder', CLOUDINARY_CONFIG.folders.images);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    );

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// Upload video to Cloudinary
export const uploadVideoToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ml_default'); // Create this preset in Cloudinary dashboard
  formData.append('folder', CLOUDINARY_CONFIG.folders.videos);
  formData.append('resource_type', 'video');

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/video/upload`,
      {
        method: 'POST',
        body: formData
      }
    );

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading video:", error);
    throw error;
  }
};

export { cld };
