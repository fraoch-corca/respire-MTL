import * as React from "react"

import { cn } from "@/lib/utils"

import { LanguageSwitcher } from "./LanguageSwitcher";

function Header({ className, ...props }: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="header"
      className={cn(
        "my-2 w-full flex justify-between align-middle border-cyan-300 border-6 rounded-md p-1.5",
        className
      )}
      {...props}
    />
  )
}

function HeaderLogo({...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="header-icon"
            {...props}
        />      
    )
}

function HeaderLangs({className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="header-langs"
            className={cn(
                "bg-emerald-300 flex content-center justify-center flex-wrap min-w-10",
                className
            )}
            {...props}
        >
          <LanguageSwitcher/>
        </div>    
    )
}

export {
    Header,
    HeaderLogo,
    HeaderLangs
}