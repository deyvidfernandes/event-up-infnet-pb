import { EventData } from "@/types/event";
import { UserData } from "@/types/user";

const USER_STORAGE_KEY = 'eventup_user_logged';

export const login = (userData: UserData) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
};

export const logout = () => {
  localStorage.removeItem(USER_STORAGE_KEY);
};

export const isLogged = () => {
  const user = localStorage.getItem(USER_STORAGE_KEY);
  return !!user;
};

export const getLoggedUser = (): UserData | null => {
  const user = localStorage.getItem(USER_STORAGE_KEY);
  return user ? JSON.parse(user) : null;
};



const EVENTS_STORAGE_KEY = 'eventup_events_data';

// Estrutura do Dict: { "joaosilva": [ {id: 1, nome: "Evento A"}, ... ], "mariad": [...] }
type EventsDict = Record<string, EventData[]>;

/**
 * Adiciona um evento para um usuário
 */
export const addEvent = (username: string, event: EventData) => {
  const storage = localStorage.getItem(EVENTS_STORAGE_KEY);
  const eventsDict: EventsDict = storage ? JSON.parse(storage) : {};

  // Se o usuário ainda não tem eventos, inicializa o array
  if (!eventsDict[username]) {
    eventsDict[username] = [];
  }

  eventsDict[username].push(event);

  localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(eventsDict));
};

/**
 * Lê eventos: 
 */
export const getEvents = (username?: string): EventData[] => {
  const storage = localStorage.getItem(EVENTS_STORAGE_KEY);
  if (!storage) return [];

  const eventsDict: EventsDict = JSON.parse(storage);

  if (username) {
    return eventsDict[username] || [];
  }

  return Object.values(eventsDict).flat();
};

export const getSubscribedEvents = (userEmail: string): EventData[] => {
  const storage = localStorage.getItem(EVENTS_STORAGE_KEY);
  if (!storage) return [];

  const eventsDict: EventsDict = JSON.parse(storage);

  const allEvents = Object.values(eventsDict).flat();

  return allEvents.filter((event) => 
    event.emailInscritos && event.emailInscritos.includes(userEmail)
  );
};

/**
 * Exclui um evento pelo ID
 */
export const deleteEvent = (eventId: string | number) => {
  const storage = localStorage.getItem(EVENTS_STORAGE_KEY);
  if (!storage) return;

  const eventsDict: EventsDict = JSON.parse(storage);

  const updatedDict: EventsDict = {};
  
  Object.keys(eventsDict).forEach((user) => {
    updatedDict[user] = eventsDict[user].filter(event => event.id !== eventId);
  });

  localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(updatedDict));
};

/**
 * Inscreve e-mail em um evento
 */
export const subscribeToEvent = (eventId: string | number, userEmail: string) => {
  const storage = localStorage.getItem(EVENTS_STORAGE_KEY);
  if (!storage) return;

  const eventsDict: EventsDict = JSON.parse(storage);
  let eventFound = false;

  const updatedDict: EventsDict = {};

  Object.keys(eventsDict).forEach((creator) => {
    updatedDict[creator] = eventsDict[creator].map((event) => {
      if (event.id === eventId) {
        eventFound = true;
        
        const currentInscribed = event.emailInscritos || [];
        
        if (currentInscribed.includes(userEmail)) {
          return event;
        }

        return {
          ...event,
          emailInscritos: [...currentInscribed, userEmail]
        };
      }
      return event;
    });
  });

  if (eventFound) {
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(updatedDict));
  }
  
  return eventFound;
};