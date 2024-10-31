const postUrl = "http://88.80.135.252:5000/generate_key";
const getUrl = "http://88.80.135.252:5000/linkvertise_gen_key?hash=92BjWErQAbZVzNEobkYsMECfLCjGzq7FQrptGFbQzcTsXQl7jIHjLYPNZurXniZh";

document.getElementById('generateButton').addEventListener('click', generateKey);

async function generateKey() {
    try {
        await fetch(postUrl, { method: 'POST' });

        const response = await fetch(getUrl);
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const keyDiv = doc.querySelector('.key-display');

        if (keyDiv) {
            const key = keyDiv.textContent.trim();
            const output = document.getElementById('output');
            output.textContent += "Key: " + key + "\n";
        } else {
            console.log("No key found.");
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
