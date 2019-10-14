
const Payture = {
    getGlossaryArticles : async () => {
        const response = await fetch('/admin/glossary', {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        }) 

        if (!response.ok) {
            throw new Error(`Payture web-admin server getGlossaryArticles failed, HTTP status ${response.status}`);
        }

        const res = await response.json();


        console.log( res.data.articles )

        return res.data.articles;
    }
}

export default Payture