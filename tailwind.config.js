/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sc: "526px",
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        whatsapp: "#25D366",
        BLANCO: "#ffffff",
        Reflectivo: "#ebe6e6",
        GRIS: "#969696",
        NEGRO: "#000000",
        TURQUESA: "#88f2d8",
        "VERDE-MILITAR": "#4a6f22",
        "verde-#2d5c71": "#2d5c71",
        "VERDE-CLARO": "#25fa89",
        "VERDE-OSCURO": "#036d1e",
        "LIMA-VERDE": "#d8ea64",
        MARRON: "#8c5b45",
        NARANJA: "#fa9005",
        "NARANJA-NEON": "#fc4908",
        VINOTINTO: "#930001",
        ROJO: "#e81022",
        FUCSIA: "#ff45ca",
        "pink-#EF8BB5": "#EF8BB5",
        "MORADO-#882deb": "#882deb",
        MORADITO: "#eca1ff",
        "amarillo-#F2DB93": "#F2DB93",
        "beige-#c6a37a": "#c6a37a",
        BURLYWOOD: "#d09a8b",
        CORAL: "#ffbda6",
        AZUL: "#2531d9",
        "AZUL-MARINO": "#0c157a",
        "azul-#B0EBF0": "#B0EBF0",
        gris: "#e5e5e5",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("tailwindcss-animate"),
  ],
};
