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
    </style>
</head>
<body>
    <div class="container">
        <textarea id="codebox"></textarea>
    </div>
    <script>
        const codebox = document.getElementById('codebox');

        // Set textarea height based on window size and keyboard status
        function adjustTextareaHeight() {
            const windowHeight = window.innerHeight;
            const isKeyboardOpen = windowHeight < window.outerHeight * 0.8;

            if (isKeyboardOpen) {
                codebox.style.height = (windowHeight - 10) + 'px';
            } else {
                codebox.style.height = '100%';
            }
        }

        // Listen for window resize events and adjust the textarea height accordingly
        window.addEventListener('resize', adjustTextareaHeight);

        // Call the function initially to set the correct height
        adjustTextareaHeight();
    </script>
</body>
</html>