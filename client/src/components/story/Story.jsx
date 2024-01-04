// import "./Post.css";

// const Post = ({ handlePostClick, ...post }) => {
//   const trimText = (text) => {
//     if (!text) {
//       console.log(`text is undefined : ${text}`);
//       return;
//     }
//     const trimmedText = text.substring(0, 100);
//     return (
//       trimmedText.substring(
//         0,
//         Math.min(trimmedText.length, trimmedText.lastIndexOf(" "))
//       ) + " ..."
//     );
//   };

//   return (
//     <section className="single-post-container">
//       <main onClick={() => handlePostClick(post)}>
//         <div className="single-post-text">
//           <h2>{post.prompt}</h2>
//           <p>{trimText(post.text)}</p>
//         </div>
//       </main>
//     </section>
//   );
// };

// export default Post;
