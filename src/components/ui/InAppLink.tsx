import React from 'react';

interface InAppLinkProps {
  /** The unique ID of the call log to open */
  id: string;
  /** The text to display in the button */
  children: React.ReactNode;
  /** onClick handler that receives the ID as the second parameter */
  onClick?: (e: React.MouseEvent, id: string) => void;
  /** Optional className to override default styling */
  className?: string;
  /** Additional props to pass to the button */
  [key: string]: any;
}

/**
 * InAppLink component used for creating links to call logs within the app
 * When clicked, opens the sidebar with the specified call log
 */
export const InAppLink: React.FC<InAppLinkProps> = ({
  id,
  children,
  onClick,
  className,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // Call the onClick handler with the ID
    if (onClick) {
      onClick(e, id);
    }
  };

  // Keep only the basic class
  const baseClass = 'gravity-in-app-button';
  const combinedClassName = className ? `${baseClass} ${className}` : baseClass;

  return (
    <a
      href="#"
      onClick={handleClick}
      className={combinedClassName}
      title={`Open call log: ${id}`}
      data-call-id={id}
      {...props}
    >
      {children}
    </a>
  );
};
