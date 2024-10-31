<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Key Generator</title>
</head>
<body>
    <h1>Key Generator</h1>
    <pre id="output"></pre>
    
    <script>
        const postUrl = "http://88.80.135.252:5000/generate_key";
        const getUrl = "http://88.80.135.252:5000/linkvertise_gen_key?hash=92BjWErQAbZVzNEobkYsMECfLCjGzq7FQrptGFbQzcTsXQl7jIHjLYPNZurXniZh";

        async function generateKeys() {
            while (true) {
                try {
                    await fetch(postUrl, { method: 'POST' });

                    const response = await fetch(getUrl);
                    const text = await response.text();
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(text, 'text/html');
                    const keyDiv = doc.querySelector('.key-display');

                    if (keyDiv) {
                        const key = keyDiv.textContent.trim();
                        document.getElementById('output').textContent += "Key: " + key + "\n";

                        // Store the key in localStorage (instead of a file)
                        const keys = JSON.parse(localStorage.getItem('keys')) || [];
                        keys.push(key);
                        localStorage.setItem('keys', JSON.stringify(keys));
                    } else {
                        console.log("No key found.");
                    }

                    // Wait for 60 seconds if rate limited
                    await new Promise(resolve => setTimeout(resolve, 60000));
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        }

        generateKeys();
    </script>
</body>
</html>
