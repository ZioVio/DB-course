// import libxslt from 'libxslt';

// doesn't work

// export const XMLToXHTML = async (xml: string, xslt: string): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     libxslt.parse(xml, (err, stylesheet) => {
//       if (err) {
//         return reject(err);
//       }
//       // 'params' parameter is optional
//       stylesheet.apply(xslt, {}, (err, result) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(result);
//         }
//         // err contains any error from parsing the document or applying the stylesheet
//         // result is a string containing the result of the transformation
//       });
//     });
//   });
// }
