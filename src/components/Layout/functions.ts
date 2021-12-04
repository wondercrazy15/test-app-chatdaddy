import axios from "axios";

export const GetrefreshToken = async () => {
    return await axios.request({
        method: 'POST',
        url: 'https://api-teams.chatdaddy.tech/token',
        headers: { 'Content-Type': 'application/json', Authorization: '' },
        data: {
            refreshToken: '059c420e-7424-431f-b23b-af0ecabfe7b8',
            teamId: 'a001994b-918b-4939-8518-3377732e4e88'
        }
    }).then(function (response) {
        if (response.data?.access_token) {
            localStorage.setItem("authToken", response.data?.access_token)
            return response.data?.access_token
        } else {
            return false
        }
    }).catch(function (error) {
        console.error(error);
    });
}

export const getContacts = async (Token: string, searchText: string | null = "") => {
    try {
        return await axios.request({
            method: 'GET',
            url: 'https://api-im.chatdaddy.tech/contacts',
            params: { q: `${searchText}` },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Token}`
            }
        }).then((response) => {
            if (searchText != '') {
                return response.data
                // setFilterList([...response.data?.contacts] || [])
                // setContactsList([])
            } else {
                return response.data
                // setFilterList([])
                // setContactsList((x) => [...x, ...response.data?.contacts] || []);
            }
            // setHasTokenExp(false)
        }).catch((error) => {
            console.log(error);
            // setHasTokenExp(true)
            return false
        });
    } catch (error) {
        console.log("Error", error)
        return false
    }
}