"use client";

import { client } from "@/apollo/client";
import { ApolloProvider } from "@apollo/client";
import React from "react";

// TODO: use clientを極力使わない実装が無いか確認

export const WithApolloProvider = ({ children }: React.PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
