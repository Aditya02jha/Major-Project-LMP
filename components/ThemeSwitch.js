import { FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from "next/image";

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false);
    const { setTheme, resolvedTheme } = useTheme();

    const iconSize = 36;
    useEffect(() => setMounted(true), []);

    if (!mounted) return (
        <Image
            src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
            width={48}
            height={48}
            sizes="48x48"
            alt="Loading Light/Dark Toggle"
            priority={false}
            title="Loading Light/Dark Toggle"
        />
    );

    const iconStyle = {
        cursor: 'pointer', // Apply pointer cursor
    };
    if (resolvedTheme === 'dark') {
        return <FiSun size={iconSize} style={iconStyle} onClick={() => setTheme('light')} />;
    }

    if (resolvedTheme === 'light') {
        return <FiMoon size={iconSize} style={iconStyle} onClick={() => setTheme('dark')} />;
    }
}
