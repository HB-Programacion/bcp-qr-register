import React, { useState, useEffect } from 'react'
import { BrowserMultiFormatReader } from '@zxing/library';

const QRScanner = () => {
   const [scannedText, setScannedText] = useState('');

   useEffect(() => {
      const codeReader = new BrowserMultiFormatReader();
      codeReader.decodeFromInputVideoDevice(undefined, 'video').then(result => {
         console.log("result", result)
         const res = result.text;
         const cleanString = res.replace(/\\/g, '').replace(/\n/g, '').replace(/\r/g, '').replace(/\t/g, '');
         const jsonObject = JSON.parse(cleanString);
         console.log("jsonObject", JSON.stringify(jsonObject))
         setScannedText(JSON.stringify(jsonObject));
      }).catch(err => {
         console.error(err);
      });
   }, []);
   
   return (
      <div>
         <video id="video" width="80%" height="50%"></video>
         <p>Scanned Text: {scannedText}</p>
      </div>
   );
}

export default QRScanner;
