<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mobile Code Editor</title>
    <style>
        body {
            margin: 0;
            font-family: 'Courier New', monospace;
            background-color: #f5f5f5;
        }

        .container {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }

        textarea {
            width: 100%;
            height: 100%;
            padding: 10px;
            box-sizing: border-box;
            resize: none;
            font-family: 'Courier New', monospace;
            font-size: 16px;
            line-height: 1.5;
            outline: none;
            border: none;
            background-color: #ffffff;
        }

        .button-bar {
            display: flex;
            justify-content: center;
            background-color: #cccccc;
            padding: 5px 0;
        }

        .button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            background-color: #ffffff;
            border: 1px solid #000;
            border-radius: 4px;
            margin: 0 5px;
            font-size: 18px;
            line-height: 1;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
        }

        .button:active {
            background-color: #dddddd;
        }
    </style>
</head>
<body>
    <div class="container">
  <textarea id="codebox">{}</textarea>
    </div>
    <div class="button-bar" id="button-bar">
        <div class="button" id="left-arrow">&larr;</div>
        <div class="button" id="up-arrow">&uarr;</div>
        <div class="button" id="down-arrow">&darr;</div>
        <div class="button" id="right-arrow">&rarr;</div>
    </div>
    <script>
        const codebox = document.getElementById('codebox');
        const buttonBar = document.getElementById('button-bar');
        const leftArrow = document.getElementById('left-arrow');
        const upArrow = document.getElementById('up-arrow');
        const downArrow = document.getElementById('down-arrow');
        const rightArrow = document.getElementById('right-arrow');

        // Set textarea height based on window size and keyboard status
        function adjustTextareaHeight() {
            const windowHeight = window.innerHeight;
            const isKeyboardOpen = windowHeight < window.outerHeight * 0.8;

            if (isKeyboardOpen) {
                buttonBar.style.display = 'flex';
                codebox.style.height = (windowHeight - buttonBar.offsetHeight - 10) + 'px';
            } else {
                buttonBar.style.display = 'none';
                codebox.style.height = '100%';
            }
        }

        // Listen for window resize events and adjust the textarea height accordingly
        window.addEventListener('resize', adjustTextareaHeight);

        // Call the function initially to set the correct height
        adjustTextareaHeight();

        // Add event listeners for arrow key buttons
        leftArrow.addEventListener('touchstart', () => moveCaret(-1, 0));
        upArrow.addEventListener('touchstart', () => moveCaret(0, -1));
        downArrow.addEventListener('touchstart', () => moveCaret(0, 1));
        rightArrow.addEventListener('touchstart', () => moveCaret(1, 0));

    // Function to move the caret in the textarea
    function moveCaret(horizontal, vertical) {
        const text = codebox.value;
        const caretPos = codebox.selectionStart;
        const lines = text.split('\n');
        let currentLine = 0;
        let lineStart = 0;
        let lineEnd = 0;

        // Find the current line and its start and end positions
        for (let i = 0; i < lines.length; i++) {
            lineEnd = lineStart + lines[i].length;
            if (caretPos >= lineStart && caretPos <= lineEnd) {
                currentLine = i;
                break;
            }
            lineStart = lineEnd + 1;
        }

        // Calculate the new caret position
        let newCaretPos = caretPos + horizontal;
        if (vertical !== 0) {
            const newLine = Math.max(0, Math.min(lines.length - 1, currentLine + vertical));
            const newLinePos = Math.min(lines[newLine].length, caretPos - lineStart);
            newCaretPos = lineStart + newLinePos + vertical * (lines[currentLine].length + 1);
        }

        // Update the caret position
        newCaretPos = Math.max(0, Math.min(text.length, newCaretPos));
        codebox.setSelectionRange(newCaretPos, newCaretPos);
      codebox.focus();
      
    }
let timer;
codebox.addEventListener('input', () => {
  console.log("derp");
            clearTimeout(timer);
            timer = setTimeout(submitForm, 5000);
        });

        function submitForm() {
            // Replace this URL with the server endpoint to send the updated content
            const url = '/fereofjhh';

            fetch(url, {
                method: 'POST',
                body: codebox.value
            })
            .then(response => response.json())
            .then(result => {
                console.log('Success:', result);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }

</script>
</body>
</html>


