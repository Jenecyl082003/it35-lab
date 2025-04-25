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
import React from 'react';

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
        .wrapper {
          padding: 1rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .reorder-card {
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
        }

        .reorder-title {
          font-size: 1.6rem;
          font-weight: 700;
          color: #0f172a;
          text-align: center;
          padding: 1rem 0 0.5rem;
        }

        .reorder-item {
          background: linear-gradient(90deg,rgb(20, 56, 92),rgb(122, 162, 202));
          border-radius: 14px;
          margin-bottom: 12px;
          padding: 14px 18px;
          transition: all 0.25s ease;
          cursor: grab;
        }

        .reorder-item:hover {
          background: #e2e8f0;
          transform: scale(1.015);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }

        .reorder-label {
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
        }

        .reorder-group {
          padding-top: 4px;
        }
      `}</style>

      <div className="wrapper">
        <IonCard className="reorder-card">
          <IonCardHeader>
            <IonCardTitle className="reorder-title">📚 Reorder Topics</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonReorderGroup className="reorder-group" disabled={false} onIonItemReorder={handleReorder}>
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
