import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
} from 'framer-motion';
import { type ReactNode } from 'react';

export const SCMotionDiv = motion.div;
export const SCMotionSection = motion.section;

export const SCMotionOl = motion.ol;
export const SCMotionLi = motion.li;

export const SCMotionAnchor = motion.a;
export const SCMotionButton = motion.button;

export const SCLayoutGroup = LayoutGroup;
export const SCAnimatePresence = AnimatePresence;
export const SCMotionConfig = MotionConfig;

export const WhileInViewVariants = {
  show: {
    opacity: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.25,
    },
  },
  hide: { opacity: 0 },
};

export const WhileInViewVariantsSlow = {
  show: {
    opacity: 1,
    transition: {
      duration: 0.55,
      staggerChildren: 0.35,
    },
  },
  hide: { opacity: 0 },
};

export const WhileInViewTransitionWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <SCMotionDiv
      initial='hide'
      whileInView='show'
      variants={WhileInViewVariants}
    >
      {children}
    </SCMotionDiv>
  );
};

export const WhileInViewTransitionWrapperAstro = (props) => {
  return (
    <SCMotionDiv
      initial='hide'
      whileInView='show'
      variants={WhileInViewVariants}
    >
      {props.child}
    </SCMotionDiv>
  );
};
