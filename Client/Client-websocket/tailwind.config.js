/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            spacing: {
                "50vw": "50vw",
                "50vh": "50vh"
            }
        },
    },
    plugins: [],
}