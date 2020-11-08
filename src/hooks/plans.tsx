import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '../libs/api';

export interface Plan {
  id: string;
  name: string;
  description: string;
  quantity_photos: number;
  quantity_properties: number;
  quantity_videos: number;
  value: number;
}

interface PlansContextData {
  plans: Plan[];
}

const PlansContext = createContext({} as PlansContextData);

const PlansProvider: React.FC = ({ children }) => {
  const [plans, setPlans] = useState<Plan[]>(() => {
    const findPlans = Cookies.get('@ImoveisDeLuxo:plans');

    if (findPlans) {
      return JSON.parse(findPlans) as Plan[];
    }

    return [];
  });

  useEffect(() => {
    api.get('plans').then((response) => {
      Cookies.set(
        '@ImoveisDeLuxo:plans',
        JSON.stringify(response.data),
      );

      setPlans(response.data);
    });
  }, []);

  return (
    <PlansContext.Provider value={{ plans }}>{children}</PlansContext.Provider>
  );
};

function usePlans(): PlansContextData {
  const context = useContext(PlansContext);

  if (!context) {
    throw new Error('usePlans must be used within a PlansProvider');
  }

  return context;
}

export { usePlans, PlansProvider };
