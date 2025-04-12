from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

app = Flask(__name__)
CORS(app)

# Initialize the model
model = None
scaler = None
label_encoder = None

def load_or_train_model():
    global model, scaler, label_encoder
    
    # Check if model file exists
    if os.path.exists('crop_predictor_model.joblib'):
        # Load the model
        model_data = joblib.load('crop_predictor_model.joblib')
        model = model_data['model']
        scaler = model_data['scaler']
        label_encoder = model_data['label_encoder']
        print("Model loaded from file")
    else:
        # Train a new model
        print("Training new model...")
        # Load dataset
        df = pd.read_csv('Crop_recommendation.csv')
        
        # Prepare features and target
        X = df.drop("label", axis=1)
        y = df["label"]
        
        # Encode crop labels
        label_encoder = LabelEncoder()
        y_encoded = label_encoder.fit_transform(y)
        
        # Split dataset
        X_train, X_test, y_train, y_test = train_test_split(
            X, y_encoded, test_size=0.2, random_state=42
        )
        
        # Scale features
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        
        # Train model
        model = RandomForestClassifier(random_state=42)
        model.fit(X_train_scaled, y_train)
        
        # Save the model
        model_data = {
            'model': model,
            'scaler': scaler,
            'label_encoder': label_encoder
        }
        joblib.dump(model_data, 'crop_predictor_model.joblib')
        print("Model trained and saved")

# Load or train the model when the app starts
load_or_train_model()

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Extract features
        N = float(data['N'])
        P = float(data['P'])
        K = float(data['K'])
        temperature = float(data['temperature'])
        humidity = float(data['humidity'])
        ph = float(data['ph'])
        rainfall = float(data['rainfall'])
        
        # Prepare input data
        input_data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
        
        # Scale input
        input_scaled = scaler.transform(input_data)
        
        # Get prediction and probabilities
        prediction = model.predict(input_scaled)[0]
        probabilities = model.predict_proba(input_scaled)[0]
        
        # Convert prediction to crop name
        recommended_crop = label_encoder.inverse_transform([prediction])[0]
        
        # Create probability dictionary
        crop_names = label_encoder.classes_
        prob_dict = {crop: float(prob) for crop, prob in zip(crop_names, probabilities)}
        
        # Sort probabilities and get top 5
        top_5_crops = dict(sorted(prob_dict.items(), key=lambda x: x[1], reverse=True)[:5])
        
        return jsonify({
            'recommendedCrop': recommended_crop,
            'probabilities': top_5_crops
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000) 