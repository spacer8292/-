const postUrl = "https://cors-anywhere.herokuapp.com/http://88.80.135.252:5000/generate_key";
const getUrl = "https://cors-anywhere.herokuapp.com/http://88.80.135.252:5000/linkvertise_gen_key?hash=92BjWErQAbZVzNEobkYsMECfLCjGzq7FQrptGFbQzcTsXQl7jIHjLYPNZurXniZh";

document.getElementById('generateButton').addEventListener('click', generateKey);

async function generateKey() {
    console.log('Button clicked!');

    const headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Content-Type': 'application/x-www-form-urlencoded',
        // Add any other necessary headers here
    };

    try {
        const postResponse = await fetch(postUrl, { method: 'POST', headers });
        console.log('Post response status:', postResponse.status);
        
        if (!postResponse.ok) {
            throw new Error('Failed to generate key: ' + postResponse.status);
        }

        // Continue with the GET request as previously defined...
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred: ' + error.message);
    }
}
