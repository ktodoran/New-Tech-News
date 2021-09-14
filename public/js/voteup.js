async function voteUpClickHandler(e) {
    e.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch('/api/posts/voteup', {
        method: 'PUT',
        body: JSON.stringify({
            post_id: id
        }),
        headers: {
            'Content-Type':'application/json'
        }
    });

    if(response.ok){
        document.location.reload();
    }
    else{
        alert(response.statusText);
    }
}

document.querySelector('.upvotebtn').addEventListener('click', voteUpClickHandler);