//Create Post Handler
async function newFormHandler(event) {
    event.preventDefault();

    const tech_title = document.querySelector('input[name="post-title"]').value;
    const tech_body = document.querySelector('input[name="content"]').value;

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            tech_title,
            tech_body
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#new-post-form').addEventListener('submit', newFormHandler);