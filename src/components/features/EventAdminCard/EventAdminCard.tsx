import { EventData } from "@/types/event";
import styles from "./EventAdminCard.module.css";
import Button from "@/components/ui/Button/Button";

interface EventAdminCardProps {
  event: EventData;
  onClick?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
}

export default function EventAdminCard({
  event,
  onDelete,
  onClick,
}: EventAdminCardProps) {
  const {
    id,
    nome,
    eventDate,
    price,
    eventCapacity,
    cidade,
    uf,
    logradouro,
    bairro,
    cep,
    emailInscritos = [],
  } = event;

  const totalInscritos = emailInscritos.length;
  const vagasRestantes = Math.max(eventCapacity - totalInscritos, 0);
  const faturamentoTotal = totalInscritos * price;

  const formattedDate = new Date(eventDate).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const imageUrl = `https://picsum.photos/seed/${id}/600/400`;

  return (
    <article className={styles.adminCard} onClick={() => onClick?.(id)}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={nome} className={styles.image} />
      </div>

      <div className={styles.mainInfo}>
        <div className={styles.header}>
          <h3 className={styles.title}>{nome}</h3>
          <div className={styles.dateInfo}>
            <span>📅</span>
            <span>{formattedDate}</span>
          </div>
        </div>

        <div className={styles.addressInfo}>
          <p>
            <strong>{logradouro}</strong>, {bairro}
          </p>
          <p>
            {cidade} - {uf} | CEP: {cep}
          </p>
        </div>

        <div className={styles.statsRow}>
          <div className={styles.statsGroup}>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Inscritos</span>
              <span className={styles.statValue}>{totalInscritos}</span>
              <small>{vagasRestantes} vagas livres</small>
            </div>

            <div className={styles.statBox}>
              <span className={styles.statLabel}>Receita</span>
              <span className={styles.statValue}>
                {faturamentoTotal.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
              <small>
                Ticket:{" "}
                {price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </small>
            </div>
          </div>

          <Button
            className={styles.deleteBtn}
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(id);
            }}
          >
            Excluir Evento
          </Button>
        </div>
      </div>
    </article>
  );
}
