import { useEffect, useState } from "react";
import { getLoggedUser, getEvents, getSubscribedEvents } from "@/lib/util/mockLocalStorage";
import { EventData } from "@/types/event";

import PageHeader from "@/components/ui/PageHeader/PageHeader";
import { EventHorizontalCard } from "@/components/features/EventHorizontalCard/EventHorizontalCard";

import styles from "./SubscribedEventsPage.module.css";
import { useNavigate } from "react-router";

export default function SubscribedEventsPage() {
  const navigate = useNavigate()
  const [events, setEvents] = useState<EventData[]>([]);
  const [user, setUser] = useState<{ email: string; accountType: string } | null>(null);


  useEffect(() => {
    const loggedUser = getLoggedUser();
    if (loggedUser) {
        setUser(loggedUser);
        const userEvents = getSubscribedEvents(loggedUser.email);
        setEvents(userEvents);
    }
  }, []);

  if (!user) return null;
  
  return (
    <>
      <PageHeader content="Início" />
      <div className={styles.pageContentContainer}>
        <div className={styles.sectionHeader}>
          <h3>Minhas Inscrições</h3>
        </div>

        <div className={styles.eventsList}>
          {events.length > 0 ? (
            events.map((event) => 
                <EventHorizontalCard key={event.id} event={event} onClick={(id) => navigate(`/u/detalhe-evento/${id}`)}/>
            )
          ) : (
            <div className={styles.emptyState}>
              <p>
                  Você ainda não se inscreveu em nenhum evento
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}