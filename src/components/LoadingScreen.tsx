import { IonContent, IonPage } from '@ionic/react';
import { CgSpinner } from 'react-icons/cg';

const LoadingScreen: React.FC = () => (
  <div
    style={{
      height: '100vh',
    }}
  >
    <IonContent>
      <IonPage>
        <div className="text-primary flex h-full w-full items-center justify-center p-8 text-4xl">
          <div className="animate-spin">
            <CgSpinner />
          </div>
        </div>
      </IonPage>
    </IonContent>
  </div>
);

export default LoadingScreen;
