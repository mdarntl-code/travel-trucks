import styles from "./NoCampersFound.module.css";

interface NoCampersFoundProps {
    onClearFilters: () => void;
    onViewAll: () => void;
}

export default function NoCampersFound({
    onClearFilters,
    onViewAll,
}: NoCampersFoundProps) {
    return (
        <div className={styles.container}>
            <img
                src="/photo/camper.png"
                alt="No campers found"
                className={styles.image}
            />
            <h3 className={styles.title}>No campers found</h3>
            <p className={styles.subtitle}>
                We couldn't find any campers that match your filters.
                <br />
                Try adjusting your search or clearing some filters.
            </p>
            <div className={styles.actions}>
                <button className={styles.clearBtn} onClick={onClearFilters}>
                    <svg width="16" height="16" className={styles.icon}>
                        <use href="/icons/sprite.svg#icon-cross" />
                    </svg>
                    Clear filters
                </button>
                <button className={styles.viewAllBtn} onClick={onViewAll}>
                    View all campers
                </button>
            </div>
        </div>
    );
}