import React from 'react';
import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  AccordionGroupCustomEvent
} from '@ionic/react';

function Favorites() {
  const quotes = [
    {
      value: 'first',
      icon: '🚀',
      title: 'Dream Big',
      quote: '“The future belongs to those who believe in the beauty of their dreams.”',
      author: 'Eleanor Roosevelt'
    },
    {
      value: 'second',
      icon: '🔥',
      title: 'Stay Focused',
      quote: '“Don’t watch the clock; do what it does. Keep going.”',
      author: 'Sam Levenson'
    },
    {
      value: 'third',
      icon: '🌟',
      title: 'Make It Happen',
      quote: '“Success doesn’t just find you. You have to go out and get it.”',
      author: 'Unknown'
    },
    {
      value: 'fourth',
      icon: '💡',
      title: 'Believe in Yourself',
      quote: '“Believe you can and you\'re halfway there.”',
      author: 'Theodore Roosevelt'
    },
    {
      value: 'fifth',
      icon: '💥',
      title: 'Never Give Up',
      quote: '“Our greatest glory is not in never falling, but in rising every time we fall.”',
      author: 'Confucius'
    },
    {
      value: 'sixth',
      icon: '🌈',
      title: 'Stay Positive',
      quote: '“Keep your face always toward the sunshine—and shadows will fall behind you.”',
      author: 'Walt Whitman'
    }
  ];

  const handleAccordionChange = (event: AccordionGroupCustomEvent) => {
    const newValue = event.detail.value;
    const collapsed = quotes.map(q => q.value).filter(v => v !== newValue);
    console.log(
      `Expanded: ${newValue ?? 'None'} | Collapsed: ${collapsed.join(', ')}`
    );
  };

  return (
    <>
      <style>{`
        .quote-content {
          animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        ion-accordion[aria-expanded="true"] ion-item {
          background-color: #d0ebff;
          transition: background-color 0.3s ease;
        }

        ion-item {
          --padding-start: 16px;
          --inner-padding-end: 16px;
        }

        blockquote {
          margin: 0;
          font-style: italic;
        }

        blockquote span {
          display: block;
          margin-top: 0.5rem;
          font-weight: bold;
        }
      `}</style>

      <IonAccordionGroup expand="inset" onIonChange={handleAccordionChange}>
        {quotes.map(({ value, icon, title, quote, author }) => (
          <IonAccordion key={value} value={value}>
            <IonItem slot="header">
              <IonLabel>{`${icon} ${title}`}</IonLabel>
            </IonItem>
            <div className="quote-content ion-padding" slot="content">
              <blockquote>
                {quote}<br />
                <span>– {author}</span>
              </blockquote>
            </div>
          </IonAccordion>
        ))}
      </IonAccordionGroup>
    </>
  );
}

export default Favorites;
