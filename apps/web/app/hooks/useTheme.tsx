import { createContext, useContext, useState, useMemo } from "react";

type Theme = "light" | "dark";
type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
    children: React.ReactNode;
    initialTheme?: Theme;
};

export function ThemeProvider({ children, initialTheme = "light" }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(initialTheme);

    const value = useMemo(
        () => ({
            theme,
            toggleTheme: () => setTheme((prev) => (prev === "light" ? "dark" : "light")),
        }),
        [theme]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export default function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
}