window.MOODE_AI = {

    analyze: function (mood, faceData) {

        const looks = {

            "Radiante": {
                style: "Glow Radiante",
                palette: ["Rosa suave", "Champagne", "Melocotón"],
                finish: "Luminoso",
                products: [
                    "Base ligera glow",
                    "Blush rosado",
                    "Iluminador champagne",
                    "Gloss transparente"
                ]
            },

            "Elegante": {
                style: "Elegancia Clásica",
                palette: ["Nude", "Marrón", "Rojo profundo"],
                finish: "Satinado",
                products: [
                    "Base de cobertura media",
                    "Sombras neutras",
                    "Delineador negro",
                    "Labial rojo elegante"
                ]
            },

            "Romántica": {
                style: "Soft Romantic",
                palette: ["Rosa", "Malva", "Champagne"],
                finish: "Suave",
                products: [
                    "Base natural",
                    "Blush rosa",
                    "Sombra rosada",
                    "Gloss rosado"
                ]
            },

            "Tranquila": {
                style: "Natural Calm",
                palette: ["Beige", "Café claro", "Nude"],
                finish: "Natural",
                products: [
                    "BB Cream",
                    "Bronzer suave",
                    "Cejas naturales",
                    "Labial nude"
                ]
            }

        };

        const selectedLook = looks[mood];

        if (!selectedLook) {
            return null;
        }

        return {

            mood: mood,

            faceAnalyzed: !!faceData,

            style: selectedLook.style,

            palette: selectedLook.palette,

            finish: selectedLook.finish,

            products: selectedLook.products,

            status: "Análisis generado por MOODÉ AI"

        };

    }

};
