import styles, { layout } from "../../style";

const CardDeal = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Find a better card deal <br className="sm:block hidden" /> in few easy
        steps.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Arcu tortor, purus in mattis at sed integer faucibus. Aliquet quis
        aliquet eget mauris tortor.ç Aliquet ultrices ac, ametau.
      </p>

      <button className={`mt-10 ${styles.btnCSS}`}>Get Start</button>
    </div>

    <div className={layout.sectionImg}>
      <img src='/assets/card.png' alt="billing" className="w-[100%] h-[100%]" />
    </div>
  </section>
);

export default CardDeal;