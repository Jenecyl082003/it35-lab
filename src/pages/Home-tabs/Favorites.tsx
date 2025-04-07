import React from 'react';
import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  AccordionGroupCustomEvent
} from '@ionic/react';

function Favorites() {
  const values = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];

  const accordionGroupChange = (event: AccordionGroupCustomEvent) => {
    const collapsedItems = values.filter((value) => value !== event.detail.value);
    const selectedValue = event.detail.value;

    console.log(
      `Expanded: ${selectedValue === undefined ? 'None' : selectedValue} | Collapsed: ${collapsedItems.join(', ')}`
    );
  };

  return (
    <IonAccordionGroup onIonChange={accordionGroupChange}>
      <IonAccordion value="first">
        <IonItem slot="header" color="light">
          <IonLabel>🚀 Dream Big</IonLabel>
        </IonItem>
        <div className="ion-padding quote-content" slot="content">
          <blockquote>
            “The future belongs to those who believe in the beauty of their dreams.”<br />
            <span>– Eleanor Roosevelt</span>
          </blockquote>
        </div>
      </IonAccordion>

      <IonAccordion value="second">
        <IonItem slot="header" color="light">
          <IonLabel>🔥 Stay Focused</IonLabel>
        </IonItem>
        <div className="ion-padding quote-content" slot="content">
          <blockquote>
            “Don’t watch the clock; do what it does. Keep going.”<br />
            <span>– Sam Levenson</span>
          </blockquote>
        </div>
      </IonAccordion>

      <IonAccordion value="third">
        <IonItem slot="header" color="light">
          <IonLabel>🌟 Make It Happen</IonLabel>
        </IonItem>
        <div className="ion-padding quote-content" slot="content">
          <blockquote>
            “Success doesn’t just find you. You have to go out and get it.”<br />
            <span>– Unknown</span>
          </blockquote>
        </div>
      </IonAccordion>

      <IonAccordion value="fourth">
        <IonItem slot="header" color="light">
          <IonLabel>💡 Believe in Yourself</IonLabel>
        </IonItem>
        <div className="ion-padding quote-content" slot="content">
          <blockquote>
            “Believe you can and you're halfway there.”<br />
            <span>– Theodore Roosevelt</span>
          </blockquote>
        </div>
      </IonAccordion>

      <IonAccordion value="fifth">
        <IonItem slot="header" color="light">
          <IonLabel>💥 Never Give Up</IonLabel>
        </IonItem>
        <div className="ion-padding quote-content" slot="content">
          <blockquote>
            “Our greatest glory is not in never falling, but in rising every time we fall.”<br />
            <span>– Confucius</span>
          </blockquote>
        </div>
      </IonAccordion>

      <IonAccordion value="sixth">
        <IonItem slot="header" color="light">
          <IonLabel>🌈 Stay Positive</IonLabel>
        </IonItem>
        <div className="ion-padding quote-content" slot="content">
          <blockquote>
            “Keep your face always toward the sunshine—and shadows will fall behind you.”<br />
            <span>– Walt Whitman</span>
          </blockquote>
        </div>
      </IonAccordion>
    </IonAccordionGroup>
  );
}

export default Favorites;
