import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
import joblib

class CropPredictor:
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        self.label_encoder = LabelEncoder()
        self.is_trained = False
        
    def train(self):
        """Train the model using the crop recommendation dataset"""
        # Load dataset
        df = pd.read_csv('Crop_recommendation.csv')
        
        # Prepare features and target
        X = df.drop("label", axis=1)
        y = df["label"]
        
        # Encode crop labels
        y_encoded = self.label_encoder.fit_transform(y)
        
        # Split dataset
        X_train, X_test, y_train, y_test = train_test_split(
            X, y_encoded, test_size=0.2, random_state=42
        )
        
        # Scale features
        X_train_scaled = self.scaler.fit_transform(X_train)
        
        # Train model
        self.model = RandomForestClassifier(random_state=42)
        self.model.fit(X_train_scaled, y_train)
        self.is_trained = True
        
        # Return test accuracy
        X_test_scaled = self.scaler.transform(X_test)
        accuracy = self.model.score(X_test_scaled, y_test)
        return accuracy
    
    def predict(self, N, P, K, temperature, humidity, ph, rainfall):
        """
        Predict crop based on input parameters
        
        Parameters:
        - N: Nitrogen content in soil
        - P: Phosphorus content in soil
        - K: Potassium content in soil
        - temperature: Temperature in Celsius
        - humidity: Relative humidity in %
        - ph: pH value of soil
        - rainfall: Rainfall in mm
        
        Returns:
        - recommended_crop: String name of recommended crop
        - probabilities: Dictionary of crop probabilities
        """
        if not self.is_trained:
            raise Exception("Model needs to be trained first. Call train() method.")
            
        # Prepare input data
        input_data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
        
        # Scale input
        input_scaled = self.scaler.transform(input_data)
        
        # Get prediction and probabilities
        prediction = self.model.predict(input_scaled)[0]
        probabilities = self.model.predict_proba(input_scaled)[0]
        
        # Convert prediction to crop name
        recommended_crop = self.label_encoder.inverse_transform([prediction])[0]
        
        # Create probability dictionary
        crop_names = self.label_encoder.classes_
        prob_dict = {crop: prob for crop, prob in zip(crop_names, probabilities)}
        
        # Sort probabilities and get top 5
        top_5_crops = dict(sorted(prob_dict.items(), key=lambda x: x[1], reverse=True)[:5])
        
        return recommended_crop, top_5_crops
    
    def save_model(self, model_path='crop_predictor_model.joblib'):
        """Save the trained model and preprocessors"""
        if not self.is_trained:
            raise Exception("Model needs to be trained first before saving")
            
        model_data = {
            'model': self.model,
            'scaler': self.scaler,
            'label_encoder': self.label_encoder
        }
        joblib.dump(model_data, model_path)
        
    def load_model(self, model_path='crop_predictor_model.joblib'):
        """Load a trained model and preprocessors"""
        model_data = joblib.load(model_path)
        self.model = model_data['model']
        self.scaler = model_data['scaler']
        self.label_encoder = model_data['label_encoder']
        self.is_trained = True

# Example usage
if __name__ == "__main__":
    # Create predictor instance
    predictor = CropPredictor()
    
    # Train the model
    accuracy = predictor.train()
    print(f"Model trained with accuracy: {accuracy:.2%}")
    
    # Save the model
    predictor.save_model()
    
    # Example prediction
    N, P, K = 90, 42, 43
    temperature = 20.87
    humidity = 82.00
    ph = 6.5
    rainfall = 202.93
    
    crop, probabilities = predictor.predict(N, P, K, temperature, humidity, ph, rainfall)
    print(f"\nRecommended crop: {crop}")
    print("\nTop 5 crop probabilities:")
    for crop_name, probability in probabilities.items():
        print(f"{crop_name}: {probability:.2%}") 