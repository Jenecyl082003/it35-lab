import React, { useState } from 'react';
import {
  IonBadge,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonContent,
  IonPage,
} from '@ionic/react';
import { heart, calendar, musicalNote } from 'ionicons/icons';

function Favorites() {
  const [selectedTab, setSelectedTab] = useState('tab1'); // Track selected tab

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab); // Update selected tab
  };

  return (
    <IonPage>
      <IonContent>
        <div className="w-full fixed bottom-0 z-50">
          <IonTabBar
            color="dark"
            style={{
              background: '#1e1e1e',
              borderTop: '1px solid #333',
              padding: '10px 0',
              borderRadius: '20px 20px 0 0',
              boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
            }}
          >
            <IonTabButton
              tab="tab1"
              onClick={() => handleTabClick('tab1')}
              style={selectedTab === 'tab1' ? activeTabStyle : {}}
            >
              <IonIcon icon={heart} style={{ fontSize: '24px' }} />
              <IonLabel style={{ fontSize: '14px', color: '#f87171' }}>
                Favorites
              </IonLabel>
              <IonBadge
                color="danger"
                style={{
                  animation: 'pulse 1.2s infinite',
                  fontSize: '10px',
                  marginTop: '4px',
                }}
              >
                3
              </IonBadge>
            </IonTabButton>

            <IonTabButton
              tab="tab2"
              onClick={() => handleTabClick('tab2')}
              style={selectedTab === 'tab2' ? activeTabStyle : {}}
            >
              <IonIcon icon={musicalNote} style={{ fontSize: '24px' }} />
              <IonLabel style={{ fontSize: '14px', color: '#60a5fa' }}>
                Music
              </IonLabel>
            </IonTabButton>

            <IonTabButton
              tab="tab3"
              onClick={() => handleTabClick('tab3')}
              style={selectedTab === 'tab3' ? activeTabStyle : {}}
            >
              <IonIcon icon={calendar} style={{ fontSize: '24px' }} />
              <IonLabel style={{ fontSize: '14px', color: '#34d399' }}>
                Calendar
              </IonLabel>
              <IonBadge
                color="danger"
                style={{ fontSize: '10px', marginTop: '4px' }}
              >
                47
              </IonBadge>
            </IonTabButton>
          </IonTabBar>
        </div>

        <div style={{ padding: '20px', marginTop: '60px' }}>
          {selectedTab === 'tab1' && <div>Your Favorites Content</div>}
          {selectedTab === 'tab2' && <div>Music Content</div>}
          {selectedTab === 'tab3' && <div>Calendar Content</div>}
        </div>
      </IonContent>

      {/* Add pulse animation manually if not using Tailwind or CSS file */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </IonPage>
  );
}

// Styles for active tab
const activeTabStyle = {
  backgroundColor: '#333',
  borderRadius: '12px',
};

export default Favorites;
