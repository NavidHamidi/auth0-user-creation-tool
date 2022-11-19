import { v4 } from "uuid"

export default async function handler(req, res) {
    const domain = `https://${process.env.AUTH0_DOMAIN}`
    const audience = `${domain}/api/v2/`
    const clientId = process.env.AUTH0_CLIENT_ID
    const clientSecret = process.env.AUTH0_CLIENT_SECRET
    const connection = process.env.AUTH0_CONNECTION
   
    try {
        let result = await fetch(`${domain}/oauth/token`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'grant_type': 'client_credentials',
                'client_id': clientId,
                'client_secret': clientSecret,
                'audience': audience
            })
        })
    
        let data = await result.json()

        result = await fetch(`${audience}users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.access_token}`
            },
            body: JSON.stringify({
                "given_name" : req.body.firstname,
                "family_name" : req.body.lastname,
                "name": `${req.body.firstname} ${req.body.lastname}`,
                "email" : req.body.email,
                "app_metadata" : {
                    "job" : req.body.job
                },
                "password": v4(),
                "connection": connection
            })
        })
        
        data = await result.json()
        res.status(result.status).json(data)
    }
    catch (error) {
        console.log("error create user")
        console.log(error)
        res.status(500).send({error: error})
    }
}