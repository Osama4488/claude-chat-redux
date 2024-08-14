// import React, { useState } from 'react';
// import parse from "html-react-parser"

// const CodeBlock = ({ code }) => {
//   const [copied, setCopied] = useState(false);

//   const handleCopy = () => {
//     navigator.clipboard.writeText(code);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     // <div className="code-container">
//     //   <button className="copy-code-btn" onClick={handleCopy}>
//     //     {copied ? 'Copied!' : 'Copy Code'}
//     //   </button>
//     //   <pre>
//     //     <code>{parse(code)}</code>
//     //   </pre>
//     // </div>
//     // <div className="code-container">
//         parse(code)
        
//     // </div>
//   );
// };

// export default CodeBlock;


import React, { useState } from 'react';
import { Tooltip, IconButton } from '@mui/material';
import CopyAllIcon from '@mui/icons-material/CopyAll';

// Function to add copy buttons to code blocks
const addCopyButtons = (html) => {
  // Create a temporary element to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  // Get all <pre> tags
  const preBlocks = tempDiv.querySelectorAll('pre');

  preBlocks.forEach(pre => {
    const codeBlock = pre.querySelector('code');
    if (codeBlock) {
      const codeContent = codeBlock.textContent || '';
      const copyButton = document.createElement('button');
      copyButton.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM6 17H18V7H6V17ZM10 10H14V14H10V10Z" fill="currentColor"/></svg>';
      copyButton.style.position = 'absolute';
      copyButton.style.top = '10px';
      copyButton.style.right = '10px';
      copyButton.style.backgroundColor = '#f0f0f0';
      copyButton.style.border = 'none';
      copyButton.style.cursor = 'pointer';
      copyButton.style.borderRadius = '4px';
      copyButton.style.padding = '4px';
      copyButton.onclick = () => {
        navigator.clipboard.writeText(codeContent);
        alert('Code copied!');
      };

      pre.style.position = 'relative';
      pre.appendChild(copyButton);
    }
  });

  return tempDiv.innerHTML;
};

const CodeBlock = ({ code }) => {
  const [html, setHtml] = useState('');

  React.useEffect(() => {
    // Add copy buttons to code blocks when component mounts or code changes
    setHtml(addCopyButtons(code));
  }, [code]);

  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
};

export default CodeBlock;
