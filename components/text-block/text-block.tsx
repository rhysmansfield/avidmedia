"use client";

import { Animation } from "@/components/animation/animation";

import styles from "./text-block.module.scss";
import { TextBlockProps } from "./text-block.type";

export const TextBlock = ({ title, text }: TextBlockProps) => (
  <section className={styles.root}>
    <div className="wrapper">
      <Animation
        element="h2"
        animation="slide-up"
        className={styles.title}
        animateOnScroll
      >
        {title}
      </Animation>
      <Animation
        element="p"
        animation="slide-up"
        className={styles.paragraph}
        animateOnScroll
      >
        {text}
      </Animation>
    </div>
  </section>
);
