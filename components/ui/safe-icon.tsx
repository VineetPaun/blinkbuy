"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import { HugeiconsIcon as HugeiconsIconBase } from "@hugeicons/react";

const HugeiconsIconNoSSR = dynamic(
    () => import("@hugeicons/react").then((mod) => mod.HugeiconsIcon),
    { ssr: false }
);

export function SafeIcon(props: ComponentProps<typeof HugeiconsIconBase>) {
    return <HugeiconsIconNoSSR {...props} />;
}