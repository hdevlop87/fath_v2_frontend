import React from "react";

export default function Breadcrumbs({ breadcrumbsData, onBreadcrumbClick }) {
  const handleClick = (folder) => {
    onBreadcrumbClick(folder.id);
  };

  return (
    <nav className="breadcrumb">
      <ul className="flex">
        {breadcrumbsData.map((segment, index) => (
          <li key={segment.id} className="breadcrumb-item">
            <button
              onClick={() => handleClick(segment)} 
              className="hover:underline"
            >
              {segment.name}
            </button>
            {index < breadcrumbsData.length - 1 && (
              <span className="mx-2">{">"}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
