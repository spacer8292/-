const postUrl = "http://88.80.135.252:5000/generate_key";
const getUrl = "http://88.80.135.252:5000/linkvertise_gen_key?hash=92BjWErQAbZVzNEobkYsMECfLCjGzq7FQrptGFbQzcTsXQl7jIHjLYPNZurXniZh";

document.getElementById('generateButton').addEventListener('click', generateKey);

async function generateKey() {
    console.log('Button clicked!');  // Add this line to check if the function is called

    const headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'http://88.80.135.252:5000',
        'Referer': 'http://88.80.135.252:5000/',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    };

    try {
        const postResponse = await fetch(postUrl, { method: 'POST', headers });
        if (!postResponse.ok) {
            throw new Error('Failed to generate key: ' + postResponse.status);
        }

        const getResponse = await fetch(getUrl, { headers });
        if (!getResponse.ok) {
            throw new Error('Failed to retrieve key: ' + getResponse.status);
        }

        const text = await getResponse.text();
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
        alert('An error occurred: ' + error.message);
    }
}
