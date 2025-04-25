import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText
} from '@ionic/react';
import FeedContainer from '../../components/FeedContainer';

const Feed: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>📣 Community Feed</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen color="light">
        <div style={{ padding: '16px' }}>
          <IonCard className="ion-activatable ripple-parent" style={{ borderRadius: '20px', background: '#fefefe', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)' }}>
            <IonCardHeader>
              <IonCardTitle style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>👋 Welcome to Your Feed</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonText color="medium">
                🚀 Stay connected, inspired, and express yourself. Here’s where your stories shine! 🌟
              </IonText>
            </IonCardContent>
          </IonCard>

          <FeedContainer />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Feed;
