import { PropsWithChildren, useMemo, useRef } from "react";
import styles from "./Drawer.module.scss";
import clsx from "clsx";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionClassNames } from "react-transition-group/CSSTransition";

type Props = PropsWithChildren<{ open: boolean; onClose: () => void }>;

export default function Drawer({ open, onClose, children }: Props) {
  const drawerRef = useRef(null);
  const backdropRef = useRef(null);

  const transitionNames: CSSTransitionClassNames = useMemo(() => {
    return {
      enter: styles.enter,
      enterActive: styles.enterActive,
      enterDone: styles.enterDone,
      exit: styles.exit,
      exitActive: styles.exitActive,
      exitDone: styles.exitDone,
    };
  }, []);

  return (
    <>
      {open && (
        <style>{`
          body {
            overflow: hidden;
          }
        `}</style>
      )}
      <CSSTransition
        nodeRef={backdropRef}
        in={open}
        timeout={200}
        classNames={transitionNames}
      >
        <div
          ref={backdropRef}
          className={styles.backdrop}
          onClick={() => onClose()}
        />
      </CSSTransition>
      <CSSTransition
        nodeRef={drawerRef}
        in={open}
        timeout={200}
        classNames={transitionNames}
      >
        <div ref={drawerRef} className={styles.drawer}>
          <div className={styles.scrollArea}>{children}</div>
        </div>
      </CSSTransition>
    </>
  );
}
