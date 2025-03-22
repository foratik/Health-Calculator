document.addEventListener("DOMContentLoaded", () => {
    function validateInput(value) {
        return /^-?\d*\.?\d+$/.test(value);
    }

    function evaluateFormulas() {
        const weight = document.getElementById("weight").value.trim();
        const height = document.getElementById("height").value.trim();
        const waist = document.getElementById("waist").value.trim();
        const age = document.getElementById("age").value.trim();
        const gender = document.getElementById("gender").value.trim();

        const isInvalidInput = [
            weight, height, waist, age, gender
        ].some(value => value === "" || !validateInput(value));

        document.querySelectorAll("formula").forEach(formula => {
            const formulaId = formula.id;
            let result = "";

            formula.classList.remove("error");

            try {
                if (isInvalidInput) {
                    result = "ورودی نامعتبر";
                } else {
                    const formulaString = formula.getAttribute("data-formula");

                    const formulaWithValues = formulaString
                        .replace(/weight/g, weight)
                        .replace(/height/g, height)
                        .replace(/waist/g, waist)
                        .replace(/age/g, age)
                        .replace(/gender/g, gender);

                    result = eval(formulaWithValues).toFixed(2);
                }

                formula.textContent = result;

                if (result === "ورودی نامعتبر") {
                    formula.classList.add("error");
                }
            } catch (e) {
                formula.textContent = "خطا در ورودی";
                formula.classList.add("error");
            }
        });
    }

    document.querySelectorAll("input, select").forEach(input => {
        input.addEventListener("input", evaluateFormulas);
    });

    evaluateFormulas();
});
