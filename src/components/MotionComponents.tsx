import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
  useScroll,
  useSpring,
  useTransform,
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
      delayChildren: 0.25,
    },
  },
  hide: { opacity: 0 },
};

export const WhileInViewVariantsNoTransition = {
  show: {
    opacity: 1,
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
  ...props
}: {
  children: ReactNode;
  props?: any;
}) => {
  return (
    <SCMotionDiv
      {...props}
      initial='hide'
      whileInView='show'
      variants={WhileInViewVariants}
    >
      {children}
    </SCMotionDiv>
  );
};

export const ScrollTransitionWrapper = (props) => {
  const { scrollYProgress } = useScroll();

  const smoothX = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 2000,
  });

  const x = useTransform(smoothX, [0, props.xRate], [0, props.xDistance]);
  const opacity = useTransform(scrollYProgress, [0, props.opacityRate], [1, 0]);

  return (
    <SCMotionDiv
      key={`${props.xRate}${props.xDistance}${new Date().getTime()}`}
      style={{ x, opacity }}
    >
      {props.child}
    </SCMotionDiv>
  );
};
