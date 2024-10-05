"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"

const queryClient = new QueryClient()

export default function ReactQueryProvider({children}:{children: React.ReactNode}){
  const [client] = useState(new QueryClient())

  return <QueryClientProvider client={client}>{children}
  <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>

} 