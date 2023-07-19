import React from "react";

import LogoIcon from "assets/logo.svg";

import {
  chakra,
  forwardRef,
  ImageProps,
  keyframes,
  usePrefersReducedMotion,
} from "@chakra-ui/react";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Logo = forwardRef<ImageProps, "img">((props, ref) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 20s linear`;

  return (
    <chakra.img animation={animation} src={LogoIcon} ref={ref} {...props} />
  );
});

export default Logo;
