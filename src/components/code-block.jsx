import React, { useState } from 'react';


const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-container">
      <button className="copy-code-btn" onClick={handleCopy}>
        {copied ? 'Copied!' : 'Copy Code'}
      </button>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
