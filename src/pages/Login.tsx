import { 
  IonAlert, 
  IonAvatar, 
  IonButton, 
  IonContent, 
  IonIcon, 
  IonInput, 
  IonInputPasswordToggle,  
  IonPage,  
  IonText, 
  IonLoading, 
  IonToast,  
  useIonRouter 
} from '@ionic/react';
import { logoIonic } from 'ionicons/icons';
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
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh', // Center vertically
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '15px',
          boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
        }}>
          <IonAvatar
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              marginBottom: '20px',
              backgroundColor: '#007bff',
            }}
          >
            <IonIcon 
              icon={logoIonic}
              color='light'
              style={{ fontSize: '60px' }} 
            />
          </IonAvatar>

          <IonText color="primary" style={{ marginBottom: '20px' }}>
            <h1>USER LOGIN</h1>
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
            style={{ width: '100%', marginBottom: '15px' }}
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
            style={{ width: '100%', marginBottom: '25px' }}
          >
            <IonInputPasswordToggle slot="end" />
          </IonInput>

          <IonButton onClick={doLogin} expand="full" shape="round" color="primary" disabled={isLoading} style={{ marginBottom: '15px' }}>
            {isLoading ? 'Logging In...' : 'Login'}
          </IonButton>

          <IonButton routerLink="/it35-lab/register" expand="full" fill="clear" shape="round" color="secondary">
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
      </IonContent>
    </IonPage>
  );
};

export default Login;
