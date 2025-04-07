import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/react';

const cards = [
  {
    title: 'Stay Curious',
    subtitle: 'Keep learning',
    content: 'The tech world evolves fast—be curious and keep exploring new tools and trends.',
  },
  {
    title: 'Code with Purpose',
    subtitle: 'Impact through logic',
    content: 'Every line of code you write can solve problems and change lives.',
  },
  {
    title: 'Break, Fix, Learn',
    subtitle: 'Fail forward',
    content: 'Mistakes are your best teachers in IT. Embrace them.',
  },
  {
    title: 'Secure the Future',
    subtitle: 'Think smart',
    content: 'Information is power. Protect it like gold.',
  },
  {
    title: 'You Belong in Tech',
    subtitle: 'Confidence is key',
    content: 'There’s no single path to success in IT. Your journey is valid.',
  },
];

function Feed() {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <IonCard color="light" style={definitionCardStyle}>
        <IonCardHeader>
          <IonCardTitle style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            What is Information Technology?
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent style={{ fontSize: '1rem', lineHeight: '1.6' }}>
          Information Technology (IT) is the use of computers, networks, storage, and other physical and digital infrastructure to store, retrieve, transmit, and manage data or information effectively.
        </IonCardContent>
      </IonCard>

      {cards.map((card, index) => (
        <IonCard key={index} style={cardStyle}>
          <IonCardHeader>
            <IonCardTitle style={titleStyle}>{card.title}</IonCardTitle>
            <IonCardSubtitle style={subtitleStyle}>{card.subtitle}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent style={contentStyle}>{card.content}</IonCardContent>
        </IonCard>
      ))}
    </div>
  );
}

// 🎨 Styling
const cardStyle = {
  marginBottom: '20px',
  borderRadius: '16px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
  backgroundColor: '#f3f4f6',
};

const titleStyle = {
  fontSize: '1.3rem',
  color: '#111827',
};

const subtitleStyle = {
  color: '#6b7280',
  fontSize: '0.9rem',
};

const contentStyle = {
  color: '#374151',
  fontSize: '1rem',
};

const definitionCardStyle = {
  backgroundColor: '#e0f2fe',
  borderLeft: '5px solid #3b82f6',
  marginBottom: '30px',
};

export default Feed;