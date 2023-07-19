import * as React from "react";

import { ChakraProvider, theme } from "@chakra-ui/react";
import { render, RenderOptions, RenderResult } from "@testing-library/react";

type AllProvidersProps = { children?: React.ReactNode };

const AllProviders = ({ children }: AllProvidersProps): JSX.Element => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
);

const customRender = (
  ui: React.ReactElement,
  options?: RenderOptions
): RenderResult => render(ui, { wrapper: AllProviders, ...options });

// eslint-disable-next-line import/prefer-default-export
export { customRender as render };
