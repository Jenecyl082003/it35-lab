import { 
  IonAlert, 
  IonButton, 
  IonContent, 
  IonInput, 
  IonInputPasswordToggle,  
  IonPage,  
  IonText, 
  IonLoading, 
  IonToast,  
  useIonRouter 
} from '@ionic/react';
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

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

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateInputs = () => {
    if (!email || !password) {
      setAlertMessage("Please fill in both email and password.");
      setShowAlert(true);
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setAlertMessage("Please enter a valid email address.");
      setShowAlert(true);
      return false;
    }

    return true;
  };

  const doLogin = async () => {
    if (!validateInputs()) return;

    setIsLoading(true); // Show loading spinner

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setIsLoading(false); // Hide loading spinner

    if (error) {
      setAlertMessage(error.message);
      setShowAlert(true);
      return;
    }

    setShowToast(true); 
    setTimeout(() => {
      navigation.push('/it35-lab/app', 'forward', 'replace');
    }, 300);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        {/* Background with gradient */}
        <div style={{
          background: 'linear-gradient(to right, #6a11cb, #2575fc)', // Gradient effect
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh', // Container height
            padding: '30px',
            backgroundColor: '#ffffff',
            borderRadius: '15px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            width: '90%',
            maxWidth: '400px', // Max width for a clean look
          }}>
            <IonText color="primary" style={{ marginBottom: '20px', fontSize: '2rem', fontWeight: '600' }}>
              <h1>Welcome Back!</h1>
              <p>Login to your account</p>
            </IonText>

            <IonInput
              label="Email"
              labelPlacement="floating"
              fill="outline"
              type="email"
              placeholder="Enter Email"
              value={email}
              onIonChange={e => setEmail(e.detail.value!)}
              required
              style={{
                width: '100%',
                marginBottom: '20px',
                borderRadius: '10px',
                backgroundColor: '#f1f1f1',
                paddingLeft: '12px',
                color: 'black',
              }}
            />

            <IonInput
              label="Password"
              labelPlacement="floating"
              fill="outline"
              type="password"
              placeholder="Enter Password"
              value={password}
              onIonChange={e => setPassword(e.detail.value!)}
              required
              style={{
                width: '100%',
                marginBottom: '25px',
                borderRadius: '10px',
                backgroundColor: '#f1f1f1',
                paddingLeft: '12px',
                color: 'black',
              }}
            >
              
              <IonInputPasswordToggle slot="end" />
            </IonInput>

            <IonButton 
              onClick={doLogin} 
              expand="full" 
              shape="round" 
              color="primary" 
              disabled={isLoading} 
              style={{
                marginBottom: '20px',
                padding: '15px',
                fontSize: '1.2rem',
                textTransform: 'uppercase',
              }}
            >
              {isLoading ? 'Logging In...' : 'Login'}
            </IonButton>

            <IonButton 
              routerLink="/it35-lab/register" 
              expand="full" 
              fill="clear" 
              shape="round" 
              color="secondary"
              style={{ fontWeight: '500' }}
            >
              Don't have an account? Register here
            </IonButton>

            {/* Reusable AlertBox Component */}
            <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />

            {/* IonToast for success message */}
            <IonToast
              isOpen={showToast}
              onDidDismiss={() => setShowToast(false)}
              message="Login successful! Redirecting..."
              duration={1500}
              position="top"
              color="primary"
            />

            {/* IonLoading for loading state */}
            <IonLoading
              isOpen={isLoading}
              message={'Please wait...'}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
