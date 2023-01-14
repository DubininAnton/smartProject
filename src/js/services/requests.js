const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify(data)
    });

    if(!res.ok) {
        throw new Error(`Could not fetch ${url}, status:${res.status}`);
    }
    return await res;
};

const getResourse = async (url) => {
    let res = await fetch(url);

    if(!res.ok) {
        throw new Error(`Could not fetch ${url}, status:${res.status}`);
    }

    return await res.json();

};


export {postData, getResourse};