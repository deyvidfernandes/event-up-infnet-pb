import styles from "./PageHeader.module.css";

interface PageHeaderProps {
  content: string;
}

export default function PageHeader({content}: PageHeaderProps) {
  return (
    <header className={styles.pageHeaderContainer}>
      <h2 className={styles.pageHeaderTitle}>{content}</h2>
    </header>
  );
}