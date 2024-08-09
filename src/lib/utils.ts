import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from 'axios';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatNumber = (value) => {
  let number = parseFloat(value);
  return number % 1 === 0 ? Math.floor(number) : number.toFixed(2);
};


export function formatCommas(x) {
  return x?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export const resizeImage = (file, maxWidth, maxHeight) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx: any = canvas.getContext('2d');
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg', 0.8);
    };
    img.onerror = (e) => {
      reject(e);
    };
  });
};

export const sendFile = async (file, customFileName) => {
  const newFile = new File([file], customFileName, { type: file.type });
  const formData = new FormData();
  formData.append('file', newFile);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  return await axios.post('api/files', formData, config);
};

export function formatFileSize(bytes) {
  bytes = parseInt(bytes, 10);
  if (isNaN(bytes)) {
    return 'Invalid input'; 
  }

  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export const bytesToGB = (bytesString: string): string => {
  const bytes = Number(bytesString);
  if (isNaN(bytes) || bytes < 0) {
      console.error("Invalid input: bytes must be a non-negative number.");
      return "0.00"; 
  }
  return (bytes / Math.pow(1024, 3)).toFixed(5);
};

export const generateThumbnail = async (relativePath: string, width: number = 72, height: number = 72): Promise<string | null> => {
  try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const filePath = `${baseUrl}/${relativePath.replace(/\\/g, '/')}`;
      const response = await fetch(filePath);
      const blob = await response.blob();
      const image = await createImageBitmap(blob);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(image, 0, 0, width, height);

      return canvas.toDataURL('image/png');
  } catch (error) {
      console.error('Error generating thumbnail:', error);
      return null;
  }
};

export const removeExtension = (fileName) => {
  const extension = fileName.lastIndexOf('.') !== -1 ? fileName.substring(fileName.lastIndexOf('.') + 1) : '';
  const name = extension ? fileName.substring(0, fileName.lastIndexOf('.')) : fileName;
  return { name, extension };
};

export const truncateFilename = (filename, maxLength = 12) => {
  if (filename.length <= maxLength) return filename;

  const extIndex = filename.lastIndexOf('.');
  const ext = extIndex !== -1 ? filename.slice(extIndex) : '';
  const name = extIndex !== -1 ? filename.slice(0, extIndex) : filename;
  const truncatedNameLength = maxLength - ext.length - 3; 

  if (truncatedNameLength <= 0) {
    return `${filename.slice(0, maxLength - 3)}...`;
  }

  let truncatedName = name.slice(0, truncatedNameLength);
  while (truncatedName.length > 0 && ['-', '_', ' '].includes(truncatedName.slice(-1))) {
    truncatedName = truncatedName.slice(0, -1);
  }

  return `${truncatedName}...${ext}`;
};

export const uppercaseFirstW = (text) => {
  const words = text.split(' ');
  if (words.length > 0) {
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  }
  return words.join(' ');
};

export const formatDate = (dateString, locale = "en-US", options = {}) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options
  });
};

export class HttpError extends Error {
  status: any;
  constructor(message) {
    super(message);
    this.name = 'HttpError';
    this.status = 'error';
  }
}

export const getNestedTranslation = (translations: { [key: string]: any }, key: string): string => {
  if (!key || typeof key !== 'string') {
    return key; // Return the key as is if it's undefined or not a string
  }
  
  return key.split('.').reduce((obj, k) => (obj ? obj[k] : key), translations) || key;
};

export const getFileNameFromPath = (path) => {
  return path ? path.split('\\').pop().split('/').pop() : '';
};