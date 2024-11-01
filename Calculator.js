const comp = document.getElementById("computation");
const ans = document.getElementById("answer");
const numButton = document.querySelectorAll(".num, .op");

let dotFlag = false;
let clearAll = false;

numButton.forEach(button => {
    button.addEventListener("click", () => {


        if (clearAll) {
            ans.value = "";
            comp.value = "";
            clearAll = false;
        }

        // Evaluates the inputed
        if (button.textContent === "=") {
            try {
                ans.value = eval(comp.value);
            } catch (error) {
                ans.value = "Error";
            }
            clearAll = true;
        }

        // Clears all on the screen
        else if (button.textContent === "C") {
            ans.value = "";
            comp.value = "";
            dotFlag = false;
        }

        // Clears single symbol on computation screen
        // Except the case when there is a braces, then it clears the whole number and braces
        else if (button.textContent === "←") {

            let last = checkLast();

            if (last === 3) {
                comp.value.slice(0, comp.value.length - 1)
                comp.value = comp.value.slice(0, comp.value.length - sliceLastNum().length - 2);
            }

            else if (last == 4) {
                comp.value = comp.value.slice(0, comp.value.length - 1)
                dotFlag = false;
            }

            else if (last == 2) {
                comp.value = comp.value.slice(0, comp.value.length - 1);

                if (sliceLastNum().includes(".")) {
                    dotFlag = true;
                }
            }

            else {
                comp.value = comp.value.slice(0, comp.value.length - 1);
            }

        }

        // Divides number by 100
        else if (button.textContent === "%") {

            let last = checkLast();
            let slice = sliceLastNum();

            if (last == 1 || last == 4) {
                comp.value = comp.value.slice(0, comp.value.length - slice.length);
                comp.value += Number(slice / 100);
            }

            else if (last == 3) {
                comp.value = comp.value.slice(0, comp.value.length - 1);
                comp.value = comp.value.slice(0, comp.value.length - slice.length);
                comp.value += Number(slice / 100) + ")";
            }

            if(slice.includes(".")){
                dotFlag = false;
            }
        }

        // Handles the dot
        else if (button.textContent === ".") {

            if (!dotFlag) {
                let last = checkLast();

                if (comp.value === "" || last == 2) {
                    comp.value += "0.";
                }
                else if (last == 1) {
                    comp.value += button.textContent;
                }

                dotFlag = true;
            }

        }

        // Changes sign of number
        else if (button.textContent === "±") {

            if (comp.value !== "") {

                let last = checkLast();
                let slice = sliceLastNum();

                if (last == 1 || last == 4) {

                    comp.value = comp.value.slice(0, comp.value.length - slice.length);


                    if (comp.value.slice(-1) === "/" || comp.value.slice(-1) === "*") {
                        comp.value += "(-" + slice + ")";
                    }
                    else if (comp.value.slice(-1) === "+") {
                        comp.value = comp.value.slice(0, comp.value.length - 1) + "-" + slice;
                    }
                    else if (comp.value.slice(-1) === "") {
                        comp.value = "-" + slice;
                    }
                    else if (comp.value.slice(-1) === "-") {
                        if (comp.value.length == 1) {
                            comp.value = comp.value.slice(0, comp.value.length - 1) + slice;
                        }
                        else {
                            comp.value = comp.value.slice(0, comp.value.length - 1) + "+" + slice;
                        }
                    }
                }
                else if (last == 3) {
                    comp.value = comp.value.slice(0, comp.value.length - 1);
                    let slice = sliceLastNum();
                    comp.value = comp.value.slice(0, comp.value.length - slice.length - 2);
                    comp.value += slice;

                }
            }
        }

        // Adds operations
        else if (button.classList.contains("op")) {

            if (comp.value !== "" && comp.value !== "-") {

                let last = checkLast();

                if (last == 1 || last == 3 || last == 4) {
                    comp.value += button.textContent;
                }
                else {
                    comp.value = comp.value.slice(0, comp.value.length - 1);
                    comp.value += button.textContent;
                }

                dotFlag = false;
            }

        }

        // Adds numbers
        else {
            let last = checkLast();
            let slice = sliceLastNum();

            if(last == 1){
                if(dotFlag == false){
                    if(slice != "0")
                    comp.value += button.textContent;
                }
                else{
                    comp.value += button.textContent;
                }
            }
            else if (last == 2 || last == 4) {
                comp.value += button.textContent;
            }
        }

    });
});

function checkLast() {
    let last = comp.value.slice(-1)
    if (last === "+" || last === "-" || last === "/" || last === "*") {
        return 2;
    }
    else if (last === ".") {
        return 4
    }
    else if (last === ")") {
        return 3;
    }
    else {
        return 1;
    }
}

function sliceLastNum() {
    let number;
    let i = comp.value.length - 1;
    let last = comp.value.slice(-1);

    while (last !== "+" && last !== "-" && last !== "/" && last !== "*" && i >= 0) {
        number = comp.value.slice(i);
        last = comp.value[i - 1];

        i = i - 1;
    }
    return number;
}

//if you want to start with '-' type your number then ±
