
import React, { useState, useRef, useEffect } from 'react';
import {
  IonContent, IonPage, IonInput, IonButton, IonAlert, IonHeader,
  IonBackButton, IonButtons, IonItem, IonText, IonCol, IonGrid,
  IonRow, IonInputPasswordToggle, IonImg, IonAvatar, IonCard, IonCardContent, IonSpinner
} from '@ionic/react';
import { supabase } from '../utils/supabaseClient';
import { useHistory } from 'react-router-dom';

const EditAccount: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    currentPassword: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    username: '',
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();

  const handleError = (message: string) => {
    setAlertMessage(message);
    setShowAlert(true);
    setLoading(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: session, error } = await supabase.auth.getSession();
      if (error || !session?.session) {
        handleError('You must be logged in to access this page.');
        history.push('/it35-lab/login');
        return;
      }

      const email = session.session.user.email;
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('user_firstname, user_lastname, user_avatar_url, user_email, username')
        .eq('user_email', email)
        .single();

      if (userError || !user) {
        handleError('Failed to fetch user data.');
        return;
      }

      setFormData(prev => ({
        ...prev,
        email: user.user_email,
        firstName: user.user_firstname || '',
        lastName: user.user_lastname || '',
        username: user.username || '',
      }));

      setAvatarPreview(user.user_avatar_url || null);
    };

    fetchUserData();

    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [history]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    const { password, confirmPassword, currentPassword } = formData;

    if (password && password !== confirmPassword) {
      return handleError("New passwords do not match.");
    }

    const { data: session, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session?.session) {
      return handleError('Session expired. Please log in again.');
    }

    const user = session.session.user;

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: user.email!,
      password: currentPassword,
    });

    if (authError) {
      return handleError('Incorrect current password.');
    }

    let avatarUrl = avatarPreview;

    if (avatarFile) {
      const fileExt = avatarFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('user-avatars')
        .upload(filePath, avatarFile, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) {
        return handleError(`Failed to upload avatar: ${uploadError.message}`);
      }

      const { data } = supabase.storage.from('user-avatars').getPublicUrl(filePath);
      avatarUrl = data.publicUrl;
    }

    const { error: updateError } = await supabase
      .from('users')
      .update({
        user_firstname: formData.firstName,
        user_lastname: formData.lastName,
        user_avatar_url: avatarUrl,
        username: formData.username,
      })
      .eq('user_email', user.email);

    if (updateError) {
      return handleError(updateError.message);
    }

    if (password) {
      const { error: pwError } = await supabase.auth.updateUser({ password });
      if (pwError) {
        return handleError(pwError.message);
      }
    }

    setLoading(false);
    setAlertMessage('Your account has been updated successfully.');
    setShowAlert(true);
    history.push('/it35-lab/app');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/it35-lab/app" />
        </IonButtons>
      </IonHeader>

      <IonContent className="ion-padding" style={{
        backgroundImage: 'url(https://your-background-image-url.com)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <IonCard className="ion-padding" style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}>
          <IonCardContent>
            <IonText color="primary"><h2>Edit Account</h2></IonText>

            <IonGrid className="ion-margin-top">
              <IonRow className="ion-justify-content-center">
                <IonCol size="auto" className="ion-text-center">
                  {avatarPreview && (
                    <IonAvatar style={{ width: '120px', height: '120px', margin: '0 auto' }}>
                      <IonImg src={avatarPreview} />
                    </IonAvatar>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleAvatarChange}
                  />
                  <IonButton
                    expand="block"
                    onClick={() => fileInputRef.current?.click()}
                    shape="round"
                    color="medium"
                    className="ion-margin-top"
                  >
                    Change Avatar
                  </IonButton>
                </IonCol>
              </IonRow>

              {/* Form Fields */}
              <IonRow>
                <IonCol size="12">
                  <IonInput
                    label="Username"
                    labelPlacement="floating"
                    fill="outline"
                    placeholder="Enter username"
                    value={formData.username}
                    onIonChange={e => handleInputChange('username', e.detail.value!)}
                  />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6">
                  <IonInput
                    label="First Name"
                    labelPlacement="floating"
                    fill="outline"
                    placeholder="First Name"
                    value={formData.firstName}
                    onIonChange={e => handleInputChange('firstName', e.detail.value!)}
                  />
                </IonCol>
                <IonCol size="6">
                  <IonInput
                    label="Last Name"
                    labelPlacement="floating"
                    fill="outline"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onIonChange={e => handleInputChange('lastName', e.detail.value!)}
                  />
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="12">
                  <IonText color="medium"><h4>Change Password</h4></IonText>
                  <IonInput
                    label="New Password"
                    type="password"
                    labelPlacement="floating"
                    fill="outline"
                    placeholder="Enter new password"
                    value={formData.password}
                    onIonChange={e => handleInputChange('password', e.detail.value!)}
                  >
                    <IonInputPasswordToggle slot="end" />
                  </IonInput>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="12">
                  <IonInput
                    label="Confirm Password"
                    type="password"
                    labelPlacement="floating"
                    fill="outline"
                    placeholder="Re-enter new password"
                    value={formData.confirmPassword}
                    onIonChange={e => handleInputChange('confirmPassword', e.detail.value!)}
                  >
                    <IonInputPasswordToggle slot="end" />
                  </IonInput>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="12">
                  <IonText color="medium"><h4>Verify Identity</h4></IonText>
                  <IonInput
                    label="Current Password"
                    type="password"
                    labelPlacement="floating"
                    fill="outline"
                    placeholder="Enter current password"
                    value={formData.currentPassword}
                    onIonChange={e => handleInputChange('currentPassword', e.detail.value!)}
                  >
                    <IonInputPasswordToggle slot="end" />
                  </IonInput>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="12" className="ion-margin-top">
                  <IonButton
                    expand="block"
                    color="primary"
                    shape="round"
                    onClick={handleUpdate}
                    disabled={loading}
                  >
                    {loading ? <IonSpinner name="crescent" /> : 'Update Account'}
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default EditAccount;
