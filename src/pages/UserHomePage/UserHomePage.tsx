import { useEffect, useState } from "react";
import { getLoggedUser, getEvents, deleteEvent } from "@/lib/util/mockLocalStorage";
import { EventData } from "@/types/event";

// Componentes de UI
import PageHeader from "@/components/ui/PageHeader/PageHeader";
import { EventHorizontalCard } from "@/components/features/EventHorizontalCard/EventHorizontalCard";
import EventAdminCard from "@/components/features/EventAdminCard/EventAdminCard";

// Styles (pode centralizar em um .module.css comum)
import styles from "./UserHomePage.module.css";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function UserHomePage() {
  const navigate = useNavigate()
  const [events, setEvents] = useState<EventData[]>([]);
  const [user, setUser] = useState<{ email: string; accountType: string } | null>(null);


  useEffect(() => {
    const loggedUser = getLoggedUser();
    if (loggedUser) {
      setUser(loggedUser);
      let userEvents: EventData[] = [];
        if (loggedUser.accountType === "organizador" )
          userEvents = getEvents(loggedUser.email);
        else
          userEvents = getEvents();
      setEvents(userEvents);
    }
  }, []);

  if (!user) return null; // Ou um loading skeleton

  const isManager = user.accountType === "organizador";

    const handleDelete = (id: number | string) => {
      if (id) {
        deleteEvent(id);
        setEvents(getEvents(user.email))
        toast.success("Evento deletado com sucesso!");
      }
    };

  return (
    <>
      <PageHeader content="Início" />
      <div className={styles.pageContentContainer}>
        <div className={styles.sectionHeader}>
          <h3>Meus eventos</h3>
          <p>
            Olá, {user.email}! {isManager ? "Gerencie suas publicações abaixo." : "Confira os eventos disponíveis abaixo."}
          </p>
        </div>

        <div className={styles.eventsList}>
          {events.length > 0 ? (
            events.map((event) => 
              isManager ? (
                <EventAdminCard key={event.id} event={event} onClick={(id) => navigate(`/u/detalhe-evento/${id}`)} onDelete={handleDelete}/>
              ) : (
                <EventHorizontalCard key={event.id} event={event} onClick={(id) => navigate(`/u/detalhe-evento/${id}`)}/>
              )
            )
          ) : (
            <div className={styles.emptyState}>
              <p>
                {isManager 
                  ? "Você ainda não cadastrou nenhum evento." 
                  : "Não há nenhum evento disponível."}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}