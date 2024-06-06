import React, { useRef, useState } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs';

const ImageAnalysisComponent = () => {
    const [result, setResult] = useState(null);
    const imageRef = useRef();

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        imageRef.current.src = imageUrl;

        const model = await mobilenet.load();
        const predictions = await model.classify(imageRef.current);
        setResult(predictions[0].className);
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <img ref={imageRef} alt="Analyzing" style={{ display: 'none' }} />
            {result && <div>Analysis Result: {result}</div>}
        </div>
    );
};

export default ImageAnalysisComponent;
