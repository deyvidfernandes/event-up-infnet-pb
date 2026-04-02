import React from 'react';
import { EventData } from '@/types/event';
import styles from './EventHorizontalCard.module.css';

interface EventHorizontalCardProps {
  event: EventData;
  onClick?: (id: string | number) => void;
}

export const EventHorizontalCard: React.FC<EventHorizontalCardProps> = ({ event, onClick }) => {
  const { id, nome, eventDate, price, eventCapacity, cidade, uf } = event;

  const formattedDate = new Date(eventDate).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const isFree = price === 0;
  const imageUrl = `https://picsum.photos/seed/${id}/600/400`;

  return (
    <article className={styles.card} onClick={() => onClick?.(id)}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={nome} className={styles.image} />
      </div>

      <div className={styles.mainInfo}>
        <div className={styles.contentTop}>
          <div className={styles.header}>
          <div className={styles.mainTitleInfo}>
            <h3 className={styles.title}>{nome}</h3>
            <div className={styles.locationInfo}>
              <span>{cidade}, {uf}</span>
            </div>
          </div>
            <div className={styles.dateBadge}>
              <span>📅</span>
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium mollitia ex facere minima nihil numquam, placeat quae animi corrupti voluptate ad velit error provident sequi.
        </p>
        <div className={styles.footerRow}>
          <div className={styles.capacity}>
            <span>{eventCapacity} vagas disponíveis</span>
          </div>

          <div className={styles.priceContainer}>
            {isFree ? (
              <span className={styles.freeBadge}>GRATUITO</span>
            ) : (
              <span className={styles.priceTag}>
                {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};