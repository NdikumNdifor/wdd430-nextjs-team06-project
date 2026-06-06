import styles from '@/app/ui/home/home.module.css';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  titleId: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  titleId,
}: SectionHeadingProps) {
  return (
    <div className={styles.sectionHeading}>
      <p>{eyebrow}</p>
      <h2 id={titleId}>{title}</h2>
      <span>{description}</span>
    </div>
  );
}
