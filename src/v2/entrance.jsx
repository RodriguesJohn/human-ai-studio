import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export const entranceChild = {
  hidden: {
    opacity: 0,
    y: 16
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.7 },
      y: { type: "spring", duration: 1.4, bounce: 0 }
    }
  }
};

export const entranceViewport = {
  once: true,
  amount: 0.22,
  margin: "0px 0px -10% 0px"
};

const scrollEntranceContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

export function Entrance({ as = "div", className, children, animate, whileInView = "visible", ...props }) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      variants={scrollEntranceContainer}
      initial={shouldReduceMotion ? false : "hidden"}
      animate={animate}
      whileInView={animate ? undefined : whileInView}
      viewport={entranceViewport}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

export function EntranceItem({ as = "div", className, children, ...props }) {
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag className={className} variants={entranceChild} {...props}>
      {children}
    </MotionTag>
  );
}
