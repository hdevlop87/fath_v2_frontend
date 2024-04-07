import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from "jsonwebtoken";
import { format, parseISO } from 'date-fns';
import axios from 'axios';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export function verifyJwt(token: string) {
  try {
    const secret_key = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secret_key!);
    return decoded as JwtPayload;
  } catch (error) {
    return null;
  }
}

export function calculateBalanceDue(totalPrice, payments) {
  let balance = typeof totalPrice === "string" ? parseFloat(totalPrice) : totalPrice;

  for (let payment of payments) {
      let paymentAmount = typeof payment.amount === "string" ? parseFloat(payment.amount) : payment.amount;
      balance -= paymentAmount;
  }

  return Math.max(0, balance);
}

export function calculatePaidPercentage(totalPrice, totalPaid) {
  let numericTotalPrice = typeof totalPrice === "string" ? parseFloat(totalPrice) : totalPrice;
  const percentage = (totalPaid / numericTotalPrice) * 100;
  return Math.min(percentage, 100);
}

export function calculateTotalPaid(payments) {
  let totalPaid = 0;

  for(let payment of payments) {
    if (payment.status === 'Verified') {
      let paymentAmount = typeof payment.amount === "string" ? parseFloat(payment.amount) : payment.amount;
      totalPaid += paymentAmount;
    }
  }

  return totalPaid;
}

export const formatNumber = (value) => {
   let number = parseFloat(value);
   return number % 1 === 0 ? Math.floor(number) : number.toFixed(2);
};

export const formatDate = (dateString) => {
   return format(parseISO(dateString), 'yyyy-MM-dd');
};


export function formatCommas(x) {
  return x?.toString().replace(/(\d)(?=(\d{4})+(?!\d))/g, '$1,');
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

        // Convert canvas to Blob (async)
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

  await axios.post('/api/fileUpload', formData, config);
};

export class HttpError extends Error {
  status: any;
  constructor(message) {
      super(message);
      this.name = 'HttpError';
      this.status = 'error';
  }
}