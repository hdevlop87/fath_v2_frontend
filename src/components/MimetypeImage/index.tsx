'use client'

import React from 'react'
import { cn } from "@/lib/utils"

const imageToMimeTypesMap = {
    "image.png": ["image/*"],
    "png.png": ["image/png"],
    "jpg.png": ["image/jpeg", "image/jpg"],
    "pdf.png": ["application/pdf"],

    "doc.png": [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
        "application/vnd.ms-word.document.macroEnabled.12",
        "application/vnd.ms-word.template.macroEnabled.12"
    ],

    "xls.png": [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
        "application/vnd.ms-excel.sheet.macroEnabled.12",
        "application/vnd.ms-excel.template.macroEnabled.12",
        "application/vnd.ms-excel.addin.macroEnabled.12",
        "application/vnd.ms-excel.sheet.binary.macroEnabled.12"
    ],

    "ppt.png": [
        "application/vnd.ms-powerpoint",
        "application/vnd.ms-powerpoint",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.openxmlformats-officedocument.presentationml.template"
    ],

    "mp3.png": ["audio/mp3"],
    "txt.png": ["text/plain"],
    "avi.png": ["video/x-msvideo"],


    "csv.png": ["text/csv"],
    "javascript.png": ["application/javascript"],

    "json-file.png": ["application/json"],
    "xml.png": ["application/xml", "text/xml"],
    "html.png": ["text/html"],
    "css.png": ["text/css"],
    "illustrator.png": ["application/postscript", "application/illustrator"],
    "photoshop.png": ["image/vnd.adobe.photoshop"],
    "after-effects.png": ["custom/after-effects"],
    "premiere.png": ["custom/premiere"],
    "zip.png": ["application/zip"],
    "svg.png": ["image/svg+xml"],
    "file.png": ["default"]
};


const MimeTypeImage = ({ type, className="" }) => {

    const mimeTypeToImageMap = Object.keys(imageToMimeTypesMap).reduce((acc, image) => {
        imageToMimeTypesMap[image].forEach(mimeType => {
            acc[mimeType] = image;
        });
        return acc;
    }, {});

    function getImageNameForMimeType(mimeType) {
        return mimeTypeToImageMap[mimeType] || "file.png";
    }

    const imageName = getImageNameForMimeType(type);
    const imagePath = `/filesIcon/${imageName}`;

    return (
        <img src={imagePath} alt={`File Type`} className={cn("w-5 h-5", className)} />
    );
};

export default MimeTypeImage;


