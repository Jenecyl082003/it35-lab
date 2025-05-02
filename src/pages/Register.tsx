import React, { useState } from 'react';
import {
  IonPage, IonContent, IonTitle, IonInput, IonInputPasswordToggle,
  IonButton, IonModal, IonAlert, IonCard, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonCardContent, IonText, IonLoading
} from '@ionic/react';
import { supabase } from '../utils/supabaseClient';
import bcrypt from 'bcryptjs';

// Reusable Alert Box
const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => (
  <IonAlert
    isOpen={isOpen}
    onDidDismiss={onClose}
    header="Heads Up!"
    message={message}
    buttons={['OK']}
  />
);

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state for registration process

  const isValidEmail = (email: string) =>
    email.endsWith('@gmail.com') || email.endsWith('@nbsc.edu.ph');

  const handleOpenVerificationModal = () => {
    if (!username || !firstName || !lastName || !email || !password || !confirmPassword) {
      setAlertMessage("Please fill out all the fields.");
      return setShowAlert(true);
    }

    if (!isValidEmail(email)) {
      setAlertMessage("Only @gmail.com or @nbsc.edu.ph emails are allowed.");
      return setShowAlert(true);
    }

    if (password.length < 6) {
      setAlertMessage("Password must be at least 6 characters.");
      return setShowAlert(true);
    }

    if (password !== confirmPassword) {
      setAlertMessage("Passwords do not match.");
      return setShowAlert(true);
    }

    setShowVerificationModal(true);
  };

  const doRegister = async () => {
    setShowVerificationModal(false);
    setIsLoading(true);  // Set loading state true while registering

    try {
      const { error: signUpError } = await supabase.auth.signUp({ email, password });
      if (signUpError) throw new Error(`Sign-up failed: ${signUpError.message}`);

      const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

      const { error: insertError } = await supabase.from('users').insert([{
        username,
        user_email: email,
        user_firstname: firstName,
        user_lastname: lastName,
        user_password: hashedPassword,
      }]);

      if (insertError) throw new Error(`User creation failed: ${insertError.message}`);

      setShowSuccessModal(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong.';
      setAlertMessage(message);
      setShowAlert(true);
    } finally {
      setIsLoading(false);  // Reset loading state
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        {/* Background with gradient */}
        <div style={{
          background: 'linear-gradient(to right, #ff7e5f, #feb47b)', // Gradient effect
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <IonCard className="card-shadow" style={{ width: '90%', maxWidth: '500px' }}>
            <IonCardHeader>
              <IonCardTitle>Sign Up</IonCardTitle>
              <IonCardSubtitle>Complete the form below to get started</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <IonInput label="Username" labelPlacement="floating" fill="outline" value={username} onIonChange={e => setUsername(e.detail.value!)} placeholder="e.g. juan123" />
              <IonInput label="First Name" labelPlacement="floating" fill="outline" value={firstName} onIonChange={e => setFirstName(e.detail.value!)} placeholder="e.g. Juan" />
              <IonInput label="Last Name" labelPlacement="floating" fill="outline" value={lastName} onIonChange={e => setLastName(e.detail.value!)} placeholder="e.g. Dela Cruz" />
              <IonInput label="Email Address" labelPlacement="floating" fill="outline" type="email" value={email} onIonChange={e => setEmail(e.detail.value!)} placeholder="yourname@gmail.com" />
              <IonInput label="Password" labelPlacement="floating" fill="outline" type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} placeholder="Minimum 6 characters">
                <IonInputPasswordToggle slot="end" />
              </IonInput>
              <IonInput label="Confirm Password" labelPlacement="floating" fill="outline" type="password" value={confirmPassword} onIonChange={e => setConfirmPassword(e.detail.value!)} placeholder="Repeat password">
                <IonInputPasswordToggle slot="end" />
              </IonInput>

              <IonButton expand="block" shape="round" className="ion-margin-top" onClick={handleOpenVerificationModal} disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Register'}
              </IonButton>
              <IonButton expand="block" fill="clear" routerLink="/it35-lab">
                Already have an account? Log In
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Loading Spinner */}
        <IonLoading isOpen={isLoading} message={'Please wait...'} />

        {/* Verification Modal */}
<IonModal isOpen={showVerificationModal} onDidDismiss={() => setShowVerificationModal(false)}>
  <IonContent className="ion-padding" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <IonCard style={{ width: '100%', maxWidth: '420px', borderRadius: '12px', boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)', backgroundColor: '#f9f9f9' }}>
      <IonCardHeader style={{ paddingBottom: '10px', borderBottom: '2px solid #f2f2f2' }}>
        <IonCardTitle style={{ fontSize: '22px', fontWeight: 'bold', textAlign: 'center', color: '#333' }}>Confirm Your Details</IonCardTitle>
      </IonCardHeader>
      <IonCardContent style={{ padding: '20px' }}>
        <IonText>
          <p style={{ fontSize: '16px', color: '#555' }}><strong>Username:</strong> {username}</p>
          <p style={{ fontSize: '16px', color: '#555' }}><strong>Email:</strong> {email}</p>
          <p style={{ fontSize: '16px', color: '#555' }}><strong>Name:</strong> {firstName} {lastName}</p>
        </IonText>
      </IonCardContent>
      <div className="ion-text-end ion-padding" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <IonButton fill="clear" onClick={() => setShowVerificationModal(false)} style={{ color: '#888', fontWeight: '600' }}>Cancel</IonButton>
        <IonButton color="primary" onClick={doRegister} style={{ fontWeight: 'bold' }}>Confirm</IonButton>
      </div>
    </IonCard>
  </IonContent>
</IonModal>

{/* Success Modal */}
<IonModal isOpen={showSuccessModal} onDidDismiss={() => setShowSuccessModal(false)}>
  <IonContent className="ion-padding" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
    <IonCard className="ion-text-center" style={{ padding: '30px', borderRadius: '15px', boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)', backgroundColor: '#ffffff' }}>
      <IonTitle style={{ fontSize: '26px', color: '#4CAF50', marginBottom: '15px' }}>🎉 Account Created!</IonTitle>
      <IonText style={{ fontSize: '16px', color: '#555', lineHeight: '1.6' }}>
        <p>Your account has been successfully created.</p>
        <p>Check your email for the confirmation link to activate your account.</p>
      </IonText>
      <IonButton color="success" routerLink="/it35-lab" className="ion-margin-top" style={{ fontWeight: 'bold', padding: '10px 20px' }}>
        Go to Login
      </IonButton>
    </IonCard>
  </IonContent>
</IonModal>
        {/* Alert Component */}
        <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />
      </IonContent>
    </IonPage>
  );
};

export default Register;
