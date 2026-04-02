import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  deleteEvent,
  getEvents,
  getLoggedUser,
  subscribeToEvent,
} from "@/lib/util/mockLocalStorage";
import { EventData } from "@/types/event";

import PageHeader from "@/components/ui/PageHeader/PageHeader";
import styles from "./EventDetailsPage.module.css";
import { toast } from "react-toastify";

export default function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [event, setEvent] = useState<EventData | null>(null);
  const [user, setUser] = useState<{
    email: string;
    accountType: string;
  } | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const loggedUser = getLoggedUser();
    setUser(loggedUser);

    const allEvents = getEvents();
    const foundEvent = allEvents.find((e) => String(e.id) === id);

    if (foundEvent) {
      setEvent(foundEvent);
      if (loggedUser && foundEvent.emailInscritos?.includes(loggedUser.email)) {
        setIsSubscribed(true);
      }
    }
  }, [id]);

  const handleSubscribe = () => {
    if (id) {
      subscribeToEvent(id, user!.email);
      setIsSubscribed(true);
      toast.success("Inscrição realizada com sucesso!");
    }
  };

  const handleDelete = () => {
    if (id) {
      deleteEvent(id);
      navigate(-1);
      toast.success("Evento deletado com sucesso!");
    }
  };

  if (!event) return <div className={styles.loading}>Carregando evento...</div>;

  const formattedDate = new Date(event.eventDate).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const imageUrl = `https://picsum.photos/seed/${event.id}/1200/600`;

  return (
    <>
      <PageHeader content="Detalhes do Evento" />
      <div className={styles.container}>
        <article className={styles.detailsCard}>
          <div className={styles.imageWrapper}>
            <img
              src={imageUrl}
              alt={event.nome}
              className={styles.eventImage}
            />
            <button className={styles.backButton} onClick={() => navigate(-1)}>
              ← Voltar
            </button>
          </div>

          <div className={styles.content}>
            <header className={styles.header}>
              <div className={styles.badgeRow}>
                <span className={styles.dateBadge}>📅 {formattedDate}</span>
                <span
                  className={
                    event.price === 0 ? styles.freeBadge : styles.priceBadge
                  }
                >
                  {event.price === 0
                    ? "GRATUITO"
                    : event.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                </span>
              </div>
              <h1 className={styles.title}>{event.nome}</h1>
            </header>

            <section className={styles.infoSection}>
              <h3>Sobre o evento</h3>
              <p className={styles.description}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium mollitia ex facere minima nihil numquam, placeat
                quae animi corrupti voluptate ad velit error provident sequi.
                Veniam magni laudantium repellendus alias?
              </p>
            </section>

            <section className={styles.locationSection}>
              <h3>Localização</h3>
              <div className={styles.address}>
                <p>
                  <strong>{event.logradouro}</strong>
                </p>
                <p>
                  {event.bairro} - {event.cidade}, {event.uf}
                </p>
                <p className={styles.zipCode}>CEP: {event.cep}</p>
              </div>
            </section>

            <footer className={styles.footer}>
              <div className={styles.capacityInfo}>
                <span className={styles.capacityCount}>
                  👥 {event.eventCapacity} vagas totais
                </span>
              </div>

              {user?.accountType === "organizador" ? (
                <button
                  className={styles.deleteBtn}
                  onClick={handleDelete}
                  disabled={isSubscribed}
                >
                  Excluir Evento
                </button>
              ) : (
                <button
                  className={
                    isSubscribed ? styles.subscribedBtn : styles.subscribeBtn
                  }
                  onClick={handleSubscribe}
                  disabled={isSubscribed}
                >
                  {isSubscribed ? "Inscrito" : "Quero me inscrever"}
                </button>
              )}
            </footer>
          </div>
        </article>
      </div>
    </>
  );
}
