import React from 'react';
import {
  IonItem,
  IonLabel,
  IonList,
  IonReorder,
  IonReorderGroup,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  ItemReorderEventDetail,
} from '@ionic/react';

function Search() {
  function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);
    event.detail.complete();
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* IT Definition Card */}
      <IonCard color="light" style={definitionStyle}>
        <IonCardHeader>
          <IonCardTitle style={titleStyle}>What is Information Technology?</IonCardTitle>
        </IonCardHeader>
        <IonCardContent style={contentStyle}>
          Information Technology (IT) refers to the use of systems (especially computers and telecommunications) for storing, retrieving, and sending information. It plays a key role in modern communication, data handling, and business operations.
        </IonCardContent>
      </IonCard>

      {/* Reorderable List */}
      <IonList
        lines="none"
        style={{
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          background: '#f9fafb',
        }}
      >
        <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
          {[
            'Networking & Communication',
            'Data Storage & Management',
            'Cybersecurity Fundamentals',
            'Software Development',
            'Cloud Computing & Services',
          ].map((topic, index) => (
            <IonItem key={index} style={itemStyle}>
              <IonLabel style={labelStyle}>{topic}</IonLabel>
              <IonReorder slot="end" />
            </IonItem>
          ))}
        </IonReorderGroup>
      </IonList>
    </div>
  );
}

// 🎨 Styles
const definitionStyle = {
  backgroundColor: '#e0f2fe',
  borderLeft: '5px solid #3b82f6',
  marginBottom: '20px',
};

const titleStyle = {
  fontSize: '1.4rem',
  color: '#1e3a8a',
  fontWeight: 'bold',
};

const contentStyle = {
  fontSize: '1rem',
  color: '#374151',
};

const itemStyle = {
  padding: '12px 16px',
  backgroundColor: '#ffffff',
  borderBottom: '1px solid #e5e7eb',
};

const labelStyle = {
  fontSize: '1rem',
  fontWeight: 500,
  color: '#111827',
};

export default Search;
