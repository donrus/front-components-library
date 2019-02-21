function extractFilename(path) {
    if (path.substr(0, 12) == "C:\\fakepath\\")
        return path.substr(12); // modern browser
    var x;
    x = path.lastIndexOf('/');
    if (x >= 0) // Unix-based path
        return path.substr(x+1);
    x = path.lastIndexOf('\\');
    if (x >= 0) // Windows-based path
        return path.substr(x+1);
    return path; // just the file name
}

export default function customInputUploadInitHandler(inputField, spanText, defaultText, containerSelector = null){

    let label = document.querySelector(spanText),
        input = document.querySelector(inputField);

    if (label) label.textContent = defaultText;

    if (input) {

        if (input.value) {
            label.textContent = extractFilename(input.value);
        }

        input.addEventListener("change", (event) => {
            var name = extractFilename(event.target.value);
            if (label) label.textContent = (name) ? name : defaultText;
        });

    }

    let parent = document.querySelector(inputField).parentNode;
    do {
        if (parent.matches && parent.matches('form')){
            parent.addEventListener("reset", (event) => {
                if (label) label.textContent = defaultText;
            });
            break;
        }
        parent = parent.parentNode;
    } while (parent)

    //if (container) {
        let container = document.querySelector(containerSelector);

        if(container && input) {
            container.addEventListener('click', function(event){
                if (event.target === container) {
                    input.click();
                }
            });
        }
    //}

}