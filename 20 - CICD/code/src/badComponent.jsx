// Violates several React rules and best practices
// import React from 'react';
// import ReactDOM from 'react-dom';

// const BadComponent = () => {
//   // Undefined variable usage
//   const undefinedVariable = undefinedVariable;

//   // Unescaped apostrophe
//   const unescapedString = "This string contains an apostrophe: John's";

//   return (
//     <div class="container">

//       {/* Duplicate props */}
//       <button type="button" type="submit">Click Me</button>

//       {/* Unsafe usage of target="_blank" without rel="noopener noreferrer" */}
//       <a href="https://example.com" target="_blank">Visit Example</a>

//       {/* Passing children and using dangerouslySetInnerHTML */}
//       <div dangerouslySetInnerHTML={{ __html: '<p>Unsafe HTML</p>' }}>Text content</div>
//     </div>
//   );
// };

// // Another component with issues
// const MyButton = (props) => {
//   return <button>{props.label}</button>; // Missing prop-types validation
// };

// export default BadComponent;