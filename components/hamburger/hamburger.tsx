import styles from './hamburger.module.css';

interface HamburgerProps {
      className: string;
  isOpen: boolean;
  onClick: () => void;
}

const Hamburger = ({ className, isOpen, onClick }: HamburgerProps) => (
  <svg
    className={`${className} ${styles.ham} ${isOpen ? styles.ham_active : ''}`}
    viewBox="0 0 100 100"
    width="80"
    onClick={onClick}
  >
    <path
      className={`${styles.line} ${styles.top} ${isOpen ? styles.top_active : ''}`}
      d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
    />
    <path className={`${styles.line} ${styles.middle} ${isOpen ? styles.middle_active : ''}`} d="m 30,50 h 40" />
    <path
      className={`${styles.line} ${styles.bottom} ${isOpen ? styles.bottom_active : ''}`}
      d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
    />
  </svg>
);

export default Hamburger;
