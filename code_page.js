<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mobile Code Editor</title>
  <style>
  @font-face {
    font-family: "supertight";
    src: url("supertight.woff") format("woff");
  }
        body {
            margin: 0;
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
          font-family: 'supertight','Courier New', monospace;
            font-size: 12px;
            line-height: 1.5;
            outline: none;
            border: none;
            background-color: #ffffff;
        }
    </style>
</head>
<body>
    <div class="container">
  <textarea id="codebox">{}</textarea>
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

let timer;
codebox.addEventListener('input', () => {
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