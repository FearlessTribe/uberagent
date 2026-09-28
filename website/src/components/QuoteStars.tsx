import styles from "./QuoteStars.module.css";

/** Five filled orange stars for testimonial attribution. */
export function QuoteStars({ className }: { className?: string }) {
  return (
    <span
      className={`${styles.stars}${className ? ` ${className}` : ""}`}
      aria-label="5 von 5 Sternen"
      role="img"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={styles.star}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M14.4639 9.21094L14.5811 9.44824L14.8438 9.48438L20.4023 10.25L16.3672 14.0869L16.1719 14.2725L16.2197 14.5381L17.1973 19.9883L12.2324 17.3809L12 17.2588L11.7676 17.3809L6.80176 19.9883L7.78027 14.5381L7.82812 14.2725L7.63281 14.0869L3.59668 10.25L9.15625 9.48438L9.41895 9.44824L9.53613 9.21094L12 4.22266L14.4639 9.21094Z"
            fill="currentColor"
            stroke="currentColor"
          />
        </svg>
      ))}
    </span>
  );
}
