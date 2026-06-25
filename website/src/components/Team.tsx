import { useState, lazy, Suspense } from "react";
import { teamMembers } from "../data/team";
import { useCardGlow } from "../hooks/useScrollReveal";
import { ScrollReveal } from "./ScrollReveal";
import { MotionPressable } from "./MotionPressable";
import styles from "./Team.module.css";

const LaurensModal = lazy(() =>
  import("./LaurensModal").then((m) => ({ default: m.LaurensModal })),
);

interface TeamProps {
  onOpenLaurens?: () => void;
}

export function Team({ onOpenLaurens }: TeamProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const { handleMouseMove } = useCardGlow();

  const openLaurens = () => {
    if (onOpenLaurens) {
      onOpenLaurens();
    } else {
      setOpenId("laurens");
    }
  };

  return (
    <section id="team" className={`section ${styles.team}`} aria-labelledby="team-heading">
      <div className="container">
        <ScrollReveal className={styles.grid}>
          <div className={styles.left}>
            <span className={`eyebrow ${styles.teamEyebrow}`}>Team</span>
            <h2 id="team-heading" className={`display-md ${styles.headline}`}>
              Gebündelte Kompetenz, um intelligente Lösungen zu schaffen.
            </h2>
          </div>

          <div className={styles.members}>
            {teamMembers.map((m) => (
              <MotionPressable
                key={m.id}
                className={`card ${styles.memberCard}`}
                onClick={openLaurens}
                onMouseMove={handleMouseMove}
                aria-haspopup="dialog"
              >
                <div className={styles.imageWrap}>
                  <img
                    src={m.image}
                    alt={m.name}
                    className={styles.image}
                    loading="lazy"
                    width={535}
                    height={551}
                  />
                </div>
                <div className={styles.memberInfo}>
                  <h3 className={styles.memberName}>{m.name}</h3>
                  <span className={styles.memberRole}>{m.role}</span>
                </div>
              </MotionPressable>
            ))}

            <div className={`card ${styles.staticCard}`} aria-label="Victor Loës, CTO">
              <div className={styles.staticAvatar} aria-hidden="true">
                <span>VL</span>
              </div>
              <div className={styles.memberInfo}>
                <h3 className={styles.memberName}>Victor Loës</h3>
                <span className={styles.memberRole}>CTO</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {!onOpenLaurens && (
        <Suspense fallback={null}>
          <LaurensModal isOpen={openId === "laurens"} onClose={() => setOpenId(null)} />
        </Suspense>
      )}
    </section>
  );
}
