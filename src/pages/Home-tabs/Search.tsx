import React from 'react';
import {
  IonItem,
  IonLabel,
  IonReorder,
  IonReorderGroup,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  ItemReorderEventDetail,
} from '@ionic/react';

function Search() {
  const handleReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);
    event.detail.complete();
  };

  const topics = [
    '🌐 Networking & Communication',
    '💾 Data Storage & Management',
    '🔐 Cybersecurity Fundamentals',
    '🛠️ Software Development',
    '☁️ Cloud Computing & Services',
  ];

  return (
    <>
      <style>{`
        .reorder-card {
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
          border-radius: 16px;
          overflow: hidden;
          background: #ffffff;
        }

        .reorder-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1d4ed8;
          text-align: center;
          padding: 8px 0;
        }

        .reorder-item {
          background: #f1f5f9;
          border-radius: 10px;
          margin-bottom: 10px;
          padding: 12px 16px;
          transition: all 0.2s ease;
        }

        .reorder-item:hover {
          background: #e2e8f0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .reorder-label {
          font-size: 1rem;
          font-weight: 500;
          color: #0f172a;
        }

        .wrapper {
          padding: 1rem;
          max-width: 600px;
          margin: 0 auto;
        }
      `}</style>

      <div className="wrapper">
        <IonCard className="reorder-card">
          <IonCardHeader>
            <IonCardTitle className="reorder-title">📚 Reorder Topics</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
              {topics.map((topic, index) => (
                <IonItem key={index} lines="inset" className="reorder-item">
                  <IonLabel className="reorder-label">{topic}</IonLabel>
                  <IonReorder slot="end" />
                </IonItem>
              ))}
            </IonReorderGroup>
          </IonCardContent>
        </IonCard>
      </div>
    </>
  );
}
 
export default Search;
