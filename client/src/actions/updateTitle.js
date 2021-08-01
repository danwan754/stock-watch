import axios from "axios"


export const updateTitle = (list_id, title, jwtoken) => {
    const data = {
        list_id,
        title
    };
    const headers = {
        headers: {
            Authorization: `token ${jwtoken}`
        }
    };

    return (
        axios.put('/user/list/put/name', data, headers)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.log(`Failed to update list name for list id: ${list_id} to ${title}`);
        })
    );
}