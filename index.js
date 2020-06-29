const container = document.querySelector(".container")
let isResizing = false;
container.addEventListener("mousedown",mousedown)

function mousedown(e){
    // console.log(e)
    // console.log(e.clientX,e.clientY)
    // console.log(e.offsetX,e.offsetY)
    window.addEventListener('mousemove',mousemove)
    window.addEventListener('mouseup',mouseup)
    let prevX = e.clientX
    let prevY = e.clientY
    function mousemove(e){
        if(!isResizing){
            let newX = prevX - e.clientX;
            let newY = prevY - e.clientY;

            const rect = container.getBoundingClientRect();
            console.log(rect)

            container.style.left = rect.left - newX + "px";
            container.style.top = rect.top - newY + "px";

            prevX = e.clientX
            prevY = e.clientY
        }
    }

    function mouseup(e){
        window.removeEventListener('mousemove',mousemove);
        window.removeEventListener('mousedown',mousedown)
    }
}

let resizer = document.querySelectorAll(".side")

resizer.forEach((side) => {
    side.addEventListener("mousedown",mousedown)

    function mousedown(e){
        let curr = e.target
        isResizing = true;
        let prevX = e.clientX
        let prevY = e.clientY

        window.addEventListener("mousemove",mousemove)
        window.addEventListener("mouseup",mouseup)

        function mousemove(e){
            const rect = container.getBoundingClientRect();

            if (curr.classList.contains("se")){
                container.style.width = rect.width - (prevX - e.clientX) + "px";
                container.style.height = rect.height - (prevY - e.clientY) + "px";
            }
            else if (curr.classList.contains("sw")){
                container.style.width = rect.width + (prevX - e.clientX) + "px"
                container.style.height = rect.height - (prevY - e.clientY) + "px"
                container.style.left = rect.left - (prevX - e.clientX) + "px"
            }
            else if (curr.classList.contains("ne")){
                container.style.width = rect.width - (prevX - e.clientX) + "px"
                container.style.height = rect.height + (prevY - e.clientY) + "px"
                container.style.top = rect.top - (prevY - e.clientY) + "px"
            }
            else {
                container.style.width = rect.width + (prevX - e.clientX) + "px"
                container.style.height = rect.height + (prevY - e.clientY) + "px"
                container.style.top = rect.top - (prevY - e.clientY) + "px"
                container.style.left = rect.left - (prevX - e.clientX) + "px"
            }

            prevX = e.clientX;
            prevY = e.clientY;
        }

        function mouseup(e){
            window.removeEventListener("mousedown",mousedown)
            window.removeEventListener("mousemove",mousemove)
            isResizing = false;
        }
    }
})