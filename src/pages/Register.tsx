import React, { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonInput,
  IonInputPasswordToggle,
  IonPage,
  IonTitle,
  IonModal,
  IonText,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonAlert,
  IonSpinner,
} from '@ionic/react';
import { supabase } from '../utils/supabaseClient';
import bcrypt from 'bcryptjs';

const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onClose}
      header="Notification"
      message={message}
      buttons={['OK']}
    />
  );
};

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
  const [loading, setLoading] = useState(false);

  const handleOpenVerificationModal = () => {
    if (!email.endsWith('@nbsc.edu.ph') && !email.endsWith('@gmail.com')) {
      setAlertMessage('Please register with a valid email domain (nbsc.edu.ph or gmail.com).');
      setShowAlert(true);
      return;
    }
    if (password !== confirmPassword) {
      setAlertMessage('Passwords do not match.');
      setShowAlert(true);
      return;
    }
    setShowVerificationModal(true);
  };

  const doRegister = async () => {
    setLoading(true);
    setShowVerificationModal(false);
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw new Error('Account creation failed: ' + error.message);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const { error: insertError } = await supabase.from('users').insert([{
        username,
        user_email: email,
        user_firstname: firstName,
        user_lastname: lastName,
        user_password: hashedPassword,
      }]);
      if (insertError) throw new Error('Failed to save user data: ' + insertError.message);

      setShowSuccessModal(true);
    } catch (err) {
      setAlertMessage(err instanceof Error ? err.message : 'An unknown error occurred.');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    margin: '10px auto',
    width: '100%',
    borderRadius: '25px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    fontWeight: '400',
    color: '#333',
    padding: '12px 20px',
    backgroundColor: '#fff',
  };

  return (
    <IonPage>
      <IonContent
        fullscreen
        className="ion-padding"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: 0,
          animation: 'fadeSlideIn 1s ease-in-out forwards',
        }}
      >
        <div
          style={{
            width: '90%',
            maxWidth: '500px', // Adjust max width for better centering on all devices
            padding: '30px',
            borderRadius: '30px',
            backgroundColor: 'rgba(254, 254, 254, 0.95)',
            boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#333' }}>Create your account</h1>

          <IonInput style={inputStyle} label="Username" labelPlacement="floating" fill="outline" type="text" placeholder="Enter a unique username" value={username} onIonChange={e => setUsername(e.detail.value!)} />
          <IonInput style={inputStyle} label="First Name" labelPlacement="floating" fill="outline" type="text" placeholder="Input your name" value={firstName} onIonChange={e => setFirstName(e.detail.value!)} />
          <IonInput style={inputStyle} label="Last Name" labelPlacement="floating" fill="outline" type="text" placeholder="Input your surname" value={lastName} onIonChange={e => setLastName(e.detail.value!)} />
          <IonInput style={inputStyle} label="Email" labelPlacement="floating" fill="outline" type="email" placeholder="Any Email" value={email} onIonChange={e => setEmail(e.detail.value!)} />
          <IonInput style={inputStyle} label="Password" labelPlacement="floating" fill="outline" type="password" placeholder="Input password" value={password} onIonChange={e => setPassword(e.detail.value!)} >
            <IonInputPasswordToggle slot="end" />
          </IonInput>
          <IonInput style={inputStyle} label="Repeat Password" labelPlacement="floating" fill="outline" type="password" placeholder="Repeat password" value={confirmPassword} onIonChange={e => setConfirmPassword(e.detail.value!)} >
            <IonInputPasswordToggle slot="end" />
          </IonInput>

          <IonButton
            style={{
              margin: '10px auto',
              width: '100%',
              borderRadius: '25px',
              fontWeight: '600',
              color: '#fff',
              backgroundColor: '#38ada9',
            }}
            onClick={handleOpenVerificationModal}
            expand="full"
            shape="round"
            disabled={loading}
          >
            {loading ? <IonSpinner name="dots" /> : 'Register'}
          </IonButton>

          <IonButton
            routerLink="/it35-lab"
            fill="clear"
            shape="round"
            style={{ marginTop: '10px', fontSize: '15px', color: '#38ada9' }}
          >
            Already have an account? Sign in
          </IonButton>
        </div>

        {/* Modals */}
        <IonModal isOpen={showVerificationModal} onDidDismiss={() => setShowVerificationModal(false)}>
          <IonContent className="ion-padding">
            <IonCard style={{ marginTop: '20%', borderRadius: '20px' }}>
              <IonCardHeader>
                <IonCardTitle>User Registration Details</IonCardTitle>
                <hr />
                <IonCardSubtitle>Username</IonCardSubtitle>
                <IonCardTitle>{username}</IonCardTitle>
                <IonCardSubtitle>Email</IonCardSubtitle>
                <IonCardTitle>{email}</IonCardTitle>
                <IonCardSubtitle>Name</IonCardSubtitle>
                <IonCardTitle>{firstName} {lastName}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent />
              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
                <IonButton fill="outline" color="medium" onClick={() => setShowVerificationModal(false)}>Cancel</IonButton>
                <IonButton color="success" onClick={doRegister}>Confirm</IonButton>
              </div>
            </IonCard>
          </IonContent>
        </IonModal>

        <IonModal isOpen={showSuccessModal} onDidDismiss={() => setShowSuccessModal(false)}>
          <IonContent className="ion-padding" style={{ textAlign: 'center' }}>
            <div style={{ marginTop: '30%', padding: '30px', borderRadius: '20px', boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff' }}>
              <IonTitle style={{ fontSize: '22px', color: '#28a745' }}>✅ Registration Successful!</IonTitle>
              <IonText>
                <p>Your account has been created successfully.</p>
                <p>Proceed to sign in.</p>
              </IonText>
              <IonButton style={{ marginTop: '20px' }} color="primary" expand="full" onClick={() => setShowSuccessModal(false)}>
                Close
              </IonButton>
            </div>
          </IonContent>
        </IonModal>

        <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />
      </IonContent>
    </IonPage>
  );
};

export default Register;
