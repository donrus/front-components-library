let $absolute_path = "25,1.061 37.601,10.217 50.203,19.372 45.39,34.186 40.576,49 25,49 9.424,49 4.61,34.186 -0.203,19.372 12.399,10.217";
function regex_callback($matches) {
    let $count = -1;
    $count++;
    $width = 100;
    $height = 100;
    if($count % 2) {
        return $matches / $height;
    } else {
        return $matches / $width;
    }
}

let new_path = $absolute_path.replace(/(\d+(\.\d+)?)/g, regex_callback);
console.log(new_path);